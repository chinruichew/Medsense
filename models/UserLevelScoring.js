const mongoose = require('mongoose');

const { Schema } = mongoose;

const userLevelScoring = new Schema({
    scoreNeeded: { type: Number, default: 0 },
    level: { type: Number, default: 0 }
});

module.exports = mongoose.model('userLevelScorings', userLevelScoring);