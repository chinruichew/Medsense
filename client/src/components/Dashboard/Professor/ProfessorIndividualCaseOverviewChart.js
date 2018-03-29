import React, {Component} from 'react';
import ReactEcharts from 'echarts-for-react';

class ProfessorIndividualCaseOverviewChart extends Component {
    render() {
        const answers = this.props.answers;

        // The answers props contains all the answers for this selected case across all users of the application.
        // Next step is to tabulate for each attempt in this list of answers, how many attempts in total and what is the total score.
        // The json object in cohortOverviewData array are to be number of attemps and total score for Attempt 1, 2, 3 and so on...
        // Loop through answers and for each one, check whether an attempt index already exists in the cohortOverviewData array by inner looping it as well.
        // If attempt index does exist, add to the numAttempts and total score or else add a new json object representing the data.
        const cohortOverviewData = [];
        for(let i = 0; i < answers.length; i++) {
            const answer = answers[i];
            let toAdd = true;
            for(let j = 0; j < cohortOverviewData.length; j++) {
                const cohortOverview = cohortOverviewData[j];
                if(cohortOverview.attempt === answer.attempt) {
                    cohortOverview.numAttempts++;
                    cohortOverview.totalScore += answer.score;
                    toAdd = false;
                    break;
                }
            }
            if(toAdd) {
                cohortOverviewData.push({
                    attempt: answer.attempt,
                    totalScore: answer.score,
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

        // This step is to get the labels on the x-Axis, which is the Attempt indexes.
        // Simply loop through sortedCohortOverviewData and add 'Attempt ' + (loop index + 1) each time.
        const xAxisData = [];
        for(let i = 0; i < sortedCohortOverviewData.length; i++) {
            xAxisData.push('Attempt ' + (i + 1));
        }

        // This step is to find the average cohort score for each attempt index, which is the total score / number of attempts.
        // Loop through sortedCohortOverviewData and get the averageCohortScore for each attempt element.
        // Then, check whether the average score is a decimal value and convert to 2 decimals if so.
        // At the same time, find the max score for use as the Y-axis highest value.
        const averageCohortData = [];
        let maxScore = 0;
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

        return(
            <ReactEcharts showLoading={false} option={option} notMerge={true} lazyUpdate={true} />
        );
    }
}

export default ProfessorIndividualCaseOverviewChart;