const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema({
    display_name: String,
    google_id: String,
    user_name: String,
    img_url: String,
})

var User = mongoose.model('duyviet2841998', userSchema);

module.exports = User;