const seeder = module.exports = {};

seeder.user = [
    {
        chained: false,
        publicKey: "0x4Cf35B3bB73e2CFA7f42ca6E14d572b7cc5bb09a",
        username: "tradatech",
        displayName: "Trà đá Công nghệ",
        email: "tradatech@locks.com",
        avatar: "https://trada.tech/assets/img/logo_360_pad40.png",
        signature: "signature"
    }
    ,
    {
        chained: false,
        publicKey: "0xFE5A1AA408beCDdAB0A20C5F9cbCF6897AC977e2",
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
    },
    {
        chained: false,
        publicKey: "publicKey",
        username: "richard",
        displayName: "Rích chác",
        email: "richard@locks.com",
        avatar: "https://picsum.photos/230/230",
        signature: "signature"
    },
    {
        chained: false,
        publicKey: "publicKey",
        username: "sugar",
        displayName: "Su gờ",
        email: "sugar@locks.com",
        avatar: "https://picsum.photos/250/250",
        signature: "signature"
    },
    {
        chained: false,
        publicKey: "publicKey",
        username: "paulra",
        displayName: "Pâu ra",
        email: "paulra@locks.com",
        avatar: "https://picsum.photos/200/200",
        signature: "signature"
    }
]

seeder.propose = [
    {
        id: '0',
        chained: false,
        visibility: 1, //1: listed, 2: public, 3: private
        sender: "sotatek",
        s_address: "0xFE5A1AA408beCDdAB0A20C5F9cbCF6897AC977e2",
        s_timestamp: Date.now(),
        s_visibilitySuggestion: 1,
        s_receiverCanChangeVisibility: 1, // 1: none, 2: reduceOnly, 3: all
        s_message: "I will alway love you, no matter what God bring down to us!",
        s_attachments: [
            {
                type: 'photo',
                url: "https://i.ibb.co/bNDWW6v/bitmap-copy-4-2x.jpg",
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
        r_address: "0x4Cf35B3bB73e2CFA7f42ca6E14d572b7cc5bb09a",
        r_react: 1, //null, 1: accepted, 2: denied
        r_timestamp: Date.now(),
        r_message: "OK, fine!",
        r_attachments: [
            {
                type: 'photo',
                url: "https://i.ibb.co/946jCZj/banner.jpg",
                caption: "Sotatek Company :D",
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
                url: "https://picsum.photos/900/400",
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
    },
    // {
    //     id: '2',
    //     chained: false,
    //     visibility: 1, //1: listed, 2: public, 3: private
    //     sender: "sotatek",
    //     s_timestamp: Date.now(),
    //     s_visibilitySuggestion: 1,
    //     s_receiverCanChangeVisibility: 1, // 1: none, 2: reduceOnly, 3: all
    //     s_message: "Hellooo ! I'm Sotatekers",
    //     s_attachments: [
    //         {
    //             type: 'photo',
    //             url: "https://picsum.photos/900/425",
    //             caption: "This is great image",
    //             timestamp: Date.now(),
    //             location: {
    //                 name: "Ha Noi, Viet Nam",
    //                 lat: 0,
    //                 long: 0
    //             }
    //         }
    //     ],
    //     receiver: "paulra",
    //     r_react: 2, //null, 1: accepted, 2: denied
    //     r_timestamp: Date.now(),
    //     r_message: "Ohh ! I'm Paulra. Nice to meet you.",
    //     r_attachments: [
    //         {
    //             type: 'photo',
    //             url: "https://i.ibb.co/bNDWW6v/bitmap-copy-4-2x.jpg",
    //             caption: "Happy wedding <3",
    //             timestamp: Date.now(),
    //             location: {
    //                 name: "England",
    //                 lat: 10,
    //                 long: 10
    //             }
    //         }
    //     ]
    // }
];

seeder.memory = [
    {
        id: '0',
        proposeId: '0',
        chained: false,
        visibility: 1,
        timestamp: Date.now(),
        sender: "sotatek",
        address: "0xFE5A1AA408beCDdAB0A20C5F9cbCF6897AC977e2",
        visibilitySuggestion: 1,
        receiverCanChangeVisibility: 1,
        message: "This is great memory!",
        attachments: [
            {
                type: 'photo',
                url: "https://boygeniusreport.files.wordpress.com/2016/11/puppy-dog.jpg",
                caption: "My dog likes that :D",
                timestamp: Date.now(),
            },
            {
                type: 'location',
                name: "The Moon",
                lat: 10,
                long: 10
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
        address: "0x4Cf35B3bB73e2CFA7f42ca6E14d572b7cc5bb09a",
        visibilitySuggestion: 1,
        receiverCanChangeVisibility: 1,
        message: "This is also awesome!",
        attachments: [
            {
                type: 'photo',
                url: "https://boygeniusreport.files.wordpress.com/2016/11/puppy-dog.jpg",
                caption: "My dog likes that :D",
                timestamp: Date.now(),
            },
            {
                type: 'location',
                name: "The Moon",
                lat: 10,
                long: 10
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
        address: "0xFE5A1AA408beCDdAB0A20C5F9cbCF6897AC977e2",
        visibilitySuggestion: 1,
        receiverCanChangeVisibility: 1,
        message: "Today, the weather is beautiful",
        attachments: [
            {
                type: 'photo',
                url: "https://picsum.photos/200/300",
                caption: "This is caption",
                timestamp: Date.now(),
            },
            {
                type: 'location',
                name: "The Moon",
                lat: 10,
                long: 10
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
        address: "0x4Cf35B3bB73e2CFA7f42ca6E14d572b7cc5bb09a",
        visibilitySuggestion: 1,
        receiverCanChangeVisibility: 1,
        message: "Yes, I see",
        attachments: [
            {
                type: 'photo',
                url: "https://picsum.photos/300/250",
                caption: "This is caption",
                timestamp: Date.now(),
            },
            {
                type: 'location',
                name: "The Moon",
                lat: 10,
                long: 10
            }
        ],
        receiverReact: 1, // null, 1: accepted, 2: denied
        receiverReactTimestamp: Date.now
    },
    {
        id: '4',
        proposeId: '2',
        chained: false,
        visibility: 1,
        timestamp: Date.now(),
        sender: "sotatek",
        address: "0xFE5A1AA408beCDdAB0A20C5F9cbCF6897AC977e2",
        visibilitySuggestion: 1,
        receiverCanChangeVisibility: 1,
        message: "Today, the weather is beautiful",
        attachments: [
            {
                type: 'photo',
                url: "https://picsum.photos/240/240",
                caption: "This is caption",
                timestamp: Date.now(),
            },
            {
                type: 'location',
                name: "The Moon",
                lat: 10,
                long: 10
            }
        ],
        receiverReact: 1, // null, 1: accepted, 2: denied
        receiverReactTimestamp: Date.now
    },
    {
        id: '5',
        proposeId: '2',
        chained: false,
        visibility: 1,
        timestamp: Date.now(),
        sender: "paulra",
        address: "0x4Cf35B3bB73e2CFA7f42ca6E14d572b7cc5bb09a",
        visibilitySuggestion: 1,
        receiverCanChangeVisibility: 1,
        message: "Yes, I see",
        attachments: [
            {
                type: 'photo',
                url: "https://picsum.photos/300",
                caption: "This is caption",
                timestamp: Date.now(),
            },
            {
                type: 'location',
                name: "The Moon",
                lat: 10,
                long: 10
            }
        ],
        receiverReact: 1, // null, 1: accepted, 2: denied
        receiverReactTimestamp: Date.now
    },
]