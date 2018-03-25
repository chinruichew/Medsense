const Approach = require('../models/Approach');
const Speciality = require('../models/Speciality');
const Subspeciality = require('../models/Subspeciality');

module.exports = app => {
    app.post('/api/fetchApproach', async (req, res) => {
        const approaches = await Approach.find({}).sort("approach");
        res.send(approaches);
    });

    app.post('/api/addNewApproach', function (req, res) {
        const values = req.body.values;
        Approach.findOne({ approach: values.approach }, function (err, approach) {
            if (!approach) {
                const newApproach = new Approach();
                newApproach.approach = values.approach;
                newApproach.save();
                return res.send(newApproach);
            } else {
                return res.send('Approach Exists');
            }
        });
    });

    app.post('/api/deleteApproach', function (req, res) {
        Approach.find({ _id: req.body.values }, function (err, deleteApproach) { }).remove().exec();
        return res.status(201).send({ data: null, message: "deleteApproach success" });
    });

    app.post('/api/fetchSpeciality', async (req, res) => {
        const specialities = await Speciality.find({}).populate({
            path: 'subspecialities',
            model: 'subspecialities'
        }).sort("speciality");
        res.send(specialities);
    });

    app.post('/api/addNewSpeciality', function (req, res) {
        const values = req.body.values;
        Speciality.findOne({ speciality: values.speciality }, function (err, speciality) {
            if (!speciality) {
                const newSpeciality = new Speciality();
                newSpeciality.speciality = values.speciality;
                newSpeciality.save();
                return res.send(newSpeciality);
            } else {
                return res.send('Speciality Exists');
            }
        });
    });

    app.post('/api/deleteSpeciality', function (req, res) {
        Speciality.find({ _id: req.body.values }, function (err, deleteSpeciality) { }).remove().exec();
        return res.status(201).send({ data: null, message: "deleteSpeciality success" });
    });

    app.post('/api/fetchSubspeciality', async (req, res) => {
        Speciality.find({"speciality":req.body.speciality}).populate({
            path: 'subspecialities',
            model: 'subspecialities'
        }).exec(function(error, subspecialities) {
            res.send(subspecialities);
        });
    });

    app.post('/api/fetchAdminSubspeciality', async (req, res) => {
        const subspecialities = await Subspeciality.find({}).sort("subspeciality");
        res.send(subspecialities);
    });

     app.post('/api/addNewSubspeciality', function (req, res) {
        const values = req.body.values;
        Subspeciality.findOne({ subspeciality: values.subspeciality }, function (err, subspeciality) {
            if (!subspeciality) {
                const newSubspeciality = new Subspeciality();
                newSubspeciality.subspeciality = values.subspeciality;
                newSubspeciality.save();
                return res.send(newSubspeciality);
            } else {
                return res.send('Subspeciality Exists');
            }
        });
    });

    app.post('/api/deleteSubspeciality', function (req, res) {
        Subspeciality.find({ _id: req.body.values }, function (err, deleteSubspeciality) { }).remove().exec();
        return res.status(201).send({ data: null, message: "deleteSubspeciality success" });
    });
};