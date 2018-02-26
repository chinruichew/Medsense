const mongoose = require('mongoose');
const Approach = require('../models/Approach');
const Speciality = require('../models/Speciality');
const Subspeciality = require('../models/Subspeciality');
const moment = require('moment-timezone');

const constants = require('../utility/constantTypes');
const commonMethods = require('../utility/commonMethods');

module.exports = app => {
    app.post('/api/fetchApproach', async (req, res) => {
        const approaches = await Approach.find({}).sort("approach");
        res.send(approaches);
    });

    app.post('/api/fetchSpeciality', async (req, res) => {
        const specialities = await Speciality.find({}).sort("speciality");
        res.send(specialities);
    });

    app.post('/api/fetchSubspeciality', async (req, res) => {
        Speciality.find({"speciality":req.body.speciality}).populate({
            path: 'subspecialities',
            model: 'subspecialities'
        }).exec(function(error, subspecialities) {
            res.send(subspecialities);
        });
    });
}