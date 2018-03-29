const mongoose = require('mongoose');

const { Schema } = mongoose;

const contributionLevelScheme = new Schema({
    rank: { type: String, default: "" },
    level: { type: Number, default: 0 },
    point: { type: Number, default: 0 }
});

module.exports = mongoose.model('contributionLevelSchemes', contributionLevelScheme);