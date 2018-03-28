const User = require('../models/User');
const Case = require('../models/Case');
const Question = require('../models/Question');
const Approach = require('../models/Approach');
const constants = require('../utility/constantTypes');
const nodemailer = require('nodemailer');

const keys = require('../config/keys');

module.exports = app => {
    app.get('/api/fetchAdminUsers', async (req, res) => {
        const users = await User.find().select("-password");
        res.send(users);
    });

    app.post('/api/fetchFilteredAdminAdmins', async (req, res) => {
        let users;
        if (req.body.values.username === "") {
            users = await User.find({
                usertype: constants.USER_TYPE_ADMIN
            }).select("-password");
        } else {
            users = await User.find({
                username: { "$regex": req.body.values.username, "$options": "i" },
                usertype: constants.USER_TYPE_ADMIN
            }).select("-password");
        }
        console.log(users)
        res.send(users);
    });

    app.post('/api/fetchFilteredAdminStudents', async (req, res) => {
        let users;
        if (req.body.values.username === "") {
            if (req.body.values.school === "" && req.body.values.year === "") {
                users = await User.find({
                    usertype: constants.USER_TYPE_STUDENT
                }).select("-password");
            } else if (req.body.values.school === "") {
                users = await User.find({
                    usertype: constants.USER_TYPE_STUDENT,
                    year: req.body.values.year
                }).select("-password");
            } else if (req.body.values.year === "") {
                users = await User.find({
                    usertype: constants.USER_TYPE_STUDENT,
                    school: req.body.values.school
                }).select("-password");
            } else {
                users = await User.find({
                    usertype: constants.USER_TYPE_STUDENT,
                    school: req.body.values.school,
                    year: req.body.values.year
                }).select("-password");
            }
        } else {
            if (req.body.values.school === "" && req.body.values.year === "") {
                users = await User.find({
                    username: { "$regex": req.body.values.username, "$options": "i" },
                    usertype: constants.USER_TYPE_STUDENT
                }).select("-password");
            } else if (req.body.values.school === "") {
                users = await User.find({
                    username: { "$regex": req.body.values.username, "$options": "i" },
                    usertype: constants.USER_TYPE_STUDENT,
                    year: req.body.values.year
                }).select("-password");
            } else if (req.body.values.year === "") {
                users = await User.find({
                    username: { "$regex": req.body.values.username, "$options": "i" },
                    usertype: constants.USER_TYPE_STUDENT,
                    school: req.body.values.school
                }).select("-password");
            } else {
                users = await User.find({
                    username: { "$regex": req.body.values.username, "$options": "i" },
                    usertype: constants.USER_TYPE_STUDENT,
                    school: req.body.values.school,
                    year: req.body.values.year
                }).select("-password");
            }
        }
        res.send(users);
    });

    app.post('/api/fetchFilteredAdminProfessors', async (req, res) => {
        const subspecialityArray = [];
        for (const key in req.body.values.subspeciality) {
            subspecialityArray.push(req.body.values.subspeciality[key])
        }
        let users;
        if (req.body.values.username === "") {
            if (req.body.values.school === "" && req.body.values.speciality === "") {
                users = await User.find({
                    usertype: constants.USER_TYPE_PROFESSOR
                }).select("-password");
            } else if (req.body.values.speciality === "") {
                users = await User.find({
                    usertype: constants.USER_TYPE_PROFESSOR,
                    school: req.body.values.school
                }).select("-password");
            } else if (req.body.values.school === "" && subspecialityArray.length === 0) {
                console.log("in")
                users = await User.find({
                    usertype: constants.USER_TYPE_PROFESSOR,
                    speciality: req.body.values.speciality
                }).select("-password");
            } else if (req.body.values.school === "" && subspecialityArray.length !== 0) {
                users = await User.find({
                    usertype: constants.USER_TYPE_PROFESSOR,
                    speciality: req.body.values.speciality,
                    subspeciality: { "$in": subspecialityArray }
                }).select("-password");
            } else if (req.body.values.school !== "" && req.body.values.speciality !== "" && subspecialityArray.length === 0) {
                users = await User.find({
                    usertype: constants.USER_TYPE_PROFESSOR,
                    school: req.body.values.school,
                    speciality: req.body.values.speciality
                }).select("-password");
            } else {
                users = await User.find({
                    usertype: constants.USER_TYPE_PROFESSOR,
                    school: req.body.values.school,
                    speciality: req.body.values.speciality,
                    subspeciality: { "$in": subspecialityArray }
                }).select("-password");
            }
        } else {
            if (req.body.values.school === "" && req.body.values.speciality === "") {
                users = await User.find({
                    usertype: constants.USER_TYPE_PROFESSOR,
                    username: { "$regex": req.body.values.username, "$options": "i" }
                }).select("-password");
            } else if (req.body.values.speciality === "") {
                users = await User.find({
                    usertype: constants.USER_TYPE_PROFESSOR,
                    school: req.body.values.school,
                    username: { "$regex": req.body.values.username, "$options": "i" }
                }).select("-password");
            } else if (req.body.values.school === "" && subspecialityArray.length == 0) {
                users = await User.find({
                    usertype: constants.USER_TYPE_PROFESSOR,
                    speciality: req.body.values.speciality,
                    username: { "$regex": req.body.values.username, "$options": "i" }
                }).select("-password");
            } else if (req.body.values.school === "" && subspecialityArray.length !== 0) {
                users = await User.find({
                    usertype: constants.USER_TYPE_PROFESSOR,
                    speciality: req.body.values.speciality,
                    subspeciality: { "$in": subspecialityArray },
                    username: { "$regex": req.body.values.username, "$options": "i" }
                }).select("-password");
            } else if (req.body.values.school !== "" && req.body.values.speciality !== "" && subspecialityArray.length === 0) {
                users = await User.find({
                    usertype: constants.USER_TYPE_PROFESSOR,
                    school: req.body.values.school,
                    speciality: req.body.values.speciality,
                    username: { "$regex": req.body.values.username, "$options": "i" }
                }).select("-password");
            } else {
                users = await User.find({
                    usertype: constants.USER_TYPE_PROFESSOR,
                    school: req.body.values.school,
                    speciality: req.body.values.speciality,
                    subspeciality: { "$in": subspecialityArray },
                    username: { "$regex": req.body.values.username, "$options": "i" }
                }).select("-password");
            }
        }
        res.send(users);
    });


    app.get('/api/fetchAdminCases', async (req, res) => {
        const cases = await Case.find({}).select().populate({
            path: 'questions',
            model: 'questions'
        }).populate({
            path: 'authorid',
            model: 'users',
        });
        res.send(cases);
    });

    app.post('/api/fetchFilteredAdminCases', async (req, res) => {
        let cases;
        let approachArray = [];
        let subspecialityArray = [];
        for (let key in req.body.values.approach) {
            approachArray.push(req.body.values.approach[key]);
        }

        for (let key in req.body.values.subspeciality) {
            subspecialityArray.push(req.body.values.subspeciality[key]);
        }

        if (req.body.values.title === "") {
            if (approachArray.length === 0 && subspecialityArray.length === 0) {
                cases = await Case.find({
                    difficulty: req.body.values.difficulty,
                    status: req.body.values.casestatus
                }).select().populate({
                    path: 'questions',
                    model: 'questions'
                }).populate({
                    path: 'authorid',
                    model: 'users',
                });
            } else {
                if (approachArray.length === 0) {
                    cases = await Case.find({
                        difficulty: req.body.values.difficulty,
                        status: req.body.values.casestatus,
                        subspeciality: { "$in": subspecialityArray }
                    }).select().populate({
                        path: 'questions',
                        model: 'questions'
                    }).populate({
                        path: 'authorid',
                        model: 'users',
                    });
                } else if (subspecialityArray.length === 0) {
                    cases = await Case.find({
                        difficulty: req.body.values.difficulty,
                        status: req.body.values.casestatus,
                        approach: { "$in": approachArray },
                    }).select().populate({
                        path: 'questions',
                        model: 'questions'
                    }).populate({
                        path: 'authorid',
                        model: 'users',
                    });
                } else {
                    cases = await Case.find({
                        difficulty: req.body.values.difficulty,
                        status: req.body.values.casestatus,
                        approach: { "$in": approachArray },
                        subspeciality: { "$in": subspecialityArray }
                    }).select().populate({
                        path: 'questions',
                        model: 'questions'
                    }).populate({
                        path: 'authorid',
                        model: 'users',
                    });
                }
            }
        } else {
            if (approachArray.length === 0 && subspecialityArray.length === 0) {
                cases = await Case.find({
                    title: { "$regex": req.body.values.title, "$options": "i" },
                    difficulty: req.body.values.difficulty,
                    status: req.body.values.casestatus
                }).select().populate({
                    path: 'questions',
                    model: 'questions'
                }).populate({
                    path: 'authorid',
                    model: 'users',
                });
            } else {
                if (approachArray.length === 0) {
                    cases = await Case.find({
                        title: { "$regex": req.body.values.title, "$options": "i" },
                        subspeciality: { "$in": subspecialityArray },
                        difficulty: req.body.values.difficulty,
                        status: req.body.values.casestatus
                    }).select().populate({
                        path: 'questions',
                        model: 'questions'
                    }).populate({
                        path: 'authorid',
                        model: 'users',
                    });
                } else if (subspecialityArray.length === 0) {
                    cases = await Case.find({
                        title: { "$regex": req.body.values.title, "$options": "i" },
                        approach: { "$in": approachArray },
                        difficulty: req.body.values.difficulty,
                        status: req.body.values.casestatus
                    }).select().populate({
                        path: 'questions',
                        model: 'questions'
                    }).populate({
                        path: 'authorid',
                        model: 'users',
                    });
                } else {
                    cases = await Case.find({
                        title: { "$regex": req.body.values.title, "$options": "i" },
                        subspeciality: { "$in": subspecialityArray },
                        approach: { "$in": approachArray },
                        difficulty: req.body.values.difficulty,
                        status: req.body.values.casestatus
                    }).select().populate({
                        path: 'questions',
                        model: 'questions'
                    }).populate({
                        path: 'authorid',
                        model: 'users',
                    });
                }
            }
        }
        res.send(cases);
    });

    app.post('/api/deleteAdminCase', function (req, res) {
        Case.find({ _id: req.body.values }, function (err, oneCase) {
            Question.find({ case: req.body.caseid }, function (err, questions) {
            }).remove().exec();
        }).remove().exec();
        return res.status(201).send({ data: null, message: "deleteCase success" });
    });

    app.post('/api/addNewStudent', async (req, res) => {
        const values = req.body.values;
        User.findOne({ username: values.username }, async (err, user) => {
            if (!user) {
                const newUser = new User();
                newUser.username = values.username;
                newUser.email = newUser.generateHash(values.email);
                newUser.usertype = constants.USER_TYPE_STUDENT;
                newUser.school = values.school;
                newUser.year = values.year;

                // Generate random password
                const buf = new Buffer(10);
                for (let i = 0; i < buf.length; i++) {
                    buf[i] = Math.floor(Math.random() * 256);
                }
                const password = buf.toString('base64');
                newUser.password = newUser.generateHash(password);

                await newUser.save();

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
                    to: values.email,
                    subject: 'Creation of Account',
                    html: '<h1>Your account has been successfully created!</h1><p>Your username is: ' + newUser.username + '</p><p>Your password is: ' + password + '</p>'
                };
                transporter.sendMail(mailOptions, function(err, info){
                    if (err) {
                        throw(err);
                    }

                    // Do not erase - Production Logging
                    console.log('Email sent: ' + info.response);
                    res.send('Done');
                });

                res.send(newUser);
            } else {
                res.send('User Exists');
            }
        });
    });

    app.post('/api/addNewAdmin', function (req, res) {
        const values = req.body.values;
        User.findOne({ username: values.username }, function (err, user) {
            if (!user) {
                const newUser = new User();
                newUser.username = values.username;
                newUser.password = newUser.generateHash(values.password);
                newUser.usertype = constants.USER_TYPE_ADMIN;
                newUser.save();
                return res.send(newUser);
            } else {
                return res.send('User Exists');
            }
        });
    });

    app.post('/api/addNewProfessor', function (req, res) {
        const values = req.body.values;
        const subspecialityArray = [];
        for (let key in values.subspeciality) {
            subspecialityArray.push(values.subspeciality[key]);
        }
        User.findOne({ username: values.username }, function (err, user) {
            if (!user) {
                const newUser = new User();
                newUser.username = values.username;
                newUser.password = newUser.generateHash(values.password);
                newUser.school = values.school;
                newUser.usertype = constants.USER_TYPE_PROFESSOR;
                newUser.speciality = values.speciality;
                newUser.subspeciality = subspecialityArray;
                newUser.save();
                return res.send(newUser);
            } else {
                return res.send('User Exists');
            }
        });
    });

    app.post('/api/deleteAdminStudent', function (req, res) {
        User.find({ _id: req.body.values }, function (err, deleteStudent) { }).remove().exec();
        return res.status(201).send({ data: null, message: "deleteAdminStudent success" });
    });

    app.post('/api/deleteAdminProfessor', function (req, res) {
        User.find({ _id: req.body.values }, function (err, deleteProfessor) { }).remove().exec();
        return res.status(201).send({ data: null, message: "deleteAdminProfessor success" });
    });

    app.post('/api/deleteAdminAdmin', function (req, res) {
        User.find({ _id: req.body.values }, function (err, deleteAdmin) { }).remove().exec();
        return res.status(201).send({ data: null, message: "deleteAdminAdmin success" });
    });

    app.get('/api/fetchCount', async (req, res) => {
        const specialityCount = await Case.aggregate([
            { $group: { _id: '$speciality', count: { $addToSet: '$_id' } } },
            { $unwind: "$count" },
            { $group: { _id: "$_id", count: { $sum: 1 } } },
            { $sort: { 'count': -1 } }
        ]).exec();
        res.send(specialityCount);
    });

    app.post('/api/fetchSpecialityCount', async (req, res) => {
        const specialityCount = await Case.aggregate([{ $match: { speciality: { $gte: req.body['speciality'] } } }, { $unwind: '$subspeciality' }, { $group: { _id: '$subspeciality', count: { $sum: 1 } } }]).exec();
        res.send(specialityCount);
    });
};