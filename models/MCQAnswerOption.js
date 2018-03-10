const mongoose = require('mongoose');

const { Schema } = mongoose;

const mcqAnswerOptionSchema = new Schema({
    check: { type: Boolean, default: false },
    questionOption: { type: Schema.Types.ObjectId, ref: 'options' }
});

module.exports = mongoose.model('mcqAnswerOptions', mcqAnswerOptionSchema);