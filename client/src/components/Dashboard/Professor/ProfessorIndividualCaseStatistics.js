import React, {Component} from 'react';
import {Button, ControlLabel, FormControl, FormGroup, Image, Panel} from "react-bootstrap";
import Timeline from 'react-visjs-timeline';
import axios from 'axios';
import ReactHtmlParser from "react-html-parser";
import ReactEcharts from 'echarts-for-react';
import {connect} from "react-redux";

import {fetchConstantTypes} from "../../../actions";
import ProfessorIndividualCaseOverviewChart from "./ProfessorIndividualCaseOverviewChart";
import ProfessorIndividualCaseQuestionChart from "./ProfessorIndividualCaseQuestionChart";

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
            <Timeline options={options} items={items} clickHandler={this.visTimelineClickHandler} />
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
                                    <ProfessorIndividualCaseQuestionChart answers={this.state.answers} question={caseQuestion} />
                                    <h3>Question</h3>
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
                            <ProfessorIndividualCaseOverviewChart answers={this.state.answers} />
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