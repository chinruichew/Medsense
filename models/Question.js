const mongoose = require('mongoose');

const { Schema } = mongoose;

const questionSchema = new Schema({
    id: { type: String, default: "" },
    stem: { type: String, default: "" },
    question: { type: String, default: "" },
    attachment: { type: String, default: "" },
    pearlAttachment: { type: String, default: "" },
    type: { type: String, default: "" },
    openEnded: { type: String, default: "" },
    pearl: { type: String, default: "" },
    time: { type: String, default: "" },
    reference: { type: String, default: "" },
    case: { type: Schema.Types.ObjectId, ref: 'cases' },
    mark: {type: String, default: ""},
});

const questionModel = mongoose.model('questions', questionSchema);

module.exports = questionModel;


