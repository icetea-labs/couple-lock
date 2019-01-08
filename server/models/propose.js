// PROPOSE

// Currently, return dummy JSON data
// TODO: update to get data from REDIS

exports.get = function (proposeId, cb) {
    cb(null, [{
        avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/jeremiaha/128.jpg",
        content: "In ultricies ipsum sem, in ullamcorper velit luctus sed. Fusce arcu ante, aliquet sit amet ornare quis, euismod ac justo. Duis hendrerit, lacus a facilisis congue",
        createdAt: "Tuesday",
        dateTime: "Sunday",
        id: "1"
    }, {
        avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/dannol/128.jpg",
        content: "Duis hendrerit, lacus a facilisis congue",
        createdAt: "Friday",
        dateTime: "Saturday",
        id: "2"
    }])
}