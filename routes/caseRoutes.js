const Case = require('../models/Case');
const Question = require('../models/Question');
const Option = require('../models/Option');
const User = require('../models/User');

const constants = require('../utility/constantTypes');
const commonMethods = require('../utility/commonMethods');

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
            authorid: req.session.user._id,
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
                    id: optionDaten.id,
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
                numOptions: jsonObject[prop]['numOptions'],
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
                let bulk = Question.collection.initializeUnorderedBulkOp();
                const finalQuestions = [];
                for(let i = 0; i < updatedQuestions.length; i++) {
                    const updatedQuestion = updatedQuestions[i];
                    const questionOptions = [];
                    for(let j = 0; j < updatedOptions.length; j++) {
                        const updatedOption = updatedOptions[j];
                        if(updatedOption.qnId === updatedQuestion.id) {
                            questionOptions.push(updatedOption._id);
                        }
                    }
                    updatedQuestion.options = questionOptions;
                    finalQuestions.push(updatedQuestion);
                    bulk.find({_id: updatedQuestion._id}).update({$set: updatedQuestion});
                }

                // Initiate bulk update operation
                bulk.execute(async(err) => {
                    if(err) {
                        throw(err);
                    }
                    newCase.questions = finalQuestions;
                    newCase.save().then(docs => {
                        // Insert Author name
                        if(req.body.values.author !== '') {
                            User.findByIdAndUpdate(req.session.user._id, {name: req.body.values.author}, async(err, user) => {
                                if(err) {
                                    console.log(err);
                                } else {
                                    req.session.user = user;
                                }
                            });
                        }

                        res.send({ data: {case:newCase._id, question:finalQuestions}, message: "uploadCase success" });
                    }).catch(err => {
                        throw(err);
                    });
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
            oneCase.vetter = req.session.user._id;
            oneCase.status = constants.CASE_STATUS_VETTED;
            oneCase.vetTime = new Date();
            await oneCase.save();

            const qnData = req.body.values.qnData;

            // Update or insert each option
            let bulk = Option.collection.initializeUnorderedBulkOp();
            const optionsToInsert = [];
            for(let i = 0; i < qnData.length; i++) {
                const question = qnData[i];
                const newQuestionOptions = question.optionData;
                for (let i = 0; i < newQuestionOptions.length; i++) {
                    const newQuestionOption = newQuestionOptions[i];
                    if (newQuestionOption._id === undefined) {
                        optionsToInsert.push(newQuestionOption);
                        bulk.insert({
                            ...newQuestionOption,
                            case: oneCase._id
                        });
                    } else {
                        bulk.find({_id: newQuestionOption._id}).update({$set: newQuestionOption});
                    }
                }
            }

            bulk.execute(async(err, result) => {
                if (err) {
                    throw(err);
                }

                const insertedOptionIds = result.getInsertedIds();
                for(let i = 0; i < optionsToInsert.length; i++) {
                    const optionToInsert = optionsToInsert[i];
                    optionToInsert._id = insertedOptionIds._id;
                }

                const questionObjectsToAdd = [];
                const questions=[];
                bulk = Question.collection.initializeUnorderedBulkOp();
                for(let i = 0; i < qnData.length; i++) {
                    const question = qnData[i];

                    const updatedQuestion = {
                        numOptions: question.numOptions,
                        openEnded: question.openEnded,
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
                        case: req.body.values.id,
                        options: question.optionData
                    };
                    if(question._id !== undefined && question._id !== null) {
                        bulk.find({_id: question._id}).update({$set: updatedQuestion});
                        questions.push(question._id);
                    } else {
                        questionObjectsToAdd.push(updatedQuestion);
                    }
                }

                // Add the new questions
                for(let i = 0; i < questionObjectsToAdd.length; i++) {
                    const questionObject = new Question({
                        ...questionObjectsToAdd[i]
                    });
                    await questionObject.save();
                    questions.push(questionObject);
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
            if(error) {
                console.log(err);
            }
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
            model: 'questions',
            populate: {
                path: 'options',
                model: 'options'
            }
        });
        res.send(cases);
    });

    app.get('/api/getCaseById', async (req, res) => {
        const cases = await Case.findOne({ _id: req.query.caseId }).select().populate({
            path: 'questions',
            model: 'questions',
            populate: {
                path: 'options',
                model: 'options'
            }
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