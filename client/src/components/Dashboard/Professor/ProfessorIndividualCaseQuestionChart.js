import React, {Component} from 'react';
import ReactEcharts from 'echarts-for-react';

class ProfessorIndividualCaseQuestionChart extends Component {
    render() {
        const answers = this.props.answers;
        const question = this.props.question;

        // This step is to retrieve all attempts at the question and categorize them according to their indexes.
        // Loop through answers, which contains all the attempts at the case throughout the whole user base.
        // Check whether Answer is MCQ or Open-ended by their type attribute, then store the answer in answerOfQuestion.
        // Check whether the attempt index is already stored as there might be duplicates, since answers contains attempts by all users.
        // Add to the answerOfQuestion score in questionAnswerData along with the number of attempts during each loop.
        const questionAnswerData = [];
        const xAxisData = [];
        let maxScore = 0;
        for(let i = 0; i < answers.length; i++) {
            const answer = answers[i];

            // Get MCQ and Open-ended answer arrays
            const mcqAnswers = answer.mcqAnswers;
            const openEndedAnswers = answer.openEndedAnswers;

            // Check whether Answer is MCQ or Open-ended and store accordingly.
            // Loop through each array and find the answer that corresponds to the question id.
            let answerOfQuestion = '';
            let answerType = 'mcq';
            for(let j = 0; j < mcqAnswers.length; j++) {
                const mcqAnswer = mcqAnswers[j];
                if(mcqAnswer.question === question._id) {
                    answerOfQuestion = mcqAnswer;
                    break;
                }
            }
            for(let j = 0; j < openEndedAnswers.length; j++) {
                const openEndedAnswer = openEndedAnswers[j];
                if(openEndedAnswer.question === question._id) {
                    answerOfQuestion = openEndedAnswer;
                    answerType = 'open-ended';
                    break;
                }
            }

            // Check whether the attempt index is already stored as there might be duplicates, add into the arrays if no duplicates.
            let toAdd = true;
            for(let j = 0; j < xAxisData.length; j++){
                const xAxisDataObject = xAxisData[j];
                if(xAxisDataObject === 'Attempt ' + answer.attempt) {
                    // Add score and attempt to questionAnswerData array.
                    const questionAnswerDataObject = questionAnswerData[j];
                    questionAnswerDataObject.totalScore += answerOfQuestion.score;
                    questionAnswerDataObject.numAttempts++;
                    toAdd = false;
                    break;
                }
            }
            if(toAdd) {
                // Push the attempt indexes into the xAxisData array for x-axis labels.
                xAxisData.push('Attempt ' + answer.attempt);

                // Push the attempt indexes and scores into the questionAnswerData for average score processing.
                questionAnswerData.push({
                    attempt: answer.attempt,
                    totalScore: answerOfQuestion.score,
                    numAttempts: 1
                });
            }

            // Get the max score of the answers for y-axis max value.
            if(maxScore < answerOfQuestion.score) {
                maxScore = answerOfQuestion.score;
            }
        }

        // Insert averages of all user data per attempt index
        const averageGlobalData = [];
        for(let i = 0; i < questionAnswerData.length; i++) {
            const questionAnswerDataObject = questionAnswerData[i];
            let averageCohortScore = questionAnswerDataObject.totalScore !== 0? questionAnswerDataObject.totalScore/questionAnswerDataObject.numAttempts: 0;
            const decimalIndex = String(averageCohortScore).indexOf('.');
            if(decimalIndex !== -1 && !(decimalIndex + 2 >= averageCohortScore.length - 1)) {
                averageCohortScore = averageCohortScore.toFixed(2);
            }
            averageGlobalData.push(averageCohortScore);
        }

        // Define the chart options
        const option = {
            "title": {
                "text": "Attempt Overview",
                "left": "center",
                "y": "10",
                "textStyle": {
                    "color": "#fff"
                }
            },
            "backgroundColor": "#1c2e40",
            "color": "#384757",
            "tooltip": {
                "trigger": "axis",
                "axisPointer": {
                    "type": "cross",
                    "crossStyle": {
                        "color": "#384757"
                    }
                }
            },
            "legend": {
                "data": [
                    {
                        "name": "Global Average Score",
                        "icon": "circle",
                        "textStyle": {
                            "color": "#7d838b"
                        }
                    }
                ],
                "top": "10%",
                "textStyle": {
                    "color": "#fff"
                }
            },
            "xAxis": [
                {
                    "type": "category",
                    "data": xAxisData,
                    "axisPointer": {
                        "type": "shadow"
                    },
                    "axisLabel": {
                        "show": true,
                        "textStyle": {
                            "color": "#7d838b"
                        }
                    }
                }
            ],
            "yAxis": [
                {
                    "type": "value",
                    "name": "Score",
                    "nameTextStyle": {
                        "color": "#7d838b"
                    },
                    "min": 0,
                    "max": maxScore,
                    "axisLabel": {
                        "show": true,
                        "textStyle": {
                            "color": "#7d838b"
                        }
                    },
                    "axisLine": {
                        "show": true
                    },
                    "splitLine": {
                        "lineStyle": {
                            "color": "#7d838b"
                        }
                    }
                },
                {
                    "type": "value",
                    "name": "Score",
                    "nameTextStyle": {
                        "color": "#7d838b"
                    },
                    "show": true,
                    "min": 0,
                    "max": maxScore,
                    "axisLabel": {
                        "show": true,
                        "textStyle": {
                            "color": "#7d838b"
                        }
                    }
                }
            ],
            "grid": {
                "top": "20%"
            },
            "series": [
                {
                    "name": "Global Average Score",
                    "type": "line",
                    "yAxisIndex": 0,
                    "data": averageGlobalData,
                    "itemStyle": {
                        "normal": {
                            "color": "#00B200"
                        }
                    },
                    "smooth": true
                }
            ]
        };

        return(
            <ReactEcharts showLoading={false} option={option} notMerge={true} lazyUpdate={true} />
        );
    }
}

export default ProfessorIndividualCaseQuestionChart;