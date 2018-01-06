const mongoose = require('mongoose');
const User = require('../models/User');
const Case = require('../models/Case');
const Question = require('../models/Question');

function IsValidNRIC(theNric) {
    var patt = new RegExp(/^[STFG]\d{7}[A-Z]$/);
    if (patt.test(theNric)) {
        return true
    }
}

module.exports = app => {

    app.post('/api/validate', function (req, res) {
        if (IsValidNRIC(req.body.nric)) {
            return res.status(201).send({ data: null, message: "validate" });
        } else {
            return res.status(404).send({ data: null, message: "validatewrong" });
        }
    });

    app.post('/api/uploadCase', function (req, res) {
        const newCase = new Case({
            title: req.body.values.title,
            difficulty: req.body.values.difficulty,
            speciality: req.body.values.speciality,
            scenario: req.body.values.scenario,
            learning: req.body.values.learning,
            timestamp: new Date(),
            authorid: mongoose.Types.ObjectId(req.body.values.authid),
            authorname: req.body.values.authname
        });

        for (var key in req.body.values.approach) {
            newCase.approach.push(req.body.values.approach[key])
        }

        for (var key in req.body.values.subspeciality) {
            newCase.subspeciality.push(req.body.values.subspeciality[key])
        }

        const jsonObject = req.body.values.qnData;

        let questions=[];
        for (const prop in jsonObject) {
            const newQuestion = new Question({
                id: jsonObject[prop]['id'],
                stem: jsonObject[prop]['stem'],
                question: jsonObject[prop]['question'],
                attachment: null,
                type: jsonObject[prop]['type'],
                openEnded: jsonObject[prop]['openEnded'],
                pearl: jsonObject[prop]['pearl'],
                time: jsonObject[prop]['time'],
                reference: jsonObject[prop]['reference'],
                mcq1: jsonObject[prop]['mcq1'],
                mcq2: jsonObject[prop]['mcq2'],
                mcq3: jsonObject[prop]['mcq3'],
                mcq4: jsonObject[prop]['mcq4'],
                mcq5: jsonObject[prop]['mcq5'],
                mcq6: jsonObject[prop]['mcq6'],
                check1: jsonObject[prop]['check1'],
                check2: jsonObject[prop]['check2'],
                check3: jsonObject[prop]['check3'],
                check4: jsonObject[prop]['check4'],
                check5: jsonObject[prop]['check5'],
                check6: jsonObject[prop]['check6'],
                case: newCase._id
            });
            newQuestion.save();
            newCase.questions.push(newQuestion._id);
            newCase.save();
            questions.push(newQuestion);
        }
        return res.send({ data: {case:newCase._id, question:questions}, message: "uploadCase success" });
    });

    app.post('/api/updateCase', function (req, res) {
        console.log(req.body.values.title)
        Case.findById(req.body.values.id, function (err, oneCase) {
            console.log(oneCase)
            oneCase.title = req.body.values.title;
            oneCase.difficulty = req.body.values.difficulty;
            oneCase.speciality = req.body.values.speciality;

            oneCase.approach = []
            oneCase.subspeciality = []

            for (var key in req.body.values.approach) {
                oneCase.approach.push(req.body.values.approach[key])
            }

            for (var key in req.body.values.subspeciality) {
                oneCase.subspeciality.push(req.body.values.subspeciality[key])
            }

            oneCase.scenario = req.body.values.scenario;
            oneCase.learning = req.body.values.learning;
            oneCase.vetter = req.body.values.authid;
            oneCase.status = "Vetted";
            oneCase.save();

            const jsonObject = req.body.values.qnData;

            for (const prop in jsonObject) {
                Question.findById(jsonObject[prop]['_id'], function (err, oneQuestion) {
                    if (oneQuestion) {
                        oneQuestion.id = jsonObject[prop]['id'];
                        oneQuestion.question = jsonObject[prop]['question'];
                        oneQuestion.attachment = jsonObject[prop]['attachment'];
                        oneQuestion.type = jsonObject[prop]['type'];
                        oneQuestion.openEnded = jsonObject[prop]['open'];
                        oneQuestion.pearl = jsonObject[prop]['pearl'];
                        oneQuestion.time = jsonObject[prop]['time'];
                        oneQuestion.reference = jsonObject[prop]['reference'];
                        oneQuestion.stem = jsonObject[prop]['stem'];
                        oneQuestion.mcq1 = jsonObject[prop]['mcq1'];
                        oneQuestion.mcq2 = jsonObject[prop]['mcq2'];
                        oneQuestion.mcq3 = jsonObject[prop]['mcq3'];
                        oneQuestion.mcq4 = jsonObject[prop]['mcq4'];
                        oneQuestion.mcq5 = jsonObject[prop]['mcq5'];
                        oneQuestion.mcq6 = jsonObject[prop]['mcq6'];
                        oneQuestion.check1 = jsonObject[prop]['check1'];
                        oneQuestion.check2 = jsonObject[prop]['check2'];
                        oneQuestion.check3 = jsonObject[prop]['check3'];
                        oneQuestion.check4 = jsonObject[prop]['check4'];
                        oneQuestion.check5 = jsonObject[prop]['check5'];
                        oneQuestion.check6 = jsonObject[prop]['check6'];
                        oneQuestion.save();
                    }
                    if (!oneQuestion) {
                        const newQuestion = new Question({
                            id: jsonObject[prop]['id'],
                            stem: jsonObject[prop]['stem'],
                            question: jsonObject[prop]['question'],
                            attachment: jsonObject[prop]['attachment'],
                            type: jsonObject[prop]['type'],
                            openEnded: jsonObject[prop]['openEnded'],
                            pearl: jsonObject[prop]['pearl'],
                            time: jsonObject[prop]['time'],
                            reference: jsonObject[prop]['reference'],
                            mcq1: jsonObject[prop]['mcq1'],
                            mcq2: jsonObject[prop]['mcq2'],
                            mcq3: jsonObject[prop]['mcq3'],
                            mcq4: jsonObject[prop]['mcq4'],
                            mcq5: jsonObject[prop]['mcq5'],
                            mcq6: jsonObject[prop]['mcq6'],
                            check1: jsonObject[prop]['check1'],
                            check2: jsonObject[prop]['check2'],
                            check3: jsonObject[prop]['check3'],
                            check4: jsonObject[prop]['check4'],
                            check5: jsonObject[prop]['check5'],
                            check6: jsonObject[prop]['check6'],
                            case: oneCase._id
                        });
                        newQuestion.save();
                        oneCase.questions.push(newQuestion._id);
                        oneCase.save();
                    }
                })
            }
            return res.send({ data: jsonObject, message: "updateCase success" });
        });
    });

    app.get('/api/fetchUnvetCases', async (req, res) => {
        const cases = await Case.find({ status: 'Pending' }).select();
        res.send(cases);
    });

    app.get('/api/fetchVettedCases', async (req, res) => {
        const cases = await Case.find({ status: 'Vetted' }).select();
        res.send(cases);
    });

    app.get('/api/fetchAllCases', async (req, res) => {
        const id = req.body.id;
        const cases = await Case.findOne({ _id: id }).select();
        res.send(cases);
    });

    app.post('/api/fetchAllCasesByAuthor', function (req, res) {
        Case.find({ author: req.body.authorid }).populate({
            path: 'questions',
            model: 'questions',
        }).exec(function (error, cases) {
            return res.status(201).send({ data: cases, message: "fetchAllByAuthor success" });
        })
    });

    app.post('/api/deleteCase', function (req, res) {
        Case.find({ _id: req.body.caseid }, function (err, oneCase) {
            Question.find({ case: req.body.caseid }, function (err, questions) {
            }).remove().exec();
        }).remove().exec();

        return res.status(201).send({ data: null, message: "deleteCase success" });
    });

    app.post('/api/updateCaseOnly', function (req, res) {
        Case.update({ _id: req.body.caseid }, { $set: { subspeciality: [] } }, function (err, response) { });
        Case.findById(req.body.caseid, function (err, oneCase) {
            oneCase.casetitle = req.body.title
            oneCase.difficulty = req.body.difficulty
            oneCase.speciality = req.body.speciality
            oneCase.subspeciality = req.body.subspeciality
            oneCase.approach = req.body.aproach
            oneCase.scenario = req.body.scenario
            oneCase.learning = req.body.learning
            oneCase.timestamp = req.body.timestamp

            // const jsonObjectSS = JSON.parse(req.body.subspeciality);
            // for (const prop in jsonObjectSS) {
            //     oneCase.subspeciality.push(jsonObjectSS[prop])
            // }
            oneCase.save();
        })
        return res.status(201).send({ data: null, message: "updateCaseOnly success" });
    })

    app.post('/api/updateQuestion', function (req, res) {
        Question.findById(req.body.questionid, function (err, oneQuestion) {
            oneQuestion.questiontitle = req.body.title
            oneQuestion.attachment = req.body.attachment
            oneQuestion.type = req.body.type
            oneQuestion.openEnded = req.body.openEnded
            oneQuestion.pearl = req.body.pearl
            oneQuestion.timelimit = req.body.timelimit
            oneQuestion.reference = req.body.reference
            oneQuestion.stem = req.body.stem
            oneQuestion.mcq1 = req.body.mcq1
            oneQuestion.mcq2 = req.body.mcq2
            oneQuestion.mcq3 = req.body.mcq3
            oneQuestion.mcq4 = req.body.mcq4
            oneQuestion.mcq5 = req.body.mcq5
            oneQuestion.mcq6 = req.body.mcq6
            oneQuestion.check1 = req.body.check1
            oneQuestion.check2 = req.body.check2
            oneQuestion.check3 = req.body.check3
            oneQuestion.check4 = req.body.check4
            oneQuestion.check5 = req.body.check5
            oneQuestion.check6 = req.body.check6
            oneQuestion.save();
            return res.status(201).send({ data: null, message: "updateCaseQuestion success" });
        })
    });

    app.post('/api/fetchAllCasesByProfessor', function (req, res) {
        User.findById(req.body.authorid, function (err, oneUser) {
            Case.find({ subspeciality: { $in: oneUser.subspeciality } }, function (err, cases) {
                return res.status(201).send({ data: cases, message: "fetchAllByAuthor success" });
            })
        })
    });

    app.post('/api/fetchCaseById', async (req, res) => {
        const id = req.body.id;
        const cases = await Case.findOne({ _id: req.body.values.vetId }).select().populate({
            path: 'questions',
            model: 'questions'
        })
        res.send(cases);
    });

};


