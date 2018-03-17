const Case = require('../models/Case');
const User = require('../models/User');
const AnswerOverview = require('../models/AnswerOverview');

const constants = require('../utility/constantTypes');

module.exports = app => {
    app.get('/api/getIndividualAnswers', function(req, res) {
        AnswerOverview.find().populate({
            path: 'case',
            model: 'cases',
            populate: {
                path: 'questions',
                model: 'questions'
            }
        }).populate({
            path: 'user',
            model: 'users'
        }).populate({
            path: 'mcqAnswers',
            model: 'mcqAnswers'
        }).populate({
            path: 'openEndedAnswers',
            model: 'openEndedAnswers'
        }).exec(function(err, answers) {
            if(err) {
                throw err;
            }

            let filteredAnswers = [];
            for(let i = 0; i < answers.length; i++) {
                const answer = answers[i];
                if(String(answer.user._id) === req.session.user._id) {
                    filteredAnswers.push(answer);
                }
            }

            // Do not delete - production logging
            console.log('Student case statistics:');
            console.log(filteredAnswers);

            res.send(filteredAnswers);
        });
    });

    // Get leaders with highest scores
    app.get('/api/getLeadersWithHighestScores', function(req, res) {
        User.find({usertype: constants.USER_TYPE_STUDENT}).sort('-points').limit(5).exec(function (err, users) {
            res.send(users);
        });
    });

    // Get leaders with highest contributions
    app.get('/api/getLeadersWithHighestContributions', function(req, res) {
        Case.find().populate({
            path: 'authorid',
            model: 'users',
        }).exec(function (err, cases) {
            const leaders = {};
            for(let i = 0; i < cases.length; i++) {
                const uploadedCase = cases[i];
                if(leaders[uploadedCase.authorid.username] === undefined) {
                    leaders[uploadedCase.authorid.username] = 0;
                }
                const num = leaders[uploadedCase.authorid.username];
                leaders[uploadedCase.authorid.username] = num + 1;
            }
            const sortedLeaders = {};
            let counter = 0;
            let maxCounter = 5;
            if(Object.keys(leaders).length < 5) {
                maxCounter = Object.keys(leaders).length;
            }
            while (counter < maxCounter) {
                let max = 0;
                for(const key in leaders) {
                    if(leaders[key] > max) {
                        max = leaders[key];
                    }
                }
                for(const key in leaders) {
                    if(counter < maxCounter) {
                        if(leaders[key] === max) {
                            sortedLeaders[key] = leaders[key];
                            counter += 1;
                            delete leaders[key];
                        }
                    } else {
                        break;
                    }
                }
            }
            res.send(sortedLeaders);
        });
    });

    app.get('/api/getCaseAnswerById', async(req, res) => {
        const id = req.query.id;
        AnswerOverview.findOne({_id: id}).populate({
            path: 'case',
            model: 'cases',
            populate: {
                path: 'questions',
                model: 'questions'
            }
        }).populate({
            path: 'user',
            model: 'users',
        }).exec(function(err, answer) {
            if(err) {
                throw(err);
            }
            res.send(answer);
        });
    });

    app.get('/api/fetchAnswers', async(req, res) => {
        AnswerOverview.find().populate({
            path: 'case',
            model: 'cases',
            populate: {
                path: 'questions',
                model: 'questions'
            }
        }).populate({
            path: 'mcqAnswers',
            model: 'mcqAnswers'
        }).populate({
            path: 'openEndedAnswers',
            model: 'openEndedAnswers'
        }).populate({
            path: 'user',
            model: 'users',
        }).exec(function(err, answer) {
            if(err) {
                throw(err);
            }
            res.send(answer);
        });
    });
};