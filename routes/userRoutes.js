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

    app.post('/api/updateUserfromYearlyPrompt', async(req, res) => {
        User.findById(req.session.user._id, async (err, user) => {
            if (err) {
                throw(err);
            }

            if (user) {
                user.year = req.body.year;
                await user.save();

                // Set session user profile
                req.session.user.year = req.body.year;

                res.send(user);
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

    app.get('/api/checkUserToUpdateYear', async(req, res) => {
        let toPromptUpdateYear = false;
        switch(req.session.user.year) {
            case constants.STUDENT_YEAR_ONE:
                toPromptUpdateYear = new Date().getMonth() === 8;
                break;
            case constants.STUDENT_YEAR_TWO:
                toPromptUpdateYear = new Date().getMonth() === 6;
                break;
            case constants.STUDENT_YEAR_THREE:
                toPromptUpdateYear = new Date().getMonth() === 7;
                break;
            case constants.STUDENT_YEAR_FOUR:
                toPromptUpdateYear = new Date().getMonth() === 6;
                break;
        }
        res.send(toPromptUpdateYear);
    });
};