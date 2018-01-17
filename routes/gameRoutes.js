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
        // if (req.body.values.approach===null){
        //     const result = await Case.find({status:'Vetted'});
        // } else {
            const result = await Case.find({status: 'Vetted', approach: req.body.approach});
        // }
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
        // if (req.body.values.speciality==="Select One" && req.body.values.subspeciality===null){
        //     const result = await Case.find({status:'Vetted'});
        // } else if (req.body.values.subspeciality===null){
        //     const result = await Case.find({status: 'Vetted', speciality: req.body.values.speciality});
        // } else if (req.body.values.speciality==="Select One") {
        //     const result = await Case.find({status: 'Vetted', subspeciality: {$all: req.body.values.subspeciality});
        // } else {
            const result = await Case.find({
                status: 'Vetted',
                speciality: req.body.values.speciality,
                subspeciality: {$all: req.body.values.subspeciality}
            });
        // }
        res.send(result);
    });


};