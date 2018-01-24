const mongoose = require('mongoose');
const User = require('../models/User');
const Case = require('../models/Case');
const Question = require('../models/Question');

module.exports = app => {

    app.get('/api/fetchRandomCase', async (req, res) => {
        // Get the count of all users
        Case.count({ status: 'Vetted' }).exec(function (err, count) {

            // Get a random entry
            const random = Math.floor(Math.random() * count);

            // Again query all users but only fetch one offset by our random #
            Case.findOne({ status: 'Vetted' }).skip(random).exec(
                function (err, result) {
                    // Tada! random user
                    // console.log(result);
                    res.send(result);
                })
        })

    });

    app.post('/api/fetchCaseByApproach', async (req, res) => {
        const result = await Case.find({status: 'Vetted', approach: {$all: req.body.approach}}).select().populate({
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
            status: 'Vetted',
            speciality: req.body.speciality,
            subspeciality: {$all: req.body.subspeciality}
        }).select().populate({
            path: 'authorid',
            model: 'users'
        });
        res.send(result);
    });

    app.post('/api/storeCaseAnswer', function (req, res) {
        //console.log(req.body.values3)
        const newCaseAnswer = new Answer({
            //_id: mongoose.Types.ObjectId(req.body.values1),
            userid: mongoose.Types.ObjectId(req.body.values),
            date: req.body.values2,
            title: req.body.values3.title,
            difficulty: req.body.values3.difficulty,
            speciality: req.body.values3.speciality,
            approach: req.body.values3.approach,
            subspeciality: req.body.values3.subspeciality,
            scenario: req.body.values3.scenario,
            learning: req.body.values3.learning,
            status: req.body.values3.status
        });
        newCaseAnswer.save();
        // return res.send({ data: {}, message: "storeCaseAnswer success" });
    });
};