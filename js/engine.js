/* ═══════════════════════════════════════════
   MECHANIC - Engine Module
   Core game logic and loop
   ═══════════════════════════════════════════ */

const Engine = {
    // ═══════════════════════════════════════════
    // Time & Day Management
    // ═══════════════════════════════════════════

    /**
     * Advance time by one slot
     * @param {Object} state - Current game state
     * @param {number} slots - Number of time slots to advance (default 1)
     * @returns {Object} Updated state
     */
    advanceTime(state, slots = 1) {
        const timesOfDay = ['morning', 'afternoon', 'evening'];
        let currentIndex = timesOfDay.indexOf(state.timeOfDay);
        
        for (let i = 0; i < slots; i++) {
            currentIndex++;
            // Don't wrap around - cap at evening
            if (currentIndex >= timesOfDay.length) {
                currentIndex = timesOfDay.length - 1;
            }
        }
        
        state.timeOfDay = timesOfDay[currentIndex];
        
        return state;
    },
    
    /**
     * End the current day and start a new one
     * @param {Object} state - Game state
     * @returns {Object} Updated state
     */
    endDay(state) {
        // Advance to next day
        state.day++;
        state.timeOfDay = 'morning';
        
        // Process new day events
        state = this.processNewDay(state);
        
        return state;
    },

    /**
     * Process new day events
     * @param {Object} state - Game state
     * @returns {Object} Updated state
     */
    processNewDay(state) {
        // Reduce rent countdown
        state.rentDueIn--;
        
        // Process parts orders
        state = this.processOrders(state);
        
        // Reduce waiting car patience
        state = this.processWaitingCars(state);
        
        // Check rent due
        if (state.rentDueIn <= 0) {
            state = this.processRent(state);
        }
        
        return state;
    },

    /**
     * Process rent payment
     * @param {Object} state - Game state
     * @returns {Object} Updated state
     */
    processRent(state) {
        if (state.money >= state.rent) {
            // Store weekly stats for recap before resetting
            const weeklyRecap = {
                jobsCompleted: state.weeklyJobsCompleted || 0,
                earnings: state.weeklyEarnings || 0
            };
            
            state.money -= state.rent;
            state.rentDueIn = 7;
            
            // Reset weekly stats
            state.weeklyJobsCompleted = 0;
            state.weeklyEarnings = 0;
            
            // Store recap for UI to display
            state.lastWeekRecap = weeklyRecap;
        } else {
            state.gameOver = true;
            state.gameOverReason = 'rent';
        }
        
        return state;
    },

    /**
     * Process pending parts orders
     * @param {Object} state - Game state
     * @returns {Object} Updated state
     */
    processOrders(state) {
        if (!state.orders) state.orders = [];
        
        state.orders = state.orders.map(order => ({
            ...order,
            daysRemaining: order.daysRemaining - 1
        }));
        
        // Find arrived orders
        const arrived = state.orders.filter(o => o.daysRemaining <= 0);
        
        // Remove arrived from pending
        state.orders = state.orders.filter(o => o.daysRemaining > 0);
        
        // Store arrived parts for pickup
        if (!state.arrivedParts) state.arrivedParts = [];
        state.arrivedParts.push(...arrived.map(o => o.partId));
        
        return state;
    },

    /**
     * Process waiting cars (reduce patience)
     * @param {Object} state - Game state
     * @returns {Object} Updated state
     */
    processWaitingCars(state) {
        if (!state.waitingCars) state.waitingCars = [];
        
        // Reduce patience
        state.waitingCars = state.waitingCars.map(car => ({
            ...car,
            customer: {
                ...car.customer,
                patience: car.customer.patience - 1
            }
        }));
        
        // Find cars that left (patience <= 0)
        const leaving = state.waitingCars.filter(car => car.customer.patience <= 0);
        
        // Apply reputation penalty for each leaving car
        leaving.forEach(car => {
            state.reputation = Math.max(0, state.reputation - 5);
            state.reputation_history.push({
                type: 'timeout',
                change: -5,
                customer: car.customer.name
            });
        });
        
        // Remove leaving cars
        state.waitingCars = state.waitingCars.filter(car => car.customer.patience > 0);
        
        return state;
    },

    // ═══════════════════════════════════════════
    // Customer Selection
    // ═══════════════════════════════════════════

    /**
     * Get eligible customer scenarios based on reputation and upgrades
     * @param {Object} state - Current game state
     * @returns {Array} Eligible scenarios
     */
    getEligibleScenarios(state) {
        if (typeof CUSTOMERS === 'undefined') return [];
        
        return CUSTOMERS.filter(scenario => {
            // Check reputation range
            if (state.reputation < (scenario.minReputation || 0)) return false;
            if (state.reputation > (scenario.maxReputation || 100)) return false;
            
            // Check required upgrade
            if (scenario.requiresUpgrade && !state.garage[scenario.requiresUpgrade]) {
                return false;
            }
            
            // Check if already seen (optional - can allow repeats)
            // For now, allow repeats for variety
            
            return true;
        });
    },

    /**
     * Select next customer scenario
     * @param {Object} state - Current game state
     * @returns {Object|null} Selected scenario or null
     */
    selectNextCustomer(state) {
        const eligible = this.getEligibleScenarios(state);
        
        if (eligible.length === 0) return null;
        
        // Weighted random selection (prefer unseen scenarios)
        const unseen = eligible.filter(s => !state.unlockedScenarios.includes(s.id));
        
        if (unseen.length > 0 && Math.random() < 0.7) {
            return unseen[Math.floor(Math.random() * unseen.length)];
        }
        
        return eligible[Math.floor(Math.random() * eligible.length)];
    },

    /**
     * Add customer to waiting queue
     * @param {Object} state - Game state
     * @param {Object} scenario - Customer scenario
     * @returns {Object} Updated state
     */
    addWaitingCustomer(state, scenario) {
        // Add patience bonus for waiting room
        let patience = scenario.customer.patience;
        if (state.garage.hasWaitingRoom) {
            patience += 1;
        }
        
        const waitingCar = {
            ...scenario,
            customer: {
                ...scenario.customer,
                patience: patience
            },
            arrivedDay: state.day,
            diagnosticsRun: []
        };
        
        state.waitingCars.push(waitingCar);
        
        return state;
    },

    // ═══════════════════════════════════════════
    // Job Processing
    // ═══════════════════════════════════════════

    /**
     * Start a job (put car on lift)
     * @param {Object} state - Game state
     * @param {number} waitingIndex - Index in waiting cars array
     * @returns {Object} Updated state
     */
    startJob(state, waitingIndex) {
        const car = state.waitingCars[waitingIndex];
        
        if (!car) return state;
        
        // Remove from waiting
        state.waitingCars.splice(waitingIndex, 1);
        
        // Put on lift
        state.currentJob = {
            ...car,
            startedDay: state.day,
            diagnosticsRun: [],
            selectedParts: []
        };
        
        return state;
    },
    
    /**
     * Set aside current job (move off lift but keep in progress)
     * @param {Object} state - Game state
     * @returns {Object} Updated state
     */
    setAsideCurrentJob(state) {
        if (!state.currentJob) return state;
        
        // Initialize setAsideJobs if needed
        if (!state.setAsideJobs) state.setAsideJobs = [];
        
        // Move current job to set aside
        state.setAsideJobs.push(state.currentJob);
        state.currentJob = null;
        
        return state;
    },
    
    /**
     * Resume a set-aside job (put back on lift)
     * @param {Object} state - Game state
     * @param {number} index - Index of set-aside job to resume
     * @returns {Object} Updated state
     */
    resumeJob(state, index) {
        if (!state.setAsideJobs || state.setAsideJobs.length === 0) return state;
        if (state.currentJob) return state; // Lift is occupied
        
        const job = state.setAsideJobs.splice(index, 1)[0];
        state.currentJob = job;
        
        return state;
    },
    
    /**
     * Get max number of lifts available
     * @param {Object} state - Game state
     * @returns {number} Number of lifts
     */
    getMaxLifts(state) {
        return state.garage.hasTwoLifts ? 2 : 1;
    },
    
    /**
     * Check if lift is available
     * @param {Object} state - Game state
     * @returns {boolean} True if lift is free
     */
    isLiftAvailable(state) {
        return !state.currentJob;
    },

    /**
     * Run a diagnostic on current job
     * @param {Object} state - Game state
     * @param {Object} diagnostic - Diagnostic option
     * @returns {Object} Result with state and revealed text
     */
    runDiagnostic(state, diagnostic) {
        if (!state.currentJob) {
            return { state, revealed: [] };
        }
        
        // Deduct cost if any
        if (diagnostic.cost > 0) {
            state.money -= diagnostic.cost;
        }
        
        // Track diagnostic run
        state.currentJob.diagnosticsRun.push(diagnostic.action);
        
        // Advance time if diagnostic takes time
        if (diagnostic.time > 0) {
            state = this.advanceTime(state, diagnostic.time);
        }
        
        return {
            state,
            revealed: diagnostic.reveals
        };
    },

    /**
     * Order parts for a repair
     * @param {Object} state - Game state
     * @param {Array} partIds - Array of part IDs to order
     * @returns {Object} Updated state with order info
     */
    orderParts(state, partIds) {
        const orderedParts = [];
        let totalCost = 0;
        
        partIds.forEach(partId => {
            const part = this.getPartById(partId);
            if (!part) return;
            
            // Check if already in stock (hasPartStorage + commonStock)
            const inStock = state.garage.hasPartStorage && part.commonStock;
            
            if (inStock) {
                // Instant availability
                if (!state.arrivedParts) state.arrivedParts = [];
                state.arrivedParts.push(partId);
            } else {
                // Add to orders
                if (!state.orders) state.orders = [];
                
                state.orders.push({
                    partId: part.id,
                    partName: part.name,
                    daysRemaining: part.deliveryDays,
                    ordered: state.day
                });
            }
            
            totalCost += part.cost;
            orderedParts.push(part);
        });
        
        state.money -= totalCost;
        
        return {
            state,
            orderedParts,
            totalCost
        };
    },

    /**
     * Get part by ID
     * @param {string} partId - Part ID
     * @returns {Object|null} Part object
     */
    getPartById(partId) {
        if (typeof PARTS === 'undefined') return null;
        return PARTS.find(p => p.id === partId) || null;
    },

    /**
     * Check if parts have arrived for repair
     * @param {Object} state - Game state
     * @param {Array} partIds - Required part IDs
     * @returns {boolean}
     */
    partsAvailable(state, partIds) {
        if (!state.arrivedParts) state.arrivedParts = [];
        
        return partIds.every(partId => state.arrivedParts.includes(partId));
    },

    /**
     * Complete a repair
     * @param {Object} state - Game state
     * @param {Array} partIds - Parts used for repair
     * @returns {Object} Result with state and outcome
     */
    completeRepair(state, partIds) {
        if (!state.currentJob) {
            return { state, outcome: null };
        }
        
        const job = state.currentJob;
        const solution = job.solution;
        
        // Determine outcome type
        let outcomeType;
        
        // Check if all correct repairs done
        const allCorrect = solution.correctRepairs.every(id => partIds.includes(id));
        const someCorrect = solution.acceptableRepairs.some(id => partIds.includes(id));
        const anyWrong = solution.wrongRepairs ? solution.wrongRepairs.some(id => partIds.includes(id)) : false;
        
        if (allCorrect && !anyWrong) {
            outcomeType = 'correct';
        } else if (someCorrect && !anyWrong) {
            outcomeType = 'partial';
        } else {
            outcomeType = 'wrong';
        }
        
        const outcome = job.outcomes[outcomeType];
        
        // Remove used parts from arrived parts
        if (state.arrivedParts) {
            partIds.forEach(partId => {
                const index = state.arrivedParts.indexOf(partId);
                if (index > -1) {
                    state.arrivedParts.splice(index, 1);
                }
            });
        }
        
        // Apply outcome
        state.money += outcome.payment;
        state.reputation = Math.max(0, Math.min(100, state.reputation + outcome.reputationChange));
        state.completedJobs++;
        
        // Track reputation history
        state.reputation_history.push({
            type: outcomeType,
            change: outcome.reputationChange,
            customer: job.customer.name,
            day: state.day
        });
        
        // Keep only last 5 history entries
        if (state.reputation_history.length > 5) {
            state.reputation_history = state.reputation_history.slice(-5);
        }
        
        // Track unlocked scenario
        if (!state.unlockedScenarios.includes(job.id)) {
            state.unlockedScenarios.push(job.id);
        }
        
        // Clear current job
        state.currentJob = null;
        
        // Advance time for repair
        state = this.advanceTime(state, 2);
        
        // Check win condition
        if (state.reputation >= 100 && !state.gameWon) {
            state.gameWon = true;
        }
        
        return {
            state,
            outcomeType,
            outcome
        };
    },

    /**
     * Cancel current job (customer leaves unhappy)
     * @param {Object} state - Game state
     * @returns {Object} Updated state
     */
    cancelJob(state) {
        if (!state.currentJob) return state;
        
        // Apply timeout outcome
        const outcome = state.currentJob.outcomes.timeout;
        
        state.reputation = Math.max(0, state.reputation + outcome.reputationChange);
        state.reputation_history.push({
            type: 'timeout',
            change: outcome.reputationChange,
            customer: state.currentJob.customer.name,
            day: state.day
        });
        
        state.currentJob = null;
        
        return state;
    },

    // ═══════════════════════════════════════════
    // Upgrades
    // ═══════════════════════════════════════════

    /**
     * Purchase an upgrade
     * @param {Object} state - Game state
     * @param {Object} upgrade - Upgrade to purchase
     * @returns {Object} Result with success status and updated state
     */
    purchaseUpgrade(state, upgrade) {
        // Check if can afford
        if (state.money < upgrade.cost) {
            return { success: false, reason: 'money', state };
        }
        
        // Check reputation requirement
        if (state.reputation < (upgrade.requiresReputation || 0)) {
            return { success: false, reason: 'reputation', state };
        }
        
        // Check if already owned
        if (state.garage[upgrade.stateKey]) {
            return { success: false, reason: 'owned', state };
        }
        
        // Purchase
        state.money -= upgrade.cost;
        state.garage[upgrade.stateKey] = true;
        
        // Special handling for second lift
        if (upgrade.stateKey === 'hasTwoLifts') {
            state.garage.lifts = 2;
        }
        
        return { success: true, state };
    },

    // ═══════════════════════════════════════════
    // Random Events
    // ═══════════════════════════════════════════

    /**
     * Check for random events
     * @param {Object} state - Game state
     * @returns {Object|null} Event to trigger or null
     */
    checkForEvent(state) {
        if (typeof EVENTS === 'undefined') return null;
        
        // Small chance of event each day
        if (Math.random() > 0.15) return null;
        
        const eligible = EVENTS.filter(event => {
            if (event.triggerAfterDay && state.day < event.triggerAfterDay) return false;
            if (event.triggerReputation && state.reputation < event.triggerReputation) return false;
            if (event.triggerOnce && state.triggeredEvents && state.triggeredEvents.includes(event.id)) return false;
            return true;
        });
        
        if (eligible.length === 0) return null;
        
        return eligible[Math.floor(Math.random() * eligible.length)];
    },

    /**
     * Apply event effect
     * @param {Object} state - Game state
     * @param {Object} event - Event with effect
     * @param {Object} choice - Selected choice (if any)
     * @returns {Object} Updated state
     */
    applyEventEffect(state, event, choice) {
        if (!choice || !choice.effect) return state;
        
        if (choice.effect.money) {
            state.money += choice.effect.money;
        }
        
        if (choice.effect.reputation) {
            state.reputation = Math.max(0, Math.min(100, state.reputation + choice.effect.reputation));
        }
        
        // Track triggered event
        if (!state.triggeredEvents) state.triggeredEvents = [];
        state.triggeredEvents.push(event.id);
        
        return state;
    },

    // ═══════════════════════════════════════════
    // Game State Utilities
    // ═══════════════════════════════════════════

    /**
     * Create initial game state
     * @returns {Object} Initial state
     */
    createInitialState() {
        return Storage.getDefaultState();
    },

    /**
     * Check if game can continue (not game over)
     * @param {Object} state - Game state
     * @returns {boolean}
     */
    canContinue(state) {
        return !state.gameOver;
    },

    /**
     * Get available parts for current job
     * @param {Object} state - Game state
     * @returns {Array} Available parts
     */
    getAvailableParts(state) {
        if (typeof PARTS === 'undefined') return [];
        
        // Return all parts that could be relevant
        // In a more complex system, this could be filtered by job type
        return PARTS;
    }
};
