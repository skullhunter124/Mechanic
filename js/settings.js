/* ═══════════════════════════════════════════
   MECHANIC - Settings Module
   Theme, sound, and game settings
   ═══════════════════════════════════════════ */

const Settings = {
    // Default settings
    defaults: {
        theme: 'default',
        soundEnabled: true,
        textSpeed: 'normal'
    },
    
    // Current settings
    current: {},
    
    // Storage key
    STORAGE_KEY: 'mechanic_settings',
    
    // ═══════════════════════════════════════════
    // Initialization
    // ═══════════════════════════════════════════
    
    init() {
        // Load saved settings
        this.load();
        
        // Apply loaded settings
        this.applyTheme(this.current.theme);
        this.applySound(this.current.soundEnabled);
        this.applyTextSpeed(this.current.textSpeed);
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Update UI to reflect current settings
        this.updateUI();
    },
    
    // ═══════════════════════════════════════════
    // Event Listeners
    // ═══════════════════════════════════════════
    
    setupEventListeners() {
        // Settings button
        const settingsBtn = document.getElementById('settings-btn');
        if (settingsBtn) {
            settingsBtn.addEventListener('click', () => this.toggle());
        }
        
        // Close button
        const closeBtn = document.getElementById('settings-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.close());
        }
        
        // Theme buttons
        document.querySelectorAll('.theme-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.setTheme(btn.dataset.theme);
            });
        });
        
        // Sound toggle
        const soundToggle = document.getElementById('sound-toggle');
        if (soundToggle) {
            soundToggle.addEventListener('change', (e) => {
                this.setSound(e.target.checked);
            });
        }
        
        // Speed buttons
        document.querySelectorAll('.speed-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.setTextSpeed(btn.dataset.speed);
            });
        });
        
        // Close settings when clicking outside
        document.addEventListener('click', (e) => {
            const panel = document.getElementById('settings-panel');
            const btn = document.getElementById('settings-btn');
            if (panel && btn && !panel.contains(e.target) && !btn.contains(e.target)) {
                this.close();
            }
        });
        
        // Import file input
        const importFile = document.getElementById('import-file');
        if (importFile) {
            importFile.addEventListener('change', async (e) => {
                if (e.target.files.length > 0) {
                    const success = await Storage.importSave(e.target.files[0]);
                    if (success) {
                        alert('Save imported successfully! The page will reload.');
                        location.reload();
                    } else {
                        alert('Failed to import save. Invalid file.');
                    }
                    e.target.value = '';
                }
            });
        }
    },
    
    // ═══════════════════════════════════════════
    // Panel Control
    // ═══════════════════════════════════════════
    
    toggle() {
        const panel = document.getElementById('settings-panel');
        if (panel) {
            panel.classList.toggle('hidden');
        }
    },
    
    open() {
        const panel = document.getElementById('settings-panel');
        if (panel) {
            panel.classList.remove('hidden');
        }
    },
    
    close() {
        const panel = document.getElementById('settings-panel');
        if (panel) {
            panel.classList.add('hidden');
        }
    },
    
    // ═══════════════════════════════════════════
    // Settings Setters
    // ═══════════════════════════════════════════
    
    setTheme(theme) {
        this.current.theme = theme;
        this.applyTheme(theme);
        this.save();
        this.updateUI();
    },
    
    setSound(enabled) {
        this.current.soundEnabled = enabled;
        this.applySound(enabled);
        this.save();
    },
    
    setTextSpeed(speed) {
        this.current.textSpeed = speed;
        this.applyTextSpeed(speed);
        this.save();
        this.updateUI();
    },
    
    // ═══════════════════════════════════════════
    // Settings Appliers
    // ═══════════════════════════════════════════
    
    applyTheme(theme) {
        document.body.setAttribute('data-theme', theme);
    },
    
    applySound(enabled) {
        if (typeof UI !== 'undefined' && UI.sounds) {
            UI.sounds.enabled = enabled;
        }
    },
    
    applyTextSpeed(speed) {
        if (typeof UI !== 'undefined' && UI.config) {
            switch (speed) {
                case 'fast':
                    UI.config.lineDelay = 10;
                    UI.config.charDelay = 0;
                    break;
                case 'normal':
                    UI.config.lineDelay = 20;
                    UI.config.charDelay = 0;
                    break;
                case 'slow':
                    UI.config.lineDelay = 40;
                    UI.config.charDelay = 0;
                    break;
            }
        }
    },
    
    // ═══════════════════════════════════════════
    // UI Update
    // ═══════════════════════════════════════════
    
    updateUI() {
        // Update theme buttons
        document.querySelectorAll('.theme-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.theme === this.current.theme);
        });
        
        // Update sound toggle
        const soundToggle = document.getElementById('sound-toggle');
        if (soundToggle) {
            soundToggle.checked = this.current.soundEnabled;
        }
        
        // Update speed buttons
        document.querySelectorAll('.speed-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.speed === this.current.textSpeed);
        });
    },
    
    // ═══════════════════════════════════════════
    // Save/Load
    // ═══════════════════════════════════════════
    
    save() {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.current));
        } catch (e) {
            console.error('Failed to save settings:', e);
        }
    },
    
    load() {
        try {
            const saved = localStorage.getItem(this.STORAGE_KEY);
            if (saved) {
                this.current = { ...this.defaults, ...JSON.parse(saved) };
            } else {
                this.current = { ...this.defaults };
            }
        } catch (e) {
            console.error('Failed to load settings:', e);
            this.current = { ...this.defaults };
        }
    },
    
    // ═══════════════════════════════════════════
    // Import Save
    // ═══════════════════════════════════════════
    
    importSave() {
        const input = document.getElementById('import-file');
        if (input) {
            input.click();
        }
    }
};
