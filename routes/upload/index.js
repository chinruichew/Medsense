var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var path = require('path')
require('app-module-path').addPath(path.join(__dirname, '/routes'))
router.use(bodyParser.urlencoded({ extended: true }));
var mongoose = require('mongoose')
var User = require('../../models/User');
var Case = require('../../models/Case');
var Question = require('../../models/Question');
var MCQ = require('../../models/MCQ');

router.post('/', function (req, res) {
    var questionArray = req.body.questionArray;
    var jsonObject = JSON.parse(questionArray);
    var newCase = new Case({
        title: req.body.title,
        difficulty: req.body.difficulty,
        speciality: req.body.speciality,
        subspeciality: req.body.subspeciality,
        approach: req.body.approach,
        scenario: req.body.scenario,
        author: mongoose.Types.ObjectId(req.body.author),
    });
    for (var prop in jsonObject) {
        var newQuestion = new Question({
            title: jsonObject[prop]['title'],
            type: jsonObject[prop]['type'],
            open: jsonObject[prop]['open'],
            pearl: jsonObject[prop]['pearl'],
            timelimit: jsonObject[prop]['timelimit'],
            reference: jsonObject[prop]['reference'],
            stem: jsonObject[prop]['stem']
        })


        for (var key in jsonObject[prop]['mcqs']) {
            //console.log(key, jsonObject[prop]['mcqs'][key]);
            var newMCQ = new MCQ({
                answer: "",
                status: true
            })
            for (var key1 in jsonObject[prop]['mcqs'][key]) {
                //console.log(key1, jsonObject[prop]['mcqs'][key][key1]);
                if (key1 == "answer") {
                    newMCQ.answer = jsonObject[prop]['mcqs'][key][key1];
                } else {
                    newMCQ.status = jsonObject[prop]['mcqs'][key][key1];
                }
            }
            newMCQ.save();
            newQuestion.mcqs.push(newMCQ._id)
            newQuestion.save();

        }
        newCase.questions.push(newQuestion._id)
        newCase.save();
    }

    return res.status(201).send({ data: null, message: "case created" });
});

module.exports = router;
