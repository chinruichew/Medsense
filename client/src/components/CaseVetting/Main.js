import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Button, Accordion, Panel} from 'react-bootstrap';
import { bindAll } from 'lodash';
import Question from './Question.js';
import Overview from './Overview.js';
import BootstrapModal from '../UI/Modal/VettingBootstrapModal.js';
import '../CaseUpload/Upload.css';
import { updateCase } from '../../actions/index';
import axios from 'axios';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            qnData: this.props.questions,
            title: this.props.title,
            difficulty: this.props.difficulty,
            speciality: this.props.speciality,
            subspeciality: this.props.subspeciality,
            approach: this.props.approach,
            scenario: this.props.scenario,
            learning: this.props.learning,
            authid: this.props.authorid,
            authname: this.props.authorname,
        };
        bindAll(this, 'validFileType', 'addQuestion', 'saveChanges', 'handleUpdateOverview', 'handleUpdateQuestion', 'handleDeleteQuestion');
    }

    isValidNRIC = (theNric) => {
        return new RegExp(/^.*[STFG]\d{7}[A-Z].*$/).test(theNric);
    };

    addQuestion() {
        let len = this.state.qnData.length;
        this.setState({
            qnData: this.state.qnData.concat(
                {
                    "id": len+1,
                    "stem": '',
                    "question": '',
                    "attachment": null,
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
                    mark: '0'
                }
            ),
        });

    }

    validFileType(file) {
        const fileTypes = [
            'image/jpeg',
            'image/pjpeg',
            'image/png'
        ]
        for(let i = 0; i < fileTypes.length; i++) {
            if(file.type === fileTypes[i]) {
                return true;
            }
        }
        return false;
    }

    saveChanges(e) {
        e.preventDefault();
        if (this.state.title === '') {
            this.setState({ vmShow: true, error: "Case Overview: Please fill in the Case Title!" });
        } else if (this.isValidNRIC(this.state.title)){
            this.setState({ vmShow: true, error: "Case Overview: Please do NOT contain NRIC in title!" });
        } else if (this.state.difficulty === "Select One") {
            this.setState({ vmShow: true, error: "Case Overview: Please select a Difficulty Level!" });
        } else if (this.state.speciality === "Select One") {
            this.setState({ vmShow: true, error: "Case Overview: Please select a Speciality!" });
        } else if (this.state.subspeciality === null) {
            this.setState({ vmShow: true, error: "Case Overview: Please select a Sub-speciality!" });
        } else if (this.state.approach === null) {
            this.setState({ vmShow: true, error: "Case Overview: Please select at least 1 Approach!" });
        // } else if (this.state.approach === "Select One") {
        //     this.setState({ vmShow: true, error: "Case Overview: Please select an Approach!" });
        } else if (this.state.scenario === '') {
            this.setState({ vmShow: true, error: "Case Overview: Please fill in the Case Scenario!" });
        } else if (this.isValidNRIC(this.state.scenario)){
            this.setState({ vmShow: true, error: "Case Overview: Please do NOT contain NRIC in Case Scenario!" });
        } else if (this.state.learning === '') {
            this.setState({ vmShow: true, error: "Case Overview: Please fill in the Key Learning Points!" });
        } else if (this.isValidNRIC(this.state.learning)){
            this.setState({ vmShow: true, error: "Case Overview: Please do NOT contain NRIC in Key Learning Points!" });
        } else {

            let questions = this.state.qnData;

            if (questions.length === 0) {
                this.setState({ vmShow: true, error: "Case Question: Please add at least 1 Question!" });

            } else {
                let error = '';
                let BreakException = {};
                try {
                    for (let i=0; i<questions.length; i++) {
                        let obj = questions[i];
                        if (obj.question === '') {
                            error = "Question #" + obj.id + ": Please fill in the Question!";
                            throw BreakException;
                        } else if (this.isValidNRIC(obj.question)){
                            error = "Question #" + obj.id + ": Please do NOT contain NRIC in the Question!";
                            throw BreakException;
                        } else if (obj.attachment && !this.validFileType(obj.attachment)){
                            error = "Question #" + obj.id + ": Please make sure your attachment is an image of type .jpg, .jpeg, or .png!";
                            throw BreakException;
                        } else if (obj.type === "Select One") {
                            error = "Question #" + obj.id + ": Please select a Question Type!";
                            throw BreakException;
                        } else if (obj.type === "MCQ") {
                            if (obj.mcq1 === '' || obj.mcq2 === '') {
                                error = "Question #" + obj.id + ": Please fill in Answer 1 and Answer 2!";
                                throw BreakException;
                            } else if (this.isValidNRIC(obj.mcq1)) {
                                error = "Question #" + obj.id + ": Please do NOT contain NRIC in Answer 1!";
                                throw BreakException;
                            } else if (this.isValidNRIC(obj.mcq2)) {
                                error = "Question #" + obj.id + ": Please do NOT contain NRIC in Answer 2!";
                                throw BreakException;
                            } else if (obj.mcq3 === '' && obj.check3) {
                                error = "Question #" + obj.id + ": Please fill in Answer 3 or uncheck the answer!";
                                throw BreakException;
                            } else if (obj.mcq3 !== '' && this.isValidNRIC(obj.mcq3)) {
                                error = "Question #" + obj.id + ": Please do NOT contain NRIC in Answer 3!";
                                throw BreakException;
                            } else if (obj.mcq4 === '' && obj.check4) {
                                error = "Question #" + obj.id + ": Please fill in Answer 4 or uncheck the answer!";
                                throw BreakException;
                            } else if (obj.mcq4 !== '' && this.isValidNRIC(obj.mcq4)) {
                                error = "Question #" + obj.id + ": Please do NOT contain NRIC in Answer 4!";
                                throw BreakException;
                            } else if (obj.mcq5 === '' && obj.check5) {
                                error = "Question #" + obj.id + ": Please fill in Answer 5 or uncheck the answer!";
                                throw BreakException;
                            } else if (obj.mcq5 !== '' && this.isValidNRIC(obj.mcq5)) {
                                error = "Question #" + obj.id + ": Please do NOT contain NRIC in Answer 5!";
                                throw BreakException;
                            } else if (obj.mcq6 === '' && obj.check6) {
                                error = "Question #" + obj.id + ": Please fill in Answer 6 or uncheck the answer!";
                                throw BreakException;
                            } else if (obj.mcq6 !== '' && this.isValidNRIC(obj.mcq6)) {
                                error = "Question #" + obj.id + ": Please do NOT contain NRIC in Answer 6!";
                                throw BreakException;
                            } else if (!obj.check1 && !obj.check2 && !obj.check3 && !obj.check4 && !obj.check5 && !obj.check6) {
                                error = "Question #" + obj.id + ": Please check at least 1 correct answer!";
                                throw BreakException;
                            }
                        } else if (obj.type === "Open-ended" && obj.openEnded === '') {
                            error = "Question #" + obj.id + ": Please fill in the Answer!";
                            throw BreakException;
                        } else if(obj.type === "Open-ended" && obj.openEnded !== '' && this.isValidNRIC(obj.type)){
                            error = "Question #" + obj.id + ": Please do NOT contain NRIC in Answer!";
                            throw BreakException;
                        } else if (obj.pearl === '') {
                            error = "Question #" + obj.id + ": Please fill in the PEARL!";
                            throw BreakException;
                        } else if(this.isValidNRIC(obj.pearl)){
                            error = "Question #" + obj.id + ": Please do NOT contain NRIC in PEARL!";
                            throw BreakException;
                        } else if (obj.time === "Select One") {
                            error = "Question #" + obj.id + ": Please select a Time Limit!";
                            throw BreakException;
                        } else if(obj.mark === '0'){
                            error = "Question #" + obj.id + ": Please enter a mark (positive whole number)!";
                            throw BreakException;
                        } else if (!new RegExp(/^\d+$/).test(obj.mark)) {
                            error = "Question #" + obj.id + ": Please enter a positive whole number for mark!";
                            throw BreakException;
                        }else if(this.isValidNRIC(obj.reference)){
                            error = "Question #" + obj.id + ": Please do NOT contain NRIC in Reference!";
                            throw BreakException;
                        }
                    }
                    this.setState({vmConfirm: true});

                } catch (e) {
                    this.setState({ vmShow: true, error: error });
                    return;
                }
            }
        }
    }

    uploadFile = (file, caseID, qID, objID) => {
        console.log("what's happening!");
        const formData = new FormData();
        formData.append('file',file);
        formData.append('caseID',caseID);
        formData.append('qID',qID);
        formData.append('objID',objID);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        axios.post('/api/uploadCaseAttachment', formData, config).then(res => {
        });
    };

    submitCase = (e) => {
        axios.post('/api/updateCase', {
            values: this.state
        }).then(res => {
            const caseID = res.data.data.case;
            let questions = res.data.data.question;
            let qnData = this.state.qnData;
            this.setState({vm: true});
            console.log(questions.length);
            for (let i=0; i<questions.length; i++){
                let question = questions[i];
                let qn = qnData[i];
                this.uploadFile(qn.attachment, caseID, question.id, question._id);
            }
        });

    };

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
                        "mark": obj.mark,
                    }
                );

            } else if (obj.id < id) {
                newQuestions = newQuestions.concat(obj);
            }
        });

        this.setState({ qnData: newQuestions });

    }

    handleUpdateQuestion(details, id) {
        let questions = this.state.qnData;
        questions.forEach(function (obj) {
            if (obj.id === id) {
                obj.stem = details.stem;
                obj.question = details.question;
                obj.attachment = details.attachment;
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
                obj.mark = details.mark;
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

    redirect() {
        window.location = '/home';
    }


    render() {
        const overviewTitle = (
            <span style={{ fontSize: '150%' }}><center>▽ Case Overview</center></span>
        );

        const questionTitle = (
            <span style={{ fontSize: '150%' }}><center>▽ Case Question</center></span>
        );
        let vmClose = () => this.setState({ vmShow: false });
        let vmConfirmClose = () => this.setState({ vmConfirm: false });
        let questionNodes = this.state.qnData.map((obj, index) => {
            console.log(obj.mark);

            return (
                <Question
                    id={obj.id}
                    stem={obj.stem}
                    question={obj.question}
                    attachment={obj.attachment}
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
                    mark={obj.mark}
                    reference={obj.reference}
                    handleUpdateQuestion={this.handleUpdateQuestion}
                    handleDeleteQuestion={this.handleDeleteQuestion} />
            );
        });

        let stems = this.state.qnData.map((obj, index) => {
            let stem;
            if (obj.id===1){
                stem='';
            } else {
                stem=obj.stem;
            }
            return (
                <div className="stem">
                    <div className="stem-label">
                        Question {obj.id}
                    </div>
                    {stem}
                </div>
            );
        });


        return (

            <div id="main">
                <center>
                    <table>
                        <tr>
                            <td width="60px"><a href="/disclaimer"><img src="./stop.png" alt="" style={{height:"4em"}}/></a></td>
                            <td>Before you upload the case, please ensure that all texts and attachments <br/> do not contain identifiable information such as IC number or patient's face</td>
                        </tr>
                    </table>
                </center>
                <div className="story">

                    <p className="story-title">Story So Far</p>
                    <p>Case Scenario</p>
                    <div className="row" style={{whiteSpace:"pre-wrap"}}>{this.state.scenario}</div>
                    <br /><br />
                    <p>Case Continuation</p>
                    <div className="row" style={{whiteSpace:"pre-wrap"}}>{stems}</div>
                    <br /><br />

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
                        show={this.state.vmConfirm}
                        onHide={vmConfirmClose}
                        aria-labelledby="confirm-modal" >
                        <BootstrapModal.Header closeButton>
                            <BootstrapModal.Title id="confirm-modal">Case Submission</BootstrapModal.Title>
                        </BootstrapModal.Header>
                        <BootstrapModal.Body>
                            <p>Before you upload the case, please ensure that all texts and attachments do not contain identifiable information eg. IC number or patient's face</p>
                        </BootstrapModal.Body>
                        <BootstrapModal.Footer>
                            <Button onClick={this.submitCase}>Proceed to Submit</Button>
                        </BootstrapModal.Footer>
                    </BootstrapModal>

                    <BootstrapModal
                        show={this.state.vm}
                        aria-labelledby="success-modal">
                        <BootstrapModal.Header>
                            <BootstrapModal.Title id="success-modal">Case Submitted</BootstrapModal.Title>
                        </BootstrapModal.Header>
                        <BootstrapModal.Body>
                            <p>Your case has been released successfully! You will be redirected to the Homepage.</p>
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

export default connect(null, { updateCase })(Main);