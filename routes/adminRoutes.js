const mongoose = require('mongoose');
const User = require('../models/User');
const Case = require('../models/Case');
const Question = require('../models/Question');
const Approach = require('../models/Approach')

module.exports = app => {

    app.get('/api/fetchAdminUsers', async (req, res) => {
        const users = await User.find({}).select("-password");
        res.send(users);
    });

    app.post('/api/fetchFilteredAdminStudents', async (req, res) => {
        var users
        if (req.body.values.username == "") {
            users = await User.find({
                usertype: "student",
                school: req.body.values.school,
                year: req.body.values.year
            }).select("-password");
        } else {
            users = await User.find({
                username: req.body.values.username,
                usertype: "student",
                school: req.body.values.school,
                year: req.body.values.year
            }).select("-password");
        }
        res.send(users);
    });

    app.post('/api/fetchFilteredAdminProfessors', async (req, res) => {
        var subspecialityArray = []
        for (var key in req.body.values.subspeciality) {
            subspecialityArray.push(req.body.values.subspeciality[key])
        }

        console.log(subspecialityArray)
        var users
        if (req.body.values.username == "") {
            users = await User.find({
                usertype: "professor",
                school: req.body.values.school,
                speciality: req.body.values.speciality,
                subspeciality: { "$in": subspecialityArray }
            }).select("-password");
        } else {
            users = await User.find({
                username: req.body.values.username,
                usertype: "professor",
                // school: req.body.values.school,
                // speciality: req.body.values.speciality,
                subspeciality: { "$in": subspecialityArray }
            }).select("-password");
        }
        res.send(users);
    });


    app.get('/api/fetchAdminCases', async (req, res) => {
        const cases = await Case.find({}).select().populate({
            path: 'questions',
            model: 'questions'
        })
        res.send(cases);
    });

    app.post('/api/fetchFilteredCases', async (req, res) => {
        var approachArray = []
        var subspecialityArray = []
        for (var key in req.body.values.approach) {
            approachArray.push(req.body.values.approach[key])
        }

        for (var key in req.body.values.subspeciality) {
            subspecialityArray.push(req.body.values.subspeciality[key])
        }
        const cases = await Case.find({
            title: { "$in": req.body.title },
            speciality: req.body.speciality,
            difficulty: req.body.difficulty,
            approach: { "$in": approachArray },
            subspeciality: { "$in": subspecialityArray }
        }).select().populate({
            path: 'questions',
            model: 'questions'
        });
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
                newUser.usertype = "student";
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
                newUser.usertype = "professor";
                newUser.speciality = values.speciality;
                newUser.subspeciality = subspecialityArray;
                newUser.save();
                return res.send(newUser);
            } else {
                return res.send('User Exists');
            }
        });
    });

    app.post('/api/deleteStudent', function (req, res) {
        User.find({ _id: req.body.values.studentid }, function (err, deleteStudent) { }).remove().exec();
        return res.status(201).send({ data: null, message: "deleteStudent success" });
    });

    app.post('/api/deleteProfessor', function (req, res) {
        User.find({ _id: req.body.values.professorid }, function (err, deleteProfessor) { }).remove().exec();
        return res.status(201).send({ data: null, message: "deleteProfessor success" });
    });

    app.post('/api/addApproach', function (req, res) {
        const newApproach = new Approach({
            approach: req.body.approach
        });
        newApproach.save()
        return res.status(201).send({ data: null, message: "approach success" });
    });

    app.post('/api/fetchApproaches', async (req, res) => {
        const approaches = await Approach.find({}).lean().distinct('approach');
        res.send(approaches);
    });
};


