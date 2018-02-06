const mongoose = require('mongoose');
const User = require('../models/User');
const Case = require('../models/Case');
const Question = require('../models/Question');

const constants = require('../utility/constantTypes');

var natural = require('natural');

module.exports = app => {
    app.post('/api/matchNLP', async (req, res) => {
        sw = require('stopword')
        const answerString = 'UECr - check renal function for yearly scans'.split(' ')
        const answerString1 = sw.removeStopwords(answerString)

        //remove unwanted words
        const oldString = 'check function renal in scans years'.split(' ')
        const studentString = sw.removeStopwords(oldString)

        // root word
        natural.PorterStemmer.attach();
        var stuarr = []
        for (var i in studentString) {
            stuarr.push(studentString[i].stem())
        }
        console.log("stuarr " + stuarr)

        var ansarr =[]
        for (var i in answerString1) {
            ansarr.push(answerString1[i].stem())
        }
        console.log("ansarr " + ansarr)

        //build up dictionary trie
        var Trie = natural.Trie;
        var trie = new Trie();
        trie.addStrings(stuarr)

        var counter = 0;

        for(var i in ansarr) {
            if(trie.contains(ansarr[i])) {
                //console.log(ansarr[i])
                counter++;
            } else {
                console.log(ansarr[i])
                console.log(trie.findPrefix(ansarr[i]))
                if(trie.findPrefix(ansarr[i])[0] != null) {
                    counter++;
                }
            }
        }

        console.log(counter);

    });

};