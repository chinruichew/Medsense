const mongoose = require('mongoose');
const User = require('../models/User');
const Case = require('../models/Case');
const Question = require('../models/Question');

const constants = require('../utility/constantTypes');

module.exports = app => {
    app.post('/api/uploadCase', function (req, res) {
        let vetTime = null;
        let caseStatus = constants.CASE_STATUS_PENDING;
        if(req.session.user.usertype === constants.USER_TYPE_PROFESSOR) {
            caseStatus = constants.CASE_STATUS_VETTED;
            vetTime = new Date();
        }
        const newCase = new Case({
            title: req.body.values.title,
            difficulty: req.body.values.difficulty,
            speciality: req.body.values.speciality,
            scenario: req.body.values.scenario,
            learning: req.body.values.learning,
            uploadTime: new Date(),
            authorid: mongoose.Types.ObjectId(req.body.values.authid),
            authorname: req.body.values.authname,
            status: caseStatus,
            vetTime: vetTime
        });

        for (const key in req.body.values.approach) {
            newCase.approach.push(req.body.values.approach[key]);
        }

        for (const key in req.body.values.subspeciality) {
            newCase.subspeciality.push(req.body.values.subspeciality[key]);
        }

        const jsonObject = req.body.values.qnData;

        let questions=[];
        for (const prop in jsonObject) {
            const newQuestion = new Question({
                id: jsonObject[prop]['id'],
                stem: jsonObject[prop]['stem'],
                question: jsonObject[prop]['question'],
                attachment: null,
                pearlAttachment: null,
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
                mcq7: jsonObject[prop]['mcq7'],
                mcq8: jsonObject[prop]['mcq8'],
                mcq9: jsonObject[prop]['mcq9'],
                mcq10: jsonObject[prop]['mcq10'],
                check1: jsonObject[prop]['check1'],
                check2: jsonObject[prop]['check2'],
                check3: jsonObject[prop]['check3'],
                check4: jsonObject[prop]['check4'],
                check5: jsonObject[prop]['check5'],
                check6: jsonObject[prop]['check6'],
                check7: jsonObject[prop]['check7'],
                check8: jsonObject[prop]['check8'],
                check9: jsonObject[prop]['check9'],
                check10: jsonObject[prop]['check10'],
                mark: jsonObject[prop]['mark'],
                case: newCase._id
            });
            newQuestion.save();
            newCase.questions.push(newQuestion._id);
            newCase.save();
            questions.push(newQuestion);
        }
        return res.send({ data: {case:newCase._id, question:questions}, message: "uploadCase success" });
    });

    function putQuestions(prop, oneCase, questions) {
        return new Promise(resolve => {
            Question.findById(prop['_id'], function (err, oneQuestion) {
                if (oneQuestion) {
                    oneQuestion.id = prop['id'];
                    oneQuestion.question = prop['question'];
                    oneQuestion.attachment = null;
                    oneQuestion.pearlAttachment = null;
                    oneQuestion.type = prop['type'];
                    oneQuestion.openEnded = prop['openEnded'];
                    oneQuestion.pearl = prop['pearl'];
                    oneQuestion.time = prop['time'];
                    oneQuestion.reference = prop['reference'];
                    oneQuestion.stem = prop['stem'];
                    oneQuestion.mcq1 = prop['mcq1'];
                    oneQuestion.mcq2 = prop['mcq2'];
                    oneQuestion.mcq3 = prop['mcq3'];
                    oneQuestion.mcq4 = prop['mcq4'];
                    oneQuestion.mcq5 = prop['mcq5'];
                    oneQuestion.mcq6 = prop['mcq6'];
                    oneQuestion.mcq7 = prop['mcq7'];
                    oneQuestion.mcq8 = prop['mcq8'];
                    oneQuestion.mcq9 = prop['mcq9'];
                    oneQuestion.mcq10 = prop['mcq10'];
                    oneQuestion.check1 = prop['check1'];
                    oneQuestion.check2 = prop['check2'];
                    oneQuestion.check3 = prop['check3'];
                    oneQuestion.check4 = prop['check4'];
                    oneQuestion.check5 = prop['check5'];
                    oneQuestion.check6 = prop['check6'];
                    oneQuestion.check7 = prop['check7'];
                    oneQuestion.check8 = prop['check8'];
                    oneQuestion.check9 = prop['check9'];
                    oneQuestion.check10 = prop['check10'];
                    oneQuestion.mark = prop['mark'];
                    oneQuestion.save();
                    questions.push(oneQuestion);
                }
                if (!oneQuestion) {
                    const newQuestion = new Question({
                        id: prop['id'],
                        stem: prop['stem'],
                        question: prop['question'],
                        attachment: null,
                        pearlAttachment: null,
                        type: prop['type'],
                        openEnded: prop['openEnded'],
                        pearl: prop['pearl'],
                        time: prop['time'],
                        reference: prop['reference'],
                        mcq1: prop['mcq1'],
                        mcq2: prop['mcq2'],
                        mcq3: prop['mcq3'],
                        mcq4: prop['mcq4'],
                        mcq5: prop['mcq5'],
                        mcq6: prop['mcq6'],
                        mcq7: prop['mcq7'],
                        mcq8: prop['mcq8'],
                        mcq9: prop['mcq9'],
                        mcq10: prop['mcq10'],
                        check1: prop['check1'],
                        check2: prop['check2'],
                        check3: prop['check3'],
                        check4: prop['check4'],
                        check5: prop['check5'],
                        check6: prop['check6'],
                        check7: prop['check7'],
                        check8: prop['check8'],
                        check9: prop['check9'],
                        check10: prop['check10'],
                        mark: prop['mark'],
                        case: oneCase._id
                    });
                    newQuestion.save();
                    oneCase.questions.push(newQuestion._id);
                    oneCase.save();
                    questions.push(newQuestion);
                }
                resolve("Done");
            });
        });
    }

    app.post('/api/updateCase', function (req, res) {
        Case.findById(req.body.values.id, function (err, oneCase) {
            oneCase.title = req.body.values.title;
            oneCase.difficulty = req.body.values.difficulty;
            oneCase.speciality = req.body.values.speciality;

            oneCase.approach = [];
            oneCase.subspeciality = [];

            for (const key in req.body.values.approach) {
                oneCase.approach.push(req.body.values.approach[key]);
            }

            for (const key in req.body.values.subspeciality) {
                oneCase.subspeciality.push(req.body.values.subspeciality[key]);
            }

            oneCase.scenario = req.body.values.scenario;
            oneCase.learning = req.body.values.learning;
            oneCase.vetter = req.body.values.authid;
            oneCase.status = constants.CASE_STATUS_VETTED;
            oneCase.vetTime = new Date();
            oneCase.save();

            const jsonObject = req.body.values.qnData;

            let questions=[];
            const Promise = require("bluebird");
            const p = Promise.resolve();
            jsonObject.forEach(function(prop, index, arr) {
                p.then(new Promise(function(resolve, reject) {
                    putQuestions(prop, oneCase, questions).then(response => {
                        res.send({data: {case:oneCase._id, question:questions}, message: "uploadCase success"});
                        resolve();
                    });
                }));
            });
            p.then(function(){
                // console.log('Final: ', questions);
            });
        });
    });

    app.post('/api/lockCaseForVetting', async(req, res) => {
        Case.update({ _id: req.body.vetId }, { $set: { vetter: req.session.user._id } }, function (err, response) {
            if(err) {
                console.log(err);
            }

            res.send(response);
        });
    });

    app.get('/api/fetchUnvetCases', async (req, res) => {
        Case.find({ $or: [{status: 'Pending'}, {status: 'Vetting'}] }).populate({
            path: 'authorid',
            model: 'users'
        }).exec(function(error, cases) {
            res.send(cases);
        });
    });

    app.get('/api/fetchVettedCases', async (req, res) => {
        Case.find({ status: 'Vetted' }).populate({
            path: 'authorid',
            model: 'users',
        }).populate({
            path: 'questions',
            model: 'questions',
        }).exec(function(error, cases) {
            res.send(cases);
        });
    });

    app.post('/api/fetchCaseById', async (req, res) => {
        const cases = await Case.findOne({ _id: req.body.values.vetId }).select().populate({
            path: 'questions',
            model: 'questions'
        });
        res.send(cases);
    });

    app.get('/api/getVettedCasesSinceUserLogin', async(req, res) => {
        const cases = await Case.find({ status: constants.CASE_STATUS_VETTED }).select().populate({
            path: 'questions',
            model: 'questions'
        });
        const user = req.session.user;
        const pendingCases = [];
        if(user.previousLogin !== null) {
            const lastLogin = new Date(user.previousLogin);
            for(let i = 0; i < cases.length; i++) {
                const vettedCase = cases[i];
                const caseDate = new Date(vettedCase.vetTime.toLocaleString());
                if(caseDate > lastLogin) {
                    pendingCases.push(vettedCase);
                }
            }
        }
        res.send(pendingCases);
    });
};


