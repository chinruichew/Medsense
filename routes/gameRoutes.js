const Case = require('../models/Case');
const AnswerOverview = require('../models/AnswerOverview');
const MCQAnswer = require('../models/MCQAnswer');
const MCQAnswerOption = require('../models/MCQAnswerOption');
const OpenEndedAnswer = require('../models/OpenEndedAnswer');

const keys = require('../config/keys');
const constants = require('../utility/constantTypes');
const commonMethods = require('../utility/commonMethods');

module.exports = app => {
    app.post('/api/fetchCasesApproach', async (req, res) => {
        let list=[];
        const approaches = await Case.find({status:"Vetted"});
        approaches.forEach(function (obj) {
            obj.approach.forEach(function (approach) {
                if(!list.includes(approach)){
                    list = list.concat(approach);
                }
            });
        });
        res.send(list);
    });

    app.post('/api/fetchCasesSpeciality', async (req, res) => {
        let list=[];
        const specialities = await Case.find({status:"Vetted"});
        specialities.forEach(function (obj) {
            if(!list.includes(obj.speciality)){
                list = list.concat(obj.speciality);
            }
        });
        res.send(list);
    });

    app.post('/api/fetchCasesSubspeciality', async (req, res) => {
        let list=[];
        const subspecialities = await Case.find({status:"Vetted", "speciality":req.body.speciality});
        subspecialities.forEach(function (obj) {
            obj.subspeciality.forEach(function (subspeciality) {
                if(!list.includes(subspeciality)){
                    list = list.concat(subspeciality);
                }
            });
        });
        res.send(list);
    });

    app.get('/api/fetchRandomCase', async (req, res) => {
        // Get the count of all cases
        Case.count({ status: 'Vetted' }).exec(async (err, count) =>{

            // Get a random entry
            const random = Math.floor(Math.random() * count);

            // Again query all cases but only fetch one offset by our random #
            const result = await Case.findOne({ status: 'Vetted' }).skip(random).select().populate({
                path: 'authorid',
                model: 'users'
            });
            res.send(result);
        });

    });

    app.post('/api/fetchCaseByApproach', async (req, res) => {
        const result = await Case.find({ status: 'Vetted', approach: { $all: req.body.approach } }).select().populate({
            path: 'authorid',
            model: 'users'
        });
        res.send(result);
    });

    app.post('/api/fetchGameById', async (req, res) => {
        const result = await Case.findOne({ _id: req.body.id }).select().populate({
            path: 'questions',
            model: 'questions',
            populate: {
                path: 'options',
                model: 'options'
            }
        });
        res.send(result);
    });

    app.post('/api/fetchCaseBySpeciality', async (req, res) => {
        let result;
        if (req.body.subspeciality==="Select One"){
            result = await Case.find({
                status: constants.CASE_STATUS_VETTED,
                speciality: req.body.speciality
            }).select().populate({
                path: 'authorid',
                model: 'users'
            });
        } else {
            result = await Case.find({
                status: constants.CASE_STATUS_VETTED,
                speciality: req.body.speciality,
                subspeciality: {$all: req.body.subspeciality}
            }).select().populate({
                path: 'authorid',
                model: 'users'
            });
        }
        res.send(result);
    });

    app.post('/api/completeGame', async(req, res) => {
        const values = req.body.values;

        // Do not erase - Production Logging
        console.log('Case Challenge Final details:');
        console.log(values);

        if(values.mcqAnswers.length > 0) {
            // Give id to each MCQ option
            const mcqAnswers = values.mcqAnswers;
            for(let i = 0; i < mcqAnswers.length; i++) {
                const mcqAnswer = mcqAnswers[i];
                const options = mcqAnswer.mcqAnswerOptions;
                const newOptions = [];
                for(let j = 0; j < options.length; j++) {
                    const option = options[j];
                    option.id = mcqAnswer.questionNumber;
                    newOptions.push(option);
                }
            }

            // Insert MCQ Answers
            let bulk = MCQAnswer.collection.initializeOrderedBulkOp();
            for(let i = 0; i < mcqAnswers.length; i++) {
                const mcqAnswer = {
                    score: mcqAnswers[i].score,
                    mark: mcqAnswers[i].mark,
                    startTime: mcqAnswers[i].questionStart,
                    endTime: mcqAnswers[i].questionEnd,
                    question: mcqAnswers[i].questionId,
                    answerCount: mcqAnswers[i].answerCount,
                    correctAnswerCount: mcqAnswers[i].stuCorrectAnswerCount,
                    id: mcqAnswers[i].questionNumber
                };
                bulk.insert(mcqAnswer);
            }

            bulk.execute(async(err, result) => {
                if (err) {
                    throw(err);
                }

                const mcqAnswerIds = result.getInsertedIds();

                MCQAnswer.find({
                    '_id': { $in: mcqAnswerIds}
                }, function(err, updatedMcqAnswers){
                    for(let i = 0; i < mcqAnswers.length; i++) {
                        const mcqAnswer = mcqAnswers[i];
                        const options = mcqAnswer.mcqAnswerOptions;
                        for(let j = 0; j < options.length; j++) {
                            const option = options[j];
                            for(let k = 0; k < updatedMcqAnswers.length; k++) {
                                const updatedMcqAnswer = updatedMcqAnswers[k];
                                if(updatedMcqAnswer.id === option.id) {
                                    mcqAnswer._id = updatedMcqAnswer._id;
                                    option.answer = updatedMcqAnswer._id;
                                    break;
                                }
                            }
                        }
                    }

                    // Insert MCQ Answer options
                    let bulk = MCQAnswerOption.collection.initializeOrderedBulkOp();
                    for(let i = 0; i < mcqAnswers.length; i++) {
                        const mcqAnswer = mcqAnswers[i];
                        const options = mcqAnswer.mcqAnswerOptions;
                        for(let j = 0; j < options.length; j++) {
                            const option = options[j];
                            bulk.insert(option);
                        }
                    }

                    bulk.execute(async(err, result) => {
                        if (err) {
                            throw(err);
                        }

                        const mcqAnswerOptionsIds = result.getInsertedIds();
                        MCQAnswerOption.find({
                            '_id': { $in: mcqAnswerOptionsIds}
                        }, async(err, mcqAnswerOptions) => {
                            for(let i = 0; i < mcqAnswerOptions.length; i++) {
                                const mcqAnswerOption = mcqAnswerOptions[i];
                                const mcqAnswerId = mcqAnswerOption.answer;
                                for(let j = 0; j < mcqAnswers.length; j++) {
                                    const mcqAnswer = mcqAnswers[j];
                                    if(mcqAnswer._id === mcqAnswerId) {
                                        mcqAnswer.answerOptions.push(mcqAnswerOption._id);
                                        break;
                                    }
                                }
                            }

                            let bulk = MCQAnswer.collection.initializeOrderedBulkOp();
                            for(let i = 0; i < mcqAnswers.length; i++) {
                                const mcqAnswer = mcqAnswers[i];
                                bulk.find({_id: mcqAnswer._id}).update({$set: mcqAnswer});
                            }

                            bulk.execute(async(err, result) => {
                                if (err) {
                                    throw(err);
                                }

                                if(values.openEndedAnswers.length > 0) {
                                    // Insert Open-Ended answers
                                    let bulk = OpenEndedAnswer.collection.initializeOrderedBulkOp();
                                    for(let i = 0; i < values.openEndedAnswers.length; i++) {
                                        const openEndedAnswer = values.openEndedAnswers[i];
                                        const value = {
                                            id: openEndedAnswer.questionNumber,
                                            mark: openEndedAnswer.mark,
                                            score: openEndedAnswer.score,
                                            startTime: openEndedAnswer.questionStart,
                                            endTime: openEndedAnswer.questionEnd,
                                            question: openEndedAnswer.questionId,
                                            nlpAccuracy: openEndedAnswer.nlpAccuracy,
                                            studentAnswer: openEndedAnswer.studentAnswer
                                        };
                                        bulk.insert(value);
                                    }

                                    bulk.execute(async(err, result) => {
                                        if (err) {
                                            throw(err);
                                        }

                                        // Get proper array of MCQ Answer Ids
                                        const mcqAnswerArray = [];
                                        for(let i = 0; i < mcqAnswerIds.length; i++) {
                                            const mcqAnswerId = mcqAnswerIds[i];
                                            mcqAnswerArray.push(mcqAnswerId._id);
                                        }

                                        // Get proper array of open-ended Answer Ids
                                        const openEndedAnswerIds = result.getInsertedIds();
                                        const openEndedAnswerArray = [];
                                        for(let i = 0; i < openEndedAnswerIds.length; i++) {
                                            const openEndedAnswerId = openEndedAnswerIds[i];
                                            openEndedAnswerArray.push(openEndedAnswerId._id);
                                        }

                                        // Insert Answer Overview
                                        const answerOverview = new AnswerOverview({
                                            ...values.gameOverview,
                                            user: req.session.user._id,
                                            mcqAnswers: mcqAnswerArray,
                                            openEndedAnswers: openEndedAnswerArray
                                        });
                                        await answerOverview.save();

                                        // Generate alert email
                                        const email = keys.medsenseTeamEmail;
                                        const subject = 'Case Challenge Alert';
                                        const htmlText = '<h1>' + req.session.user.username + ' has completed a case challenge!</h1>';
                                        commonMethods.SEND_AUTOMATED_EMAIL(email, subject, htmlText);

                                        res.send('Done');
                                    });
                                } else {
                                    // Get proper array of MCQ Answer Ids
                                    const mcqAnswerArray = [];
                                    for(let i = 0; i < mcqAnswerIds.length; i++) {
                                        const mcqAnswerId = mcqAnswerIds[i];
                                        mcqAnswerArray.push(mcqAnswerId._id);
                                    }

                                    // Insert Answer Overview
                                    const answerOverview = new AnswerOverview({
                                        ...values.gameOverview,
                                        user: req.session.user._id,
                                        mcqAnswers: mcqAnswerArray,
                                        openEndedAnswers: []
                                    });
                                    await answerOverview.save();

                                    // Generate alert email
                                    const email = keys.medsenseTeamEmail;
                                    const subject = 'Case Challenge Alert';
                                    const htmlText = "<h1>" + req.session.user.username + " has completed a case challenge!</h1>"
                                            + "<p> Attempt: " + values.gameOverview.attempt + "</p>"
                                            + "<p> User's Score: " + values.gameOverview.score + "</p>";
                                    commonMethods.SEND_AUTOMATED_EMAIL(email, subject, htmlText);

                                    res.send('Done');
                                }
                            });
                        });
                    });
                });
            });
        } else {
            // Insert Open-Ended answers
            let bulk = OpenEndedAnswer.collection.initializeOrderedBulkOp();
            for(let i = 0; i < values.openEndedAnswers.length; i++) {
                const openEndedAnswer = values.openEndedAnswers[i];
                const value = {
                    id: openEndedAnswer.questionNumber,
                    mark: openEndedAnswer.mark,
                    score: openEndedAnswer.score,
                    startTime: openEndedAnswer.questionStart,
                    endTime: openEndedAnswer.questionEnd,
                    question: openEndedAnswer.questionId,
                    nlpAccuracy: openEndedAnswer.nlpAccuracy,
                    studentAnswer: openEndedAnswer.studentAnswer
                };
                bulk.insert(value);
            }

            bulk.execute(async(err, result) => {
                if (err) {
                    throw(err);
                }

                // Get proper array of open-ended Answer Ids
                const openEndedAnswerIds = result.getInsertedIds();
                const openEndedAnswerArray = [];
                for(let i = 0; i < openEndedAnswerIds.length; i++) {
                    const openEndedAnswerId = openEndedAnswerIds[i];
                    openEndedAnswerArray.push(openEndedAnswerId._id);
                }

                // Insert Answer Overview
                const answerOverview = new AnswerOverview({
                    ...values.gameOverview,
                    user: req.session.user._id,
                    mcqAnswers: [],
                    openEndedAnswers: openEndedAnswerArray
                });
                await answerOverview.save();

                // Generate alert email
                const email = keys.medsenseTeamEmail;
                const subject = 'Case Challenge Alert';
                const htmlText = '<h1>' + req.session.user.username + ' has completed a case challenge!</h1>';
                commonMethods.SEND_AUTOMATED_EMAIL(email, subject, htmlText);

                res.send('Done');
            });
        }
    });

    app.post('/api/getGameAttempt', async(req, res) => {
        const gameCase = req.body.case;
        let attempt = 0;
        AnswerOverview.findOne({ case: gameCase._id, user: req.session.user._id}).sort({attempt:-1}).exec(async(err, completedCase) => {
            if(err) {
                console.log(err);
            }

            if(completedCase) {
                attempt = completedCase.attempt;
            }

            res.send('' + (attempt + 1));
        });
    });
};