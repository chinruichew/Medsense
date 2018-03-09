const Case = require('../models/Case');
const Question = require('../models/Question');
const AnswerOverview = require('../models/AnswerOverview');
const MCQAnswer = require('../models/MCQAnswer');
const OpenEndedAnswer = require('../models/OpenEndedAnswer');
const constants = require('../utility/constantTypes');

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
        Case.count({ status: 'Vetted' }).exec(function (err, count) {

            // Get a random entry
            const random = Math.floor(Math.random() * count);

            // Again query all cases but only fetch one offset by our random #
            Case.findOne({ status: 'Vetted' }).skip(random).exec(
                function (err, result) {
                    res.send(result);
                })
        })

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
            model: 'questions'
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
        console.log('Case Challenge Final details:' + '\n' + values);

        // Insert MCQ Answers
        MCQAnswer.collection.insert(values.mcqAnswers, async(err, mcqAnswers) => {
            if(err) {
                throw err;
            }

            const mcqAnswersIds = mcqAnswers.insertedIds;

            // Insert Open-ended Answers
            OpenEndedAnswer.collection.insert(values.openEndedAnswers, async(err, openEndedAnswers) => {
                if(err) {
                    throw err;
                }

                const openEndedAnswersIds = openEndedAnswers.insertedIds;

                // Get array of mcqAnswerIds
                const mcqAnswersArray = [];
                for(let key in mcqAnswersIds) {
                    mcqAnswersArray.push(mcqAnswersIds[key]);
                }

                // Get array of openEndedAnswerIds
                const openEndedAnswersArray = [];
                for(let key in openEndedAnswersIds) {
                    openEndedAnswersArray.push(openEndedAnswersIds[key]);
                }

                // Insert Answer Overview
                const answerOverview = new AnswerOverview({
                    ...values.gameOverview,
                    user: req.session.user._id,
                    mcqAnswers: mcqAnswersArray,
                    openEndedAnswers: openEndedAnswersArray
                });
                await answerOverview.save();

                res.send('Done');
            });
        });
    });

    app.post('/api/getGameAttempt', async(req, res) => {
        const gameCase = req.body.case;
        let attempt = 0;
        AnswerOverview.findOne({ caseid: gameCase._id, completionStatus: true, userid: req.session.user._id}).sort({attempt:-1}).exec(function(err, completedCase) {
            if(completedCase) {
                attempt = completedCase.attempt;
            }
            res.send('' + (attempt + 1));
        });
    });
};