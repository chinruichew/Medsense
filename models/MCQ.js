var mongoose = require('mongoose');

var { Schema } = mongoose;

var mcqSchema = new Schema({
    answer: { type: String, default: "" },
    status: { type: Boolean, default: "" },
});

var mcqModel = mongoose.model('mcqs', mcqSchema);

module.exports = mcqModel;