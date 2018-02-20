const mongoose = require('mongoose');
const User = mongoose.model('users');
const Case = mongoose.model('cases');

const constants = require('../utility/constantTypes');

module.exports = app => {
    app.post('/api/signup', function (req, res) {
        const values = req.body;
        User.findOne({ username: values.username}, null, {collation: {locale: 'en', strength: 2 }}, function (err, user) {
            if (!user) {
                const newUser = new User();
                newUser.username = values.username;
                newUser.password = newUser.generateHash(values.password);
                newUser.usertype = constants.USER_TYPE_STUDENT;
                newUser.school = values.school;
                newUser.year = values.year;
                newUser.save();
                res.send('Done');
            } else {
                res.send('User Exists');
            }
        });
    });

    app.post('/api/updateStudent', function (req, res) {
        User.findById(req.body.values.id, function (err, user) {
            if (err) { return res.send(err) }
            if (user) {
                user.year = req.body.values.year;
                user.school = req.body.values.school;
                user.save();

                // Set session user profile
                req.session.user.school = req.body.values.school;
                req.session.user.year = req.body.values.year;

                res.send(user);
            }

        });
    });

    app.post('/api/updateProfessor', function (req, res) {
        User.findById(req.body.values.id, function (err, user) {
            if (err) { return res.send(err) }
            if (user) {
                user.school = req.body.values.school;
                user.speciality = req.body.values.speciality;
                user.subspeciality = req.body.values.subspeciality;
                user.save();

                // Set session user profile
                req.session.user.school = req.body.values.school;
                req.session.user.speciality = req.body.values.speciality;
                req.session.user.subspeciality = req.body.values.subspeciality;

                res.send(user);
            }
        });
    });

    app.get('/api/getSubSpeciality', function(req, res) {
        User.findById(req.session.user._id, function(err, user) {
            res.send(user.subspeciality);
        });
    });

    // Update points of User
    app.post('/api/updateUserPoints', function(req, res) {
        User.findById(req.session.user._id, function (err, user) {
            if (err) {
                res.send(err);
            }

            if (user) {
                user.points += req.body.score;
                user.save();
                req.session.user.points = user.points;
                res.send({points: user.points});
            }
        });
    });

    // Get leaders with highest scores
    app.get('/api/getLeadersWithHighestScores', function(req, res) {
        User.find().sort('-points').limit(5).exec(function (err, users) {
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
            while (counter < 5) {
                let max = 0;
                for(const key in leaders) {
                    if(leaders[key] > max) {
                        max = leaders[key];
                    }
                }
                for(const key in leaders) {
                    if(counter < 5) {
                        if(leaders[key] === max) {
                            sortedLeaders[key] = leaders[key];
                            counter += 1;
                            delete leaders.key;
                        }
                    } else {
                        break;
                    }
                }
            }
            res.send(sortedLeaders);
        });
    });
};