import React, {Component} from 'react';
import {Button, ControlLabel, FormControl, FormGroup, Glyphicon} from "react-bootstrap";
import Timeline from 'react-visjs-timeline';
import axios from 'axios';
import {connect} from "react-redux";
import {fetchConstantTypes} from "../../../actions";

import ProfessorIndividualCaseQuestionStats from "./ProfessorIndividualCaseQuestionStats";
import ProfessorIndividualCaseLatestAttemptOverview from "./ProfessorIndividualCaseLatestAttemptOverview";
import ProfessorIndividualCaseOverview from "./ProfessorIndividualCaseOverview";

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

    returnToCaseStats = () => {
        this.props.returnToCaseStats(this.props.redirectFromOverview !== undefined);
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
                                    <Button style={{marginTop: '20px', paddingLeft: "0"}} onClick={this.returnToCaseStats} bsStyle="link" bsSize="large">
                                        <Glyphicon glyph="chevron-left"/> Back to cases
                                    </Button>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4 col-md-offset-4 text-center">
                                    <h2><strong>{this.props.reviewedCase.title}</strong></h2>
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
                                <Button style={{marginTop: '20px', paddingLeft: "0"}} onClick={this.returnToCaseStats} bsStyle="link" bsSize="large">
                                    <Glyphicon glyph="chevron-left"/> Back to cases
                                </Button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4 col-md-offset-4 text-center">
                                <h2><strong>{this.props.reviewedCase.title}</strong></h2>
                            </div>
                        </div>
                        <div className="row" style={{marginBottom: '10px'}}>
                            {/*<ProfessorIndividualCaseOverviewChart answers={this.state.answers} />*/}
                            <ProfessorIndividualCaseLatestAttemptOverview globalAnswers={this.state.answers} />
                        </div>
                        <div className="row">
                            <ProfessorIndividualCaseOverview case={this.state.answers[0].case} />
                        </div>
                        <div className="row">
                            {this.renderQuestionFilter()}
                            <ProfessorIndividualCaseQuestionStats questionFilter={this.state.questionFilter} reviewedCase={this.props.reviewedCase}/>
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