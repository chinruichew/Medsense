import React, {Component} from 'react';
import {ControlLabel, FormControl, FormGroup, Table} from "react-bootstrap";

class IndividualCaseStatistics extends Component {
    state = {
        answers: this.props.answers,
        caseStatsDisplay: ''
    };

    changeCase = (e) => {
        const answerId = e.target.value;
        const answers = this.state.answers;
        for(let i = 0; i < answers.length; i++) {
            const answer = answers[i];
            if(answer._id === answerId) {
                const caseStatsDisplay = answer.questions.map((question, index) => {
                    return(
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{question.question}</td>
                            <td>{question.score + ' / ' + question.mark}</td>
                            <td>{question.timeTaken + ' seconds'}</td>
                        </tr>
                    );
                });
                this.setState({caseStatsDisplay: caseStatsDisplay});
            }
        }
    };

    renderContent = () => {
        switch(this.state.answers) {
            case null:
                return;
            default:
                const selectOptions = this.state.answers.map(answer => {
                    return(
                        <option value={answer._id}>{answer.title}</option>
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
                        </div>
                        <div className="col-md-12" style={{padding: '0px'}}>
                            <Table responsive>
                                <thead>
                                <tr style={{background: '#82C5D9', fontSize:'130%'}}>
                                    <td>S/N</td>
                                    <td>Question</td>
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