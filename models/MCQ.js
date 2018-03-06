const mongoose = require('mongoose');

const { Schema } = mongoose;

const mcqSchema = new Schema({
    id: { type: String, default: "" },
    question: { type: Schema.Types.ObjectId, ref: 'questions' },
    case: { type: Schema.Types.ObjectId, ref: 'cases' },
    mcq: { type: String, default: "" },
    check: { type: Boolean, default: false },
});

const mcqModel = mongoose.model('mcq', mcqSchema);

module.exports = mcqModel;


