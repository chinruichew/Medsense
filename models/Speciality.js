const mongoose = require('mongoose');

const { Schema } = mongoose;

const specialitySchema = new Schema({
    speciality: { type: String, default: "" },
    subspeciality: [{ type: String, default: "" }],
});

const specialityModel = mongoose.model('specialities', specialitySchema);

module.exports = specialityModel;