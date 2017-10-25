var mongoose = require('mongoose');

var { Schema } = mongoose;
var userSchema = new Schema({
    username: { type: String, default: "" },
    password: { type: String, default: "" },
    usertype: { type: String, default: "" }
});
var userModel = mongoose.model('users', userSchema);

module.exports = userModel;