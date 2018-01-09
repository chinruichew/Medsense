const mongoose = require('mongoose');

const { Schema } = mongoose;

const approachSchema = new Schema({
    approach: { type: String, default: "" },
});

const approachModel = mongoose.model('approaches', approachSchema);

module.exports = approachModel;