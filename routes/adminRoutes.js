const mongoose = require('mongoose');
const User = require('../models/User');
const Case = require('../models/Case');
const Question = require('../models/Question');
const Approach = require('../models/Approach');
const constants = require('../utility/constantTypes');

module.exports = app => {

    app.get('/api/fetchAdminUsers', async (req, res) => {
        const users = await User.find({}).select("-password");
        console.log(users);
        res.send(users);
    });

    app.post('/api/fetchFilteredAdminStudents', async (req, res) => {
        var users
        if (req.body.values.username === "") {
            users = await User.find({
                usertype: constants.USER_TYPE_STUDENT,
                school: req.body.values.school,
                year: req.body.values.year
            }).select("-password");
        } else {
            users = await User.find({
                username: req.body.values.username,
                usertype: constants.USER_TYPE_STUDENT,
                school: req.body.values.school,
                year: req.body.values.year
            }).select("-password");
        }
        res.send(users);
    });

    app.post('/api/fetchFilteredAdminProfessors', async (req, res) => {
        console.log(req.body.values);
        var subspecialityArray = [];
        for (var key in req.body.values.subspeciality) {
            subspecialityArray.push(req.body.values.subspeciality[key])
        }
        var users
        if (req.body.values.username === "") {
            if (subspecialityArray.length === 0) {
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
            users = await User.find({
                username: req.body.values.username,
                usertype: constants.USER_TYPE_PROFESSOR,
                school: req.body.values.school,
                speciality: req.body.values.speciality,
                subspeciality: { "$in": subspecialityArray }
            }).select("-password");
        }
        res.send(users);
    });


    app.get('/api/fetchAdminCases', async (req, res) => {
        const cases = await Case.find({}).select().populate({
            path: 'questions',
            model: 'questions'
        });
        res.send(cases);
    });

    app.post('/api/fetchFilteredAdminCases', async (req, res) => {
        var cases
        var approachArray = []
        var subspecialityArray = []
        for (var key in req.body.values.approach) {
            approachArray.push(req.body.values.approach[key])
        }

        for (var key in req.body.values.subspeciality) {
            subspecialityArray.push(req.body.values.subspeciality[key])
        }
        if (req.body.values.title === "") {
            if (approachArray.length === 0 || subspecialityArray.length === 0) {
                cases = await Case.find({
                    difficulty: req.body.values.difficulty,
                    status: req.body.values.casestatus
                }).select().populate({
                    path: 'questions',
                    model: 'questions'
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
                });
            }
        } else {
            if (approachArray.length === 0 || subspecialityArray.length === 0) {
                cases = await Case.find({
                    title: { "$regex": req.body.values.title, "$options": "i" },
                    difficulty: req.body.values.difficulty,
                    status: req.body.values.casestatus
                }).select().populate({
                    path: 'questions',
                    model: 'questions'
                });
            } else {
                cases = await Case.find({
                    title: { "$regex": req.body.values.title, "$options": "i" },
                    approach: { "$in": approachArray },
                    subspeciality: { "$in": subspecialityArray },
                    difficulty: req.body.values.difficulty,
                    status: req.body.values.casestatus
                }).select().populate({
                    path: 'questions',
                    model: 'questions'
                });
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

    app.post('/api/addNewStudent', function (req, res) {
        const values = req.body.values;
        User.findOne({ username: values.username }, function (err, user) {
            if (!user) {
                const newUser = new User();
                newUser.username = values.username;
                newUser.password = newUser.generateHash(values.password);
                newUser.usertype = constants.USER_TYPE_STUDENT;
                newUser.school = values.school;
                newUser.year = values.year;
                newUser.save();
                return res.send(newUser);
            } else {
                return res.send('User Exists');
            }
        });
    });

    app.post('/api/addNewProfessor', function (req, res) {
        const values = req.body.values;
        var subspecialityArray = []
        for (var key in values.subspeciality) {
            subspecialityArray.push(values.subspeciality[key])
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

    app.post('/api/addApproach', function (req, res) {
        const newApproach = new Approach({
            approach: req.body.approach
        });
        newApproach.save();
        return res.status(201).send({ data: null, message: "approach success" });
    });

    app.post('/api/fetchApproaches', async (req, res) => {
        const approaches = await Approach.find({}).lean().distinct('approach');
        res.send(approaches);
    });
};


