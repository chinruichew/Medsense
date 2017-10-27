var mongoose = require('mongoose');

var { Schema } = mongoose;

var userSchema = new Schema({
    username: { type: String, default: "" },
    password: { type: String, default: "" },
    school: { type: String, default: "" },
    year: { type: String, default: "" },
    profilepicture: { type: String, default: "" },
    usertype: { type: String, default: "" },
    cases: [{type: Schema.Types.ObjectId, ref: 'cases'}]
});

var userModel = mongoose.model('users', userSchema);

module.exports = userModel
