var  mongoose = require ("mongoose");
var keys = require('../models/keys');
var MyModel = require('../models/user-model');

var findRoom = function (roomName) {
    var roomName = roomName;
    mongoose.connect(keys.mongoDB.dbURI, (roomName = this.roomName, err) => {
        MyModel.findOne({name: roomName})
            .then((data) => {
                console.log(data);
            })

            if(err) {
                console.log(err);
            }
    })
}

// exports.addMesToRoom = mongoose.connect(keys.mongoDB.dbURI , function(db){
//         db.collection('chat_roooms')
//             .findOne({
//                 name: roomName
//             })
//             .push({
//                 message
//             })
//             .then(data => {
//                 console.log(data);  
//             })
//             .catch(err => {
//                 console.log(err);
//             })
//     })

module.exports.findRoom = findRoom;
