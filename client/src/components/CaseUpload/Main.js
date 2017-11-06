import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Accordion, Panel, Well } from 'react-bootstrap';
import { bindAll } from 'lodash';
import Question from './Question.js';
import Overview from './Overview.js';
import BootstrapModal from './BootstrapModal.js';
import './Upload.css';
import { uploadCase } from '../../actions/index';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            qID: 1,
            qnData: [],
            title: '',
            difficulty: "Select One",
            speciality: "Select One",
            subspeciality: "Select One",
            approach: "Select One",
            // approach: null,
            scenario: '',
            learning: '',
            authid: this.props.authid,
            authname: this.props.authname
        };
        bindAll(this, 'addQuestion', 'saveChanges', 'handleUpdateOverview', 'handleUpdateQuestion', 'handleDeleteQuestion');
    }

    addQuestion() {
        this.setState({
            qID: this.state.qID + 1,
            qnData: this.state.qnData.concat(
                {
                    "id": this.state.qID,
                    "stem": '',
                    "question": '',
                    "attachment": null,
                    "filename": null,
                    "filetype": null,
                    "type": "Select One",
                    "openEnded": '',
                    "mcq1": '',
                    "mcq2": '',
                    "mcq3": '',
                    "mcq4": '',
                    "mcq5": '',
                    "mcq6": '',
                    "check1": false,
                    "check2": false,
                    "check3": false,
                    "check4": false,
                    "check5": false,
                    "check6": false,
                    "pearl": '',
                    "time": "Select One",
                    "reference": '',
                }
            ),
        });
    }

    saveChanges(e) {
        e.preventDefault();
        if (this.state.title === '') {
            this.setState({ vmShow: true, error: "Case Overview: Please fill in the Case Title!" });
        } else if (this.state.difficulty === "Select One") {
            this.setState({ vmShow: true, error: "Case Overview: Please select a Difficulty Level!" });
        } else if (this.state.speciality === "Select One") {
            this.setState({ vmShow: true, error: "Case Overview: Please select a Speciality!" });
        } else if (this.state.subspeciality === "Select One") {
            this.setState({ vmShow: true, error: "Case Overview: Please select a Sub-specialiy!" });
        // } else if (this.state.approach === null) {
        } else if (this.state.approach === "Select One") {
            this.setState({ vmShow: true, error: "Case Overview: Please select an Approach!" });
            // this.setState({ vmShow: true, error: "Case Overview: Please select at least 1 Approach!" });
        } else if (this.state.scenario === '') {
            this.setState({ vmShow: true, error: "Case Overview: Please fill in the Case Scenario!" });
        } else if (this.state.learning === '') {
            this.setState({ vmShow: true, error: "Case Overview: Please fill in the Key Learning Points!" });
        } else {

            let questions = this.state.qnData;
            console.log(questions);
            if (questions.length === 0) {
                this.setState({ vmShow: true, error: "Case Question: Please add at least 1 Question!" });
                console.log(this.state.vmShow);
            } else {
                let error = '';
                let BreakException = {};
                try {
                    questions.forEach(function (obj) {
                        if (obj.question === '') {
                            error = "Question #" + obj.id + ": Please fill in the Question!";
                            throw BreakException;
                        } else if (obj.type === "Select One") {
                            error = "Question #" + obj.id + ": Please select a Question Type!";
                            throw BreakException;
                        } else if (obj.pearl === '') {
                            error = "Question #" + obj.id + ": Please fill in the PEARL!";
                            throw BreakException;
                        } else if (obj.time === "Select One") {
                            error = "Question #" + obj.id + ": Please select a Time Limit!";
                            throw BreakException;
                        } else if (obj.type === "MCQ") {
                            if (obj.mcq1 === '' || obj.mcq2 === '') {
                                error = "Question #" + obj.id + ": Please fill in Answer 1 and Answer 2!";
                                throw BreakException;
                            } else if (obj.mcq3 === '' && obj.check3) {
                                error = "Question #" + obj.id + ": Please fill in Answer 3 or uncheck the answer!";
                                throw BreakException;
                            } else if (obj.mcq4 === '' && obj.check4) {
                                error = "Question #" + obj.id + ": Please fill in Answer 4 or uncheck the answer!";
                                throw BreakException;
                            } else if (obj.mcq5 === '' && obj.check5) {
                                error = "Question #" + obj.id + ": Please fill in Answer 5 or uncheck the answer!";
                                throw BreakException;
                            } else if (obj.mcq6 === '' && obj.check6) {
                                error = "Question #" + obj.id + ": Please fill in Answer 6 or uncheck the answer!";
                                throw BreakException;
                            } else if (!obj.check1 && !obj.check2 && !obj.check3 && !obj.check4 && !obj.check5 && !obj.check6) {
                                error = "Question #" + obj.id + ": Please check at least 1 correct answer!";
                                throw BreakException;
                            }
                        } else if (obj.type === "Open-ended" && obj.openEnded === '') {
                            error = "Question #" + obj.id + ": Please fill in the Answer!";
                            throw BreakException;
                        }
                    });
                    this.props.uploadCase(this.state).then((response) => {
                        if (response) {
                            this.setState({vm: true});
                        }
                    }).catch(() => {
                    })

                } catch (e) {
                    this.setState({vmShow: true, error: error});
                    return;
                }
            }
        }
    }

    handleDeleteQuestion(id) {
        let questions = this.state.qnData;
        let newQuestions = [];
        let offset = 1;
        questions.forEach(function (obj) {
            if (obj.id > id) {

                newQuestions = newQuestions.concat(
                    {
                        "id": obj.id - offset,
                        "stem": obj.stem,
                        "question": obj.question,
                        "attachment": obj.attachment,
                        "filename": obj.filename,
                        "filetype": obj.filtype,
                        "type": obj.type,
                        "openEnded": obj.openEnded,
                        "mcq1": obj.mcq1,
                        "mcq2": obj.mcq2,
                        "mcq3": obj.mcq3,
                        "mcq4": obj.mcq4,
                        "mcq5": obj.mcq5,
                        "mcq6": obj.mcq6,
                        "check1": obj.check1,
                        "check2": obj.check2,
                        "check3": obj.check3,
                        "check4": obj.check4,
                        "check5": obj.check5,
                        "check6": obj.check6,
                        "pearl": obj.pearl,
                        "time": obj.time,
                        "reference": obj.reference,
                    }
                );
                console.log("hi");
                offset += 1;
            } else if (obj.id < id) {

                newQuestions = newQuestions.concat(obj);
                console.log("yo");
            }
        });
        console.log(newQuestions);
        this.setState({ qnData: newQuestions }, () => {
            this.forceUpdate();
            console.log(this.state.qnData);
        });

    }

    handleUpdateQuestion(details, id) {
        let questions = this.state.qnData;
        questions.forEach(function (obj) {
            if (obj.id === id) {
                obj.stem = details.stem;
                obj.question = details.question;
                obj.attachment = details.attachment;
                obj.filename = details.filename;
                obj.filtype = details.filetype;
                obj.type = details.type;
                obj.openEnded = details.openEnded;
                obj.mcq1 = details.mcq1;
                obj.mcq2 = details.mcq2;
                obj.mcq3 = details.mcq3;
                obj.mcq4 = details.mcq4;
                obj.mcq5 = details.mcq5;
                obj.mcq6 = details.mcq6;
                obj.check1 = details.check1;
                obj.check2 = details.check2;
                obj.check3 = details.check3;
                obj.check4 = details.check4;
                obj.check5 = details.check5;
                obj.check6 = details.check6;
                obj.pearl = details.pearl;
                obj.time = details.time;
                obj.reference = details.reference;
            }
        });
        this.setState({ qnData: questions });
    }

    handleUpdateOverview(details) {
        this.setState({
            title: details.title,
            difficulty: details.difficulty,
            speciality: details.speciality,
            subspeciality: details.subspeciality,
            approach: details.approach,
            scenario: details.scenario,
            learning: details.learning,
        });
    }

    redirect(){
        window.location = '/home';
    }


    render() {
        const overviewTitle = (
            <span style={{fontSize:'150%'}}><center>▽ Case Overview</center></span>
        );

        const questionTitle = (
            <span style={{fontSize:'150%'}}><center>▽ Case Question</center></span>
        );
        let vmClose = () => this.setState({ vmShow: false });
        console.log(this.state.qnData);
        let questionNodes = this.state.qnData.map((obj, index) => {
            console.log(obj);
            return (
                <Question
                    id={obj.id}
                    stem={obj.stem}
                    question={obj.question}
                    attachment={obj.attachment}
                    filename={obj.filename}
                    filetype={obj.filtype}
                    type={obj.type}
                    openEnded={obj.openEnded}
                    mcq1={obj.mcq1}
                    mcq2={obj.mcq2}
                    mcq3={obj.mcq3}
                    mcq4={obj.mcq4}
                    mcq5={obj.mcq5}
                    mcq6={obj.mcq6}
                    check1={obj.check1}
                    check2={obj.check2}
                    check3={obj.check3}
                    check4={obj.check4}
                    check5={obj.check5}
                    check6={obj.check6}
                    pearl={obj.pearl}
                    time={obj.time}
                    reference={obj.reference}
                    handleUpdateQuestion={this.handleUpdateQuestion}
                    handleDeleteQuestion={this.handleDeleteQuestion} />
            );
        });

        let stems = this.state.qnData.map((obj, index) => {
            return (
                <div className="stem">
                    <div className="stem-label">
                        Question {obj.id}
                    </div>
                    {obj.stem}
                </div>
            );
        });


        return (

            <div id="main">

                <div className="story">

                    <p className="story-title">Story So Far</p>
                    <p>Case Scenario</p>
                    <div className="row">{this.state.scenario}</div>
                    <br/><br/>
                    <p>Case Continuation</p>
                    <div className="row">{stems}</div>
                    <br/><br/>

                </div>

                <form action="/api/uploadCase" method="post" className="case-area">
                    <Accordion>
                        <Panel header={overviewTitle} eventKey="1" bsStyle="info">
                            <Overview
                                title={this.state.title}
                                difficulty={this.state.difficulty}
                                speciality={this.state.speciality}
                                subspeciality={this.state.subspeciality}
                                approach={this.state.approach}
                                scenario={this.state.scenario}
                                learning={this.state.learning}
                                handleUpdateOverview={this.handleUpdateOverview} />
                        </Panel>
                    </Accordion>

                    <Accordion>
                        <Panel header={questionTitle} eventKey="1" bsStyle="info">
                            <div className="question-area">
                                {questionNodes}
                            </div>


                            <div className="add-question-button">
                                <Button type="button" bsStyle="primary" onClick={(e) => this.addQuestion()}>Add Question</Button><br />
                            </div>
                        </Panel>
                    </Accordion>
                    <div className="submit-case-button">
                        <Button type="submit" align="center" bsStyle="primary" onClick={(e) => this.saveChanges(e)}>Submit</Button>
                    </div>
                    <BootstrapModal
                        show={this.state.vmShow}
                        onHide={vmClose}
                        aria-labelledby="contained-modal-title-vm">
                        <BootstrapModal.Header closeButton>
                            <BootstrapModal.Title id="contained-modal-title-vm">Unable to Submit</BootstrapModal.Title>
                        </BootstrapModal.Header>
                        <BootstrapModal.Body>
                            <p>{this.state.error}</p>
                        </BootstrapModal.Body>
                        <BootstrapModal.Footer>
                            <Button onClick={vmClose}>Close</Button>
                        </BootstrapModal.Footer>
                    </BootstrapModal>

                    <BootstrapModal
                        show={this.state.vm}
                        aria-labelledby="success-modal">
                        <BootstrapModal.Header>
                            <BootstrapModal.Title id="success-modal">Case Submitted</BootstrapModal.Title>
                        </BootstrapModal.Header>
                        <BootstrapModal.Body>
                            <p>Your case has been uploaded successfully! You will be redirected to the Homepage.</p>
                        </BootstrapModal.Body>
                        <BootstrapModal.Footer>
                            <Button onClick={this.redirect}>OK</Button>
                        </BootstrapModal.Footer>
                    </BootstrapModal>
                </form>

            </div>
        );
    }
}

export default connect(null, { uploadCase })(Main);