/* ═══════════════════════════════════════════
   MECHANIC - Garage Upgrades
   ═══════════════════════════════════════════ */

const UPGRADES = [
    // ═══════════════════════════════════════════
    // Basic Upgrades (Early Game)
    // ═══════════════════════════════════════════
    {
        id: 'parts_storage',
        name: 'parts shelf',
        cost: 150,
        requiresReputation: 15,
        stateKey: 'hasPartStorage',
        description: 'stock common parts. no more waiting for brake pads.'
    },
    {
        id: 'diagnostic_scanner',
        name: 'diagnostic scanner',
        cost: 300,
        requiresReputation: 20,
        stateKey: 'hasDiagnosticScanner',
        description: 'reads fault codes. takes the guesswork out. mostly.'
    },
    {
        id: 'waiting_room',
        name: 'waiting room',
        cost: 200,
        requiresReputation: 30,
        stateKey: 'hasWaitingRoom',
        description: 'three chairs and a coffee machine. customers wait longer.'
    },
    {
        id: 'second_lift',
        name: 'second lift',
        cost: 800,
        requiresReputation: 40,
        stateKey: 'hasTwoLifts',
        description: 'work two jobs at once. double the trouble.'
    },
    {
        id: 'alignment_rig',
        name: 'alignment rig',
        cost: 600,
        requiresReputation: 50,
        stateKey: 'hasAlignmentRig',
        description: 'unlocks suspension and alignment jobs.'
    },
    {
        id: 'ac_machine',
        name: 'A/C machine',
        cost: 450,
        requiresReputation: 35,
        stateKey: 'hasACMachine',
        description: 'proper air conditioning service. not just a recharge.'
    },
    {
        id: 'tire_machine',
        name: 'tire machine',
        cost: 350,
        requiresReputation: 25,
        stateKey: 'hasTireMachine',
        description: 'mount and balance tires in house.'
    },
    {
        id: 'engine_hoist',
        name: 'engine hoist',
        cost: 250,
        requiresReputation: 45,
        stateKey: 'hasEngineHoist',
        description: 'pull engines. put them back. hope they work.'
    },
    {
        id: 'welder',
        name: 'welder',
        cost: 400,
        requiresReputation: 55,
        stateKey: 'hasWelder',
        description: 'fix exhausts. patch rust. fabricate brackets.'
    },
    {
        id: 'spray_gun',
        name: 'spray gun setup',
        cost: 500,
        requiresReputation: 65,
        stateKey: 'hasSprayGun',
        description: 'basic paint work. touch ups. primer.'
    },

    // ═══════════════════════════════════════════
    // Advanced Upgrades (Mid-Late Game)
    // ═══════════════════════════════════════════
    {
        id: 'transmission_jack',
        name: 'transmission jack',
        cost: 350,
        requiresReputation: 50,
        stateKey: 'hasTransmissionJack',
        description: 'safely remove transmissions. your back will thank you.'
    },
    {
        id: 'engine_stand',
        name: 'engine stand',
        cost: 180,
        requiresReputation: 45,
        stateKey: 'hasEngineStand',
        description: 'work on engines at eye level. rotate them. rebuild properly.'
    },
    {
        id: 'pressure_tester',
        name: 'coolant pressure tester',
        cost: 120,
        requiresReputation: 30,
        stateKey: 'hasPressureTester',
        description: 'find cooling system leaks fast. no more guessing.'
    },
    {
        id: 'compression_tester',
        name: 'compression tester kit',
        cost: 150,
        requiresReputation: 35,
        stateKey: 'hasCompressionTester',
        description: 'check engine health. know before you quote.'
    },
    {
        id: 'vacuum_gauge',
        name: 'vacuum gauge set',
        cost: 85,
        requiresReputation: 25,
        stateKey: 'hasVacuumGauge',
        description: 'diagnose vacuum leaks and engine issues.'
    },
    {
        id: 'fuel_pressure_gauge',
        name: 'fuel pressure gauge',
        cost: 95,
        requiresReputation: 30,
        stateKey: 'hasFuelPressureGauge',
        description: 'test fuel systems. essential for modern cars.'
    },
    {
        id: 'battery_tester',
        name: 'battery analyzer',
        cost: 180,
        requiresReputation: 25,
        stateKey: 'hasBatteryTester',
        description: 'test batteries and charging systems properly.'
    },
    {
        id: 'oscilloscope',
        name: 'automotive oscilloscope',
        cost: 650,
        requiresReputation: 60,
        stateKey: 'hasOscilloscope',
        description: 'see what sensors are actually doing. advanced diagnostics.'
    },
    {
        id: 'smoke_machine',
        name: 'evap smoke machine',
        cost: 380,
        requiresReputation: 45,
        stateKey: 'hasSmokeMachine',
        description: 'find evap and vacuum leaks instantly.'
    },
    {
        id: 'brake_lathe',
        name: 'brake lathe',
        cost: 850,
        requiresReputation: 55,
        stateKey: 'hasBrakeLathe',
        description: 'resurface rotors in house. save customers money.'
    },

    // ═══════════════════════════════════════════
    // Specialty Equipment
    // ═══════════════════════════════════════════
    {
        id: 'spring_compressor',
        name: 'strut spring compressor',
        cost: 150,
        requiresReputation: 40,
        stateKey: 'hasSpringCompressor',
        description: 'safely compress springs for strut work. scary but necessary.'
    },
    {
        id: 'ball_joint_press',
        name: 'ball joint press kit',
        cost: 120,
        requiresReputation: 35,
        stateKey: 'hasBallJointPress',
        description: 'press out ball joints without destroying control arms.'
    },
    {
        id: 'bearing_puller',
        name: 'bearing puller set',
        cost: 200,
        requiresReputation: 40,
        stateKey: 'hasBearingPuller',
        description: 'remove wheel bearings professionally. no hammers.'
    },
    {
        id: 'slide_hammer',
        name: 'slide hammer set',
        cost: 85,
        requiresReputation: 30,
        stateKey: 'hasSlideHammer',
        description: 'pull dents, remove stubborn parts. controlled force.'
    },
    {
        id: 'engine_lift_plate',
        name: 'engine lifting plate',
        cost: 65,
        requiresReputation: 45,
        stateKey: 'hasEngineLiftPlate',
        description: 'attach hoist to engines properly. safety first.'
    },

    // ═══════════════════════════════════════════
    // Shop Improvements
    // ═══════════════════════════════════════════
    {
        id: 'better_lighting',
        name: 'shop lighting upgrade',
        cost: 300,
        requiresReputation: 20,
        stateKey: 'hasBetterLighting',
        description: 'led lights everywhere. see what you\'re doing.'
    },
    {
        id: 'heating_system',
        name: 'shop heating system',
        cost: 450,
        requiresReputation: 30,
        stateKey: 'hasHeating',
        description: 'warm shop in winter. fingers still work. luxury.'
    },
    {
        id: 'ventilation_system',
        name: 'exhaust ventilation',
        cost: 550,
        requiresReputation: 35,
        stateKey: 'hasVentilation',
        description: 'breathe easier. exhaust fumes go outside. novel concept.'
    },
    {
        id: 'floor_coating',
        name: 'epoxy floor coating',
        cost: 400,
        requiresReputation: 40,
        stateKey: 'hasFloorCoating',
        description: 'professional looking floor. easier cleanup. oil wipes off.'
    },
    {
        id: 'tool_cabinet',
        name: 'professional tool cabinet',
        cost: 600,
        requiresReputation: 35,
        stateKey: 'hasToolCabinet',
        description: 'organized tools. everything in its place. finally.'
    },
    {
        id: 'parts_washer',
        name: 'parts washer',
        cost: 280,
        requiresReputation: 30,
        stateKey: 'hasPartsWasher',
        description: 'clean parts properly. solvent tank with a pump.'
    },

    // ═══════════════════════════════════════════
    // Customer Experience
    // ═══════════════════════════════════════════
    {
        id: 'coffee_machine',
        name: 'espresso machine',
        cost: 250,
        requiresReputation: 35,
        stateKey: 'hasCoffeeMachine',
        description: 'real coffee for waiting customers. they appreciate it.'
    },
    {
        id: 'wifi',
        name: 'customer wifi',
        cost: 50,
        requiresReputation: 15,
        stateKey: 'hasWifi',
        description: 'customers can work while they wait. simple but effective.'
    },
    {
        id: 'tv_screen',
        name: 'waiting room tv',
        cost: 200,
        requiresReputation: 40,
        stateKey: 'hasTV',
        description: 'news or sports while they wait. distraction from the bill.'
    },
    {
        id: 'vending_machine',
        name: 'snack vending machine',
        cost: 350,
        requiresReputation: 45,
        stateKey: 'hasVendingMachine',
        description: 'snacks and drinks. small income stream. hungry customers.'
    },
    {
        id: 'shuttle_service',
        name: 'shuttle van',
        cost: 2500,
        requiresReputation: 60,
        stateKey: 'hasShuttle',
        description: 'drive customers home or to work. they come back.'
    },

    // ═══════════════════════════════════════════
    // Performance & Tuning
    // ═══════════════════════════════════════════
    {
        id: 'dyno',
        name: 'chassis dynamometer',
        cost: 15000,
        requiresReputation: 85,
        stateKey: 'hasDyno',
        description: 'measure horsepower. tune engines properly. big investment.'
    },
    {
        id: 'tuning_software',
        name: 'ECU tuning software',
        cost: 800,
        requiresReputation: 65,
        stateKey: 'hasTuningSoftware',
        description: 'remap ECUs. unlock hidden power. for the enthusiasts.'
    },
    {
        id: 'wideband_gauge',
        name: 'wideband o2 kit',
        cost: 250,
        requiresReputation: 55,
        stateKey: 'hasWideband',
        description: 'accurate air-fuel ratio monitoring. essential for tuning.'
    },
    {
        id: 'boost_controller',
        name: 'boost controller kit',
        cost: 180,
        requiresReputation: 50,
        stateKey: 'hasBoostController',
        description: 'adjust turbo boost levels. for the turbo crowd.'
    },

    // ═══════════════════════════════════════════
    // Electric/Hybrid Capability
    // ═══════════════════════════════════════════
    {
        id: 'ev_charger',
        name: 'EV charging station',
        cost: 1200,
        requiresReputation: 50,
        stateKey: 'hasEVCharger',
        description: 'charge electric cars while they\'re in for service.'
    },
    {
        id: 'hybrid_scanner',
        name: 'hybrid/ev diagnostic tool',
        cost: 1800,
        requiresReputation: 55,
        stateKey: 'hasHybridScanner',
        description: 'diagnose hybrid and electric vehicle systems.'
    },
    {
        id: 'high_voltage_kit',
        name: 'high voltage safety kit',
        cost: 450,
        requiresReputation: 50,
        stateKey: 'hasHighVoltageKit',
        description: 'work safely on hybrid and electric vehicles. don\'t die.'
    },

    // ═══════════════════════════════════════════
    // Business Upgrades
    // ═══════════════════════════════════════════
    {
        id: 'booking_system',
        name: 'online booking system',
        cost: 300,
        requiresReputation: 40,
        stateKey: 'hasBookingSystem',
        description: 'customers book online. less phone calls. organized schedule.'
    },
    {
        id: 'digital_records',
        name: 'digital service records',
        cost: 250,
        requiresReputation: 35,
        stateKey: 'hasDigitalRecords',
        description: 'keep track of every car. history at your fingertips.'
    },
    {
        id: 'marketing',
        name: 'marketing campaign',
        cost: 500,
        requiresReputation: 45,
        stateKey: 'hasMarketing',
        description: 'local ads. social media presence. more customers.'
    },
    {
        id: 'website',
        name: 'professional website',
        cost: 400,
        requiresReputation: 30,
        stateKey: 'hasWebsite',
        description: 'showcase your services. reviews. contact info. legitimacy.'
    }
];
