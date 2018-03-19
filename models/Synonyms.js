const mongoose = require('mongoose');

const { Schema } = mongoose;

const synonymSchema = new Schema({
    original: { type: String, default: "" },
    abbreviation: { type: String, default: "" }
});

const synonymModel = mongoose.model('synonyms', synonymSchema);

module.exports = synonymModel;