/* ═══════════════════════════════════════════
   MECHANIC - Parts Catalog
   All parts needed for repairs
   ═══════════════════════════════════════════ */

// Parts categories for organization - user-friendly groupings
const PART_CATEGORIES = [
    { id: 'maintenance', name: 'Basic Maintenance', icon: '🔧' },
    { id: 'brakes', name: 'Brakes', icon: '◉' },
    { id: 'engine', name: 'Engine', icon: '⚙' },
    { id: 'electrical', name: 'Electrical', icon: '⚡' },
    { id: 'suspension', name: 'Suspension & Steering', icon: '⬡' },
    { id: 'transmission', name: 'Transmission', icon: '⟳' },
    { id: 'exhaust', name: 'Exhaust', icon: '⋮' },
    { id: 'climate', name: 'Climate Control', icon: '❄' },
    { id: 'wheels', name: 'Wheels & Tyres', icon: '○' },
    { id: 'performance', name: 'Performance', icon: '★' }
];

const PARTS = [
    // ═══════════════════════════════════════════
    // Basic Maintenance (routine service items)
    // ═══════════════════════════════════════════
    {
        id: 'engine_oil',
        name: 'engine oil',
        category: 'maintenance',
        cost: 25,
        deliveryDays: 0,
        commonStock: true
    },
    {
        id: 'oil_filter',
        name: 'oil filter',
        category: 'maintenance',
        cost: 8,
        deliveryDays: 0,
        commonStock: true
    },
    {
        id: 'air_filter',
        name: 'air filter',
        category: 'maintenance',
        cost: 15,
        deliveryDays: 0,
        commonStock: true
    },
    {
        id: 'cabin_filter',
        name: 'cabin air filter',
        category: 'maintenance',
        cost: 18,
        deliveryDays: 0,
        commonStock: true
    },
    {
        id: 'fuel_filter',
        name: 'fuel filter',
        category: 'maintenance',
        cost: 18,
        deliveryDays: 1,
        commonStock: true
    },
    {
        id: 'spark_plugs',
        name: 'spark plugs (set)',
        category: 'maintenance',
        cost: 28,
        deliveryDays: 1,
        commonStock: true
    },
    {
        id: 'timing_belt',
        name: 'timing belt',
        category: 'maintenance',
        cost: 45,
        deliveryDays: 2,
        commonStock: false
    },
    {
        id: 'timing_belt_kit',
        name: 'timing belt kit (with water pump)',
        category: 'maintenance',
        cost: 120,
        deliveryDays: 3,
        commonStock: false
    },
    {
        id: 'serpentine_belt',
        name: 'serpentine belt',
        category: 'maintenance',
        cost: 35,
        deliveryDays: 1,
        commonStock: true
    },
    {
        id: 'coolant',
        name: 'coolant',
        category: 'maintenance',
        cost: 15,
        deliveryDays: 0,
        commonStock: true
    },
    {
        id: 'brake_fluid',
        name: 'brake fluid',
        category: 'maintenance',
        cost: 12,
        deliveryDays: 0,
        commonStock: true
    },
    {
        id: 'transmission_fluid',
        name: 'transmission fluid',
        category: 'maintenance',
        cost: 25,
        deliveryDays: 0,
        commonStock: true
    },
    {
        id: 'power_steering_fluid',
        name: 'power steering fluid',
        category: 'maintenance',
        cost: 12,
        deliveryDays: 0,
        commonStock: true
    },
    {
        id: 'windshield_washer_fluid',
        name: 'washer fluid',
        category: 'maintenance',
        cost: 8,
        deliveryDays: 0,
        commonStock: true
    },
    {
        id: 'windshield_wiper',
        name: 'windshield wiper (pair)',
        category: 'maintenance',
        cost: 35,
        deliveryDays: 0,
        commonStock: true
    },
    {
        id: 'pcv_valve',
        name: 'PCV valve',
        category: 'maintenance',
        cost: 15,
        deliveryDays: 1,
        commonStock: true
    },
    {
        id: 'grease',
        name: 'grease',
        category: 'maintenance',
        cost: 10,
        deliveryDays: 0,
        commonStock: true
    },
    {
        id: 'gasket_sealant',
        name: 'gasket sealant',
        category: 'maintenance',
        cost: 12,
        deliveryDays: 0,
        commonStock: true
    },

    // ═══════════════════════════════════════════
    // Brakes
    // ═══════════════════════════════════════════
    {
        id: 'brake_pads_front',
        name: 'front brake pads',
        category: 'brakes',
        cost: 35,
        deliveryDays: 1,
        commonStock: true
    },
    {
        id: 'brake_pads_rear',
        name: 'rear brake pads',
        category: 'brakes',
        cost: 30,
        deliveryDays: 1,
        commonStock: true
    },
    {
        id: 'brake_rotors_front',
        name: 'front brake rotors',
        category: 'brakes',
        cost: 65,
        deliveryDays: 2,
        commonStock: false
    },
    {
        id: 'brake_rotors_rear',
        name: 'rear brake rotors',
        category: 'brakes',
        cost: 55,
        deliveryDays: 2,
        commonStock: false
    },
    {
        id: 'brake_caliper',
        name: 'brake caliper',
        category: 'brakes',
        cost: 85,
        deliveryDays: 2,
        commonStock: false
    },
    {
        id: 'brake_lines',
        name: 'brake lines',
        category: 'brakes',
        cost: 45,
        deliveryDays: 2,
        commonStock: false
    },
    {
        id: 'brake_master_cylinder',
        name: 'brake master cylinder',
        category: 'brakes',
        cost: 120,
        deliveryDays: 3,
        commonStock: false
    },
    {
        id: 'brake_booster',
        name: 'brake booster',
        category: 'brakes',
        cost: 150,
        deliveryDays: 3,
        commonStock: false
    },
    {
        id: 'abs_sensor',
        name: 'ABS sensor',
        category: 'brakes',
        cost: 45,
        deliveryDays: 1,
        commonStock: false
    },

    // ═══════════════════════════════════════════
    // Engine (internal engine components)
    // ═══════════════════════════════════════════
    {
        id: 'thermostat',
        name: 'thermostat',
        category: 'engine',
        cost: 25,
        deliveryDays: 1,
        commonStock: true
    },
    {
        id: 'water_pump',
        name: 'water pump',
        category: 'engine',
        cost: 85,
        deliveryDays: 2,
        commonStock: false
    },
    {
        id: 'radiator',
        name: 'radiator',
        category: 'engine',
        cost: 150,
        deliveryDays: 3,
        commonStock: false
    },
    {
        id: 'radiator_hose',
        name: 'radiator hose',
        category: 'engine',
        cost: 22,
        deliveryDays: 1,
        commonStock: true
    },
    {
        id: 'coolant_hose',
        name: 'coolant hose',
        category: 'engine',
        cost: 25,
        deliveryDays: 1,
        commonStock: true
    },
    {
        id: 'head_gasket',
        name: 'head gasket kit',
        category: 'engine',
        cost: 120,
        deliveryDays: 3,
        commonStock: false
    },
    {
        id: 'valve_cover_gasket',
        name: 'valve cover gasket',
        category: 'engine',
        cost: 35,
        deliveryDays: 2,
        commonStock: false
    },
    {
        id: 'intake_manifold_gasket',
        name: 'intake manifold gasket',
        category: 'engine',
        cost: 30,
        deliveryDays: 2,
        commonStock: false
    },
    {
        id: 'exhaust_manifold_gasket',
        name: 'exhaust manifold gasket',
        category: 'engine',
        cost: 25,
        deliveryDays: 1,
        commonStock: false
    },
    {
        id: 'throttle_body_gasket',
        name: 'throttle body gasket',
        category: 'engine',
        cost: 18,
        deliveryDays: 1,
        commonStock: false
    },
    {
        id: 'ignition_coil',
        name: 'ignition coil',
        category: 'engine',
        cost: 55,
        deliveryDays: 1,
        commonStock: false
    },
    {
        id: 'fuel_pump',
        name: 'fuel pump',
        category: 'engine',
        cost: 140,
        deliveryDays: 3,
        commonStock: false
    },
    {
        id: 'fuel_injector',
        name: 'fuel injector',
        category: 'engine',
        cost: 95,
        deliveryDays: 2,
        commonStock: false
    },
    {
        id: 'maf_sensor',
        name: 'MAF sensor',
        category: 'engine',
        cost: 120,
        deliveryDays: 2,
        commonStock: false
    },
    {
        id: 'oxygen_sensor',
        name: 'oxygen sensor',
        category: 'engine',
        cost: 65,
        deliveryDays: 1,
        commonStock: false
    },
    {
        id: 'map_sensor',
        name: 'MAP sensor',
        category: 'engine',
        cost: 55,
        deliveryDays: 1,
        commonStock: false
    },
    {
        id: 'coolant_temp_sensor',
        name: 'coolant temperature sensor',
        category: 'engine',
        cost: 25,
        deliveryDays: 1,
        commonStock: true
    },
    {
        id: 'idle_control_valve',
        name: 'idle control valve',
        category: 'engine',
        cost: 75,
        deliveryDays: 2,
        commonStock: false
    },
    {
        id: 'throttle_position_sensor',
        name: 'throttle position sensor',
        category: 'engine',
        cost: 45,
        deliveryDays: 1,
        commonStock: false
    },
    {
        id: 'camshaft_sensor',
        name: 'camshaft position sensor',
        category: 'engine',
        cost: 45,
        deliveryDays: 1,
        commonStock: false
    },
    {
        id: 'crankshaft_sensor',
        name: 'crankshaft position sensor',
        category: 'engine',
        cost: 50,
        deliveryDays: 1,
        commonStock: false
    },
    {
        id: 'engine_mount',
        name: 'engine mount',
        category: 'engine',
        cost: 55,
        deliveryDays: 2,
        commonStock: false
    },
    {
        id: 'vacuum_hose',
        name: 'vacuum hose',
        category: 'engine',
        cost: 15,
        deliveryDays: 1,
        commonStock: true
    },

    // ═══════════════════════════════════════════
    // Electrical
    // ═══════════════════════════════════════════
    {
        id: 'battery',
        name: 'car battery',
        category: 'electrical',
        cost: 85,
        deliveryDays: 0,
        commonStock: true
    },
    {
        id: 'alternator',
        name: 'alternator',
        category: 'electrical',
        cost: 150,
        deliveryDays: 2,
        commonStock: false
    },
    {
        id: 'starter_motor',
        name: 'starter motor',
        category: 'electrical',
        cost: 130,
        deliveryDays: 2,
        commonStock: false
    },
    {
        id: 'headlight_bulb',
        name: 'headlight bulb',
        category: 'electrical',
        cost: 18,
        deliveryDays: 0,
        commonStock: true
    },
    {
        id: 'taillight_bulb',
        name: 'taillight bulb',
        category: 'electrical',
        cost: 8,
        deliveryDays: 0,
        commonStock: true
    },
    {
        id: 'indicator_bulb',
        name: 'indicator bulb',
        category: 'electrical',
        cost: 6,
        deliveryDays: 0,
        commonStock: true
    },
    {
        id: 'fuse_kit',
        name: 'fuse kit',
        category: 'electrical',
        cost: 12,
        deliveryDays: 0,
        commonStock: true
    },
    {
        id: 'relay',
        name: 'relay',
        category: 'electrical',
        cost: 15,
        deliveryDays: 1,
        commonStock: true
    },
    {
        id: 'ignition_switch',
        name: 'ignition switch',
        category: 'electrical',
        cost: 45,
        deliveryDays: 2,
        commonStock: false
    },
    {
        id: 'wiper_motor',
        name: 'wiper motor',
        category: 'electrical',
        cost: 75,
        deliveryDays: 2,
        commonStock: false
    },

    // ═══════════════════════════════════════════
    // Suspension & Steering
    // ═══════════════════════════════════════════
    {
        id: 'shock_absorber',
        name: 'shock absorber',
        category: 'suspension',
        cost: 65,
        deliveryDays: 1,
        commonStock: false
    },
    {
        id: 'strut',
        name: 'strut assembly',
        category: 'suspension',
        cost: 120,
        deliveryDays: 2,
        commonStock: false
    },
    {
        id: 'control_arm',
        name: 'control arm',
        category: 'suspension',
        cost: 85,
        deliveryDays: 2,
        commonStock: false
    },
    {
        id: 'ball_joint',
        name: 'ball joint',
        category: 'suspension',
        cost: 45,
        deliveryDays: 1,
        commonStock: false
    },
    {
        id: 'tie_rod',
        name: 'tie rod end',
        category: 'suspension',
        cost: 35,
        deliveryDays: 1,
        commonStock: false
    },
    {
        id: 'sway_bar_link',
        name: 'sway bar link',
        category: 'suspension',
        cost: 28,
        deliveryDays: 1,
        commonStock: false
    },
    {
        id: 'bushing_kit',
        name: 'bushing kit',
        category: 'suspension',
        cost: 40,
        deliveryDays: 2,
        commonStock: false
    },
    {
        id: 'wheel_bearing',
        name: 'wheel bearing',
        category: 'suspension',
        cost: 55,
        deliveryDays: 2,
        commonStock: false
    },
    {
        id: 'cv_axle',
        name: 'CV axle',
        category: 'suspension',
        cost: 95,
        deliveryDays: 2,
        commonStock: false
    },
    {
        id: 'cv_boot',
        name: 'CV boot kit',
        category: 'suspension',
        cost: 25,
        deliveryDays: 1,
        commonStock: true
    },
    {
        id: 'power_steering_pump',
        name: 'power steering pump',
        category: 'suspension',
        cost: 140,
        deliveryDays: 3,
        commonStock: false
    },
    {
        id: 'steering_rack',
        name: 'steering rack',
        category: 'suspension',
        cost: 280,
        deliveryDays: 4,
        commonStock: false
    },
    {
        id: 'steering_coupling',
        name: 'steering coupling',
        category: 'suspension',
        cost: 35,
        deliveryDays: 2,
        commonStock: false
    },

    // ═══════════════════════════════════════════
    // Transmission
    // ═══════════════════════════════════════════
    {
        id: 'clutch_kit',
        name: 'clutch kit',
        category: 'transmission',
        cost: 180,
        deliveryDays: 3,
        commonStock: false
    },
    {
        id: 'flywheel',
        name: 'flywheel',
        category: 'transmission',
        cost: 150,
        deliveryDays: 3,
        commonStock: false
    },
    {
        id: 'gear_linkage',
        name: 'gear linkage',
        category: 'transmission',
        cost: 75,
        deliveryDays: 2,
        commonStock: false
    },
    {
        id: 'transmission_mount',
        name: 'transmission mount',
        category: 'transmission',
        cost: 45,
        deliveryDays: 2,
        commonStock: false
    },
    {
        id: 'throwout_bearing',
        name: 'throwout bearing',
        category: 'transmission',
        cost: 35,
        deliveryDays: 2,
        commonStock: false
    },
    {
        id: 'slave_cylinder',
        name: 'slave cylinder',
        category: 'transmission',
        cost: 55,
        deliveryDays: 2,
        commonStock: false
    },
    {
        id: 'master_cylinder_clutch',
        name: 'clutch master cylinder',
        category: 'transmission',
        cost: 65,
        deliveryDays: 2,
        commonStock: false
    },

    // ═══════════════════════════════════════════
    // Exhaust
    // ═══════════════════════════════════════════
    {
        id: 'catalytic_converter',
        name: 'catalytic converter',
        category: 'exhaust',
        cost: 350,
        deliveryDays: 4,
        commonStock: false
    },
    {
        id: 'muffler',
        name: 'muffler',
        category: 'exhaust',
        cost: 95,
        deliveryDays: 2,
        commonStock: false
    },
    {
        id: 'exhaust_pipe',
        name: 'exhaust pipe section',
        category: 'exhaust',
        cost: 65,
        deliveryDays: 2,
        commonStock: false
    },
    {
        id: 'exhaust_hanger',
        name: 'exhaust hanger',
        category: 'exhaust',
        cost: 12,
        deliveryDays: 1,
        commonStock: true
    },
    {
        id: 'exhaust_gasket',
        name: 'exhaust gasket',
        category: 'exhaust',
        cost: 15,
        deliveryDays: 1,
        commonStock: true
    },
    {
        id: 'o2_sensor',
        name: 'O2 sensor',
        category: 'exhaust',
        cost: 65,
        deliveryDays: 1,
        commonStock: false
    },

    // ═══════════════════════════════════════════
    // Climate Control
    // ═══════════════════════════════════════════
    {
        id: 'ac_recharge',
        name: 'A/C recharge',
        category: 'climate',
        cost: 45,
        deliveryDays: 0,
        commonStock: true
    },
    {
        id: 'ac_compressor',
        name: 'A/C compressor',
        category: 'climate',
        cost: 220,
        deliveryDays: 3,
        commonStock: false
    },
    {
        id: 'ac_condenser',
        name: 'A/C condenser',
        category: 'climate',
        cost: 150,
        deliveryDays: 3,
        commonStock: false
    },
    {
        id: 'ac_evaporator',
        name: 'A/C evaporator',
        category: 'climate',
        cost: 120,
        deliveryDays: 3,
        commonStock: false
    },
    {
        id: 'blower_motor',
        name: 'blower motor',
        category: 'climate',
        cost: 95,
        deliveryDays: 2,
        commonStock: false
    },
    {
        id: 'blower_resistor',
        name: 'blower motor resistor',
        category: 'climate',
        cost: 25,
        deliveryDays: 1,
        commonStock: true
    },
    {
        id: 'heater_core',
        name: 'heater core',
        category: 'climate',
        cost: 85,
        deliveryDays: 3,
        commonStock: false
    },

    // ═══════════════════════════════════════════
    // Wheels & Tyres
    // ═══════════════════════════════════════════
    {
        id: 'tyre',
        name: 'tyre (standard)',
        category: 'wheels',
        cost: 85,
        deliveryDays: 1,
        commonStock: true
    },
    {
        id: 'tyre_budget',
        name: 'budget tyre',
        category: 'wheels',
        cost: 55,
        deliveryDays: 1,
        commonStock: true
    },
    {
        id: 'tyre_premium',
        name: 'premium tyre',
        category: 'wheels',
        cost: 140,
        deliveryDays: 2,
        commonStock: false
    },
    {
        id: 'valve_stem',
        name: 'valve stem',
        category: 'wheels',
        cost: 5,
        deliveryDays: 0,
        commonStock: true
    },
    {
        id: 'tyre_repair_kit',
        name: 'tyre repair kit',
        category: 'wheels',
        cost: 15,
        deliveryDays: 0,
        commonStock: true
    },
    {
        id: 'wheel_alignment',
        name: 'wheel alignment',
        category: 'wheels',
        cost: 60,
        deliveryDays: 0,
        commonStock: false
    },
    {
        id: 'wheel_balancing',
        name: 'wheel balancing',
        category: 'wheels',
        cost: 40,
        deliveryDays: 0,
        commonStock: false
    },

    // ═══════════════════════════════════════════
    // Engine Assemblies (for engine swaps)
    // ═══════════════════════════════════════════
    {
        id: 'engine_4cyl_standard',
        name: '4-cylinder engine (standard)',
        category: 'engine',
        cost: 850,
        deliveryDays: 5,
        commonStock: false,
        requiresEngineHoist: true
    },
    {
        id: 'engine_4cyl_turbo',
        name: '4-cylinder turbo engine',
        category: 'engine',
        cost: 1500,
        deliveryDays: 7,
        commonStock: false,
        requiresEngineHoist: true
    },
    {
        id: 'engine_v6',
        name: 'V6 engine',
        category: 'engine',
        cost: 2200,
        deliveryDays: 7,
        commonStock: false,
        requiresEngineHoist: true
    },
    {
        id: 'engine_v8',
        name: 'V8 engine',
        category: 'engine',
        cost: 3500,
        deliveryDays: 10,
        commonStock: false,
        requiresEngineHoist: true
    },
    {
        id: 'engine_diesel_4cyl',
        name: '4-cylinder diesel engine',
        category: 'engine',
        cost: 1800,
        deliveryDays: 7,
        commonStock: false,
        requiresEngineHoist: true
    },
    {
        id: 'engine_diesel_v6',
        name: 'V6 diesel engine',
        category: 'engine',
        cost: 3200,
        deliveryDays: 10,
        commonStock: false,
        requiresEngineHoist: true
    },
    {
        id: 'engine_rotary',
        name: 'rotary engine (Wankel)',
        category: 'engine',
        cost: 2800,
        deliveryDays: 14,
        commonStock: false,
        requiresEngineHoist: true
    },
    {
        id: 'engine_electric_motor',
        name: 'electric motor conversion kit',
        category: 'engine',
        cost: 5500,
        deliveryDays: 14,
        commonStock: false,
        requiresEngineHoist: true
    },
    {
        id: 'engine_swap_kit',
        name: 'engine swap kit (mounts, hoses, wiring)',
        category: 'engine',
        cost: 350,
        deliveryDays: 3,
        commonStock: false,
        requiresEngineHoist: true
    },
    {
        id: 'engine_wiring_harness',
        name: 'engine wiring harness',
        category: 'engine',
        cost: 180,
        deliveryDays: 3,
        commonStock: false
    },
    {
        id: 'ecu_engine',
        name: 'engine control unit (ECU)',
        category: 'engine',
        cost: 450,
        deliveryDays: 4,
        commonStock: false
    },
    {
        id: 'engine_conversion_parts',
        name: 'engine conversion parts bundle',
        category: 'engine',
        cost: 550,
        deliveryDays: 5,
        commonStock: false,
        requiresEngineHoist: true
    },

    // ═══════════════════════════════════════════
    // Performance (turbo, tuning parts)
    // ═══════════════════════════════════════════
    {
        id: 'turbocharger',
        name: 'turbocharger',
        category: 'performance',
        cost: 650,
        deliveryDays: 5,
        commonStock: false
    },
    {
        id: 'turbo_rebuild_kit',
        name: 'turbo rebuild kit',
        category: 'performance',
        cost: 120,
        deliveryDays: 3,
        commonStock: false
    },
    {
        id: 'intercooler',
        name: 'intercooler',
        category: 'performance',
        cost: 280,
        deliveryDays: 3,
        commonStock: false
    },
    {
        id: 'boost_hose',
        name: 'boost hose',
        category: 'performance',
        cost: 45,
        deliveryDays: 2,
        commonStock: false
    },
    {
        id: 'wastegate',
        name: 'wastegate',
        category: 'performance',
        cost: 180,
        deliveryDays: 3,
        commonStock: false
    },
    {
        id: 'blowoff_valve',
        name: 'blow-off valve',
        category: 'performance',
        cost: 95,
        deliveryDays: 2,
        commonStock: false
    },
    {
        id: 'performance_air_filter',
        name: 'performance air filter',
        category: 'performance',
        cost: 55,
        deliveryDays: 2,
        commonStock: false
    },
    {
        id: 'performance_exhaust',
        name: 'performance exhaust system',
        category: 'performance',
        cost: 450,
        deliveryDays: 5,
        commonStock: false
    },
    {
        id: 'ecu_tune',
        name: 'ECU tune',
        category: 'performance',
        cost: 350,
        deliveryDays: 0,
        commonStock: false
    },

    // ═══════════════════════════════════════════
    // Drivetrain & Differential
    // ═══════════════════════════════════════════
    {
        id: 'differential',
        name: 'differential',
        category: 'transmission',
        cost: 380,
        deliveryDays: 5,
        commonStock: false
    },
    {
        id: 'limited_slip_diff',
        name: 'limited slip differential (LSD)',
        category: 'transmission',
        cost: 650,
        deliveryDays: 7,
        commonStock: false
    },
    {
        id: 'driveshaft',
        name: 'driveshaft',
        category: 'transmission',
        cost: 220,
        deliveryDays: 3,
        commonStock: false
    },
    {
        id: 'axle_shaft',
        name: 'axle shaft',
        category: 'transmission',
        cost: 150,
        deliveryDays: 2,
        commonStock: false
    },
    {
        id: 'transfer_case',
        name: 'transfer case (4WD)',
        category: 'transmission',
        cost: 450,
        deliveryDays: 5,
        commonStock: false
    },

    // ═══════════════════════════════════════════
    // Fuel System (expanded)
    // ═══════════════════════════════════════════
    {
        id: 'fuel_tank',
        name: 'fuel tank',
        category: 'engine',
        cost: 280,
        deliveryDays: 4,
        commonStock: false
    },
    {
        id: 'fuel_line',
        name: 'fuel line',
        category: 'engine',
        cost: 35,
        deliveryDays: 1,
        commonStock: true
    },
    {
        id: 'fuel_pressure_regulator',
        name: 'fuel pressure regulator',
        category: 'engine',
        cost: 65,
        deliveryDays: 2,
        commonStock: false
    },
    {
        id: 'fuel_rail',
        name: 'fuel rail',
        category: 'engine',
        cost: 120,
        deliveryDays: 3,
        commonStock: false
    },
    {
        id: 'charcoal_canister',
        name: 'charcoal canister (EVAP)',
        category: 'engine',
        cost: 85,
        deliveryDays: 2,
        commonStock: false
    },

    // ═══════════════════════════════════════════
    // Cooling System (expanded)
    // ═══════════════════════════════════════════
    {
        id: 'radiator_cap',
        name: 'radiator cap',
        category: 'engine',
        cost: 8,
        deliveryDays: 0,
        commonStock: true
    },
    {
        id: 'coolant_reservoir',
        name: 'coolant reservoir',
        category: 'engine',
        cost: 35,
        deliveryDays: 1,
        commonStock: true
    },
    {
        id: 'fan_clutch',
        name: 'fan clutch',
        category: 'engine',
        cost: 75,
        deliveryDays: 2,
        commonStock: false
    },
    {
        id: 'electric_fan',
        name: 'electric cooling fan',
        category: 'engine',
        cost: 120,
        deliveryDays: 2,
        commonStock: false
    },
    {
        id: 'heater_control_valve',
        name: 'heater control valve',
        category: 'climate',
        cost: 35,
        deliveryDays: 1,
        commonStock: true
    },

    // ═══════════════════════════════════════════
    // Ignition System (expanded)
    // ═══════════════════════════════════════════
    {
        id: 'distributor',
        name: 'distributor',
        category: 'engine',
        cost: 95,
        deliveryDays: 2,
        commonStock: false
    },
    {
        id: 'distributor_cap',
        name: 'distributor cap & rotor',
        category: 'engine',
        cost: 35,
        deliveryDays: 1,
        commonStock: true
    },
    {
        id: 'spark_plug_wires',
        name: 'spark plug wire set',
        category: 'engine',
        cost: 45,
        deliveryDays: 1,
        commonStock: true
    },
    {
        id: 'ignition_module',
        name: 'ignition control module',
        category: 'electrical',
        cost: 85,
        deliveryDays: 2,
        commonStock: false
    },

    // ═══════════════════════════════════════════
    // Body & Trim
    // ═══════════════════════════════════════════
    {
        id: 'side_mirror',
        name: 'side mirror',
        category: 'electrical',
        cost: 65,
        deliveryDays: 2,
        commonStock: false
    },
    {
        id: 'door_handle',
        name: 'door handle',
        category: 'electrical',
        cost: 35,
        deliveryDays: 2,
        commonStock: false
    },
    {
        id: 'window_regulator',
        name: 'window regulator',
        category: 'electrical',
        cost: 85,
        deliveryDays: 2,
        commonStock: false
    },
    {
        id: 'door_lock_actuator',
        name: 'door lock actuator',
        category: 'electrical',
        cost: 55,
        deliveryDays: 2,
        commonStock: false
    },
    {
        id: 'windshield',
        name: 'windshield',
        category: 'wheels',
        cost: 220,
        deliveryDays: 3,
        commonStock: false
    },
    {
        id: 'side_window',
        name: 'side window',
        category: 'wheels',
        cost: 120,
        deliveryDays: 3,
        commonStock: false
    },

    // ═══════════════════════════════════════════
    // Safety Systems
    // ═══════════════════════════════════════════
    {
        id: 'airbag',
        name: 'airbag module',
        category: 'electrical',
        cost: 280,
        deliveryDays: 4,
        commonStock: false
    },
    {
        id: 'airbag_sensor',
        name: 'airbag crash sensor',
        category: 'electrical',
        cost: 65,
        deliveryDays: 2,
        commonStock: false
    },
    {
        id: 'seatbelt_tensioner',
        name: 'seatbelt tensioner',
        category: 'electrical',
        cost: 85,
        deliveryDays: 2,
        commonStock: false
    },
    {
        id: 'abs_module',
        name: 'ABS control module',
        category: 'brakes',
        cost: 320,
        deliveryDays: 4,
        commonStock: false
    },
    {
        id: 'abs_pump',
        name: 'ABS pump',
        category: 'brakes',
        cost: 280,
        deliveryDays: 4,
        commonStock: false
    },

    // ═══════════════════════════════════════════
    // Sensors (expanded)
    // ═══════════════════════════════════════════
    {
        id: 'knock_sensor',
        name: 'knock sensor',
        category: 'engine',
        cost: 45,
        deliveryDays: 1,
        commonStock: false
    },
    {
        id: 'oil_pressure_sensor',
        name: 'oil pressure sensor',
        category: 'engine',
        cost: 35,
        deliveryDays: 1,
        commonStock: true
    },
    {
        id: 'oil_level_sensor',
        name: 'oil level sensor',
        category: 'engine',
        cost: 45,
        deliveryDays: 1,
        commonStock: false
    },
    {
        id: 'intake_air_temp_sensor',
        name: 'intake air temperature sensor',
        category: 'engine',
        cost: 28,
        deliveryDays: 1,
        commonStock: true
    },
    {
        id: 'throttle_body',
        name: 'throttle body',
        category: 'engine',
        cost: 180,
        deliveryDays: 3,
        commonStock: false
    },
    {
        id: 'egr_valve',
        name: 'EGR valve',
        category: 'engine',
        cost: 120,
        deliveryDays: 2,
        commonStock: false
    },
    {
        id: 'purge_valve',
        name: 'purge valve (EVAP)',
        category: 'engine',
        cost: 45,
        deliveryDays: 1,
        commonStock: true
    },
    {
        id: 'vehicle_speed_sensor',
        name: 'vehicle speed sensor',
        category: 'electrical',
        cost: 45,
        deliveryDays: 1,
        commonStock: false
    },
    {
        id: 'transmission_speed_sensor',
        name: 'transmission speed sensor',
        category: 'transmission',
        cost: 55,
        deliveryDays: 2,
        commonStock: false
    },

    // ═══════════════════════════════════════════
    // Hybrid/EV Components
    // ═══════════════════════════════════════════
    {
        id: 'hybrid_battery',
        name: 'hybrid battery pack',
        category: 'electrical',
        cost: 2200,
        deliveryDays: 10,
        commonStock: false
    },
    {
        id: 'inverter',
        name: 'hybrid inverter',
        category: 'electrical',
        cost: 1500,
        deliveryDays: 7,
        commonStock: false
    },
    {
        id: 'hybrid_coolant_pump',
        name: 'hybrid system coolant pump',
        category: 'engine',
        cost: 280,
        deliveryDays: 3,
        commonStock: false
    },

    // ═══════════════════════════════════════════
    // Transmission (expanded)
    // ═══════════════════════════════════════════
    {
        id: 'automatic_transmission',
        name: 'automatic transmission',
        category: 'transmission',
        cost: 1800,
        deliveryDays: 7,
        commonStock: false,
        requiresEngineHoist: true
    },
    {
        id: 'manual_transmission',
        name: 'manual transmission',
        category: 'transmission',
        cost: 1200,
        deliveryDays: 5,
        commonStock: false,
        requiresEngineHoist: true
    },
    {
        id: 'transmission_filter',
        name: 'transmission filter',
        category: 'transmission',
        cost: 25,
        deliveryDays: 1,
        commonStock: true
    },
    {
        id: 'torque_converter',
        name: 'torque converter',
        category: 'transmission',
        cost: 280,
        deliveryDays: 4,
        commonStock: false
    },
    {
        id: 'cv_joint',
        name: 'CV joint',
        category: 'transmission',
        cost: 85,
        deliveryDays: 2,
        commonStock: false
    }
];
