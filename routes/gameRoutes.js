const mongoose = require('mongoose');
const User = require('../models/User');
const Case = require('../models/Case');
const Question = require('../models/Question');
const AnswerOverview = require('../models/AnswerOverview');
const MCQAnswer = require('../models/MCQAnswer');
const OpenEndedAnswer = require('../models/OpenEndedAnswer');
const constants = require('../utility/constantTypes');

module.exports = app => {

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
        const result = await Case.find({
            status: constants.CASE_STATUS_VETTED,
            speciality: req.body.speciality,
            subspeciality: { $all: req.body.subspeciality }
        }).select().populate({
            path: 'authorid',
            model: 'users'
        });
        res.send(result);
    });

    app.get('/api/fetchAllAnswers', async(req, res) => {
        const answers = await Answer.find().select();
        res.send(answers);
    });

    app.get('/api/getIndividualAnswers', function(req, res) {
        Answer.find({completionStatus: true}).populate({
            path: 'caseid',
            model: 'cases',
            populate: {
                path: 'questions',
                model: 'questions'
            }
        }).populate({
            path: 'userid',
            model: 'users'
        }).populate({
            path: 'questions',
            model: 'questionanswers'
        }).exec(function(error, answers) {
            let filteredAnswers = [];
            for(let i = 0; i < answers.length; i++) {
                const answer = answers[i];
                if(String(answer.userid._id) === req.session.user._id) {
                    filteredAnswers.push(answer);
                }
            }
            res.send(filteredAnswers);
        });
    });

    app.post('/api/completeGame', async(req, res) => {
        const values = req.body.values;
        console.log(values);

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