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
            'you\'ve got €150 in your pocket.',
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
        
        // Check if lift is free
        if (this.state.currentJob) {
            // Already have a job, continue with it
            this.phase = 'diagnostics';
            await this.showDiagnosticsOptions();
            return;
        }
        
        // Check for waiting cars
        if (this.state.waitingCars.length > 0) {
            await this.promptStartJob();
            return;
        }
        
        // No waiting cars, maybe a new customer arrives
        if (Math.random() < 0.6) {
            const scenario = Engine.selectNextCustomer(this.state);
            if (scenario) {
                this.state = Engine.addWaitingCustomer(this.state, scenario);
                await UI.printLine('a car pulls into the lot.', 'arrival');
                await UI.updateWaitingCars(this.state.waitingCars);
                await UI.delay(1000);
                await this.promptStartJob();
                return;
            }
        }
        
        // No customers, advance time
        await UI.printLine('no customers right now.', 'system');
        await this.showWaitButton();
    },

    /**
     * Show wait/advance time button
     */
    async showWaitButton() {
        UI.showButtons([
            {
                text: 'wait',
                onClick: () => this.advanceTime(),
                options: { className: 'primary' }
            }
        ]);
    },

    /**
     * Advance time
     */
    async advanceTime() {
        UI.clearActions();
        this.state = Engine.advanceTime(this.state, 1);
        UI.updateAll(this.state);
        Storage.save(this.state);
        
        // Check for leaving cars
        const leavingCars = this.state.waitingCars.filter(c => c.customer.patience <= 0);
        for (const car of leavingCars) {
            await UI.printLines(car.outcomes.timeout.dialogue, 'outcome-bad');
        }
        
        this.phase = 'idle';
        this.gameLoop();
    },

    /**
     * Prompt player to start a job
     */
    async promptStartJob() {
        const waitingCars = this.state.waitingCars;
        
        if (waitingCars.length === 0) {
            this.phase = 'idle';
            this.gameLoop();
            return;
        }
        
        // If only one car, offer to start it
        if (waitingCars.length === 1) {
            const car = waitingCars[0];
            await UI.printLine(`${car.customer.name}'s ${car.car.make} ${car.car.model} is waiting.`, 'system');
            
            UI.showButtons([
                {
                    text: 'bring it in',
                    onClick: () => this.startJob(0),
                    options: { className: 'primary' }
                },
                {
                    text: 'let them wait',
                    onClick: () => this.showWaitButton(),
                    options: {}
                }
            ]);
        } else {
            // Multiple cars, show options
            const buttons = waitingCars.map((car, index) => ({
                text: `${car.customer.name}'s ${car.car.make} ${car.car.model}`,
                onClick: () => this.startJob(index),
                options: {}
            }));
            
            buttons.push({
                text: 'let them wait',
                onClick: () => this.showWaitButton(),
                options: {}
            });
            
            UI.showButtons(buttons);
        }
    },

    /**
     * Start a job
     */
    async startJob(waitingIndex) {
        UI.clearActions();
        this.state = Engine.startJob(this.state, waitingIndex);
        
        const job = this.state.currentJob;
        UI.updateCurrentJob(job);
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
        
        // Add repair button
        const buttons = availableDiagnostics.map(d => ({
            text: d.action,
            onClick: () => this.runDiagnostic(d),
            options: {
                cost: d.cost > 0 ? d.cost : undefined
            }
        }));
        
        buttons.push({
            text: 'make a repair',
            onClick: () => this.showRepairOptions(),
            options: { className: 'primary' }
        });
        
        buttons.push({
            text: 'cancel job',
            onClick: () => this.cancelJob(),
            options: { className: 'danger' }
        });
        
        UI.showButtons(buttons);
    },

    /**
     * Run a diagnostic
     */
    async runDiagnostic(diagnostic) {
        UI.clearActions();
        
        // Deduct cost
        if (diagnostic.cost > 0) {
            this.state.money -= diagnostic.cost;
            UI.updateMoney(this.state.money, -diagnostic.cost);
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
        UI.showButtons([
            {
                text: 'advance time',
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
            }
        ]);
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
        const gameOverText = [
            'the landlord changes the locks on a tuesday.',
            'you stand outside for a minute.',
            'then you go home.',
            '',
            `you lasted ${this.state.day} days.`,
            `completed ${this.state.completedJobs} jobs.`
        ];
        
        UI.showGameOver(gameOverText);
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
