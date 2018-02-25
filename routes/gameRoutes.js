const mongoose = require('mongoose');
const User = require('../models/User');
const Case = require('../models/Case');
const Question = require('../models/Question');
const Answer = require('../models/Answer');
const QuestionAnswer = require('../models/QuestionAnswer');
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
        const result = await Case.findOne({ _id: req.body.values }).select().populate({
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


    app.post('/api/storeCaseAnswer', async (req, res)=> {
        let attempt=0;
        Answer.findOne({ caseid: req.body.case._id, completionStatus: true, userid: req.body.authid}).sort({attempt:-1}).exec(function (err, completedCase) {
            if (completedCase){
                attempt = completedCase.attempt;
            }

            const newCaseAnswer = new Answer({
                attempt: attempt+1,
                userid: mongoose.Types.ObjectId(req.body.authid),
                date: req.body.date,
                title: req.body.case.title,
                difficulty: req.body.case.difficulty,
                speciality: req.body.case.speciality,
                approach: req.body.case.approach,
                subspeciality: req.body.case.subspeciality,
                scenario: req.body.case.scenario,
                learning: req.body.case.learning,
                status: req.body.case.status,
                caseid: mongoose.Types.ObjectId(req.body.case._id),
            });
            newCaseAnswer.save();
            return res.send({attempt: attempt+1});
        });
    });

    app.post('/api/storeCaseAnswerMCQ', function (req, res) {
        Answer.find({
            //_id: req.body.values.answerid,
            userid: req.body.values.authid,
            date: req.body.values.date
        }, function (err, answer) {
            const timeTaken = req.body.values.timeLimit-req.body.values.seconds;
            const newCaseQuestion = new QuestionAnswer({
                question: req.body.values.question,
                stem: req.body.values.stem,
                type: req.body.values.type,
                attachment: req.body.values.attachment,
                pearl: req.body.values.pearl,
                reference: req.body.values.reference,
                mcq1: req.body.values.mcq1,
                mcq2: req.body.values.mcq2,
                mcq3: req.body.values.mcq3,
                mcq4: req.body.values.mcq4,
                mcq5: req.body.values.mcq5,
                mcq6: req.body.values.mcq6,
                check1: req.body.values.check1Stu,
                check2: req.body.values.check2Stu,
                check3: req.body.values.check3Stu,
                check4: req.body.values.check4Stu,
                check5: req.body.values.check5Stu,
                check6: req.body.values.check6Stu,
                timeTaken: timeTaken,
                mark: req.body.values.mark,
                score: req.body.values.score,
            });
            newCaseQuestion.save();
            answer[0]['questions'].push(newCaseQuestion);
            answer[0].save();
        });
        return res.send({ data: {}, message: "storeCaseMCQ success" });
    });

    app.post('/api/storeCaseAnswerOpenEnded', function (req, res) {
        Answer.find({
            // _id: req.body.values.answerid,
            userid: req.body.values.authid,
            date: req.body.values.date
        }, function (err, answer) {
            const timeTaken = req.body.values.timeLimit-req.body.values.seconds;
            const newCaseQuestion = new QuestionAnswer({
                question: req.body.values.question,
                openEnded: req.body.values.openEnded,
                stem: req.body.values.stem,
                type: req.body.values.type,
                attachment: req.body.values.attachment,
                pearl: req.body.values.pearl,
                reference: req.body.values.reference,
                timeTaken: timeTaken,
                mark: req.body.values.mark,
                score: req.body.values.score,
            });
            newCaseQuestion.save();
            answer[0]['questions'].push(newCaseQuestion);
            answer[0].save();
        });
        return res.send({ data: {}, message: "storeCaseOpenEnded success" });
    });

    app.post('/api/gameCompleted', async (req, res) => {
        Answer.update({userid: req.body.authid, date: req.body.date}, {completionStatus: true, score: req.body.score}, function (err, response) {
        });
        res.send("completion status updated");
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
};