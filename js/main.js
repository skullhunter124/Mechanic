/* ═══════════════════════════════════════════
   MECHANIC - Main Module
   Initialization and game loop
   ═══════════════════════════════════════════ */

const Game = {
    // Game state reference
    state: null,
    
    // Game loop state
    isRunning: false,
    isPaused: false,
    
    // Current phase
    phase: 'idle', // idle, customer_arrival, diagnostics, ordering, repairing, resolving
    
    // Pending event
    currentEvent: null,

    // ═══════════════════════════════════════════
    // Initialization
    // ═══════════════════════════════════════════

    /**
     * Initialize the game
     */
    async init() {
        console.log('Mechanic - Initializing...');
        
        // Initialize UI
        UI.init();
        
        // Load or create game state
        const savedState = Storage.load();
        if (savedState) {
            this.state = savedState;
            await UI.printLine('saved game loaded.', 'system');
            await UI.delay(500);
        } else {
            this.state = Engine.createInitialState();
        }
        
        // Set global reference
        GameState = this.state;
        
        // Update all UI elements
        UI.updateAll(this.state);
        UI.renderUpgrades(UPGRADES, this.state, (upgrade) => this.purchaseUpgrade(upgrade));
        
        // Start auto-save
        Storage.startAutoSave(() => this.state);
        
        // Start game loop
        this.isRunning = true;
        this.gameLoop();
        
        console.log('Mechanic - Ready');
    },

    /**
     * Restart the game
     */
    async restart() {
        Storage.deleteSave();
        this.state = Engine.createInitialState();
        GameState = this.state;
        
        UI.hideOverlay();
        UI.updateAll(this.state);
        UI.renderUpgrades(UPGRADES, this.state, (upgrade) => this.purchaseUpgrade(upgrade));
        
        // Clear log and show intro
        document.getElementById('log').innerHTML = '';
        await UI.printLines([
            'the garage is cold.',
            'you\'ve got €300 in your pocket.',
            'rent is €200 a week.',
            '',
            'someone will come.',
            'they always do.'
        ], 'system');
        
        this.isRunning = true;
        this.phase = 'idle';
        this.gameLoop();
    },

    /**
     * Continue in prestige mode after winning
     */
    continuePrestige() {
        this.state.gameWon = false;
        this.state.reputation = 90; // Reset to just under max
        UI.hideOverlay();
        UI.updateAll(this.state);
        this.gameLoop();
    },

    // ═══════════════════════════════════════════
    // Main Game Loop
    // ═══════════════════════════════════════════

    /**
     * Main game loop
     */
    async gameLoop() {
        if (!this.isRunning || this.state.gameOver) return;
        
        // Check for game over
        if (this.state.gameOver) {
            this.handleGameOver();
            return;
        }
        
        // Check for win (but continue playing)
        if (this.state.gameWon && !this.state.prestigeMode) {
            this.handleWin();
            return;
        }
        
        // Process based on current phase
        switch (this.phase) {
            case 'idle':
                await this.processIdle();
                break;
            case 'customer_arrival':
                await this.processCustomerArrival();
                break;
            case 'diagnostics':
                // Waiting for player input
                break;
            case 'ordering':
                // Waiting for parts
                break;
            case 'repairing':
                await this.processRepairing();
                break;
            case 'resolving':
                await this.processResolving();
                break;
        }
    },

    /**
     * Process idle phase - time passes, customers arrive
     */
    async processIdle() {
        // Print time of day
        await UI.printLine(`${this.state.timeOfDay}.`, 'time-pass');
        
        // Check rent warning
        if (this.state.rentDueIn <= 2) {
            await UI.printLine(`rent is due in ${this.state.rentDueIn} day${this.state.rentDueIn > 1 ? 's' : ''}.`, 'system warning');
        }
        
        // Check for arrived parts
        if (this.state.arrivedParts && this.state.arrivedParts.length > 0) {
            await UI.printLine('parts arrived.', 'action');
        }
        
        // Check for random event
        const event = Engine.checkForEvent(this.state);
        if (event) {
            await this.handleEvent(event);
            return;
        }
        
        // New customers can arrive even when we have a car on the lift
        // They'll wait in the waiting area
        const waitingCars = this.state.waitingCars || [];
        const maxWaitingCars = this.state.garage.hasWaitingRoom ? 5 : 3;
        
        if (waitingCars.length < maxWaitingCars && Math.random() < 0.5) {
            const scenario = Engine.selectNextCustomer(this.state);
            if (scenario) {
                this.state = Engine.addWaitingCustomer(this.state, scenario);
                await UI.printLine('a car pulls into the lot.', 'arrival');
                await UI.updateWaitingCars(this.state.waitingCars);
                await UI.delay(500);
            }
        }
        
        // Check if lift is free
        if (this.state.currentJob) {
            // Already have a job, continue with it
            this.phase = 'diagnostics';
            await this.showDiagnosticsOptions();
            return;
        }
        
        // Lift is free - check for set-aside jobs or waiting cars
        const setAsideJobs = this.state.setAsideJobs || [];
        const updatedWaitingCars = this.state.waitingCars || [];
        
        if (setAsideJobs.length > 0 || updatedWaitingCars.length > 0) {
            await this.promptStartJob();
            return;
        }
        
        // No customers, advance time
        await UI.printLine('no customers right now.', 'system');
        await this.showWaitButton();
    },

    /**
     * Show wait/advance time button
     */
    async showWaitButton() {
        const buttons = [];
        
        // If it's evening, show "end day" button
        if (this.state.timeOfDay === 'evening') {
            buttons.push({
                text: 'end day',
                onClick: () => this.endDay(),
                options: { className: 'primary' }
            });
        } else {
            buttons.push({
                text: 'wait',
                onClick: () => this.advanceTime(),
                options: { className: 'primary' }
            });
        }
        
        UI.showButtons(buttons);
    },

    /**
     * Advance time (within the same day)
     */
    async advanceTime() {
        UI.clearActions();
        this.state = Engine.advanceTime(this.state, 1);
        UI.updateAll(this.state);
        Storage.save(this.state);
        
        this.phase = 'idle';
        this.gameLoop();
    },
    
    /**
     * End the current day and start a new one
     */
    async endDay() {
        UI.clearActions();
        
        await UI.printLine('closing up for the day...', 'system');
        
        // Store recap before processing (in case rent is due)
        const weeklyRecap = this.state.lastWeekRecap;
        
        this.state = Engine.endDay(this.state);
        UI.updateAll(this.state);
        Storage.save(this.state);
        
        // Check for leaving cars (patience ran out)
        const leavingCars = this.state.waitingCars.filter(c => c.customer.patience <= 0);
        for (const car of leavingCars) {
            await UI.printLines(car.outcomes.timeout.dialogue, 'outcome-bad');
        }
        
        // Remove leaving cars
        this.state.waitingCars = this.state.waitingCars.filter(c => c.customer.patience > 0);
        UI.updateWaitingCars(this.state.waitingCars);
        
        // Update upgrades display in case reputation changed
        UI.renderUpgrades(UPGRADES, this.state, (u) => this.purchaseUpgrade(u));
        
        // Check for game over
        if (this.state.gameOver) {
            this.handleGameOver();
            return;
        }
        
        // Show week recap if rent was just paid
        if (weeklyRecap) {
            await this.showWeekRecap(weeklyRecap);
        }
        
        await UI.printLine(`day ${this.state.day}. ${this.state.timeOfDay}.`, 'time-pass');
        
        // Check rent warning
        if (this.state.rentDueIn <= 2) {
            await UI.printLine(`rent is due in ${this.state.rentDueIn} day${this.state.rentDueIn > 1 ? 's' : ''}.`, 'system warning');
        }
        
        this.phase = 'idle';
        this.gameLoop();
    },
    
    /**
     * Show weekly recap after paying rent
     */
    async showWeekRecap(recap) {
        UI.printDivider();
        await UI.printLine('rent paid.', 'system');
        await UI.printLine(`week recap:`, 'system');
        await UI.printLine(`  ${recap.jobsCompleted} job${recap.jobsCompleted !== 1 ? 's' : ''} completed`, 'diagnostic');
        await UI.printLine(`  €${recap.earnings} earned`, 'diagnostic');
        UI.printDivider();
        
        // Clear the recap after displaying
        delete this.state.lastWeekRecap;
    },

    /**
     * Prompt player to start a job or resume a set-aside job
     */
    async promptStartJob() {
        const waitingCars = this.state.waitingCars;
        const setAsideJobs = this.state.setAsideJobs || [];
        
        // Build button options
        const buttons = [];
        
        // Add set-aside jobs that can be resumed
        if (setAsideJobs.length > 0) {
            setAsideJobs.forEach((job, index) => {
                // Check if parts have arrived for this job
                const partsReady = job.orderedParts && Engine.partsAvailable(this.state, job.orderedParts);
                const statusText = job.orderedParts ? (partsReady ? ' (parts ready!)' : ' (waiting for parts)') : '';
                
                buttons.push({
                    text: `resume: ${job.customer.name}'s ${job.car.make}${statusText}`,
                    onClick: () => this.resumeSetAsideJob(index),
                    options: { className: partsReady ? 'primary' : '' }
                });
            });
        }
        
        // Add waiting cars
        if (waitingCars.length > 0) {
            waitingCars.forEach((car, index) => {
                buttons.push({
                    text: `bring in: ${car.customer.name}'s ${car.car.make} ${car.car.model}`,
                    onClick: () => this.startJob(index),
                    options: {}
                });
            });
        }
        
        // If no options available
        if (buttons.length === 0) {
            this.phase = 'idle';
            this.gameLoop();
            return;
        }
        
        // Add wait button if there are waiting cars OR set-aside jobs (lift is free)
        if (waitingCars.length > 0 || setAsideJobs.length > 0) {
            buttons.push({
                text: waitingCars.length > 0 ? 'let them wait' : 'wait for customers',
                onClick: () => this.showWaitButton(),
                options: {}
            });
        }
        
        UI.showButtons(buttons);
    },

    /**
     * Start a job
     */
    async startJob(waitingIndex) {
        UI.clearActions();
        this.state = Engine.startJob(this.state, waitingIndex);
        
        const job = this.state.currentJob;
        UI.updateCurrentJob(job);
        UI.updateWaitingCars(this.state.waitingCars); // Update waiting list to remove the car
        Storage.save(this.state);
        
        // Print arrival dialogue
        await UI.printLines(job.customer.arrival, 'arrival');
        
        this.phase = 'diagnostics';
        await this.showDiagnosticsOptions();
    },

    /**
     * Show diagnostic options
     */
    async showDiagnosticsOptions() {
        const job = this.state.currentJob;
        if (!job) return;
        
        const availableDiagnostics = job.diagnostics.filter(d => {
            if (d.requiresUpgrade && !this.state.garage[d.requiresUpgrade]) {
                return false;
            }
            return true;
        });
        
        // Build diagnostic buttons with upgrade-aware costs
        const buttons = availableDiagnostics.map(d => {
            // Calculate actual cost based on owned upgrades
            let actualCost = d.cost;
            let displayText = d.action;
            
            // Diagnostic scanner makes scanner diagnostics free
            const isScannerDiagnostic = d.requiresUpgrade === 'hasDiagnosticScanner' ||
                                        d.action.toLowerCase().includes('scanner') ||
                                        d.action.toLowerCase().includes('diagnostic scan');
            
            if (isScannerDiagnostic && this.state.garage.hasDiagnosticScanner && d.cost > 0) {
                actualCost = 0;
                displayText = d.action + ' (free - owned)';
            }
            
            // Tire machine makes tire diagnostics faster/better
            if (d.requiresUpgrade === 'hasTireMachine' && this.state.garage.hasTireMachine) {
                displayText = d.action + ' (using tire machine)';
            }
            
            // A/C machine
            if (d.requiresUpgrade === 'hasACMachine' && this.state.garage.hasACMachine) {
                displayText = d.action + ' (using A/C machine)';
            }
            
            // Alignment rig
            if (d.requiresUpgrade === 'hasAlignmentRig' && this.state.garage.hasAlignmentRig) {
                displayText = d.action + ' (using alignment rig)';
            }
            
            return {
                text: displayText,
                onClick: () => this.runDiagnostic(d),
                options: {
                    cost: actualCost > 0 ? actualCost : undefined
                }
            };
        });
        
        // Add upgrade-specific quick actions
        if (this.state.garage.hasDiagnosticScanner) {
            // Add quick scanner option
            const hasQuickScan = buttons.some(b => b.text.toLowerCase().includes('scanner'));
            if (!hasQuickScan) {
                buttons.unshift({
                    text: 'put on diagnostic scanner',
                    onClick: () => this.runQuickDiagnosticScan(),
                    options: {}
                });
            }
        }
        
        if (this.state.garage.hasTireMachine) {
            buttons.push({
                text: 'check tires on machine',
                onClick: () => this.runTireCheck(),
                options: {}
            });
        }
        
        if (this.state.garage.hasACMachine) {
            buttons.push({
                text: 'test A/C system',
                onClick: () => this.runACCheck(),
                options: {}
            });
        }
        
        if (this.state.garage.hasAlignmentRig) {
            buttons.push({
                text: 'check wheel alignment',
                onClick: () => this.runAlignmentCheck(),
                options: {}
            });
        }
        
        if (this.state.garage.hasWelder) {
            buttons.push({
                text: 'inspect for welding repairs',
                onClick: () => this.runWelderCheck(),
                options: {}
            });
        }
        
        if (this.state.garage.hasSprayGun) {
            buttons.push({
                text: 'check paint/body condition',
                onClick: () => this.runPaintCheck(),
                options: {}
            });
        }
        
        if (this.state.garage.hasEngineHoist) {
            buttons.push({
                text: 'inspect engine bay',
                onClick: () => this.runEngineHoistCheck(),
                options: {}
            });
        }
        
        buttons.push({
            text: 'make a repair',
            onClick: () => this.showRepairOptions(),
            options: { className: 'primary' }
        });
        
        // Add "set aside" option to move car off lift
        buttons.push({
            text: 'move off lift',
            onClick: () => this.setAsideCurrentJob(),
            options: {}
        });
        
        buttons.push({
            text: 'cancel job',
            onClick: () => this.cancelJob(),
            options: { className: 'danger' }
        });
        
        UI.showButtons(buttons);
    },
    
    /**
     * Run quick diagnostic scan (available when scanner is owned)
     */
    async runQuickDiagnosticScan() {
        UI.clearActions();
        
        await UI.printLine('connecting to the diagnostic port...', 'action');
        await UI.delay(500);
        await UI.printLine('reading fault codes...', 'action');
        await UI.delay(500);
        
        const job = this.state.currentJob;
        
        // Generate scanner results based on the job
        const scannerResults = this.generateScannerResults(job);
        await UI.printLines(scannerResults, 'diagnostic');
        
        // Track diagnostic
        if (!job.diagnosticsRun) {
            job.diagnosticsRun = [];
        }
        job.diagnosticsRun.push('diagnostic scanner');
        
        Storage.save(this.state);
        await this.showDiagnosticsOptions();
    },
    
    /**
     * Generate scanner results based on current job
     */
    generateScannerResults(job) {
        const results = ['═══ DIAGNOSTIC REPORT ═══'];
        
        // Check solution parts for hints
        const correctRepairs = job.solution.correctRepairs || [];
        const acceptableRepairs = job.solution.acceptableRepairs || [];
        const allRepairs = [...correctRepairs, ...acceptableRepairs];
        
        // Generate codes based on repair types
        if (allRepairs.some(r => r.includes('brake'))) {
            results.push('CODE C0035: ABS hydraulic valve circuit');
            results.push('CODE C0040: Brake pedal position sensor');
        }
        if (allRepairs.some(r => r.includes('oxygen') || r.includes('o2'))) {
            results.push('CODE P0135: O2 Sensor Heater Circuit');
            results.push('CODE P0171: System Too Lean (Bank 1)');
        }
        if (allRepairs.some(r => r.includes('spark') || r.includes('coil'))) {
            results.push('CODE P0300: Random/Multiple Cylinder Misfire');
            results.push('CODE P0351: Ignition Coil Circuit');
        }
        if (allRepairs.some(r => r.includes('mass') || r.includes('maf'))) {
            results.push('CODE P0101: Mass Air Flow Sensor Range/Performance');
        }
        if (allRepairs.some(r => r.includes('throttle'))) {
            results.push('CODE P0121: Throttle Position Sensor Range');
        }
        if (allRepairs.some(r => r.includes('alternator') || r.includes('battery'))) {
            results.push('CODE P0620: Generator Control Circuit');
            results.push('Voltage: 11.8V (low)');
        }
        if (allRepairs.some(r => r.includes('transmission') || r.includes('trans'))) {
            results.push('CODE P0700: Transmission Control System Malfunction');
        }
        if (allRepairs.some(r => r.includes('coolant') || r.includes('thermostat'))) {
            results.push('CODE P0128: Coolant Thermostat Below Regulating Temperature');
        }
        if (allRepairs.some(r => r.includes('ac') || r.includes('a/c'))) {
            results.push('CODE P0530: A/C Refrigerant Pressure Sensor Circuit');
        }
        
        // If no specific codes, show generic
        if (results.length === 1) {
            results.push('No active fault codes.');
            results.push('All systems nominal.');
            results.push('Issue may be mechanical.');
        }
        
        results.push('═════════════════════════');
        
        return results;
    },
    
    /**
     * Run tire check (available when tire machine is owned)
     */
    async runTireCheck() {
        UI.clearActions();
        
        await UI.printLine('mounting tires on machine...', 'action');
        await UI.delay(500);
        
        const job = this.state.currentJob;
        const results = [
            '═══ TIRE REPORT ═══',
            'Tread depth: varying',
            'Pressure check: complete',
            'Balance test: running...'
        ];
        
        // Check if tires are part of the solution
        const allRepairs = [...(job.solution.correctRepairs || []), ...(job.solution.acceptableRepairs || [])];
        if (allRepairs.some(r => r.includes('tire') || r.includes('wheel'))) {
            results.push('ISSUE DETECTED: Tire/wheel problem found');
            results.push('Recommendation: Inspect tires and wheels');
        } else {
            results.push('Tires appear serviceable.');
        }
        
        results.push('═════════════════════');
        
        await UI.printLines(results, 'diagnostic');
        
        if (!job.diagnosticsRun) {
            job.diagnosticsRun = [];
        }
        job.diagnosticsRun.push('tire machine check');
        
        Storage.save(this.state);
        await this.showDiagnosticsOptions();
    },
    
    /**
     * Run A/C check (available when A/C machine is owned)
     */
    async runACCheck() {
        UI.clearActions();
        
        await UI.printLine('connecting A/C machine...', 'action');
        await UI.delay(500);
        
        const job = this.state.currentJob;
        const results = [
            '═══ A/C REPORT ═══',
            'System pressure test: running...',
            'Refrigerant level: checking...'
        ];
        
        // Check if A/C is part of the solution
        const allRepairs = [...(job.solution.correctRepairs || []), ...(job.solution.acceptableRepairs || [])];
        if (allRepairs.some(r => r.includes('ac') || r.includes('a/c') || r.includes('refrigerant'))) {
            results.push('ISSUE DETECTED: A/C system fault');
            results.push('Low refrigerant or leak detected');
        } else {
            results.push('A/C system: No issues detected');
        }
        
        results.push('═════════════════════');
        
        await UI.printLines(results, 'diagnostic');
        
        if (!job.diagnosticsRun) {
            job.diagnosticsRun = [];
        }
        job.diagnosticsRun.push('a/c machine check');
        
        Storage.save(this.state);
        await this.showDiagnosticsOptions();
    },
    
    /**
     * Run alignment check (available when alignment rig is owned)
     */
    async runAlignmentCheck() {
        UI.clearActions();
        
        await UI.printLine('positioning on alignment rig...', 'action');
        await UI.delay(500);
        
        const job = this.state.currentJob;
        const results = [
            '═══ ALIGNMENT REPORT ═══',
            'Front toe: checking...',
            'Camber: checking...',
            'Caster: checking...'
        ];
        
        // Check if alignment/suspension is part of the solution
        const allRepairs = [...(job.solution.correctRepairs || []), ...(job.solution.acceptableRepairs || [])];
        if (allRepairs.some(r => r.includes('alignment') || r.includes('suspension') || r.includes('arm') || r.includes('link'))) {
            results.push('ISSUE DETECTED: Alignment out of spec');
            results.push('Recommendation: Full alignment needed');
        } else {
            results.push('Alignment: Within specifications');
        }
        
        results.push('═════════════════════════');
        
        await UI.printLines(results, 'diagnostic');
        
        if (!job.diagnosticsRun) {
            job.diagnosticsRun = [];
        }
        job.diagnosticsRun.push('alignment rig check');
        
        Storage.save(this.state);
        await this.showDiagnosticsOptions();
    },
    
    /**
     * Run welder check (available when welder is owned)
     */
    async runWelderCheck() {
        UI.clearActions();
        
        await UI.printLine('inspecting exhaust and frame...', 'action');
        await UI.delay(500);
        
        const job = this.state.currentJob;
        const results = [
            '═══ WELDING INSPECTION ═══',
            'Exhaust system: checking...',
            'Frame/undercarriage: checking...',
            'Looking for rust, cracks, damage...'
        ];
        
        // Check if welding-related repairs are part of the solution
        const allRepairs = [...(job.solution.correctRepairs || []), ...(job.solution.acceptableRepairs || [])];
        if (allRepairs.some(r => r.includes('exhaust') || r.includes('pipe') || r.includes('muffler') || r.includes('weld'))) {
            results.push('ISSUE DETECTED: Exhaust/welding repair needed');
            results.push('Can be fixed with welder');
        } else {
            results.push('No welding repairs needed for this job.');
        }
        
        results.push('═══════════════════════════');
        
        await UI.printLines(results, 'diagnostic');
        
        if (!job.diagnosticsRun) {
            job.diagnosticsRun = [];
        }
        job.diagnosticsRun.push('welder inspection');
        
        Storage.save(this.state);
        await this.showDiagnosticsOptions();
    },
    
    /**
     * Run paint check (available when spray gun is owned)
     */
    async runPaintCheck() {
        UI.clearActions();
        
        await UI.printLine('examining paint and body...', 'action');
        await UI.delay(500);
        
        const job = this.state.currentJob;
        const results = [
            '═══ PAINT/BODY REPORT ═══',
            'Paint condition: checking...',
            'Body panels: checking...',
            'Looking for scratches, dents, rust...'
        ];
        
        // Check if paint-related repairs are part of the solution
        const allRepairs = [...(job.solution.correctRepairs || []), ...(job.solution.acceptableRepairs || [])];
        if (allRepairs.some(r => r.includes('paint') || r.includes('body') || r.includes('panel') || r.includes('primer'))) {
            results.push('ISSUE DETECTED: Paint/body work needed');
            results.push('Can be addressed with spray gun');
        } else {
            results.push('No paint work needed for this job.');
        }
        
        results.push('══════════════════════════');
        
        await UI.printLines(results, 'diagnostic');
        
        if (!job.diagnosticsRun) {
            job.diagnosticsRun = [];
        }
        job.diagnosticsRun.push('spray gun inspection');
        
        Storage.save(this.state);
        await this.showDiagnosticsOptions();
    },
    
    /**
     * Run engine hoist check (available when engine hoist is owned)
     */
    async runEngineHoistCheck() {
        UI.clearActions();
        
        await UI.printLine('preparing engine hoist...', 'action');
        await UI.delay(500);
        
        const job = this.state.currentJob;
        const results = [
            '═══ ENGINE INSPECTION ═══',
            'Engine mounts: checking...',
            'Oil pan: checking...',
            'Transmission: checking...',
            'Major components: accessible'
        ];
        
        // Check if engine-related repairs are part of the solution
        const allRepairs = [...(job.solution.correctRepairs || []), ...(job.solution.acceptableRepairs || [])];
        if (allRepairs.some(r => r.includes('engine') || r.includes('motor') || r.includes('head') || r.includes('gasket') || r.includes('clutch'))) {
            results.push('ISSUE DETECTED: Major engine work needed');
            results.push('Engine pull recommended');
        } else {
            results.push('No major engine work required.');
        }
        
        results.push('══════════════════════════');
        
        await UI.printLines(results, 'diagnostic');
        
        if (!job.diagnosticsRun) {
            job.diagnosticsRun = [];
        }
        job.diagnosticsRun.push('engine hoist inspection');
        
        Storage.save(this.state);
        await this.showDiagnosticsOptions();
    },
    
    /**
     * Set aside current job (move off lift)
     */
    async setAsideCurrentJob() {
        if (!this.state.currentJob) return;
        
        const jobName = `${this.state.currentJob.customer.name}'s ${this.state.currentJob.car.make}`;
        
        this.state = Engine.setAsideCurrentJob(this.state);
        UI.updateCurrentJob(null);
        UI.updateSetAsideJobs(this.state.setAsideJobs || []);
        Storage.save(this.state);
        
        await UI.printLine(`${jobName} moved off lift.`, 'action');
        
        this.phase = 'idle';
        this.gameLoop();
    },
    
    /**
     * Resume a set-aside job
     */
    async resumeSetAsideJob(index) {
        this.state = Engine.resumeJob(this.state, index);
        UI.updateCurrentJob(this.state.currentJob);
        UI.updateSetAsideJobs(this.state.setAsideJobs || []);
        Storage.save(this.state);
        
        const job = this.state.currentJob;
        await UI.printLine(`${job.customer.name}'s ${job.car.make} back on lift.`, 'action');
        
        // Check if this job has ordered parts
        if (job.orderedParts && job.orderedParts.length > 0) {
            // Check if parts have arrived
            if (Engine.partsAvailable(this.state, job.orderedParts)) {
                await UI.printLine('parts arrived. ready to install.', 'action');
                await this.completeRepair(job.orderedParts);
            } else {
                await UI.printLine('still waiting for parts...', 'system');
                this.phase = 'ordering';
                this.waitForParts(job.orderedParts);
            }
        } else {
            this.phase = 'diagnostics';
            await this.showDiagnosticsOptions();
        }
    },

    /**
     * Run a diagnostic
     */
    async runDiagnostic(diagnostic) {
        UI.clearActions();
        
        // Deduct cost only if not using owned equipment
        // Diagnostic scanner makes scanner-based diagnostics free
        if (diagnostic.cost > 0) {
            // Check if this is a scanner diagnostic and player owns the scanner
            const isScannerDiagnostic = diagnostic.requiresUpgrade === 'hasDiagnosticScanner' ||
                                        diagnostic.action.toLowerCase().includes('scanner') ||
                                        diagnostic.action.toLowerCase().includes('diagnostic scan');
            
            if (isScannerDiagnostic && this.state.garage.hasDiagnosticScanner) {
                // Free - we own the scanner
                await UI.printLine('using your diagnostic scanner...', 'action');
            } else {
                // Still charge for non-scanner diagnostics or if we don't own the scanner
                this.state.money -= diagnostic.cost;
                UI.updateMoney(this.state.money, -diagnostic.cost);
            }
        }
        
        // Track diagnostic
        if (!this.state.currentJob.diagnosticsRun) {
            this.state.currentJob.diagnosticsRun = [];
        }
        this.state.currentJob.diagnosticsRun.push(diagnostic.action);
        
        // Advance time if needed
        if (diagnostic.time > 0) {
            this.state = Engine.advanceTime(this.state, diagnostic.time);
            UI.updateAll(this.state);
        }
        
        // Print results
        await UI.printLines(diagnostic.reveals, 'diagnostic');
        
        Storage.save(this.state);
        
        // Show diagnostics again
        await this.showDiagnosticsOptions();
    },

    /**
     * Show repair options
     */
    async showRepairOptions() {
        const job = this.state.currentJob;
        if (!job) return;
        
        // Get available parts
        const parts = Engine.getAvailableParts(this.state);
        
        UI.showButtons([
            {
                text: 'select parts to order',
                onClick: () => this.showPartsSelection(parts),
                options: { className: 'primary' }
            },
            {
                text: 'back',
                onClick: () => this.showDiagnosticsOptions(),
                options: {}
            }
        ]);
    },

    /**
     * Show parts selection organized by category
     */
    async showPartsSelection(parts) {
        UI.clearActions();
        
        const selectedParts = new Set();
        const selectedPartsData = new Map(); // Store part data for cart summary
        
        // Create a lookup map for parts
        const partsLookup = new Map();
        parts.forEach(part => partsLookup.set(part.id, part));
        
        // Group parts by category
        const categorizedParts = {};
        parts.forEach(part => {
            const cat = part.category || 'misc';
            if (!categorizedParts[cat]) {
                categorizedParts[cat] = [];
            }
            categorizedParts[cat].push(part);
        });
        
        // Create container
        const container = document.createElement('div');
        container.className = 'parts-container';
        
        // Create category navigation
        const categoryNav = document.createElement('div');
        categoryNav.className = 'category-nav';
        
        const categories = typeof PART_CATEGORIES !== 'undefined' ? PART_CATEGORIES : [
            { id: 'misc', name: 'Parts', icon: '●' }
        ];
        
        // Filter to only show categories that have parts
        const availableCategories = categories.filter(cat => categorizedParts[cat.id]);
        
        availableCategories.forEach(cat => {
            const catBtn = document.createElement('button');
            catBtn.className = 'btn category-btn';
            catBtn.textContent = `${cat.icon} ${cat.name}`;
            catBtn.dataset.category = cat.id;
            
            catBtn.addEventListener('click', () => {
                // Remove active from all
                categoryNav.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
                catBtn.classList.add('active');
                
                // Show only this category's parts
                container.querySelectorAll('.parts-category').forEach(c => c.classList.remove('active'));
                const catContent = container.querySelector(`[data-category-content="${cat.id}"]`);
                if (catContent) catContent.classList.add('active');
            });
            
            categoryNav.appendChild(catBtn);
        });
        
        container.appendChild(categoryNav);
        
        // Create parts sections for each category
        const partsWrapper = document.createElement('div');
        partsWrapper.className = 'parts-wrapper';
        
        availableCategories.forEach(cat => {
            const catSection = document.createElement('div');
            catSection.className = 'parts-category';
            catSection.dataset.categoryContent = cat.id;
            
            const grid = document.createElement('div');
            grid.className = 'parts-grid';
            
            categorizedParts[cat.id].forEach(part => {
                const option = document.createElement('label');
                option.className = 'part-option';
                option.innerHTML = `
                    <input type="checkbox" value="${part.id}">
                    <span class="part-name">${part.name}</span>
                    <span class="part-cost">€${part.cost}</span>
                `;
                
                option.querySelector('input').addEventListener('change', (e) => {
                    if (e.target.checked) {
                        selectedParts.add(part.id);
                        selectedPartsData.set(part.id, part);
                        option.classList.add('selected');
                    } else {
                        selectedParts.delete(part.id);
                        selectedPartsData.delete(part.id);
                        option.classList.remove('selected');
                    }
                    updateCartSummary();
                    updateConfirmButton();
                });
                
                grid.appendChild(option);
            });
            
            catSection.appendChild(grid);
            partsWrapper.appendChild(catSection);
        });
        
        container.appendChild(partsWrapper);
        
        // Select first category by default
        const firstBtn = categoryNav.querySelector('.category-btn');
        if (firstBtn) {
            firstBtn.classList.add('active');
            const firstContent = container.querySelector('.parts-category');
            if (firstContent) firstContent.classList.add('active');
        }
        
        UI.elements.actionArea.appendChild(container);
        
        // Cart summary section
        const cartSummary = document.createElement('div');
        cartSummary.className = 'cart-summary';
        cartSummary.innerHTML = `
            <div class="cart-header">
                <span class="cart-title">🛒 Cart</span>
                <span class="cart-count">(0 items)</span>
            </div>
            <div class="cart-items"></div>
            <div class="cart-total">
                <span>Total:</span>
                <span class="cart-total-amount">€0</span>
            </div>
        `;
        
        UI.elements.actionArea.appendChild(cartSummary);
        
        // Button container
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'mt-2';
        
        // Confirm button
        const confirmBtn = UI.createButton('confirm order', () => {
            this.orderParts(Array.from(selectedParts));
        }, { className: 'primary', disabled: true });
        confirmBtn.id = 'confirm-order-btn';
        buttonContainer.appendChild(confirmBtn);
        
        // Back button
        const backBtn = UI.createButton('back', () => {
            this.showDiagnosticsOptions();
        }, {});
        buttonContainer.appendChild(backBtn);
        
        UI.elements.actionArea.appendChild(buttonContainer);
        
        // Update confirm button state
        function updateConfirmButton() {
            confirmBtn.disabled = selectedParts.size === 0;
        }
        
        // Update cart summary
        function updateCartSummary() {
            const cartItems = cartSummary.querySelector('.cart-items');
            const cartCount = cartSummary.querySelector('.cart-count');
            const cartTotal = cartSummary.querySelector('.cart-total-amount');
            
            // Clear current items
            cartItems.innerHTML = '';
            
            let total = 0;
            selectedPartsData.forEach((part, id) => {
                total += part.cost;
                const item = document.createElement('div');
                item.className = 'cart-item';
                item.innerHTML = `
                    <span class="cart-item-name">${part.name}</span>
                    <span class="cart-item-cost">€${part.cost}</span>
                `;
                cartItems.appendChild(item);
            });
            
            cartCount.textContent = `(${selectedParts.size} item${selectedParts.size !== 1 ? 's' : ''})`;
            cartTotal.textContent = `€${total}`;
            
            // Show/hide cart based on items
            cartSummary.classList.toggle('has-items', selectedParts.size > 0);
        }
    },

    /**
     * Order parts
     */
    async orderParts(partIds) {
        if (partIds.length === 0) return;
        
        UI.clearActions();
        
        const result = Engine.orderParts(this.state, partIds);
        this.state = result.state;
        
        // Print what was ordered
        await UI.printLine(`ordered: ${result.orderedParts.map(p => p.name).join(', ')}`, 'action');
        await UI.printLine(`cost: €${result.totalCost}`, 'system');
        
        UI.updateMoney(this.state.money, -result.totalCost);
        UI.updateOrders(this.state.orders);
        Storage.save(this.state);
        
        // Check if parts are available immediately
        if (Engine.partsAvailable(this.state, partIds)) {
            await UI.printLine('parts in stock. ready to install.', 'action');
            await this.completeRepair(partIds);
        } else {
            await UI.printLine('waiting for parts to arrive...', 'system');
            this.phase = 'ordering';
            this.waitForParts(partIds);
        }
    },

    /**
     * Wait for parts to arrive
     */
    async waitForParts(partIds) {
        const buttons = [];
        
        // If it's evening, show "end day" button
        if (this.state.timeOfDay === 'evening') {
            buttons.push({
                text: 'end day',
                onClick: async () => {
                    UI.clearActions();
                    
                    await UI.printLine('closing up for the day...', 'system');
                    
                    // Store recap before processing (in case rent is due)
                    const weeklyRecap = this.state.lastWeekRecap;
                    
                    this.state = Engine.endDay(this.state);
                    UI.updateAll(this.state);
                    Storage.save(this.state);
                    
                    // Check for game over
                    if (this.state.gameOver) {
                        this.handleGameOver();
                        return;
                    }
                    
                    // Show week recap if rent was just paid
                    if (weeklyRecap) {
                        await this.showWeekRecap(weeklyRecap);
                    }
                    
                    // Check if parts arrived
                    if (Engine.partsAvailable(this.state, partIds)) {
                        await UI.printLine('parts arrived overnight.', 'action');
                        await this.completeRepair(partIds);
                    } else {
                        await UI.printLine(`still waiting for parts... day ${this.state.day}.`, 'system');
                        this.waitForParts(partIds);
                    }
                },
                options: { className: 'primary' }
            });
        } else {
            buttons.push({
                text: 'wait',
                onClick: async () => {
                    UI.clearActions();
                    this.state = Engine.advanceTime(this.state, 1);
                    UI.updateAll(this.state);
                    Storage.save(this.state);
                    
                    // Check if parts arrived
                    if (Engine.partsAvailable(this.state, partIds)) {
                        await UI.printLine('parts arrived.', 'action');
                        await this.completeRepair(partIds);
                    } else {
                        await UI.printLine('still waiting for parts...', 'system');
                        this.waitForParts(partIds);
                    }
                },
                options: { className: 'primary' }
            });
        }
        
        // Add option to set aside job while waiting for parts
        buttons.push({
            text: 'move off lift (wait for parts)',
            onClick: () => this.setAsideJobWaitingForParts(partIds),
            options: {}
        });
        
        UI.showButtons(buttons);
    },
    
    /**
     * Set aside current job while waiting for parts
     */
    async setAsideJobWaitingForParts(partIds) {
        if (!this.state.currentJob) return;
        
        // Store the ordered parts with the job for later
        this.state.currentJob.orderedParts = partIds;
        
        const jobName = `${this.state.currentJob.customer.name}'s ${this.state.currentJob.car.make}`;
        
        this.state = Engine.setAsideCurrentJob(this.state);
        UI.updateCurrentJob(null);
        UI.updateSetAsideJobs(this.state.setAsideJobs || []);
        Storage.save(this.state);
        
        await UI.printLine(`${jobName} moved off lift. waiting for parts.`, 'action');
        
        this.phase = 'idle';
        this.gameLoop();
    },

    /**
     * Complete the repair
     */
    async completeRepair(partIds) {
        UI.clearActions();
        
        const result = Engine.completeRepair(this.state, partIds);
        this.state = result.state;
        
        // Print outcome dialogue
        const outcomeClass = result.outcomeType === 'correct' ? 'outcome-good' : 
                            result.outcomeType === 'wrong' ? 'outcome-bad' : '';
        
        await UI.printLines(result.outcome.dialogue, outcomeClass);
        
        // Update UI
        UI.updateMoney(this.state.money, result.outcome.payment);
        UI.updateReputation(this.state.reputation);
        UI.updateJobsCount(this.state.completedJobs);
        UI.updateCurrentJob(null);
        UI.renderUpgrades(UPGRADES, this.state, (u) => this.purchaseUpgrade(u));
        
        // Play sound
        if (result.outcomeType === 'correct') {
            UI.playSound('repair');
        } else if (result.outcomeType === 'wrong') {
            UI.playSound('bad');
        }
        
        Storage.save(this.state);
        
        // Check for win
        if (this.state.gameWon) {
            this.handleWin();
            return;
        }
        
        this.phase = 'idle';
        await UI.delay(1000);
        this.gameLoop();
    },

    /**
     * Cancel current job
     */
    async cancelJob() {
        UI.clearActions();
        
        const job = this.state.currentJob;
        const outcome = job.outcomes.timeout;
        
        await UI.printLines(outcome.dialogue, 'outcome-bad');
        
        this.state = Engine.cancelJob(this.state);
        UI.updateCurrentJob(null);
        UI.updateReputation(this.state.reputation);
        UI.renderUpgrades(UPGRADES, this.state, (u) => this.purchaseUpgrade(u));
        
        Storage.save(this.state);
        
        this.phase = 'idle';
        await UI.delay(500);
        this.gameLoop();
    },

    // ═══════════════════════════════════════════
    // Event Handling
    // ═══════════════════════════════════════════

    /**
     * Handle a random event
     */
    async handleEvent(event) {
        this.currentEvent = event;
        
        await UI.printLines(event.text, 'system');
        
        if (event.choices) {
            const buttons = event.choices.map(choice => ({
                text: choice.text,
                onClick: () => this.handleEventChoice(event, choice),
                options: {}
            }));
            
            UI.showButtons(buttons);
        } else {
            // Narrative only, continue
            await UI.delay(1000);
            this.phase = 'idle';
            this.gameLoop();
        }
    },

    /**
     * Handle event choice
     */
    async handleEventChoice(event, choice) {
        UI.clearActions();
        
        // Apply effect
        if (choice.effect) {
            if (choice.effect.money) {
                this.state.money += choice.effect.money;
                UI.updateMoney(this.state.money, choice.effect.money);
            }
            if (choice.effect.reputation) {
                this.state.reputation = Math.max(0, Math.min(100, this.state.reputation + choice.effect.reputation));
                UI.updateReputation(this.state.reputation);
            }
            if (choice.effect.rentIncrease) {
                this.state.rent += 50;
            }
            // Update upgrades display in case new ones are now available
            UI.renderUpgrades(UPGRADES, this.state, (u) => this.purchaseUpgrade(u));
        }
        
        // Print followup
        if (choice.followup) {
            await UI.printLines(choice.followup, 'system');
        }
        
        Storage.save(this.state);
        
        this.currentEvent = null;
        this.phase = 'idle';
        await UI.delay(500);
        this.gameLoop();
    },

    // ═══════════════════════════════════════════
    // Upgrades
    // ═══════════════════════════════════════════

    /**
     * Purchase an upgrade
     */
    async purchaseUpgrade(upgrade) {
        const result = Engine.purchaseUpgrade(this.state, upgrade);
        
        if (result.success) {
            this.state = result.state;
            
            await UI.printLine(`purchased: ${upgrade.name}`, 'action');
            await UI.printLine(`€${upgrade.cost}`, 'system');
            
            UI.updateMoney(this.state.money, -upgrade.cost);
            UI.updateGarageDescription(this.state.garage);
            UI.renderUpgrades(UPGRADES, this.state, (u) => this.purchaseUpgrade(u));
            
            Storage.save(this.state);
        } else {
            let message = '';
            switch (result.reason) {
                case 'money':
                    message = 'not enough money.';
                    break;
                case 'reputation':
                    message = 'reputation too low.';
                    break;
                case 'owned':
                    message = 'already owned.';
                    break;
            }
            await UI.printLine(message, 'system');
        }
    },

    // ═══════════════════════════════════════════
    // Win/Lose
    // ═══════════════════════════════════════════

    /**
     * Handle game over
     */
    handleGameOver() {
        let reasonText = [];
        
        if (this.state.gameOverReason === 'rent') {
            reasonText = [
                'you couldn\'t pay the rent.',
                'the landlord changes the locks on a tuesday.',
                'you stand outside for a minute.',
                'then you go home.',
                '',
                'game over - bankrupt'
            ];
        } else {
            reasonText = [
                'the landlord changes the locks on a tuesday.',
                'you stand outside for a minute.',
                'then you go home.',
                '',
                'game over'
            ];
        }
        
        const statsText = [
            '',
            `you lasted ${this.state.day} days.`,
            `completed ${this.state.completedJobs} jobs.`,
            `earned €${this.state.totalEarnings || 0} total.`
        ];
        
        UI.showGameOver([...reasonText, ...statsText]);
        this.isRunning = false;
    },

    /**
     * Handle win
     */
    handleWin() {
        const winText = [
            'word spreads as far as it does in a small city.',
            'there\'s a waiting list now.',
            'you hired someone to answer the phone.',
            'you didn\'t think it would go like this.',
            '',
            'it went like this.'
        ];
        
        UI.showWin(winText);
    }
};

// ═══════════════════════════════════════════
// Initialize on page load
// ═══════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
    Game.init();
});

// Handle page visibility for auto-save
document.addEventListener('visibilitychange', () => {
    if (document.hidden && GameState) {
        Storage.save(GameState);
    }
});

// Handle before unload for save
window.addEventListener('beforeunload', () => {
    if (GameState) {
        Storage.save(GameState);
    }
});
