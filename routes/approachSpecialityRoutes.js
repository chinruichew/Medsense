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
};