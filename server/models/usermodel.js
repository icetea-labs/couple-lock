const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    googleid: String, 
})

const User = mongoose.model('duyviet2841998', userSchema);

module.exports = User;