import React, {Component} from 'react';
import ReactHtmlParser from "react-html-parser";
import {Image, Panel} from "react-bootstrap";
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faCheckSquare from '@fortawesome/fontawesome-free-regular/faCheckSquare';
import faSquare from '@fortawesome/fontawesome-free-regular/faSquare';

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
                // Get stem
                const questionStem = question.stem === ''? '': <div className="row">
                    <div className="col-md-12">
                        <h4 className="dashboard-case-panel-answer"><strong>Stem</strong></h4>
                    </div>
                    <div className="col-md-12">
                        {ReactHtmlParser(question.stem)}
                    </div>
                </div>;

                // Get answers
                let modelAnswer = question.openEnded;
                if(question.openEnded === '') {
                    const questionOptions = question.options;
                    const mcqQuestionOptionMapping = [];
                    for(let i = 0; i < questionOptions.length; i++) {
                        const questionOption = questionOptions[i];
                        mcqQuestionOptionMapping.push({
                            index: i,
                            text: questionOption.mcq,
                            check: questionOption.check
                        });
                    }
                    modelAnswer = mcqQuestionOptionMapping.map((mcqQuestionOptionMap, index) => {
                        if(mcqQuestionOptionMap.check) {
                            return(
                                <p key={index}><FontAwesomeIcon icon={faCheckSquare} className="mcq-option-icon" />{mcqQuestionOptionMap.text}</p>
                            );
                        } else {
                            return(
                                <p key={index}><FontAwesomeIcon icon={faSquare} className="mcq-option-icon" />{mcqQuestionOptionMap.text}</p>
                            );
                        }
                    });
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
                    const mcqAnswerOptions = answerOfQuestion.mcqAnswerOptions;
                    const mcqAnswerOptionMapping = [];
                    for(let i = 0; i < mcqAnswerOptions.length; i++) {
                        const mcqAnswerOption = mcqAnswerOptions[i];
                        if(mcqAnswerOption.check) {
                            const questionOptions = question.options;
                            for(let j = 0; j < questionOptions.length; j++) {
                                const questionOption = questionOptions[j];
                                if(questionOption._id === mcqAnswerOption.questionOption) {
                                    mcqAnswerOptionMapping.push({
                                        index: i,
                                        text: questionOption.mcq,
                                        check: mcqAnswerOption.check
                                    });
                                    break;
                                }
                            }
                        } else {
                            const questionOptions = question.options;
                            for(let j = 0; j < questionOptions.length; j++) {
                                const questionOption = questionOptions[j];
                                if(questionOption._id === mcqAnswerOption.questionOption) {
                                    mcqAnswerOptionMapping.push({
                                        index: i,
                                        text: questionOption.mcq,
                                        check: mcqAnswerOption.check
                                    });
                                    break;
                                }
                            }
                        }
                    }

                    displayAnswer = mcqAnswerOptionMapping.map((mcqAnswerOptionMap, index) => {
                        if(mcqAnswerOptionMap.check) {
                            return(
                                <p key={index}><FontAwesomeIcon icon={faCheckSquare} className="mcq-option-icon" />{mcqAnswerOptionMap.text}</p>
                            );
                        } else {
                            return(
                                <p key={index}><FontAwesomeIcon icon={faSquare} className="mcq-option-icon" />{mcqAnswerOptionMap.text}</p>
                            );
                        }
                    });
                }
                // const scoreStyle = answerOfQuestion.score < answerOfQuestion.mark/2? 'red': 'green';

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
                                    {questionStem}
                                    <br/>
                                    <h4 className="dashboard-case-panel-answer"><strong>Question</strong></h4>
                                    {questionDisplay}
                                    <br/>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <h4 className="dashboard-case-panel-answer"><strong>Your Answer</strong></h4>
                                        </div>
                                        {/*<div className="col-md-4 text-center">*/}
                                            {/*<h4 style={{marginTop: '25px', color: score}}>Score: {answerOfQuestion.score}/{answerOfQuestion.mark}</h4>*/}
                                        {/*</div>*/}
                                        <div className="col-md-6">
                                            <h4 className="dashboard-case-panel-answer"><strong>Model Answer</strong></h4>
                                        </div>
                                        <div className="col-md-6 ">
                                            <p>{displayAnswer}</p>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{modelAnswer}</p>
                                        </div>
                                    </div>
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

export default StudentIndividualCaseQuestionAnswers;