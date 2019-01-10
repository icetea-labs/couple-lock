const seeder = module.exports = {};

seeder.user = [
    {
        chained: false,
        publicKey: "publicKey",
        username: "tradatech",
        displayName: "Trà đá Công nghệ",
        email: "tradatech@locks.com",
        avatar: "https://trada.tech/assets/img/logo_360_pad40.png",
    },
    {
        chained: false,
        publicKey: "publicKey",
        username: "sotatek",
        displayName: "Sô Ta Tếch",
        email: "sotatek@locks.com",
        avatar: "https://sotatek.com/images/logo.png",
    }
]

seeder.propose = [
    {
        id: 0,
        chained: false,
        visibility: 1, //1: listed, 2: public, 3: private
        sender: "sotatek",
        receiver: "tradatech",
        sending: {
            timestamp: Date.now(),
            visibilitySuggestion: 1,
            receiverCanChangeVisibility: 1, // 1: none, 2: reduceOnly, 3: all
            message: "I will alway love you, no matter what God bring down to us!",
            attachments: [
                {
                    type: 'photo',
                    url: "https://dq1eylutsoz4u.cloudfront.net/2018/01/25162144/relationship-tips-happy-couples.jpg",
                    caption: "Remember where this photo take?",
                    timestamp: Date.now(),
                    location: {
                        name: "Mongolia",
                        lat: 0,
                        long: 0
                    }
                }
            ],
        },
        receiving: {
            react: 1, //null, 1: accepted, 2: denied
            timestamp: Date.now(),
            message: "OK, fine!",
            attachments: [
                {
                    type: 'photo',
                    url: "https://boygeniusreport.files.wordpress.com/2016/11/puppy-dog.jpg",
                    caption: "My dog likes that :D",
                    timestamp: Date.now(),
                    location: {
                        name: "The Moon",
                        lat: 10,
                        long: 10
                    }
                }
            ]
        }
    }
];

seeder.memory = [
    {
        id: 0,
        proposeId: 0,
        chained: false,
        visibility: 1,
        timestamp: Date.now(),
        sender: "sotatek",
        visibilitySuggestion: 1,
        receiverCanChangeVisibility: 1,
        message: "This is great memory!",
        attachments: [
            {
                type: 'photo',
                url: "https://boygeniusreport.files.wordpress.com/2016/11/puppy-dog.jpg",
                caption: "My dog likes that :D",
                timestamp: Date.now(),
                location: {
                    name: "The Moon",
                    lat: 10,
                    long: 10
                }
            }
        ],
        receiverReact: 1, // null, 1: accepted, 2: denied
        receiverReactTimestamp: Date.now
    },
    {
        id: 1,
        proposeId: 0,
        chained: false,
        visibility: 1,
        timestamp: Date.now(),
        sender: "tradatech",
        visibilitySuggestion: 1,
        receiverCanChangeVisibility: 1,
        message: "This is also awesome!",
        attachments: [
            {
                type: 'photo',
                url: "https://boygeniusreport.files.wordpress.com/2016/11/puppy-dog.jpg",
                caption: "My dog likes that :D",
                timestamp: Date.now(),
                location: {
                    name: "The Moon",
                    lat: 10,
                    long: 10
                }
            }
        ],
        receiverReact: 1, // null, 1: accepted, 2: denied
        receiverReactTimestamp: Date.now
    }
]