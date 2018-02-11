const mongoose = require('mongoose');
const User = require('../models/User');
const Case = require('../models/Case');
const Question = require('../models/Question');

const constants = require('../utility/constantTypes');

var natural = require('natural');
var unique = require('array-unique');
var sw = require('stopword');

module.exports = app => {
    app.post('/api/matchNLP', async (req, res) => {
        var counter = ""
        var studentAnswer = req.body.values.openEnded;
        var originalAnswer = "";
        Question.find({ "_id": req.body.id }, function (req, res) {
            originalAnswer = res[0]['openEnded'];
            originalAnswer = originalAnswer.replace(/<[^>]*>/g, '');
            console.log(res[0]['openEnded'])
        })
        setTimeout(function () {
            var tokenizer = new natural.WordTokenizer();

            const studentAnswerStop = sw.removeStopwords(tokenizer.tokenize(studentAnswer))
            const originalAnswerStop = sw.removeStopwords(tokenizer.tokenize(originalAnswer))
            console.log(studentAnswerStop);
            console.log(originalAnswerStop)

            // root word
            natural.PorterStemmer.attach();
            var studentAnswerArray = []
            for (var i in studentAnswerStop) {
                studentAnswerArray.push(studentAnswerStop[i].stem())
            }
            console.log(studentAnswerArray)

            var originalAnswerArray = []
            for (var i in originalAnswerStop) {
                originalAnswerArray.push(originalAnswerStop[i].stem())
            }
            console.log(originalAnswerArray)

            //build up dictionary trie
            var Trie = natural.Trie;
            var trie = new Trie();
            trie.addStrings(unique(studentAnswerArray))

            var counter = 0;

            for (var i in unique(originalAnswerArray)) {
                if (trie.contains(unique(originalAnswerArray)[i])) {
                    counter++;
                } else {
                    // if (trie.findPrefix(originalAnswerArray[i])[0] != null) {
                    //     counter++;
                    // }
                }
            }
            console.log(counter)
            console.log(originalAnswerArray.length)
            console.log(counter / originalAnswerArray.length);
            counter = counter / originalAnswerArray.length
             res.send({ "data": counter })
        }.bind(this), 500);

    });

};
