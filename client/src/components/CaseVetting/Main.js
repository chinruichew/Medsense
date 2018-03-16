import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Button, Panel, PanelGroup} from 'react-bootstrap';
import Question from './Question.js';
import Overview from './Overview.js';
import BootstrapModal from '../UI/Modal/VettingBootstrapModal.js';
import '../CaseUpload/Upload.css';
import { updateCase } from '../../actions/index';
import axios from 'axios';
import ReactHtmlParser from 'react-html-parser';

class Main extends Component {
    state = {
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

    isValidNRIC = (theNric) => {
        return new RegExp(/^.*[STFG]\d{7}[A-Z].*$/).test(theNric.toUpperCase());
    };

    addQuestion = (id) => {
        let len = this.state.qnData.length;
        if (id>len){
            this.setState({
                qnData: this.state.qnData.concat(
                    {
                        "id": len+1,
                        "stem": '',
                        "question": '',
                        "attachment": null,
                        "pearlAttachment": null,
                        "type": "Select One",
                        "openEnded": '',
                        "optionData": [],
                        "pearl": '',
                        "time": "Select One",
                        "reference": '',
                        "mark":'',
                    }
                )
            });
        } else {
            let questions = this.state.qnData;
            let newQuestions = [];
            let offset = 1;
            questions.forEach(function (obj) {
                if (obj.id > id) {
                    newQuestions = newQuestions.concat(
                        {
                            "id": obj.id + offset,
                            "stem": obj.stem,
                            "question": obj.question,
                            "attachment": obj.attachment,
                            "pearlAttachment": obj.pearlAttachment,
                            "type": obj.type,
                            "openEnded": obj.openEnded,
                            "optionData": obj.optionData,
                            "pearl": obj.pearl,
                            "time": obj.time,
                            "reference": obj.reference,
                            "mark": obj.mark,
                        }
                    );
                } else if (obj.id < id) {
                    newQuestions = newQuestions.concat(obj);
                } else {
                    newQuestions = newQuestions.concat(
                        {
                            "id": obj.id,
                            "stem": '',
                            "question": '',
                            "attachment": null,
                            "pearlAttachment": null,
                            "type": "Select One",
                            "openEnded": '',
                            "optionData": [],
                            "pearl": '',
                            "time": "Select One",
                            "reference": '',
                            "mark": '',
                        }
                    );
                    newQuestions = newQuestions.concat(
                        {
                            "id": obj.id + offset,
                            "stem": obj.stem,
                            "question": obj.question,
                            "attachment": obj.attachment,
                            "pearlAttachment": obj.pearlAttachment,
                            "type": obj.type,
                            "openEnded": obj.openEnded,
                            "optionData": obj.optionData,
                            "pearl": obj.pearl,
                            "time": obj.time,
                            "reference": obj.reference,
                            "mark": obj.mark,
                        }
                    );
                }

            });
            this.setState({ qnData: newQuestions});
        }
    };

    validFileType = (file) => {
        const fileTypes = [
            'image/jpeg',
            'image/pjpeg',
            'image/png'
        ];
        for(let i = 0; i < fileTypes.length; i++) {
            if(file.type === fileTypes[i]) {
                return true;
            }
        }
        return false;
    };

    saveChanges = (e) => {
        e.preventDefault();
        if (this.state.title === '') {
            this.setState({ vmShow: true, error: "Case Overview: Please fill in the Case Title!" });
        } else if (this.isValidNRIC(this.state.title)){
            this.setState({ vmShow: true, error: "Case Overview: Title should NOT contain NRIC!" });
        } else if (this.state.difficulty === "Select One") {
            this.setState({ vmShow: true, error: "Case Overview: Please select a Difficulty Level!" });
        } else if (this.state.speciality === "Select One") {
            this.setState({ vmShow: true, error: "Case Overview: Please select a Speciality!" });
        } else if (this.state.subspeciality === null) {
            this.setState({ vmShow: true, error: "Case Overview: Please select a Sub-speciality!" });
        } else if (this.state.approach === null) {
            this.setState({ vmShow: true, error: "Case Overview: Please select at least 1 Approach!" });
        } else if (this.state.scenario === '' || this.state.scenario === '<p><br></p>') {
            this.setState({ vmShow: true, error: "Case Overview: Please fill in the Case Scenario!" });
        } else if (this.isValidNRIC(this.state.scenario)){
            this.setState({ vmShow: true, error: "Case Overview: Case Scenario should NOT contain NRIC!" });
        } else if (this.state.learning === '' || this.state.learning === '<p><br></p>') {
            this.setState({ vmShow: true, error: "Case Overview: Please fill in the Key Learning Objectives!" });
        } else if (this.isValidNRIC(this.state.learning)){
            this.setState({ vmShow: true, error: "Case Overview: Key Learning Objectives should NOT contain NRIC!" });
        } else {
            let questions = this.state.qnData;

            if (questions.length === 0) {
                this.setState({ vmShow: true, error: "Case Questions: Please add at least 1 Question!" });

            } else {
                let error = '';
                let BreakException = {};
                try {
                    for (let i=0; i<questions.length; i++) {
                        let obj = questions[i];
                        if (obj.question === '' || obj.question === '<p><br></p>') {
                            error = "Question #" + obj.id + ": Please fill in the Question!";
                            throw BreakException;
                        } else if (this.isValidNRIC(obj.question)){
                            error = "Question #" + obj.id + ": Question should NOT contain NRIC!";
                            throw BreakException;
                        } else if (obj.attachment && typeof(obj.attachment)!=="string" && !this.validFileType(obj.attachment)){
                            error = "Question #" + obj.id + ": Please make sure your Question attachment is an image of type .jpg, .jpeg, or .png!";
                            throw BreakException;
                        } else if (obj.type === "Select One") {
                            error = "Question #" + obj.id + ": Please select a Question Type!";
                            throw BreakException;
                        } else if (obj.type === "MCQ") {
                            if (obj.optionData.length === 0){
                                error = "Question #" + obj.id + ": Please select the Number of Options!";
                                throw BreakException;
                            } else {
                                let options = obj.optionData;
                                let checked = false;
                                for (let j = 0; j < options.length; j++) {
                                    let option = options[j];
                                    if (option.check) {
                                        checked = true;
                                    }
                                    if ((option.id === 1 || option.id === 2) && option.mcq === "") {
                                        error = "Question #" + obj.id + ": Please fill in Option " + option.id + "!";
                                        throw BreakException;
                                    } else if (this.isValidNRIC(option.mcq)) {
                                        error = "Question #" + obj.id + ": Option " + option.id + " should NOT contain NRIC!";
                                        throw BreakException;
                                    } else if (option.mcq === '' && option.check) {
                                        error = "Question #" + obj.id + ": Please fill in Option " + option.id + " or uncheck the option!";
                                        throw BreakException;
                                    }
                                }
                                if (!checked) {
                                    error = "Question #" + obj.id + ": Please check at least 1 correct option!";
                                    throw BreakException;
                                } else if (obj.pearl === '' || obj.pearl === '<p><br></p>') {
                                    error = "Question #" + obj.id + ": Please fill in the Clinical Pearls!";
                                    throw BreakException;
                                } else if(this.isValidNRIC(obj.pearl)){
                                    error = "Question #" + obj.id + ": Clinical Pearls should NOT contain NRIC!";
                                    throw BreakException;
                                } else if (obj.pearlAttachment && !this.validFileType(obj.pearlAttachment)) {
                                    error = "Question #" + obj.id + ": Please make sure your Clinical Pearls attachment is an image of type .jpg, .jpeg, or .png!";
                                    throw BreakException;
                                } else if (obj.time === "Select One") {
                                    error = "Question #" + obj.id + ": Please select a Time Limit!";
                                    throw BreakException;
                                } else if(obj.mark === ''){
                                    error = "Question #" + obj.id + ": Please fill in the Marks (positive whole number)!";
                                    throw BreakException;
                                } else if (!new RegExp(/^\d+$/).test(obj.mark)){
                                    error = "Question #" + obj.id + ": Please enter a positive whole number for the marks!";
                                    throw BreakException;
                                } else if(this.isValidNRIC(obj.reference)){
                                    error = "Question #" + obj.id + ": References should NOT contain NRIC!";
                                    throw BreakException;
                                }
                            }
                        } else if (obj.type === "Open-ended" && (obj.openEnded === '' || obj.openEnded === '<p><br></p>' )) {
                            error = "Question #" + obj.id + ": Please fill in the Answer!";
                            throw BreakException;
                        } else if(obj.type === "Open-ended" && obj.openEnded !== '' && obj.openEnded !== '<p><br></p>' && this.isValidNRIC(obj.type)){
                            error = "Question #" + obj.id + ": Answer should NOT contain NRIC!";
                            throw BreakException;
                        } else if (obj.pearl === '' || obj.pearl === '<p><br></p>') {
                            error = "Question #" + obj.id + ": Please fill in the Clinical Pearls!";
                            throw BreakException;
                        } else if(this.isValidNRIC(obj.pearl)){
                            error = "Question #" + obj.id + ": Clinical Pearls should NOT contain NRIC!";
                            throw BreakException;
                        } else if (obj.pearlAttachment && typeof(obj.pearlAttachment)!=="string" && !this.validFileType(obj.pearlAttachment)){
                            error = "Question #" + obj.id + ": Please make sure your Clinical Pearls attachment is an image of type .jpg, .jpeg, or .png!";
                            throw BreakException;
                        } else if (obj.time === "Select One") {
                            error = "Question #" + obj.id + ": Please select a Time Limit!";
                            throw BreakException;
                        } else if(obj.mark === ''){
                            error = "Question #" + obj.id + ": Please fill in the Marks (positive whole number)!";
                            throw BreakException;
                        } else if (!new RegExp(/^\d+$/).test(obj.mark)) {
                            error = "Question #" + obj.id + ": Please enter a positive whole number for Marks!";
                            throw BreakException;
                        }else if(this.isValidNRIC(obj.reference)){
                            error = "Question #" + obj.id + ": References should NOT contain NRIC!";
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
    };

    uploadFile = (file, caseID, qID, objID) => {
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
        axios.post('/api/uploadCaseAttachment', formData, config);
    };

    uploadPearlFile = (file, caseID, qID, objID) => {
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
        axios.post('/api/uploadPearlAttachment', formData, config);
    };

    submitCase = (e) => {
        axios.post('/api/updateCase', {
            values: this.state
        }).then(res => {
            const caseID = res.data.data.case;
            let questions = res.data.data.questions;
            let qnData = this.state.qnData;
            this.setState({vm: true});
            for (let i=0; i<questions.length; i++){
                let question = questions[i];
                let qn = qnData[i];
                this.uploadFile(qn.attachment, caseID, question.id, question._id);
                this.uploadPearlFile(qn.pearlAttachment, caseID, question.id, question._id);
            }
        }).catch(err => {
            if(err) {
                throw(err);
            }
        });
    };

    handleDeleteQuestion = (id) => {
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
                        "pearlAttachment": obj.pearlAttachment,
                        "type": obj.type,
                        "openEnded": obj.openEnded,
                        "optionData": obj.optionData,
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

    };

    handleUpdateQuestion= (details, id) => {
        let questions = this.state.qnData;
        questions.forEach(function (obj) {
            if (obj.id === id) {
                obj.stem = details.stem;
                obj.question = details.question;
                obj.attachment = details.attachment;
                obj.pearlAttachment = details.pearlAttachment;
                obj.type = details.type;
                obj.openEnded = details.openEnded;
                obj.optionData = details.optionData;
                obj.pearl = details.pearl;
                obj.time = details.time;
                obj.reference = details.reference;
                obj.mark = details.mark;
            }
        });
        this.setState({ qnData: questions });
    };

    handleUpdateOverview = (details) => {
        this.setState({
            title: details.title,
            difficulty: details.difficulty,
            speciality: details.speciality,
            subspeciality: details.subspeciality,
            approach: details.approach,
            scenario: details.scenario,
            learning: details.learning,
        });
    };

    render() {
        const overviewTitle = (
            <span style={{ fontSize: '150%' }}><center>Case Overview</center></span>
        );
        const questionTitle = (
            <span style={{ fontSize: '150%' }}><center>Case Questions</center></span>
        );
        const storySoFar = (<span className="story-title"><center>Story So Far</center></span>);

        let vmClose = () => this.setState({ vmShow: false });
        let vmConfirmClose = () => this.setState({ vmConfirm: false });
        let questionNodes = this.state.qnData.map((obj, index) => {

            return (
                <Question
                    id={obj.id}
                    stem={obj.stem}
                    question={obj.question}
                    attachment={obj.attachment}
                    pearlAttachment={obj.pearlAttachment}
                    type={obj.type}
                    openEnded={obj.openEnded}
                    optionData={obj.optionData}
                    pearl={obj.pearl}
                    time={obj.time}
                    mark={obj.mark}
                    reference={obj.reference}
                    handleUpdateQuestion={this.handleUpdateQuestion}
                    handleDeleteQuestion={this.handleDeleteQuestion}
                    handleAddQuestion={this.addQuestion}/>
            );
        });

        let stems = this.state.qnData.map((obj, index) => {
            let stem;
            if (obj.id===1){
                stem='';
            } else {
                stem=obj.stem;
            }
            let qn = obj.question;
            return (
                <div className="stem">
                    <div className="stem-label" style={{fontSize: "180%"}}>
                        Question {obj.id}
                    </div>
                    <div style={{fontSize: "120%"}}>{ReactHtmlParser(stem)}</div>
                    <div style={{fontSize: "120%"}}>{ReactHtmlParser(qn)}</div>
                </div>
            );
        });

        return (
            <div>
                <center>
                    <table>
                        <tr>
                            <td width="60px"><a href="/disclaimer"><img src="./stop.png" alt="" style={{height:"4em"}}/></a></td>
                            <td>Before you upload the case, please ensure that all texts and attachments <br/> do not contain identifiable information such as IC number or patient's face</td>
                        </tr>
                    </table>
                </center>
                <center>*Expand/collapse the headers to view/hide case details*</center>
                <center><a href="./MedSense WorkPlan.pdf" target="_blank">Click here for CASE TEMPLATE</a></center>

                <div id="main">
                    <PanelGroup accordion style={{marginTop: "2%"}}>
                        {/*<PanelGroup accordion style={{marginTop: "2%", position: "fixed", width: "96%"}}>*/}
                        <Panel eventKey="1" bsStyle="info">
                            <Panel.Heading>
                                <Panel.Title toggle>{storySoFar}</Panel.Title>
                            </Panel.Heading>
                            <Panel.Body collapsible>
                                <p style={{textDecorationLine: "underline", margin: "0", fontSize: "200%", fontFamily: "Great Vibes", letterSpacing: "0.1em"}}>Case Scenario</p>
                                <div className="row" style={{whiteSpace:"pre-wrap", paddingLeft: "5%", fontSize:"120%"}}>
                                    {ReactHtmlParser(this.state.scenario)}
                                </div>
                                <br/><br/>
                                <p style={{textDecorationLine: "underline", margin: "0", fontSize: "200%", fontFamily: "Great Vibes", letterSpacing: "0.1em"}}>Case Questions</p>
                                <div className="row" style={{whiteSpace:"pre-wrap", paddingLeft: "5%"}}>{stems}</div>
                                <br/><br/>
                            </Panel.Body>
                        </Panel>
                    </PanelGroup>


                <form className="case-area">
                    <PanelGroup accordion>
                        <Panel eventKey="1" bsStyle="info">
                            <Panel.Heading>
                                <Panel.Title toggle>{overviewTitle}</Panel.Title>
                            </Panel.Heading>
                            <Panel.Body collapsible>
                                <Overview
                                    title={this.state.title}
                                    difficulty={this.state.difficulty}
                                    speciality={this.state.speciality}
                                    subspeciality={this.state.subspeciality}
                                    approach={this.state.approach}
                                    scenario={this.state.scenario}
                                    learning={this.state.learning}
                                    handleUpdateOverview={this.handleUpdateOverview} />
                            </Panel.Body>
                        </Panel>
                    </PanelGroup>

                    <PanelGroup accordion>
                        <Panel eventKey="1" bsStyle="info">
                            <Panel.Heading><Panel.Title toggle>{questionTitle}</Panel.Title></Panel.Heading>
                            <Panel.Body collapsible>
                                <div className="question-area">
                                    {questionNodes}
                                </div>

                                <div className="add-question-button">
                                    <Button type="button" bsStyle="primary" onClick={(e) => this.addQuestion(this.state.qnData.length+1)}>Add Question</Button><br />
                                </div>
                            </Panel.Body>
                        </Panel>
                    </PanelGroup>

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
                            <Button onClick={(e) => window.location = '/home'}>OK</Button>
                        </BootstrapModal.Footer>
                    </BootstrapModal>
                </form>

            </div>
            </div>
        );
    }
}

export default connect(null, { updateCase })(Main);