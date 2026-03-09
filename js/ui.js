/* ═══════════════════════════════════════════
   MECHANIC - UI Module
   Text printing engine and rendering
   ═══════════════════════════════════════════ */

const UI = {
    // Configuration
    config: {
        lineDelay: 20,          // ms between lines
        charDelay: 0,           // ms per character (0 = instant)
        scrollDelay: 100,       // ms before auto-scroll
        buttonFadeDelay: 200,   // ms between button appearances
    },

    // DOM Elements cache
    elements: {},

    // Sound system
    sounds: {
        enabled: true,
        context: null,
    },

    // ═══════════════════════════════════════════
    // Initialization
    // ═══════════════════════════════════════════

    init() {
        this.cacheElements();
        this.initSounds();
    },

    cacheElements() {
        this.elements = {
            log: document.getElementById('log'),
            actionArea: document.getElementById('action-area'),
            
            // Garage panel
            garageDescription: document.getElementById('garage-description'),
            currentJob: document.getElementById('current-job'),
            setAsideJobsSection: document.getElementById('set-aside-jobs'),
            setAsideList: document.getElementById('set-aside-list'),
            waitingList: document.getElementById('waiting-list'),
            timeOfDay: document.getElementById('time-of-day'),
            dayCounter: document.getElementById('day-counter'),
            rentWarning: document.getElementById('rent-warning'),
            rentCountdown: document.getElementById('rent-countdown'),
            
            // Status panel
            moneyDisplay: document.getElementById('money-display'),
            reputationFill: document.getElementById('reputation-fill'),
            reputationValue: document.getElementById('reputation-value'),
            dayDisplay: document.getElementById('day-display'),
            rentDisplay: document.getElementById('rent-display'),
            jobsDisplay: document.getElementById('jobs-display'),
            ordersSection: document.getElementById('orders-section'),
            ordersList: document.getElementById('orders-list'),
            upgradesList: document.getElementById('upgrades-list'),
            
            // Overlay
            overlay: document.getElementById('overlay'),
            overlayContent: document.getElementById('overlay-content'),
        };
    },

    // ═══════════════════════════════════════════
    // Sound System (Web Audio API)
    // ═══════════════════════════════════════════

    initSounds() {
        try {
            this.sounds.context = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            this.sounds.enabled = false;
        }
    },

    playSound(type) {
        if (!this.sounds.enabled || !this.sounds.context) return;
        
        const ctx = this.sounds.context;
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        switch (type) {
            case 'tick':
                // Soft typewriter tick
                oscillator.frequency.value = 800;
                oscillator.type = 'sine';
                gainNode.gain.value = 0.02;
                oscillator.start();
                oscillator.stop(ctx.currentTime + 0.01);
                break;
                
            case 'repair':
                // Wrench clink
                oscillator.frequency.value = 400;
                oscillator.type = 'triangle';
                gainNode.gain.value = 0.1;
                gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
                oscillator.start();
                oscillator.stop(ctx.currentTime + 0.1);
                break;
                
            case 'cash':
                // Cash register
                oscillator.frequency.value = 1200;
                oscillator.type = 'sine';
                gainNode.gain.value = 0.08;
                oscillator.start();
                setTimeout(() => {
                    oscillator.frequency.value = 1600;
                }, 50);
                oscillator.stop(ctx.currentTime + 0.15);
                break;
                
            case 'bad':
                // Low tone
                oscillator.frequency.value = 150;
                oscillator.type = 'sawtooth';
                gainNode.gain.value = 0.1;
                gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
                oscillator.start();
                oscillator.stop(ctx.currentTime + 0.3);
                break;
        }
    },

    // ═══════════════════════════════════════════
    // Text Printing Engine
    // ═══════════════════════════════════════════

    /**
     * Print a single line to the log
     * @param {string} text - The text to print
     * @param {string} className - CSS class for styling
     * @param {number} delay - Optional delay before printing
     */
    async printLine(text, className = '', delay = 0) {
        return new Promise(resolve => {
            setTimeout(() => {
                const p = document.createElement('p');
                // Add new-line class for animation, keep existing classes
                p.className = `new-line ${className}`.trim();
                p.textContent = text;
                
                // Remove new-line class from previous lines after animation
                const previousNewLines = this.elements.log.querySelectorAll('.new-line');
                previousNewLines.forEach(el => {
                    el.classList.remove('new-line');
                });
                
                this.elements.log.appendChild(p);
                this.scrollToBottom();
                
                if (this.sounds.enabled && this.config.charDelay > 0) {
                    this.playSound('tick');
                }
                
                // Remove new-line class after animation completes
                setTimeout(() => {
                    p.classList.remove('new-line');
                }, 500);
                
                resolve();
            }, delay);
        });
    },

    /**
     * Print multiple lines with delay between each
     * @param {string[]} lines - Array of text lines
     * @param {string} className - CSS class for styling
     * @param {number} lineDelay - Delay between lines (overrides config)
     */
    async printLines(lines, className = '', lineDelay = null) {
        const delay = lineDelay !== null ? lineDelay : this.config.lineDelay;
        
        for (let i = 0; i < lines.length; i++) {
            await this.printLine(lines[i], className, i === 0 ? 0 : delay);
        }
    },

    /**
     * Print a divider line
     */
    printDivider() {
        this.printLine('═══════════════════════════════════════', 'divider');
    },

    /**
     * Clear the action area
     */
    clearActions() {
        this.elements.actionArea.innerHTML = '';
    },

    /**
     * Scroll log to bottom
     */
    scrollToBottom() {
        // Immediate scroll
        this.elements.log.scrollTop = this.elements.log.scrollHeight;
        // Also try after a short delay for animated content
        setTimeout(() => {
            this.elements.log.scrollTop = this.elements.log.scrollHeight;
        }, 50);
    },

    // ═══════════════════════════════════════════
    // Button Rendering
    // ═══════════════════════════════════════════

    /**
     * Create a button
     * @param {string} text - Button text
     * @param {Function} onClick - Click handler
     * @param {Object} options - Additional options
     */
    createButton(text, onClick, options = {}) {
        const btn = document.createElement('button');
        btn.className = `btn ${options.className || ''}`.trim();
        btn.textContent = text;
        
        if (options.cost !== undefined) {
            const costSpan = document.createElement('span');
            costSpan.className = 'cost';
            costSpan.textContent = `€${options.cost}`;
            btn.appendChild(costSpan);
        }
        
        if (options.disabled) {
            btn.disabled = true;
        }
        
        btn.addEventListener('click', () => {
            if (options.sound !== false) {
                this.playSound('tick');
            }
            onClick();
        });
        
        return btn;
    },

    /**
     * Show action buttons in the action area
     * @param {Array} buttons - Array of button configs
     */
    async showButtons(buttons) {
        this.clearActions();
        
        for (let i = 0; i < buttons.length; i++) {
            const config = buttons[i];
            const btn = this.createButton(config.text, config.onClick, config.options);
            
            // Stagger animation
            btn.style.animationDelay = `${i * this.config.buttonFadeDelay}ms`;
            
            this.elements.actionArea.appendChild(btn);
            
            // Small delay between button additions
            await this.delay(this.config.buttonFadeDelay / 2);
        }
    },

    /**
     * Show diagnostic options
     * @param {Array} diagnostics - Array of diagnostic options
     * @param {Function} onSelect - Callback when option selected
     */
    showDiagnostics(diagnostics, onSelect) {
        const buttons = diagnostics.map(diag => ({
            text: diag.action,
            onClick: () => onSelect(diag),
            options: {
                cost: diag.cost > 0 ? diag.cost : undefined,
                disabled: diag.requiresUpgrade && !GameState.garage[diag.requiresUpgrade],
                className: diag.requiresUpgrade && !GameState.garage[diag.requiresUpgrade] ? 'locked' : ''
            }
        }));
        
        this.showButtons(buttons);
    },

    /**
     * Show parts selection grid organized by category
     * @param {Array} parts - Available parts
     * @param {Function} onConfirm - Callback with selected parts
     */
    showPartsSelection(parts, onConfirm) {
        this.clearActions();
        
        const selectedParts = new Set();
        
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
        
        // Create category buttons first
        const categoryNav = document.createElement('div');
        categoryNav.className = 'category-nav';
        
        const categories = typeof PART_CATEGORIES !== 'undefined' ? PART_CATEGORIES : [
            { id: 'misc', name: 'Parts', icon: '●' }
        ];
        
        categories.forEach(cat => {
            if (!categorizedParts[cat.id]) return;
            
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
        
        categories.forEach(cat => {
            if (!categorizedParts[cat.id]) return;
            
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
                        option.classList.add('selected');
                    } else {
                        selectedParts.delete(part.id);
                        option.classList.remove('selected');
                    }
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
        
        this.elements.actionArea.appendChild(container);
        
        // Button container
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'mt-2';
        
        // Confirm button
        const confirmBtn = this.createButton('confirm repair', () => {
            onConfirm(Array.from(selectedParts));
        }, { className: 'primary', disabled: true });
        confirmBtn.id = 'confirm-repair-btn';
        buttonContainer.appendChild(confirmBtn);
        
        // Cancel button
        const cancelBtn = this.createButton('cancel', () => {
            this.clearActions();
            if (typeof Game !== 'undefined') {
                Game.phase = 'idle';
                Game.gameLoop();
            }
        }, {});
        buttonContainer.appendChild(cancelBtn);
        
        this.elements.actionArea.appendChild(buttonContainer);
        
        // Update confirm button state
        function updateConfirmButton() {
            confirmBtn.disabled = selectedParts.size === 0;
        }
    },

    // ═══════════════════════════════════════════
    // Status Panel Updates
    // ═══════════════════════════════════════════

    /**
     * Update money display with animation
     * @param {number} amount - New amount
     * @param {number} change - Amount changed (positive or negative)
     */
    updateMoney(amount, change = 0) {
        const display = this.elements.moneyDisplay;
        display.textContent = `€${amount}`;
        
        if (change > 0) {
            display.classList.remove('loss');
            display.classList.add('gain');
            this.playSound('cash');
        } else if (change < 0) {
            display.classList.remove('gain');
            display.classList.add('loss');
        }
        
        setTimeout(() => {
            display.classList.remove('gain', 'loss');
        }, 500);
    },

    /**
     * Update reputation display
     * @param {number} value - Reputation value (0-100)
     */
    updateReputation(value) {
        this.elements.reputationFill.style.width = `${value}%`;
        this.elements.reputationValue.textContent = value;
    },

    /**
     * Update day display
     * @param {number} day - Current day
     */
    updateDay(day) {
        this.elements.dayDisplay.textContent = day;
        this.elements.dayCounter.textContent = `day ${day}`;
    },

    /**
     * Update time of day
     * @param {string} time - morning/afternoon/evening
     */
    updateTimeOfDay(time) {
        this.elements.timeOfDay.textContent = time;
    },

    /**
     * Update rent countdown
     * @param {number} days - Days until rent due
     */
    updateRentCountdown(days) {
        this.elements.rentDisplay.textContent = `${days} days`;
        this.elements.rentCountdown.textContent = days;
        
        this.elements.rentWarning.classList.remove('hidden');
        
        if (days <= 2) {
            this.elements.rentWarning.classList.add('urgent');
        } else {
            this.elements.rentWarning.classList.remove('urgent');
        }
    },

    /**
     * Update jobs completed count
     * @param {number} count - Number of jobs
     */
    updateJobsCount(count) {
        this.elements.jobsDisplay.textContent = count;
    },

    /**
     * Update current job display
     * @param {Object|null} job - Current job or null
     */
    updateCurrentJob(job) {
        if (job) {
            const car = job.car;
            this.elements.currentJob.innerHTML = `
                ${car.year} ${car.make} ${car.model}<br>
                <span class="dim">${car.condition}</span>
            `;
            this.elements.currentJob.classList.remove('dim');
        } else {
            this.elements.currentJob.textContent = 'empty';
            this.elements.currentJob.classList.add('dim');
        }
    },

    /**
     * Update waiting cars list
     * @param {Array} cars - Array of waiting cars with patience
     */
    updateWaitingCars(cars) {
        if (cars.length === 0) {
            this.elements.waitingList.innerHTML = '<li class="dim">no one waiting</li>';
        } else {
            this.elements.waitingList.innerHTML = cars.map(car => `
                <li>
                    ${car.customer.name}'s ${car.car.make} ${car.car.model}
                    <span class="patience">(${car.customer.patience} days)</span>
                </li>
            `).join('');
        }
    },
    
    /**
     * Update set-aside jobs list
     * @param {Array} jobs - Array of set-aside jobs
     */
    updateSetAsideJobs(jobs) {
        const container = document.getElementById('set-aside-jobs');
        const list = document.getElementById('set-aside-list');
        
        if (!container || !list) return;
        
        if (!jobs || jobs.length === 0) {
            container.classList.add('hidden');
            list.innerHTML = '';
        } else {
            container.classList.remove('hidden');
            list.innerHTML = jobs.map((job, index) => {
                const statusText = job.orderedParts ? '(waiting for parts)' : '(set aside)';
                return `
                    <li class="set-aside-job clickable" data-index="${index}">
                        ${job.customer.name}'s ${job.car.make}
                        <span class="job-status">${statusText}</span>
                    </li>
                `;
            }).join('');
        }
    },

    /**
     * Update orders section
     * @param {Array} orders - Array of pending orders
     */
    updateOrders(orders) {
        if (orders.length === 0) {
            this.elements.ordersSection.classList.add('hidden');
        } else {
            this.elements.ordersSection.classList.remove('hidden');
            this.elements.ordersList.innerHTML = orders.map(order => `
                <li>
                    ${order.partName}
                    <span class="arrival">(${order.daysRemaining} days)</span>
                </li>
            `).join('');
        }
    },

    // ═══════════════════════════════════════════
    // Garage Description
    // ═══════════════════════════════════════════

    /**
     * Update garage description based on upgrades
     * @param {Object} garage - Garage state
     */
    updateGarageDescription(garage) {
        let lines = [];
        
        // Base description
        if (garage.hasTwoLifts) {
            lines.push('two lifts now.');
        } else {
            lines.push('a small garage.');
            lines.push('one lift.');
        }
        
        // Add upgrade descriptions
        if (garage.hasPartStorage) {
            lines.push('parts shelf on the back wall.');
        }
        
        if (garage.hasWaitingRoom) {
            lines.push('the waiting room has three chairs and a dying plant.');
        }
        
        if (garage.hasDiagnosticScanner) {
            lines.push('a diagnostic scanner sits by the door.');
        }
        
        if (garage.hasAlignmentRig) {
            lines.push('an alignment rig takes up the corner.');
        }
        
        // Atmosphere
        lines.push('the smell of oil and old coffee.');
        lines.push('a radio plays somewhere.');
        
        this.elements.garageDescription.innerHTML = lines.map(line => 
            `<p class="static-text">${line}</p>`
        ).join('');
    },

    // ═══════════════════════════════════════════
    // Upgrades Panel
    // ═══════════════════════════════════════════

    /**
     * Render available upgrades
     * @param {Array} upgrades - All upgrades
     * @param {Object} state - Current game state
     * @param {Function} onPurchase - Callback when upgrade purchased
     */
    renderUpgrades(upgrades, state, onPurchase) {
        this.elements.upgradesList.innerHTML = '';
        
        upgrades.forEach(upgrade => {
            const owned = state.garage[upgrade.stateKey];
            const canAfford = state.money >= upgrade.cost;
            const hasRep = state.reputation >= (upgrade.requiresReputation || 0);
            const repRequired = upgrade.requiresReputation || 0;
            
            // Show upgrades that are owned OR can be afforded OR locked by reputation
            if (!owned && !canAfford && !hasRep) {
                return; // Skip if can't afford AND don't have rep
            }
            
            const item = document.createElement('div');
            item.className = 'upgrade-item';
            
            if (owned) {
                item.classList.add('owned');
            } else if (!hasRep) {
                item.classList.add('locked');
            } else if (canAfford) {
                item.classList.add('available');
            }
            
            // Build cost/reputation display
            let costDisplay = '';
            if (owned) {
                costDisplay = '<span class="owned-label">✓ owned</span>';
            } else {
                const parts = [];
                parts.push(`€${upgrade.cost}`);
                if (repRequired > 0) {
                    if (hasRep) {
                        parts.push(`<span class="rep-met">rep ${repRequired}✓</span>`);
                    } else {
                        parts.push(`<span class="rep-required">rep ${repRequired} required</span>`);
                    }
                }
                costDisplay = parts.join(' • ');
            }
            
            item.innerHTML = `
                <div class="upgrade-name">${upgrade.name}</div>
                <div class="upgrade-cost">${costDisplay}</div>
                ${upgrade.description ? `<div class="upgrade-desc">${upgrade.description}</div>` : ''}
            `;
            
            // Only allow click if not owned, can afford, and has reputation
            if (!owned && canAfford && hasRep) {
                item.style.cursor = 'pointer';
                item.addEventListener('click', () => {
                    onPurchase(upgrade);
                });
            } else if (!owned) {
                item.style.cursor = 'not-allowed';
            }
            
            this.elements.upgradesList.appendChild(item);
        });
    },

    // ═══════════════════════════════════════════
    // Game Over / Win Screens
    // ═══════════════════════════════════════════

    /**
     * Show game over screen
     * @param {string[]} lines - Final text lines
     */
    showGameOver(lines) {
        this.elements.overlayContent.className = 'game-over';
        this.elements.overlayContent.innerHTML = `
            <p class="title">garage closed</p>
            ${lines.map(line => `<p>${line}</p>`).join('')}
            <button class="btn primary mt-3" onclick="Game.restart()">start again</button>
        `;
        this.elements.overlay.classList.add('visible');
        this.playSound('bad');
    },

    /**
     * Show win screen
     * @param {string[]} lines - Victory text lines
     */
    showWin(lines) {
        this.elements.overlayContent.className = 'game-won';
        this.elements.overlayContent.innerHTML = `
            <p class="title">word spreads</p>
            ${lines.map(line => `<p>${line}</p>`).join('')}
            <button class="btn primary mt-3" onclick="UI.hideOverlay(); Game.continuePrestige();">continue</button>
        `;
        this.elements.overlay.classList.add('visible');
        this.playSound('cash');
    },

    /**
     * Hide overlay
     */
    hideOverlay() {
        this.elements.overlay.classList.remove('visible');
    },

    // ═══════════════════════════════════════════
    // Utility
    // ═══════════════════════════════════════════

    /**
     * Promise-based delay
     * @param {number} ms - Milliseconds to wait
     */
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    /**
     * Update all UI elements from game state
     * @param {Object} state - Full game state
     */
    updateAll(state) {
        this.updateMoney(state.money);
        this.updateReputation(state.reputation);
        this.updateDay(state.day);
        this.updateTimeOfDay(state.timeOfDay);
        this.updateRentCountdown(state.rentDueIn);
        this.updateJobsCount(state.completedJobs);
        this.updateCurrentJob(state.currentJob);
        this.updateWaitingCars(state.waitingCars);
        this.updateSetAsideJobs(state.setAsideJobs || []);
        this.updateGarageDescription(state.garage);
        
        // Update orders
        if (state.orders && state.orders.length > 0) {
            this.updateOrders(state.orders);
        } else {
            this.elements.ordersSection.classList.add('hidden');
        }
    }
};

// Variables for parts selection callback
let currentDiagnostics = [];
let currentOnSelect = null;
