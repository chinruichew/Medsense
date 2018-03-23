const mongoose = require('mongoose');

const { Schema } = mongoose;

const userLevelScheme = new Schema({
    rank: { type: String, default: "" },
    level: { type: Number, default: 0 }
});

module.exports = mongoose.model('userLevelSchemes', userLevelScheme);