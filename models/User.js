const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const { Schema } = mongoose;

const userSchema = new Schema({
    username: { type: String, default: "" },
    password: { type: String, default: "" },
    school: { type: String, default: "" },
    year: { type: String, default: "" },
    profilepicture: { type: String, default: "/userMD.png" },
    profilepictureVersion: {type: Number, default: 0},
    speciality: { type: String, default: "" },
    subspeciality: [{ type: String, default: "" }],
    usertype: { type: String, default: "" },
    timestamp: { type: Date, default: Date.now()},
    cases: [{ type: Schema.Types.ObjectId, ref: 'cases' }]
});

// generating a hash
userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('users', userSchema);