const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const document = mongoose.DocumentProvider;

var messsage = new document({
    id: String,
    content: String,
    type: String,
    owner: String,
    timestamp: Number,
});

var member = new document({
    id: String,
    username: String,   
    displayname: String,
    avatar: String,
})

var chat_rooms = new Schema({}, {collection: "chat_rooms"});

const MyModel = mongoose.model('duyviet2841998', chat_rooms);

module.exports = MyModel;