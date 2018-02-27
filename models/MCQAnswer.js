const mongoose = require('mongoose');

const { Schema } = mongoose;

const mcqAnswerSchema = new Schema({
    id: { type: String, default: "" },
    check1: { type: Boolean, default: false },
    check2: { type: Boolean, default: false },
    check3: { type: Boolean, default: false },
    check4: { type: Boolean, default: false },
    check5: { type: Boolean, default: false },
    check6: { type: Boolean, default: false },
    mark: { type: String, default: "" },
    score: { type: Number, default: 0 },
    startTime: { type: Date, default: null},
    endTime: { type: Date, default: null},
    question: { type: Schema.Types.ObjectId, ref: 'questions' },
    answerCount: { type: Number, default: 0 },
    correctAnswerCount: { type: Number, default: 0 }
});

module.exports = mongoose.model('mcqAnswers', mcqAnswerSchema);