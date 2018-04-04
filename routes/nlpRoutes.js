const Question = require('../models/Question');
const Synonyms = require('../models/Synonyms');

const natural = require('natural');
const stopword = require('stopword');
const unique = require('array-unique');

String.prototype.cleanup = function () {
    return this.toLowerCase().replace(/[^a-zA-Z0-9]+/g, " ");
};

function toArray(answerArray) {
    const nounInflector = new natural.NounInflector();
    natural.PorterStemmer.attach();
    const returnArray = [];
    for (const i in answerArray) {
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
        let studentAnswer = req.body.values.openEnded;
        studentAnswer = studentAnswer.replace(/<[^>]*>/g, " "); //remove html tags
        let originalAnswer = "";
        Question.find({"_id": req.body.id}, function (req, res) {
            originalAnswer = res[0]['openEnded'];
            originalAnswer = originalAnswer.replace(/<[^>]*>/g, " "); //remove html tags
            originalAnswer = originalAnswer.cleanup(); //cleanup original answer
            // originalAnswer = nlp(originalAnswer).normalize().out('text'); //normalize
        });

        setTimeout(function () {
            //student answer
            const tokenizer = new natural.WordTokenizer();
            const cleanStudentAnswer = studentAnswer.cleanup(); //cleanup student answer
            const cleanStudentAnswerToken = tokenizer.tokenize(cleanStudentAnswer); //tokenize student answer
            const cleanStudentAnswerTokenStopword = stopword.removeStopwords(cleanStudentAnswerToken); //remove stopwords
            let studentAnswerArray = toArray(cleanStudentAnswerTokenStopword);
            studentAnswerArray = remove(studentAnswerArray, "nbsp");
            studentAnswerArray = remove(studentAnswerArray, "amp");
            studentAnswerArray = remove(studentAnswerArray, "quot");
            studentAnswerArray = remove(studentAnswerArray, "lt");
            studentAnswerArray = remove(studentAnswerArray, "gt");
            studentAnswerArray = unique(studentAnswerArray);
            //remove tokens with one characters + remove arrays
            for (const i in studentAnswerArray) {
                if (studentAnswerArray[i] != null && studentAnswerArray[i].length == 1) {
                    //console.log(studentAnswerArray[i]);
                    studentAnswerArray = remove(studentAnswerArray, studentAnswerArray[i]);
                }   
                if (studentAnswerArray[i] != null && typeof studentAnswerArray[i] == "object") {
                    //console.log(studentAnswerArray[i]);
                    studentAnswerArray = remove(studentAnswerArray, studentAnswerArray[i]);
                }
            }
            console.log(studentAnswerArray);

            //original answer
            const cleanOriginalAnswerToken = tokenizer.tokenize(originalAnswer); //tokenize student answer
            //console.log(cleanOriginalAnswerToken)
            const cleanOriginalAnswerTokenStopword = stopword.removeStopwords(cleanOriginalAnswerToken); //remove stopwords
            //console.log(cleanOriginalAnswerTokenStopword)
            let originalAnswerArray = toArray(cleanOriginalAnswerTokenStopword);
            console.log(originalAnswerArray);
            originalAnswerArray = remove(originalAnswerArray, "nbsp");
            originalAnswerArray = remove(originalAnswerArray, "amp");
            originalAnswerArray = remove(originalAnswerArray, "quot");
            originalAnswerArray = remove(originalAnswerArray, "lt");
            originalAnswerArray = remove(originalAnswerArray, "gt");
            originalAnswerArray = unique(originalAnswerArray);
            //remove tokens with one characters + remove arrays
            for (const i in originalAnswerArray) {
                if (originalAnswerArray[i] != null && originalAnswerArray[i].length == 1) {
                    //console.log(originalAnswerArray[i]);
                    originalAnswerArray = remove(originalAnswerArray, originalAnswerArray[i]);
                }
                if (originalAnswerArray[i] != null && typeof originalAnswerArray[i] == "object") {
                    //console.log(originalAnswerArray[i]);
                    originalAnswerArray = remove(originalAnswerArray, originalAnswerArray[i]);
                }   
            } 
            console.log(originalAnswerArray);

            //build up dictionary trie
            const Trie = natural.Trie;
            const trie = new Trie(false);
            trie.addStrings(originalAnswerArray);

            //check studentAnswer vs originalAnswer
            let counter = 0;

            var remainingTokens = []

            for (const i in studentAnswerArray) {
                if (trie.contains(studentAnswerArray[i])) {
                    counter++;
                } else {
                    // if (trie.findPrefix(originalAnswerArray[i])[0] != null) {
                    //     counter++;
                    // }
                    remainingTokens.push(studentAnswerArray[i]);

                    console.log("remainingTokens");
                    console.log(remainingTokens);
                }
            }
            // console.log(counter);
            // console.log(originalAnswerArray.length);
            counter = counter / originalAnswerArray.length;
            console.log(counter);
            Synonyms.find({}, function(req, res) {
                console.log(res);
            })

            res.send({ "data": counter })
        }.bind(this), 500);
    });
};