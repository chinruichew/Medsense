const User = require('../models/User');
const Case = require('../models/Case');
const Question = require('../models/Question');
const Approach = require('../models/Approach');
const nodemailer = require('nodemailer');

const keys = require('../config/keys');
const constants = require('../utility/constantTypes');
const commonMethods = require('../utility/commonMethods');

module.exports = app => {
    app.get('/api/fetchAdminUsers', async (req, res) => {
        const users = await User.find().select("-password");
        res.send(users);
    });

    app.post('/api/fetchFilteredAdminAdmins', async (req, res) => {
        let users;
        if (req.body.username === "") {
            users = await User.find({
                usertype: constants.USER_TYPE_ADMIN
            }).select("-password");
        } else {
            users = await User.find({
                username: { "$regex": req.body.username, "$options": "i" },
                usertype: constants.USER_TYPE_ADMIN
            }).select("-password");
        }
        console.log(users)
        res.send(users);
    });

    app.post('/api/fetchFilteredAdminStudents', async (req, res) => {
        let users;
        if (req.body.username === "") {
            if (req.body.school === "" && req.body.year === "") {
                users = await User.find({
                    usertype: constants.USER_TYPE_STUDENT
                }).select("-password");
            } else if (req.body.school === "") {
                users = await User.find({
                    usertype: constants.USER_TYPE_STUDENT,
                    year: req.body.year
                }).select("-password");
            } else if (req.body.year === "") {
                users = await User.find({
                    usertype: constants.USER_TYPE_STUDENT,
                    school: req.body.school
                }).select("-password");
            } else {
                users = await User.find({
                    usertype: constants.USER_TYPE_STUDENT,
                    school: req.body.school,
                    year: req.body.year
                }).select("-password");
            }
        } else {
            if (req.body.school === "" && req.body.year === "") {
                users = await User.find({
                    username: { "$regex": req.body.username, "$options": "i" },
                    usertype: constants.USER_TYPE_STUDENT
                }).select("-password");
            } else if (req.body.school === "") {
                users = await User.find({
                    username: { "$regex": req.body.username, "$options": "i" },
                    usertype: constants.USER_TYPE_STUDENT,
                    year: req.body.year
                }).select("-password");
            } else if (req.body.year === "") {
                users = await User.find({
                    username: { "$regex": req.body.username, "$options": "i" },
                    usertype: constants.USER_TYPE_STUDENT,
                    school: req.body.school
                }).select("-password");
            } else {
                users = await User.find({
                    username: { "$regex": req.body.username, "$options": "i" },
                    usertype: constants.USER_TYPE_STUDENT,
                    school: req.body.school,
                    year: req.body.year
                }).select("-password");
            }
        }
        res.send(users);
    });

    app.post('/api/fetchFilteredAdminProfessors', async (req, res) => {
        const subspecialityArray = [];
        for (const key in req.body.subspeciality) {
            subspecialityArray.push(req.body.subspeciality[key])
        }
        let users;
        if (req.body.username === "") {
            if (req.body.school === "" && req.body.speciality === "") {
                users = await User.find({
                    usertype: constants.USER_TYPE_PROFESSOR
                }).select("-password");
            } else if (req.body.speciality === "") {
                users = await User.find({
                    usertype: constants.USER_TYPE_PROFESSOR,
                    school: req.body.school
                }).select("-password");
            } else if (req.body.school === "" && subspecialityArray.length === 0) {
                console.log("in")
                users = await User.find({
                    usertype: constants.USER_TYPE_PROFESSOR,
                    speciality: req.body.values.speciality
                }).select("-password");
            } else if (req.body.school === "" && subspecialityArray.length !== 0) {
                users = await User.find({
                    usertype: constants.USER_TYPE_PROFESSOR,
                    speciality: req.body.speciality,
                    subspeciality: { "$in": subspecialityArray }
                }).select("-password");
            } else if (req.body.school !== "" && req.body.speciality !== "" && subspecialityArray.length === 0) {
                users = await User.find({
                    usertype: constants.USER_TYPE_PROFESSOR,
                    school: req.body.school,
                    speciality: req.body.speciality
                }).select("-password");
            } else {
                users = await User.find({
                    usertype: constants.USER_TYPE_PROFESSOR,
                    school: req.body.school,
                    speciality: req.body.speciality,
                    subspeciality: { "$in": subspecialityArray }
                }).select("-password");
            }
        } else {
            if (req.body.school === "" && req.body.speciality === "") {
                users = await User.find({
                    usertype: constants.USER_TYPE_PROFESSOR,
                    username: { "$regex": req.body.username, "$options": "i" }
                }).select("-password");
            } else if (req.body.speciality === "") {
                users = await User.find({
                    usertype: constants.USER_TYPE_PROFESSOR,
                    school: req.body.school,
                    username: { "$regex": req.body.username, "$options": "i" }
                }).select("-password");
            } else if (req.body.school === "" && subspecialityArray.length == 0) {
                users = await User.find({
                    usertype: constants.USER_TYPE_PROFESSOR,
                    speciality: req.body.speciality,
                    username: { "$regex": req.body.username, "$options": "i" }
                }).select("-password");
            } else if (req.body.school === "" && subspecialityArray.length !== 0) {
                users = await User.find({
                    usertype: constants.USER_TYPE_PROFESSOR,
                    speciality: req.body.speciality,
                    subspeciality: { "$in": subspecialityArray },
                    username: { "$regex": req.body.username, "$options": "i" }
                }).select("-password");
            } else if (req.body.school !== "" && req.body.speciality !== "" && subspecialityArray.length === 0) {
                users = await User.find({
                    usertype: constants.USER_TYPE_PROFESSOR,
                    school: req.body.school,
                    speciality: req.body.speciality,
                    username: { "$regex": req.body.username, "$options": "i" }
                }).select("-password");
            } else {
                users = await User.find({
                    usertype: constants.USER_TYPE_PROFESSOR,
                    school: req.body.school,
                    speciality: req.body.speciality,
                    subspeciality: { "$in": subspecialityArray },
                    username: { "$regex": req.body.username, "$options": "i" }
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
        for (let key in req.body.approach) {
            approachArray.push(req.body.approach[key]);
        }

        for (let key in req.body.subspeciality) {
            subspecialityArray.push(req.body.subspeciality[key]);
        }

        if (req.body.title === "") {
            if (approachArray.length === 0 && subspecialityArray.length === 0) {
                cases = await Case.find({
                    difficulty: req.body.difficulty,
                    status: req.body.casestatus
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
                        difficulty: req.body.difficulty,
                        status: req.body.casestatus,
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
                        difficulty: req.body.difficulty,
                        status: req.body.casestatus,
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
                        difficulty: req.body.difficulty,
                        status: req.body.casestatus,
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
                    title: { "$regex": req.body.title, "$options": "i" },
                    difficulty: req.body.difficulty,
                    status: req.body.casestatus
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
                        title: { "$regex": req.body.title, "$options": "i" },
                        subspeciality: { "$in": subspecialityArray },
                        difficulty: req.body.difficulty,
                        status: req.body.casestatus
                    }).select().populate({
                        path: 'questions',
                        model: 'questions'
                    }).populate({
                        path: 'authorid',
                        model: 'users',
                    });
                } else if (subspecialityArray.length === 0) {
                    cases = await Case.find({
                        title: { "$regex": req.body.title, "$options": "i" },
                        approach: { "$in": approachArray },
                        difficulty: req.body.difficulty,
                        status: req.body.casestatus
                    }).select().populate({
                        path: 'questions',
                        model: 'questions'
                    }).populate({
                        path: 'authorid',
                        model: 'users',
                    });
                } else {
                    cases = await Case.find({
                        title: { "$regex": req.body.title, "$options": "i" },
                        subspeciality: { "$in": subspecialityArray },
                        approach: { "$in": approachArray },
                        difficulty: req.body.difficulty,
                        status: req.body.casestatus
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
                const toEmail = values.email;
                const subject = 'Creation of Account';
                const htmlText = '<h1>Your account has been successfully created!</h1><p>Your username is: ' + newUser.username + '</p><p>Your password is: ' + password + '</p>';
                commonMethods.SEND_AUTOMATED_EMAIL(toEmail, subject, htmlText);

                res.send(newUser);
            } else {
                res.send('User Exists');
            }
        });
    });

    app.post('/api/addNewAdmin', function (req, res) {
        const values = req.body.values;
        User.findOne({ username: values.username }, async (err, user) => {
            if (!user) {
                const newUser = new User();
                newUser.username = values.username;
                newUser.usertype = constants.USER_TYPE_ADMIN;

                // Generate random password
                const buf = new Buffer(10);
                for (let i = 0; i < buf.length; i++) {
                    buf[i] = Math.floor(Math.random() * 256);
                }
                const password = buf.toString('base64');
                newUser.password = newUser.generateHash(password);

                await newUser.save();

                // Generate email
                const toEmail = values.email;
                const subject = 'Creation of Account';
                const htmlText = '<h1>Your account has been successfully created!</h1><p>Your username is: ' + newUser.username + '</p><p>Your password is: ' + password + '</p>';
                commonMethods.SEND_AUTOMATED_EMAIL(toEmail, subject, htmlText);

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
        User.findOne({ username: values.username }, async (err, user) => {
            if (!user) {
                const newUser = new User();
                newUser.username = values.username;
                newUser.school = values.school;
                newUser.usertype = constants.USER_TYPE_PROFESSOR;
                newUser.speciality = values.speciality;
                newUser.subspeciality = subspecialityArray;

                // Generate random password
                const buf = new Buffer(10);
                for (let i = 0; i < buf.length; i++) {
                    buf[i] = Math.floor(Math.random() * 256);
                }
                const password = buf.toString('base64');
                newUser.password = newUser.generateHash(password);

                await newUser.save();

                // Generate email
                const toEmail = values.email;
                const subject = 'Creation of Account';
                const htmlText = '<h1>Your account has been successfully created!</h1><p>Your username is: ' + newUser.username + '</p><p>Your password is: ' + password + '</p>';
                commonMethods.SEND_AUTOMATED_EMAIL(toEmail, subject, htmlText);

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
        const approachCount = await Case.aggregate([
            { $unwind: '$approach' },
            { $group: { _id: '$approach', count: { $sum: 1 } } }]).sort({ count: -1 }).exec();
        res.send(approachCount);
    });

    app.get('/api/fetchCaseSpecialityCount', async (req, res) => {
        const caseSpecialityCount = await Case.aggregate([
            { $unwind: '$speciality' },
            { $group: { _id: '$speciality', count: { $sum: 1 } } }]).sort({ count: -1 }).exec();
        res.send(caseSpecialityCount);
    });

    app.post('/api/fetchSpecialityCount', async (req, res) => {
        const specialityCount = await Case.aggregate([
            { $match: { speciality: { $gte: req.body['speciality'] } } },
            { $unwind: '$subspeciality' },
            { $group: { _id: '$subspeciality', count: { $sum: 1 } } }]).sort({ count: -1 }).exec();
        res.send(specialityCount);
    });

    app.get('/api/fetchStudentCount', async (req, res) => {
        const nus = await User.find({usertype: constants.USER_TYPE_STUDENT, school: constants.SCHOOL_NUS}).select();
        const ntu = await User.find({usertype: constants.USER_TYPE_STUDENT, school: constants.SCHOOL_NTU}).select();
        const dukeNUS = await User.find({usertype: constants.USER_TYPE_STUDENT, school: constants.SCHOOL_DUKE_NUS}).select();

        const nusMap = [
            {
                _id: '1',
                count: 0
            },
            {
                _id: '2',
                count: 0
            },
            {
                _id: '3',
                count: 0
            },
            {
                _id: '4',
                count: 0
            },
            {
                _id: '5',
                count: 0
            }
        ];

        const ntuMap = [
            {
                _id: '1',
                count: 0
            },
            {
                _id: '2',
                count: 0
            },
            {
                _id: '3',
                count: 0
            },
            {
                _id: '4',
                count: 0
            },
            {
                _id: '5',
                count: 0
            }
        ];

        const dukeNUSMap = [
            {
                _id: '1',
                count: 0
            },
            {
                _id: '2',
                count: 0
            },
            {
                _id: '3',
                count: 0
            },
            {
                _id: '4',
                count: 0
            },
            {
                _id: '5',
                count: 0
            }
        ];

        const arr = [];

        // Map NUS students
        for(let i = 0; i < nus.length; i++) {
            const student = nus[i];
            for(let j = 0; j < nusMap.length; j++) {
                const mapObject = nusMap[j];
                if(mapObject._id === student.year) {
                    mapObject.count++;
                    break;
                }
            }
        }

        // Map NTU students
        for(let i = 0; i < ntu.length; i++) {
            const student = ntu[i];
            for(let j = 0; j < ntuMap.length; j++) {
                const mapObject = ntuMap[j];
                if(mapObject._id === student.year) {
                    mapObject.count++;
                    break;
                }
            }
        }

        // Map Duke-NUS students
        for(let i = 0; i < dukeNUS.length; i++) {
            const student = dukeNUS[i];
            for(let j = 0; j < dukeNUSMap.length; j++) {
                const mapObject = dukeNUSMap[j];
                if(mapObject._id === student.year) {
                    mapObject.count++;
                    break;
                }
            }
        }

        arr.push(nusMap);
        arr.push(ntuMap);
        arr.push(dukeNUSMap);

        res.send(arr);
    });
};