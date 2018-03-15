const mongoose = require('mongoose');

const { Schema } = mongoose;

const mcqAnswerOptionSchema = new Schema({
    id: { type: Number, default: 0 },
    check: { type: Boolean, default: false },
    questionOption: { type: Schema.Types.ObjectId, ref: 'options' },
    answer: { type: Schema.Types.ObjectId, ref: 'mcqAnswers' }
});

module.exports = mongoose.model('mcqAnswerOptions', mcqAnswerOptionSchema);