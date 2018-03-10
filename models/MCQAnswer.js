const mongoose = require('mongoose');

const { Schema } = mongoose;

const mcqAnswerSchema = new Schema({
    id: { type: String, default: "" },
    answerOptions: [{ type: Schema.Types.ObjectId, ref: 'mcqAnswerOptions' }],
    mark: { type: String, default: "" },
    score: { type: Number, default: 0 },
    startTime: { type: Date, default: null},
    endTime: { type: Date, default: null},
    question: { type: Schema.Types.ObjectId, ref: 'questions' },
    answerCount: { type: Number, default: 0 },
    correctAnswerCount: { type: Number, default: 0 }
});

module.exports = mongoose.model('mcqAnswers', mcqAnswerSchema);