/* ═══════════════════════════════════════════
   MECHANIC - Customer Scenarios
   Handwritten scenarios for the game
   ═══════════════════════════════════════════ */

const CUSTOMERS = [
    // ═══════════════════════════════════════════
    // EARLY GAME (Rep 0-30)
    // Simple, common problems
    // ═══════════════════════════════════════════

    // 1. Brake pads - anxious customer
    {
        id: 'civic_brakes_01',
        minReputation: 0,
        maxReputation: 40,
        requiresUpgrade: null,
        car: {
            make: 'Honda',
            model: 'Civic',
            year: 1998,
            condition: 'rough'
        },
        customer: {
            name: 'Maja',
            personality: 'anxious',
            budget: 'low',
            patience: 2,
            arrival: [
                'a beaten up civic crawls into the lot.',
                'the driver kills the engine and sits for a moment before getting out.',
                'she looks like she hasn\'t slept.',
                '"i hope you can help," she says.',
                '"it makes this horrible grinding sound when i slow down."'
            ]
        },
        diagnostics: [
            {
                action: 'listen to the engine',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'you start the car.',
                    'nothing unusual at idle.',
                    'you press the brake.',
                    'metal on metal. loud. she\'s been driving on this for a while.'
                ]
            },
            {
                action: 'check the wheels',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'front left brake pad: completely gone.',
                    'rotor is scored. probably needs replacing too.',
                    'front right isn\'t much better.'
                ]
            },
            {
                action: 'run diagnostic scan',
                cost: 15,
                time: 0,
                requiresUpgrade: 'hasDiagnosticScanner',
                reveals: [
                    'no fault codes.',
                    'ABS sensor reading normal.',
                    'confirms mechanical wear, not electrical.'
                ]
            }
        ],
        solution: {
            correctRepairs: ['brake_pads_front', 'brake_rotors_front'],
            acceptableRepairs: ['brake_pads_front'],
            wrongRepairs: ['brake_pads_rear', 'brake_fluid']
        },
        outcomes: {
            correct: {
                payment: 180,
                reputationChange: 8,
                dialogue: [
                    'you call maja.',
                    '"it\'s done. pads and rotors, front axle."',
                    'she picks it up an hour later.',
                    'she drives it around the block.',
                    'when she comes back she\'s smiling for the first time since you met her.',
                    '"like a new car," she says.',
                    'it isn\'t. but you know what she means.'
                ]
            },
            partial: {
                payment: 90,
                reputationChange: 2,
                dialogue: [
                    'you replace the pads.',
                    'the grinding is quieter.',
                    'maja seems satisfied but not thrilled.',
                    '"the noise is better," she says.',
                    'you know the rotors will go soon.',
                    'you don\'t say anything.'
                ]
            },
            wrong: {
                payment: 0,
                reputationChange: -10,
                dialogue: [
                    'maja calls you the next morning.',
                    '"it\'s still doing it."',
                    'you refund her.',
                    'she doesn\'t say thank you.',
                    'you wouldn\'t either.'
                ]
            },
            timeout: {
                payment: 0,
                reputationChange: -5,
                dialogue: [
                    'maja waited two days.',
                    'she took the car to someone else.',
                    'you watch the civic reverse out of the lot without a word.'
                ]
            }
        }
    },

    // 2. Dead battery - clueless customer
    {
        id: 'golf_battery_01',
        minReputation: 0,
        maxReputation: 35,
        requiresUpgrade: null,
        car: {
            make: 'Volkswagen',
            model: 'Golf',
            year: 2005,
            condition: 'average'
        },
        customer: {
            name: 'Thomas',
            personality: 'clueless',
            budget: 'medium',
            patience: 1,
            arrival: [
                'a man in a suit pushes a golf into your lot.',
                'he\'s out of breath.',
                '"the car won\'t start," he says.',
                '"i think it\'s the flux capacitor."',
                'you stare at him.',
                '"the what?"',
                '"never mind. can you fix it?"'
            ]
        },
        diagnostics: [
            {
                action: 'try to start the car',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'you turn the key.',
                    'click. click. click.',
                    'dashboard lights flicker and die.',
                    'classic dead battery.'
                ]
            },
            {
                action: 'check battery terminals',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'white crust on both terminals.',
                    'corrosion buildup.',
                    'battery is five years old according to the sticker.',
                    'it\'s done.'
                ]
            },
            {
                action: 'test alternator output',
                cost: 0,
                time: 1,
                requiresUpgrade: null,
                reveals: [
                    'you jump start the car.',
                    'multimeter on the battery.',
                    '14.2 volts at idle.',
                    'alternator is fine.',
                    'just a dead battery.'
                ]
            }
        ],
        solution: {
            correctRepairs: ['battery'],
            acceptableRepairs: ['battery'],
            wrongRepairs: ['alternator', 'starter_motor']
        },
        outcomes: {
            correct: {
                payment: 120,
                reputationChange: 5,
                dialogue: [
                    'new battery in.',
                    'thomas turns the key.',
                    'engine catches immediately.',
                    '"so it wasn\'t the flux capacitor?"',
                    '"no."',
                    '"good to know."',
                    'he hands you the money and drives off.'
                ]
            },
            partial: {
                payment: 120,
                reputationChange: 5,
                dialogue: [
                    'same outcome.',
                    'there was only one right answer here.'
                ]
            },
            wrong: {
                payment: 0,
                reputationChange: -15,
                dialogue: [
                    'you sell him an alternator.',
                    'the car still won\'t start.',
                    'thomas is not happy.',
                    'he wants his money back.',
                    'you give it to him.',
                    'the alternator sits on your shelf.',
                    'a reminder.'
                ]
            },
            timeout: {
                payment: 0,
                reputationChange: -5,
                dialogue: [
                    'thomas couldn\'t wait.',
                    'he called a tow truck.',
                    'you watch them drag the golf away.'
                ]
            }
        }
    },

    // 3. Oil change - rude customer
    {
        id: 'passat_oil_01',
        minReputation: 0,
        maxReputation: 25,
        requiresUpgrade: null,
        car: {
            make: 'Volkswagen',
            model: 'Passat',
            year: 2010,
            condition: 'good'
        },
        customer: {
            name: 'Klaus',
            personality: 'rude',
            budget: 'medium',
            patience: 1,
            arrival: [
                'a passat pulls in.',
                'the driver doesn\'t turn off the engine.',
                '"oil change. how long?"',
                '"depends. twenty minutes maybe."',
                '"twenty minutes? my guy does it in ten."',
                '"so go to your guy."',
                'he thinks about it.',
                '"he\'s on vacation."',
                'he turns off the engine.'
            ]
        },
        diagnostics: [
            {
                action: 'check oil level and condition',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'you pull the dipstick.',
                    'oil is black. thick.',
                    'smells burnt.',
                    'this should have been changed 5000 kilometers ago.'
                ]
            },
            {
                action: 'check service history',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'sticker on the windshield.',
                    'last service: 18 months ago.',
                    'klaus isn\'t big on maintenance.'
                ]
            }
        ],
        solution: {
            correctRepairs: ['engine_oil', 'oil_filter'],
            acceptableRepairs: ['engine_oil'],
            wrongRepairs: ['air_filter', 'fuel_filter']
        },
        outcomes: {
            correct: {
                payment: 650,
                reputationChange: 3,
                dialogue: [
                    'you drain the old oil.',
                    'it comes out like tar.',
                    'new oil. new filter.',
                    'klaus checks his watch.',
                    '"twenty-three minutes."',
                    '"traffic was bad," you say.',
                    'he doesn\'t laugh.',
                    'he pays and leaves.',
                    'no tip.'
                ]
            },
            partial: {
                payment: 50,
                reputationChange: 1,
                dialogue: [
                    'you change the oil.',
                    'klaus notices the old filter.',
                    '"you didn\'t change the filter?"',
                    '"no."',
                    '"my guy changes the filter."',
                    'he pays less.',
                    'you made a mistake.'
                ]
            },
            wrong: {
                payment: 0,
                reputationChange: -8,
                dialogue: [
                    'klaus checks the work.',
                    'he touches the oil.',
                    '"this is old oil."',
                    'he\'s right.',
                    'you forgot to drain it.',
                    'embarrassing.',
                    'he leaves without paying.'
                ]
            },
            timeout: {
                payment: 0,
                reputationChange: -3,
                dialogue: [
                    'klaus didn\'t have all day.',
                    'he went to a quick lube place.',
                    'probably complained about you there.'
                ]
            }
        }
    },

    // 4. Flat tire - sad customer
    {
        id: 'fiat_tire_01',
        minReputation: 0,
        maxReputation: 30,
        requiresUpgrade: null,
        car: {
            make: 'Fiat',
            model: 'Punto',
            year: 2003,
            condition: 'rough'
        },
        customer: {
            name: 'Elena',
            personality: 'sad',
            budget: 'low',
            patience: 2,
            arrival: [
                'a fiat punto limps in on a flat.',
                'the woman driving gets out slowly.',
                'she looks at the tire like it\'s the last straw.',
                '"i can\'t afford this," she says.',
                '"it was my mother\'s car."',
                'she doesn\'t explain further.',
                'you don\'t ask.'
            ]
        },
        diagnostics: [
            {
                action: 'inspect the tire',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'right rear is shredded.',
                    'drove on it flat for a while.',
                    'the other three are bald.',
                    'all four need replacing really.',
                    'but she said she can\'t afford it.'
                ]
            },
            {
                action: 'check the spare',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'you check the trunk.',
                    'spare tire is there.',
                    'it\'s old but holds air.',
                    'could get her rolling.',
                    'not a long term solution.'
                ]
            }
        ],
        solution: {
            correctRepairs: ['tyre_budget'],
            acceptableRepairs: ['tyre_budget', 'tyre_repair_kit'],
            wrongRepairs: ['tyre_premium', 'wheel_alignment']
        },
        outcomes: {
            correct: {
                payment: 70,
                reputationChange: 6,
                dialogue: [
                    'you put a budget tire on.',
                    'it\'s not great but it\'s safe.',
                    'elena counts out cash.',
                    'coins and crumpled bills.',
                    '"thank you," she says.',
                    '"my mother... she always said good things about mechanics."',
                    '"she was a good judge of character."',
                    'you don\'t point out the other three tires.',
                    'some battles aren\'t yours to fight.'
                ]
            },
            partial: {
                payment: 70,
                reputationChange: 4,
                dialogue: [
                    'you get her rolling.',
                    'she thanks you.',
                    'you think about the other tires.',
                    'you say nothing.'
                ]
            },
            wrong: {
                payment: 0,
                reputationChange: -5,
                dialogue: [
                    'you try to sell her premium tires.',
                    'she stares at you.',
                    '"i said i can\'t afford this."',
                    'she takes the car somewhere else.',
                    'on the flat.'
                ]
            },
            timeout: {
                payment: 0,
                reputationChange: -5,
                dialogue: [
                    'elena waited as long as she could.',
                    'she called someone.',
                    'they came with a jack and a prayer.'
                ]
            }
        }
    },

    // 5. Overheating - mechanic customer
    {
        id: 'bmw_overheat_01',
        minReputation: 10,
        maxReputation: 45,
        requiresUpgrade: null,
        car: {
            make: 'BMW',
            model: '318i',
            year: 1999,
            condition: 'average'
        },
        customer: {
            name: 'Dieter',
            personality: 'mechanic',
            budget: 'medium',
            patience: 3,
            arrival: [
                'an older bmw rolls in.',
                'steam from under the hood.',
                'the driver knows what he\'s doing.',
                'lets it cool before opening anything.',
                '"i think it\'s the thermostat," he says.',
                '"but i don\'t have time to fix it myself."',
                '"i\'ll watch. make sure you do it right."'
            ]
        },
        diagnostics: [
            {
                action: 'check coolant level',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'reservoir is empty.',
                    'you add water.',
                    'it leaks out immediately.',
                    'somewhere under the engine.'
                ]
            },
            {
                action: 'pressure test the system',
                cost: 0,
                time: 1,
                requiresUpgrade: null,
                reveals: [
                    'you pressurize the system.',
                    'leak appears at the water pump.',
                    'weep hole is dripping.',
                    'pump is done.',
                    'dieter was wrong about the thermostat.'
                ]
            },
            {
                action: 'run diagnostic scan',
                cost: 15,
                time: 0,
                requiresUpgrade: 'hasDiagnosticScanner',
                reveals: [
                    'no fault codes.',
                    'temperature sensor reading normal.',
                    'this is purely mechanical.'
                ]
            }
        ],
        solution: {
            correctRepairs: ['water_pump', 'coolant'],
            acceptableRepairs: ['water_pump', 'coolant', 'thermostat'],
            wrongRepairs: ['thermostat', 'radiator']
        },
        outcomes: {
            correct: {
                payment: 220,
                reputationChange: 10,
                dialogue: [
                    'you show dieter the leak.',
                    '"water pump," he says.',
                    '"i was sure it was the thermostat."',
                    'you replace the pump.',
                    'dieter watches the whole thing.',
                    'nods at the end.',
                    '"good work," he says.',
                    'from him, that\'s high praise.'
                ]
            },
            partial: {
                payment: 250,
                reputationChange: 5,
                dialogue: [
                    'you replace the pump and thermostat.',
                    'dieter nods.',
                    '"thermostat was fine."',
                    '"but you fixed it."',
                    'he pays.',
                    'you wasted his money a little.'
                ]
            },
            wrong: {
                payment: 0,
                reputationChange: -15,
                dialogue: [
                    'you replace the thermostat.',
                    'car still overheats.',
                    'dieter watches the temperature gauge climb.',
                    '"i told you i\'d watch."',
                    '"this is why."',
                    'he fixes it himself in your lot.',
                    'takes the parts he bought from you.',
                    'leaves without paying labor.'
                ]
            },
            timeout: {
                payment: 0,
                reputationChange: -5,
                dialogue: [
                    'dieter has his own tools.',
                    'and a driveway.',
                    'he tows the bmw home.',
                    'fixes it himself.'
                ]
            }
        }
    },

    // 6. Wiper blades - suspicious customer
    {
        id: 'focus_wipers_01',
        minReputation: 0,
        maxReputation: 20,
        requiresUpgrade: null,
        car: {
            make: 'Ford',
            model: 'Focus',
            year: 2012,
            condition: 'good'
        },
        customer: {
            name: 'Petra',
            personality: 'suspicious',
            budget: 'low',
            patience: 1,
            arrival: [
                'a ford focus pulls in.',
                'the driver gets out and walks around your garage.',
                'checking prices. looking at your tools.',
                '"my wipers are streaking," she says.',
                '"just the wipers. nothing else."',
                '"i know how you people work."'
            ]
        },
        diagnostics: [
            {
                action: 'inspect wiper blades',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'rubber is cracked.',
                    'both blades.',
                    'simple replacement.',
                    'nothing else wrong.'
                ]
            },
            {
                action: 'check washer fluid',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'reservoir is empty.',
                    'might want to top it up.',
                    'petra would probably accuse you of upselling.'
                ]
            }
        ],
        solution: {
            correctRepairs: ['windshield_wiper'],
            acceptableRepairs: ['windshield_wiper'],
            wrongRepairs: ['windshield_washer_fluid', 'headlight_bulb']
        },
        outcomes: {
            correct: {
                payment: 35,
                reputationChange: 4,
                dialogue: [
                    'you replace the wipers.',
                    'petra watches like a hawk.',
                    'tests them before paying.',
                    'clear windshield.',
                    '"fine," she says.',
                    '"you didn\'t try to sell me anything else."',
                    '"i was tempted."',
                    'she almost smiles.',
                    'almost.'
                ]
            },
            partial: {
                payment: 35,
                reputationChange: 4,
                dialogue: [
                    'just the wipers.',
                    'exactly what she asked for.'
                ]
            },
            wrong: {
                payment: 0,
                reputationChange: -10,
                dialogue: [
                    'you add washer fluid.',
                    '"i didn\'t ask for that."',
                    '"it was empty."',
                    '"i didn\'t ask."',
                    'she refuses to pay for the fluid.',
                    'you take the loss.',
                    'she was clear.'
                ]
            },
            timeout: {
                payment: 0,
                reputationChange: -2,
                dialogue: [
                    'petra doesn\'t wait.',
                    'she does it herself.',
                    'probably tells everyone mechanics are useless.'
                ]
            }
        }
    },

    // 7. Squeaky belt - anxious customer
    {
        id: 'corsa_belt_01',
        minReputation: 0,
        maxReputation: 30,
        requiresUpgrade: null,
        car: {
            make: 'Opel',
            model: 'Corsa',
            year: 2006,
            condition: 'average'
        },
        customer: {
            name: 'Lena',
            personality: 'anxious',
            budget: 'low',
            patience: 2,
            arrival: [
                'a corsa pulls in making a terrible noise.',
                'screeeeech.',
                'the driver looks embarrassed.',
                '"it\'s been doing that for a week," she says.',
                '"is it serious? my dad said it might be serious."',
                '"he\'s in spain. he can\'t look at it."',
                'she twists her hands.'
            ]
        },
        diagnostics: [
            {
                action: 'listen to the engine',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'serpentine belt squealing.',
                    'worse when cold.',
                    'classic worn belt symptoms.'
                ]
            },
            {
                action: 'inspect the belts',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'serpentine belt is cracked.',
                    'tension is loose.',
                    'timing belt looks newer.',
                    'just the serpentine needs replacing.'
                ]
            },
            {
                action: 'check belt tensioner',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'tensioner is fine.',
                    'belt is just worn.',
                    'simple fix.'
                ]
            }
        ],
        solution: {
            correctRepairs: ['serpentine_belt'],
            acceptableRepairs: ['serpentine_belt'],
            wrongRepairs: ['timing_belt']
        },
        outcomes: {
            correct: {
                payment: 70,
                reputationChange: 6,
                dialogue: [
                    'new belt on.',
                    'engine purrs.',
                    'lena looks relieved.',
                    '"that\'s it? just a belt?"',
                    '"just a belt."',
                    '"my dad worried me for nothing."',
                    'she calls him while you write the receipt.',
                    'you hear her say "no, the other belt."',
                    'family.'
                ]
            },
            partial: {
                payment: 70,
                reputationChange: 6,
                dialogue: [
                    'simple fix.',
                    'lena is happy.'
                ]
            },
            wrong: {
                payment: 0,
                reputationChange: -12,
                dialogue: [
                    'you quote her for a timing belt.',
                    '"that\'s... a lot more than i expected."',
                    'she gets a second opinion.',
                    'comes back to tell you it was the serpentine.',
                    '"my dad says you tried to rip me off."',
                    'you didn\'t. you just misdiagnosed.',
                    'but it looks the same from outside.'
                ]
            },
            timeout: {
                payment: 0,
                reputationChange: -4,
                dialogue: [
                    'lena couldn\'t handle the uncertainty.',
                    'took it somewhere else.',
                    'probably somewhere with a waiting room.'
                ]
            }
        }
    },

    // 8. Headlight out - clueless customer
    {
        id: 'audi_headlight_01',
        minReputation: 0,
        maxReputation: 25,
        requiresUpgrade: null,
        car: {
            make: 'Audi',
            model: 'A4',
            year: 2008,
            condition: 'good'
        },
        customer: {
            name: 'Markus',
            personality: 'clueless',
            budget: 'medium',
            patience: 1,
            arrival: [
                'an audi pulls in.',
                'driver flashes his high beams at you.',
                'then gets out.',
                '"the light thing is broken," he says.',
                '"which light thing?"',
                '"the one that makes light."',
                '"...the headlight?"',
                '"yes. probably."'
            ]
        },
        diagnostics: [
            {
                action: 'check all lights',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'left headlight is out.',
                    'low beam.',
                    'high beam works.',
                    'everything else is fine.'
                ]
            },
            {
                action: 'inspect the bulb',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'you pull the bulb.',
                    'filament is broken.',
                    'just needs a new bulb.',
                    'five minute job.'
                ]
            }
        ],
        solution: {
            correctRepairs: ['headlight_bulb'],
            acceptableRepairs: ['headlight_bulb'],
            wrongRepairs: ['fuse_kit', 'relay']
        },
        outcomes: {
            correct: {
                payment: 30,
                reputationChange: 3,
                dialogue: [
                    'bulb replaced.',
                    'markus seems amazed.',
                    '"that\'s it? just a little bulb?"',
                    '"just a little bulb."',
                    '"i thought it would be more complicated."',
                    'you don\'t say anything.',
                    'he pays and leaves.',
                    'you wonder how he functions.'
                ]
            },
            partial: {
                payment: 30,
                reputationChange: 3,
                dialogue: [
                    'simple job.',
                    'he\'s on his way.'
                ]
            },
            wrong: {
                payment: 0,
                reputationChange: -5,
                dialogue: [
                    'you start checking fuses.',
                    'waste of time.',
                    'markus gets bored.',
                    '"is this going to take much longer?"',
                    'you find nothing.',
                    'he leaves.',
                    'you realize later it was just the bulb.'
                ]
            },
            timeout: {
                payment: 0,
                reputationChange: -2,
                dialogue: [
                    'markus drove off.',
                    'probably got pulled over.',
                    'not your problem anymore.'
                ]
            }
        }
    },

    // 9. Engine misfire - rude customer
    {
        id: 'golf_misfire_01',
        minReputation: 15,
        maxReputation: 50,
        requiresUpgrade: null,
        car: {
            make: 'Volkswagen',
            model: 'Golf',
            year: 2002,
            condition: 'rough'
        },
        customer: {
            name: 'Werner',
            personality: 'rude',
            budget: 'low',
            patience: 2,
            arrival: [
                'a golf shudders into the lot.',
                'engine running rough.',
                'the driver gets out.',
                '"it\'s shaking. fix it."',
                '"what\'s wrong with it?"',
                '"isn\'t that your job?"',
                'he crosses his arms.'
            ]
        },
        diagnostics: [
            {
                action: 'listen to the engine',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'misfiring on at least one cylinder.',
                    'rough idle.',
                    'smells like unburnt fuel.'
                ]
            },
            {
                action: 'check spark plugs',
                cost: 0,
                time: 1,
                requiresUpgrade: null,
                reveals: [
                    'you pull the plugs.',
                    'one is fouled. covered in carbon.',
                    'others look worn but functional.',
                    'replacing all four would be best.'
                ]
            },
            {
                action: 'run diagnostic scan',
                cost: 15,
                time: 0,
                requiresUpgrade: 'hasDiagnosticScanner',
                reveals: [
                    'P0301 - misfire cylinder 1.',
                    'P0300 - random misfire.',
                    'points to ignition system.'
                ]
            }
        ],
        solution: {
            correctRepairs: ['spark_plugs', 'ignition_coil'],
            acceptableRepairs: ['spark_plugs'],
            wrongRepairs: ['fuel_injector', 'fuel_filter']
        },
        outcomes: {
            correct: {
                payment: 130,
                reputationChange: 8,
                dialogue: [
                    'new plugs and coil.',
                    'engine smooths out.',
                    'werner revs it.',
                    '"acceptable," he says.',
                    'you\'ll take it.',
                    'he pays without looking at you.',
                    'some people are just like that.'
                ]
            },
            partial: {
                payment: 80,
                reputationChange: 3,
                dialogue: [
                    'just plugs.',
                    'engine is better but not perfect.',
                    'werner notices.',
                    '"it\'s still not right."',
                    '"it\'s better."',
                    'he grumbles but pays.'
                ]
            },
            wrong: {
                payment: 0,
                reputationChange: -12,
                dialogue: [
                    'you replace the fuel filter.',
                    'doesn\'t help.',
                    'werner gets angry.',
                    '"you don\'t know what you\'re doing."',
                    'he\'s right. this time.',
                    'he takes the car elsewhere.'
                ]
            },
            timeout: {
                payment: 0,
                reputationChange: -5,
                dialogue: [
                    'werner\'s patience was thin.',
                    'he drove off shaking.',
                    'probably complained to everyone.'
                ]
            }
        }
    },

    // 10. Car won't start - multiple possibilities
    {
        id: 'astra_nostart_01',
        minReputation: 10,
        maxReputation: 45,
        requiresUpgrade: null,
        car: {
            make: 'Opel',
            model: 'Astra',
            year: 2007,
            condition: 'average'
        },
        customer: {
            name: 'Sandra',
            personality: 'anxious',
            budget: 'medium',
            patience: 3,
            arrival: [
                'a woman walks into your garage.',
                'no car.',
                '"my car won\'t start. it\'s in the parking lot across the street."',
                '"can you come look at it?"',
                'she looks desperate.',
                '"i have to pick up my kids in two hours."'
            ]
        },
        diagnostics: [
            {
                action: 'try to start the car',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'you turn the key.',
                    'engine cranks normally.',
                    'cranks and cranks.',
                    'doesn\'t catch.',
                    'not a battery problem.'
                ]
            },
            {
                action: 'check for spark',
                cost: 0,
                time: 1,
                requiresUpgrade: null,
                reveals: [
                    'you pull a plug wire.',
                    'hold it near the block.',
                    'crank the engine.',
                    'good spark.',
                    'ignition is working.'
                ]
            },
            {
                action: 'listen to the fuel pump',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'you turn the key to on.',
                    'listen carefully.',
                    'no hum from the back.',
                    'fuel pump isn\'t priming.',
                    'probably the pump. or the relay.'
                ]
            },
            {
                action: 'run diagnostic scan',
                cost: 15,
                time: 0,
                requiresUpgrade: 'hasDiagnosticScanner',
                reveals: [
                    'no fault codes stored.',
                    'not helpful.',
                    'mechanical issue, not electronic.'
                ]
            }
        ],
        solution: {
            correctRepairs: ['fuel_pump'],
            acceptableRepairs: ['fuel_pump', 'relay'],
            wrongRepairs: ['battery', 'starter_motor', 'ignition_coil']
        },
        outcomes: {
            correct: {
                payment: 200,
                reputationChange: 10,
                dialogue: [
                    'you tow the astra to your lot.',
                    'drop the fuel tank.',
                    'new pump in.',
                    'car starts on the first try.',
                    'sandra hugs you.',
                    '"thank you. thank you."',
                    'she makes it to pick up her kids.',
                    'this is why you do this.'
                ]
            },
            partial: {
                payment: 180,
                reputationChange: 6,
                dialogue: [
                    'you replace the pump.',
                    'and the relay, just in case.',
                    'car starts.',
                    'sandra is happy.',
                    'you probably wasted money on the relay.',
                    'but it works.'
                ]
            },
            wrong: {
                payment: 0,
                reputationChange: -15,
                dialogue: [
                    'you replace the starter.',
                    'car still doesn\'t start.',
                    'sandra is crying now.',
                    '"my kids are waiting."',
                    'you feel terrible.',
                    'she calls her sister.',
                    'you\'ll remember this one.'
                ]
            },
            timeout: {
                payment: 0,
                reputationChange: -8,
                dialogue: [
                    'sandra couldn\'t wait.',
                    'her kids were waiting.',
                    'she called a tow truck.',
                    'you hope she made it.'
                ]
            }
        }
    },

    // 11. Pulls to one side - suspicious customer
    {
        id: 'megane_pull_01',
        minReputation: 15,
        maxReputation: 50,
        requiresUpgrade: null,
        car: {
            make: 'Renault',
            model: 'Megane',
            year: 2009,
            condition: 'average'
        },
        customer: {
            name: 'Franz',
            personality: 'suspicious',
            budget: 'medium',
            patience: 2,
            arrival: [
                'a megane pulls in.',
                'the driver gets out and walks around his car.',
                'kicks the tires.',
                '"it pulls to the left," he says.',
                '"i want to know exactly why before you fix anything."',
                '"no guessing. no trying things."',
                'he pulls out a notebook.'
            ]
        },
        diagnostics: [
            {
                action: 'check tire pressure',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'all four tires at correct pressure.',
                    'not a pressure issue.'
                ]
            },
            {
                action: 'inspect tires for wear',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'left front tire has uneven wear.',
                    'inside edge worn down.',
                    'classic alignment problem.',
                    'or possibly suspension.'
                ]
            },
            {
                action: 'check suspension components',
                cost: 0,
                time: 1,
                requiresUpgrade: null,
                reveals: [
                    'you jack up the front.',
                    'pull on the wheels.',
                    'tie rod end has play on the left.',
                    'that\'s your culprit.',
                    'alignment won\'t hold without fixing this first.'
                ]
            },
            {
                action: 'run diagnostic scan',
                cost: 15,
                time: 0,
                requiresUpgrade: 'hasDiagnosticScanner',
                reveals: [
                    'no relevant codes.',
                    'this is a mechanical issue.'
                ]
            }
        ],
        solution: {
            correctRepairs: ['tie_rod', 'wheel_alignment'],
            acceptableRepairs: ['tie_rod'],
            wrongRepairs: ['tyre', 'brake_caliper']
        },
        outcomes: {
            correct: {
                payment: 150,
                reputationChange: 12,
                dialogue: [
                    'you show franz the play in the tie rod.',
                    'he gets down and looks.',
                    'wiggles it himself.',
                    '"okay. that\'s real."',
                    'he writes in his notebook.',
                    'you replace it and align.',
                    'car drives straight.',
                    'franz nods slowly.',
                    '"you were honest with me."',
                    '"i\'ll remember."'
                ]
            },
            partial: {
                payment: 90,
                reputationChange: 5,
                dialogue: [
                    'you replace the tie rod.',
                    'car still pulls a little.',
                    '"you need an alignment," you say.',
                    '"can you do it?"',
                    '"not without the rig."',
                    'franz sighs.',
                    'writes in his notebook.'
                ]
            },
            wrong: {
                payment: 0,
                reputationChange: -15,
                dialogue: [
                    'you sell him a tire.',
                    'car still pulls.',
                    'franz comes back angry.',
                    '"you said it was the tire."',
                    '"it\'s still pulling."',
                    'he writes in his notebook.',
                    'shows you.',
                    'it\'s a list of mechanics who ripped him off.',
                    'your name is on it now.'
                ]
            },
            timeout: {
                payment: 0,
                reputationChange: -5,
                dialogue: [
                    'franz took his car to someone with an alignment rig.',
                    'probably asked them a hundred questions too.'
                ]
            }
        }
    },

    // 12. Rough idle - mechanic customer
    {
        id: 'mercedes_idle_01',
        minReputation: 20,
        maxReputation: 55,
        requiresUpgrade: null,
        car: {
            make: 'Mercedes',
            model: 'C-Class',
            year: 2001,
            condition: 'good'
        },
        customer: {
            name: 'Horst',
            personality: 'mechanic',
            budget: 'medium',
            patience: 3,
            arrival: [
                'an older man in coveralls walks in.',
                'driving a clean w203.',
                '"rough idle," he says.',
                '"i cleaned the MAF. didn\'t help."',
                '"checked for vacuum leaks with carb cleaner. nothing."',
                '"i\'m stumped. you take a look."',
                'he hands you the keys.'
            ]
        },
        diagnostics: [
            {
                action: 'listen to the engine',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'idle is hunting.',
                    'rpm fluctuating.',
                    '500 to 900 and back.',
                    'not a dead miss. something else.'
                ]
            },
            {
                action: 'run diagnostic scan',
                cost: 15,
                time: 0,
                requiresUpgrade: 'hasDiagnosticScanner',
                reveals: [
                    'P0171 - system too lean.',
                    'P0174 - system too lean bank 2.',
                    'still could be a vacuum leak.',
                    'maybe horst missed something.'
                ]
            },
            {
                action: 'smoke test for vacuum leaks',
                cost: 25,
                time: 1,
                requiresUpgrade: null,
                reveals: [
                    'you pressurize the intake.',
                    'smoke everywhere.',
                    'the intake manifold gasket is shot.',
                    'horst was close. just not close enough.'
                ]
            }
        ],
        solution: {
            correctRepairs: ['throttle_body_gasket'],
            acceptableRepairs: ['throttle_body_gasket', 'maf_sensor'],
            wrongRepairs: ['spark_plugs', 'oxygen_sensor']
        },
        outcomes: {
            correct: {
                payment: 180,
                reputationChange: 15,
                dialogue: [
                    'you show horst the smoke.',
                    'he watches carefully.',
                    '"intake gasket," he says.',
                    '"i was looking at hoses. didn\'t think of the gasket."',
                    'you fix it.',
                    'idle smooths out.',
                    'horst shakes your hand.',
                    '"good catch. i\'ll send people your way."',
                    'from a mechanic, that means something.'
                ]
            },
            partial: {
                payment: 250,
                reputationChange: 8,
                dialogue: [
                    'you replace the gasket and the MAF.',
                    'probably didn\'t need the MAF.',
                    'but it runs.',
                    'horst notices.',
                    '"MAF was fine."',
                    '"probably."',
                    'he doesn\'t argue.',
                    'pays for both.'
                ]
            },
            wrong: {
                payment: 0,
                reputationChange: -10,
                dialogue: [
                    'you replace the spark plugs.',
                    'doesn\'t help.',
                    'horst watches.',
                    '"lean codes. you replaced plugs."',
                    '"yeah."',
                    'he takes the keys.',
                    'fixes it himself later.',
                    'doesn\'t come back.'
                ]
            },
            timeout: {
                payment: 0,
                reputationChange: -3,
                dialogue: [
                    'horst has his own garage.',
                    'he figured it out eventually.'
                ]
            }
        }
    },

    // 13. AC not working - rude customer
    {
        id: 'seat_ac_01',
        minReputation: 5,
        maxReputation: 40,
        requiresUpgrade: null,
        car: {
            make: 'SEAT',
            model: 'Leon',
            year: 2011,
            condition: 'good'
        },
        customer: {
            name: 'Björn',
            personality: 'rude',
            budget: 'medium',
            patience: 1,
            arrival: [
                'a seat leon rolls in.',
                'all windows down.',
                'hot day.',
                'driver is sweating.',
                '"the air conditioning doesn\'t work."',
                '"it\'s been nothing but problems with this car."',
                '"fix it. and don\'t take all day."'
            ]
        },
        diagnostics: [
            {
                action: 'check AC system',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'you turn on the AC.',
                    'compressor doesn\'t engage.',
                    'no cold air.',
                    'could be refrigerant. could be electrical.'
                ]
            },
            {
                action: 'check refrigerant pressure',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'you hook up the gauges.',
                    'pressure is zero.',
                    'system is empty.',
                    'leak somewhere. or just needs a recharge.'
                ]
            },
            {
                action: 'check for leaks with UV dye',
                cost: 20,
                time: 1,
                requiresUpgrade: null,
                reveals: [
                    'you add dye.',
                    'shine the light.',
                    'condenser is glowing.',
                    'leak in the condenser.',
                    'recharge won\'t last.'
                ]
            }
        ],
        solution: {
            correctRepairs: ['ac_compressor'],
            acceptableRepairs: ['ac_recharge'],
            wrongRepairs: ['blower_motor', 'cabin_filter']
        },
        outcomes: {
            correct: {
                payment: 350,
                reputationChange: 8,
                dialogue: [
                    'you explain the condenser is leaking.',
                    'björn is not happy.',
                    '"how much?"',
                    'you tell him.',
                    '"this car..."',
                    'he pays.',
                    'you fix it.',
                    'AC blows cold.',
                    'he doesn\'t say thank you.',
                    'but he rolls the windows up.'
                ]
            },
            partial: {
                payment: 60,
                reputationChange: 2,
                dialogue: [
                    'you recharge the system.',
                    'AC works for now.',
                    '"it might leak out again," you say.',
                    '"i\'ll worry about that later."',
                    'he drives off cold.',
                    'for now.'
                ]
            },
            wrong: {
                payment: 0,
                reputationChange: -10,
                dialogue: [
                    'you replace the cabin filter.',
                    'AC still doesn\'t work.',
                    'björn is furious.',
                    '"i said the AC doesn\'t work."',
                    '"not the air flow. the cold."',
                    'you misunderstood.',
                    'he demands a refund.'
                ]
            },
            timeout: {
                payment: 0,
                reputationChange: -5,
                dialogue: [
                    'björn drove somewhere else.',
                    'somewhere faster.',
                    'probably yelled at them too.'
                ]
            }
        }
    },

    // 14. Clutch slipping - anxious customer
    {
        id: 'polo_clutch_01',
        minReputation: 20,
        maxReputation: 55,
        requiresUpgrade: null,
        car: {
            make: 'Volkswagen',
            model: 'Polo',
            year: 2004,
            condition: 'average'
        },
        customer: {
            name: 'Anna',
            personality: 'anxious',
            budget: 'low',
            patience: 4,
            arrival: [
                'a polo rolls in slowly.',
                'the driver looks worried.',
                '"something is wrong with the gears," she says.',
                '"the engine goes vroom but the car doesn\'t go."',
                '"is that bad? that sounds bad."',
                '"my brother said it\'s the clutch but he doesn\'t really know."'
            ]
        },
        diagnostics: [
            {
                action: 'test drive',
                cost: 0,
                time: 1,
                requiresUpgrade: null,
                reveals: [
                    'you take it around the block.',
                    'accelerate in third.',
                    'rpm climbs. speed doesn\'t.',
                    'classic slipping clutch.',
                    'her brother was right.'
                ]
            },
            {
                action: 'inspect clutch master cylinder',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'fluid level is fine.',
                    'no leaks at the master.',
                    'not a hydraulic issue.',
                    'clutch disc itself is worn.'
                ]
            },
            {
                action: 'check clutch pedal feel',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'pedal engages very high.',
                    'almost at the top.',
                    'clutch is at the end of its life.',
                    'needs full replacement.'
                ]
            }
        ],
        solution: {
            correctRepairs: ['clutch_kit'],
            acceptableRepairs: ['clutch_kit', 'flywheel'],
            wrongRepairs: ['transmission_fluid', 'gear_linkage']
        },
        outcomes: {
            correct: {
                payment: 280,
                reputationChange: 12,
                dialogue: [
                    'you explain it to anna.',
                    '"the clutch is worn out. like brake pads but for the gears."',
                    'she nods slowly.',
                    '"can you fix it?"',
                    '"yes. it\'s not cheap though."',
                    'she winces.',
                    'but she says yes.',
                    'three hours later she drives away.',
                    'the car goes when she wants it to now.'
                ]
            },
            partial: {
                payment: 380,
                reputationChange: 8,
                dialogue: [
                    'you do the clutch and flywheel.',
                    'flywheel probably wasn\'t needed.',
                    'but it\'s done.',
                    'anna is happy.',
                    'her wallet less so.'
                ]
            },
            wrong: {
                payment: 0,
                reputationChange: -12,
                dialogue: [
                    'you change the transmission fluid.',
                    'clutch still slips.',
                    'anna calls her brother.',
                    'he explains what a clutch is.',
                    'she\'s embarrassed. you\'re embarrassed.',
                    'she takes it somewhere else.'
                ]
            },
            timeout: {
                payment: 0,
                reputationChange: -5,
                dialogue: [
                    'anna couldn\'t afford to wait.',
                    'she took the bus for a while.',
                    'eventually sold the car.'
                ]
            }
        }
    },

    // 15. Exhaust leak - sad customer
    {
        id: 'volvo_exhaust_01',
        minReputation: 10,
        maxReputation: 45,
        requiresUpgrade: null,
        car: {
            make: 'Volvo',
            model: 'V70',
            year: 1999,
            condition: 'rough'
        },
        customer: {
            name: 'Greta',
            personality: 'sad',
            budget: 'low',
            patience: 3,
            arrival: [
                'an old volvo wagon pulls in.',
                'loud. very loud.',
                'the driver is an older woman.',
                'she turns off the car and sits.',
                'then gets out slowly.',
                '"it\'s loud now," she says.',
                '"my husband used to take care of these things."',
                'she doesn\'t say more.'
            ]
        },
        diagnostics: [
            {
                action: 'inspect exhaust system',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'you get under the car.',
                    'rust hole in the muffler.',
                    'pipe before it is thin too.',
                    'the whole back section needs work.'
                ]
            },
            {
                action: 'check for exhaust fumes in cabin',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'you start the car.',
                    'close the doors.',
                    'wait a minute.',
                    'smell of exhaust.',
                    'this is dangerous.',
                    'needs to be fixed.'
                ]
            }
        ],
        solution: {
            correctRepairs: ['muffler', 'exhaust_pipe'],
            acceptableRepairs: ['muffler'],
            wrongRepairs: ['catalytic_converter', 'exhaust_manifold_gasket']
        },
        outcomes: {
            correct: {
                payment: 180,
                reputationChange: 10,
                dialogue: [
                    'you weld a patch.',
                    'cheaper than new.',
                    'it\'s quiet again.',
                    'greta sits in the driver\'s seat.',
                    'just sits.',
                    '"he loved this car," she says.',
                    '"thank you for fixing it."',
                    'she pays and drives away.',
                    'slowly. like he probably did.'
                ]
            },
            partial: {
                payment: 120,
                reputationChange: 6,
                dialogue: [
                    'you patch the muffler.',
                    'pipe is still thin.',
                    '"it\'ll last a while," you say.',
                    'greta nods.',
                    '"things usually do."'
                ]
            },
            wrong: {
                payment: 0,
                reputationChange: -8,
                dialogue: [
                    'you quote her for a catalytic converter.',
                    '"that\'s... a lot."',
                    'she looks at the car.',
                    '"maybe i should just sell it."',
                    'you realize you quoted the wrong part.',
                    'too late. she\'s already decided.'
                ]
            },
            timeout: {
                payment: 0,
                reputationChange: -5,
                dialogue: [
                    'greta couldn\'t decide what to do.',
                    'the volvo sat in her driveway.',
                    'getting louder.'
                ]
            }
        }
    },

    // ═══════════════════════════════════════════
    // MID GAME (Rep 30-60)
    // Trickier diagnosis, multiple possible causes
    // ═══════════════════════════════════════════

    // 16. Transmission slipping - mechanic customer
    {
        id: 'bmw_trans_01',
        minReputation: 30,
        maxReputation: 65,
        requiresUpgrade: null,
        car: {
            make: 'BMW',
            model: '320i',
            year: 2001,
            condition: 'average'
        },
        customer: {
            name: 'Felix',
            personality: 'mechanic',
            budget: 'medium',
            patience: 3,
            arrival: [
                'a bmw rolls in.',
                'the driver is young, early twenties.',
                'grease under his fingernails.',
                '"transmission\'s slipping," he says.',
                '"third gear. i adjusted the linkage but it\'s still popping out."',
                '"i think the synchros are shot but i wanted a second opinion."'
            ]
        },
        diagnostics: [
            {
                action: 'test drive',
                cost: 0,
                time: 1,
                requiresUpgrade: null,
                reveals: [
                    'you take it around the block.',
                    'first, second, fine.',
                    'third gear... pops out under load.',
                    'definitely internal transmission issue.'
                ]
            },
            {
                action: 'check transmission fluid',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'fluid is low.',
                    'dark. burnt smell.',
                    'metal flakes on the dipstick.',
                    'this transmission has been suffering for a while.'
                ]
            },
            {
                action: 'inspect linkage',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'linkage is adjusted correctly.',
                    'felix knew what he was doing.',
                    'problem is inside the box.'
                ]
            }
        ],
        solution: {
            correctRepairs: ['transmission_fluid', 'gear_linkage'],
            acceptableRepairs: ['transmission_fluid'],
            wrongRepairs: ['clutch_kit']
        },
        outcomes: {
            correct: {
                payment: 180,
                reputationChange: 12,
                dialogue: [
                    'you top up the fluid.',
                    'adjust the linkage a bit more.',
                    'it\'s a band-aid, you tell him.',
                    '"the transmission needs a rebuild eventually."',
                    'felix nods.',
                    '"i know. but this buys me time."',
                    'he pays.',
                    '"thanks for being straight with me."'
                ]
            },
            partial: {
                payment: 120,
                reputationChange: 6,
                dialogue: [
                    'fluid change helps.',
                    'still pops out occasionally.',
                    'felix understands.',
                    '"better than before."'
                ]
            },
            wrong: {
                payment: 0,
                reputationChange: -10,
                dialogue: [
                    'you suggest a clutch kit.',
                    'felix looks at you.',
                    '"the clutch is fine. it\'s the transmission."',
                    '"i told you it was popping out of gear."',
                    'he\'s right. you wasted his time.'
                ]
            },
            timeout: {
                payment: 0,
                reputationChange: -3,
                dialogue: [
                    'felix fixed it himself.',
                    'or lived with it.',
                    'hard to say with mechanics.'
                ]
            }
        }
    },

    // 17. Power steering leak - anxious customer
    {
        id: 'mondeo_steering_01',
        minReputation: 25,
        maxReputation: 55,
        requiresUpgrade: null,
        car: {
            make: 'Ford',
            model: 'Mondeo',
            year: 2008,
            condition: 'average'
        },
        customer: {
            name: 'Birgit',
            personality: 'anxious',
            budget: 'low',
            patience: 2,
            arrival: [
                'a mondeo whines into the lot.',
                'literally whines.',
                'the driver looks stressed.',
                '"the steering is heavy," she says.',
                '"sometimes it\'s fine, sometimes i can barely turn."',
                '"is it the power steering? is that expensive?"',
                'she\'s already wincing.'
            ]
        },
        diagnostics: [
            {
                action: 'check power steering fluid',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'reservoir is nearly empty.',
                    'you top it up.',
                    'turn the wheel.',
                    'fluid drips from somewhere underneath.'
                ]
            },
            {
                action: 'locate the leak',
                cost: 0,
                time: 1,
                requiresUpgrade: null,
                reveals: [
                    'you get under the car.',
                    'follow the wet trail.',
                    'power steering pump is weeping.',
                    'hose connections are dry.',
                    'pump needs replacing.'
                ]
            },
            {
                action: 'check steering rack',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'rack boots are dry.',
                    'no play in the steering.',
                    'just the pump.'
                ]
            }
        ],
        solution: {
            correctRepairs: ['power_steering_pump', 'power_steering_fluid'],
            acceptableRepairs: ['power_steering_fluid'],
            wrongRepairs: ['steering_rack', 'tie_rod']
        },
        outcomes: {
            correct: {
                payment: 220,
                reputationChange: 10,
                dialogue: [
                    'new pump.',
                    'fresh fluid.',
                    'birgit turns the wheel.',
                    'it\'s light again.',
                    '"oh thank god," she says.',
                    '"i was so worried."',
                    'she pays without haggling.',
                    'some people are just relieved.'
                ]
            },
            partial: {
                payment: 30,
                reputationChange: 2,
                dialogue: [
                    'you top up the fluid.',
                    '"it\'ll leak out again," you warn.',
                    '"how fast?"',
                    '"week or two."',
                    'she sighs.',
                    '"i\'ll be back then."'
                ]
            },
            wrong: {
                payment: 0,
                reputationChange: -12,
                dialogue: [
                    'you quote her for a steering rack.',
                    'the number makes her go pale.',
                    '"i... i can\'t afford that."',
                    'she leaves.',
                    'you realize later it was just the pump.',
                    'you scared her off for nothing.'
                ]
            },
            timeout: {
                payment: 0,
                reputationChange: -5,
                dialogue: [
                    'birgit kept topping up the fluid.',
                    'lived with it.',
                    'not ideal but people do what they have to.'
                ]
            }
        }
    },

    // 18. CV joint clicking - rude customer
    {
        id: 'golf_cv_01',
        minReputation: 20,
        maxReputation: 50,
        requiresUpgrade: null,
        car: {
            make: 'Volkswagen',
            model: 'Golf',
            year: 2004,
            condition: 'rough'
        },
        customer: {
            name: 'Stefan',
            personality: 'rude',
            budget: 'low',
            patience: 2,
            arrival: [
                'a golf pulls in.',
                'click-click-click when turning.',
                'the driver gets out.',
                '"fix the clicking," he says.',
                '"and don\'t try to upsell me."',
                '"i know it\'s probably just the cv joint."',
                '"just fix it. cheap."'
            ]
        },
        diagnostics: [
            {
                action: 'test drive',
                cost: 0,
                time: 1,
                requiresUpgrade: null,
                reveals: [
                    'you drive it.',
                    'turn left. click-click-click.',
                    'turn right. quiet.',
                    'left side CV axle.'
                ]
            },
            {
                action: 'inspect CV boots',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'left outer boot is torn.',
                    'grease everywhere.',
                    'joint is dry and clicking.',
                    'axle needs replacing.'
                ]
            },
            {
                action: 'check wheel bearing',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'bearing is fine.',
                    'no noise at speed.',
                    'just the CV.'
                ]
            }
        ],
        solution: {
            correctRepairs: ['cv_axle'],
            acceptableRepairs: ['cv_axle'],
            wrongRepairs: ['wheel_bearing', 'strut']
        },
        outcomes: {
            correct: {
                payment: 140,
                reputationChange: 6,
                dialogue: [
                    'new axle in.',
                    'no more clicking.',
                    'stefan drives around the lot.',
                    'listens.',
                    'nothing.',
                    '"fine," he says.',
                    '"you didn\'t try to sell me anything else."',
                    'he pays.',
                    'small victories.'
                ]
            },
            partial: {
                payment: 140,
                reputationChange: 6,
                dialogue: [
                    'fixed right the first time.',
                    'stefan has nothing to complain about.'
                ]
            },
            wrong: {
                payment: 0,
                reputationChange: -15,
                dialogue: [
                    'you replace the wheel bearing.',
                    'still clicks.',
                    'stefan is furious.',
                    '"i told you it was the CV joint."',
                    '"why didn\'t you listen?"',
                    'he\'s right. he did say that.',
                    'you refund him.',
                    'he leaves angry.'
                ]
            },
            timeout: {
                payment: 0,
                reputationChange: -3,
                dialogue: [
                    'stefan went somewhere else.',
                    'probably told them he knew what was wrong too.'
                ]
            }
        }
    },

    // 19. Alternator failing - suspicious customer
    {
        id: 'passat_alternator_01',
        minReputation: 15,
        maxReputation: 50,
        requiresUpgrade: null,
        car: {
            make: 'Volkswagen',
            model: 'Passat',
            year: 2006,
            condition: 'good'
        },
        customer: {
            name: 'Heinz',
            personality: 'suspicious',
            budget: 'medium',
            patience: 3,
            arrival: [
                'a passat limps in.',
                'dashboard lights flickering.',
                'the driver gets out and opens the hood.',
                'stares at the engine like it owes him money.',
                '"battery light is on," he says.',
                '"but the battery is new. i just bought it."',
                '"so what\'s really wrong with it?"'
            ]
        },
        diagnostics: [
            {
                action: 'test battery',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'battery is at 11.8 volts.',
                    'not charging.',
                    'new battery, like he said.',
                    'but something\'s draining it.'
                ]
            },
            {
                action: 'test alternator output',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'engine running.',
                    'multimeter on battery.',
                    '12.1 volts.',
                    'should be 14+.',
                    'alternator isn\'t charging.'
                ]
            },
            {
                action: 'check belt tension',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'belt is tight.',
                    'spinning freely.',
                    'not a belt issue.',
                    'alternator itself is dead.'
                ]
            }
        ],
        solution: {
            correctRepairs: ['alternator'],
            acceptableRepairs: ['alternator', 'serpentine_belt'],
            wrongRepairs: ['battery', 'starter_motor']
        },
        outcomes: {
            correct: {
                payment: 200,
                reputationChange: 10,
                dialogue: [
                    'new alternator.',
                    '14.2 volts at idle.',
                    'heinz watches you test it.',
                    'checks with his own multimeter.',
                    '"okay," he says finally.',
                    '"you were right."',
                    '"it was the alternator."',
                    'high praise from a suspicious man.'
                ]
            },
            partial: {
                payment: 235,
                reputationChange: 7,
                dialogue: [
                    'alternator and belt.',
                    'belt probably didn\'t need it.',
                    'but it works.',
                    'heinz pays.'
                ]
            },
            wrong: {
                payment: 0,
                reputationChange: -12,
                dialogue: [
                    'you sell him a battery.',
                    '"i told you the battery is new."',
                    '"this is the third garage that\'s tried this."',
                    'he shows you the receipt.',
                    'two weeks old.',
                    'you feel like an idiot.'
                ]
            },
            timeout: {
                payment: 0,
                reputationChange: -5,
                dialogue: [
                    'heinz ran the battery dead.',
                    'had to tow it somewhere.',
                    'probably told everyone about his experience.'
                ]
            }
        }
    },

    // 20. Wheel bearing noise - clueless customer
    {
        id: 'octavia_bearing_01',
        minReputation: 20,
        maxReputation: 55,
        requiresUpgrade: null,
        car: {
            make: 'Škoda',
            model: 'Octavia',
            year: 2010,
            condition: 'good'
        },
        customer: {
            name: 'Monika',
            personality: 'clueless',
            budget: 'medium',
            patience: 2,
            arrival: [
                'an octavia pulls in.',
                'the driver looks confused.',
                '"my car is making a noise," she says.',
                '"like a helicopter. but only on the highway."',
                '"my friend said it might be the transmission."',
                '"or the engine."',
                '"or the tires."',
                'she throws up her hands.'
            ]
        },
        diagnostics: [
            {
                action: 'test drive',
                cost: 0,
                time: 1,
                requiresUpgrade: null,
                reveals: [
                    'you take it on the highway.',
                    'growling noise starts at 60.',
                    'gets louder when turning right.',
                    'quieter when turning left.',
                    'classic wheel bearing.'
                ]
            },
            {
                action: 'check tires',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'tires are fine.',
                    'no cupping or unusual wear.',
                    'not a tire noise.'
                ]
            },
            {
                action: 'jack up and spin wheels',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'you spin each wheel.',
                    'right front growls.',
                    'play in the bearing.',
                    'that\'s your noise.'
                ]
            }
        ],
        solution: {
            correctRepairs: ['wheel_bearing'],
            acceptableRepairs: ['wheel_bearing'],
            wrongRepairs: ['tyre', 'transmission_fluid']
        },
        outcomes: {
            correct: {
                payment: 130,
                reputationChange: 8,
                dialogue: [
                    'new bearing.',
                    'silent on the highway.',
                    'monika is amazed.',
                    '"just that one part?"',
                    '"just that one part."',
                    '"my friend said it was the transmission."',
                    '"your friend was wrong."',
                    'she laughs.',
                    'pays and leaves.'
                ]
            },
            partial: {
                payment: 130,
                reputationChange: 8,
                dialogue: [
                    'simple fix.',
                    'monika is happy.'
                ]
            },
            wrong: {
                payment: 0,
                reputationChange: -10,
                dialogue: [
                    'you change the transmission fluid.',
                    'noise is still there.',
                    'monika is disappointed.',
                    '"it still sounds like a helicopter."',
                    'you\'ll get it right the second time.',
                    'but she might not come back.'
                ]
            },
            timeout: {
                payment: 0,
                reputationChange: -4,
                dialogue: [
                    'monika lived with the helicopter noise.',
                    'eventually the bearing seized.',
                    'not your problem anymore.'
                ]
            }
        }
    },

    // 21. Coolant leak - sad customer
    {
        id: 'toyota_coolant_01',
        minReputation: 25,
        maxReputation: 60,
        requiresUpgrade: null,
        car: {
            make: 'Toyota',
            model: 'Corolla',
            year: 2002,
            condition: 'average'
        },
        customer: {
            name: 'Ruth',
            personality: 'sad',
            budget: 'low',
            patience: 3,
            arrival: [
                'an old corolla pulls in.',
                'steam from under the hood.',
                'the driver is elderly.',
                'she turns off the car and sits.',
                'then slowly gets out.',
                '"it\'s overheating again," she says quietly.',
                '"my husband used to take care of this."',
                '"he passed last year."',
                'she looks at the car.',
                '"i don\'t know what to do without him."'
            ]
        },
        diagnostics: [
            {
                action: 'check coolant level',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'reservoir is empty.',
                    'radiator is low.',
                    'you add water to test.',
                    'leaks from the radiator.'
                ]
            },
            {
                action: 'pressure test',
                cost: 0,
                time: 1,
                requiresUpgrade: null,
                reveals: [
                    'you pressurize the system.',
                    'radiator is leaking from the seams.',
                    'old plastic. cracked.',
                    'needs a new radiator.'
                ]
            },
            {
                action: 'check hoses',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'hoses are old but intact.',
                    'not the source of the leak.'
                ]
            }
        ],
        solution: {
            correctRepairs: ['radiator', 'coolant'],
            acceptableRepairs: ['radiator', 'coolant', 'radiator_hose'],
            wrongRepairs: ['thermostat', 'water_pump']
        },
        outcomes: {
            correct: {
                payment: 200,
                reputationChange: 12,
                dialogue: [
                    'new radiator.',
                    'fresh coolant.',
                    'no more leaks.',
                    'ruth watches you work.',
                    '"my husband would have liked you," she says.',
                    '"he always said find a mechanic who explains things."',
                    'she pays carefully.',
                    'counting out bills.',
                    '"thank you," she says.',
                    '"for being patient with an old woman."',
                    'you tell her she\'s not that old.',
                    'she almost smiles.'
                ]
            },
            partial: {
                payment: 230,
                reputationChange: 8,
                dialogue: [
                    'radiator and hose.',
                    'probably didn\'t need the hose.',
                    'but it works.',
                    'ruth is grateful.'
                ]
            },
            wrong: {
                payment: 0,
                reputationChange: -8,
                dialogue: [
                    'you replace the thermostat.',
                    'still leaks.',
                    'ruth looks at the puddle.',
                    '"it\'s still leaking."',
                    '"i know."',
                    'you feel terrible.',
                    'she\'ll have to come back.'
                ]
            },
            timeout: {
                payment: 0,
                reputationChange: -6,
                dialogue: [
                    'ruth couldn\'t afford to fix it.',
                    'she drove it anyway.',
                    'you hope it didn\'t overheat on her.'
                ]
            }
        }
    },

    // 22. Suspension clunk - mechanic customer
    {
        id: 'subaru_suspension_01',
        minReputation: 30,
        maxReputation: 65,
        requiresUpgrade: null,
        car: {
            make: 'Subaru',
            model: 'Impreza',
            year: 2005,
            condition: 'rough'
        },
        customer: {
            name: 'Lukas',
            personality: 'mechanic',
            budget: 'medium',
            patience: 3,
            arrival: [
                'a subaru pulls in.',
                'rally blue. faded.',
                'clunk over every bump.',
                'the driver is young.',
                'wearing a mechanic\'s shirt from another shop.',
                '"control arm bushings," he says.',
                '"pretty sure that\'s what it is."',
                '"but i don\'t have a press at home."',
                '"can you do it?"'
            ]
        },
        diagnostics: [
            {
                action: 'shake down the suspension',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'you jack it up.',
                    'pull on the wheels.',
                    'left front control arm has play.',
                    'bushing is shot.',
                    'lukas was right.'
                ]
            },
            {
                action: 'check sway bar links',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'links are loose too.',
                    'contributing to the noise.',
                    'should replace both.'
                ]
            },
            {
                action: 'inspect ball joints',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'ball joints are tight.',
                    'tie rods too.',
                    'just bushings and links.'
                ]
            }
        ],
        solution: {
            correctRepairs: ['control_arm', 'sway_bar_link'],
            acceptableRepairs: ['control_arm', 'bushing_kit'],
            wrongRepairs: ['shock_absorber', 'strut']
        },
        outcomes: {
            correct: {
                payment: 220,
                reputationChange: 12,
                dialogue: [
                    'new control arm.',
                    'new sway bar links.',
                    'tight and quiet.',
                    'lukas nods.',
                    '"good work."',
                    '"i\'d have done it myself but..."',
                    '"no press."',
                    '"i get it."',
                    'he pays.',
                    '"i\'ll tell the guys at the shop about you."'
                ]
            },
            partial: {
                payment: 160,
                reputationChange: 7,
                dialogue: [
                    'just the control arm.',
                    'still a little clunk from the links.',
                    '"you should do the links too."',
                    '"i\'ll get them later."',
                    'fair enough.'
                ]
            },
            wrong: {
                payment: 0,
                reputationChange: -10,
                dialogue: [
                    'you replace the struts.',
                    'still clunks.',
                    'lukas gets under the car.',
                    'shows you the play in the control arm.',
                    '"i told you. bushings."',
                    'he\'s annoyed.',
                    'you wasted his money.'
                ]
            },
            timeout: {
                payment: 0,
                reputationChange: -3,
                dialogue: [
                    'lukas found another shop with a press.',
                    'probably told them about the one that wanted to replace struts.'
                ]
            }
        }
    },

    // 23. Fuel pump failing - anxious customer
    {
        id: 'peugeot_fuel_01',
        minReputation: 25,
        maxReputation: 60,
        requiresUpgrade: null,
        car: {
            make: 'Peugeot',
            model: '307',
            year: 2004,
            condition: 'average'
        },
        customer: {
            name: 'Claire',
            personality: 'anxious',
            budget: 'low',
            patience: 2,
            arrival: [
                'a peugeot sputters in.',
                'almost doesn\'t make it.',
                'the driver looks terrified.',
                '"it just dies," she says.',
                '"driving down the road and it just dies."',
                '"i\'m scared to drive it."',
                '"what if it dies on the highway?"',
                'she\'s shaking.'
            ]
        },
        diagnostics: [
            {
                action: 'try to start the car',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'turns over.',
                    'catches, dies.',
                    'catches, dies.',
                    'finally starts.',
                    'rough idle.'
                ]
            },
            {
                action: 'listen to fuel pump',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'turn key to on.',
                    'weak whine from the back.',
                    'fuel pump is struggling.',
                    'probably dying.'
                ]
            },
            {
                action: 'check fuel pressure',
                cost: 0,
                time: 1,
                requiresUpgrade: null,
                reveals: [
                    'you tap into the line.',
                    'pressure is low.',
                    'inconsistent.',
                    'pump is on its way out.'
                ]
            }
        ],
        solution: {
            correctRepairs: ['fuel_pump'],
            acceptableRepairs: ['fuel_pump', 'fuel_filter'],
            wrongRepairs: ['spark_plugs', 'ignition_coil']
        },
        outcomes: {
            correct: {
                payment: 220,
                reputationChange: 10,
                dialogue: [
                    'new fuel pump.',
                    'starts immediately.',
                    'idles smooth.',
                    'claire tests it three times.',
                    '"it\'s not going to die?"',
                    '"it shouldn\'t."',
                    'she almost cries with relief.',
                    '"thank you. thank you so much."',
                    'she\'s still shaky when she drives off.',
                    'but the car runs.'
                ]
            },
            partial: {
                payment: 250,
                reputationChange: 8,
                dialogue: [
                    'pump and filter.',
                    'runs great.',
                    'claire is relieved.'
                ]
            },
            wrong: {
                payment: 0,
                reputationChange: -12,
                dialogue: [
                    'you replace the spark plugs.',
                    'it still dies.',
                    'claire is crying now.',
                    '"i can\'t drive this."',
                    '"i\'ll crash."',
                    'you feel awful.',
                    'you\'ll get it right.',
                    'but the trust is broken.'
                ]
            },
            timeout: {
                payment: 0,
                reputationChange: -6,
                dialogue: [
                    'claire was too scared to wait.',
                    'she had it towed somewhere else.'
                ]
            }
        }
    },

    // 24. Turbo issues - mechanic customer
    {
        id: 'audi_turbo_01',
        minReputation: 45,
        maxReputation: 80,
        requiresUpgrade: null,
        car: {
            make: 'Audi',
            model: 'A4',
            year: 2003,
            condition: 'good'
        },
        customer: {
            name: 'Niklas',
            personality: 'mechanic',
            budget: 'high',
            patience: 4,
            arrival: [
                'an older audi rolls in.',
                '1.8T.',
                'the driver knows cars.',
                'you can tell by how he listens to the engine.',
                '"losing boost," he says.',
                '"i checked the diverter valve. it\'s fine."',
                '"no boost leaks that i can find."',
                '"i think the turbo\'s tired."',
                '"what do you think?"'
            ]
        },
        diagnostics: [
            {
                action: 'test drive under boost',
                cost: 0,
                time: 1,
                requiresUpgrade: null,
                reveals: [
                    'you take it out.',
                    'build boost.',
                    'peaks at 5 psi.',
                    'should be 10+.',
                    'something\'s wrong.'
                ]
            },
            {
                action: 'check for boost leaks',
                cost: 0,
                time: 1,
                requiresUpgrade: null,
                reveals: [
                    'you pressurize the system.',
                    'no leaks.',
                    'niklas was thorough.'
                ]
            },
            {
                action: 'inspect turbo',
                cost: 0,
                time: 1,
                requiresUpgrade: null,
                reveals: [
                    'you check for shaft play.',
                    'noticeable movement.',
                    'seals are leaking oil too.',
                    'turbo is done.',
                    'niklas was right.'
                ]
            }
        ],
        solution: {
            correctRepairs: ['turbocharger'],
            acceptableRepairs: ['turbocharger', 'boost_hose'],
            wrongRepairs: ['maf_sensor', 'fuel_injector']
        },
        outcomes: {
            correct: {
                payment: 950,
                reputationChange: 18,
                dialogue: [
                    'new turbo.',
                    '10 psi. holds steady.',
                    'niklas drives it hard.',
                    'comes back smiling.',
                    '"that\'s more like it."',
                    '"good work."',
                    '"i\'ll bring my other cars here."',
                    'this is the kind of customer you want.'
                ]
            },
            partial: {
                payment: 920,
                reputationChange: 14,
                dialogue: [
                    'turbo and hoses.',
                    'runs great.',
                    'niklas is happy.',
                    'you probably didn\'t need the hoses.',
                    'but it works.'
                ]
            },
            wrong: {
                payment: 0,
                reputationChange: -15,
                dialogue: [
                    'you replace the MAF.',
                    'still no boost.',
                    'niklas checks the turbo himself.',
                    '"there\'s shaft play."',
                    '"i told you i thought it was the turbo."',
                    'he\'s right. you should have listened.'
                ]
            },
            timeout: {
                payment: 0,
                reputationChange: -5,
                dialogue: [
                    'niklas has the skills to do it himself.',
                    'he found a used turbo and did the job at home.'
                ]
            }
        }
    },

    // 25. Head gasket - sad customer
    {
        id: 'focus_headgasket_01',
        minReputation: 35,
        maxReputation: 70,
        requiresUpgrade: null,
        car: {
            make: 'Ford',
            model: 'Focus',
            year: 2003,
            condition: 'rough'
        },
        customer: {
            name: 'Dietmar',
            personality: 'sad',
            budget: 'low',
            patience: 4,
            arrival: [
                'a focus is towed in.',
                'steam. smoke.',
                'the driver looks defeated.',
                '"i think it\'s the head gasket," he says.',
                '"my father\'s car. he gave it to me before..."',
                'he doesn\'t finish.',
                '"is it worth fixing?"',
                '"be honest."'
            ]
        },
        diagnostics: [
            {
                action: 'check oil',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'oil cap has mayo.',
                    'coolant in the oil.',
                    'classic head gasket failure.'
                ]
            },
            {
                action: 'pressure test cooling system',
                cost: 0,
                time: 1,
                requiresUpgrade: null,
                reveals: [
                    'pressure drops immediately.',
                    'no external leak.',
                    'going into the engine.',
                    'head gasket for sure.'
                ]
            },
            {
                action: 'check cylinder compression',
                cost: 0,
                time: 1,
                requiresUpgrade: null,
                reveals: [
                    'low on two adjacent cylinders.',
                    'confirmed head gasket.',
                    'head might be warped.'
                ]
            }
        ],
        solution: {
            correctRepairs: ['head_gasket'],
            acceptableRepairs: ['head_gasket', 'valve_cover_gasket'],
            wrongRepairs: ['radiator', 'water_pump']
        },
        outcomes: {
            correct: {
                payment: 450,
                reputationChange: 15,
                dialogue: [
                    'you explain the cost.',
                    'it\'s more than the car is worth.',
                    'but he nods.',
                    '"can you do it?"',
                    '"yes."',
                    '"then do it."',
                    'three days later it runs.',
                    'not worth it on paper.',
                    'but he drives away in his father\'s car.',
                    'some things aren\'t about money.'
                ]
            },
            partial: {
                payment: 480,
                reputationChange: 12,
                dialogue: [
                    'head gasket and valve cover.',
                    'runs.',
                    'dietmar is quiet.',
                    '"thank you."'
                ]
            },
            wrong: {
                payment: 0,
                reputationChange: -12,
                dialogue: [
                    'you replace the radiator.',
                    'still overheats.',
                    'still has coolant in the oil.',
                    'dietmar looks at you.',
                    '"i asked you to be honest."',
                    '"you said it was worth fixing."',
                    'you feel like a liar.'
                ]
            },
            timeout: {
                payment: 0,
                reputationChange: -5,
                dialogue: [
                    'dietmar couldn\'t decide.',
                    'the focus sat in his driveway.',
                    'a memorial to indecision.'
                ]
            }
        }
    },

    // ═══════════════════════════════════════════
    // LATE GAME (Rep 60+)
    // Complex, high stakes, multi-day jobs
    // ═══════════════════════════════════════════

    // 26. Engine rebuild - mechanic customer
    {
        id: 'porsche_engine_01',
        minReputation: 60,
        maxReputation: 100,
        requiresUpgrade: 'hasEngineHoist',
        car: {
            make: 'Porsche',
            model: '944',
            year: 1986,
            condition: 'good'
        },
        customer: {
            name: 'Victor',
            personality: 'mechanic',
            budget: 'unlimited',
            patience: 7,
            arrival: [
                'a flatbed arrives with a 944 on the back.',
                'the owner watches them unload it carefully.',
                'he\'s older. knows what he has.',
                '"the engine is tired," he says.',
                '"180,000 kilometers. it needs a full rebuild."',
                '"i could do it myself but..."',
                '"my back isn\'t what it used to be."',
                '"can you handle it?"'
            ]
        },
        diagnostics: [
            {
                action: 'compression test',
                cost: 0,
                time: 1,
                requiresUpgrade: null,
                reveals: [
                    'low across all cylinders.',
                    'especially cylinder 3.',
                    'rings are worn.',
                    'valves too probably.'
                ]
            },
            {
                action: 'leakdown test',
                cost: 0,
                time: 1,
                requiresUpgrade: null,
                reveals: [
                    'air in the crankcase.',
                    'rings for sure.',
                    'head gasket seeping too.',
                    'this engine needs everything.'
                ]
            },
            {
                action: 'inspect timing belt',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'belt is old.',
                    'tension is wrong.',
                    'if this snaps, the engine is junk.',
                    'lucky it hasn\'t.'
                ]
            }
        ],
        solution: {
            correctRepairs: ['head_gasket', 'timing_belt', 'valve_cover_gasket'],
            acceptableRepairs: ['head_gasket', 'timing_belt'],
            wrongRepairs: ['turbocharger', 'fuel_injector']
        },
        outcomes: {
            correct: {
                payment: 2500,
                reputationChange: 25,
                dialogue: [
                    'you pull the engine.',
                    'tear it down.',
                    'three weeks of work.',
                    'new rings, bearings, gaskets.',
                    'head resurfaced.',
                    'when it starts, it sounds new.',
                    'victor listens.',
                    'nods.',
                    '"good work," he says.',
                    '"better than i would have done."',
                    'he pays without blinking.',
                    '"i\'ll tell the club about you."'
                ]
            },
            partial: {
                payment: 2200,
                reputationChange: 18,
                dialogue: [
                    'you do the major work.',
                    'skip some things that probably should be done.',
                    'it runs.',
                    'victor knows.',
                    '"good enough," he says.',
                    'not the highest praise.'
                ]
            },
            wrong: {
                payment: 0,
                reputationChange: -20,
                dialogue: [
                    'you try to shortcut it.',
                    'replace gaskets without machining.',
                    'it leaks immediately.',
                    'victor is not happy.',
                    '"i asked you to do it right."',
                    '"not fast."',
                    'he takes the car elsewhere.',
                    'tells everyone about the mechanic who ruined his 944.'
                ]
            },
            timeout: {
                payment: 0,
                reputationChange: -5,
                dialogue: [
                    'victor found someone else.',
                    'someone with more time.',
                    'or less pride.'
                ]
            }
        }
    },

    // 27. Classic restoration - sad customer
    {
        id: 'mercedes_classic_01',
        minReputation: 65,
        maxReputation: 100,
        requiresUpgrade: null,
        car: {
            make: 'Mercedes',
            model: 'W123',
            year: 1979,
            condition: 'rough'
        },
        customer: {
            name: 'Gertrude',
            personality: 'sad',
            budget: 'medium',
            patience: 10,
            arrival: [
                'an old mercedes wagon.',
                'dusty. sitting for years.',
                'the woman driving it is elderly.',
                '"my husband bought this new," she says.',
                '"he died five years ago."',
                '"it\'s been in the garage since."',
                '"i want to drive it again."',
                '"can you make it run?"'
            ]
        },
        diagnostics: [
            {
                action: 'try to start it',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'turns over slowly.',
                    'doesn\'t catch.',
                    'fuel is probably varnish by now.',
                    'sitting for five years does that.'
                ]
            },
            {
                action: 'check fuel system',
                cost: 0,
                time: 1,
                requiresUpgrade: null,
                reveals: [
                    'tank smells like old fuel.',
                    'filter is clogged.',
                    'injectors probably need cleaning.',
                    'fuel pump might be seized.'
                ]
            },
            {
                action: 'check brakes',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'brake fluid is black.',
                    'calipers are seized.',
                    'rubber is perished.',
                    'brakes need complete overhaul.'
                ]
            }
        ],
        solution: {
            correctRepairs: ['fuel_pump', 'fuel_filter', 'brake_caliper', 'brake_fluid'],
            acceptableRepairs: ['fuel_pump', 'fuel_filter', 'brake_pads_front'],
            wrongRepairs: ['engine_oil', 'air_filter']
        },
        outcomes: {
            correct: {
                payment: 1200,
                reputationChange: 20,
                dialogue: [
                    'you drain the tank.',
                    'clean the lines.',
                    'new pump, new filter.',
                    'brakes freed up. new fluid.',
                    'it starts on the third try.',
                    'runs rough at first.',
                    'then smooths out.',
                    'gertrude is crying.',
                    '"he loved this car."',
                    '"thank you for bringing it back."',
                    'she drives away slowly.',
                    'like she\'s driving with a ghost.'
                ]
            },
            partial: {
                payment: 800,
                reputationChange: 12,
                dialogue: [
                    'you get it running.',
                    'brakes are still sketchy.',
                    '"it\'ll need more work," you say.',
                    '"later," she says.',
                    '"for now, it runs."'
                ]
            },
            wrong: {
                payment: 0,
                reputationChange: -15,
                dialogue: [
                    'you change the oil and filter.',
                    'it still doesn\'t start.',
                    'gertrude looks disappointed.',
                    '"i thought you could fix it."',
                    '"i can," you say.',
                    '"but not with oil."',
                    'she\'ll give you another chance.',
                    'maybe.'
                ]
            },
            timeout: {
                payment: 0,
                reputationChange: -8,
                dialogue: [
                    'gertrude lost patience.',
                    'or lost hope.',
                    'the mercedes went back in the garage.'
                ]
            }
        }
    },

    // 28. Track car setup - mechanic customer
    {
        id: 'bmw_track_01',
        minReputation: 55,
        maxReputation: 90,
        requiresUpgrade: 'hasAlignmentRig',
        car: {
            make: 'BMW',
            model: 'E36 M3',
            year: 1997,
            condition: 'good'
        },
        customer: {
            name: 'Oliver',
            personality: 'mechanic',
            budget: 'high',
            patience: 5,
            arrival: [
                'an e36 m3 rolls in.',
                'not stock. definitely not stock.',
                'the owner is young. enthusiastic.',
                '"i\'m doing track days," he says.',
                '"i need the suspension sorted."',
                '"corner balance. alignment. the works."',
                '"can you do it?"'
            ]
        },
        diagnostics: [
            {
                action: 'inspect suspension',
                cost: 0,
                time: 1,
                requiresUpgrade: null,
                reveals: [
                    'coilovers. adjustable.',
                    'sway bars upgraded.',
                    'corners are all wrong.',
                    'needs proper setup.'
                ]
            },
            {
                action: 'check alignment',
                cost: 0,
                time: 1,
                requiresUpgrade: 'hasAlignmentRig',
                reveals: [
                    'rear toe is way off.',
                    'camber is inconsistent.',
                    'no wonder it handles weird.',
                    'needs full alignment.'
                ]
            },
            {
                action: 'corner weight',
                cost: 50,
                time: 2,
                requiresUpgrade: null,
                reveals: [
                    'you put it on scales.',
                    'left front is heavy.',
                    'right rear light.',
                    'needs ballast or adjustment.'
                ]
            }
        ],
        solution: {
            correctRepairs: ['wheel_alignment', 'sway_bar_link', 'control_arm'],
            acceptableRepairs: ['wheel_alignment'],
            wrongRepairs: ['shock_absorber', 'strut']
        },
        outcomes: {
            correct: {
                payment: 650,
                reputationChange: 18,
                dialogue: [
                    'you spend two days on it.',
                    'corner balance. alignment.',
                    'corner weighting.',
                    'when you\'re done, it sits right.',
                    'oliver takes it to the track.',
                    'comes back monday.',
                    '"best it\'s ever handled."',
                    '"i dropped three seconds."',
                    'he\'s beaming.',
                    'this is why you do this.'
                ]
            },
            partial: {
                payment: 350,
                reputationChange: 10,
                dialogue: [
                    'alignment only.',
                    'better but not perfect.',
                    'oliver understands.',
                    '"i\'ll do the rest myself."'
                ]
            },
            wrong: {
                payment: 0,
                reputationChange: -15,
                dialogue: [
                    'you replace the shocks.',
                    'handling is worse.',
                    'oliver is confused.',
                    '"the shocks were fine."',
                    '"i needed alignment."',
                    'you misunderstood the job.'
                ]
            },
            timeout: {
                payment: 0,
                reputationChange: -5,
                dialogue: [
                    'oliver found a shop that specializes in track cars.',
                    'hard to compete with specialists.'
                ]
            }
        }
    },

    // 29. Diesel injection - suspicious customer
    {
        id: 'vw_diesel_01',
        minReputation: 40,
        maxReputation: 75,
        requiresUpgrade: 'hasDiagnosticScanner',
        car: {
            make: 'Volkswagen',
            model: 'Golf TDI',
            year: 2006,
            condition: 'average'
        },
        customer: {
            name: 'Wolfgang',
            personality: 'suspicious',
            budget: 'medium',
            patience: 3,
            arrival: [
                'a golf tdi limps in.',
                'smoking.',
                'the driver is angry already.',
                '"it\'s losing power," he says.',
                '"i just had the injectors replaced."',
                '"they said it would fix it."',
                '"it didn\'t."',
                '"what\'s really wrong with it?"'
            ]
        },
        diagnostics: [
            {
                action: 'run diagnostic scan',
                cost: 15,
                time: 0,
                requiresUpgrade: 'hasDiagnosticScanner',
                reveals: [
                    'P0201 - injector circuit.',
                    'P0302 - misfire cylinder 2.',
                    'injector codes. but they\'re new.'
                ]
            },
            {
                action: 'check injector wiring',
                cost: 0,
                time: 1,
                requiresUpgrade: null,
                reveals: [
                    'you check the harness.',
                    'connector on cylinder 2 is corroded.',
                    'new injectors, old wiring.',
                    'that\'s the problem.'
                ]
            },
            {
                action: 'test injectors',
                cost: 50,
                time: 2,
                requiresUpgrade: null,
                reveals: [
                    'you test each injector.',
                    'they\'re all working.',
                    'the injectors are fine.',
                    'it\'s the wiring.'
                ]
            }
        ],
        solution: {
            correctRepairs: ['fuel_injector'],
            acceptableRepairs: ['fuel_injector', 'fuel_filter'],
            wrongRepairs: ['turbocharger', 'maf_sensor']
        },
        outcomes: {
            correct: {
                payment: 280,
                reputationChange: 15,
                dialogue: [
                    'you clean the connectors.',
                    'repair the harness.',
                    'car runs perfect.',
                    'wolfgang is suspicious.',
                    '"that\'s it? just wiring?"',
                    '"just wiring."',
                    '"the other shop said i needed injectors."',
                    '"you got new injectors."',
                    '"but the wiring was the problem."',
                    'he stares at you.',
                    'then slowly nods.',
                    '"you\'re honest."',
                    '"i\'ll remember."'
                ]
            },
            partial: {
                payment: 310,
                reputationChange: 10,
                dialogue: [
                    'wiring and filter.',
                    'runs great.',
                    'wolfgang is satisfied.'
                ]
            },
            wrong: {
                payment: 0,
                reputationChange: -18,
                dialogue: [
                    'you tell him he needs a turbo.',
                    'he looks at the old one.',
                    '"this is fine."',
                    'he knows enough to check.',
                    '"you\'re just like the other shop."',
                    'he leaves angry.',
                    'tells everyone.'
                ]
            },
            timeout: {
                payment: 0,
                reputationChange: -5,
                dialogue: [
                    'wolfgang went to a diesel specialist.',
                    'they fixed the wiring in an hour.'
                ]
            }
        }
    },

    // 30. Starter issues - rude customer
    {
        id: 'opel_starter_01',
        minReputation: 15,
        maxReputation: 45,
        requiresUpgrade: null,
        car: {
            make: 'Opel',
            model: 'Vectra',
            year: 2005,
            condition: 'average'
        },
        customer: {
            name: 'Manfred',
            personality: 'rude',
            budget: 'low',
            patience: 1,
            arrival: [
                'a vectra rolls in.',
                'the driver doesn\'t turn it off.',
                '"sometimes it won\'t start," he says.',
                '"click click click. then nothing."',
                '"fix it. and hurry up."',
                'he taps his watch.'
            ]
        },
        diagnostics: [
            {
                action: 'try to start it',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'you turn the key.',
                    'click.',
                    'again.',
                    'click.',
                    'starter isn\'t engaging.'
                ]
            },
            {
                action: 'check battery connections',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'connections are clean.',
                    'battery is good.',
                    'not a battery issue.'
                ]
            },
            {
                action: 'tap the starter',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'you tap the starter with a wrench.',
                    'try again.',
                    'starts immediately.',
                    'dead spot in the starter motor.'
                ]
            }
        ],
        solution: {
            correctRepairs: ['starter_motor'],
            acceptableRepairs: ['starter_motor'],
            wrongRepairs: ['battery', 'alternator']
        },
        outcomes: {
            correct: {
                payment: 180,
                reputationChange: 6,
                dialogue: [
                    'new starter.',
                    'starts every time.',
                    'manfred checks his watch.',
                    '"finally," he says.',
                    '"i\'m late."',
                    'he pays and leaves.',
                    'no thank you.',
                    'but he\'ll be back.',
                    'they always come back.'
                ]
            },
            partial: {
                payment: 180,
                reputationChange: 6,
                dialogue: [
                    'fixed right.',
                    'manfred leaves.',
                    'no drama.'
                ]
            },
            wrong: {
                payment: 0,
                reputationChange: -12,
                dialogue: [
                    'you replace the battery.',
                    'it still clicks.',
                    'manfred is furious.',
                    '"i told you it clicks!"',
                    '"batteries don\'t click!"',
                    '"starters click!"',
                    'he\'s right.',
                    'you know he\'s right.'
                ]
            },
            timeout: {
                payment: 0,
                reputationChange: -3,
                dialogue: [
                    'manfred didn\'t have time to wait.',
                    'he tapped the starter himself and drove off.'
                ]
            }
        }
    },

    // 31. Catalytic converter - suspicious customer
    {
        id: 'audi_cat_01',
        minReputation: 35,
        maxReputation: 70,
        requiresUpgrade: 'hasDiagnosticScanner',
        car: {
            make: 'Audi',
            model: 'A3',
            year: 2008,
            condition: 'good'
        },
        customer: {
            name: 'Siegfried',
            personality: 'suspicious',
            budget: 'medium',
            patience: 3,
            arrival: [
                'an a3 comes in.',
                'check engine light on.',
                'the driver has been reading forums.',
                '"p0420 code," he says.',
                '"i know it\'s the catalytic converter."',
                '"or the oxygen sensor."',
                '"which is it?"',
                '"i don\'t want to replace both if i don\'t have to."'
            ]
        },
        diagnostics: [
            {
                action: 'run diagnostic scan',
                cost: 15,
                time: 0,
                requiresUpgrade: 'hasDiagnosticScanner',
                reveals: [
                    'P0420 - catalyst efficiency below threshold.',
                    'could be cat. could be sensor.',
                    'need more info.'
                ]
            },
            {
                action: 'check oxygen sensor data',
                cost: 0,
                time: 1,
                requiresUpgrade: 'hasDiagnosticScanner',
                reveals: [
                    'you watch the sensor data.',
                    'front sensor is switching normally.',
                    'rear sensor should be steady.',
                    'it\'s switching too.',
                    'cat isn\'t storing oxygen.',
                    'converter is bad.'
                ]
            },
            {
                action: 'inspect exhaust',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'exhaust is original.',
                    '180,000 kilometers.',
                    'cats don\'t last forever.',
                    'this one\'s done.'
                ]
            }
        ],
        solution: {
            correctRepairs: ['catalytic_converter'],
            acceptableRepairs: ['catalytic_converter', 'oxygen_sensor'],
            wrongRepairs: ['muffler', 'exhaust_pipe']
        },
        outcomes: {
            correct: {
                payment: 450,
                reputationChange: 12,
                dialogue: [
                    'new cat.',
                    'light goes off.',
                    'siegfried watches the scanner.',
                    'reads the data himself.',
                    '"the rear sensor is steady now."',
                    '"yes."',
                    '"so it was the cat."',
                    '"it was the cat."',
                    'he nods slowly.',
                    '"you could have sold me both."',
                    '"i could have."',
                    'he pays.',
                    '"i\'ll be back."'
                ]
            },
            partial: {
                payment: 520,
                reputationChange: 8,
                dialogue: [
                    'cat and sensor.',
                    'probably didn\'t need the sensor.',
                    'but it works.',
                    'siegfried pays.'
                ]
            },
            wrong: {
                payment: 0,
                reputationChange: -15,
                dialogue: [
                    'you replace the muffler.',
                    'light stays on.',
                    'siegfried checks the code.',
                    '"still p0420."',
                    '"that\'s not the muffler."',
                    'he\'s right.',
                    'he knows more than most customers.'
                ]
            },
            timeout: {
                payment: 0,
                reputationChange: -5,
                dialogue: [
                    'siegfried ordered a cat online.',
                    'installed it himself.'
                ]
            }
        }
    },

    // 32. Heater not working - clueless customer
    {
        id: 'ford_heater_01',
        minReputation: 10,
        maxReputation: 40,
        requiresUpgrade: null,
        car: {
            make: 'Ford',
            model: 'Fiesta',
            year: 2009,
            condition: 'average'
        },
        customer: {
            name: 'Tanja',
            personality: 'clueless',
            budget: 'low',
            patience: 2,
            arrival: [
                'a fiesta rolls in.',
                'cold day. windows fogged.',
                'the driver is shivering.',
                '"the heater doesn\'t work," she says.',
                '"it just blows cold air."',
                '"i\'m freezing."',
                '"is it broken? can you fix it?"'
            ]
        },
        diagnostics: [
            {
                action: 'check coolant level',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'coolant is low.',
                    'heater core needs coolant to work.',
                    'no coolant, no heat.'
                ]
            },
            {
                action: 'check for leaks',
                cost: 0,
                time: 1,
                requiresUpgrade: null,
                reveals: [
                    'you look around.',
                    'wet spot under the dashboard.',
                    'heater core is leaking.',
                    'that\'s where the coolant went.'
                ]
            },
            {
                action: 'check heater hoses',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'both hoses are hot.',
                    'coolant is flowing.',
                    'just not through the core.',
                    'core is bypassed or clogged.'
                ]
            }
        ],
        solution: {
            correctRepairs: ['coolant', 'coolant_hose'],
            acceptableRepairs: ['coolant'],
            wrongRepairs: ['blower_motor', 'cabin_filter']
        },
        outcomes: {
            correct: {
                payment: 120,
                reputationChange: 8,
                dialogue: [
                    'you find the bypass.',
                    'someone looped the heater hoses.',
                    'probably because the core was leaking.',
                    'you un-bypass it.',
                    'top up the coolant.',
                    'heat works.',
                    'tanja feels the warm air.',
                    '"oh that\'s so much better."',
                    'she turns the fan up.',
                    'sits in the warm car for a minute.',
                    '"thank you."'
                ]
            },
            partial: {
                payment: 50,
                reputationChange: 4,
                dialogue: [
                    'you top up the coolant.',
                    'heat works for now.',
                    '"it might leak again," you say.',
                    '"i\'ll worry about that later."'
                ]
            },
            wrong: {
                payment: 0,
                reputationChange: -10,
                dialogue: [
                    'you replace the cabin filter.',
                    'still cold.',
                    'tanja is disappointed.',
                    '"it\'s still cold."',
                    '"i know."',
                    'you\'ll figure it out.',
                    'but she might not come back.'
                ]
            },
            timeout: {
                payment: 0,
                reputationChange: -3,
                dialogue: [
                    'tanja drove around in a cold car.',
                    'wore a thicker coat.'
                ]
            }
        }
    },

    // 33. Oil leak - mechanic customer
    {
        id: 'subaru_oil_01',
        minReputation: 25,
        maxReputation: 60,
        requiresUpgrade: null,
        car: {
            make: 'Subaru',
            model: 'Legacy',
            year: 2002,
            condition: 'rough'
        },
        customer: {
            name: 'Andreas',
            personality: 'mechanic',
            budget: 'medium',
            patience: 3,
            arrival: [
                'a legacy pulls in.',
                'oil spots follow it.',
                'the driver is a mechanic.',
                '"valve cover gaskets," he says.',
                '"i know that\'s what it is."',
                '"subarus all leak there."',
                '"i just don\'t have time to do it."',
                '"can you handle it?"'
            ]
        },
        diagnostics: [
            {
                action: 'inspect for oil leaks',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'valve covers are wet.',
                    'oil everywhere.',
                    'andreas was right.',
                    'classic subaru.'
                ]
            },
            {
                action: 'check other common leak points',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'cam seals are dry.',
                    'crank seal is dry.',
                    'oil pump o-ring is fine.',
                    'just the valve covers.'
                ]
            },
            {
                action: 'check oil level',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'oil is low.',
                    'he\'s been topping it up.',
                    'but it\'s losing a liter a week.',
                    'needs to be fixed.'
                ]
            }
        ],
        solution: {
            correctRepairs: ['valve_cover_gasket', 'engine_oil'],
            acceptableRepairs: ['valve_cover_gasket'],
            wrongRepairs: ['oil_filter', 'head_gasket']
        },
        outcomes: {
            correct: {
                payment: 180,
                reputationChange: 10,
                dialogue: [
                    'new gaskets.',
                    'fresh oil.',
                    'clean engine.',
                    'andreas checks your work.',
                    'looks at the seals.',
                    '"good job."',
                    '"clean."',
                    'from a mechanic, that\'s a compliment.'
                ]
            },
            partial: {
                payment: 150,
                reputationChange: 7,
                dialogue: [
                    'gaskets done.',
                    'no oil change.',
                    'andreas changes his own oil.',
                    'fair enough.'
                ]
            },
            wrong: {
                payment: 0,
                reputationChange: -12,
                dialogue: [
                    'you quote him for a head gasket.',
                    'he stares at you.',
                    '"it\'s the valve covers."',
                    '"i told you it was the valve covers."',
                    '"why would it be the head gasket?"',
                    'he\'s right. you got greedy.',
                    'or careless.',
                    'either way, he\'s gone.'
                ]
            },
            timeout: {
                payment: 0,
                reputationChange: -3,
                dialogue: [
                    'andreas did it himself on a sunday.',
                    'took him two hours.'
                ]
            }
        }
    },

    // 34. Brake fade - anxious customer
    {
        id: 'renault_brakes_01',
        minReputation: 20,
        maxReputation: 55,
        requiresUpgrade: null,
        car: {
            make: 'Renault',
            model: 'Clio',
            year: 2007,
            condition: 'good'
        },
        customer: {
            name: 'Julia',
            personality: 'anxious',
            budget: 'medium',
            patience: 2,
            arrival: [
                'a clio rolls in carefully.',
                'the driver looks shaken.',
                '"the brakes felt funny," she says.',
                '"i was driving down a hill and they just..."',
                '"stopped working. for a second."',
                '"then they came back."',
                '"is that normal? that\'s not normal, right?"'
            ]
        },
        diagnostics: [
            {
                action: 'inspect brake fluid',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'fluid is dark.',
                    'boiling point is low.',
                    'old fluid boils under hard use.',
                    'that\'s the fade.'
                ]
            },
            {
                action: 'check brake pads',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'pads are low.',
                    'front especially.',
                    'almost to the wear sensors.',
                    'needs pads.'
                ]
            },
            {
                action: 'inspect rotors',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'rotors are glazed.',
                    'blue spots from heat.',
                    'been hot before.',
                    'should be replaced.'
                ]
            }
        ],
        solution: {
            correctRepairs: ['brake_pads_front', 'brake_rotors_front', 'brake_fluid'],
            acceptableRepairs: ['brake_pads_front', 'brake_fluid'],
            wrongRepairs: ['brake_pads_rear', 'brake_master_cylinder']
        },
        outcomes: {
            correct: {
                payment: 220,
                reputationChange: 12,
                dialogue: [
                    'new pads, rotors, fluid.',
                    'you bleed the system.',
                    'fresh fluid throughout.',
                    'pedal is firm.',
                    'julia tests the brakes.',
                    '"they feel... different."',
                    '"better?"',
                    '"yes. much better."',
                    'she\'s relieved.',
                    '"thank you. i was so scared."',
                    '"it\'s safe now."'
                ]
            },
            partial: {
                payment: 150,
                reputationChange: 7,
                dialogue: [
                    'pads and fluid.',
                    'rotors are still glazed.',
                    '"it\'ll stop," you say.',
                    '"but the rotors should be done eventually."',
                    'julia nods.',
                    '"later."'
                ]
            },
            wrong: {
                payment: 0,
                reputationChange: -15,
                dialogue: [
                    'you replace the master cylinder.',
                    'still fades.',
                    'julia comes back scared.',
                    '"it happened again."',
                    'you realize the fluid was the problem.',
                    'simple thing. missed it.'
                ]
            },
            timeout: {
                payment: 0,
                reputationChange: -6,
                dialogue: [
                    'julia was too scared to drive.',
                    'she had it towed somewhere.'
                ]
            }
        }
    },

    // 35. Intermittent stalling - suspicious customer
    {
        id: 'peugeot_stall_01',
        minReputation: 30,
        maxReputation: 65,
        requiresUpgrade: 'hasDiagnosticScanner',
        car: {
            make: 'Peugeot',
            model: '206',
            year: 2004,
            condition: 'average'
        },
        customer: {
            name: 'Helmut',
            personality: 'suspicious',
            budget: 'low',
            patience: 3,
            arrival: [
                'a 206 pulls in.',
                'the driver has a notebook.',
                '"it stalls," he says.',
                '"not always. just sometimes."',
                '"at lights. when i\'m slowing down."',
                '"i\'ve written down when it happens."',
                'he shows you the notebook.',
                'dates, times, temperatures.',
                'he\'s thorough.'
            ]
        },
        diagnostics: [
            {
                action: 'run diagnostic scan',
                cost: 15,
                time: 0,
                requiresUpgrade: 'hasDiagnosticScanner',
                reveals: [
                    'no codes stored.',
                    'whatever is wrong isn\'t throwing codes.',
                    'makes it harder.'
                ]
            },
            {
                action: 'check idle control valve',
                cost: 0,
                time: 1,
                requiresUpgrade: null,
                reveals: [
                    'you remove the idle control valve.',
                    'it\'s carboned up.',
                    'sticking.',
                    'that\'s the stalling.'
                ]
            },
            {
                action: 'check for vacuum leaks',
                cost: 0,
                time: 1,
                requiresUpgrade: null,
                reveals: [
                    'you spray carb cleaner around.',
                    'no change in idle.',
                    'no vacuum leaks.',
                    'not that.'
                ]
            }
        ],
        solution: {
            correctRepairs: ['idle_control_valve'],
            acceptableRepairs: ['idle_control_valve', 'throttle_body_gasket'],
            wrongRepairs: ['fuel_filter', 'spark_plugs']
        },
        outcomes: {
            correct: {
                payment: 150,
                reputationChange: 12,
                dialogue: [
                    'you clean the valve.',
                    'works perfectly.',
                    'helmut is suspicious.',
                    '"that\'s it? just cleaning?"',
                    '"just cleaning."',
                    '"no parts?"',
                    '"the valve is fine. just dirty."',
                    'he looks at the old valve.',
                    'then at you.',
                    '"you could have sold me a new one."',
                    '"yes."',
                    'he writes in his notebook.',
                    '"honest mechanic."',
                    'that\'s worth more than the part.'
                ]
            },
            partial: {
                payment: 200,
                reputationChange: 8,
                dialogue: [
                    'new valve and gasket.',
                    'probably didn\'t need the valve.',
                    'but it works.',
                    'helmut is satisfied.'
                ]
            },
            wrong: {
                payment: 0,
                reputationChange: -12,
                dialogue: [
                    'you replace the fuel filter.',
                    'still stalls.',
                    'helmut\'s notebook has new entries.',
                    '"it happened again."',
                    '"same as before."',
                    'you missed it.'
                ]
            },
            timeout: {
                payment: 0,
                reputationChange: -5,
                dialogue: [
                    'helmut found someone who cleaned the idle valve.',
                    'cost him half what you quoted.'
                ]
            }
        }
    },

    // ═══════════════════════════════════════════
    // MORE EARLY GAME SCENARIOS
    // ═══════════════════════════════════════════

    // 36. Taillight out - clueless customer
    {
        id: 'seat_taillight_01',
        minReputation: 0,
        maxReputation: 20,
        requiresUpgrade: null,
        car: {
            make: 'SEAT',
            model: 'Ibiza',
            year: 2010,
            condition: 'good'
        },
        customer: {
            name: 'Pablo',
            personality: 'clueless',
            budget: 'low',
            patience: 1,
            arrival: [
                'an ibiza pulls in.',
                'the driver waves.',
                '"the police stopped me," he says.',
                '"they said a light is broken."',
                '"which light?"',
                '"i don\'t know. a light."',
                'he shrugs.'
            ]
        },
        diagnostics: [
            {
                action: 'check all lights',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'you walk around the car.',
                    'left taillight is out.',
                    'everything else works.'
                ]
            },
            {
                action: 'inspect the bulb',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'you pull the bulb.',
                    'filament is broken.',
                    'simple replacement.'
                ]
            }
        ],
        solution: {
            correctRepairs: ['taillight_bulb'],
            acceptableRepairs: ['taillight_bulb'],
            wrongRepairs: ['headlight_bulb', 'fuse_kit']
        },
        outcomes: {
            correct: {
                payment: 20,
                reputationChange: 2,
                dialogue: [
                    'new bulb.',
                    'two minute job.',
                    'pablo watches.',
                    '"that\'s it?"',
                    '"that\'s it."',
                    '"i could have done that."',
                    '"yes."',
                    'he pays anyway.',
                    'lesson learned.'
                ]
            },
            partial: {
                payment: 20,
                reputationChange: 2,
                dialogue: [
                    'simple fix.',
                    'pablo is on his way.'
                ]
            },
            wrong: {
                payment: 0,
                reputationChange: -5,
                dialogue: [
                    'you replace the fuse.',
                    'light still doesn\'t work.',
                    'pablo sighs.',
                    '"can you check the bulb?"'
                ]
            },
            timeout: {
                payment: 0,
                reputationChange: -1,
                dialogue: [
                    'pablo did it himself.',
                    'watched a youtube video.'
                ]
            }
        }
    },

    // 37. Washer fluid - rude customer
    {
        id: 'skoda_washer_01',
        minReputation: 0,
        maxReputation: 15,
        requiresUpgrade: null,
        car: {
            make: 'Škoda',
            model: 'Fabia',
            year: 2008,
            condition: 'average'
        },
        customer: {
            name: 'Ivan',
            personality: 'rude',
            budget: 'low',
            patience: 1,
            arrival: [
                'a fabia pulls in.',
                'driver doesn\'t get out.',
                'rolls down the window.',
                '"washers don\'t work."',
                '"fill it up."',
                'he taps the steering wheel.',
                'waiting.'
            ]
        },
        diagnostics: [
            {
                action: 'check washer reservoir',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'reservoir is empty.',
                    'no fluid at all.',
                    'just needs filling.'
                ]
            },
            {
                action: 'check washer pump',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'you add some water.',
                    'pump works fine.',
                    'just empty.'
                ]
            }
        ],
        solution: {
            correctRepairs: ['windshield_washer_fluid'],
            acceptableRepairs: ['windshield_washer_fluid'],
            wrongRepairs: ['wiper_blade', 'fuse_kit']
        },
        outcomes: {
            correct: {
                payment: 15,
                reputationChange: 1,
                dialogue: [
                    'you fill it up.',
                    'ivan tests the washers.',
                    'satisfied.',
                    '"finally."',
                    'he drives off.',
                    'no thank you.',
                    'but he\'s gone.'
                ]
            },
            partial: {
                payment: 15,
                reputationChange: 1,
                dialogue: [
                    'done.',
                    'ivan leaves.'
                ]
            },
            wrong: {
                payment: 0,
                reputationChange: -5,
                dialogue: [
                    'you try to sell him wipers.',
                    '"i said washers."',
                    '"not wipers."',
                    '"fill the fluid."',
                    'he\'s annoyed.'
                ]
            },
            timeout: {
                payment: 0,
                reputationChange: -1,
                dialogue: [
                    'ivan filled it himself at a gas station.'
                ]
            }
        }
    },

    // 38. Cabin filter - anxious customer
    {
        id: 'toyota_cabin_01',
        minReputation: 5,
        maxReputation: 25,
        requiresUpgrade: null,
        car: {
            make: 'Toyota',
            model: 'Yaris',
            year: 2012,
            condition: 'good'
        },
        customer: {
            name: 'Yuki',
            personality: 'anxious',
            budget: 'low',
            patience: 2,
            arrival: [
                'a yaris pulls in.',
                'the driver looks worried.',
                '"there\'s a smell," she says.',
                '"when i turn on the fan."',
                '"like old socks. or mold."',
                '"is it dangerous? should i be worried?"'
            ]
        },
        diagnostics: [
            {
                action: 'check cabin filter',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'you pull the cabin filter.',
                    'it\'s black.',
                    'leaves. dirt. mouse nest.',
                    'this is the smell.'
                ]
            },
            {
                action: 'check for mold in ducts',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'no visible mold.',
                    'just the filter.',
                    'simple fix.'
                ]
            }
        ],
        solution: {
            correctRepairs: ['cabin_filter'],
            acceptableRepairs: ['cabin_filter'],
            wrongRepairs: ['air_filter', 'ac_recharge']
        },
        outcomes: {
            correct: {
                payment: 35,
                reputationChange: 4,
                dialogue: [
                    'new cabin filter.',
                    'air smells fresh.',
                    'yuki takes a deep breath.',
                    '"oh that\'s so much better."',
                    '"i was worried it was something serious."',
                    '"just a filter."',
                    'she\'s relieved.'
                ]
            },
            partial: {
                payment: 35,
                reputationChange: 4,
                dialogue: [
                    'simple fix.',
                    'yuki is happy.'
                ]
            },
            wrong: {
                payment: 0,
                reputationChange: -6,
                dialogue: [
                    'you replace the air filter.',
                    'engine filter. not cabin.',
                    'smell is still there.',
                    'yuki is disappointed.'
                ]
            },
            timeout: {
                payment: 0,
                reputationChange: -2,
                dialogue: [
                    'yuki drove with the windows down.'
                ]
            }
        }
    },

    // 39. Serpentine belt squeal - suspicious customer
    {
        id: 'fiat_belt_02',
        minReputation: 5,
        maxReputation: 30,
        requiresUpgrade: null,
        car: {
            make: 'Fiat',
            model: 'Bravo',
            year: 2008,
            condition: 'average'
        },
        customer: {
            name: 'Marco',
            personality: 'suspicious',
            budget: 'medium',
            patience: 2,
            arrival: [
                'a bravo squeals into the lot.',
                'literally squeals.',
                'the driver gets out.',
                '"the belt is making noise," he says.',
                '"i had it replaced six months ago."',
                '"why is it already making noise?"',
                '"did they use a cheap part?"'
            ]
        },
        diagnostics: [
            {
                action: 'inspect the belt',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'belt looks new.',
                    'but it\'s loose.',
                    'tensioner isn\'t holding.',
                    'not the belt. the tensioner.'
                ]
            },
            {
                action: 'check belt tension',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'way too loose.',
                    'tensioner is weak.',
                    'belt is fine.',
                    'six months ago they replaced the belt.',
                    'not the tensioner.'
                ]
            }
        ],
        solution: {
            correctRepairs: ['serpentine_belt'],
            acceptableRepairs: ['serpentine_belt'],
            wrongRepairs: ['timing_belt']
        },
        outcomes: {
            correct: {
                payment: 60,
                reputationChange: 5,
                dialogue: [
                    'you tighten the tensioner.',
                    'adjust the belt.',
                    'squeal is gone.',
                    'marco listens.',
                    '"so it wasn\'t the belt?"',
                    '"the belt is fine. the tensioner was loose."',
                    '"they should have replaced it."',
                    '"or at least checked it."',
                    'marco nods.',
                    '"i\'m going back there."',
                    'not your problem anymore.'
                ]
            },
            partial: {
                payment: 60,
                reputationChange: 5,
                dialogue: [
                    'fixed.',
                    'marco is satisfied.'
                ]
            },
            wrong: {
                payment: 0,
                reputationChange: -8,
                dialogue: [
                    'you quote him for a timing belt.',
                    '"that\'s not the serpentine belt."',
                    '"i know what belt is squealing."',
                    'he\'s right. you quoted the wrong thing.'
                ]
            },
            timeout: {
                payment: 0,
                reputationChange: -3,
                dialogue: [
                    'marco went back to the first shop.',
                    'made them fix it for free.'
                ]
            }
        }
    },

    // 40. Fuel filter clogged - mechanic customer
    {
        id: 'vw_fuel_01',
        minReputation: 15,
        maxReputation: 40,
        requiresUpgrade: null,
        car: {
            make: 'Volkswagen',
            model: 'Caddy',
            year: 2006,
            condition: 'rough'
        },
        customer: {
            name: 'Bruno',
            personality: 'mechanic',
            budget: 'low',
            patience: 2,
            arrival: [
                'a caddy van rolls in.',
                'work van. beat up.',
                'the driver is a plumber.',
                'greasy hands.',
                '"fuel filter," he says.',
                '"i know it\'s the fuel filter."',
                '"i just don\'t have time to do it myself."',
                '"can you do it while i wait?"'
            ]
        },
        diagnostics: [
            {
                action: 'check fuel filter',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'filter is original.',
                    '200,000 kilometers.',
                    'amazing it ran this long.',
                    'definitely needs replacing.'
                ]
            },
            {
                action: 'check fuel lines',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'lines are fine.',
                    'no leaks.',
                    'just the filter.'
                ]
            }
        ],
        solution: {
            correctRepairs: ['fuel_filter'],
            acceptableRepairs: ['fuel_filter'],
            wrongRepairs: ['fuel_pump', 'air_filter']
        },
        outcomes: {
            correct: {
                payment: 45,
                reputationChange: 5,
                dialogue: [
                    'new filter.',
                    'ten minutes.',
                    'bruno watches.',
                    'checks the work.',
                    '"good."',
                    'he pays.',
                    '"i\'ll bring the other van too."',
                    'that\'s what you want to hear.'
                ]
            },
            partial: {
                payment: 45,
                reputationChange: 5,
                dialogue: [
                    'quick job.',
                    'bruno is happy.'
                ]
            },
            wrong: {
                payment: 0,
                reputationChange: -8,
                dialogue: [
                    'you try to sell him a fuel pump.',
                    '"i said filter."',
                    '"the pump is fine."',
                    '"just change the filter."',
                    'you do.',
                    'he\'s annoyed.'
                ]
            },
            timeout: {
                payment: 0,
                reputationChange: -2,
                dialogue: [
                    'bruno did it himself.',
                    'in his driveway.',
                    'took fifteen minutes.'
                ]
            }
        }
    },

    // 41-50: Additional scenarios
    // 41. PCV valve - anxious customer
    {
        id: 'volkswagen_pcv_01',
        minReputation: 20,
        maxReputation: 50,
        requiresUpgrade: null,
        car: {
            make: 'Volkswagen',
            model: 'Jetta',
            year: 2001,
            condition: 'average'
        },
        customer: {
            name: 'Katrin',
            personality: 'anxious',
            budget: 'low',
            patience: 2,
            arrival: [
                'a jetta pulls in.',
                'check engine light on.',
                'the driver looks worried.',
                '"the light came on," she says.',
                '"i\'m supposed to drive to berlin next week."',
                '"is it serious? can i still go?"'
            ]
        },
        diagnostics: [
            {
                action: 'run diagnostic scan',
                cost: 15,
                time: 0,
                requiresUpgrade: 'hasDiagnosticScanner',
                reveals: [
                    'P0411 - secondary air injection.',
                    'could be the pump.',
                    'could be the valve.',
                    'need to check.'
                ]
            },
            {
                action: 'check PCV valve',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'you check the pcv.',
                    'it\'s stuck open.',
                    'causing the code.',
                    'cheap part. easy fix.'
                ]
            }
        ],
        solution: {
            correctRepairs: ['pcv_valve'],
            acceptableRepairs: ['pcv_valve'],
            wrongRepairs: ['air_filter', 'oxygen_sensor']
        },
        outcomes: {
            correct: {
                payment: 50,
                reputationChange: 6,
                dialogue: [
                    'new pcv valve.',
                    'light goes off.',
                    'katrin is relieved.',
                    '"so i can drive to berlin?"',
                    '"yes."',
                    '"thank you. i was so worried."',
                    'simple fix. big relief.'
                ]
            },
            partial: {
                payment: 50,
                reputationChange: 6,
                dialogue: [
                    'fixed.',
                    'katrin can go to berlin.'
                ]
            },
            wrong: {
                payment: 0,
                reputationChange: -8,
                dialogue: [
                    'you replace the oxygen sensor.',
                    'light stays on.',
                    'katrin is disappointed.',
                    '"the light is still on."'
                ]
            },
            timeout: {
                payment: 0,
                reputationChange: -4,
                dialogue: [
                    'katrin went to a dealer.',
                    'they charged her three times as much.'
                ]
            }
        }
    },

    // 42. Blower motor - clueless customer
    {
        id: 'renault_blower_01',
        minReputation: 10,
        maxReputation: 35,
        requiresUpgrade: null,
        car: {
            make: 'Renault',
            model: 'Megane',
            year: 2006,
            condition: 'average'
        },
        customer: {
            name: 'Sophie',
            personality: 'clueless',
            budget: 'medium',
            patience: 2,
            arrival: [
                'a megane rolls in.',
                'the driver looks uncomfortable.',
                '"the air doesn\'t blow," she says.',
                '"none of the settings work."',
                '"is it the air conditioning?"',
                '"it\'s very hot."'
            ]
        },
        diagnostics: [
            {
                action: 'check blower motor',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'you try all fan speeds.',
                    'nothing.',
                    'motor isn\'t running.'
                ]
            },
            {
                action: 'check fuses and relays',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'fuse is fine.',
                    'relay clicks.',
                    'power to the motor.',
                    'motor is dead.'
                ]
            }
        ],
        solution: {
            correctRepairs: ['blower_motor'],
            acceptableRepairs: ['blower_motor'],
            wrongRepairs: ['ac_compressor', 'cabin_filter']
        },
        outcomes: {
            correct: {
                payment: 130,
                reputationChange: 6,
                dialogue: [
                    'new blower motor.',
                    'air blows again.',
                    'sophie turns it to max.',
                    '"oh that\'s wonderful."',
                    '"i was melting."',
                    'she drives away comfortable.'
                ]
            },
            partial: {
                payment: 130,
                reputationChange: 6,
                dialogue: [
                    'fixed.',
                    'sophie is happy.'
                ]
            },
            wrong: {
                payment: 0,
                reputationChange: -8,
                dialogue: [
                    'you replace the cabin filter.',
                    'still no air.',
                    'sophie is confused.',
                    '"it still doesn\'t blow."'
                ]
            },
            timeout: {
                payment: 0,
                reputationChange: -3,
                dialogue: [
                    'sophie drove with the windows down.',
                    'not ideal.'
                ]
            }
        }
    },

    // 43. Tie rod - suspicious customer
    {
        id: 'ford_tierod_01',
        minReputation: 25,
        maxReputation: 55,
        requiresUpgrade: null,
        car: {
            make: 'Ford',
            model: 'Fusion',
            year: 2007,
            condition: 'average'
        },
        customer: {
            name: 'Günther',
            personality: 'suspicious',
            budget: 'medium',
            patience: 2,
            arrival: [
                'a fusion pulls in.',
                'the driver has been to two other shops.',
                '"they both said i need tie rods," he says.',
                '"i want a third opinion."',
                '"show me what\'s wrong."',
                '"i\'m not paying for things i don\'t need."'
            ]
        },
        diagnostics: [
            {
                action: 'shake down the front end',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'you jack it up.',
                    'pull on the wheels.',
                    'left tie rod has play.',
                    'inner and outer.',
                    'the other shops were right.'
                ]
            },
            {
                action: 'show the customer',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'you bring günther over.',
                    'have him feel the play.',
                    '"feel that?"',
                    '"that shouldn\'t move."',
                    'he feels it.',
                    'nods.'
                ]
            }
        ],
        solution: {
            correctRepairs: ['tie_rod'],
            acceptableRepairs: ['tie_rod', 'wheel_alignment'],
            wrongRepairs: ['control_arm', 'ball_joint']
        },
        outcomes: {
            correct: {
                payment: 160,
                reputationChange: 10,
                dialogue: [
                    'new tie rod.',
                    'günther watches everything.',
                    'checks the work.',
                    '"okay," he says.',
                    '"you were honest."',
                    '"the other shops were right too."',
                    '"but you showed me."',
                    'he pays.',
                    '"i\'ll be back."'
                ]
            },
            partial: {
                payment: 220,
                reputationChange: 8,
                dialogue: [
                    'tie rod and alignment.',
                    'günther is satisfied.'
                ]
            },
            wrong: {
                payment: 0,
                reputationChange: -12,
                dialogue: [
                    'you quote him for control arms.',
                    'he gets under the car.',
                    'checks himself.',
                    '"the control arms are fine."',
                    '"it\'s the tie rods."',
                    'he\'s right.',
                    'you lost his trust.'
                ]
            },
            timeout: {
                payment: 0,
                reputationChange: -4,
                dialogue: [
                    'günther went to the first shop.',
                    'they did it for less.'
                ]
            }
        }
    },

    // 44. Radiator hose - sad customer
    {
        id: 'opel_hose_01',
        minReputation: 10,
        maxReputation: 40,
        requiresUpgrade: null,
        car: {
            make: 'Opel',
            model: 'Astra',
            year: 2004,
            condition: 'rough'
        },
        customer: {
            name: 'Hannelore',
            personality: 'sad',
            budget: 'low',
            patience: 3,
            arrival: [
                'an astra is towed in.',
                'steam everywhere.',
                'the driver is elderly.',
                'looks like she\'s been crying.',
                '"i was on my way to the hospital," she says.',
                '"my husband..."',
                'she doesn\'t finish.',
                '"can you fix it? i need to get back."'
            ]
        },
        diagnostics: [
            {
                action: 'inspect cooling system',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'radiator hose burst.',
                    'old rubber. gave out.',
                    'easy fix.',
                    'you can do this quickly.'
                ]
            },
            {
                action: 'check for engine damage',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'you check the oil.',
                    'no coolant in it.',
                    'engine sounds okay.',
                    'caught it in time.'
                ]
            }
        ],
        solution: {
            correctRepairs: ['radiator_hose', 'coolant'],
            acceptableRepairs: ['radiator_hose', 'coolant'],
            wrongRepairs: ['radiator', 'thermostat']
        },
        outcomes: {
            correct: {
                payment: 80,
                reputationChange: 10,
                dialogue: [
                    'you work fast.',
                    'new hose. fresh coolant.',
                    'thirty minutes.',
                    'hannelore is waiting.',
                    '"it\'s ready."',
                    'she looks at you.',
                    '"thank you."',
                    '"i\'ll make it."',
                    'she drives off.',
                    'you hope her husband is okay.'
                ]
            },
            partial: {
                payment: 80,
                reputationChange: 10,
                dialogue: [
                    'fixed quickly.',
                    'she\'s on her way.'
                ]
            },
            wrong: {
                payment: 0,
                reputationChange: -10,
                dialogue: [
                    'you quote her for a radiator.',
                    'she starts crying.',
                    '"i can\'t afford that."',
                    'you realize it\'s just a hose.',
                    'you feel terrible.'
                ]
            },
            timeout: {
                payment: 0,
                reputationChange: -5,
                dialogue: [
                    'she took a taxi.',
                    'left the car.'
                ]
            }
        }
    },

    // 45. Oxygen sensor - mechanic customer
    {
        id: 'bmw_o2_01',
        minReputation: 30,
        maxReputation: 60,
        requiresUpgrade: 'hasDiagnosticScanner',
        car: {
            make: 'BMW',
            model: '325i',
            year: 2004,
            condition: 'good'
        },
        customer: {
            name: 'Christoph',
            personality: 'mechanic',
            budget: 'medium',
            patience: 3,
            arrival: [
                'a clean e46 rolls in.',
                'the owner knows his car.',
                '"check engine light," he says.',
                '"i pulled the code. p0171."',
                '"running lean."',
                '"i think it\'s the o2 sensor but i want to be sure."',
                '"before i throw parts at it."'
            ]
        },
        diagnostics: [
            {
                action: 'run diagnostic scan',
                cost: 15,
                time: 0,
                requiresUpgrade: 'hasDiagnosticScanner',
                reveals: [
                    'P0171 - system too lean.',
                    'you watch the fuel trims.',
                    'high positive.',
                    'engine is adding fuel.'
                ]
            },
            {
                action: 'check oxygen sensor data',
                cost: 0,
                time: 0,
                requiresUpgrade: 'hasDiagnosticScanner',
                reveals: [
                    'front o2 is slow to respond.',
                    'lazy sensor.',
                    'not switching properly.',
                    'christoph was right.'
                ]
            },
            {
                action: 'check for vacuum leaks',
                cost: 0,
                time: 1,
                requiresUpgrade: null,
                reveals: [
                    'you smoke test.',
                    'no leaks.',
                    'not a vacuum issue.',
                    'definitely the sensor.'
                ]
            }
        ],
        solution: {
            correctRepairs: ['oxygen_sensor'],
            acceptableRepairs: ['oxygen_sensor', 'maf_sensor'],
            wrongRepairs: ['fuel_injector', 'fuel_filter']
        },
        outcomes: {
            correct: {
                payment: 150,
                reputationChange: 12,
                dialogue: [
                    'new oxygen sensor.',
                    'fuel trims normalize.',
                    'light goes off.',
                    'christoph watches the data.',
                    '"perfect."',
                    '"good diagnosis."',
                    '"i\'ll bring the m3 here too."',
                    'that\'s a compliment.'
                ]
            },
            partial: {
                payment: 270,
                reputationChange: 8,
                dialogue: [
                    'o2 and maf.',
                    'probably didn\'t need the maf.',
                    'but it runs.',
                    'christoph pays.'
                ]
            },
            wrong: {
                payment: 0,
                reputationChange: -12,
                dialogue: [
                    'you suggest injectors.',
                    'christoph raises an eyebrow.',
                    '"the o2 data shows a lazy sensor."',
                    '"why injectors?"',
                    'he\'s right. you overcomplicated it.'
                ]
            },
            timeout: {
                payment: 0,
                reputationChange: -4,
                dialogue: [
                    'christoph ordered the sensor himself.',
                    'installed it in his driveway.'
                ]
            }
        }
    },

    // 46. Engine mount - rude customer
    {
        id: 'audi_mount_01',
        minReputation: 20,
        maxReputation: 50,
        requiresUpgrade: null,
        car: {
            make: 'Audi',
            model: 'A6',
            year: 2005,
            condition: 'average'
        },
        customer: {
            name: 'Rudolf',
            personality: 'rude',
            budget: 'medium',
            patience: 2,
            arrival: [
                'an a6 pulls in.',
                'clunk when stopping.',
                'the driver is already annoyed.',
                '"something\'s loose," he says.',
                '"fix it. and don\'t take all day."',
                'he checks his phone.',
                'ignores you.'
            ]
        },
        diagnostics: [
            {
                action: 'check engine mounts',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'you rev the engine.',
                    'watch the motor.',
                    'it jumps.',
                    'front mount is broken.',
                    'engine is flopping around.'
                ]
            },
            {
                action: 'inspect transmission mount',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'transmission mount is cracked.',
                    'both need replacing.',
                    'that\'s the clunk.'
                ]
            }
        ],
        solution: {
            correctRepairs: ['engine_mount', 'transmission_mount'],
            acceptableRepairs: ['engine_mount'],
            wrongRepairs: ['control_arm', 'sway_bar_link']
        },
        outcomes: {
            correct: {
                payment: 250,
                reputationChange: 6,
                dialogue: [
                    'new mounts.',
                    'engine sits still.',
                    'no more clunk.',
                    'rudolf tests it.',
                    'stops hard.',
                    'nothing.',
                    '"acceptable."',
                    'he pays.',
                    'leaves.',
                    'you\'ll take it.'
                ]
            },
            partial: {
                payment: 150,
                reputationChange: 4,
                dialogue: [
                    'just the engine mount.',
                    'still a little clunk.',
                    '"the transmission mount too," you say.',
                    '"later," he says.',
                    'he\'ll be back.'
                ]
            },
            wrong: {
                payment: 0,
                reputationChange: -10,
                dialogue: [
                    'you replace sway bar links.',
                    'still clunks.',
                    'rudolf is not happy.',
                    '"it\'s still doing it."',
                    '"i said fix it."',
                    'you missed the real problem.'
                ]
            },
            timeout: {
                payment: 0,
                reputationChange: -3,
                dialogue: [
                    'rudolf didn\'t have all day.',
                    'he went somewhere faster.'
                ]
            }
        }
    },

    // 47. Vacuum leak - mechanic customer
    {
        id: 'mercedes_vacuum_01',
        minReputation: 35,
        maxReputation: 65,
        requiresUpgrade: 'hasDiagnosticScanner',
        car: {
            make: 'Mercedes',
            model: 'C220',
            year: 1996,
            condition: 'good'
        },
        customer: {
            name: 'Friedrich',
            personality: 'mechanic',
            budget: 'medium',
            patience: 3,
            arrival: [
                'an old mercedes diesel.',
                'runs rough.',
                'the owner is retired.',
                'used to work on these.',
                '"vacuum leak somewhere," he says.',
                '"i can hear it. i just can\'t find it."',
                '"these old diesels need vacuum for everything."'
            ]
        },
        diagnostics: [
            {
                action: 'smoke test',
                cost: 25,
                time: 1,
                requiresUpgrade: null,
                reveals: [
                    'you pressurize the system.',
                    'smoke appears.',
                    'vacuum pump diaphragm.',
                    'that\'s the leak.'
                ]
            },
            {
                action: 'check vacuum lines',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'lines are old.',
                    'some are cracked.',
                    'should replace them all.',
                    'but the pump is the main issue.'
                ]
            }
        ],
        solution: {
            correctRepairs: ['vacuum_hose'],
            acceptableRepairs: ['vacuum_hose'],
            wrongRepairs: ['fuel_injector', 'fuel_filter']
        },
        outcomes: {
            correct: {
                payment: 120,
                reputationChange: 12,
                dialogue: [
                    'new vacuum lines.',
                    'engine smooths out.',
                    'friedrich listens.',
                    '"that\'s better."',
                    '"i knew it was a leak."',
                    '"just couldn\'t find it."',
                    '"these old eyes."',
                    'he shakes your hand.',
                    '"good work."'
                ]
            },
            partial: {
                payment: 120,
                reputationChange: 12,
                dialogue: [
                    'fixed.',
                    'friedrich is happy.'
                ]
            },
            wrong: {
                payment: 0,
                reputationChange: -10,
                dialogue: [
                    'you suggest injectors.',
                    'friedrich shakes his head.',
                    '"it\'s a vacuum leak."',
                    '"i can hear it."',
                    '"listen."',
                    'he\'s right. you should have listened.'
                ]
            },
            timeout: {
                payment: 0,
                reputationChange: -4,
                dialogue: [
                    'friedrich kept looking.',
                    'found it himself eventually.'
                ]
            }
        }
    },

    // 48. Wheel speed sensor - suspicious customer
    {
        id: 'vw_abs_01',
        minReputation: 25,
        maxReputation: 55,
        requiresUpgrade: 'hasDiagnosticScanner',
        car: {
            make: 'Volkswagen',
            model: 'Touran',
            year: 2008,
            condition: 'good'
        },
        customer: {
            name: 'Martina',
            personality: 'suspicious',
            budget: 'medium',
            patience: 2,
            arrival: [
                'a touran pulls in.',
                'abs light on.',
                'the driver has been reading online.',
                '"abs light," she says.',
                '"i read it could be a sensor."',
                '"or the module."',
                '"or the pump."',
                '"which is it?"',
                '"i don\'t want to replace everything."'
            ]
        },
        diagnostics: [
            {
                action: 'run diagnostic scan',
                cost: 15,
                time: 0,
                requiresUpgrade: 'hasDiagnosticScanner',
                reveals: [
                    'C0035 - left front wheel speed sensor.',
                    'you check the data.',
                    'left front shows 0.',
                    'others are reading.',
                    'definitely the sensor.'
                ]
            },
            {
                action: 'inspect the sensor',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'you pull the wheel.',
                    'sensor wire is damaged.',
                    'rubbed through.',
                    'easy fix.'
                ]
            }
        ],
        solution: {
            correctRepairs: ['wheel_bearing'],
            acceptableRepairs: ['wheel_bearing'],
            wrongRepairs: ['brake_caliper', 'brake_pads_front']
        },
        outcomes: {
            correct: {
                payment: 120,
                reputationChange: 10,
                dialogue: [
                    'new sensor.',
                    'light goes off.',
                    'martina checks the dash.',
                    '"that\'s it?"',
                    '"wheel speed sensor."',
                    '"not the module?"',
                    '"not the module."',
                    '"just a sensor."',
                    'she looks at the bill.',
                    '"that\'s... reasonable."',
                    'she\'ll be back.'
                ]
            },
            partial: {
                payment: 120,
                reputationChange: 10,
                dialogue: [
                    'fixed.',
                    'martina is satisfied.'
                ]
            },
            wrong: {
                payment: 0,
                reputationChange: -12,
                dialogue: [
                    'you quote her for an abs pump.',
                    '"that\'s very expensive."',
                    '"is that really necessary?"',
                    'she gets a second opinion.',
                    'they find the sensor.',
                    'you look like a crook.'
                ]
            },
            timeout: {
                payment: 0,
                reputationChange: -4,
                dialogue: [
                    'martina went to a dealer.',
                    'they diagnosed it in ten minutes.'
                ]
            }
        }
    },

    // 49. Exhaust manifold - rude customer
    {
        id: 'opel_exhaust_01',
        minReputation: 20,
        maxReputation: 50,
        requiresUpgrade: null,
        car: {
            make: 'Opel',
            model: 'Corsa',
            year: 2003,
            condition: 'rough'
        },
        customer: {
            name: 'Karl',
            personality: 'rude',
            budget: 'low',
            patience: 1,
            arrival: [
                'a corsa rolls in.',
                'ticking noise from the engine.',
                'the driver is impatient.',
                '"it\'s making a noise," he says.',
                '"fix it."',
                'he crosses his arms.'
            ]
        },
        diagnostics: [
            {
                action: 'listen to the engine',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'ticking. exhaust leak.',
                    'sounds like the manifold.',
                    'common on these.'
                ]
            },
            {
                action: 'inspect exhaust manifold',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'you look from above.',
                    'see the crack.',
                    'manifold is broken.',
                    'gasket is blown too.'
                ]
            }
        ],
        solution: {
            correctRepairs: ['exhaust_manifold_gasket'],
            acceptableRepairs: ['exhaust_manifold_gasket'],
            wrongRepairs: ['muffler', 'catalytic_converter']
        },
        outcomes: {
            correct: {
                payment: 140,
                reputationChange: 6,
                dialogue: [
                    'new gasket.',
                    'manifold welded.',
                    'quiet again.',
                    'karl listens.',
                    '"good."',
                    'he pays.',
                    'leaves.',
                    'no thank you.',
                    'but it\'s fixed.'
                ]
            },
            partial: {
                payment: 140,
                reputationChange: 6,
                dialogue: [
                    'fixed.',
                    'karl is gone.'
                ]
            },
            wrong: {
                payment: 0,
                reputationChange: -10,
                dialogue: [
                    'you quote him a muffler.',
                    '"that\'s not where the noise is."',
                    'he\'s right.',
                    'you misdiagnosed.'
                ]
            },
            timeout: {
                payment: 0,
                reputationChange: -2,
                dialogue: [
                    'karl drove away ticking.',
                    'didn\'t want to wait.'
                ]
            }
        }
    },

    // 50. Timing belt warning - anxious customer
    {
        id: 'seat_timing_01',
        minReputation: 25,
        maxReputation: 55,
        requiresUpgrade: null,
        car: {
            make: 'SEAT',
            model: 'Leon',
            year: 2006,
            condition: 'good'
        },
        customer: {
            name: 'Isabel',
            personality: 'anxious',
            budget: 'medium',
            patience: 3,
            arrival: [
                'a leon rolls in.',
                'the driver looks worried.',
                '"my mechanic said i need a timing belt," she says.',
                '"he said if it breaks the engine is destroyed."',
                '"is that true? that sounds terrifying."',
                '"how long do i have?"'
            ]
        },
        diagnostics: [
            {
                action: 'check timing belt',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'you pull the cover.',
                    'belt looks old.',
                    'cracks starting.',
                    ' sticker says 80,000 km ago.',
                    'due for replacement.'
                ]
            },
            {
                action: 'check service history',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'no record of belt change.',
                    'car has 160,000 km.',
                    'definitely due.',
                    'her mechanic was right.'
                ]
            }
        ],
        solution: {
            correctRepairs: ['timing_belt', 'water_pump'],
            acceptableRepairs: ['timing_belt'],
            wrongRepairs: ['serpentine_belt', 'spark_plugs']
        },
        outcomes: {
            correct: {
                payment: 320,
                reputationChange: 12,
                dialogue: [
                    'new timing belt.',
                    'water pump too.',
                    'you show her the old belt.',
                    'the cracks.',
                    '"this could have broken any time."',
                    '"you did the right thing."',
                    'isabel looks at the belt.',
                    '"oh god. i\'m glad i came in."',
                    '"thank you."',
                    'peace of mind.'
                ]
            },
            partial: {
                payment: 220,
                reputationChange: 8,
                dialogue: [
                    'just the belt.',
                    '"you should do the water pump too," you say.',
                    '"it\'s right there."',
                    '"later," she says.',
                    'you hope the pump lasts.'
                ]
            },
            wrong: {
                payment: 0,
                reputationChange: -12,
                dialogue: [
                    'you replace the serpentine belt.',
                    '"that\'s not the timing belt," she says.',
                    '"i know what a timing belt is."',
                    'she\'s right. wrong belt.'
                ]
            },
            timeout: {
                payment: 0,
                reputationChange: -5,
                dialogue: [
                    'isabel went back to her mechanic.',
                    'he did it for less.'
                ]
            }
        }
    },

    // ═══════════════════════════════════════════
    // FUNNY/QUIRKY CUSTOMERS
    // ═══════════════════════════════════════════

    // 51. DIY disaster - customer who tried to fix it themselves
    {
        id: 'golf_diy_01',
        minReputation: 15,
        maxReputation: 50,
        requiresUpgrade: null,
        car: {
            make: 'Volkswagen',
            model: 'Golf',
            year: 2008,
            condition: 'rough'
        },
        customer: {
            name: 'Lukas',
            personality: 'embarrassed',
            budget: 'medium',
            patience: 2,
            arrival: [
                'a golf is towed in.',
                'the hood is open. parts are everywhere.',
                'the driver won\'t make eye contact.',
                '"i watched a youtube video," he says.',
                '"it seemed simple."',
                '"how was i supposed to know there were springs?"',
                'you look at the suspension.',
                'it\'s worse than you imagined.'
            ]
        },
        diagnostics: [
            {
                action: 'assess the damage',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'he tried to replace the struts.',
                    'in his driveway.',
                    'with a hammer.',
                    'the hammer is still in the wheel well.',
                    'how is the hammer in the wheel well?'
                ]
            },
            {
                action: 'check what parts are missing',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'several bolts are missing.',
                    'a spring is in the back seat.',
                    'the strut mount is... somewhere.',
                    'this will be expensive.'
                ]
            }
        ],
        solution: {
            correctRepairs: ['strut_mount', 'suspension_springs'],
            acceptableRepairs: ['strut_mount'],
            wrongRepairs: ['shock_absorbers']
        },
        outcomes: {
            correct: {
                payment: 280,
                reputationChange: 10,
                dialogue: [
                    'you fix what lukas broke.',
                    'and what he was trying to fix originally.',
                    '"please don\'t do this again," you say.',
                    '"i won\'t," he says.',
                    '"the youtube video made it look easy."',
                    '"youtube videos always look easy."',
                    'he nods.',
                    'he understands now.'
                ]
            },
            partial: {
                payment: 180,
                reputationChange: 5,
                dialogue: [
                    'you get it running.',
                    'it\'s not perfect.',
                    'but it\'s safe.',
                    'lukas is just relieved.',
                    '"i\'ll stick to oil changes," he says.',
                    'you don\'t tell him about his last oil change.',
                    'some things are better left unsaid.'
                ]
            },
            wrong: {
                payment: 0,
                reputationChange: -15,
                dialogue: [
                    'you try to fix it.',
                    'it\'s too far gone.',
                    'the car needs to go to a specialist.',
                    'lukas looks at you.',
                    '"first youtube. now you."',
                    'he\'s not wrong.',
                    'it hurts.'
                ]
            },
            timeout: {
                payment: 0,
                reputationChange: -3,
                dialogue: [
                    'lukas couldn\'t wait.',
                    'he called a real mechanic.',
                    'you try not to take it personally.'
                ]
            }
        }
    },

    // 52. The over-explainer
    {
        id: 'ford_explainer_01',
        minReputation: 5,
        maxReputation: 40,
        requiresUpgrade: null,
        car: {
            make: 'Ford',
            model: 'Focus',
            year: 2012,
            condition: 'average'
        },
        customer: {
            name: 'Petra',
            personality: 'talkative',
            budget: 'medium',
            patience: 3,
            arrival: [
                'a focus pulls in.',
                'the driver gets out.',
                'she\'s already talking.',
                '"so i was driving to my sister\'s - you know my sister? she lives in munich now - and i heard this sound, not a bad sound, more like a whirring, like when you put a card in bicycle spokes, you know that sound? my cousin used to do that, he\'s a dentist now, can you believe it? anyway the sound..."',
                'this is going to take a while.'
            ]
        },
        diagnostics: [
            {
                action: 'listen to her describe the sound',
                cost: 0,
                time: 1,
                requiresUpgrade: null,
                reveals: [
                    'she describes the sound.',
                    'in great detail.',
                    'with sound effects.',
                    'and hand gestures.',
                    'you think it might be a wheel bearing.',
                    'you\'re not sure.',
                    'she\'s still talking.'
                ]
            },
            {
                action: 'actually check the car',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'you escape to check the car.',
                    'front right wheel bearing.',
                    'grinding noise when turning left.',
                    'classic failure.',
                    'she\'s still talking.',
                    'from across the garage.'
                ]
            }
        ],
        solution: {
            correctRepairs: ['wheel_bearing'],
            acceptableRepairs: ['wheel_bearing'],
            wrongRepairs: ['tyre_budget', 'brake_pads_front']
        },
        outcomes: {
            correct: {
                payment: 150,
                reputationChange: 7,
                dialogue: [
                    'you fix the bearing.',
                    'petra talks the entire time.',
                    'about her sister.',
                    'about munich.',
                    'about her dentist cousin.',
                    '"you\'re a good listener," she says.',
                    'you weren\'t listening.',
                    'but you fixed the car.',
                    'that counts.'
                ]
            },
            partial: {
                payment: 150,
                reputationChange: 7,
                dialogue: [
                    'same result.',
                    'there was only one thing wrong.',
                    'she tells her sister about you.',
                    'at length.',
                    'you feel bad for the sister.'
                ]
            },
            wrong: {
                payment: 0,
                reputationChange: -10,
                dialogue: [
                    'you replace the wrong part.',
                    'the noise continues.',
                    'petra describes the noise again.',
                    'in even more detail.',
                    'this is your punishment now.'
                ]
            },
            timeout: {
                payment: 0,
                reputationChange: -5,
                dialogue: [
                    'petra left.',
                    'probably still talking.',
                    'somewhere else now.'
                ]
            }
        }
    },

    // 53. The suspicious customer
    {
        id: 'audi_suspicious_01',
        minReputation: 20,
        maxReputation: 60,
        requiresUpgrade: null,
        car: {
            make: 'Audi',
            model: 'A4',
            year: 2015,
            condition: 'good'
        },
        customer: {
            name: 'Marcus',
            personality: 'suspicious',
            budget: 'high',
            patience: 2,
            arrival: [
                'an audi pulls in.',
                'the driver gets out slowly.',
                'he\'s watching you.',
                '"i\'ve been to three mechanics," he says.',
                '"they all tried to rip me off."',
                '"how do i know you won\'t?"',
                'he squints at you.',
                'you show him your hands.',
                'empty.',
                'for now.'
            ]
        },
        diagnostics: [
            {
                action: 'ask what the problem is',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    '"the engine light is on."',
                    '"but i checked online."',
                    '"it could be anything."',
                    '"probably nothing."',
                    '"mechanics always say it\'s something."',
                    'the check engine light is flashing.',
                    'that\'s not nothing.'
                ]
            },
            {
                action: 'run diagnostic scan',
                cost: 15,
                time: 0,
                requiresUpgrade: 'hasDiagnosticScanner',
                reveals: [
                    'multiple misfire codes.',
                    'cylinder 2 and 3.',
                    'spark plugs are original.',
                    '80,000 kilometers on them.',
                    'this is definitely something.'
                ]
            },
            {
                action: 'check the spark plugs',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'you pull a plug.',
                    'the gap is worn to nothing.',
                    'electrode is nearly gone.',
                    '"this is the original plug," you say.',
                    '"what did the other mechanics say?"',
                    '"they said i needed plugs."',
                    '"and?"',
                    '"i thought they were lying."',
                    'they weren\'t lying.'
                ]
            }
        ],
        solution: {
            correctRepairs: ['spark_plugs'],
            acceptableRepairs: ['spark_plugs'],
            wrongRepairs: ['ignition_coil', 'fuel_filter']
        },
        outcomes: {
            correct: {
                payment: 140,
                reputationChange: 12,
                dialogue: [
                    'new plugs.',
                    'engine runs smooth.',
                    'marcus stares at the engine.',
                    'silently.',
                    'for a long time.',
                    '"they were telling the truth," he says.',
                    '"the other mechanics."',
                    '"they were telling the truth."',
                    'he seems shaken.',
                    'his worldview is crumbling.',
                    'he pays without negotiating.',
                    'small victories.'
                ]
            },
            partial: {
                payment: 140,
                reputationChange: 12,
                dialogue: [
                    'same outcome.',
                    'marcus may learn to trust.',
                    'someday.',
                    'not today.',
                    'but someday.'
                ]
            },
            wrong: {
                payment: 0,
                reputationChange: -15,
                dialogue: [
                    'you replace the wrong part.',
                    'marcus looks vindicated.',
                    '"i knew it," he says.',
                    '"you\'re all the same."',
                    'you refund him.',
                    'he leaves.',
                    'he\'ll never trust anyone now.',
                    'you made it worse.'
                ]
            },
            timeout: {
                payment: 0,
                reputationChange: -5,
                dialogue: [
                    'marcus didn\'t trust you either.',
                    'he\'s still looking.',
                    'for a mechanic who doesn\'t exist.'
                ]
            }
        }
    },

    // 54. The car name
    {
        id: 'toyota_name_01',
        minReputation: 0,
        maxReputation: 35,
        requiresUpgrade: null,
        car: {
            make: 'Toyota',
            model: 'Corolla',
            year: 2007,
            condition: 'average'
        },
        customer: {
            name: 'Anna',
            personality: 'attached',
            budget: 'medium',
            patience: 3,
            arrival: [
                'a corolla rolls in.',
                'the driver pats the hood as she gets out.',
                '"gerald isn\'t feeling well," she says.',
                '"gerald?"',
                '"my car."',
                '"your car is named gerald?"',
                '"yes. be gentle with him."',
                'you look at the car.',
                'the car looks back.',
                'metaphorically.'
            ]
        },
        diagnostics: [
            {
                action: 'check on gerald',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'you pop the hood.',
                    'anna winces.',
                    '"is he okay?"',
                    'you check the basics.',
                    'belt is squealing.',
                    'serpentine belt. cracked. loose.',
                    '"gerald needs a new belt," you say.',
                    'anna looks concerned.',
                    '"will he be okay?"',
                    '"he\'ll be fine."',
                    'you\'re talking about a car.',
                    'this is your life now.'
                ]
            }
        ],
        solution: {
            correctRepairs: ['serpentine_belt'],
            acceptableRepairs: ['serpentine_belt'],
            wrongRepairs: ['timing_belt', 'engine_oil']
        },
        outcomes: {
            correct: {
                payment: 95,
                reputationChange: 8,
                dialogue: [
                    'new belt on gerald.',
                    'anna is relieved.',
                    '"thank you for taking care of him."',
                    'she pats the roof.',
                    '"let\'s go home, gerald."',
                    'the car doesn\'t respond.',
                    'because it\'s a car.',
                    'but anna seems happy.',
                    'that\'s enough.'
                ]
            },
            partial: {
                payment: 95,
                reputationChange: 8,
                dialogue: [
                    'gerald is fixed.',
                    'anna and gerald drive off.',
                    'you hear her talking to the car.',
                    'through the window.',
                    'some bonds are unbreakable.'
                ]
            },
            wrong: {
                payment: 0,
                reputationChange: -10,
                dialogue: [
                    'you fix the wrong thing.',
                    'anna is upset.',
                    '"gerald is still suffering."',
                    'she takes gerald somewhere else.',
                    'gerald deserved better.'
                ]
            },
            timeout: {
                payment: 0,
                reputationChange: -5,
                dialogue: [
                    'anna couldn\'t wait.',
                    'gerald is still sick.',
                    'somewhere else now.'
                ]
            }
        }
    },

    // 55. The philosopher
    {
        id: 'mercedes_philosopher_01',
        minReputation: 30,
        maxReputation: 70,
        requiresUpgrade: null,
        car: {
            make: 'Mercedes-Benz',
            model: 'C-Class',
            year: 2005,
            condition: 'good'
        },
        customer: {
            name: 'Stefan',
            personality: 'philosophical',
            budget: 'high',
            patience: 4,
            arrival: [
                'an old mercedes glides in.',
                'the driver gets out slowly.',
                'he looks at the car.',
                'he looks at the sky.',
                'he looks at you.',
                '"have you ever thought," he says.',
                '"about how a car is like life?"',
                '"it runs until it doesn\'t."',
                '"and we\'re all just mechanics."',
                '"trying to keep things running."',
                'you just want to fix his car.'
            ]
        },
        diagnostics: [
            {
                action: 'bring him back to reality',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    '"what\'s wrong with the car?"',
                    'he considers this.',
                    '"what is wrong, truly?"',
                    '"with any of us?"',
                    '"the transmission is slipping."',
                    'finally. something useful.'
                ]
            },
            {
                action: 'check the transmission',
                cost: 0,
                time: 1,
                requiresUpgrade: null,
                reveals: [
                    'you check the fluid.',
                    'low. dark. burnt smell.',
                    'transmission is worn.',
                    'but fluid change might help.',
                    'might not.',
                    'like life.',
                    'uncertain.'
                ]
            }
        ],
        solution: {
            correctRepairs: ['transmission_fluid'],
            acceptableRepairs: ['transmission_fluid'],
            wrongRepairs: ['engine_oil', 'clutch_kit']
        },
        outcomes: {
            correct: {
                payment: 120,
                reputationChange: 10,
                dialogue: [
                    'new fluid.',
                    'shifts better.',
                    'stefan nods.',
                    '"you understand."',
                    '"sometimes all we need..."',
                    '"is fresh fluid."',
                    '"a change."',
                    '"to keep going."',
                    'he drives away.',
                    'you think about what he said.',
                    'then you stop.',
                    'that way lies madness.'
                ]
            },
            partial: {
                payment: 120,
                reputationChange: 10,
                dialogue: [
                    'the car is fixed.',
                    'stefan is satisfied.',
                    '"we\'re all just trying to shift," he says.',
                    '"into the right gear."',
                    'you don\'t know what that means.',
                    'but he seems happy.'
                ]
            },
            wrong: {
                payment: 0,
                reputationChange: -12,
                dialogue: [
                    'you fix the wrong thing.',
                    'stefan is disappointed.',
                    '"even mechanics," he says.',
                    '"sometimes fail to see."',
                    '"what is right in front of them."',
                    'he\'s not wrong.',
                    'that makes it worse.'
                ]
            },
            timeout: {
                payment: 0,
                reputationChange: -5,
                dialogue: [
                    'stefan drove away.',
                    'still slipping.',
                    'still thinking.',
                    'probably.'
                ]
            }
        }
    },

    // 56. The hurry
    {
        id: 'bmw_hurry_01',
        minReputation: 10,
        maxReputation: 45,
        requiresUpgrade: null,
        car: {
            make: 'BMW',
            model: '320i',
            year: 2011,
            condition: 'good'
        },
        customer: {
            name: 'Felix',
            personality: 'impatient',
            budget: 'high',
            patience: 1,
            arrival: [
                'a bmw almost hits the garage door.',
                'the driver jumps out.',
                'he\'s checking his watch.',
                '"i have a meeting in two hours."',
                '"the steering is making noise."',
                '"can you fix it? quickly?"',
                '"important people are waiting."',
                'you\'ve never heard of him.'
            ]
        },
        diagnostics: [
            {
                action: 'check the steering',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'power steering fluid is low.',
                    'pump is whining.',
                    'there\'s a leak.',
                    'somewhere.',
                    'finding it takes time.',
                    'time felix doesn\'t have.'
                ]
            },
            {
                action: 'quick visual inspection',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'you see the leak.',
                    'power steering hose.',
                    'wet with fluid.',
                    'could top it off.',
                    'temporary fix.',
                    'or do it right.',
                    'felix is tapping his foot.'
                ]
            }
        ],
        solution: {
            correctRepairs: ['power_steering_fluid'],
            acceptableRepairs: ['power_steering_fluid'],
            wrongRepairs: ['shock_absorbers', 'wheel_bearing']
        },
        outcomes: {
            correct: {
                payment: 85,
                reputationChange: 6,
                dialogue: [
                    'you top off the fluid.',
                    'the noise stops.',
                    'felix checks his watch.',
                    '"that\'s it?"',
                    '"for now. you have a leak."',
                    '"i don\'t have time for leaks."',
                    'he throws money at you.',
                    'drives off.',
                    'you hope he makes it.',
                    'to his important meeting.',
                    'with important people.',
                    'who\'ve never heard of him.'
                ]
            },
            partial: {
                payment: 85,
                reputationChange: 6,
                dialogue: [
                    'the car is quieter.',
                    'felix leaves.',
                    'the leak is still there.',
                    'it will be back.',
                    'they always come back.'
                ]
            },
            wrong: {
                payment: 0,
                reputationChange: -15,
                dialogue: [
                    'you waste time on the wrong thing.',
                    'felix misses his meeting.',
                    'he\'s furious.',
                    '"do you know who i was meeting?"',
                    'you don\'t.',
                    'he doesn\'t say.',
                    'some mysteries remain.'
                ]
            },
            timeout: {
                payment: 0,
                reputationChange: -3,
                dialogue: [
                    'felix didn\'t have time for you.',
                    'he went somewhere faster.',
                    'probably still leaking.',
                    'probably still late.'
                ]
            }
        }
    },

    // ═══════════════════════════════════════════
    // ENGINE SWAP SCENARIOS (Requires Engine Hoist)
    // ═══════════════════════════════════════════

    // 57. The blown engine - first engine swap
    {
        id: 'golf_blown_engine_01',
        minReputation: 45,
        maxReputation: 100,
        requiresUpgrade: 'hasEngineHoist',
        car: {
            make: 'Volkswagen',
            model: 'Golf GTI',
            year: 2002,
            condition: 'rough'
        },
        customer: {
            name: 'Lukas',
            personality: 'enthusiast',
            budget: 'medium',
            patience: 5,
            arrival: [
                'a golf gti rolls in on the back of a tow truck.',
                'the driver steps out. young. grease under his fingernails.',
                '"i pushed it too hard," he says.',
                '"threw a rod through the block."',
                'he looks at the car like a wounded pet.',
                '"can you swap the engine? i found a used one."'
            ]
        },
        diagnostics: [
            {
                action: 'inspect the damaged engine',
                cost: 0,
                time: 1,
                requiresUpgrade: null,
                reveals: [
                    'you open the hood.',
                    'there\'s a hole in the block.',
                    'oil everywhere.',
                    'this engine is done.',
                    'beyond done.',
                    'a replacement is the only option.'
                ]
            },
            {
                action: 'check the replacement engine',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'lukas has a 1.8T engine in his pickup.',
                    'compression test shows 150psi across all cylinders.',
                    'looks like a good unit.',
                    'turbo spins freely.',
                    'this could work.'
                ]
            },
            {
                action: 'run diagnostic scan',
                cost: 15,
                time: 0,
                requiresUpgrade: 'hasDiagnosticScanner',
                reveals: [
                    'no codes on the replacement ECU.',
                    'immobilizer will need to be synced.',
                    'wiring harness looks compatible.',
                    'should be a straightforward swap.'
                ]
            }
        ],
        solution: {
            correctRepairs: ['engine_4cyl_turbo', 'engine_swap_kit', 'engine_oil', 'coolant'],
            acceptableRepairs: ['engine_4cyl_turbo', 'engine_swap_kit'],
            wrongRepairs: ['engine_v6', 'head_gasket', 'engine_oil']
        },
        outcomes: {
            correct: {
                payment: 2350,
                reputationChange: 18,
                dialogue: [
                    'three days of work.',
                    'the engine drops in.',
                    'wiring connected. fluids filled.',
                    'you turn the key.',
                    'it coughs. catches. runs.',
                    'the turbo whistles.',
                    'lukas is grinning.',
                    '"she lives," he says.',
                    'he shakes your hand.',
                    'real firm.',
                    'this is why you do this.'
                ]
            },
            partial: {
                payment: 900,
                reputationChange: 10,
                dialogue: [
                    'the engine is in.',
                    'it runs.',
                    'rough at idle.',
                    'probably needs tuning.',
                    'lukas doesn\'t seem to mind.',
                    '"i\'ll sort it out," he says.',
                    'at least it runs.'
                ]
            },
            wrong: {
                payment: 0,
                reputationChange: -20,
                dialogue: [
                    'you ordered the wrong parts.',
                    'the engine sits on a pallet.',
                    'lukas is understanding.',
                    'but disappointed.',
                    '"i thought you knew these cars."',
                    'so did you.'
                ]
            },
            timeout: {
                payment: 0,
                reputationChange: -10,
                dialogue: [
                    'lukas got tired of waiting.',
                    'towed the golf somewhere else.',
                    'probably to someone who could finish the job.'
                ]
            }
        }
    },

    // 58. The diesel conversion
    {
        id: 'tdi_conversion_01',
        minReputation: 55,
        maxReputation: 100,
        requiresUpgrade: 'hasEngineHoist',
        car: {
            make: 'Volkswagen',
            model: 'Golf',
            year: 1999,
            condition: 'average'
        },
        customer: {
            name: 'Heinrich',
            personality: 'practical',
            budget: 'medium',
            patience: 6,
            arrival: [
                'an older man in a practical jacket.',
                'he drives a beat-up golf.',
                '"the petrol engine is dead," he says.',
                '"i want to put a TDI in it."',
                '"fuel economy. reliability."',
                '"can you do it?"',
                'he has spreadsheets. actual spreadsheets.'
            ]
        },
        diagnostics: [
            {
                action: 'inspect the car',
                cost: 0,
                time: 1,
                requiresUpgrade: null,
                reveals: [
                    'the petrol engine is indeed dead.',
                    'blown head gasket. cracked head.',
                    'not worth fixing.',
                    'the rest of the car is solid.',
                    'good candidate for a swap.'
                ]
            },
            {
                action: 'check the TDI engine',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'he has a 1.9 TDI from a wrecked car.',
                    '150,000 km on it.',
                    'well maintained.',
                    'comes with ECU and wiring.',
                    'this is a lot of work.',
                    'but doable.'
                ]
            },
            {
                action: 'assess conversion requirements',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'fuel lines need changing.',
                    'different fuel pump.',
                    'glow plug wiring.',
                    'exhaust modifications.',
                    'this is a full conversion.',
                    'not just an engine swap.'
                ]
            }
        ],
        solution: {
            correctRepairs: ['engine_diesel_4cyl', 'engine_conversion_parts', 'fuel_pump', 'engine_wiring_harness'],
            acceptableRepairs: ['engine_diesel_4cyl', 'engine_conversion_parts'],
            wrongRepairs: ['engine_4cyl_standard', 'fuel_injector', 'spark_plugs']
        },
        outcomes: {
            correct: {
                payment: 2200,
                reputationChange: 25,
                dialogue: [
                    'a week of work.',
                    'the TDI fires up on the first glow.',
                    'that distinctive diesel clatter.',
                    'heinrich checks his spreadsheet.',
                    '"four point five liters per hundred," he says.',
                    '"as calculated."',
                    'he\'s actually smiling.',
                    'spreadsheets and all.'
                ]
            },
            partial: {
                payment: 1400,
                reputationChange: 12,
                dialogue: [
                    'the engine is in.',
                    'it runs.',
                    'check engine light is on.',
                    'probably a sensor issue.',
                    'heinrich will monitor it.',
                    'he has a spreadsheet for that too.'
                ]
            },
            wrong: {
                payment: 0,
                reputationChange: -18,
                dialogue: [
                    'you tried to put petrol parts on a diesel.',
                    'heinrich is not pleased.',
                    '"i gave you the specifications."',
                    '"very clear specifications."',
                    'he takes his spreadsheets elsewhere.'
                ]
            },
            timeout: {
                payment: 0,
                reputationChange: -8,
                dialogue: [
                    'heinrich found someone faster.',
                    'probably someone who reads spreadsheets.',
                    'more carefully.'
                ]
            }
        }
    },

    // 59. The V8 swap
    {
        id: 'e36_v8_swap_01',
        minReputation: 70,
        maxReputation: 100,
        requiresUpgrade: 'hasEngineHoist',
        car: {
            make: 'BMW',
            model: '318i',
            year: 1995,
            condition: 'good'
        },
        customer: {
            name: 'Maximilian',
            personality: 'ambitious',
            budget: 'high',
            patience: 7,
            arrival: [
                'a bmw e36 rolls in.',
                'the driver is young. confident.',
                '"the four cylinder is boring," he says.',
                '"i want to put a V8 in it."',
                '"an M62. from a 540i."',
                'he shows you renderings.',
                'he\'s planned the whole thing.',
                'this is either brilliant or insane.'
            ]
        },
        diagnostics: [
            {
                action: 'inspect the car',
                cost: 0,
                time: 1,
                requiresUpgrade: null,
                reveals: [
                    'the 318i is in good shape.',
                    'rust free. straight body.',
                    'the four cylinder runs fine.',
                    'shame to take it out.',
                    'but maximilian has a vision.'
                ]
            },
            {
                action: 'inspect the V8',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'the M62 V8 is on an engine stand.',
                    '4.4 liters. 282 horsepower.',
                    'much more than the 1.8 liter four.',
                    'oil leaks fixed. chains replaced.',
                    'it\'s been rebuilt.',
                    'maximilian spared no expense.'
                ]
            },
            {
                action: 'assess swap requirements',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'custom engine mounts needed.',
                    'driveshaft modification.',
                    'bigger radiator.',
                    'exhaust fabrication.',
                    'this is a major project.',
                    'but everything is ready.'
                ]
            }
        ],
        solution: {
            correctRepairs: ['engine_v8', 'engine_conversion_parts', 'radiator', 'ecu_engine'],
            acceptableRepairs: ['engine_v8', 'engine_conversion_parts'],
            wrongRepairs: ['engine_4cyl_standard', 'turbocharger', 'engine_4cyl_turbo']
        },
        outcomes: {
            correct: {
                payment: 6500,
                reputationChange: 28,
                dialogue: [
                    'two weeks of work.',
                    'the V8 sits in the engine bay.',
                    'tight fit. but it fits.',
                    'you turn the key.',
                    'the V8 rumbles to life.',
                    'the whole car shakes.',
                    'maximilian is speechless.',
                    'then he laughs.',
                    '"it lives," he says.',
                    'a monster is born.'
                ]
            },
            partial: {
                payment: 2900,
                reputationChange: 15,
                dialogue: [
                    'the engine is in.',
                    'it runs.',
                    'needs more work on the cooling.',
                    'runs hot in traffic.',
                    'but maximilian is happy.',
                    '"we\'ll sort it," he says.',
                    '"together."'
                ]
            },
            wrong: {
                payment: 0,
                reputationChange: -25,
                dialogue: [
                    'you tried to put a four cylinder back in.',
                    'or ordered the wrong V8 parts.',
                    'maximilian is disappointed.',
                    '"i expected more," he says.',
                    '"from someone with your reputation."',
                    'that stings.'
                ]
            },
            timeout: {
                payment: 0,
                reputationChange: -12,
                dialogue: [
                    'maximilian got impatient.',
                    'took the car to a specialist.',
                    'probably the right call.',
                    'for a project this big.'
                ]
            }
        }
    },

    // 60. The rotary revival
    {
        id: 'rx7_rotary_01',
        minReputation: 65,
        maxReputation: 100,
        requiresUpgrade: 'hasEngineHoist',
        car: {
            make: 'Mazda',
            model: 'RX-7',
            year: 1993,
            condition: 'rough'
        },
        customer: {
            name: 'Kenji',
            personality: 'passionate',
            budget: 'high',
            patience: 6,
            arrival: [
                'an rx-7 is pushed into the lot.',
                'the driver is japanese. quiet intensity.',
                '"the apex seals are gone," he says.',
                '"i have a rebuilt 13B."',
                '"bridge ported. semi-peripheral."',
                'he speaks the rotary language.',
                'this is going to be interesting.'
            ]
        },
        diagnostics: [
            {
                action: 'inspect the old engine',
                cost: 0,
                time: 1,
                requiresUpgrade: null,
                reveals: [
                    'you try to start it.',
                    'it cranks. doesn\'t fire.',
                    'low compression on the rear rotor.',
                    'apex seals are definitely gone.',
                    'this engine is a boat anchor.'
                ]
            },
            {
                action: 'inspect the rebuilt engine',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'the rebuilt 13B is beautiful.',
                    'porting work is aggressive.',
                    'this will make big power.',
                    'and drink fuel like a V8.',
                    'kenji knows what he wants.'
                ]
            },
            {
                action: 'check supporting modifications',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'upgraded fuel pump.',
                    'larger intercooler.',
                    'aftermarket ECU.',
                    'kenji brought everything.',
                    'this is a well-planned build.'
                ]
            }
        ],
        solution: {
            correctRepairs: ['engine_rotary', 'engine_swap_kit', 'fuel_pump', 'intercooler', 'ecu_engine'],
            acceptableRepairs: ['engine_rotary', 'engine_swap_kit'],
            wrongRepairs: ['engine_4cyl_turbo', 'engine_v6', 'turbocharger']
        },
        outcomes: {
            correct: {
                payment: 2800,
                reputationChange: 25,
                dialogue: [
                    'the rotary drops in.',
                    'everything connects.',
                    'pre-mix in the fuel. prime the oil.',
                    'you turn the key.',
                    'it fires. brap. brap. brap.',
                    'that unmistakable rotary sound.',
                    'kenji closes his eyes.',
                    'listening.',
                    '"perfect," he says.',
                    'you agree.'
                ]
            },
            partial: {
                payment: 2200,
                reputationChange: 14,
                dialogue: [
                    'the engine is in.',
                    'it runs.',
                    'running rich.',
                    'needs tuning.',
                    'but it lives.',
                    'kenji is satisfied.',
                    'for now.'
                ]
            },
            wrong: {
                payment: 0,
                reputationChange: -22,
                dialogue: [
                    'you tried to put piston engine parts on a rotary.',
                    'kenji is not happy.',
                    '"a rotary is not a piston engine," he says.',
                    '"you should know this."',
                    'he\'s right.'
                ]
            },
            timeout: {
                payment: 0,
                reputationChange: -10,
                dialogue: [
                    'kenji ran out of patience.',
                    'took the rx-7 to a rotary specialist.',
                    'probably for the best.'
                ]
            }
        }
    },

    // ═══════════════════════════════════════════
    // EXPANDED VEHICLE SCENARIOS
    // ═══════════════════════════════════════════

    // 61. The electric car problem
    {
        id: 'tesla_dead_battery_01',
        minReputation: 50,
        maxReputation: 100,
        requiresUpgrade: 'hasDiagnosticScanner',
        car: {
            make: 'Tesla',
            model: 'Model S',
            year: 2014,
            condition: 'average'
        },
        customer: {
            name: 'Sophie',
            personality: 'frustrated',
            budget: 'high',
            patience: 3,
            arrival: [
                'a model s rolls in silently.',
                'the driver looks exhausted.',
                '"the car says service required," she says.',
                '"the dealership wants eight thousand."',
                '"for a battery module."',
                '"can you help?"',
                'electric cars. new territory.'
            ]
        },
        diagnostics: [
            {
                action: 'run diagnostic scan',
                cost: 15,
                time: 0,
                requiresUpgrade: 'hasDiagnosticScanner',
                reveals: [
                    'you plug in the scanner.',
                    'battery management system codes.',
                    'module 3 is degraded.',
                    'but the rest are fine.',
                    'you can replace just one module.',
                    'not the whole pack.'
                ]
            },
            {
                action: 'inspect the battery pack',
                cost: 0,
                time: 2,
                requiresUpgrade: null,
                reveals: [
                    'the car is on jack stands.',
                    'battery pack is accessible.',
                    'module 3 is swollen.',
                    'definitely the problem.',
                    'this is fixable.',
                    'with the right parts.'
                ]
            }
        ],
        solution: {
            correctRepairs: ['hybrid_battery', 'coolant'],
            acceptableRepairs: ['hybrid_battery'],
            wrongRepairs: ['battery', 'alternator', 'starter_motor']
        },
        outcomes: {
            correct: {
                payment: 2800,
                reputationChange: 20,
                dialogue: [
                    'you replace the bad module.',
                    'reset the BMS.',
                    'the car wakes up.',
                    'full range restored.',
                    'sophie is relieved.',
                    '"you saved me six thousand," she says.',
                    'electric cars aren\'t so bad.',
                    'when you know what you\'re doing.'
                ]
            },
            partial: {
                payment: 1800,
                reputationChange: 12,
                dialogue: [
                    'the module is replaced.',
                    'car runs.',
                    'range is okay.',
                    'not perfect.',
                    'but sophie is happy.',
                    'that\'s what matters.'
                ]
            },
            wrong: {
                payment: 0,
                reputationChange: -18,
                dialogue: [
                    'you tried to put a 12v battery in.',
                    'that\'s not how electric cars work.',
                    'sophie is confused.',
                    'and disappointed.',
                    '"i thought you could help."'
                ]
            },
            timeout: {
                payment: 0,
                reputationChange: -8,
                dialogue: [
                    'sophie went to the dealership.',
                    'paid the eight thousand.',
                    'some problems are too expensive.',
                    'to wait for.'
                ]
            }
        }
    },

    // 62. The hybrid headache
    {
        id: 'prius_inverter_01',
        minReputation: 40,
        maxReputation: 80,
        requiresUpgrade: 'hasDiagnosticScanner',
        car: {
            make: 'Toyota',
            model: 'Prius',
            year: 2008,
            condition: 'average'
        },
        customer: {
            name: 'Greta',
            personality: 'practical',
            budget: 'medium',
            patience: 4,
            arrival: [
                'a prius limps into the lot.',
                'all the warning lights are on.',
                'the driver is a young woman.',
                '"it just died on the highway," she says.',
                '"the red triangle came on."',
                '"i need this car for work."',
                'hybrids. always something.'
            ]
        },
        diagnostics: [
            {
                action: 'run diagnostic scan',
                cost: 15,
                time: 0,
                requiresUpgrade: 'hasDiagnosticScanner',
                reveals: [
                    'multiple hybrid system codes.',
                    'inverter failure.',
                    'this is a known issue.',
                    'inverter pump failed.',
                    'caused overheating.',
                    'the inverter is toast.'
                ]
            },
            {
                action: 'inspect the inverter',
                cost: 0,
                time: 1,
                requiresUpgrade: null,
                reveals: [
                    'inverter coolant pump is seized.',
                    'inverter itself is damaged.',
                    'burnt smell.',
                    'needs replacement.',
                    'not cheap.',
                    'but cheaper than a new car.'
                ]
            }
        ],
        solution: {
            correctRepairs: ['inverter', 'hybrid_coolant_pump', 'coolant'],
            acceptableRepairs: ['inverter', 'hybrid_coolant_pump'],
            wrongRepairs: ['battery', 'alternator', 'fuel_pump']
        },
        outcomes: {
            correct: {
                payment: 1800,
                reputationChange: 16,
                dialogue: [
                    'new inverter. new pump.',
                    'fresh coolant.',
                    'the prius wakes up.',
                    'all lights off.',
                    'greta is relieved.',
                    '"i was worried it was the battery," she says.',
                    '"those are even more expensive."',
                    'small victories.'
                ]
            },
            partial: {
                payment: 1400,
                reputationChange: 10,
                dialogue: [
                    'the car runs.',
                    'inverter replaced.',
                    'still a warning light.',
                    'probably needs a hybrid battery soon.',
                    'but that\'s a problem for later.'
                ]
            },
            wrong: {
                payment: 0,
                reputationChange: -15,
                dialogue: [
                    'you tried to fix it like a normal car.',
                    'it\'s not a normal car.',
                    'greta knows this now.',
                    'so do you.'
                ]
            },
            timeout: {
                payment: 0,
                reputationChange: -6,
                dialogue: [
                    'greta couldn\'t wait.',
                    'traded it in for a new one.',
                    'probably the right call.'
                ]
            }
        }
    },

    // 63. The van life
    {
        id: 'sprinter_van_01',
        minReputation: 35,
        maxReputation: 70,
        requiresUpgrade: null,
        car: {
            make: 'Mercedes',
            model: 'Sprinter',
            year: 2012,
            condition: 'rough'
        },
        customer: {
            name: 'Luna',
            personality: 'free_spirit',
            budget: 'low',
            patience: 5,
            arrival: [
                'a sprinter van covered in stickers.',
                'the driver has dreadlocks and a dog.',
                '"the van won\'t start when it\'s cold," she says.',
                '"i live in this thing."',
                '"it\'s getting cold."',
                '"can you help?"',
                'the dog looks at you hopefully.'
            ]
        },
        diagnostics: [
            {
                action: 'check the glow plugs',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'it\'s a diesel.',
                    'glow plug light is slow.',
                    'you check the plugs.',
                    'two are dead.',
                    'probably the relay too.',
                    'cold starts are a nightmare.',
                    'when these fail.'
                ]
            },
            {
                action: 'check the battery',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'battery is weak.',
                    'she has a lot of electronics.',
                    'solar panel on the roof.',
                    'but the house battery is different.',
                    'starter battery is dying.',
                    'that\'s the immediate problem.'
                ]
            }
        ],
        solution: {
            correctRepairs: ['battery', 'spark_plugs'], // glow plugs use spark_plugs as proxy
            acceptableRepairs: ['battery'],
            wrongRepairs: ['alternator', 'starter_motor', 'fuel_pump']
        },
        outcomes: {
            correct: {
                payment: 280,
                reputationChange: 12,
                dialogue: [
                    'new battery. new glow plugs.',
                    'the van starts instantly.',
                    'even cold.',
                    'luna hugs you.',
                    'the dog licks your hand.',
                    '"you\'re a lifesaver," she says.',
                    '"i was worried i\'d freeze."',
                    'she offers you kombucha.',
                    'you decline.',
                    'politely.'
                ]
            },
            partial: {
                payment: 180,
                reputationChange: 6,
                dialogue: [
                    'new battery.',
                    'starts better.',
                    'still rough when cold.',
                    'but luna is happy.',
                    '"good enough," she says.',
                    'van life.'
                ]
            },
            wrong: {
                payment: 0,
                reputationChange: -10,
                dialogue: [
                    'you fixed the wrong thing.',
                    'the van still won\'t start.',
                    'luna is disappointed.',
                    'the dog looks sad.',
                    'now you feel bad.'
                ]
            },
            timeout: {
                payment: 0,
                reputationChange: -5,
                dialogue: [
                    'luna couldn\'t wait.',
                    'headed south.',
                    'where it\'s warm.',
                    'smart.'
                ]
            }
        }
    },

    // 64. The classic restoration
    {
        id: 'mustang_classic_01',
        minReputation: 60,
        maxReputation: 100,
        requiresUpgrade: 'hasEngineHoist',
        car: {
            make: 'Ford',
            model: 'Mustang',
            year: 1967,
            condition: 'rough'
        },
        customer: {
            name: 'Richard',
            personality: 'nostalgic',
            budget: 'high',
            patience: 8,
            arrival: [
                'a 1967 mustang fastback arrives.',
                'on a trailer.',
                'the owner is older. well-dressed.',
                '"my father bought this new," he says.',
                '"it\'s been in a barn for thirty years."',
                '"i want it running again."',
                'his eyes are wet.',
                'this matters to him.'
            ]
        },
        diagnostics: [
            {
                action: 'inspect the engine',
                cost: 0,
                time: 2,
                requiresUpgrade: null,
                reveals: [
                    'a 289 v8. original.',
                    'frozen solid.',
                    'rusted cylinders.',
                    'this engine needs a full rebuild.',
                    'or replacement.',
                    'richard wants original.',
                    'of course he does.'
                ]
            },
            {
                action: 'inspect the fuel system',
                cost: 0,
                time: 1,
                requiresUpgrade: null,
                reveals: [
                    'fuel tank is rusty.',
                    'lines are clogged.',
                    'carburetor is seized.',
                    'thirty years of sitting.',
                    'everything fuel-related is toast.'
                ]
            },
            {
                action: 'check the brakes',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'drum brakes all around.',
                    'wheel cylinders are seized.',
                    'brake lines are rusted.',
                    'master cylinder is frozen.',
                    'brakes need complete rebuild.'
                ]
            }
        ],
        solution: {
            correctRepairs: ['engine_v8', 'fuel_pump', 'brake_master_cylinder', 'brake_lines', 'engine_oil', 'coolant'],
            acceptableRepairs: ['engine_v8', 'fuel_pump', 'brake_master_cylinder'],
            wrongRepairs: ['engine_4cyl_standard', 'abs_sensor', 'ecu_engine']
        },
        outcomes: {
            correct: {
                payment: 4800,
                reputationChange: 30,
                dialogue: [
                    'weeks of work.',
                    'the engine is rebuilt.',
                    'new fuel system.',
                    'new brakes.',
                    'you turn the key.',
                    'the v8 rumbles to life.',
                    'that sound.',
                    'richard just stands there.',
                    'listening.',
                    '"my father," he says.',
                    '"i can hear him."',
                    'this is why you do this.'
                ]
            },
            partial: {
                payment: 3200,
                reputationChange: 18,
                dialogue: [
                    'the engine runs.',
                    'brakes work.',
                    'not perfect.',
                    'but it moves under its own power.',
                    'richard is happy.',
                    '"it\'s a start," he says.',
                    'he\'s right.'
                ]
            },
            wrong: {
                payment: 0,
                reputationChange: -25,
                dialogue: [
                    'you ordered modern parts.',
                    'for a classic car.',
                    'they don\'t fit.',
                    'richard is understanding.',
                    'but disappointed.',
                    '"it\'s not a honda civic," he says.',
                    'you know.'
                ]
            },
            timeout: {
                payment: 0,
                reputationChange: -15,
                dialogue: [
                    'richard ran out of patience.',
                    'took the mustang to a specialist.',
                    'some projects need experts.'
                ]
            }
        }
    },

    // 65. The work truck
    {
        id: 'f250_powerstroke_01',
        minReputation: 45,
        maxReputation: 85,
        requiresUpgrade: 'hasDiagnosticScanner',
        car: {
            make: 'Ford',
            model: 'F-250',
            year: 2006,
            condition: 'rough'
        },
        customer: {
            name: 'Buck',
            personality: 'practical',
            budget: 'medium',
            patience: 4,
            arrival: [
                'a massive f-250 rolls in.',
                'the driver is a contractor.',
                'dusty boots. calloused hands.',
                '"the turbo is making noise," he says.',
                '"i need this truck for work."',
                '"every day it\'s down, i lose money."',
                'no pressure.'
            ]
        },
        diagnostics: [
            {
                action: 'listen to the turbo',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'you hear it.',
                    'a grinding whine.',
                    'turbo bearing is failing.',
                    'not blown yet.',
                    'but close.',
                    'this could let go any day.'
                ]
            },
            {
                action: 'run diagnostic scan',
                cost: 15,
                time: 0,
                requiresUpgrade: 'hasDiagnosticScanner',
                reveals: [
                    'underboost code.',
                    'turbo efficiency is down.',
                    'vgt vanes are sticking.',
                    'common on the 6.0l.',
                    'turbo needs rebuild or replacement.'
                ]
            },
            {
                action: 'check the egr',
                cost: 0,
                time: 1,
                requiresUpgrade: null,
                reveals: [
                    'egr cooler is weeping.',
                    'not blown.',
                    'but it\'s coming.',
                    'these engines have issues.',
                    'all of them.'
                ]
            }
        ],
        solution: {
            correctRepairs: ['turbocharger', 'turbo_rebuild_kit', 'egr_valve'],
            acceptableRepairs: ['turbocharger'],
            wrongRepairs: ['engine_diesel_v6', 'supercharger', 'intercooler']
        },
        outcomes: {
            correct: {
                payment: 2500,
                reputationChange: 18,
                dialogue: [
                    'rebuilt turbo.',
                    'new egr valve.',
                    'the 6.0 fires up.',
                    'turbo spools clean.',
                    'no more noise.',
                    'buck nods.',
                    '"good work," he says.',
                    '"i\'ll be back."',
                    '"these things always break."',
                    'he\'s not wrong.'
                ]
            },
            partial: {
                payment: 1600,
                reputationChange: 10,
                dialogue: [
                    'turbo replaced.',
                    'egr still weeping.',
                    'but the truck runs.',
                    'buck is satisfied.',
                    '"for now," he says.',
                    'he knows the deal.'
                ]
            },
            wrong: {
                payment: 0,
                reputationChange: -16,
                dialogue: [
                    'you tried to put a gas turbo on a diesel.',
                    'different animals.',
                    'buck is not happy.',
                    '"i told you it was a powerstroke."',
                    'he did.'
                ]
            },
            timeout: {
                payment: 0,
                reputationChange: -8,
                dialogue: [
                    'buck couldn\'t wait.',
                    'work doesn\'t stop.',
                    'neither do diesel problems.'
                ]
            }
        }
    },

    // 66. The overheating Ferrari
    {
        id: 'ferrari_overheat_01',
        minReputation: 80,
        maxReputation: 100,
        requiresUpgrade: 'hasDiagnosticScanner',
        car: {
            make: 'Ferrari',
            model: 'F430',
            year: 2006,
            condition: 'good'
        },
        customer: {
            name: 'Alessandro',
            personality: 'demanding',
            budget: 'high',
            patience: 3,
            arrival: [
                'a ferrari f430 arrives.',
                'on a flatbed.',
                'the driver is italian. expensive suit.',
                '"it overheated," he says.',
                '"on the autobahn."',
                '"i was only doing two hundred."',
                'only two hundred.',
                'this should be interesting.'
            ]
        },
        diagnostics: [
            {
                action: 'inspect the cooling system',
                cost: 0,
                time: 1,
                requiresUpgrade: null,
                reveals: [
                    'the radiators are full of debris.',
                    'both side radiators.',
                    'the car has three.',
                    'front and both sides.',
                    'all clogged.',
                    'no airflow. overheating.'
                ]
            },
            {
                action: 'check for damage',
                cost: 0,
                time: 1,
                requiresUpgrade: null,
                reveals: [
                    'no head gasket damage.',
                    'lucky.',
                    'the engine caught it in time.',
                    'just needs cooling system service.',
                    'and new coolant.',
                    'expensive coolant.'
                ]
            },
            {
                action: 'run diagnostic scan',
                cost: 25,
                time: 0,
                requiresUpgrade: 'hasDiagnosticScanner',
                reveals: [
                    'high temperature warning.',
                    'no engine damage codes.',
                    'got lucky.',
                    'this could have been much worse.',
                    'ferrari engines aren\'t cheap.'
                ]
            }
        ],
        solution: {
            correctRepairs: ['radiator', 'coolant', 'coolant_hose', 'thermostat'],
            acceptableRepairs: ['radiator', 'coolant'],
            wrongRepairs: ['water_pump', 'head_gasket', 'engine_v8']
        },
        outcomes: {
            correct: {
                payment: 3900,
                reputationChange: 32,
                dialogue: [
                    'cleaned the radiators.',
                    'new coolant.',
                    'new hoses.',
                    'the ferrari starts.',
                    'that v8 sound.',
                    'temperature holds steady.',
                    'alessandro nods.',
                    '"you know your way around," he says.',
                    '"i\'ll recommend you."',
                    'to his rich friends.',
                    'this is good.'
                ]
            },
            partial: {
                payment: 2800,
                reputationChange: 18,
                dialogue: [
                    'cooling system serviced.',
                    'runs cooler.',
                    'still runs a bit warm.',
                    'might need more work.',
                    'but alessandro is satisfied.',
                    'for now.'
                ]
            },
            wrong: {
                payment: 0,
                reputationChange: -28,
                dialogue: [
                    'you tried to put generic parts on a ferrari.',
                    'that\'s not how ferraris work.',
                    'alessandro is furious.',
                    '"this is a ferrari," he says.',
                    '"not a ford focus."',
                    'point taken.'
                ]
            },
            timeout: {
                payment: 0,
                reputationChange: -12,
                dialogue: [
                    'alessandro had the car transported.',
                    'to a ferrari specialist.',
                    'probably the right call.'
                ]
            }
        }
    },

    // ═══════════════════════════════════════════
    // MORE VARIETY SCENARIOS
    // ═══════════════════════════════════════════

    // 67. The mysterious noise
    {
        id: 'audi_mystery_noise_01',
        minReputation: 30,
        maxReputation: 65,
        requiresUpgrade: null,
        car: {
            make: 'Audi',
            model: 'A4',
            year: 2013,
            condition: 'good'
        },
        customer: {
            name: 'Monika',
            personality: 'anxious',
            budget: 'medium',
            patience: 3,
            arrival: [
                'an audi a4 pulls in.',
                'the driver looks worried.',
                '"there\'s a noise," she says.',
                '"only sometimes. when i turn left."',
                '"sometimes when i brake."',
                '"sometimes just randomly."',
                '"i\'m afraid to drive it."',
                'intermittent problems. the worst kind.'
            ]
        },
        diagnostics: [
            {
                action: 'take it for a test drive',
                cost: 0,
                time: 1,
                requiresUpgrade: null,
                reveals: [
                    'you drive around the block.',
                    'nothing.',
                    'you turn left.',
                    'nothing.',
                    'you brake.',
                    'a faint clunk.',
                    'there it is.',
                    'suspension related. probably.'
                ]
            },
            {
                action: 'inspect the suspension',
                cost: 0,
                time: 1,
                requiresUpgrade: null,
                reveals: [
                    'you put it on the lift.',
                    'check the control arms.',
                    'sway bar links are loose.',
                    'left side has play.',
                    'that\'s your noise.',
                    'should be a simple fix.'
                ]
            },
            {
                action: 'run diagnostic scan',
                cost: 15,
                time: 0,
                requiresUpgrade: 'hasDiagnosticScanner',
                reveals: [
                    'no fault codes.',
                    'ABS sensors all reading normal.',
                    'definitely mechanical.',
                    'not electrical.',
                    'saves time.'
                ]
            }
        ],
        solution: {
            correctRepairs: ['sway_bar_link', 'control_arm'],
            acceptableRepairs: ['sway_bar_link'],
            wrongRepairs: ['brake_pads_front', 'wheel_bearing', 'shock_absorber']
        },
        outcomes: {
            correct: {
                payment: 280,
                reputationChange: 10,
                dialogue: [
                    'new sway bar links.',
                    'new control arm.',
                    'test drive.',
                    'silence.',
                    'beautiful silence.',
                    'monika is relieved.',
                    '"thank you," she says.',
                    '"i can drive without anxiety now."',
                    'you know that feeling.',
                    'it doesn\'t last.'
                ]
            },
            partial: {
                payment: 150,
                reputationChange: 4,
                dialogue: [
                    'new sway bar links.',
                    'noise is quieter.',
                    'but not gone.',
                    'monika notices.',
                    '"it\'s better," she says.',
                    'but not fixed.',
                    'she\'ll be back.'
                ]
            },
            wrong: {
                payment: 0,
                reputationChange: -12,
                dialogue: [
                    'you fixed the wrong thing.',
                    'the noise is still there.',
                    'monika is disappointed.',
                    '"i thought you could find it."',
                    'so did you.'
                ]
            },
            timeout: {
                payment: 0,
                reputationChange: -5,
                dialogue: [
                    'monika couldn\'t wait.',
                    'took it to the dealership.',
                    'they probably charged double.',
                    'but at least it\'s fixed.',
                    'probably.'
                ]
            }
        }
    },

    // 68. The rally car
    {
        id: 'subaru_rally_01',
        minReputation: 55,
        maxReputation: 100,
        requiresUpgrade: null,
        car: {
            make: 'Subaru',
            model: 'Impreza WRX',
            year: 2005,
            condition: 'rough'
        },
        customer: {
            name: 'Marcus',
            personality: 'enthusiast',
            budget: 'medium',
            patience: 4,
            arrival: [
                'a subaru wrx rolls in.',
                'mud flaps. rally tires. dirt everywhere.',
                'the driver is young. excited.',
                '"i was at a rallycross," he says.',
                '"hit a jump too hard."',
                '"now it makes a weird noise."',
                '"from the transmission."',
                'rally cars. always something.'
            ]
        },
        diagnostics: [
            {
                action: 'inspect under the car',
                cost: 0,
                time: 1,
                requiresUpgrade: null,
                reveals: [
                    'mud. so much mud.',
                    'you knock off the big chunks.',
                    'transmission looks intact.',
                    'but the skid plate is bent.',
                    'hitting things at speed.',
                    'what could go wrong.'
                ]
            },
            {
                action: 'check the transmission',
                cost: 0,
                time: 1,
                requiresUpgrade: null,
                reveals: [
                    'transmission fluid is leaking.',
                    'from the drain plug.',
                    'plug is bent.',
                    'probably hit a rock.',
                    'lucky it didn\'t crack the case.',
                    'needs new plug. new fluid.'
                ]
            },
            {
                action: 'test drive',
                cost: 0,
                time: 1,
                requiresUpgrade: null,
                reveals: [
                    'you drive it around.',
                    'transmission shifts fine.',
                    'the noise is the bent skid plate.',
                    'rubbing on the exhaust.',
                    'not as bad as it sounded.',
                    'rally drivers worry too much.'
                ]
            }
        ],
        solution: {
            correctRepairs: ['transmission_fluid', 'exhaust_hanger'],
            acceptableRepairs: ['transmission_fluid'],
            wrongRepairs: ['clutch_kit', 'transmission_mount', 'cv_axle']
        },
        outcomes: {
            correct: {
                payment: 180,
                reputationChange: 12,
                dialogue: [
                    'new transmission plug.',
                    'fresh fluid.',
                    'straightened the skid plate.',
                    'car is ready to rally.',
                    'marcus is grinning.',
                    '"you get it," he says.',
                    '"most shops just shake their heads."',
                    'you\'ve seen worse.',
                    'much worse.'
                ]
            },
            partial: {
                payment: 120,
                reputationChange: 6,
                dialogue: [
                    'fixed the leak.',
                    'skid plate still rubs a bit.',
                    'but it\'s safe.',
                    'marcus doesn\'t care.',
                    '"she\'s a rally car," he says.',
                    '"she\'s supposed to be beat up."',
                    'fair point.'
                ]
            },
            wrong: {
                payment: 0,
                reputationChange: -15,
                dialogue: [
                    'you tried to sell him a clutch.',
                    'the clutch is fine.',
                    'marcus knows his car.',
                    '"it\'s the transmission, not the clutch."',
                    'he\'s right.',
                    'embarrassing.'
                ]
            },
            timeout: {
                payment: 0,
                reputationChange: -6,
                dialogue: [
                    'marcus had a rally this weekend.',
                    'couldn\'t wait.',
                    'probably fixed it himself.',
                    'rally drivers are like that.'
                ]
            }
        }
    },

    // 69. The flooded car
    {
        id: 'civic_flood_01',
        minReputation: 25,
        maxReputation: 60,
        requiresUpgrade: null,
        car: {
            make: 'Honda',
            model: 'Civic',
            year: 2010,
            condition: 'rough'
        },
        customer: {
            name: 'Petra',
            personality: 'worried',
            budget: 'low',
            patience: 3,
            arrival: [
                'a civic is towed in.',
                'the driver looks like she cried.',
                '"i drove through a flood," she says.',
                '"the engine just died."',
                '"water came in everywhere."',
                '"is it totaled?"',
                'flood cars. bad news.'
            ]
        },
        diagnostics: [
            {
                action: 'check the air filter',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'you open the air box.',
                    'filter is soaked.',
                    'water in the intake.',
                    'this is bad.',
                    'water in the cylinders.',
                    'hydrolock.'
                ]
            },
            {
                action: 'try to turn the engine',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'you try to turn it by hand.',
                    'it won\'t move.',
                    'bent connecting rod.',
                    'engine is done.',
                    'this car needs a new engine.',
                    'or the scrap yard.'
                ]
            },
            {
                action: 'check the interior',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'mud line on the seats.',
                    'water came up to the dashboard.',
                    'ECU was underwater.',
                    'electrical is toast.',
                    'this car is a total loss.',
                    'you have to tell her.'
                ]
            }
        ],
        solution: {
            correctRepairs: [], // No repair - car is totaled
            acceptableRepairs: ['engine_4cyl_standard'],
            wrongRepairs: ['air_filter', 'spark_plugs', 'battery']
        },
        outcomes: {
            correct: {
                payment: 50,
                reputationChange: 8,
                dialogue: [
                    '"i\'m sorry," you say.',
                    '"the engine is gone."',
                    '"the electrical system is gone."',
                    '"it\'s not worth fixing."',
                    'she starts crying again.',
                    'you feel terrible.',
                    'but she needed to know.',
                    'you buy the car for parts.',
                    'fifty euros.',
                    'small comfort.'
                ]
            },
            partial: {
                payment: 0,
                reputationChange: 0,
                dialogue: [
                    'you could put in a new engine.',
                    'but it doesn\'t make sense.',
                    'you tell her honestly.',
                    'she appreciates that.',
                    'takes the insurance money.',
                    'moves on.'
                ]
            },
            wrong: {
                payment: 0,
                reputationChange: -20,
                dialogue: [
                    'you tried to fix it.',
                    'new air filter. new plugs.',
                    'it still doesn\'t run.',
                    'she paid for nothing.',
                    'you refund her.',
                    'feel like a fraud.',
                    'some cars can\'t be saved.'
                ]
            },
            timeout: {
                payment: 0,
                reputationChange: -3,
                dialogue: [
                    'insurance totaled it anyway.',
                    'she gets a payout.',
                    'moves on.',
                    'some endings are quick.'
                ]
            }
        }
    },

    // 70. The taxi driver
    {
        id: 'octavia_taxi_01',
        minReputation: 20,
        maxReputation: 55,
        requiresUpgrade: null,
        car: {
            make: 'Skoda',
            model: 'Octavia',
            year: 2016,
            condition: 'average'
        },
        customer: {
            name: 'Ibrahim',
            personality: 'practical',
            budget: 'medium',
            patience: 2,
            arrival: [
                'a skoda octavia taxi pulls in.',
                'the meter is still running.',
                '"quick question," the driver says.',
                '"the turbo is whistling."',
                '"i have 200,000 km on it."',
                '"how long do i have?"',
                'taxi drivers. miles matter.'
            ]
        },
        diagnostics: [
            {
                action: 'listen to the turbo',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'you listen.',
                    'high pitched whistle.',
                    'getting louder under load.',
                    'turbo is on its way out.',
                    'could last a week.',
                    'could go tomorrow.',
                    'gambling, really.'
                ]
            },
            {
                action: 'check for play in the turbine',
                cost: 0,
                time: 1,
                requiresUpgrade: null,
                reveals: [
                    'you pull the intake.',
                    'wiggle the compressor wheel.',
                    'play. not terrible.',
                    'but it\'s there.',
                    'bearing wear.',
                    'needs replacement soon.'
                ]
            },
            {
                action: 'check the oil',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'oil is black.',
                    'should have been changed 5000 km ago.',
                    'turbos need clean oil.',
                    'this one hasn\'t been getting it.',
                    'that\'s why it\'s dying.'
                ]
            }
        ],
        solution: {
            correctRepairs: ['turbocharger', 'engine_oil', 'oil_filter'],
            acceptableRepairs: ['turbocharger'],
            wrongRepairs: ['intercooler', 'blowoff_valve', 'wastegate']
        },
        outcomes: {
            correct: {
                payment: 650,
                reputationChange: 14,
                dialogue: [
                    'new turbo.',
                    'fresh oil.',
                    'ibrahim is back on the road.',
                    '"i can\'t afford downtime," he says.',
                    '"this is my livelihood."',
                    'you know.',
                    'you\'ve seen the taxi queue.',
                    'they wait for no one.'
                ]
            },
            partial: {
                payment: 500,
                reputationChange: 8,
                dialogue: [
                    'turbo replaced.',
                    'he\'ll change the oil himself.',
                    'ibrahim knows how.',
                    'taxi drivers learn.',
                    'or they go broke.'
                ]
            },
            wrong: {
                payment: 0,
                reputationChange: -10,
                dialogue: [
                    'you tried to sell him upgrades.',
                    'he doesn\'t want upgrades.',
                    'he needs his car to work.',
                    '"i\'m not a racer," he says.',
                    '"i\'m a taxi driver."',
                    'point taken.'
                ]
            },
            timeout: {
                payment: 0,
                reputationChange: -4,
                dialogue: [
                    'ibrahim went somewhere else.',
                    'time is money.',
                    'especially for taxi drivers.'
                ]
            }
        }
    },

    // 71. The family road trip
    {
        id: 'passat_roadtrip_01',
        minReputation: 15,
        maxReputation: 50,
        requiresUpgrade: null,
        car: {
            make: 'Volkswagen',
            model: 'Passat',
            year: 2014,
            condition: 'good'
        },
        customer: {
            name: 'Family Müller',
            personality: 'stressed',
            budget: 'medium',
            patience: 1,
            arrival: [
                'a passat wagon pulls in.',
                'two adults. three kids. luggage.',
                '"we\'re driving to italy tomorrow," the dad says.',
                '"the ac stopped working."',
                '"in july."',
                '"with three kids."',
                '"please help."',
                'the kids are already fighting.'
            ]
        },
        diagnostics: [
            {
                action: 'check the ac system',
                cost: 0,
                time: 0,
                requiresUpgrade: 'hasACMachine',
                reveals: [
                    'you hook up the gauges.',
                    'no pressure.',
                    'refrigerant leaked out.',
                    'need to find the leak.',
                    'and fix it.',
                    'today.'
                ]
            },
            {
                action: 'visual inspection',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'you look around.',
                    'ac condenser is oily.',
                    'front and center.',
                    'rock damage probably.',
                    'common failure point.',
                    'needs replacement.'
                ]
            },
            {
                action: 'check the compressor',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'compressor clutch engages.',
                    'compressor itself is fine.',
                    'just no refrigerant.',
                    'new condenser should fix it.',
                    'if you have one.'
                ]
            }
        ],
        solution: {
            correctRepairs: ['ac_condenser', 'ac_recharge'],
            acceptableRepairs: ['ac_recharge'],
            wrongRepairs: ['ac_compressor', 'blower_motor', 'heater_core']
        },
        outcomes: {
            correct: {
                payment: 380,
                reputationChange: 12,
                dialogue: [
                    'new condenser.',
                    'full recharge.',
                    'cold air.',
                    'the family cheers.',
                    'the kids stop fighting.',
                    'for now.',
                    'herr müller shakes your hand.',
                    '"you saved our vacation," he says.',
                    'you hope italy is worth it.',
                    'three kids in a car.',
                    'for eight hours.',
                    'god help them.'
                ]
            },
            partial: {
                payment: 80,
                reputationChange: 4,
                dialogue: [
                    'you recharge the system.',
                    'it\'s leaking slowly.',
                    'should last the trip.',
                    'probably.',
                    'herr müller is nervous.',
                    'but they leave.',
                    'fingers crossed.'
                ]
            },
            wrong: {
                payment: 0,
                reputationChange: -15,
                dialogue: [
                    'you replaced the compressor.',
                    'that wasn\'t the problem.',
                    'still no ac.',
                    'the kids are crying.',
                    'frau müller is angry.',
                    'herr müller is defeated.',
                    'you fix it properly.',
                    'no charge.',
                    'lesson learned.'
                ]
            },
            timeout: {
                payment: 0,
                reputationChange: -8,
                dialogue: [
                    'they went to a dealership.',
                    'paid double.',
                    'but made it to italy.',
                    'small victories.'
                ]
            }
        }
    },

    // 72. The learner driver
    {
        id: 'fiat_learner_01',
        minReputation: 5,
        maxReputation: 35,
        requiresUpgrade: null,
        car: {
            make: 'Fiat',
            model: '500',
            year: 2012,
            condition: 'average'
        },
        customer: {
            name: 'Lisa',
            personality: 'nervous',
            budget: 'low',
            patience: 3,
            arrival: [
                'a fiat 500 rolls in slowly.',
                'the driver is young. very young.',
                'learners permit on the dashboard.',
                '"i think i broke something," she says.',
                '"i was practicing parking."',
                '"and there was a noise."',
                'her dad is in the passenger seat.',
                'he looks exhausted.'
            ]
        },
        diagnostics: [
            {
                action: 'check for damage',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'you walk around the car.',
                    'rear bumper is scuffed.',
                    'but nothing major.',
                    'she hit a pole probably.',
                    'at 2 km/h.',
                    'learner drivers.'
                ]
            },
            {
                action: 'listen to the engine',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'you have her start it.',
                    'it runs fine.',
                    'no noise.',
                    'you rev it.',
                    'still nothing.',
                    'what noise?'
                ]
            },
            {
                action: 'ask about the noise',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    '"what did it sound like?"',
                    '"like... clunk?"',
                    'the dad sighs.',
                    '"she stalled it. that was the noise."',
                    'oh.',
                    'there\'s nothing wrong with the car.'
                ]
            }
        ],
        solution: {
            correctRepairs: [], // Nothing wrong
            acceptableRepairs: [],
            wrongRepairs: ['engine_oil', 'spark_plugs', 'battery']
        },
        outcomes: {
            correct: {
                payment: 20,
                reputationChange: 6,
                dialogue: [
                    '"the car is fine," you say.',
                    'lisa is relieved.',
                    'the dad is skeptical.',
                    '"are you sure?"',
                    '"the noise was the engine stalling."',
                    '"that\'s normal for a learner."',
                    'he laughs.',
                    'tired laugh.',
                    'you don\'t charge them.',
                    'they tip you anyway.',
                    'twenty euros.',
                    'for peace of mind.'
                ]
            },
            partial: {
                payment: 0,
                reputationChange: 3,
                dialogue: [
                    'you tell them it\'s fine.',
                    'they\'re not convinced.',
                    'but they leave.',
                    'the car is fine.',
                    'really.'
                ]
            },
            wrong: {
                payment: 0,
                reputationChange: -12,
                dialogue: [
                    'you sold them an oil change.',
                    'the car didn\'t need it.',
                    'there was nothing wrong.',
                    'they know.',
                    'they won\'t be back.',
                    'honesty matters.'
                ]
            },
            timeout: {
                payment: 0,
                reputationChange: 0,
                dialogue: [
                    'they didn\'t wait.',
                    'probably went home.',
                    'to practice parking.',
                    'some more.'
                ]
            }
        }
    },

    // 73. The mechanic's own car
    {
        id: 'mechanic_own_car_01',
        minReputation: 40,
        maxReputation: 100,
        requiresUpgrade: null,
        car: {
            make: 'BMW',
            model: 'E30',
            year: 1989,
            condition: 'good'
        },
        customer: {
            name: 'Yourself',
            personality: 'yourself',
            budget: 'yourself',
            patience: 10,
            arrival: [
                'it\'s your day off.',
                'your e30 is in the garage.',
                'it\'s been making a noise.',
                'you\'ve been ignoring it.',
                'but you can\'t anymore.',
                'time to fix your own car.',
                'for once.'
            ]
        },
        diagnostics: [
            {
                action: 'listen to the noise',
                cost: 0,
                time: 0,
                requiresUpgrade: null,
                reveals: [
                    'you start it up.',
                    'valve train noise.',
                    'ticking.',
                    'adjustment needed.',
                    'or something worse.',
                    'you\'ve been putting this off.'
                ]
            },
            {
                action: 'check the valves',
                cost: 0,
                time: 2,
                requiresUpgrade: null,
                reveals: [
                    'you pull the valve cover.',
                    'check the clearances.',
                    'two are out of spec.',
                    'not terrible.',
                    'adjustment should fix it.',
                    'if you have the shims.'
                ]
            },
            {
                action: 'inspect the timing belt',
                cost: 0,
                time: 1,
                requiresUpgrade: null,
                reveals: [
                    'while you\'re in there.',
                    'timing belt looks old.',
                    'probably should replace it.',
                    'it\'s been 40,000 km.',
                    'you know better.',
                    'preventive maintenance.'
                ]
            }
        ],
        solution: {
            correctRepairs: ['timing_belt_kit', 'valve_cover_gasket', 'engine_oil', 'oil_filter'],
            acceptableRepairs: ['timing_belt', 'valve_cover_gasket'],
            wrongRepairs: ['engine_v6', 'turbocharger', 'performance_exhaust']
        },
        outcomes: {
            correct: {
                payment: -150, // Cost of parts only
                reputationChange: 5,
                dialogue: [
                    'you fix your own car.',
                    'properly.',
                    'new timing belt.',
                    'valve adjustment.',
                    'fresh oil.',
                    'it runs beautifully.',
                    'you should do this more often.',
                    'but you never do.',
                    'the cobbler\'s children.',
                    'have no shoes.'
                ]
            },
            partial: {
                payment: -80,
                reputationChange: 2,
                dialogue: [
                    'you do the minimum.',
                    'car runs better.',
                    'not perfect.',
                    'but good enough.',
                    'for now.',
                    'there\'s always later.',
                    'there\'s never later.'
                ]
            },
            wrong: {
                payment: -200,
                reputationChange: -5,
                dialogue: [
                    'you bought parts you didn\'t need.',
                    'your car is still ticking.',
                    'you know better.',
                    'but you\'re tired.',
                    'even mechanics make mistakes.',
                    'on their own cars.'
                ]
            },
            timeout: {
                payment: 0,
                reputationChange: 0,
                dialogue: [
                    'you didn\'t fix it.',
                    'again.',
                    'the noise continues.',
                    'you turn up the radio.',
                    'that fixes it too.'
                ]
            }
        }
    }
];
