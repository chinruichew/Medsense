import React, {Component} from 'react';
import {Button, Image} from "react-bootstrap";
import IndividualCaseStatistics from "./IndividualCaseStatistics";

class StudentCaseStatistics extends Component {
    state = {
        answers: this.props.answers,
        caseId: null
    };

    returnToCaseStats = () => {
        this.setState({
            caseId: null
        });
    };

    renderContent = () => {
        switch(this.state.caseId) {
            case null:
                for(let i = 0; i < this.state.answers.length; i++) {
                    const answer = this.state.answers[i];
                    delete answer.case.numAttempts;
                }
                const cases = [];
                for(let i = 0; i < this.state.answers.length; i++) {
                    const answer = this.state.answers[i];
                    let toAdd = true;
                    for(let j = 0; j < cases.length; j++) {
                        const answerCase = cases[j];
                        if(answerCase._id === answer.case._id) {
                            toAdd = false;
                            if(answerCase.numAttempts === undefined) {
                                answerCase.numAttempts = 1;
                            } else {
                                answerCase.numAttempts += 1;
                            }
                        }
                    }
                    if(toAdd) {
                        cases.push(answer.case);
                    }
                }
                return cases.map((answerCase, index) => {
                    let placeholderImage = <Image circle src="/individual_case_image.jpg" style={{height: '150px', width: '150px'}} />;
                    if(index % 2 === 0) {
                        placeholderImage = <Image circle src="/individual_case_image_2.jpg" style={{height: '150px', width: '150px'}} />;
                    }
                    let attemptDisplay = !answerCase.numAttempts || answerCase.numAttempts === 1? 'Attempt': 'Attempts';
                    return(
                        <div key={answerCase._id} className="col-md-4">
                            <div className="card">
                                <div className="card-content text-center">
                                    {placeholderImage}
                                    <h4>{answerCase.title}</h4>
                                    <p>Speciality: {answerCase.speciality}</p>
                                    <p>{answerCase.numAttempts || 1} {attemptDisplay}</p>
                                    <Button onClick={(e) => this.setState({caseId: answerCase._id})} bsStyle="primary">Review</Button>
                                </div>
                            </div>
                        </div>
                    );
                });
            default:
                return(
                    <IndividualCaseStatistics returnToCaseStats={this.returnToCaseStats} caseId={this.state.caseId}/>
                );
        }
    };

    render() {
        return(
            <div className="col-md-12">
                {this.renderContent()}
            </div>
        );
    }
}

export default StudentCaseStatistics;