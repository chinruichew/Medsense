import React, {Component} from 'react';
import {Button, ControlLabel, FormControl, FormGroup, Image, Panel} from "react-bootstrap";
import Timeline from 'react-visjs-timeline';
import axios from 'axios';
import ReactHtmlParser from "react-html-parser";
import ReactEcharts from 'echarts-for-react';
import {connect} from "react-redux";

import {fetchConstantTypes} from "../../../actions";

class ProfessorIndividualCaseStatistics extends Component {
    state = {
        answers: null,
        selectedAnswerIndex: 0,
        questionFilter: 'All'
    };

    componentDidMount() {
        this.props.fetchConstantTypes();
        axios.get('/api/getAnswersByCase?id=' + this.props.reviewedCase._id).then(res => {
            this.setState({
                answers: res.data
            });
        }).catch(err => {
            console.log(err);
        });
    }

    visTimelineClickHandler = (props) => {
        const answerId = props.item;
        if(answerId !== null) {
            this.setState({
                selectedAnswerIndex: answerId
            });
        }
    };

    renderOverviews = () => {
        const options = {
            width: '100%',
            height: '200px',
            stack: false,
            showMajorLabels: true,
            showCurrentTime: true,
            zoomMin: 1000,
            type: 'range',
            autoResize: true
        };
        const items = [];
        for(let i = 0; i < this.state.answers.length; i++) {
            const answer = this.state.answers[i];
            items.push({
                start: new Date(answer.startTime),
                end: new Date(answer.endTime),
                content: 'Attempt ' + answer.attempt,
                title: 'Attempt ' + answer.attempt,
                id: i
            });
        }
        return(
            <div>
                <Timeline options={options} items={items} clickHandler={this.visTimelineClickHandler} />
            </div>
        );
    };

    handleQuestionFilterChange = (e) => {
        this.setState({
            questionFilter: e.target.value
        });
    };

    renderQuestionFilter = () => {
        const answer = this.state.answers[this.state.selectedAnswerIndex];
        let counter = 1;
        const sortedCaseQuestions = [];
        while(counter <= answer.case.questions.length) {
            for(let i = 0; i < answer.case.questions.length; i++) {
                const caseQuestion = answer.case.questions[i];
                if(caseQuestion.id === String(counter)) {
                    sortedCaseQuestions.push(caseQuestion);
                    counter++;
                    break;
                }
            }
        }
        const caseQuestions = sortedCaseQuestions.map((caseQuestion, index) => {
            return(
                <option key={index} value={caseQuestion.id}>Question {caseQuestion.id}</option>
            );
        });
        return(
            <div className="col-md-2">
                <FormGroup controlId="formControlsType">
                    <ControlLabel>Filter Questions</ControlLabel>
                    <FormControl componentClass="select" value={this.state.questionFilter} onChange={(e)=>this.handleQuestionFilterChange(e)}>
                        <option value="All">All</option>
                        {caseQuestions}
                    </FormControl>
                </FormGroup>
            </div>
        );
    };

