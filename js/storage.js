/* ═══════════════════════════════════════════
   MECHANIC - Storage Module
   localStorage save/load system
   ═══════════════════════════════════════════ */

const Storage = {
    // Storage key
    SAVE_KEY: 'mechanic_save',
    
    // Auto-save interval (ms)
    AUTO_SAVE_INTERVAL: 30000, // 30 seconds
    
    // Auto-save timer reference
    autoSaveTimer: null,

    // ═══════════════════════════════════════════
    // Core Save/Load
    // ═══════════════════════════════════════════

    /**
     * Save game state to localStorage
     * @param {Object} state - Game state to save
     * @returns {boolean} Success status
     */
    save(state) {
        try {
            const saveData = {
                version: 1,
                timestamp: Date.now(),
                state: this.sanitizeState(state)
            };
            
            const serialized = JSON.stringify(saveData);
            localStorage.setItem(this.SAVE_KEY, serialized);
            
            return true;
        } catch (error) {
            console.error('Failed to save game:', error);
            return false;
        }
    },

    /**
     * Load game state from localStorage
     * @returns {Object|null} Loaded state or null if not found
     */
    load() {
        try {
            const serialized = localStorage.getItem(this.SAVE_KEY);
            
            if (!serialized) {
                return null;
            }
            
            const saveData = JSON.parse(serialized);
            
            // Version check for future compatibility
            if (saveData.version !== 1) {
                console.warn('Save data version mismatch, may need migration');
            }
            
            return this.validateState(saveData.state);
        } catch (error) {
            console.error('Failed to load game:', error);
            return null;
        }
    },

    /**
     * Check if a save exists
     * @returns {boolean}
     */
    hasSave() {
        return localStorage.getItem(this.SAVE_KEY) !== null;
    },

    /**
     * Delete saved game
     */
    deleteSave() {
        localStorage.removeItem(this.SAVE_KEY);
    },

    // ═══════════════════════════════════════════
    // State Sanitization
    // ═══════════════════════════════════════════

    /**
     * Sanitize state before saving (remove non-serializable data)
     * @param {Object} state - Raw game state
     * @returns {Object} Clean state ready for serialization
     */
    sanitizeState(state) {
        // Create a clean copy
        const clean = JSON.parse(JSON.stringify(state));
        
        // Remove any functions or circular references that might have slipped in
        // (JSON.stringify should handle this, but being explicit)
        
        return clean;
    },

    /**
     * Validate and repair loaded state
     * @param {Object} loadedState - State from storage
     * @returns {Object} Valid state with defaults for missing fields
     */
    validateState(loadedState) {
        // Default state structure
        const defaultState = this.getDefaultState();
        
        if (!loadedState) {
            return null;
        }
        
        // Merge with defaults to ensure all fields exist
        const validated = this.deepMerge(defaultState, loadedState);
        
        // Clamp values to valid ranges
        validated.money = Math.max(0, validated.money);
        validated.reputation = Math.max(0, Math.min(100, validated.reputation));
        validated.rentDueIn = Math.max(0, validated.rentDueIn);
        validated.day = Math.max(1, validated.day);
        
        return validated;
    },

    /**
     * Get default game state
     * @returns {Object} Default state
     */
    getDefaultState() {
        return {
            day: 1,
            timeOfDay: 'morning',
            money: 300,
            reputation: 0,
            rent: 200,
            rentDueIn: 14,
            garage: {
                lifts: 1,
                hasToolbox: true,
                hasDiagnosticScanner: false,
                hasPartStorage: false,
                hasWaitingRoom: false,
                hasTwoLifts: false,
                hasAlignmentRig: false
            },
            currentJob: null,           // Job currently on the lift
            setAsideJobs: [],           // Jobs set aside while waiting for parts
            waitingCars: [],
            completedJobs: 0,
            // Weekly tracking
            weeklyJobsCompleted: 0,
            weeklyEarnings: 0,
            reputation_history: [],
            unlockedScenarios: [],
            orders: [],
            gameOver: false,
            gameWon: false
        };
    },

    // ═══════════════════════════════════════════
    // Auto-Save
    // ═══════════════════════════════════════════

    /**
     * Start auto-save timer
     * @param {Function} getState - Function that returns current state
     */
    startAutoSave(getState) {
        this.stopAutoSave();
        
        this.autoSaveTimer = setInterval(() => {
            const state = getState();
            if (state && !state.gameOver) {
                this.save(state);
            }
        }, this.AUTO_SAVE_INTERVAL);
    },

    /**
     * Stop auto-save timer
     */
    stopAutoSave() {
        if (this.autoSaveTimer) {
            clearInterval(this.autoSaveTimer);
            this.autoSaveTimer = null;
        }
    },

    // ═══════════════════════════════════════════
    // Utility Functions
    // ═══════════════════════════════════════════

    /**
     * Deep merge two objects
     * @param {Object} target - Base object
     * @param {Object} source - Object to merge in
     * @returns {Object} Merged object
     */
    deepMerge(target, source) {
        const result = { ...target };
        
        for (const key in source) {
            if (source.hasOwnProperty(key)) {
                if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
                    result[key] = this.deepMerge(target[key] || {}, source[key]);
                } else {
                    result[key] = source[key];
                }
            }
        }
        
        return result;
    },

    /**
     * Get save info (without full state)
     * @returns {Object|null} Save metadata
     */
    getSaveInfo() {
        try {
            const serialized = localStorage.getItem(this.SAVE_KEY);
            if (!serialized) return null;
            
            const saveData = JSON.parse(serialized);
            return {
                version: saveData.version,
                timestamp: saveData.timestamp,
                day: saveData.state?.day,
                money: saveData.state?.money,
                reputation: saveData.state?.reputation
            };
        } catch (error) {
            return null;
        }
    },

    /**
     * Format timestamp for display
     * @param {number} timestamp - Unix timestamp
     * @returns {string} Formatted date string
     */
    formatSaveDate(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    },

    /**
     * Export save as downloadable file
     */
    exportSave() {
        const serialized = localStorage.getItem(this.SAVE_KEY);
        if (!serialized) return false;
        
        const blob = new Blob([serialized], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `mechanic_save_${Date.now()}.json`;
        a.click();
        
        URL.revokeObjectURL(url);
        return true;
    },

    /**
     * Import save from file
     * @param {File} file - JSON file to import
     * @returns {Promise<boolean>} Success status
     */
    async importSave(file) {
        return new Promise((resolve) => {
            const reader = new FileReader();
            
            reader.onload = (e) => {
                try {
                    const data = JSON.parse(e.target.result);
                    
                    // Validate it's a proper save
                    if (data.version && data.state) {
                        localStorage.setItem(this.SAVE_KEY, e.target.result);
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                } catch (error) {
                    resolve(false);
                }
            };
            
            reader.onerror = () => resolve(false);
            reader.readAsText(file);
        });
    }
};

// Global game state reference (will be set by main.js)
let GameState = null;
