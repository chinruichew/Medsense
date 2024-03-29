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
        Approach.findOne({ approach: values.approach }, async (err, approach) => {
            if (!approach) {
                const newApproach = new Approach();

                // Uppercase the first letter of each word
                const spaceIndexes = [];
                const uncheckedApproach = ' ' + values.approach.trim();
                for (let i = 0; i < uncheckedApproach.length; i++) {
                    const approachAlphabet = uncheckedApproach[i];
                    if (approachAlphabet === ' ') {
                        spaceIndexes.push(i);
                    }
                }
                let cappedApproach = '';
                for (let i = 0; i < uncheckedApproach.length; i++) {
                    const approachAlphabet = uncheckedApproach[i];
                    let toUpperCase = false;
                    for (let j = 0; j < spaceIndexes.length; j++) {
                        const spacedIndex = spaceIndexes[j];
                        if (spacedIndex + 1 === i) {
                            toUpperCase = true;
                            break;
                        }
                    }
                    if (toUpperCase) {
                        cappedApproach += approachAlphabet.toUpperCase();
                    } else {
                        cappedApproach += approachAlphabet;
                    }
                }
                newApproach.approach = cappedApproach.substring(1);
                await newApproach.save();
                res.send(newApproach);
            } else {
                res.send('Approach Exists');
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
        Speciality.findOne({ speciality: values.speciality }, async (err, speciality) => {
            if (!speciality) {
                const newSpeciality = new Speciality();

                // Uppercase the first letter of each word
                const spaceIndexes = [];
                const uncheckedSpeciality = ' ' + values.speciality.trim();
                for (let i = 0; i < uncheckedSpeciality.length; i++) {
                    const specialityAlphabet = uncheckedSpeciality[i];
                    if (specialityAlphabet === ' ') {
                        spaceIndexes.push(i);
                    }
                }
                let cappedSpeciality = '';
                for (let i = 0; i < uncheckedSpeciality.length; i++) {
                    const specialityAlphabet = uncheckedSpeciality[i];
                    let toUpperCase = false;
                    for (let j = 0; j < spaceIndexes.length; j++) {
                        const spacedIndex = spaceIndexes[j];
                        if (spacedIndex + 1 === i) {
                            toUpperCase = true;
                            break;
                        }
                    }
                    if (toUpperCase) {
                        cappedSpeciality += specialityAlphabet.toUpperCase();
                    } else {
                        cappedSpeciality += specialityAlphabet;
                    }
                }

                newSpeciality.speciality = cappedSpeciality.substring(1);
                await newSpeciality.save();
                res.send(newSpeciality);
            } else {
                res.send('Speciality Exists');
            }
        });
    });

    app.post('/api/deleteSpeciality', function (req, res) {
        Speciality.find({ _id: req.body.values }, function (err, deleteSpeciality) { }).remove().exec();
        return res.status(201).send({ data: null, message: "deleteSpeciality success" });
    });

    app.post('/api/fetchSubspeciality', async (req, res) => {
        Speciality.find({ "speciality": req.body.speciality }).populate({
            path: 'subspecialities',
            model: 'subspecialities'
        }).exec(function (error, subspecialities) {
            res.send(subspecialities);
        });
    });

    app.post('/api/batchFetchSubSpecialities', async (req, res) => {
        // Get the list of specialities, of which their sub-specialities we want to fetch.
        let specialities = req.body.specialities;

        // For each speciality, fetch from database their Mongoose object and all of their sub-specialities.
        // For each speciality, we want a json object which includes their list of sub-specialities.
        // specialityMapping: [{speciality: Clinical Practicum, subspecialities: [Array]}, {speciality: Medicine, subspecialities: [Array]}]
        // The counter will go from 0 to specialities.length - 1, allowing us to iterate through all the specialities.
        const specialityMapping = [];
        let counter = 0;
        while (counter < specialities.length) {
            const speciality = specialities[counter];

            // Wait for DB to fetch Speciality details.
            const subSpecialities = await Speciality.find({ "speciality": speciality }).populate({
                path: 'subspecialities',
                model: 'subspecialities'
            });

            // Add into specialityMapping array as unique objects..
            specialityMapping.push({
                speciality,
                subSpecialities
            });

            // Increase counter increment to match array index.
            counter++;
        }
        res.send(specialityMapping);
    });

    app.post('/api/fetchAdminSubspeciality', async (req, res) => {
        const subspecialities = await Subspeciality.find({}).sort("subspeciality");
        res.send(subspecialities);
    });

    app.post('/api/addNewSubspeciality', function (req, res) {
        const values = req.body.values;
        Subspeciality.findOne({ subspeciality: values.subspeciality }, async (err, returnsubspeciality) => {
            if (!returnsubspeciality) {
                Speciality.findOne({ speciality: values.speciality }, async (err, speciality) => {
                    const newSubspeciality = new Subspeciality();
                    newSubspeciality.subspeciality = values.subspeciality;
                    newSubspeciality.save();
                    speciality.subspecialities.push(newSubspeciality);
                    speciality.save();
                    res.send(newSubspeciality);
                })
            } else {
                res.send('Subspeciality Exists');
            }
        })
    });

    app.post('/api/deleteSubspeciality', function (req, res) {
        Subspeciality.find({ _id: req.body.values }, function (err, deleteSubspeciality) { }).remove().exec();
        return res.status(201).send({ data: null, message: "deleteSubspeciality success" });
    });

    app.post('/api/fetchSSS', async (req, res) => {
        const sss = await Speciality.find({ }).populate({
            path: 'subspecialities',
            model: 'subspecialities'
        });
        res.send(sss)
    });
};