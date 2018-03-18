const mongoose = require('mongoose');

const { Schema } = mongoose;

const optionSchema = new Schema({
    qnId: { type: String, default: "" },
    id: { type: String, default: "" },
    question: { type: Schema.Types.ObjectId, ref: 'questions' },
    case: { type: Schema.Types.ObjectId, ref: 'cases' },
    mcq: { type: String, default: "" },
    check: { type: Boolean, default: false },
});

const optionModel = mongoose.model('options', optionSchema);

module.exports = optionModel;