    renderAverageScoreChart = (caseQuestion) => {
        // Create time frame of 12 weeks
        const backlog = 12;
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() - 7 * backlog);
        const timeData = [];
        for(let i = 0; i < backlog; i++) {
            currentDate.setDate(currentDate.getDate() + 7);
            timeData.push({
                dateString: currentDate.toDateString(),
                count: 0,
                totalScore: 0
            });
        }
        for(let i = 0; i < this.state.answers.length; i++){
            const answer = this.state.answers[i];
            for(let j = 0; j < timeData.length; j++) {
                const dateTime = timeData[j];
                const dateTimeForward = timeData[j + 1];
                if(new Date(answer.endTime) >= new Date(dateTime.dateString) && new Date(answer.endTime) <= new Date(dateTimeForward.dateString)) {
                    dateTime.count++;
                    if(answer.openEndedAnswers.length > 0) {
                        for(let k = 0; k < answer.openEndedAnswers.length; k++) {
                            const openEndedAnswer = answer.openEndedAnswers[k];
                            if(openEndedAnswer.question === caseQuestion._id) {
                                dateTime.totalScore += openEndedAnswer.score;
                                break;
                            }
                        }
                    }
                    if(answer.mcqAnswers.length > 0) {
                        for(let k = 0; k < answer.mcqAnswers.length; k++) {
                            const mcqAnswer = answer.mcqAnswers[k];
                            if(mcqAnswer.question === caseQuestion._id) {
                                dateTime.totalScore += mcqAnswer.score;
                                break;
                            }
                        }
                    }
                }
            }
        }
        const xAxisData = [];
        const yAxisData = [];
        for(let i = 0; i < timeData.length; i++){
            xAxisData.push(timeData[i].dateString);
            let averageScore = timeData[i].totalScore !== 0 && timeData[i].count !== 0? (timeData[i].totalScore/timeData[i].count).toFixed(2): 0;
            yAxisData.push(averageScore);
        }
        const option = {
            backgroundColor:'#FFFFFF',
            title: {
                text: 'Average score over time'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data:['Average Score']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: xAxisData
            },
            yAxis: {
                type: 'value',
                name: 'Score',
                min: 0,
                max: 50,
                interval: 10,
            },
            series: [
                {
                    name:'Average Score',
                    type:'line',
                    data:yAxisData
                }
            ]
        };
        return(
            <ReactEcharts option={option} notMerge={true} lazyUpdate={true} />
        );
    };

    renderNLPAccuracyChart = (caseQuestion) => {
        // Create time frame of 12 weeks
        const backlog = 12;
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() - 7 * backlog);
        const timeData = [];
        for(let i = 0; i < backlog; i++) {
            currentDate.setDate(currentDate.getDate() + 7);
            timeData.push({
                dateString: currentDate.toDateString(),
                count: 0,
                totalAccuracy: 0
            });
        }
        for(let i = 0; i < this.state.answers.length; i++){
            const answer = this.state.answers[i];
            for(let j = 0; j < timeData.length; j++) {
                const dateTime = timeData[j];
                const dateTimeForward = timeData[j + 1];
                if(new Date(answer.endTime) >= new Date(dateTime.dateString) && new Date(answer.endTime) <= new Date(dateTimeForward.dateString)) {
                    dateTime.count++;
                    if(answer.openEndedAnswers.length > 0) {
                        for(let k = 0; k < answer.openEndedAnswers.length; k++) {
                            const openEndedAnswer = answer.openEndedAnswers[k];
                            if(openEndedAnswer.question === caseQuestion._id) {
                                dateTime.totalAccuracy += openEndedAnswer.nlpAccuracy;
                                break;
                            }
                        }
                    }
                }
            }
        }
        const xAxisData = [];
        const yAxisData = [];
        for(let i = 0; i < timeData.length; i++){
            xAxisData.push(timeData[i].dateString);
            let averageAccuracy = timeData[i].totalAccuracy !== 0 && timeData[i].count !== 0? (timeData[i].totalAccuracy/timeData[i].count).toFixed(2): 0;
            yAxisData.push(averageAccuracy);
        }
        const option = {
            backgroundColor:'#FFFFFF',
            title: {
                text: 'Average Answer Accuracy over time'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data:['Average Accuracy']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: xAxisData
            },
            yAxis: {
                type: 'value',
                name: 'Accuracy (%)',
                min: 0,
                max: 50,
                interval: 10,
            },
            series: [
                {
                    name:'Average Accuracy',
                    type:'line',
                    data:yAxisData
                }
            ]
        };
        return(
            <ReactEcharts option={option} notMerge={true} lazyUpdate={true} />
        );
    };

    renderBarChart = (caseQuestion) => {
        const option = {
            backgroundColor:'#FFFFFF',
            title: {
                //text: '检查企业信息分析'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            toolbox: {
                feature: {
                    dataView: {show: true, readOnly: false},
                    //magicType: {show: true, type: ['stack', 'tiled']},
                    restore: {show: true},
                    saveAsImage: {show: true}
                }
            },
            legend: {
                data: ['检查企业数', '完成整改企业数', '违法违规企业数']
            },

            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [{
                type: 'category',
                data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
            }],
            yAxis: [{
                type: 'value',
                //name: '投诉举报数',
                axisLabel: {
                    formatter: '{value}'
                }
            }],
            series: [{
                name: '检查企业数',
                type: 'bar',
                itemStyle:{
                    normal:{color:'#01949B'},
                },
                markPoint : {
                    data : [
                        {type : 'max', name : '最大值'},
                        {type : 'min', name : '最小值'}
                    ]
                },
                markLine : {
                    data : [
                        {type : 'average', name : '平均值'}
                    ]
                },
                data: [2031, 1793, 3640, 2593, 4377,3201, 2275, 3289, 3356,2859,4244,3945]
            }, {
                name: '完成整改企业数',
                type: 'bar',
                itemStyle:{
                    normal:{color:'#EBA954'},
                },
                markPoint : {
                    data : [
                        {type : 'max', name : '最大值'},
                        {type : 'min', name : '最小值'}
                    ]
                },
                markLine : {
                    data : [
                        {type : 'average', name : '平均值'}
                    ]
                },
                data: [1043, 1456, 1900, 1200, 2100,1870, 980, 1569, 1130, 1490,2300, 2210]
            }, {
                name: '违法违规企业数',
                type: 'bar',
                itemStyle:{
                    normal:{color:'#C23531'},
                },
                markPoint : {
                    data : [
                        {type : 'max', name : '最大值'},
                        {type : 'min', name : '最小值'}
                    ]
                },
                markLine : {
                    data : [
                        {type : 'average', name : '平均值'}
                    ]
                },
                data: [787, 571, 999, 341, 231,812, 735, 231,322,712,1230, 870]
            }]
        };
        return(
            <ReactEcharts option={option} notMerge={true} lazyUpdate={true} />
        );
    };

    renderQuestionCharts = (caseQuestion) => {
        if(caseQuestion.type === this.props.constants.QUESTION_TYPE_MCQ) {
            return(
                <div className="row">
                    <div className="col-md-12 chart-col">
                        {this.renderAverageScoreChart(caseQuestion)}
                    </div>
                    {/*<div className="col-md-12 chart-col">*/}
                        {/*{this.renderBarChart(caseQuestion)}*/}
                    {/*</div>*/}
                </div>
            );
        } else {
            return(
                <div className="row">
                    <div className="col-md-12 chart-col">
                        {this.renderAverageScoreChart(caseQuestion)}
                    </div>
                    <div className="col-md-12 chart-col">
                        {this.renderNLPAccuracyChart(caseQuestion)}
                    </div>
                </div>
            );
        }
    };

    renderQuestionStats = () => {
        const reviewedCase = this.props.reviewedCase;
        const caseQuestions = reviewedCase.questions;
        let counter = 1;
        const sortedCaseQuestions = [];
        while(counter <= caseQuestions.length) {
            for(let i = 0; i < caseQuestions.length; i++) {
                const caseQuestion = caseQuestions[i];
                if(caseQuestion.id === String(counter)) {
                    sortedCaseQuestions.push(caseQuestion);
                    counter++;
                    break;
                }
            }
        }

        return caseQuestions.map((caseQuestion, index) => {
            if(this.state.questionFilter === 'All' || this.state.questionFilter === caseQuestion.id) {
                // Get Question chart stats
                const questionCharts = this.renderQuestionCharts(caseQuestion);

                // Get Model Answer
                let modelAnswer = caseQuestion.openEnded;
                if (caseQuestion.openEnded === '') {
                    const questionOptions = caseQuestion.options;
                    let questionOptionsDisplay = '';
                    for (let i = 0; i < questionOptions.length; i++) {
                        const questionOption = questionOptions[i];
                        if (questionOption.check) {
                            questionOptionsDisplay += questionOption.mcq + ',';
                        }
                    }
                    modelAnswer = questionOptionsDisplay;
                } else {
                    modelAnswer = ReactHtmlParser(modelAnswer);
                }

                // Display Picture if there is an attachment
                let questionDisplay = caseQuestion.attachment === '' ? <p>{ReactHtmlParser(caseQuestion.question)}</p> :
                    <div className="row">
                        <div className="col-md-4">
                            <p>{ReactHtmlParser(caseQuestion.question)}</p>
                        </div>
                        <div className="col-md-4">
                            <Image src={caseQuestion.attachment} style={{height: '300px', width: '300px'}} alt=""/>
                        </div>
                    </div>;

                return (
                    <div key={index} className="col-md-12 questionAnswerPanels">
                        <Panel bsStyle="primary" defaultExpanded>
                            <Panel.Heading>
                                <Panel.Title componentClass="h3" toggle>Question {caseQuestion.id}</Panel.Title>
                            </Panel.Heading>
                            <Panel.Collapse>
                                <Panel.Body>
                                    {questionCharts}
                                    <h3>Question Description</h3>
                                    {questionDisplay}
                                    <h3>Model Answer</h3>
                                    <p>{modelAnswer}</p>
                                </Panel.Body>
                            </Panel.Collapse>
                        </Panel>
                    </div>
                );
            }
            return;
        });
    };

    renderContent = () => {
        switch(this.state.answers) {
            case null:
                return;
            default:
                if(this.state.answers.length === 0) {
                    return(
                        <div className="container">
                            <div className="row">
                                <br/>
                                <div className="col-md-4 text-left">
                                    <Button style={{marginTop: '20px'}} onClick={this.props.returnToCaseStats} bsStyle="primary">Back to cases</Button>
                                </div>
                                <div className="col-md-4 text-center">
                                    <h1>{this.props.reviewedCase.title}</h1>
                                </div>
                            </div>
                            <div className="row" style={{marginBottom: '10px'}}>
                                <div className="col-md-12 text-center">
                                    <h2>Sorry, looks like there has been no attempts on the case yet.</h2>
                                </div>
                            </div>
                        </div>
                    );
                }
                return(
                    <div className="container">
                        <div className="row">
                            <br/>
                            <div className="col-md-4 text-left">
                                <Button style={{marginTop: '20px'}} onClick={this.props.returnToCaseStats} bsStyle="primary">Back to cases</Button>
                            </div>
                            <div className="col-md-4 text-center">
                                <h1>{this.props.reviewedCase.title}</h1>
                            </div>
                        </div>
                        <div className="row" style={{marginBottom: '10px'}}>
                            {this.renderOverviews()}
                        </div>
                        <div className="row">
                            {this.renderQuestionFilter()}
                            {this.renderQuestionStats()}
                        </div>
                    </div>
                );
        }
    };

    render() {
        return(
            <div>
                {this.renderContent()}
            </div>
        );
    }
}

function mapStateToProps({ constants }) {
    return { constants };
}

export default connect(mapStateToProps, {fetchConstantTypes})(ProfessorIndividualCaseStatistics);