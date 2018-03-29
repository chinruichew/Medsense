const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const User = mongoose.model('users');
const Case = mongoose.model('cases');
const AnswerOverview = require('../models/AnswerOverview');
const keys = require('../config/keys');
const constants = require('../utility/constantTypes');
const commonMethods = require('../utility/commonMethods');

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
                newUser.email = newUser.generateHash(values.email);
                newUser.save();
                res.send('Done');
            } else {
                res.send('User Exists');
            }
        });
    });

    app.post('/api/resetPassword', async(req, res) => {
        const email = req.body.email;
        const username = req.body.username;
        User.findOne({ username: username }, null, {collation: {locale: 'en', strength: 2 }}, async (err, user) => {
            if(err) {
                throw(err);
            }

            if(user !== null && user.validEmail(email)) {
                // Reset password
                const buf = new Buffer(10);
                for (let i = 0; i < buf.length; i++) {
                    buf[i] = Math.floor(Math.random() * 256);
                }
                const password = buf.toString('base64');

                user.password = user.generateHash(password);
                await user.save();

                // Generate email
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: keys.medsenseEmailUsername,
                        pass: keys.medsenseEmailPassword
                    }
                });
                const mailOptions = {
                    from: keys.medsenseEmailUsername,
                    to: email,
                    subject: 'Resetting of password',
                    html: '<h1>Your password has been reset!</h1><p>Your new password is: ' + password + '</p>'
                };
                transporter.sendMail(mailOptions, function(err, info){
                    if (err) {
                        throw(err);
                    }

                    // Do not erase - Production Logging
                    console.log('Email sent: ' + info.response);
                    res.send('Done');
                });
            } else {
                res.send('Invalid Username/Email!');
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

    app.post('/api/updateName', function (req, res) {
        User.findById(req.session.user._id, function (err, user) {
            if (err) { return res.send(err) }
            if (user) {
                user.name = req.body.values;
                user.save();
                res.send("name saved");
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
        User.findById(req.session.user._id, async (err, user) => {
            if (err) {
                res.send(err);
            }

            if (user) {
                user.points += req.body.xp;
                await user.save();
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

    app.get('/api/calculateUserLevel', async(req, res) => {
        const xp = req.query.xp;
        const level = await commonMethods.CALCULATE_USER_LEVEL(xp);
        res.send(String(level));
    });

    app.get('/api/getLevelRank', async(req, res) => {
        const level = req.query.level;
        const rank = await commonMethods.CALCULATE_USER_RANK(level);
        res.send(String(rank));
    });

    app.get('/api/getContributionRank', async(req, res) => {
        const points = parseInt(req.query.points,10);
        const rank = await commonMethods.CALCULATE_CONTRIBUTION_RANK(points);
        res.send(String(rank));
    });

    app.post('/api/calculateContributionPoints', function (req, res){
        let points;
        let numUploads = 0;
        let numGames = 0;
        Case.count({ vetter: req.session.user._id }).exec(async (err, count) => {
            points = 0.2 * count;
            const uploads = await Case.find({ authorid: req.session.user._id }).select();
            for (let i=0;i<uploads.length;i++){
                numUploads += 1;
                let upload = uploads[i];
                if (upload.status === "Vetted"){
                    const games = await AnswerOverview.find({ case: upload._id }).exec();
                    numGames += games.length;
                }
            }
            points += 0.3*numUploads+0.5*numGames;
            console.log(numUploads, points);
            res.send(String(points));
        });
    });
};