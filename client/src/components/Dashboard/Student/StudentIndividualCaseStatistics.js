import React, {Component} from 'react';
import axios from 'axios';
import {Button, ControlLabel, FormControl, FormGroup, Image, Panel} from "react-bootstrap";
import ReactHtmlParser from 'react-html-parser';
import { Charts, ChartContainer, ChartRow, YAxis, LineChart } from "react-timeseries-charts";
import { TimeSeries, TimeRange } from "pondjs";
import Timeline from 'react-visjs-timeline';

class StudentIndividualCaseStatistics extends Component {
    state = {
        answers: null,
        selectedAnswerIndex: 0,
        questionFilter: 'All'
    };

    componentDidMount() {
        axios.get('/api/getUserAnswersByCase?id=' + this.props.caseId).then(res => {
            this.setState({answers: res.data});
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

    renderGraphs = () => {
        return(
            <div className="col-md-12">
                {this.renderTimeSeriesGraphs()}
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

    renderQuestionAnswers = () => {
        const answer = this.state.answers[this.state.selectedAnswerIndex];
        const caseQuestions = answer.case.questions;
        const mcqAnswers = answer.mcqAnswers;
        const openEndedAnswers = answer.openEndedAnswers;
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
        return sortedCaseQuestions.map((question, index) => {
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
                let nlpAccuracy = '';
                let displayAnswer = '';
                if(answerType === 'open-ended') {
                    displayAnswer = ReactHtmlParser(answerOfQuestion.studentAnswer);
                    nlpAccuracy = 'Accuracy: ' + answerOfQuestion.nlpAccuracy + '%';
                } else {
                    const mcqAnswerOptions = answerOfQuestion.answerOptions;
                    for(let i = 0; i < mcqAnswerOptions.length; i++) {
                        const mcqAnswerOption = mcqAnswerOptions[i];
                        if(mcqAnswerOption.check) {
                            displayAnswer += mcqAnswerOption.option.mcq;
                        }
                    }
                }
                const nlpAccuracyColor = answerOfQuestion.nlpAccuracy < 50? 'red': 'green';
                const score = answerOfQuestion.score < answerOfQuestion.mark/2? 'red': 'green';

                // Display Picture if there is an attachment
                let questionDisplay = question.attachment === ''? <p>{ReactHtmlParser(question.question)}</p>:
                    <div className="row">
                        <div className="col-md-4">
                            <p>{ReactHtmlParser(question.question)}</p>
                        </div>
                        <div className="col-md-4">
                            <Image src={question.attachment} style={{height: '300px', width: '300px'}} alt="" />
                        </div>
                    </div>;

                return(
                    <div key={index} className="col-md-12 questionAnswerPanels">
                        <Panel bsStyle="primary" defaultExpanded>
                            <Panel.Heading>
                                <Panel.Title componentClass="h3" toggle>Question {question.id}</Panel.Title>
                            </Panel.Heading>
                            <Panel.Collapse>
                                <Panel.Body>
                                    <h3>Question Description</h3>
                                    {questionDisplay}
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="col-md-4" style={{paddingLeft: '0px'}}>
                                                <h3>Your Answer</h3>
                                            </div>
                                            <div className="col-md-4 text-center">
                                                <h4 style={{marginTop: '25px', color: nlpAccuracyColor}}>{nlpAccuracy}</h4>
                                            </div>
                                            <div className="col-md-4 text-center">
                                                <h4 style={{marginTop: '25px', color: score}}>Score: {answerOfQuestion.score}/{answerOfQuestion.mark}</h4>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <p>{displayAnswer}</p>
                                        </div>
                                    </div>
                                    <h3>Model Answer</h3>
                                    <p>{modelAnswer}</p>
                                </Panel.Body>
                            </Panel.Collapse>
                        </Panel>
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
                            <div className="col-md-4 text-left">
                                <Button style={{marginTop: '20px'}} onClick={this.props.returnToCaseStats} bsStyle="primary">Back to cases</Button>
                            </div>
                            <div className="col-md-4 text-center">
                                <h1>{this.state.answers[0].case.title}</h1>
                            </div>
                        </div>
                        <div className="row" style={{marginBottom: '10px'}}>
                            {this.renderOverviews()}
                        </div>
                        {/*To do - Allow hiding and showing of very detailed data*/}
                        <div className="row" style={{marginBottom: '10px'}}>
                            {/*To do - Add time series line chart comparison against cohort over several attempts*/}
                            {/*{this.renderGraphs()}*/}
                        </div>
                        <div className="row" style={{marginBottom: '50px'}}>
                            {/*To do - Add bar chart to show data over several attempts*/}
                        </div>
                        <div className="row">
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

export default StudentIndividualCaseStatistics;