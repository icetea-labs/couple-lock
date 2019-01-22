const seeder = module.exports = {};

seeder.user = [
    {
        chained: false,
        publicKey: "publicKey",
        username: "tradatech",
        displayName: "Trà đá Công nghệ",
        email: "tradatech@locks.com",
        avatar: "https://trada.tech/assets/img/logo_360_pad40.png",
        signature: "signature"
    },
    {
        chained: false,
        publicKey: "publicKey",
        username: "sotatek",
        displayName: "Sô Ta Tếch",
        email: "sotatek@locks.com",
        avatar: "https://static.topcv.vn/company_logos/cong-ty-co-phan-cong-nghe-sota-tek-5acee80b974ef.jpg",
        signature: "signature"
    },
    {
        chained: false,
        publicKey: "publicKey",
        username: "sotatrada",
        displayName: "Sô Ta Trà Đá Tếch",
        email: "sotatrada@locks.com",
        avatar: "http://pluspng.com/img-png/github-octocat-logo-vector-png--896.jpg",
        signature: "signature"
    }
]

seeder.propose = [
    {
        id: '0',
        chained: false,
        visibility: 1, //1: listed, 2: public, 3: private
        sender: "sotatek",
        s_timestamp: Date.now(),
        s_visibilitySuggestion: 1,
        s_receiverCanChangeVisibility: 1, // 1: none, 2: reduceOnly, 3: all
        s_message: "I will alway love you, no matter what God bring down to us!",
        s_attachments: [
            {
                type: 'photo',
                url: "https://dq1eylutsoz4u.cloudfront.net/2018/01/25162144/relationship-tips-happy-couples.jpg",
                caption: "Remember where this photo taken?",
                timestamp: Date.now(),
                location: {
                    name: "Mongolia",
                    lat: 0,
                    long: 0
                }
            }
        ],
        receiver: "tradatech",
        r_react: 1, //null, 1: accepted, 2: denied
        r_timestamp: Date.now(),
        r_message: "OK, fine!",
        r_attachments: [
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
    },
    {
        id: '1',
        chained: false,
        visibility: 1, //1: listed, 2: public, 3: private
        sender: "sotatek",
        s_timestamp: Date.now(),
        s_visibilitySuggestion: 1,
        s_receiverCanChangeVisibility: 1, // 1: none, 2: reduceOnly, 3: all
        s_message: "Hi ! I'm Sotatek, Nice to meet you",
        s_attachments: [
            {
                type: 'photo',
                url: "http://lovestories.123greetings.com/wp-content/uploads/2016/04/Love-Stories-Memories.jpg",
                caption: "This is great image",
                timestamp: Date.now(),
                location: {
                    name: "Viet Nam",
                    lat: 0,
                    long: 0
                }
            }
        ],
        receiver: "sotatrada",
        r_react: 1, //null, 1: accepted, 2: denied
        r_timestamp: Date.now(),
        r_message: "Thank you, So I Glad",
        r_attachments: [
            {
                type: 'photo',
                url: "https://i.ytimg.com/vi/4NMgr_2lIsI/maxresdefault.jpg",
                caption: "Happy wedding <3",
                timestamp: Date.now(),
                location: {
                    name: "England",
                    lat: 10,
                    long: 10
                }
            }
        ]
    }
];

seeder.memory = [
    {
        id: '0',
        proposeId: '0',
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
        id: '1',
        proposeId: '0',
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
    },
    {
        id: '2',
        proposeId: '1',
        chained: false,
        visibility: 1,
        timestamp: Date.now(),
        sender: "sotatek",
        visibilitySuggestion: 1,
        receiverCanChangeVisibility: 1,
        message: "How do you feeling today?",
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
        id: '3',
        proposeId: '1',
        chained: false,
        visibility: 1,
        timestamp: Date.now(),
        sender: "sotatrada",
        visibilitySuggestion: 1,
        receiverCanChangeVisibility: 1,
        message: "Today is a great day for me :D",
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
]