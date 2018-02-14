const mongoose = require('mongoose');
const User = require('../models/User');
const Case = require('../models/Case');
const Question = require('../models/Question');

const constants = require('../utility/constantTypes');

var natural = require('natural');
var unique = require('array-unique');
var stopword = require('stopword');

String.prototype.cleanup = function () {
    return this.toLowerCase().replace(/[^a-zA-Z0-9]+/g, " ");
}

function toArray(answerArray) {
    var nounInflector = new natural.NounInflector();
    var returnArray = [];
    for (var i in answerArray) {
        if (typeof (answerArray[i].stem()) === 'object') {
            returnArray.push(nounInflector.singularize(answerArray[i]));
        } else {
            returnArray.push(nounInflector.singularize(answerArray[i]));
        }
    }
    return returnArray;
}

function remove(array, element) {
    return array.filter(e => e !== element);
}

module.exports = app => {
    app.post('/api/matchNLP', async (req, res) => {
        var counter = ""
        var studentAnswer = req.body.values.openEnded;
        studentAnswer = studentAnswer.replace(/<[^>]*>/g, " "); //remove html tags
        var originalAnswer = "";
        Question.find({"_id": req.body.id}, function (req, res) {
            originalAnswer = res[0]['openEnded'];
            originalAnswer = originalAnswer.replace(/<[^>]*>/g, " "); //remove html tags
            originalAnswer = originalAnswer.cleanup(); //cleanup original answer
        })

        setTimeout(function () {
            //student answer
            var tokenizer = new natural.WordTokenizer();
            var cleanStudentAnswer = studentAnswer.cleanup(); //cleanup student answer
            var cleanStudentAnswerToken = tokenizer.tokenize(cleanStudentAnswer); //tokenize student answer
            var cleanStudentAnswerTokenStopword = stopword.removeStopwords(cleanStudentAnswerToken); //remove stopwords
            natural.PorterStemmer.attach();
            var studentAnswerArray = [];
            studentAnswerArray = toArray(cleanStudentAnswerTokenStopword);
            studentAnswerArray = remove(studentAnswerArray, "nbsp");
            studentAnswerArray = unique(studentAnswerArray);
            console.log(studentAnswerArray)

            //original answer
            var cleanOriginalAnswerToken = tokenizer.tokenize(originalAnswer); //tokenize student answer
            var cleanOriginalAnswerTokenStopword = stopword.removeStopwords(cleanOriginalAnswerToken); //remove stopwords
            var originalAnswerArray = []
            originalAnswerArray = toArray(cleanOriginalAnswerTokenStopword);
            originalAnswerArray = remove(originalAnswerArray, "nbsp");
            originalAnswerArray = unique(originalAnswerArray);
            console.log(originalAnswerArray);

            //build up dictionary trie
            var Trie = natural.Trie;
            var trie = new Trie(false);
            trie.addStrings(studentAnswerArray);

            //check studentAnswer vs originalAnswer
            var counter = 0;

            for (var i in originalAnswerArray) {
                if (trie.contains(originalAnswerArray[i])) {
                    counter++;
                } else {
                    // if (trie.findPrefix(originalAnswerArray[i])[0] != null) {
                    //     counter++;
                    // }
                }
            }
            counter = counter / originalAnswerArray.length
            console.log(counter);
            res.send({ "data": counter })
        }.bind(this), 500);

    });

};