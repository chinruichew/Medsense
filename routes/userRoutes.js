const mongoose = require('mongoose');
const User = mongoose.model('users');

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
            if (err) { return res.send(err) }

            if (user) {
                user.points += req.body.score;
                user.save();
                return res.send({points: user.points});
            }
        });
    });

    app.get('/api/getLeadersWithHighestScores', function(req, res) {
        User.find().sort('-points').limit(5).exec(function (err, users) {
            res.send(users);
        });
    });
};