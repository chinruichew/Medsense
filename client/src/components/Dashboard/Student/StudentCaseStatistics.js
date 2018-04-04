import React, {Component} from 'react';
import {Button, Image} from "react-bootstrap";
import StudentIndividualCaseStatistics from "./StudentIndividualCaseStatistics";

class StudentCaseStatistics extends Component {
    state = {
        answers: this.props.answers,
        caseId: this.props.overviewToCaseDetailId || null,
        redirectToOverview: false
    };

    returnToCaseStats = (redirectToOverview) => {
        this.setState({
            caseId: null,
            redirectToOverview
        });
    };

    renderContent = () => {
        switch(this.state.redirectToOverview) {
            case false:
                switch(this.state.caseId) {
                    case null:
                        // Clear any duplicate numAttempts due to async state setting.
                        for(let i = 0; i < this.state.answers.length; i++) {
                            const answer = this.state.answers[i];
                            delete answer.case.numAttempts;
                        }

                        // This step is to find how many attempts have been done per case.
                        // For each answer, loop through cases and check whether is has been inserted.
                        // If not inserted, set numAttempts for that case id, else add to the numAttempts.
                        const cases = [];
                        for(let i = 0; i < this.state.answers.length; i++) {
                            const answer = this.state.answers[i];
                            let toAdd = true;
                            for(let j = 0; j < cases.length; j++) {
                                const answerCase = cases[j];
                                if(answerCase._id === answer.case._id) {
                                    toAdd = false;
                                    if(answerCase.numAttempts === undefined) {
                                        answerCase.numAttempts = 2;
                                    } else {
                                        answerCase.numAttempts ++;
                                    }
                                }
                            }
                            if(toAdd) {
                                cases.push(answer.case);
                            }
                        }
                        return cases.map((answerCase, index) => {
                            // let placeholderImage = <Image circle src="/case-display-pictures/individual_case_image.jpg" style={{height: '150px', width: '150px'}} />;
                            // if(index % 2 === 0) {
                            //     placeholderImage = <Image circle src="/case-display-pictures/individual_case_image_2.jpg" style={{height: '150px', width: '150px'}} />;
                            // }
                            let picName = "./" + answerCase.subspeciality[0] + ".png";
                            let placeholderImage = <Image circle src={picName} style={{height: '150px', width: '150px'}} onError={(e)=>{e.target.src="./Other Subspeciality.png"}}/>;
                            let attemptDisplay = !answerCase.numAttempts || answerCase.numAttempts === 1? 'Attempt': 'Attempts';
                            return(
                                <div key={answerCase._id} className="col-md-4 case-div">
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
                            <StudentIndividualCaseStatistics returnToCaseStats={this.returnToCaseStats} caseId={this.state.caseId} redirectFromOverview={this.props.overviewToCaseDetailId !== undefined && this.props.overviewToCaseDetailId !== null} />
                        );
                }
            default:
                this.props.resetBarChartFilters();
        }
    };

    render() {
        return(
            <div className="col-md-12" style={{marginBottom: "3%"}}>
                {this.renderContent()}
            </div>
        );
    }
}

export default StudentCaseStatistics;