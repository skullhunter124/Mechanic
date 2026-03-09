/* ═══════════════════════════════════════════
   MECHANIC - Garage Upgrades
   ═══════════════════════════════════════════ */

const UPGRADES = [
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
    }
];
