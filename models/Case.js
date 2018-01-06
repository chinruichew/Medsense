const mongoose = require('mongoose');

const { Schema } = mongoose;

const caseSchema = new Schema({
    title: { type: String, default: "" },
    questions: [{ type: Schema.Types.ObjectId, ref: 'questions' }],
    difficulty: { type: String, default: "" },
    speciality: { type: String, default: "" },
    subspeciality: [{ type: String, default: "" }],
    approach: [{ type: String, default: "" }],
    scenario: { type: String, default: "" },
    learning: { type: String, default: "" },
    status: { type: String, default: "Pending" },
    timestamp: {type: String, default: ""},
    authorid: { type: Schema.Types.ObjectId, ref: 'users' },
    authorname: { type: String, default: ""},
    vetter: { type: Schema.Types.ObjectId, ref: 'users' },
    vetstatus: { type: String, default: "unvetted" },
    finalvetter: { type: Schema.Types.ObjectId, ref: 'users' },
    finalvetstatus: { type: String, default: "unvetted" }
});

const caseModel = mongoose.model('cases', caseSchema);

module.exports = caseModel;