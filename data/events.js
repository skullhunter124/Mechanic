/* ═══════════════════════════════════════════
   MECHANIC - Random Events
   Events that fire between jobs
   ═══════════════════════════════════════════ */

const EVENTS = [
    // ═══════════════════════════════════════════
    // Narrative Events (no effect)
    // ═══════════════════════════════════════════

    {
        id: 'rival_garage',
        triggerAfterDay: 10,
        triggerReputation: 30,
        triggerOnce: true,
        text: [
            'someone mentions a new garage opened on the other side of town.',
            '"cheaper than you," they say.',
            'you nod.',
            'you\'ve heard that before.'
        ],
        choices: null
    },

    {
        id: 'old_customer_returns',
        triggerAfterDay: 15,
        triggerReputation: 25,
        triggerOnce: true,
        text: [
            'a car you fixed last month drives past.',
            'the driver waves.',
            'you don\'t remember their name.',
            'but you remember the car.',
            'that\'s enough.'
        ],
        choices: null
    },

    {
        id: 'weather_rain',
        triggerAfterDay: 1,
        triggerOnce: false,
        text: [
            'rain today.',
            'the roof leaks in the corner.',
            'you put a bucket under it.',
            'add it to the list.'
        ],
        choices: null
    },

    {
        id: 'weather_cold',
        triggerAfterDay: 20,
        triggerOnce: false,
        text: [
            'first frost of the year.',
            'batteries will be dying everywhere.',
            'you\'ll be busy tomorrow.'
        ],
        choices: null
    },

    {
        id: 'slow_day',
        triggerAfterDay: 5,
        triggerOnce: false,
        text: [
            'a slow day.',
            'you clean the tools.',
            'organize the shelves.',
            'wait for the phone to ring.'
        ],
        choices: null
    },

    {
        id: 'radio_song',
        triggerAfterDay: 1,
        triggerOnce: false,
        text: [
            'the radio plays a song you haven\'t heard in years.',
            'you stop working for a moment.',
            'listen.',
            'then it\'s over.',
            'back to work.'
        ],
        choices: null
    },

    {
        id: 'stray_cat',
        triggerAfterDay: 7,
        triggerOnce: true,
        text: [
            'a stray cat appears at the garage door.',
            'skinny. dirty.',
            'it watches you work for an hour.',
            'then leaves.',
            'you wonder where it goes.'
        ],
        choices: null
    },

    // ═══════════════════════════════════════════
    // Choice Events
    // ═══════════════════════════════════════════

    {
        id: 'toolbox_breaks',
        triggerAfterDay: 5,
        triggerOnce: true,
        text: [
            'your toolbox latch snaps.',
            'tools everywhere.',
            'nothing broken. this time.',
            'a new one costs €80.'
        ],
        choices: [
            {
                text: 'buy a new one (€80)',
                effect: { money: -80 },
                followup: [
                    'you order a new toolbox.',
                    'it arrives the next day.',
                    'better than the old one.',
                    'the tools deserve it.'
                ]
            },
            {
                text: 'tape it shut and carry on',
                effect: { reputationRisk: true },
                followup: [
                    'duct tape holds the universe together.',
                    'it\'ll hold this too.',
                    'for now.'
                ]
            }
        ]
    },

    {
        id: 'newspaper',
        triggerReputation: 60,
        triggerOnce: true,
        text: [
            'a woman from the local paper calls.',
            '"we\'re doing a piece on local businesses."',
            '"would you be up for a short interview?"'
        ],
        choices: [
            {
                text: 'agree',
                effect: { reputation: 10 },
                followup: [
                    'a small article runs on thursday.',
                    'the phone rings more than usual for a week.',
                    'they spelled your name right.',
                    'mostly.'
                ]
            },
            {
                text: 'decline',
                effect: null,
                followup: [
                    '"no problem," she says.',
                    'you go back to work.',
                    'the spotlight isn\'t for everyone.'
                ]
            }
        ]
    },

    {
        id: 'competitor_closes',
        triggerAfterDay: 30,
        triggerReputation: 40,
        triggerOnce: true,
        text: [
            'word spreads: the garage across town is closing.',
            'the owner is retiring.',
            'moving to spain.',
            'you\'ll miss the competition.',
            'a little.'
        ],
        choices: [
            {
                text: 'buy his old tools (€200)',
                effect: { money: -200 },
                followup: [
                    'you buy his toolbox.',
                    'some good pieces in there.',
                    'a few you\'ve wanted for years.',
                    'he shakes your hand.',
                    '"take care of them."'
                ]
            },
            {
                text: 'just watch him leave',
                effect: { reputation: 5 },
                followup: [
                    'you watch him pack up.',
                    'wave as he drives away.',
                    'his customers will find you.',
                    'they always do.'
                ]
            }
        ]
    },

    {
        id: 'apprentice_offer',
        triggerReputation: 50,
        triggerOnce: true,
        text: [
            'a kid shows up.',
            'eighteen. grease under his fingernails already.',
            '"my uncle says you\'re good."',
            '"can i watch? maybe learn something?"'
        ],
        choices: [
            {
                text: 'let him watch (€0)',
                effect: { reputation: 5 },
                followup: [
                    'he watches for a week.',
                    'asks good questions.',
                    'his hands are steady.',
                    'he\'ll be back.',
                    'they always are.'
                ]
            },
            {
                text: 'send him away',
                effect: null,
                followup: [
                    '"i work alone."',
                    'he nods.',
                    'leaves.',
                    'you wonder if that was a mistake.'
                ]
            }
        ]
    },

    {
        id: 'parts_supplier',
        triggerAfterDay: 20,
        triggerOnce: true,
        text: [
            'your parts supplier calls.',
            '"we\'re raising prices next month."',
            '"but if you sign a year contract, we lock in current rates."',
            'it\'s €150 upfront.'
        ],
        choices: [
            {
                text: 'sign the contract (€150)',
                effect: { money: -150 },
                followup: [
                    'you sign.',
                    'prices go up for everyone else.',
                    'you\'re locked in.',
                    'smart. probably.'
                ]
            },
            {
                text: 'take your chances',
                effect: null,
                followup: [
                    'you pass.',
                    'prices go up next month.',
                    'you\'ll adjust.',
                    'you always do.'
                ]
            }
        ]
    },

    {
        id: 'tow_truck_driver',
        triggerReputation: 35,
        triggerOnce: true,
        text: [
            'a tow truck driver stops by.',
            '"i bring cars to garages all over town."',
            '"fifty euros a month, i send them to you first."'
        ],
        choices: [
            {
                text: 'pay for referrals (€50)',
                effect: { money: -50 },
                followup: [
                    'you shake on it.',
                    'three cars show up that week.',
                    'broken down on the highway.',
                    'good business.'
                ]
            },
            {
                text: 'no thanks',
                effect: null,
                followup: [
                    '"i\'ll find my own customers."',
                    'he shrugs.',
                    'drives off.',
                    'someone else is getting those cars.'
                ]
            }
        ]
    },

    {
        id: 'rent_increase',
        triggerAfterDay: 45,
        triggerOnce: true,
        text: [
            'the landlord stops by.',
            '"rent\'s going up."',
            '"fifty more a week."',
            '"take it or leave it."'
        ],
        choices: [
            {
                text: 'accept the increase',
                effect: { rentIncrease: true },
                followup: [
                    'you nod.',
                    'what else can you do?',
                    '€250 a week now.',
                    'you\'ll have to work harder.'
                ]
            },
            {
                text: 'negotiate',
                effect: null,
                followup: [
                    '"how about twenty-five?"',
                    'he thinks.',
                    '"thirty."',
                    'you shake hands.',
                    '€230 a week.',
                    'something.'
                ]
            }
        ]
    },

    {
        id: 'customer_gift',
        triggerReputation: 40,
        triggerOnce: true,
        text: [
            'a customer you helped last month shows up.',
            'not with a car.',
            'with a bottle of whiskey.',
            '"for fixing my wife\'s car."',
            '"she made me drive it for a week before i believed it was fixed."'
        ],
        choices: [
            {
                text: 'accept the gift',
                effect: { reputation: 3 },
                followup: [
                    'you take the bottle.',
                    'put it on the shelf.',
                    'for special occasions.',
                    'or bad days.',
                    'probably bad days.'
                ]
            },
            {
                text: 'politely decline',
                effect: { reputation: 2 },
                followup: [
                    '"i can\'t accept this."',
                    '"you already paid me."',
                    'he insists.',
                    'you insist more.',
                    'he leaves with the whiskey.',
                    'but he\'ll remember.'
                ]
            }
        ]
    },

    {
        id: 'scrap_metal',
        triggerAfterDay: 10,
        triggerOnce: false,
        text: [
            'you\'ve accumulated scrap metal.',
            'old rotors. broken parts.',
            'the scrap yard will take it.',
            '€30 for the lot.'
        ],
        choices: [
            {
                text: 'sell the scrap (€30)',
                effect: { money: 30 },
                followup: [
                    'you load it up.',
                    'drive to the yard.',
                    'thirty euros heavier.',
                    'the bay is cleaner.'
                ]
            },
            {
                text: 'keep it for now',
                effect: null,
                followup: [
                    'you never know.',
                    'might need something.',
                    'probably not.',
                    'but maybe.'
                ]
            }
        ]
    },

    {
        id: 'late_night_call',
        triggerReputation: 30,
        triggerOnce: true,
        text: [
            'your phone rings at 10pm.',
            'a voice on the other end.',
            '"my car broke down on the highway."',
            '"i know you\'re closed but..."',
            '"they said you\'re the best."'
        ],
        choices: [
            {
                text: 'go help (€0, late night)',
                effect: { reputation: 8, money: 50 },
                followup: [
                    'you drive out there.',
                    'alternator belt snapped.',
                    'you have one in the trunk.',
                    'thirty minutes later she\'s running.',
                    'the woman presses money into your hand.',
                    '"you saved me."',
                    'you go home tired.',
                    'but it feels good.'
                ]
            },
            {
                text: 'tell them to call a tow truck',
                effect: null,
                followup: [
                    '"i\'m closed."',
                    'silence.',
                    '"yeah. okay. thanks."',
                    'you hang up.',
                    'go back to sleep.',
                    'it takes a while.'
                ]
            }
        ]
    },

    // ═══════════════════════════════════════════
    // Special Events
    // ═══════════════════════════════════════════

    {
        id: 'classic_car',
        triggerReputation: 70,
        triggerOnce: true,
        text: [
            'a flatbed truck pulls up.',
            'on it: a 1967 porsche 911.',
            'in pieces.',
            'the owner is a collector.',
            '"i want it restored. properly."',
            '"no rush. no budget limit."',
            '"just do it right."'
        ],
        choices: [
            {
                text: 'take the job',
                effect: { reputation: 5, specialJob: 'porsche_restoration' },
                followup: [
                    'you agree.',
                    'this is the kind of job you dreamed about.',
                    'it will take months.',
                    'but when it\'s done...',
                    'when it\'s done, everyone will know.'
                ]
            },
            {
                text: 'it\'s too much responsibility',
                effect: null,
                followup: [
                    'you look at the parts.',
                    'look at your garage.',
                    '"i can\'t. not yet."',
                    'he understands.',
                    'takes the porsche somewhere else.',
                    'you wonder if you made a mistake.'
                ]
            }
        ]
    },

    {
        id: 'illegal_request',
        triggerReputation: 25,
        triggerOnce: true,
        text: [
            'a man in a nice suit shows up.',
            'nice car too. audi a6.',
            '"i need a favor," he says quietly.',
            '"the odometer. can you roll it back?"',
            '"i\'ll make it worth your while."',
            'he shows you the money.'
        ],
        choices: [
            {
                text: 'refuse',
                effect: { reputation: 5 },
                followup: [
                    '"no."',
                    '"that\'s illegal."',
                    'he stares at you.',
                    'then nods.',
                    '"fair enough."',
                    'he leaves.',
                    'you breathe again.'
                ]
            },
            {
                text: 'do it for the money (€300)',
                effect: { money: 300, reputation: -20 },
                followup: [
                    'you do it.',
                    'takes twenty minutes.',
                    'he pays cash.',
                    'you feel dirty.',
                    'word gets around.',
                    'not the good kind of word.'
                ]
            }
        ]
    },

    {
        id: 'can\'t_pay_customer',
        triggerReputation: 35,
        triggerOnce: true,
        text: [
            'you finish the job.',
            'the customer looks at the bill.',
            'long silence.',
            '"i can\'t pay for this."',
            '"not all of it."',
            '"not right now."'
        ],
        choices: [
            {
                text: 'work out a payment plan',
                effect: { reputation: 8 },
                followup: [
                    '"pay me when you can."',
                    '"in installments. whatever works."',
                    'she looks like she might cry.',
                    '"thank you. i\'ll remember this."',
                    'she does pay.',
                    'eventually.',
                    'and she sends her friends.'
                ]
            },
            {
                text: 'keep the car until paid',
                effect: { reputation: -5 },
                followup: [
                    '"the car stays."',
                    '"until you can pay."',
                    'she nods.',
                    'takes the bus home.',
                    'it\'s fair.',
                    'but it doesn\'t feel good.'
                ]
            },
            {
                text: 'let it go this time',
                effect: { money: -50, reputation: 3 },
                followup: [
                    '"forget it."',
                    '"just... be more careful next time."',
                    'she stares.',
                    '"are you sure?"',
                    '"go."',
                    'she goes.',
                    'you\'re out fifty euros.',
                    'but you sleep okay.'
                ]
            }
        ]
    }
];
