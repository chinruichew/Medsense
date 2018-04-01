import React, {Component} from 'react';
import ReactEcharts from 'echarts-for-react';

class StudentIndividualCaseLatestAttemptOverview extends Component {
    render() {
        const answers = this.props.answers;
        const answer = answers[answers.length - 1];
        const answerCase = answer.case;
        const answerCaseQuestions = answerCase.questions;

        // Get the numbering of each question.
        const xAxisData = [];
        const studentScores = [];
        for(let i = 0; i < answerCaseQuestions.length; i++) {
            const answerCaseQuestion = answerCaseQuestions[i];
            xAxisData.push('Question ' + answerCaseQuestion.id);

            // Check through open ended answers
            const openEndedAnswers = answer.openEndedAnswers;
            for(let j = 0; j < openEndedAnswers.length; j++) {
                const openEndedAnswer = openEndedAnswers[j];
                if(openEndedAnswer.question === answerCaseQuestion._id) {
                    studentScores.push(openEndedAnswer.score);
                    break;
                }
            }

            // Check through MCQ Answers
            const mcqAnswers = answer.mcqAnswers;
            for(let j = 0; j < mcqAnswers.length; j++) {
                const mcqAnswer = mcqAnswers[j];
                if(mcqAnswer.question === answerCaseQuestion._id) {
                    studentScores.push(mcqAnswer.score);
                    break;
                }
            }
        }

        // Get Global answers and map them to the questions
        // Might need to re-do this with different types of averages.
        const globalAnswers = this.props.globalAnswers;
        const globalScoreQuestionMap = [];
        for(let i = 0; i < globalAnswers.length; i++) {
            const globalAnswer = globalAnswers[i];
            
            for(let j = 0; j < answerCaseQuestions.length; j++) {
                const answerCaseQuestion = answerCaseQuestions[j];

                // Check through open ended answers
                const openEndedAnswers = globalAnswer.openEndedAnswers;
                for(let k = 0; k < openEndedAnswers.length; k++) {
                    const openEndedAnswer = openEndedAnswers[k];
                    if(openEndedAnswer.question === answerCaseQuestion._id) {
                        let toAdd = true;
                        for(let l = 0; l < globalScoreQuestionMap.length; l++) {
                            const globalScoreQuestionMapObject = globalScoreQuestionMap[l];
                            if(globalScoreQuestionMapObject.questionId === answerCaseQuestion._id) {
                                toAdd = false;
                                globalScoreQuestionMap.totalScore += openEndedAnswer.score;
                                globalScoreQuestionMap.numAttempts++;
                                break;
                            }
                        }
                        if(toAdd) {
                            globalScoreQuestionMap.push({
                                questionId: answerCaseQuestion._id,
                                totalScore: openEndedAnswer.score,
                                numAttempts: 1
                            });
                        }
                        break;
                    }
                }

                // Check through MCQ Answers
                const mcqAnswers = globalAnswer.mcqAnswers;
                for(let k = 0; k < mcqAnswers.length; k++) {
                    const mcqAnswer = mcqAnswers[k];
                    if(mcqAnswer.question === answerCaseQuestion._id) {
                        let toAdd = true;
                        for(let l = 0; l < globalScoreQuestionMap.length; l++) {
                            const globalScoreQuestionMapObject = globalScoreQuestionMap[l];
                            if(globalScoreQuestionMapObject.questionId === answerCaseQuestion._id) {
                                toAdd = false;
                                globalScoreQuestionMap.totalScore += mcqAnswer.score;
                                globalScoreQuestionMap.numAttempts++;
                                break;
                            }
                        }
                        if(toAdd) {
                            globalScoreQuestionMap.push({
                                questionId: answerCaseQuestion._id,
                                totalScore: mcqAnswer.score,
                                numAttempts: 1
                            });
                        }
                        break;
                    }
                }
            }
        }

        // Sort the global average scores
        const sortedGlobalScoreQuestionMap = [];
        for(let i = 0; i < answerCaseQuestions.length; i++) {
            const answerCaseQuestion = answerCaseQuestions[i];
            for(let j = 0; j < globalScoreQuestionMap.length; j++) {
                const globalScoreQuestionMapObject = globalScoreQuestionMap[j];
                if(answerCaseQuestion._id === globalScoreQuestionMapObject.questionId) {
                    sortedGlobalScoreQuestionMap.push(globalScoreQuestionMapObject);
                    break;
                }
            }
        }

        // Calculate the global average scores
        const globalAverageScores = [];
        for(let i = 0; i < sortedGlobalScoreQuestionMap.length; i++) {
            const globalScoreQuestionMapObject = sortedGlobalScoreQuestionMap[i];
            let averageGlobalScore = globalScoreQuestionMapObject.totalScore !== 0? globalScoreQuestionMapObject.totalScore/globalScoreQuestionMapObject.numAttempts: 0;
            const decimalIndex = String(averageGlobalScore).indexOf('.');
            if(decimalIndex !== -1 && !(decimalIndex + 2 >= averageGlobalScore.length - 1)) {
                averageGlobalScore = averageGlobalScore.toFixed(2);
            }
            globalAverageScores.push(averageGlobalScore);
        }

        const option = {
            title: {
                text: 'Score Comparison'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            xAxis: {
                name: 'Questions',
                type: 'category',
                data: xAxisData
            },
            yAxis: {
                name: 'Score',
                type: 'value'
            },
            series: [{
                name: 'Your Score',
                data: studentScores,
                type: 'bar'
            }, {
                name: 'Global Average Score',
                data: globalAverageScores,
                type: 'bar'
            }]
        };

        return(
            <div>
                <ReactEcharts showLoading={false} option={option} notMerge={true} lazyUpdate={true} />
            </div>
        );
    }
}

export default StudentIndividualCaseLatestAttemptOverview;