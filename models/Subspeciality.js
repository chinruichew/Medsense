const mongoose = require('mongoose');

const { Schema } = mongoose;

const subspecialitySchema = new Schema({
    speciality: { type: String, default: "" },
    subspeciality: { type: String, default: "" }
});

const subspecialityModel = mongoose.model('subspecialities', subspecialitySchema);

module.exports = subspecialityModel;