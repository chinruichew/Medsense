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
    uploadTime: {type: Date, default: null},
    authorid: { type: Schema.Types.ObjectId, ref: 'users' },
    vetter: { type: Schema.Types.ObjectId, ref: 'users' },
    vetTime: {type: Date, default: null}
});

const caseModel = mongoose.model('cases', caseSchema);

module.exports = caseModel;