import React, {Component} from 'react';
import ReactHtmlParser from "react-html-parser";
import {Image, Panel} from "react-bootstrap";

class ProfessorIndividualCaseQuestionStats extends Component {
    render() {
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
            if(this.props.questionFilter === 'All' || this.props.questionFilter === caseQuestion.id) {
                // Get Model Answer
                let modelAnswer = caseQuestion.openEnded;
                if (caseQuestion.openEnded === '') {
                    const questionOptions = caseQuestion.options;
                    let questionOptionsDisplay = '';
                    for (let i = 0; i < questionOptions.length; i++) {
                        const questionOption = questionOptions[i];
                        if (questionOption.check) {
                            questionOptionsDisplay += questionOption.mcq + ', ';
                        }
                    }
                    modelAnswer = questionOptionsDisplay.slice(",", -2);
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
                                    {/*<ProfessorIndividualCaseQuestionChart answers={this.props.answers} question={caseQuestion} />*/}
                                    <h4><strong>Question</strong></h4>
                                    {questionDisplay}
                                    <br/>
                                    <h4><strong>Model Answer</strong></h4>
                                    <p>{modelAnswer}</p>
                                </Panel.Body>
                            </Panel.Collapse>
                        </Panel>
                    </div>
                );
            }
            return;
        });
    }
}

export default ProfessorIndividualCaseQuestionStats;