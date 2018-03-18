import React, {Component} from 'react';
import axios from 'axios';
import {Button, ControlLabel, FormControl, FormGroup} from "react-bootstrap";
import ReactHtmlParser from 'react-html-parser';
import { Charts, ChartContainer, ChartRow, YAxis, LineChart } from "react-timeseries-charts";
import { TimeSeries, TimeRange } from "pondjs";
import Timeline from 'react-visjs-timeline';

class IndividualCaseStatistics extends Component {
    state = {
        answers: null,
        selectedAnswerIndex: 0,
        questionFilter: 'All'
    };

    componentDidMount() {
        axios.get('/api/getAnswersByCase?id=' + this.props.caseId).then(res => {
            this.setState({answers: res.data});
        });
    }

    renderOverviews = () => {
        return this.state.answers.map((answer, index) => {
            const options = {
                width: '100%',
                height: '200px',
                stack: false,
                showMajorLabels: true,
                showCurrentTime: true,
                zoomMin: 1000000,
                type: 'range',
                autoResize: true
            };
            const items = [{
                start: new Date(2010, 7, 15),
                end: new Date(2011, 7, 16),
                content: 'Trajectory A',
                title: 'hello'
            }];
            return(
                <div key={index}>
                    <Timeline options={options} items={items} />
                </div>
            );
        });
    };

    renderTimeSeriesGraphs = () => {
        const data = {
            name: "traffic",
            columns: ["time", "in", "out"],
            points: [
                [1400425947000, 52, 41],
                [1400425948000, 18, 45],
                [1400425949000, 26, 49],
                [1400425950000, 93, 81]
            ]
        };
        const timeseries = new TimeSeries(data);

        return(
            <ChartContainer timeRange={timeseries.timerange()} width={800}>
                <ChartRow height="200">
                    <YAxis id="axis1" label="AUD" min={0.5} max={1.5} width="60" type="linear" format="$,.2f"/>
                    <Charts>
                        <LineChart axis="axis1" series={timeseries}/>
                    </Charts>
                    <YAxis id="axis2" label="Euro" min={0.5} max={1.5} width="80" type="linear" format="$,.2f"/>
                </ChartRow>
            </ChartContainer>
        );
    };

    handleAttemptFilterChange = (e) => {
        this.setState({
            selectedAnswerIndex: e.target.value - 1
        });
    };

    renderAttemptFilter = () => {
        const attempts = this.state.answers.map((answer, index) => {
            return(
                <option key={index} value={answer.attempt}>Attempt {answer.attempt}</option>
            );
        });
        return(
            <div className="col-md-2">
                <FormGroup controlId="formControlsType">
                    <ControlLabel>Filter Attempts</ControlLabel>
                    <FormControl componentClass="select" value={this.state.selectedAnswerIndex} onChange={(e)=>this.handleAttemptFilterChange(e)}>
                        {attempts}
                    </FormControl>
                </FormGroup>
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
        const caseQuestions = answer.case.questions.map((caseQuestion, index) => {
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

    renderQuestionAnswers = () => {
        const answer = this.state.answers[this.state.selectedAnswerIndex];
        const caseQuestions = answer.case.questions;
        const mcqAnswers = answer.mcqAnswers;
        const openEndedAnswers = answer.openEndedAnswers;
        return caseQuestions.map((question, index) => {
            if(this.state.questionFilter === 'All' || this.state.questionFilter === question.id) {
                let modelAnswer = question.openEnded;
                if(question.openEnded === '') {
                    const questionOptions = question.options;
                    let questionOptionsDisplay = '';
                    for(let i = 0; i < questionOptions.length; i++) {
                        const questionOption = questionOptions[i];
                        if(questionOption.check) {
                            questionOptionsDisplay += questionOption.mcq + ',';
                        }
                    }
                    modelAnswer = questionOptionsDisplay;
                } else {
                    modelAnswer = ReactHtmlParser(modelAnswer);
                }
                let answerOfQuestion = '';
                let answerType = 'mcq';
                for(let i = 0; i < mcqAnswers.length; i++) {
                    const mcqAnswer = mcqAnswers[i];
                    if(mcqAnswer.question === question._id) {
                        answerOfQuestion = mcqAnswer;
                        break;
                    }
                }
                for(let i = 0; i < openEndedAnswers.length; i++) {
                    const openEndedAnswer = openEndedAnswers[i];
                    if(openEndedAnswer.question === question._id) {
                        answerOfQuestion = openEndedAnswer;
                        answerType = 'open-ended';
                        break;
                    }
                }
                let displayAnswer = '';
                if(answerType === 'open-ended') {
                    displayAnswer = ReactHtmlParser(answerOfQuestion.studentAnswer);
                } else {
                    // Display MCQ Answers here
                }
                return(
                    <div key={index} className="col-md-12">
                        <h2>Question {question.id}</h2>
                        <h3>Question Description</h3>
                        <p>{ReactHtmlParser(question.question)}</p>
                        <h3>Your Answer</h3>
                        <p>{displayAnswer}</p>
                        <h3>Model Answer</h3>
                        <p>{modelAnswer}</p>
                    </div>
                );
            }
        });
    };

    renderContent = () => {
        switch(this.state.answers) {
            case null:
                return;
            default:
                return(
                    <div className="container">
                        <div className="row">
                            <br/>
                            <Button onClick={this.props.returnToCaseStats} bsStyle="primary">Back</Button>
                            <div className="col-md-12 text-center">
                                <h1>{this.state.answers[0].case.title}</h1>
                            </div>
                        </div>
                        {/*To do - Allow hiding and showing of very detailed data*/}
                        <div className="row" style={{marginBottom: '50px'}}>
                            {/*To do - Complete timeline display of attempts*/}
                            {this.renderOverviews()}
                        </div>
                        <div className="row" style={{marginBottom: '50px'}}>
                            {/*To do - Add time series line chart comparison against cohort over several attempts*/}
                            {this.renderTimeSeriesGraphs()}
                        </div>
                        <div className="row" style={{marginBottom: '50px'}}>
                            {/*To do - Add bar chart to show data over several attempts*/}
                        </div>
                        <div className="row">
                            {/*To do - Implement Attempt filters*/}
                            {this.renderAttemptFilter()}
                            {this.renderQuestionFilter()}
                            {this.renderQuestionAnswers()}
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

export default IndividualCaseStatistics;