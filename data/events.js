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
    },

    // ═══════════════════════════════════════════
    // Funny/Quirky Events
    // ═══════════════════════════════════════════

    {
        id: 'pigeon_nest',
        triggerAfterDay: 8,
        triggerOnce: true,
        text: [
            'you hear chirping from the rafters.',
            'a pigeon has built a nest on top of your parts shelf.',
            'right above the brake pads.',
            'the pigeon stares at you.',
            'you stare back.',
            'neither of you blinks.'
        ],
        choices: [
            {
                text: 'declare war on the pigeon',
                effect: { reputation: 1 },
                followup: [
                    'you spend an hour chasing it with a broom.',
                    'it leaves.',
                    'it comes back.',
                    'you name it gerald.',
                    'gerald is now your problem.'
                ]
            },
            {
                text: 'let it stay',
                effect: null,
                followup: [
                    'you leave some bread crumbs.',
                    'the pigeon seems grateful.',
                    'customers ask about "your pet."',
                    'you correct them.',
                    'they don\'t believe you.'
                ]
            }
        ]
    },

    {
        id: 'coffee_machine',
        triggerAfterDay: 3,
        triggerOnce: true,
        text: [
            'the coffee machine in the corner makes a sound.',
            'a bad sound.',
            'then a worse smell.',
            'it\'s been making "coffee" for twenty years.',
            'you think it\'s finally died.'
        ],
        choices: [
            {
                text: 'try to fix it yourself',
                effect: null,
                followup: [
                    'you take it apart.',
                    'you put it back together.',
                    'there are three screws left over.',
                    'it works.',
                    'the coffee tastes like metal.',
                    'you drink it anyway.'
                ]
            },
            {
                text: 'give it a proper burial',
                effect: { money: -40 },
                followup: [
                    'you buy a new one.',
                    'the coffee is better.',
                    'but something is missing.',
                    'the character.',
                    'the danger.'
                ]
            },
            {
                text: 'just drink instant coffee now',
                effect: null,
                followup: [
                    'you buy instant coffee.',
                    'it\'s fine.',
                    'it\'s not fine.',
                    'but it\'s caffeine.',
                    'that\'s enough.'
                ]
            }
        ]
    },

    {
        id: 'mysterious_noise',
        triggerAfterDay: 12,
        triggerOnce: false,
        text: [
            'a rhythmic clicking from somewhere in the garage.',
            'you can\'t find it.',
            'it stops when you get close.',
            'starts again when you walk away.',
            'the garage is haunted.',
            'probably.'
        ],
        choices: [
            {
                text: 'investigate thoroughly',
                effect: null,
                followup: [
                    'you spend an hour searching.',
                    'behind shelves. under the lift.',
                    'nothing.',
                    'the clicking stops.',
                    'you\'ll never know.',
                    'that\'s worse.'
                ]
            },
            {
                text: 'ignore it',
                effect: null,
                followup: [
                    'you ignore it.',
                    'it ignores you.',
                    'an understanding is reached.',
                    'the garage makes sounds.',
                    'garages do that.'
                ]
            },
            {
                text: 'blame the previous owner',
                effect: { reputation: 1 },
                followup: [
                    '"probably something the last guy left."',
                    'you tell yourself this.',
                    'it helps.',
                    'a little.'
                ]
            }
        ]
    },

    {
        id: 'customer_advice',
        triggerReputation: 20,
        triggerOnce: true,
        text: [
            'a customer watches you work.',
            '"my cousin says you should check the flibber-gibbet."',
            '"the what?"',
            '"the flibber-gibbet. it\'s connected to the thingamajig."',
            'you stare at them.',
            'they stare back.',
            '"i\'ll look into it."'
        ],
        choices: [
            {
                text: 'take notes on their advice',
                effect: { reputation: 2 },
                followup: [
                    'you write "flibber-gibbet" in your notebook.',
                    'you underline it.',
                    'the customer is satisfied.',
                    'you have no idea what just happened.'
                ]
            },
            {
                text: 'explain you\'re the professional',
                effect: { reputation: -2 },
                followup: [
                    '"i\'ve been doing this for years."',
                    '"i know what i\'m doing."',
                    'they look unconvinced.',
                    'their cousin probably has a youtube channel.',
                    'you hate that cousin.'
                ]
            }
        ]
    },

    {
        id: 'radio_contest',
        triggerAfterDay: 15,
        triggerOnce: true,
        text: [
            'the radio announces a contest.',
            '"caller ten wins tickets to the monster truck rally!"',
            'you look at your phone.',
            'you look at the car on the lift.',
            'you look at your phone again.'
        ],
        choices: [
            {
                text: 'call in',
                effect: null,
                followup: [
                    'you dial.',
                    'busy.',
                    'you dial again.',
                    'busy.',
                    'caller eleven wins.',
                    'you go back to work.',
                    'the car still needs fixing.'
                ]
            },
            {
                text: 'ignore it',
                effect: null,
                followup: [
                    'you keep working.',
                    'someone else wins.',
                    'they sound happy.',
                    'you hear tires screeching on the radio.',
                    'that\'s entertainment.',
                    'this is work.'
                ]
            }
        ]
    },

    {
        id: 'lunch_thief',
        triggerAfterDay: 20,
        triggerOnce: true,
        text: [
            'you go to get your lunch from the mini-fridge.',
            'it\'s gone.',
            'someone ate your sandwich.',
            'your name was on it.',
            'in permanent marker.',
            'there are no other employees.'
        ],
        choices: [
            {
                text: 'set a trap',
                effect: null,
                followup: [
                    'you make another sandwich.',
                    'you put a note on it.',
                    '"this one is poisoned."',
                    'it disappears too.',
                    'you respect the commitment.'
                ]
            },
            {
                text: 'accept your fate',
                effect: null,
                followup: [
                    'you buy lunch.',
                    'it\'s expensive.',
                    'you eat it slowly.',
                    'savoring every bite.',
                    'the sandwich thief is out there.',
                    'waiting.'
                ]
            }
        ]
    },

    {
        id: 'customer_smalltalk',
        triggerAfterDay: 5,
        triggerOnce: false,
        text: [
            'a customer waits while you work.',
            '"nice weather we\'re having."',
            'it\'s raining.',
            '"got any vacation plans?"',
            'you can\'t afford a vacation.',
            '"how about those sports?"',
            'you don\'t watch sports.',
            'this is going to be a long repair.'
        ],
        choices: [
            {
                text: 'make small talk back',
                effect: { reputation: 1 },
                followup: [
                    '"yes. weather. sports."',
                    'they seem satisfied.',
                    'you die a little inside.',
                    'but customer service is customer service.'
                ]
            },
            {
                text: 'focus on the work',
                effect: null,
                followup: [
                    'you ignore them.',
                    'politely.',
                    'the wrench doesn\'t judge.',
                    'the wrench doesn\'t ask about sports.',
                    'you like the wrench.'
                ]
            }
        ]
    },

    {
        id: 'found_money',
        triggerAfterDay: 7,
        triggerOnce: false,
        text: [
            'you find €20 under the lift.',
            'crumpled. dirty.',
            'probably been there for years.',
            'finders keepers.',
            'that\'s the law.',
            'probably.'
        ],
        choices: [
            {
                text: 'keep it',
                effect: { money: 20 },
                followup: [
                    'you pocket the money.',
                    'it\'s not stealing.',
                    'it\'s archaeology.',
                    'profitable archaeology.'
                ]
            },
            {
                text: 'ask around',
                effect: { reputation: 2 },
                followup: [
                    'you ask your customers.',
                    'nobody claims it.',
                    'you keep it.',
                    'but at least you asked.',
                    'that counts for something.'
                ]
            }
        ]
    },

    {
        id: 'power_outage',
        triggerAfterDay: 25,
        triggerOnce: true,
        text: [
            'the power goes out.',
            'everything stops.',
            'the lift is stuck.',
            'there\'s a car on the lift.',
            'the customer is still in the waiting room.',
            '"this is normal," you say.',
            'it is not normal.'
        ],
        choices: [
            {
                text: 'wait it out',
                effect: null,
                followup: [
                    'you wait.',
                    'an hour.',
                    'two hours.',
                    'the power comes back.',
                    'the customer is asleep.',
                    'you finish the job in silence.'
                ]
            },
            {
                text: 'work by flashlight',
                effect: { reputation: 3 },
                followup: [
                    'you find a flashlight.',
                    'you keep working.',
                    'the customer watches.',
                    '"this is the most interesting thing that\'s happened all week."',
                    'you\'re not sure if that\'s a compliment.'
                ]
            }
        ]
    },

    {
        id: 'review',
        triggerReputation: 35,
        triggerOnce: true,
        text: [
            'a customer shows you their phone.',
            '"i left you a review."',
            'you look.',
            'four stars.',
            '"great work. terrible coffee."',
            'you don\'t even serve coffee.'
        ],
        choices: [
            {
                text: 'start serving coffee',
                effect: { money: -30 },
                followup: [
                    'you buy a coffee machine.',
                    'you serve coffee.',
                    'it\'s terrible.',
                    'the reviews improve.',
                    'the coffee does not.'
                ]
            },
            {
                text: 'ignore the review',
                effect: null,
                followup: [
                    'you can\'t please everyone.',
                    'especially with coffee you don\'t serve.',
                    'you move on.',
                    'four stars is still good.',
                    'probably.'
                ]
            }
        ]
    },

    {
        id: 'old_photos',
        triggerAfterDay: 40,
        triggerOnce: true,
        text: [
            'you find old photos behind a shelf.',
            'this garage in the 1980s.',
            'the previous owner.',
            'younger. smiling. holding a wrench.',
            'same lift.',
            'same oil stains.',
            'some things don\'t change.'
        ],
        choices: [
            {
                text: 'put them on the wall',
                effect: { reputation: 2 },
                followup: [
                    'you frame the photos.',
                    'hang them by the door.',
                    'customers ask about them.',
                    'you tell stories.',
                    'some of them are even true.'
                ]
            },
            {
                text: 'keep them in a drawer',
                effect: null,
                followup: [
                    'you put them away.',
                    'some memories are private.',
                    'the garage has secrets.',
                    'you\'re one of them now.'
                ]
            }
        ]
    },

    {
        id: 'customer_compliment',
        triggerReputation: 45,
        triggerOnce: true,
        text: [
            'a customer finishes paying.',
            'they pause at the door.',
            '"you know what? you\'re a good mechanic."',
            '"and i\'ve met a lot of bad ones."',
            'they leave.',
            'you stand there for a moment.',
            'that was nice.'
        ],
        choices: [
            {
                text: 'say thank you',
                effect: { reputation: 3 },
                followup: [
                    '"thanks."',
                    'they\'re already gone.',
                    'but you said it.',
                    'that matters.',
                    'to you, anyway.'
                ]
            },
            {
                text: 'play it cool',
                effect: null,
                followup: [
                    'you nod.',
                    'like you hear that all the time.',
                    'you don\'t.',
                    'but they don\'t need to know that.'
                ]
            }
        ]
    },

    {
        id: 'wrong_garage',
        triggerAfterDay: 6,
        triggerOnce: false,
        text: [
            'a car pulls in.',
            'the driver gets out.',
            'looks around.',
            'looks at their phone.',
            'looks at you.',
            '"this isn\'t the dealership."',
            'no. it isn\'t.'
        ],
        choices: [
            {
                text: 'offer to help anyway',
                effect: { reputation: 2, money: 40 },
                followup: [
                    '"i can still take a look."',
                    'they hesitate.',
                    'then agree.',
                    'you fix their problem.',
                    'they leave a review.',
                    'the dealership loses a customer.',
                    'you feel a little powerful.'
                ]
            },
            {
                text: 'give them directions',
                effect: null,
                followup: [
                    'you point down the road.',
                    '"three blocks. big sign."',
                    'they thank you.',
                    'drive away.',
                    'you hope the dealership charges double.'
                ]
            }
        ]
    },

    // ═══════════════════════════════════════════
    // EXPANDED EVENTS - More things that can go wrong
    // ═══════════════════════════════════════════

    {
        id: 'power_outage',
        triggerAfterDay: 15,
        triggerOnce: false,
        text: [
            'the power goes out.',
            'mid-job.',
            'you\'re under a car.',
            'the lift stops halfway.',
            'you have to pump it down manually.',
            'this is going to slow things down.'
        ],
        choices: [
            {
                text: 'wait it out',
                effect: { timeLoss: true },
                followup: [
                    'you sit in the dark.',
                    'two hours.',
                    'the lights flicker back on.',
                    'behind schedule.',
                    'but at least you can see.'
                ]
            },
            {
                text: 'work by flashlight',
                effect: { reputationRisk: true },
                followup: [
                    'you keep working.',
                    'flashlight in your teeth.',
                    'not ideal.',
                    'but you get it done.',
                    'mostly.'
                ]
            }
        ]
    },

    {
        id: 'tool_breaks_critical',
        triggerAfterDay: 25,
        triggerOnce: false,
        text: [
            'your torque wrench snaps.',
            'mid-tightening.',
            'on a customer\'s cylinder head.',
            'you don\'t know if it\'s at spec.',
            'this is bad.'
        ],
        choices: [
            {
                text: 'buy a new one and redo the job (€120)',
                effect: { money: -120 },
                followup: [
                    'you order a new torque wrench.',
                    'undo the bolts.',
                    'start over.',
                    'expensive mistake.',
                    'but the right thing to do.'
                ]
            },
            {
                text: 'hope it was close enough',
                effect: { reputationRisk: true },
                followup: [
                    'you leave it.',
                    'it was probably fine.',
                    'probably.',
                    'you\'ll find out.',
                    'eventually.'
                ]
            }
        ]
    },

    {
        id: 'customer_car_damaged',
        triggerAfterDay: 35,
        triggerReputation: 40,
        triggerOnce: true,
        text: [
            'you\'re backing a customer\'s car out.',
            'a tool cart rolls into the door.',
            'a dent. a scratch.',
            'they\'re going to notice.'
        ],
        choices: [
            {
                text: 'fix it yourself (€150)',
                effect: { money: -150 },
                followup: [
                    'you call your paint guy.',
                    'he fixes it same day.',
                    'customer never knows.',
                    'expensive lesson.',
                    'watch where you put things.'
                ]
            },
            {
                text: 'tell the customer',
                effect: { reputation: -8 },
                followup: [
                    'you call them.',
                    '"i have to tell you something."',
                    'they\'re upset.',
                    'but they appreciate the honesty.',
                    'you fix it at cost.',
                    'your reputation takes a hit.',
                    'your conscience is clear.'
                ]
            }
        ]
    },

    {
        id: 'parts_delivery_wrong',
        triggerAfterDay: 10,
        triggerOnce: false,
        text: [
            'the parts delivery arrives.',
            'you ordered brake pads.',
            'they sent a water pump.',
            'completely wrong.',
            'the customer is waiting.'
        ],
        choices: [
            {
                text: 'rush order correct parts (€40 extra)',
                effect: { money: -40 },
                followup: [
                    'you call the supplier.',
                    'they mess up.',
                    'you pay for rush shipping.',
                    'customer waits another day.',
                    'the supplier hears about this.'
                ]
            },
            {
                text: 'send customer to another shop',
                effect: { reputation: -5 },
                followup: [
                    '"i can\'t help you today."',
                    'they\'re not happy.',
                    'but you can\'t fix it without parts.',
                    'sometimes you lose.',
                    'through no fault of your own.'
                ]
            }
        ]
    },

    {
        id: 'lift_failure',
        triggerAfterDay: 50,
        triggerOnce: true,
        text: [
            'the lift makes a horrible noise.',
            'then stops.',
            'a car is stuck fifteen feet in the air.',
            'hydraulic line burst.',
            'this is going to be expensive.'
        ],
        choices: [
            {
                text: 'repair the lift (€400)',
                effect: { money: -400 },
                followup: [
                    'you get the car down safely.',
                    'call the lift technician.',
                    'new hydraulic line.',
                    'new seals.',
                    'the lift works better than ever.',
                    'small mercies.'
                ]
            },
            {
                text: 'jury-rig a fix',
                effect: { reputationRisk: true },
                followup: [
                    'you patch the line.',
                    'it holds.',
                    'for now.',
                    'you add "new lift" to the list.',
                    'the list is getting long.'
                ]
            }
        ]
    },

    {
        id: 'employee_mistake',
        triggerReputation: 55,
        triggerOnce: true,
        text: [
            'the kid you hired made a mistake.',
            'wrong oil in a customer\'s car.',
            'synthetic instead of conventional.',
            'the customer is complaining.',
            'it\'s not actually harmful.',
            'but they\'re upset.'
        ],
        choices: [
            {
                text: 'refund and apologize (€80)',
                effect: { money: -80 },
                followup: [
                    'you refund the service.',
                    'change the oil again.',
                    'the customer is satisfied.',
                    'you have a talk with the kid.',
                    'he\'s learning.',
                    'mistakes cost money.'
                ]
            },
            {
                text: 'explain it\'s actually better oil',
                effect: { reputation: -3 },
                followup: [
                    '"synthetic is better."',
                    'they don\'t care.',
                    'they wanted what they paid for.',
                    'you\'re technically right.',
                    'but the customer is always right.',
                    'even when they\'re wrong.'
                ]
            }
        ]
    },

    {
        id: 'insurance_audit',
        triggerAfterDay: 60,
        triggerOnce: true,
        text: [
            'an insurance adjuster shows up.',
            '"we\'re auditing your claims."',
            '"need to see your records."',
            'you have records.',
            'somewhere.'
        ],
        choices: [
            {
                text: 'hire an accountant (€200)',
                effect: { money: -200 },
                followup: [
                    'you get your books in order.',
                    'everything checks out.',
                    'the adjuster leaves satisfied.',
                    'you start keeping better records.',
                    'lesson learned.'
                ]
            },
            {
                text: 'handle it yourself',
                effect: null,
                followup: [
                    'you dig through receipts.',
                    'find most of them.',
                    'the adjuster is patient.',
                    'you pass.',
                    'barely.',
                    'you start keeping better records.'
                ]
            }
        ]
    },

    {
        id: 'competitor_sabotage',
        triggerReputation: 50,
        triggerOnce: true,
        text: [
            'you find nails behind your garage.',
            'dozens of them.',
            'scattered where customers drive.',
            'this wasn\'t accidental.',
            'someone is trying to hurt you.'
        ],
        choices: [
            {
                text: 'install security cameras (€250)',
                effect: { money: -250 },
                followup: [
                    'you clean up the nails.',
                    'install cameras.',
                    'you catch someone on tape.',
                    'the rival garage\'s nephew.',
                    'the police handle it.',
                    'the rivalry escalates.'
                ]
            },
            {
                text: 'keep a lookout yourself',
                effect: null,
                followup: [
                    'you clean up.',
                    'watch the lot.',
                    'nothing happens.',
                    'for weeks.',
                    'then you find more nails.',
                    'this isn\'t over.'
                ]
            }
        ]
    },

    {
        id: 'customer_allergy',
        triggerAfterDay: 20,
        triggerOnce: false,
        text: [
            'a customer drops off their car.',
            'they mention they\'re allergic to dogs.',
            'you have a shop dog.',
            'a golden retriever. sheds everywhere.',
            'this could be a problem.'
        ],
        choices: [
            {
                text: 'deep clean the interior (€30)',
                effect: { money: -30 },
                followup: [
                    'you vacuum everything.',
                    'use allergen spray.',
                    'the customer is impressed.',
                    '"you really thought of everything."',
                    'the dog looks hurt.',
                    'you give him extra treats.'
                ]
            },
            {
                text: 'keep the dog outside that day',
                effect: null,
                followup: [
                    'the dog mopes.',
                    'you vacuum quickly.',
                    'probably fine.',
                    'the customer doesn\'t mention it.',
                    'probably fine.'
                ]
            }
        ]
    },

    {
        id: 'viral_video',
        triggerReputation: 65,
        triggerOnce: true,
        text: [
            'a customer films you working.',
            'they post it online.',
            'it\'s getting views.',
            '"satisfying engine repair" or something.',
            'suddenly, people recognize you.'
        ],
        choices: [
            {
                text: 'embrace the attention',
                effect: { reputation: 15 },
                followup: [
                    'you start posting more.',
                    'people love it.',
                    'business picks up.',
                    'young people come in.',
                    '"i saw you on the internet."',
                    'you\'re a small celebrity.',
                    'in a very small pond.'
                ]
            },
            {
                text: 'ask them to take it down',
                effect: null,
                followup: [
                    'you prefer privacy.',
                    'they understand.',
                    'the video stays up.',
                    'but you don\'t encourage more.',
                    'fifteen minutes of fame.',
                    'you\'ll take five.'
                ]
            }
        ]
    },

    {
        id: 'recall_notice',
        triggerAfterDay: 30,
        triggerOnce: false,
        text: [
            'a manufacturer issues a recall.',
            'for a part you replaced last week.',
            'the customer calls, panicked.',
            '"you put a defective part in my car!"',
            'technically true.',
            'but you didn\'t know.'
        ],
        choices: [
            {
                text: 'fix it for free (€0, goodwill)',
                effect: { reputation: 10 },
                followup: [
                    'you replace the part.',
                    'at your cost.',
                    'the manufacturer reimburses you.',
                    'eventually.',
                    'the customer tells everyone.',
                    '"he stands behind his work."',
                    'even when it wasn\'t your fault.'
                ]
            },
            {
                text: 'explain it\'s a manufacturer issue',
                effect: { reputation: -2 },
                followup: [
                    '"take it to the dealership."',
                    '"they\'ll fix it for free."',
                    'they\'re not happy.',
                    'but you\'re right.',
                    'being right isn\'t always enough.'
                ]
            }
        ]
    },

    {
        id: 'parts_counterfeit',
        triggerAfterDay: 45,
        triggerOnce: true,
        text: [
            'you notice something off.',
            'the parts you received.',
            'the packaging looks wrong.',
            'the logo is slightly different.',
            'these are counterfeit.'
        ],
        choices: [
            {
                text: 'report and return (€0)',
                effect: { reputation: 5 },
                followup: [
                    'you call the supplier.',
                    'they\'re shocked.',
                    'or acting shocked.',
                    'you find a new supplier.',
                    'better to be safe.',
                    'counterfeit parts kill engines.',
                    'and reputations.'
                ]
            },
            {
                text: 'use them anyway',
                effect: { reputationRisk: true },
                followup: [
                    'they\'re probably fine.',
                    'probably.',
                    'you install them.',
                    'they work.',
                    'for now.',
                    'you make a note.',
                    'watch those cars.'
                ]
            }
        ]
    },

    {
        id: 'customer_faints',
        triggerAfterDay: 25,
        triggerOnce: false,
        text: [
            'a customer is looking at their bill.',
            'they go pale.',
            'they sway.',
            'they collapse.',
            'right in your office.'
        ],
        choices: [
            {
                text: 'call an ambulance',
                effect: { money: -50 },
                followup: [
                    'the paramedics come.',
                    'it was low blood sugar.',
                    'they\'re fine.',
                    'you give them juice.',
                    'they\'re embarrassed.',
                    'you\'re relieved.',
                    'first aid training was worth it.'
                ]
            },
            {
                text: 'help them yourself',
                effect: null,
                followup: [
                    'you recognize the signs.',
                    'sugar. now.',
                    'they come around.',
                    '"diabetic," they say.',
                    '"forgot to eat."',
                    'you keep juice in the office now.',
                    'just in case.'
                ]
            }
        ]
    },

    {
        id: 'fire_drill',
        triggerAfterDay: 40,
        triggerOnce: true,
        text: [
            'you smell smoke.',
            'the welder was left on.',
            'a rag caught fire.',
            'small flame.',
            'getting bigger.'
        ],
        choices: [
            {
                text: 'use the fire extinguisher',
                effect: { money: -30 },
                followup: [
                    'you grab the extinguisher.',
                    'pull the pin.',
                    'spray.',
                    'the fire dies.',
                    'powder everywhere.',
                    'you replace the extinguisher.',
                    'and the rags.',
                    'and your composure.'
                ]
            },
            {
                text: 'throw it outside',
                effect: { reputationRisk: true },
                followup: [
                    'you grab the burning rag.',
                    'throw it out the door.',
                    'it burns on the concrete.',
                    'no damage.',
                    'lucky.',
                    'you buy more extinguishers.',
                    'several.'
                ]
            }
        ]
    },

    {
        id: 'inheritance_offer',
        triggerAfterDay: 100,
        triggerReputation: 70,
        triggerOnce: true,
        text: [
            'a lawyer calls.',
            'a distant relative passed away.',
            'they left you something.',
            'a collection of vintage tools.',
            'and €2000.',
            'you didn\'t know they existed.'
        ],
        choices: [
            {
                text: 'accept the inheritance',
                effect: { money: 2000 },
                followup: [
                    'the tools are beautiful.',
                    '1950s snap-on.',
                    'chrome. perfect condition.',
                    'you use them every day.',
                    'and think about family.',
                    'the ones you know.',
                    'and the ones you didn\'t.'
                ]
            },
            {
                text: 'donate it to charity',
                effect: { reputation: 10 },
                followup: [
                    'you give it all away.',
                    'the tools go to a trade school.',
                    'the money to a children\'s hospital.',
                    'you feel good.',
                    'and wonder who they were.',
                    'and why they thought of you.'
                ]
            }
        ]
    },

    {
        id: 'racing_team_offer',
        triggerReputation: 85,
        triggerOnce: true,
        text: [
            'a racing team approaches you.',
            'amateur. but serious.',
            '"we need a crew chief."',
            '"weekends only."',
            '"we can\'t pay much."',
            '"but you\'ll see racing."'
        ],
        choices: [
            {
                text: 'join the team',
                effect: { reputation: 10, money: -100 },
                followup: [
                    'you spend weekends at the track.',
                    'it\'s exhausting.',
                    'it\'s exhilarating.',
                    'you learn things.',
                    'the team wins.',
                    'sometimes.',
                    'you have a new family.',
                    'greasy. loud. perfect.'
                ]
            },
            {
                text: 'focus on the garage',
                effect: null,
                followup: [
                    '"my garage needs me."',
                    'they understand.',
                    'you watch them race once.',
                    'from the stands.',
                    'you wonder what if.',
                    'but the garage is enough.',
                    'it has to be.'
                ]
            }
        ]
    },

    {
        id: 'tv_show_feature',
        triggerReputation: 90,
        triggerOnce: true,
        text: [
            'a tv producer calls.',
            '"we\'re doing a show about mechanics."',
            '"we want to feature your garage."',
            '"it\'s good publicity."',
            '"and we pay €500."'
        ],
        choices: [
            {
                text: 'do the show',
                effect: { money: 500, reputation: 20 },
                followup: [
                    'cameras everywhere.',
                    'they stage things.',
                    '"can you look more greasy?"',
                    'the episode airs.',
                    'you look ridiculous.',
                    'but business doubles.',
                    'dignity is overrated.',
                    'sometimes.'
                ]
            },
            {
                text: 'decline',
                effect: null,
                followup: [
                    '"i\'m not a tv personality."',
                    '"i\'m a mechanic."',
                    'they find someone else.',
                    'you see the show.',
                    'it\'s terrible.',
                    'you made the right call.',
                    'probably.'
                ]
            }
        ]
    },

    {
        id: 'franchise_offer',
        triggerReputation: 80,
        triggerOnce: true,
        text: [
            'a national chain wants to buy you out.',
            '"we\'ll keep the name," they say.',
            '"you\'ll get a percentage."',
            '"and a signing bonus."',
            '€50,000.',
            'that\'s a lot of money.'
        ],
        choices: [
            {
                text: 'refuse - stay independent',
                effect: { reputation: 15 },
                followup: [
                    '"this garage is mine."',
                    '"it stays that way."',
                    'they leave.',
                    'you look around.',
                    'the lift. the tools. the oil stains.',
                    'yours.',
                    'all yours.',
                    'that\'s worth more than money.'
                ]
            },
            {
                text: 'negotiate a partnership',
                effect: { money: 25000, reputation: -5 },
                followup: [
                    'you work out a deal.',
                    'they help with marketing.',
                    'you keep control.',
                    'mostly.',
                    'the money helps.',
                    'but something is different.',
                    'you try not to think about it.'
                ]
            }
        ]
    }
];
