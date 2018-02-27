const mongoose = require('mongoose');

const { Schema } = mongoose;

const openEndedAnswerSchema = new Schema({
    id: { type: String, default: "" },
    mark: { type: String, default: "" },
    score: { type: Number, default: 0 },
    startTime: { type: Date, default: null},
    endTime: { type: Date, default: null},
    question: { type: Schema.Types.ObjectId, ref: 'questions' },
    nlpAccuracy: { type: Number, default: 0 },
    studentAnswer: { type: String, default: "" }
});

module.exports = mongoose.model('openEndedAnswers', openEndedAnswerSchema);