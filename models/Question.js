var mongoose = require('mongoose');

var { Schema } = mongoose;

var questionSchema = new Schema({
    title: { type: String, default: "" },
    attachment: { type: String, default: "" },
    type: { type: String, default: "" },
    mcqs: [{ type: Schema.Types.ObjectId, ref: 'mcqs' }],
    open: { type: String, default: "" },
    pearl: { type: String, default: "" },
    timelimit: { type: String, default: "" },
    reference: { type: String, default: "" },
    case: { type: Schema.Types.ObjectId, ref: 'cases' }
});

var questionModel = mongoose.model('questions', questionSchema);

module.exports = questionModel;
