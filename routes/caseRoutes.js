const mongoose = require('mongoose');
const Case = require('../models/Case');
const Question = require('../models/Question');
const Option = require('../models/Option');

const constants = require('../utility/constantTypes');

module.exports = app => {
    app.post('/api/uploadCase', async (req, res) => {
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

        await newCase.save();

        const jsonObject = req.body.values.qnData;

        let questions=[];
        let options = [];
        for (const prop in jsonObject) {
            const optionData = jsonObject[prop]['optionData'];
            for(let i = 0; i < optionData.length; i++) {
                const optionDaten = optionData[i];
                options.push({
                    optionId: optionDaten.id,
                    case: newCase._id,
                    qnId: jsonObject[prop]['id'],
                    mcq: optionDaten.mcq,
                    check: optionDaten.check
                });
            }
            const newQuestion = new Question({
                id: jsonObject[prop]['id'],
                stem: jsonObject[prop]['stem'],
                question: jsonObject[prop]['question'],
                attachment: null,
                pearlAttachment: null,
                type: jsonObject[prop]['type'],
                pearl: jsonObject[prop]['pearl'],
                time: jsonObject[prop]['time'],
                reference: jsonObject[prop]['reference'],
                mark: jsonObject[prop]['mark'],
                openEnded: jsonObject[prop]['openEnded'],
                case: newCase._id
            });
            questions.push(newQuestion);
        }

        // Batch insertion
        Question.insertMany(questions).then(updatedQuestions => {
            for(let i = 0; i < updatedQuestions.length; i++) {
                const updatedQuestion = updatedQuestions[i];
                for(let j = 0; j < options.length; j++) {
                    const option = options[j];
                    if(option.qnId === updatedQuestion.id) {
                        option[j].question = updatedQuestion._id;
                        break;
                    }
                }
            }
            Option.insertMany(options).then(updatedOptions => {
                newCase.questions = questions;
                newCase.save().then(docs => {
                    res.send({ data: {case:newCase._id, question:questions}, message: "uploadCase success" });
                }).catch(err => {
                    throw(err);
                });
            }).catch(err => {
                throw(err);
            });
        }).catch(err => {
            throw(err);
        });
    });

    // Case Vetting
    app.post('/api/updateCase', function (req, res) {
        Case.findById(req.body.values.id, async (err, oneCase) => {
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
            await oneCase.save();

            const qnData = req.body.values.qnData;

            let questions=[];
            let bulk = Question.collection.initializeUnorderedBulkOp();
            for(let i = 0; i < qnData.length; i++) {
                const question = qnData[i];
                const updatedQuestion = {
                    id : question.id,
                    question : question.question,
                    attachment : null,
                    pearlAttachment : null,
                    type : question.type,
                    pearl : question.pearl,
                    time : question.time,
                    reference : question.reference,
                    stem : question.stem,
                    mark : question.mark,
                    case: req.body.values.id
                };
                bulk.find({_id: question._id}).update({$set: updatedQuestion});
                questions.push(question._id);
            }

            // Initiate bulk update operation
            bulk.execute(async(err) => {
                if(err) {
                    throw(err);
                }
                oneCase.questions = questions;
                await oneCase.save();
                res.send({data: {case:oneCase._id, questions:questions}, message: "updateCase success"});
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
                if(vettedCase.vetTime !== null) {
                    const caseDate = new Date(vettedCase.vetTime.toLocaleString());
                    if(caseDate > lastLogin) {
                        pendingCases.push(vettedCase);
                    }
                }
            }
        }
        res.send(pendingCases);
    });
};