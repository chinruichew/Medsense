const mongoose = require('mongoose');
const User = require('../models/User');
const Case = require('../models/Case');
const Question = require('../models/Question');

const constants = require('../utility/constantTypes');

var natural = require('natural');
var unique = require('array-unique');
var stopword = require('stopword');
// var nlp = require('compromise');

String.prototype.cleanup = function () {
    return this.toLowerCase().replace(/[^a-zA-Z0-9]+/g, " ");
}   

function toArray(answerArray) {
    var nounInflector = new natural.NounInflector();
    natural.PorterStemmer.attach();
    var returnArray = [];
    for (var i in answerArray) {
        if (typeof (answerArray[i].stem()) === 'object') {
            returnArray.push(nounInflector.singularize(answerArray[i]));
        } else {
            returnArray.push(nounInflector.singularize(answerArray[i]).stem());
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
            // originalAnswer = nlp(originalAnswer).normalize().out('text'); //normalize
        })

        setTimeout(function () {
            //student answer
            var tokenizer = new natural.WordTokenizer();
            var cleanStudentAnswer = studentAnswer.cleanup(); //cleanup student answer
            var cleanStudentAnswerToken = tokenizer.tokenize(cleanStudentAnswer); //tokenize student answer
            var cleanStudentAnswerTokenStopword = stopword.removeStopwords(cleanStudentAnswerToken); //remove stopwords
            var studentAnswerArray = [];
            studentAnswerArray = toArray(cleanStudentAnswerTokenStopword);
            studentAnswerArray = remove(studentAnswerArray, "nbsp");
            studentAnswerArray = remove(studentAnswerArray, "amp");
            studentAnswerArray = remove(studentAnswerArray, "quot");
            studentAnswerArray = remove(studentAnswerArray, "lt");
            studentAnswerArray = remove(studentAnswerArray, "gt");
            studentAnswerArray = unique(studentAnswerArray);
            //remove tokens with one characters + remove arrays
            for (var i in studentAnswerArray) {
                if (studentAnswerArray[i] != null && studentAnswerArray[i].length == 1) {
                    //console.log(studentAnswerArray[i]);
                    studentAnswerArray = remove(studentAnswerArray, studentAnswerArray[i]);
                }   
                if (studentAnswerArray[i] != null && typeof studentAnswerArray[i] == "object") {
                    //console.log(studentAnswerArray[i]);
                    studentAnswerArray = remove(studentAnswerArray, studentAnswerArray[i]);
                }
            }
            console.log(studentAnswerArray)

            //original answer
            var cleanOriginalAnswerToken = tokenizer.tokenize(originalAnswer); //tokenize student answer
            //console.log(cleanOriginalAnswerToken)
            var cleanOriginalAnswerTokenStopword = stopword.removeStopwords(cleanOriginalAnswerToken); //remove stopwords
            //console.log(cleanOriginalAnswerTokenStopword)
            var originalAnswerArray = []
            originalAnswerArray = toArray(cleanOriginalAnswerTokenStopword);
            console.log(originalAnswerArray)
            originalAnswerArray = remove(originalAnswerArray, "nbsp");
            originalAnswerArray = remove(originalAnswerArray, "amp");
            originalAnswerArray = remove(originalAnswerArray, "quot");
            originalAnswerArray = remove(originalAnswerArray, "lt");
            originalAnswerArray = remove(originalAnswerArray, "gt");
            originalAnswerArray = unique(originalAnswerArray);
            //remove tokens with one characters + remove arrays
            for (var i in originalAnswerArray) {
                if (originalAnswerArray[i] != null && originalAnswerArray[i].length == 1) {
                    //console.log(originalAnswerArray[i]);
                    originalAnswerArray = remove(originalAnswerArray, originalAnswerArray[i]);
                }
                if (originalAnswerArray[i] != null && typeof originalAnswerArray[i] == "object") {
                    //console.log(originalAnswerArray[i]);
                    originalAnswerArray = remove(originalAnswerArray, originalAnswerArray[i]);
                }   
            } 
            console.log(originalAnswerArray)

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
            // console.log(counter);
            // console.log(originalAnswerArray.length);
            counter = counter / originalAnswerArray.length
            console.log(counter);
            res.send({ "data": counter })
        }.bind(this), 500);

    });

};