import React, {Component} from 'react';
import ReactHtmlParser from "react-html-parser";
import {Image, Panel} from "react-bootstrap";

class StudentIndividualCaseQuestionAnswers extends Component {
    render() {
        const answer = this.props.answers[this.props.selectedAnswerIndex];
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
            if(this.props.questionFilter === 'All' || this.props.questionFilter === question.id) {
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
                    const mcqAnswerOptions = answerOfQuestion.answerOptions;
                    for(let i = 0; i < mcqAnswerOptions.length; i++) {
                        const mcqAnswerOption = mcqAnswerOptions[i];
                        if(mcqAnswerOption.check) {
                            displayAnswer += mcqAnswerOption.option.mcq;
                        }
                    }
                }
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
                                    {/*<StudentIndividualCaseQuestionChart setSelectedAnswerIndex={this.setSelectedAnswerIndex} question={question} answers={this.props.answers} answer={answerOfQuestion} cohortAnswers={this.props.cohortAnswers} />*/}
                                    <h3>Question</h3>
                                    {questionDisplay}
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="col-md-6 text-center">
                                                <h3>Your Answer</h3>
                                            </div>
                                            {/*<div className="col-md-4 text-center">*/}
                                                {/*<h4 style={{marginTop: '25px', color: score}}>Score: {answerOfQuestion.score}/{answerOfQuestion.mark}</h4>*/}
                                            {/*</div>*/}
                                            <div className="col-md-6 text-center">
                                                <h3>Model Answer</h3>
                                            </div>
                                        </div>
                                        <div className="col-md-6 text-center">
                                            <p>{displayAnswer}</p>
                                        </div>
                                        <div className="col-md-6 text-center">
                                            <p>{modelAnswer}</p>
                                        </div>
                                    </div>
                                </Panel.Body>
                            </Panel.Collapse>
                        </Panel>
                    </div>
                );
            }
        });
    }
}

export default StudentIndividualCaseQuestionAnswers;