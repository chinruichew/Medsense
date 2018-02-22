import React, {Component} from 'react';
import {FormControl, FormGroup, Table} from "react-bootstrap";
import ReactHtmlParser from 'react-html-parser';

class IndividualCaseStatistics extends Component {
    state = {
        answers: this.props.answers,
        caseStatsDisplay: '',
        scorePercentage: 0
    };

    changeCase = (e) => {
        const answerId = e.target.value;
        const answers = this.state.answers;
        for(let i = 0; i < answers.length; i++) {
            const answer = answers[i];
            if(answer._id === answerId) {
                let totalScore = 0;
                let totalMark = 0;
                const questions = answer.caseid.questions;
                const caseStatsDisplay = answer.questions.map((question, index) => {
                    let answers = '';
                    if(question.type === this.props.constants.QUESTION_TYPE_OPEN_ENDED) {
                        answers = ReactHtmlParser(question.openEnded);
                    } else if(question.type === this.props.constants.QUESTION_TYPE_MCQ) {
                        for(let i = 1; i <= 6; i++) {
                            if(question['check' + i]) {
                                answers = question['mcq' + i] + '\n';
                            }
                        }
                    }
                    let modelAnswers = '';
                    for(let i = 0; i < questions.length; i++) {
                        const realQuestion = questions[i];
                        if(realQuestion.question === question.question) {
                            if(realQuestion.type === this.props.constants.QUESTION_TYPE_OPEN_ENDED) {
                                modelAnswers = ReactHtmlParser(realQuestion.openEnded);
                            } else if(realQuestion.type === this.props.constants.QUESTION_TYPE_MCQ) {
                                for(let i = 1; i <= 6; i++) {
                                    if(realQuestion['check' + i]) {
                                        modelAnswers = realQuestion['mcq' + i] + '\n';
                                    }
                                }
                            }
                            break;
                        }
                    }
                    totalScore += question.score;
                    totalMark += question.mark;
                    return(
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{ReactHtmlParser(question.question)}</td>
                            <td>{answers}</td>
                            <td>{modelAnswers}</td>
                            <td>{question.score + ' / ' + question.mark}</td>
                            <td>{question.timeTaken + ' seconds'}</td>
                        </tr>
                    );
                });
                this.setState({caseStatsDisplay: caseStatsDisplay, scorePercentage: (totalScore/totalMark*100)});
                break;
            }
        }
    };

    renderContent = () => {
        switch(this.state.answers) {
            case null:
                return;
            default:
                const selectOptions = this.state.answers.map((answer, index) => {
                    return(
                        <option key={answer._id} value={answer._id}>{answer.title + ' (Attempt ' + answer.attempt + ')'}</option>
                    );
                });
                return(
                    <div>
                        <h2>Case Statistics</h2>
                        <div className="col-md-12" style={{padding: '0px'}}>
                            <div className="col-md-4" style={{paddingLeft: '0px'}}>
                                <form>
                                    <FormGroup controlId="formControlsSelect">
                                        <FormControl onChange={(e) => this.changeCase(e)} componentClass="select" placeholder="select">
                                            <option value="select">Select Case</option>
                                            {selectOptions}
                                        </FormControl>
                                    </FormGroup>
                                </form>
                            </div>
                            <div className="col-md-offset-4 col-md-4 text-center">
                                <h3>{this.state.caseStatsDisplay !== '' ? 'Total Score Accuracy: ' + this.state.scorePercentage + '%': ''}</h3>
                            </div>
                        </div>
                        <div className="col-md-12" style={{padding: '0px'}}>
                            <Table responsive>
                                <thead>
                                <tr style={{background: '#82C5D9', fontSize:'130%'}}>
                                    <td>S/N</td>
                                    <td>Question</td>
                                    <td>Your Answer</td>
                                    <td>Model Answer</td>
                                    <td>Score</td>
                                    <td>Time Taken</td>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.caseStatsDisplay}
                                </tbody>
                            </Table>
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