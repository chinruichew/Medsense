import React, {Component} from 'react';
import axios from 'axios';
import {Button, ControlLabel, FormControl, FormGroup, Glyphicon} from "react-bootstrap";
import { Charts, ChartContainer, ChartRow, YAxis, LineChart } from "react-timeseries-charts";
import { TimeSeries, TimeRange } from "pondjs";
import Timeline from 'react-visjs-timeline';

import StudentIndividualCaseLatestAttemptOverview from "./StudentIndividualCaseLatestAttemptOverview";
import StudentIndividualCaseQuestionAnswers from "./StudentIndividualCaseQuestionAnswers";
import StudentIndividualCaseOverview from "./StudentIndividualCaseOverview";

class StudentIndividualCaseStatistics extends Component {
    state = {
        answers: null,
        selectedAnswerIndex: 0,
        questionFilter: 'All',
        cohortAnswers: null
    };

    componentDidMount() {
        axios.get('/api/getUserAnswersByCase?id=' + this.props.caseId).then(res => {
            this.setState({
                answers: res.data,
                selectedAnswerIndex: res.data.length - 1
            });
        }).catch(err => {
            console.log(err);
        });

        axios.get('/api/getCohortAnswersByCase?id=' + this.props.caseId).then(res => {
            this.setState({cohortAnswers: res.data});
        }).catch(err => {
            console.log(err);
        });
    }

    setSelectedAnswerIndex = (selectedAnswerIndex) => {
        this.setState({
            selectedAnswerIndex
        });
    };

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
            <div className="col-md-12 text-center" style={{marginLeft: '15%'}}>
                <ChartContainer timeRange={timeseries.timerange()} width={800}>
                    <ChartRow height="200">
                        <YAxis id="axis1" label="AUD" min={10} max={100} width="60" type="linear"/>
                        <Charts>
                            <LineChart axis="axis1" series={timeseries}/>
                        </Charts>
                    </ChartRow>
                </ChartContainer>
            </div>
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
                    <FormControl componentClass="select" value={this.state.selectedAnswerIndex + 1} onChange={(e)=>this.handleAttemptFilterChange(e)}>
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

    renderStudentTotalScore = () => {
        const answer = this.state.answers[this.state.selectedAnswerIndex];
        const answerCase = answer.case;
        const questions = answerCase.questions;
        let totalScore = 0;
        for(let i = 0; i < questions.length; i++) {
            totalScore += parseInt(questions[i].mark);
        }

        let scoreDisplayColor = 'green';
        if(answer.score/totalScore < 0.5) {
            scoreDisplayColor = 'red'
        }

        return(
            <div className="col-md-offset-4 col-md-4 text-right">
                <h3 style={{color: scoreDisplayColor}}>Total Score: {answer.score}/{totalScore}</h3>
            </div>
        );
    };

    returnToCaseStats = () => {
        this.props.returnToCaseStats(this.props.redirectFromOverview);
    };

    renderContent = () => {
        switch(this.state.answers) {
            case null:
                return;
            default:
                switch(this.state.cohortAnswers) {
                    case null:
                        return;
                    default:
                        return(
                            <div className="container">
                                <div className="row">
                                    <br/>
                                    <div className="col-md-4 text-left">
                                        <Button style={{marginTop: '20px', paddingLeft: "0"}} onClick={this.returnToCaseStats} bsSize="large" bsStyle="link">
                                            <Glyphicon glyph="chevron-left"/>Back to cases
                                        </Button>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4 col-md-offset-4 text-center">
                                        <h2><strong>{this.state.answers[0].case.title + ' - ' + this.state.answers[0].case.difficulty}</strong></h2>
                                    </div>
                                </div>
                                <div className="row" style={{marginBottom: '10px', marginTop: '20px'}}>
                                    {/*<StudentIndividualCaseOverviewChart setSelectedAnswerIndex={this.setSelectedAnswerIndex} answers={this.state.answers} caseId={this.props.caseId} cohortAnswers={this.state.cohortAnswers} />*/}
                                    <StudentIndividualCaseLatestAttemptOverview answers={this.state.answers} globalAnswers={this.state.cohortAnswers} />
                                </div>
                                <div className="row">
                                    <StudentIndividualCaseOverview case={this.state.answers[0].case} />
                                </div>
                                <div className="row">
                                    {/*{this.renderAttemptFilter()}*/}
                                    <div className="col-md-12">
                                        {this.renderQuestionFilter()}
                                        {this.renderStudentTotalScore()}
                                    </div>
                                </div>
                                <div className="row">
                                    <StudentIndividualCaseQuestionAnswers answers={this.state.answers} selectedAnswerIndex={this.state.selectedAnswerIndex} questionFilter={this.state.questionFilter} />
                                </div>
                            </div>
                        );
                }
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

export default StudentIndividualCaseStatistics;