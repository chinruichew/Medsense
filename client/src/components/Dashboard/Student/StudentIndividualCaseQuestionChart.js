import React, {Component} from 'react';
import ReactEcharts from 'echarts-for-react';

class StudentIndividualCaseQuestionChart extends Component {
    onChartClick = (params) => {
        if (params.componentType === 'series') {
            const dataIndex = params.dataIndex;
            this.props.setSelectedAnswerIndex(dataIndex);
        }
    };

    render() {
        const answers = this.props.answers;
        const cohortAnswers = this.props.cohortAnswers;
        const question = this.props.question;

        // This step is to retrieve all attempts at the question and categorize them according to their indexes.
        // Loop through answers, which contains all the attempts at the case throughout the whole user base.
        // Check whether Answer is MCQ or Open-ended by their type attribute, then store the answer in answerOfQuestion.
        const questionAnswerData = [];
        const xAxisData = [];
        let maxScore = 0;
        for(let i = 0; i < answers.length; i++) {
            const answer = answers[i];

            // Push the attempt indexes into the xAxisData array for x-axis labels.
            xAxisData.push('Attempt ' + answer.attempt);

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
            questionAnswerData.push(answerOfQuestion.score);

            // Get the max score of the answers for y-axis max value.
            if(maxScore < answerOfQuestion.score) {
                maxScore = answerOfQuestion.score;
            }
        }

        // Map cohort answers of the same question to their attempts
        const cohortOverviewData = [];
        for(let i = 0; i < cohortAnswers.length; i++) {
            const cohortAnswer = cohortAnswers[i];
            const mcqAnswers = cohortAnswer.mcqAnswers;
            const openEndedAnswers = cohortAnswer.openEndedAnswers;

            // Check whether Answer is MCQ or Open-ended and store accordingly
            let answerOfQuestion = null;
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

            if(answerOfQuestion !== null) {
                let toAdd = true;
                for(let j = 0; j < cohortOverviewData.length; j++) {
                    const cohortOverview = cohortOverviewData[j];
                    if(cohortOverview.attempt === cohortAnswer.attempt) {
                        cohortOverview.numAttempts++;
                        cohortOverview.totalScore += answerOfQuestion.score;
                        toAdd = false;
                        break;
                    }
                }
                if(toAdd) {
                    cohortOverviewData.push({
                        attempt: cohortAnswer.attempt,
                        totalScore: answerOfQuestion.score,
                        numAttempts: 1
                    });
                }
            }
        }

        // Sort the cohort overview data
        const sortedCohortOverviewData = [];
        for(let i = 1; i <= cohortOverviewData.length; i++) {
            for(let j = 0; j < cohortOverviewData.length; j++) {
                const cohortOverview = cohortOverviewData[j];
                if(cohortOverview.attempt === i) {
                    sortedCohortOverviewData.push(cohortOverview);
                    break;
                }
            }
        }

        // Insert averages of cohort data
        const averageCohortData = [];
        for(let i = 0; i < sortedCohortOverviewData.length; i++) {
            const cohortOverview = cohortOverviewData[i];
            let averageCohortScore = cohortOverview.totalScore !== 0? cohortOverview.totalScore/cohortOverview.numAttempts: 0;
            const decimalIndex = String(averageCohortScore).indexOf('.');
            if(decimalIndex !== -1 && !(decimalIndex + 2 >= averageCohortScore.length - 1)) {
                averageCohortScore = averageCohortScore.toFixed(2);
            }
            averageCohortData.push(averageCohortScore);

            // Replace max value if applicable
            if(averageCohortScore > maxScore) {
                maxScore = averageCohortScore;
            }
        }

        // Get score difference Data by deducting the question answer score from the average cohort data.
        const differenceData = [];
        for(let i = 0; i < questionAnswerData.length; i++) {
            const questionAnswerScore = questionAnswerData[i];
            differenceData.push(averageCohortData[i] - questionAnswerScore > 0? averageCohortData[i] - questionAnswerScore: 0);
        }

        // Define the chart options
        const option = {
            "title": {
                "text": "Question Overview",
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
                        "name": "Score to improve",
                        "icon": "circle",
                        "textStyle": {
                            "color": "#7d838b"
                        }
                    },
                    {
                        "name": "Score",
                        "icon": "circle",
                        "textStyle": {
                            "color": "#7d838b"
                        }
                    },
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
                    "name": "Score to improve",
                    "type": "bar",
                    "data": differenceData,
                    "barWidth": "auto",
                    "itemStyle": {
                        "normal": {
                            "color": {
                                "type": "linear",
                                "x": 0,
                                "y": 0,
                                "x2": 0,
                                "y2": 1,
                                "colorStops": [
                                    {
                                        "offset": 0,
                                        "color": "rgba(255,37,117,0.7)"
                                    },
                                    {
                                        "offset": 0.5,
                                        "color": "rgba(0,133,245,0.7)"
                                    },
                                    {
                                        "offset": 1,
                                        "color": "rgba(0,133,245,0.3)"
                                    }
                                ],
                                "globalCoord": false
                            }
                        }
                    }
                },
                {
                    "name": "Score",
                    "type": "line",
                    "yAxisIndex": 0,
                    "data": questionAnswerData,
                    "itemStyle": {
                        "normal": {
                            "color": "#FF00FF"
                        }
                    },
                    "smooth": true
                },
                {
                    "name": "Global Average Score",
                    "type": "line",
                    "yAxisIndex": 0,
                    "data": averageCohortData,
                    "itemStyle": {
                        "normal": {
                            "color": "#00B200"
                        }
                    },
                    "smooth": true
                }
            ]
        };

        let onEvents = {
            'click': this.onChartClick
        };

        return(
            <ReactEcharts onEvents={onEvents} showLoading={false} option={option} notMerge={true} lazyUpdate={true} />
        );
    }
}

export default StudentIndividualCaseQuestionChart;