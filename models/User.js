const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    username: {type: String, default: ""},
    password: {type: String, default: ""}
});

mongoose.model('users', userSchema);

module.exports = userSchema;