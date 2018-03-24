const Case = require('../models/Case');
const AnswerOverview = require('../models/AnswerOverview');
const Subspeciality = require('../models/Subspeciality');

const constants = require('../utility/constantTypes');

module.exports = app => {
    app.get('/api/getProfessorRecommendedCases', async(req, res) => {
        // Recommend pending cases based on their subspecialities
        // To-do: Recommend pending cases based on cohort's performance in the subspeciality

        const cases = await Case.find({status: constants.CASE_STATUS_PENDING});

        // Find cases with same subspecialities as the user
        const filteredCases = [];
        const sessionUser = req.session.user;
        const userSubSpecialities = sessionUser.subspeciality;
        for(let i = 0; i < cases.length; i++) {
            const fetchedCase = cases[i];
            const caseSubSpecialities = fetchedCase.subspeciality;
            let toAdd = false;
            for(let j = 0; j < caseSubSpecialities.length; j++) {
                const caseSubSpeciality = caseSubSpecialities[j];
                for(let k = 0; k < userSubSpecialities.length; k++) {
                    const userSubSpeciality = userSubSpecialities[k];
                    if(caseSubSpeciality === userSubSpeciality) {
                        toAdd = true;
                    }
                }
            }
            if(toAdd) {
                filteredCases.push(fetchedCase);
            }
        }

        if(filteredCases.length <= constants.RECOMMENDATION_THRESHOLD) {
            res.send(filteredCases);
        } else {
            // From here, the algorithm will return the subspecialities with the least number of vetted cases

            // Get vetted cases
            const vettedCases = await Case.find({status: constants.CASE_STATUS_VETTED});
            
            // Get all subspecialities and assign number 0 to all
            const allSubspecialities = await Subspeciality.find();
            for(let i = 0; i < allSubspecialities.length; i++) {
                const subspeciality = allSubspecialities[i];
                subspeciality.numSpeciality = 0;
            }

            // Sort cases by number of subspecialities
            for(let i = 0; i < vettedCases.length; i++) {
                const vettedCase = vettedCases[i];
                const caseSubSpecialities = vettedCase.subspeciality;
                for(let j = 0; j < caseSubSpecialities.length; j++) {
                    const caseSubSpeciality = caseSubSpecialities[j];
                    for (let key in allSubspecialities) {
                        if (key === caseSubSpeciality) {
                            allSubspecialities[key] = allSubspecialities[key]++;
                            break;
                        }
                    }
                }
            }

            // Find max of vetted cases
            let max = 0;
            for(let key in allSubspecialities) {
                const numSpeciality = allSubspecialities[key];
                if(numSpeciality > max) {
                    max = numSpeciality;
                }
            }

            // Find min of vetted cases
            let min = max;
            for(let key in allSubspecialities) {
                const numSpeciality = allSubspecialities[key];
                if(numSpeciality < min) {
                    min = numSpeciality;
                }
            }

            // Start adding in cases starting from min
            const sortedCases = [];
            while(sortedCases.length < constants.RECOMMENDATION_THRESHOLD) {
                for(let key in allSubspecialities) {
                    const numSpeciality = allSubspecialities[key];
                    if(numSpeciality === min) {
                        for(let i = 0; i < filteredCases.length; i++) {
                            const filteredCase = filteredCases[i];
                            const caseSubSpecialities = filteredCase.subspeciality;
                            for(let j = 0; j < caseSubSpecialities.length; j++) {
                                const caseSubSpeciality = caseSubSpecialities[j];
                                if(caseSubSpeciality === key) {
                                    sortedCases.push(filteredCase);
                                    break;
                                }
                            }
                            if(sortedCases >= constants.RECOMMENDATION_THRESHOLD) {
                                break;
                            }
                        }
                    }
                    if(sortedCases >= constants.RECOMMENDATION_THRESHOLD) {
                        break;
                    }
                }
                min++;
            }

            res.send(sortedCases);
        }
    });

    app.get('/api/getStudentRecommendedCases', async(req, res) => {
        // Cases in spec they scored poorly in popularity else recommend popular cases if too little data
        // Year 2 and 3 for Beginner, Year 4 and 5 for Advanced

        // This threshold decides how much processing should be done for recommendations
        const carouselThreshold = constants.RECOMMENDATION_THRESHOLD;
        const specialityThreshold = 3;

        // Get all answers
        const answers = await AnswerOverview.find().populate({
            path: 'case',
            model: 'cases',
            populate: {
                path: 'questions',
                model: 'questions'
            }
        });

        // Filter answers by user
        const sessionUser = req.session.user;
        const userAnswers = [];
        for(let i = 0; i < answers.length; i++) {
            const answer = answers[i];
            if(String(answer.user) === sessionUser._id) {
                userAnswers.push(answer);
            }
        }

        // Tag cases with popularity
        const caseArray = [];
        for(let i = 0; i < answers.length; i++) {
            const answer = answers[i];
            const answerCase = answer.case;
            let toAdd = true;
            for(let j = 0; j < caseArray.length; j++) {
                const indexedCase = caseArray[j];
                if(indexedCase._doc._id === answerCase._id) {
                    toAdd = false;
                    indexedCase.numTries += 1;
                    break;
                }
            }
            if(toAdd) {
                caseArray.push({
                    ...answerCase,
                    numTries: 1
                });
            }
        }

        // Send all the cases if there are less than equal threshold, else start filtering
        if(caseArray.length <= carouselThreshold) {
            // Process all the case array
            const processedCases = [];
            for(let i = 0; i < caseArray.length; i++) {
                let answerCase = caseArray[i]._doc;
                processedCases.push(answerCase);
            }

            // Get all vetted cases and add to case array one by one
            const vettedCases = await Case.find({status: 'Vetted'});
            for(let i = 0; i < vettedCases.length; i++) {
                const vettedCase = vettedCases[i];
                let toAdd = true;
                for(let j = 0; j < processedCases.length; j++) {
                    if(processedCases._id === vettedCase._id) {
                        toAdd = false;
                        break;
                    }
                }
                if(toAdd) {
                    processedCases.push(vettedCase);
                }
                if(processedCases.length >= carouselThreshold) {
                    break;
                }
            }
            res.send(processedCases);
        } else {
            // If user has attempted at least threshold number of cases in a spec, prioritise based on poor scoring
            // Tag specialities with number of times user has tried it
            const specialities = [];
            for(let i = 0; i < userAnswers.length; i++) {
                const userAnswer = userAnswers[i];
                const answerCase = userAnswer.case;
                let toAdd = true;
                for(let j = 0; j < specialities.length; j++) {
                    const speciality = specialities[j];
                    if(speciality.speciality === answerCase.speciality) {
                        toAdd = false;
                        speciality.numTries += 1;
                        break;
                    }
                }
                if(toAdd) {
                    specialities.push({
                        speciality: answerCase.speciality,
                        numTries: 1
                    });
                }
            }

            // Check if user has at least threshold of specialities
            const thresholdSpecialities = [];
            for(let i = 0; i < specialities.length; i++) {
                const speciality = specialities[i];
                if(speciality.numTries >= specialityThreshold) {
                    thresholdSpecialities.push(specialityThreshold);
                }
            }

            // If user has reached threshold of specialities, filter cases based on speciality if they score badly
            const badScoreCaseArray = [];
            for(let i = 0; i < thresholdSpecialities.length; i++) {
                const speciality = thresholdSpecialities[i];
                let averageSpecialityScore = 0;
                for(let j = 0; j < userAnswers.length; j++) {
                    const userAnswer = userAnswers[j];
                    if(userAnswer.case.speciality === speciality) {
                        averageSpecialityScore += userAnswer.score;
                    }
                }
                averageSpecialityScore /= speciality.numTries;

                // Calculate cohort average
                let cohortAverageSpecialityScore = 0;
                let numAnswers = 0;
                for(let j = 0; j < answers.length; j++) {
                    const answer = answers[j];
                    if(answers.case.speciality === speciality) {
                        cohortAverageSpecialityScore += answer.score;
                        numAnswers++;
                    }
                }
                cohortAverageSpecialityScore /= numAnswers;

                // If average less than cohort average, add to recommendation array
                if(averageSpecialityScore < cohortAverageSpecialityScore) {
                    for(let j = 0 ; j < caseArray.length; j++) {
                        const indexedCase = caseArray[j];
                        if(indexedCase.speciality === speciality) {
                            badScoreCaseArray.push(indexedCase);
                        }
                    }
                }
            }

            // If bad score cases
            if(badScoreCaseArray.length <= carouselThreshold) {
                res.send(badScoreCaseArray);
            } else {
                // Filter cases based on difficulty level according to student year
                let difficultyLevel = constants.DIFFICULTY_LEVEL_BEGINNER;
                if(sessionUser.year === constants.STUDENT_YEAR_FOUR || sessionUser.year === constants.STUDENT_YEAR_FIVE) {
                    difficultyLevel = constants.DIFFICULTY_LEVEL_ADVANCED;
                }

                // Select cases based on difficulty level criteria
                const difficultySortedCases = [];
                for(let i = 0; i < badScoreCaseArray.length; i++) {
                    const filteredCase = badScoreCaseArray[i];
                    if(filteredCase.difficulty === difficultyLevel) {
                        difficultySortedCases.push(filteredCase);
                    }
                }

                // Add more cases if difficulty sorted cases is below threshold
                for(let i = 0; i < badScoreCaseArray.length; i++) {
                    const filteredCase = badScoreCaseArray[i];
                    if(difficultySortedCases.length < carouselThreshold) {
                        let toAdd = true;
                        for(let j = 0; j < difficultySortedCases.length; j++) {
                            const difficultySortedCase = difficultySortedCases[j];
                            if(difficultySortedCase._id === filteredCase._id) {
                                toAdd = false;
                                break;
                            }
                        }
                        if(toAdd) {
                            difficultySortedCases.push(filteredCase);
                        }
                    } else {
                        break;
                    }
                }

                res.send(difficultySortedCases);
            }
        }
    });
};