var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var path = require('path');
require('app-module-path').addPath(path.join(__dirname, '/routes'));
router.use(bodyParser.urlencoded({ extended: true }));
var mongoose = require('mongoose');
var User = require('../../models/User');
var Case = require('../../models/Case');
var Question = require('../../models/Question');
var MCQ = require('../../models/MCQ');

router.post('/', function (req, res) {
    var questionArray = req.body.questionArray;
    var jsonObject = JSON.parse(questionArray);
    var newCase = new Case({
        casetitle: req.body.casetitle,
        difficulty: req.body.difficulty,
        speciality: req.body.speciality,
        subspeciality: req.body.subspeciality,
        approach: req.body.approach,
        scenario: req.body.scenario,
        author: mongoose.Types.ObjectId(req.body.author),
    });
    for (var prop in jsonObject) {
        var newQuestion = new Question({
            questiontitle: jsonObject[prop]['questiontitle'],
            attachment: jsonObject[prop]['attachment'],
            type: jsonObject[prop]['type'],
            open: jsonObject[prop]['open'],
            pearl: jsonObject[prop]['pearl'],
            timelimit: jsonObject[prop]['timelimit'],
            reference: jsonObject[prop]['reference'],
            stem: jsonObject[prop]['stem'],
            case: newCase._id
        });
        for (var key in jsonObject[prop]['mcqs']) {
            var newMCQ = new MCQ({
                answer: "",
                status: true,
                question: newQuestion._id
            });
            for (var key1 in jsonObject[prop]['mcqs'][key]) {
                newMCQ.answer = jsonObject[prop]['mcqs'][key]["answer"];
                newMCQ.status = jsonObject[prop]['mcqs'][key]["status"];
            };
            newMCQ.save();
            newQuestion.mcqs.push(newMCQ._id);
            newQuestion.save();
        }
        newCase.questions.push(newQuestion._id);
        newCase.save();
    }
    return res.status(201).send({ data: null, message: "uploadCase success" });
});

router.post('/update', function (req, res) {
    Case.findById(req.body.caseid, function (err, oneCase) {
        oneCase.casetitle = req.body.casetitle;
        oneCase.difficulty = req.body.difficulty;
        oneCase.speciality = req.body.speciality;
        oneCase.subspeciality = req.body.subspeciality;
        oneCase.approach = req.body.approach;
        oneCase.scenario = req.body.scenario;

        var questionArray = req.body.questionArray;
        var jsonObject = JSON.parse(questionArray);

        for (var prop in jsonObject) {
            Question.findById(jsonObject[prop]['id'], function (err, oneQuestion) {
                oneQuestion.title = jsonObject[prop]['title'];
                oneQuestion.attachment = jsonObject[prop]['attachment'];
                oneQuestion.type = jsonObject[prop]['type'];
                oneQuestion.open = jsonObject[prop]['open'];
                oneQuestion.pearl = jsonObject[prop]['pearl'];
                oneQuestion.timelimit = jsonObject[prop]['timelimit'];
                oneQuestion.reference = jsonObject[prop]['reference'];
                oneQuestion.stem = jsonObject[prop]['stem'];

                for (var key in jsonObject[prop]['mcqs']) {
                    MCQ.findById(jsonObject[prop]['mcqs'][key]["id"], function (err, oneMCQ) {
                        if (oneMCQ) {
                            oneMCQ.answer = jsonObject[prop]['mcqs'][key]["answer"];
                            oneMCQ.status = jsonObject[prop]['mcqs'][key]["status"];
                            oneMCQ.save();
                        }
                    })
                }
            })
        }
        oneCase.save();
        return res.status(201).send({ data: null, message: "updateCase success" });
    });
});

router.post('/fetchAll', function (req, res) {
    Case.find({}).populate({
        path: 'questions',
        model: 'questions',
        populate: {
            path: 'mcqs',
            model: 'mcqs'
        }
    }).exec(function (error, cases) {
        return res.status(201).send({ data: cases, message: "fetchAll success" });
    })
});

router.post('/fetchAllByAuthor', function (req, res) {
    Case.find({ author: req.body.authorid }).populate({
        path: 'questions',
        model: 'questions',
        populate: {
            path: 'mcqs',
            model: 'mcqs'
        }
    }).exec(function (error, cases) {
        return res.status(201).send({ data: cases, message: "fetchAllByAuthor success" });
    })
});

router.post('/deleteCase', function (req, res) {
    Case.find({ _id: req.body.caseid }, function (err, oneCase) {
        Question.find({ case: req.body.caseid }, function (err, questions) {
            for (var prop in questions) {
                MCQ.find({ question: questions[prop]['_id'] }).remove().exec();
            }
        }).remove().exec();
    }).remove().exec();

    return res.status(201).send({ data: null, message: "deleteCase success" });
});

router.post('/updateCase', function (req, res) {
    Case.findById(req.body.caseid, function (err, oneCase) {
        oneCase.title = req.body.title
        oneCase.difficulty = req.body.difficulty
        oneCase.speciality = req.body.speciality
        oneCase.subspeciality = req.body.subspeciality
        oneCase.approach = req.body.aproach
        oneCase.scenario = req.body.scenario
        oneCase.save();
    })
    return res.status(201).send({ data: null, message: "updateCase success" });
})

router.post('/updateCaseTakeaway', function (req, res) {
    Case.findById(req.body.caseid, function (err, oneCase) {
        oneCase.takeaway = req.body.takeaway
        oneCase.save();
    })
    return res.status(201).send({ data: null, message: "updateCaseTakeaway success" });
})

router.post('/updateQuestion', function (req, res) {
    Question.findById(req.body.questionid, function (err, oneQuestion) {
        oneQuestion.title = req.body.title
        oneQuestion.attachment = req.body.attachment
        oneQuestion.type = req.body.type
        oneQuestion.open = req.body.open
        oneQuestion.pearl = req.body.pearl
        oneQuestion.timelimit = req.body.timelimit
        oneQuestion.reference = req.body.reference
        oneQuestion.stem = req.body.stem

        var questionArray = req.body.questionArray;
        var jsonObject = JSON.parse(questionArray);

        for (var prop in jsonObject) {
            for (var key in jsonObject[prop]['mcqs']) {
                MCQ.findById(jsonObject[prop]['mcqs'][key]["id"], function (err, oneMCQ) {
                    if (oneMCQ) {
                        oneMCQ.answer = jsonObject[prop]['mcqs'][key]["answer"];
                        oneMCQ.status = jsonObject[prop]['mcqs'][key]["status"];
                        oneMCQ.save();
                    }
                })
            }
        }
        return res.status(201).send({ data: null, message: "updateCaseQuestion success" });
    })
})

module.exports = router;
