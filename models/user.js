const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    yourname: String,
    username: String,
    password: String,
    created_at: Date,
    updated_at: Date
});

const User = mongoose.model('User', UserSchema);

module.exports = User;