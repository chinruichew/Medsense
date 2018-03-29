import React, {Component} from 'react';
import ReactEcharts from 'echarts-for-react';

class StudentIndividualCaseOverviewChart extends Component {
    onChartClick = (params) => {
        if (params.componentType === 'series') {
            const dataIndex = params.dataIndex;
            this.props.setSelectedAnswerIndex(dataIndex);
        }
    };

    render() {
        const answers = this.props.answers;

        // Store the score and attempt of each answer into the overviewData array and xAxisData array respectively.
        // The array of scores will be used for charting of the line graph while the attempts will be used as points on the x-Axis legend.
        // Find the max score at the same time to set the max Y-axis value of the chart.
        const overviewData = [];
        const xAxisData = [];
        let maxScore = 0;
        for(let i = 0; i < answers.length; i++) {
            const answer = answers[i];
            overviewData.push(answer.score);
            xAxisData.push('Attempt ' + answer.attempt);
            if(answer.score > maxScore) {
                maxScore = answer.score;
            }
        }

        // The cohortAnswers props contains all the answers for this selected case across all users of the application.
        // Next step is to tabulate for each attempt in this list of answers, how many attempts in total and what is the total score.
        // The json object in cohortOverviewData array are to be number of attemps and total score for Attempt 1, 2, 3 and so on...
        // Loop through cohortAnswers and for each one, check whether an attempt index already exists in the cohortOverviewData array by looping it as well.
        // If attempt index does exist, add to the numAttempts and total score or else add a new json object representing the data.
        const cohortOverviewData = [];
        for(let i = 0; i < this.props.cohortAnswers.length; i++) {
            const cohortAnswer = this.props.cohortAnswers[i];
            let toAdd = true;
            for(let j = 0; j < cohortOverviewData.length; j++) {
                const cohortOverview = cohortOverviewData[j];
                if(cohortOverview.attempt === cohortAnswer.attempt) {
                    cohortOverview.numAttempts++;
                    cohortOverview.totalScore += cohortAnswer.score;
                    toAdd = false;
                    break;
                }
            }
            if(toAdd) {
                cohortOverviewData.push({
                    attempt: cohortAnswer.attempt,
                    totalScore: cohortAnswer.score,
                    numAttempts: 1
                });
            }
        }

        // Sort the cohort overview data according to the attempt index as array objects may not be always created in order.
        // Loop through cohortOverviewData n times where n = its length and inner loop to find the attempt index which is equal to the current array index.
        // If so, add to sortedCohortOverviewData.
        // To-do: change this to merge sort for greater efficiency.
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

        // This step is to find the average cohort score for each attempt index, which is the total score / number of attempts.
        // Loop through sortedCohortOverviewData and get the averageCohortScore for each attempt element.
        // Then, check whether the average score is a decimal value and convert to 2 decimals if so.
        // At the same time, find the max score for use as the Y-axis highest value.
        const averageCohortData = [];
        for(let i = 0; i < sortedCohortOverviewData.length; i++) {
            const cohortOverview = sortedCohortOverviewData[i];
            let averageCohortScore = cohortOverview.totalScore !== 0? cohortOverview.totalScore/cohortOverview.numAttempts: 0;
            const decimalIndex = String(averageCohortScore).indexOf('.');
            if(decimalIndex !== -1 && !(decimalIndex + 2 >= averageCohortScore.length - 1)) {
                averageCohortScore = averageCohortScore.toFixed(2);
            }
            averageCohortData.push(averageCohortScore);

            // Replace max value if applicable
            if(averageCohortScore > maxScore) {
                maxScore = averageCohortScore.score;
            }
        }

        // Get score difference Data
        const differenceData = [];
        for(let i = 0; i < answers.length; i++) {
            const answer = answers[i];
            let differenceScore = averageCohortData[i] - answer.score > 0? averageCohortData[i] - answer.score: 0;
            const decimalIndex = String(differenceScore).indexOf('.');
            if(decimalIndex !== -1 && !(decimalIndex + 2 >= differenceScore.length - 1)) {
                differenceScore = differenceScore.toFixed(2);
            }
            differenceData.push(differenceScore);
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
                    "data": overviewData,
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

export default StudentIndividualCaseOverviewChart;