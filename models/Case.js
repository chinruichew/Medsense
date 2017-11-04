var mongoose = require('mongoose');

var { Schema } = mongoose;

var caseSchema = new Schema({
    casetitle: { type: String, default: "" },
    questions: [{ type: Schema.Types.ObjectId, ref: 'questions' }],
    difficulty: { type: String, default: "" },
    speciality: { type: String, default: "" },
    subspeciality: [{ type: String, default: "" }],
    approach: { type: String, default: "" },
    scenario: { type: String, default: "" },
    takeaway: { type: String, default: "" },
    author: { type: Schema.Types.ObjectId, ref: 'users' }
});

var caseModel = mongoose.model('cases', caseSchema);

module.exports = caseModel;
