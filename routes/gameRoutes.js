const mongoose = require('mongoose');
const User = require('../models/User');
const Case = require('../models/Case');
const Question = require('../models/Question');

module.exports = app => {

    app.get('/api/fetchRandomCase', async (req, res) => {
        // Get the count of all users
        Case.count({ status: 'Vetted' }).exec(function (err, count) {

            // Get a random entry
            const random = Math.floor(Math.random() * count)

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
        const result = await Case.find({status: 'Vetted', approach: {$all: req.body.approach}});
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
        });
        res.send(result);
    });


};