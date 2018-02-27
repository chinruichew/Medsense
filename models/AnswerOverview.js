const mongoose = require('mongoose');

const { Schema } = mongoose;

const answerOverviewSchema = new Schema({
    openEndedAnswers: [{ type: Schema.Types.ObjectId, ref: 'openEndedAnswers' }],
    mcqAnswers: [{ type: Schema.Types.ObjectId, ref: 'mcqAnswers' }],
    user: { type: Schema.Types.ObjectId, ref: 'users'},
    startTime: { type: Date, default: null},
    endTime: { type: Date, default: null},
    attempt: {type: Number, default: 0},
    score: {type: Number, default: 0},
    xp: {type: Number, default: 0},
    case: {type: Schema.Types.ObjectId, ref: 'cases'}
});

module.exports = mongoose.model('answerOverview', answerOverviewSchema);