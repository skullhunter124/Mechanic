/* ═══════════════════════════════════════════
   MECHANIC - Parts Catalog
   All parts needed for repairs
   ═══════════════════════════════════════════ */

const PARTS = [
    // ═══════════════════════════════════════════
    // Brakes
    // ═══════════════════════════════════════════
    {
        id: 'brake_pads_front',
        name: 'front brake pads',
        cost: 35,
        deliveryDays: 1,
        commonStock: true
    },
    {
        id: 'brake_pads_rear',
        name: 'rear brake pads',
        cost: 30,
        deliveryDays: 1,
        commonStock: true
    },
    {
        id: 'brake_rotors_front',
        name: 'front brake rotors',
        cost: 65,
        deliveryDays: 2,
        commonStock: false
    },
    {
        id: 'brake_rotors_rear',
        name: 'rear brake rotors',
        cost: 55,
        deliveryDays: 2,
        commonStock: false
    },
    {
        id: 'brake_caliper',
        name: 'brake caliper',
        cost: 85,
        deliveryDays: 2,
        commonStock: false
    },
    {
        id: 'brake_fluid',
        name: 'brake fluid',
        cost: 12,
        deliveryDays: 0,
        commonStock: true
    },
    {
        id: 'brake_lines',
        name: 'brake lines',
        cost: 45,
        deliveryDays: 2,
        commonStock: false
    },
    {
        id: 'brake_master_cylinder',
        name: 'brake master cylinder',
        cost: 120,
        deliveryDays: 3,
        commonStock: false
    },

    // ═══════════════════════════════════════════
    // Engine
    // ═══════════════════════════════════════════
    {
        id: 'oil_filter',
        name: 'oil filter',
        cost: 8,
        deliveryDays: 0,
        commonStock: true
    },
    {
        id: 'engine_oil',
        name: 'engine oil',
        cost: 25,
        deliveryDays: 0,
        commonStock: true
    },
    {
        id: 'spark_plugs',
        name: 'spark plugs (set)',
        cost: 28,
        deliveryDays: 1,
        commonStock: true
    },
    {
        id: 'ignition_coil',
        name: 'ignition coil',
        cost: 55,
        deliveryDays: 1,
        commonStock: false
    },
    {
        id: 'air_filter',
        name: 'air filter',
        cost: 15,
        deliveryDays: 0,
        commonStock: true
    },
    {
        id: 'fuel_filter',
        name: 'fuel filter',
        cost: 18,
        deliveryDays: 1,
        commonStock: true
    },
    {
        id: 'timing_belt',
        name: 'timing belt',
        cost: 45,
        deliveryDays: 2,
        commonStock: false
    },
    {
        id: 'serpentine_belt',
        name: 'serpentine belt',
        cost: 35,
        deliveryDays: 1,
        commonStock: true
    },
    {
        id: 'coolant',
        name: 'coolant',
        cost: 15,
        deliveryDays: 0,
        commonStock: true
    },
    {
        id: 'thermostat',
        name: 'thermostat',
        cost: 25,
        deliveryDays: 1,
        commonStock: true
    },
    {
        id: 'water_pump',
        name: 'water pump',
        cost: 85,
        deliveryDays: 2,
        commonStock: false
    },
    {
        id: 'radiator',
        name: 'radiator',
        cost: 150,
        deliveryDays: 3,
        commonStock: false
    },
    {
        id: 'radiator_hose',
        name: 'radiator hose',
        cost: 22,
        deliveryDays: 1,
        commonStock: true
    },
    {
        id: 'head_gasket',
        name: 'head gasket kit',
        cost: 120,
        deliveryDays: 3,
        commonStock: false
    },
    {
        id: 'valve_cover_gasket',
        name: 'valve cover gasket',
        cost: 35,
        deliveryDays: 2,
        commonStock: false
    },
    {
        id: 'fuel_pump',
        name: 'fuel pump',
        cost: 140,
        deliveryDays: 3,
        commonStock: false
    },
    {
        id: 'fuel_injector',
        name: 'fuel injector',
        cost: 95,
        deliveryDays: 2,
        commonStock: false
    },
    {
        id: 'maf_sensor',
        name: 'MAF sensor',
        cost: 120,
        deliveryDays: 2,
        commonStock: false
    },
    {
        id: 'oxygen_sensor',
        name: 'oxygen sensor',
        cost: 65,
        deliveryDays: 1,
        commonStock: false
    },
    {
        id: 'pcv_valve',
        name: 'PCV valve',
        cost: 15,
        deliveryDays: 1,
        commonStock: true
    },
    {
        id: 'engine_mount',
        name: 'engine mount',
        cost: 55,
        deliveryDays: 2,
        commonStock: false
    },

    // ═══════════════════════════════════════════
    // Electrical
    // ═══════════════════════════════════════════
    {
        id: 'battery',
        name: 'car battery',
        cost: 85,
        deliveryDays: 0,
        commonStock: true
    },
    {
        id: 'alternator',
        name: 'alternator',
        cost: 150,
        deliveryDays: 2,
        commonStock: false
    },
    {
        id: 'starter_motor',
        name: 'starter motor',
        cost: 130,
        deliveryDays: 2,
        commonStock: false
    },
    {
        id: 'headlight_bulb',
        name: 'headlight bulb',
        cost: 18,
        deliveryDays: 0,
        commonStock: true
    },
    {
        id: 'taillight_bulb',
        name: 'taillight bulb',
        cost: 8,
        deliveryDays: 0,
        commonStock: true
    },
    {
        id: 'indicator_bulb',
        name: 'indicator bulb',
        cost: 6,
        deliveryDays: 0,
        commonStock: true
    },
    {
        id: 'fuse_kit',
        name: 'fuse kit',
        cost: 12,
        deliveryDays: 0,
        commonStock: true
    },
    {
        id: 'relay',
        name: 'relay',
        cost: 15,
        deliveryDays: 1,
        commonStock: true
    },

    // ═══════════════════════════════════════════
    // Suspension & Steering
    // ═══════════════════════════════════════════
    {
        id: 'shock_absorber',
        name: 'shock absorber',
        cost: 65,
        deliveryDays: 1,
        commonStock: false
    },
    {
        id: 'strut',
        name: 'strut assembly',
        cost: 120,
        deliveryDays: 2,
        commonStock: false
    },
    {
        id: 'control_arm',
        name: 'control arm',
        cost: 85,
        deliveryDays: 2,
        commonStock: false
    },
    {
        id: 'ball_joint',
        name: 'ball joint',
        cost: 45,
        deliveryDays: 1,
        commonStock: false
    },
    {
        id: 'tie_rod',
        name: 'tie rod end',
        cost: 35,
        deliveryDays: 1,
        commonStock: false
    },
    {
        id: 'sway_bar_link',
        name: 'sway bar link',
        cost: 28,
        deliveryDays: 1,
        commonStock: false
    },
    {
        id: 'bushing_kit',
        name: 'bushing kit',
        cost: 40,
        deliveryDays: 2,
        commonStock: false
    },
    {
        id: 'wheel_bearing',
        name: 'wheel bearing',
        cost: 55,
        deliveryDays: 2,
        commonStock: false
    },
    {
        id: 'cv_axle',
        name: 'CV axle',
        cost: 95,
        deliveryDays: 2,
        commonStock: false
    },
    {
        id: 'power_steering_fluid',
        name: 'power steering fluid',
        cost: 12,
        deliveryDays: 0,
        commonStock: true
    },
    {
        id: 'power_steering_pump',
        name: 'power steering pump',
        cost: 140,
        deliveryDays: 3,
        commonStock: false
    },
    {
        id: 'steering_rack',
        name: 'steering rack',
        cost: 280,
        deliveryDays: 4,
        commonStock: false
    },

    // ═══════════════════════════════════════════
    // Transmission
    // ═══════════════════════════════════════════
    {
        id: 'transmission_fluid',
        name: 'transmission fluid',
        cost: 25,
        deliveryDays: 0,
        commonStock: true
    },
    {
        id: 'clutch_kit',
        name: 'clutch kit',
        cost: 180,
        deliveryDays: 3,
        commonStock: false
    },
    {
        id: 'flywheel',
        name: 'flywheel',
        cost: 150,
        deliveryDays: 3,
        commonStock: false
    },
    {
        id: 'gear_linkage',
        name: 'gear linkage',
        cost: 75,
        deliveryDays: 2,
        commonStock: false
    },
    {
        id: 'transmission_mount',
        name: 'transmission mount',
        cost: 45,
        deliveryDays: 2,
        commonStock: false
    },

    // ═══════════════════════════════════════════
    // Exhaust
    // ═══════════════════════════════════════════
    {
        id: 'exhaust_manifold_gasket',
        name: 'exhaust manifold gasket',
        cost: 25,
        deliveryDays: 1,
        commonStock: false
    },
    {
        id: 'catalytic_converter',
        name: 'catalytic converter',
        cost: 350,
        deliveryDays: 4,
        commonStock: false
    },
    {
        id: 'muffler',
        name: 'muffler',
        cost: 95,
        deliveryDays: 2,
        commonStock: false
    },
    {
        id: 'exhaust_pipe',
        name: 'exhaust pipe section',
        cost: 65,
        deliveryDays: 2,
        commonStock: false
    },

    // ═══════════════════════════════════════════
    // Climate Control
    // ═══════════════════════════════════════════
    {
        id: 'ac_recharge',
        name: 'A/C recharge',
        cost: 45,
        deliveryDays: 0,
        commonStock: true
    },
    {
        id: 'ac_compressor',
        name: 'A/C compressor',
        cost: 220,
        deliveryDays: 3,
        commonStock: false
    },
    {
        id: 'cabin_filter',
        name: 'cabin air filter',
        cost: 18,
        deliveryDays: 0,
        commonStock: true
    },
    {
        id: 'blower_motor',
        name: 'blower motor',
        cost: 95,
        deliveryDays: 2,
        commonStock: false
    },

    // ═══════════════════════════════════════════
    // Wheels & Tyres
    // ═══════════════════════════════════════════
    {
        id: 'tyre',
        name: 'tyre',
        cost: 85,
        deliveryDays: 1,
        commonStock: true
    },
    {
        id: 'tyre_budget',
        name: 'budget tyre',
        cost: 55,
        deliveryDays: 1,
        commonStock: true
    },
    {
        id: 'tyre_premium',
        name: 'premium tyre',
        cost: 140,
        deliveryDays: 2,
        commonStock: false
    },
    {
        id: 'valve_stem',
        name: 'valve stem',
        cost: 5,
        deliveryDays: 0,
        commonStock: true
    },
    {
        id: 'wheel_alignment',
        name: 'wheel alignment',
        cost: 60,
        deliveryDays: 0,
        commonStock: false
    },
    {
        id: 'tyre_repair_kit',
        name: 'tyre repair kit',
        cost: 15,
        deliveryDays: 0,
        commonStock: true
    },

    // ═══════════════════════════════════════════
    // Misc / Consumables
    // ═══════════════════════════════════════════
    {
        id: 'windshield_wiper',
        name: 'windshield wiper',
        cost: 22,
        deliveryDays: 0,
        commonStock: true
    },
    {
        id: 'windshield_washer_fluid',
        name: 'washer fluid',
        cost: 8,
        deliveryDays: 0,
        commonStock: true
    },
    {
        id: 'grease',
        name: 'grease',
        cost: 10,
        deliveryDays: 0,
        commonStock: true
    },
    {
        id: 'gasket_sealant',
        name: 'gasket sealant',
        cost: 12,
        deliveryDays: 0,
        commonStock: true
    },
    {
        id: 'coolant_hose',
        name: 'coolant hose',
        cost: 25,
        deliveryDays: 1,
        commonStock: true
    },
    {
        id: 'vacuum_hose',
        name: 'vacuum hose',
        cost: 15,
        deliveryDays: 1,
        commonStock: true
    },
    {
        id: 'idle_control_valve',
        name: 'idle control valve',
        cost: 75,
        deliveryDays: 2,
        commonStock: false
    },
    {
        id: 'throttle_body_gasket',
        name: 'throttle body gasket',
        cost: 18,
        deliveryDays: 1,
        commonStock: false
    },
    {
        id: 'turbocharger',
        name: 'turbocharger',
        cost: 650,
        deliveryDays: 5,
        commonStock: false
    },
    {
        id: 'intercooler',
        name: 'intercooler',
        cost: 280,
        deliveryDays: 3,
        commonStock: false
    },
    {
        id: 'boost_hose',
        name: 'boost hose',
        cost: 45,
        deliveryDays: 2,
        commonStock: false
    },
    {
        id: 'wastegate',
        name: 'wastegate',
        cost: 180,
        deliveryDays: 3,
        commonStock: false
    }
];
