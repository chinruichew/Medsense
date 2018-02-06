const mongoose = require('mongoose');
const User = require('../models/User');
const Case = require('../models/Case');
const Question = require('../models/Question');

const constants = require('../utility/constantTypes');

module.exports = app => {
    app.post('/api/matchNLP', async (req, res) => {
        console.log(req.body.id)
        Question.find({
            "_id": req.body.id
        }, function (err, question) {
            console.log(question)
        })
        // const cases = await Case.findOne({ _id: req.body.values.vetId }).select().populate({
        //     path: 'questions',
        //     model: 'questions'
        // });
        // res.send(cases);
        res.send("hello")
    });

};


