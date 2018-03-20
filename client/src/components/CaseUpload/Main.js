import React, { Component } from 'react';
import ReactHtmlParser from "react-html-parser";
import {
    Button, PanelGroup, Panel, FormGroup, Radio, ControlLabel, FormControl, Col, Row,
    Glyphicon
} from 'react-bootstrap';
import axios from 'axios';
import BootstrapModal from '../UI/Modal/UploadBootstrapModal.js';
import './Upload.css';
import Overview from "./Overview";
import Question from "./Question";

class Main extends Component {
    state = {
        qnData: this.props.questions || [],
        title: this.props.title || '',
        difficulty: this.props.difficulty || "Select One",
        speciality: this.props.speciality || "Select One",
        subspeciality: this.props.subspeciality || null,
        approach: this.props.approach || null,
        scenario: this.props.scenario || '',
        learning: this.props.learning || '',
        author: "",
        vmShow: false,
        vmConfirm: false,
        previewShow: false,
        id: this.props.id,
        radio: false,
        overview: false,
        question: false,
        pdpa: false
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
                        "numOptions": "Select One",
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
                            "id": parseInt(obj.id,10) + offset,
                            "stem": obj.stem,
                            "question": obj.question,
                            "attachment": obj.attachment,
                            "pearlAttachment": obj.pearlAttachment,
                            "type": obj.type,
                            "openEnded": obj.openEnded,
                            "optionData": obj.optionData,
                            "numOptions": obj.numOptions,
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
                            "numOptions": "Select One",
                            "pearl": '',
                            "time": "Select One",
                            "reference": '',
                            "mark": '',
                        }
                    );
                    newQuestions = newQuestions.concat(
                        {
                            "id": parseInt(obj.id,10) + offset,
                            "stem": obj.stem,
                            "question": obj.question,
                            "attachment": obj.attachment,
                            "pearlAttachment": obj.pearlAttachment,
                            "type": obj.type,
                            "openEnded": obj.openEnded,
                            "optionData": obj.optionData,
                            "numOptions": obj.numOptions,
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

    deleteQuestion = (id) => {
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
                        "numOptions": obj.numOptions,
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
        this.setState({ qnData: newQuestions});
    };

    handleQuestionChange = (value, qnId) =>{
        const qnData = this.state.qnData;
        for(let i = 0; i < qnData.length; i++) {
            const qn = qnData[i];
            if(qn.id === qnId) {
                qnData.splice(qnData.indexOf(qn), 1);
                qn.question = value;
                qnData.push(qn);
                this.setState({qnData: qnData});
                break;
            }
        }
    };

    handleFile = (value, qnId) =>{
        const qnData = this.state.qnData;
        for(let i = 0; i < qnData.length; i++) {
            const qn = qnData[i];
            if(qn.id === qnId) {
                qnData.splice(qnData.indexOf(qn), 1);
                qn.attachment = value;
                qnData.push(qn);
                this.setState({qnData: qnData});
                break;
            }
        }
    };

    handleInputChange = (name, value, qnId) => {
        const qnData = this.state.qnData;
        for(let i = 0; i < qnData.length; i++) {
            const qn = qnData[i];
            if(qn.id === qnId) {
                qnData.splice(qnData.indexOf(qn), 1);
                qn[name] = value;
                qnData.push(qn);
                this.setState({qnData: qnData});
                break;
            }
        }
    };

    handleNumberChange = (value, qnId) => {
        const qnData = this.state.qnData;
        for(let i = 0; i < qnData.length; i++) {
            const qn = qnData[i];
            if(qn.id === qnId) {
                qnData.splice(qnData.indexOf(qn), 1);

                let temp = [];
                if (qn.type ==="MCQ" && value !== qn.numOptions) {
                    let id = value==="Select One"?0:parseInt(value,10);
                    let prevId = qn.numOptions==="Select One"?0:parseInt(qn.numOptions,10);
                    if (id > prevId){
                        for (let i=0;i<qn.optionData.length;i++){
                            if(qn.optionData[i].id<=prevId){
                                temp.push(qn.optionData[i]);
                            }
                        }
                        for (let k=1;k<=id-prevId;k++){
                            temp.push({
                                "id": prevId+k,
                                "mcq": "",
                                "check": false
                            });
                        }
                    } else if (id < prevId){
                        for (let j=0;j<qn.optionData.length;j++){
                            if(qn.optionData[j].id<=id){
                                temp.push(qn.optionData[j]);
                            }
                        }
                    }
                    qn.numOptions = value;
                    qn.optionData = temp;
                    console.log(value, temp);
                }
                
                qnData.push(qn);
                this.setState({qnData: qnData});
                break;
            }
        }
    };

    handlePearlChange = (value, qnId) => {
        const qnData = this.state.qnData;
        for(let i = 0; i < qnData.length; i++) {
            const qn = qnData[i];
            if(qn.id === qnId) {
                qnData.splice(qnData.indexOf(qn), 1);
                qn.pearl = value;
                qnData.push(qn);
                this.setState({qnData: qnData});
                break;
            }
        }
    };

    handlePearlFile = (value, qnId) => {
        const qnData = this.state.qnData;
        for(let i = 0; i < qnData.length; i++) {
            const qn = qnData[i];
            if(qn.id === qnId) {
                qnData.splice(qnData.indexOf(qn), 1);
                qn.pearlAttachment = value;
                qnData.push(qn);
                this.setState({qnData: qnData});
                break;
            }
        }
    };

    handleReferenceChange = (value, qnId) => {
        const qnData = this.state.qnData;
        for(let i = 0; i < qnData.length; i++) {
            const qn = qnData[i];
            if(qn.id === qnId) {
                qnData.splice(qnData.indexOf(qn), 1);
                qn.reference = value;
                qnData.push(qn);
                this.setState({qnData: qnData});
                break;
            }
        }
    };

    handleStemChange = (value, qnId) => {
        const qnData = this.state.qnData;
        for(let i = 0; i < qnData.length; i++) {
            const qn = qnData[i];
            if(qn.id === qnId) {
                qnData.splice(qnData.indexOf(qn), 1);
                qn.stem = value;
                qnData.push(qn);
                this.setState({qnData: qnData});
                break;
            }
        }
    };

    handleMCQChange = (value, qnId) => {
        const qnData = this.state.qnData;
        for(let i = 0; i < qnData.length; i++) {
            const qn = qnData[i];
            if(qn.id === qnId) {
                qnData.splice(qnData.indexOf(qn), 1);
                qn.optionData = value;
                console.log(value);
                qnData.push(qn);
                this.setState({qnData: qnData});
                break;
            }
        }
    };

    handleOpenEndedChange = (value, qnId) => {
        const qnData = this.state.qnData;
        for(let i = 0; i < qnData.length; i++) {
            const qn = qnData[i];
            if(qn.id === qnId) {
                qnData.splice(qnData.indexOf(qn), 1);
                qn.openEnded = value;
                qnData.push(qn);
                this.setState({qnData: qnData});
                break;
            }
        }
    };

    saveChanges = (e) => {
        e.preventDefault();
        if (!this.state.radio && this.state.author!==""){
            this.setState({ vmShow: true, error: "Credits: Please give your PDPA Consent if you want your name to be recorded!" });
        } else if (this.state.title === '') {
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
                        } else if (this.props.process!=="vet" && obj.attachment && !this.validFileType(obj.attachment)) {
                            error = "Question #" + obj.id + ": Please make sure your Question attachment is an image of type .jpg, .jpeg, or .png!";
                            throw BreakException;
                        } else if (this.props.process==="vet" && typeof(obj.attachment)!=="string" && !this.validFileType(obj.attachment)){
                            error = "Question #" + obj.id + ": Please make sure your Question attachment is an image of type .jpg, .jpeg, or .png!";
                            throw BreakException;
                        } else if (obj.type === "Select One") {
                            error = "Question #" + obj.id + ": Please select a Question Type!";
                            throw BreakException;
                        } else if (obj.type === "MCQ") {
                            if (obj.numOptions === "Select One"){
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
                                    if (option.mcq === "") {
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
                                } else if (this.props.process!=="vet" && obj.pearlAttachment && !this.validFileType(obj.pearlAttachment)) {
                                    error = "Question #" + obj.id + ": Please make sure your Clinical Pearls attachment is an image of type .jpg, .jpeg, or .png!";
                                    throw BreakException;
                                } else if (this.props.process==="vet" && obj.pearlAttachment && typeof(obj.pearlAttachment)!=="string" && !this.validFileType(obj.pearlAttachment)) {
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
                        } else if (this.props.process!=="vet" && obj.pearlAttachment && !this.validFileType(obj.pearlAttachment)) {
                            error = "Question #" + obj.id + ": Please make sure your Clinical Pearls attachment is an image of type .jpg, .jpeg, or .png!";
                            throw BreakException;
                        } else if (this.props.process==="vet" && obj.pearlAttachment && typeof(obj.pearlAttachment)!=="string" && !this.validFileType(obj.pearlAttachment)) {
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
                    this.setState({vmConfirm: true});

                } catch (e) {
                    this.setState({vmShow: true, error: error});
                    return;
                }
            }
        }
    };

    isValidNRIC = (theNric) => {
        const upperCaseNric = theNric.toUpperCase();
        return new RegExp(/^.*[STFG]\d{7}[A-Z].*$/).test(upperCaseNric);
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
        axios.post('/api/uploadCaseAttachment', formData, config).then(res => {
            console.log(res);
        });
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
        axios.post('/api/uploadPearlAttachment', formData, config).then(res => {
            console.log(res);
        });
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

    submitCase = (e) => {
        if (this.props.process==="vet"){
            axios.post('/api/updateCase', {
                values: this.state
            }).then(res => {
                const caseID = res.data.data.case;
                let questions = res.data.data.questions;
                let qnData = this.state.qnData;
                this.setState({vm: true});
                for (let j=0;j<qnData.length;j++) {
                    let qn = qnData[j];
                    for (let i=0; i<questions.length; i++){
                        let question = questions[i];
                        if (String(question.id)===String(qn.id)) {
                            this.uploadFile(qn.attachment, caseID, question.id, question._id);
                            this.uploadPearlFile(qn.pearlAttachment, caseID, question.id, question._id);
                        }
                    }
                }
            }).catch(err => {
                if(err) {
                    throw(err);
                }
            });
        } else {
            axios.post('/api/uploadCase', {
                values: this.state
            }).then(res => {
                const caseID = res.data.data.case;
                let questions = res.data.data.question;
                let qnData = this.state.qnData;
                this.setState({vm: true});
                for (let j = 0; j < qnData.length; j++) {
                    let qn = qnData[j];
                    for (let i = 0; i < questions.length; i++) {
                        let question = questions[i];
                        if (String(question.id) === String(qn.id)) {
                            this.uploadFile(qn.attachment, caseID, question.id, question._id);
                            this.uploadPearlFile(qn.pearlAttachment, caseID, question.id, question._id);
                        }
                    }
                }
                if (this.state.author!==""){
                    axios.post('api/updateName', {
                        values: this.state.author
                    });
                }
            }).catch(err => {
                if (err) {
                    throw(err);
                }
            });
        }
    };

    renderPDPA() {
        if (this.props.process==="vet"){
            return;
        } else {
            const PDPA = this.state.pdpa?(
                <span className="title" style={{fontSize: "180%"}}><strong><center>-| Credits</center></strong></span>
            ):(
                <span className="title" style={{fontSize: "180%"}}><strong><center>+| Credits</center></strong></span>
            );

            return(
            <PanelGroup accordion>
                <Panel eventKey="1" bsStyle="primary" style={{marginLeft: "14%", marginRight: "15%", padding: "0"}}>
                    <Panel.Heading  onClick={(e) => this.setState({pdpa:!this.state.pdpa})}><Panel.Title toggle>{PDPA}</Panel.Title></Panel.Heading>
                    <Panel.Body collapsible>
                        <FormGroup controlId="formControlsAuthor">
                            <ControlLabel style={{fontSize: "150%"}}>Author of case (Optional)</ControlLabel>
                            <FormControl type="text" placeholder="Enter your name as registered in school"
                                         value={this.state.author} name="author"
                                         onChange={(e) => this.handleAuthorChange(e)}/>
                        </FormGroup>
                        <h3>Note:</h3>
                        <h4>
                            <br/>
                            Do leave your name if you would like to be contacted for credit in contributing this case if
                            the event arises.

                            By indicating your consent to provide your personal data in this form, you agree to be
                            contacted for the purposes of Medsense.
                            <br/><br/>
                            I hereby declare all information I have provided as accurate, and understand that my
                            information may be passed to relevant committee members for the purposes of contacting me.
                            All personal information will be kept confidential and used for the purpose(s) stated.
                            <br/><br/>
                            I hereby give my consent to the survey-taker to collect my personal information for
                            dissemination to relevant parties and be contacted for issues pertaining to, or related to,
                            this event.
                            <br/><br/>
                            PDPA Consent
                            <br/><br/>
                        </h4>
                        <FormGroup controlId="formControlsPDPA" style={{paddingLeft: "30%", paddingTop: "0"}}>
                            <Col sm={6}>
                                <Radio name="radio" value="yes" checked={this.state.radio} inline onChange={(e) => this.handleRadioChange(e)}>
                                    <h5>Yes</h5>
                                </Radio>
                            </Col>
                            <Col sm={6}>
                                <Radio name="radio" value="no" checked={!this.state.radio} inline onChange={(e) => this.handleRadioChange(e)}>
                                    <h5>No</h5>
                                </Radio>
                            </Col>
                        </FormGroup>
                        <br/>
                        <h4>
                            Should you wish to withdraw your consent for us to contact you for the purposes stated
                            above, please notify us in writing to [email]. We will then remove your personal information
                            from our database.
                            <br/><br/>
                            Please allow at least 7 business days for your withdrawal of consent to take effect.
                        </h4>
                    </Panel.Body>
                </Panel>
            </PanelGroup>
            );
        }
    }

    compare = (a,b) => {
        if (a.id < b.id)
            return -1;
        if (a.id > b.id)
            return 1;
        return 0;
    };

    handleAuthorChange = (e) => {
        this.setState({[e.target.name]:e.target.value});
    };

    handleRadioChange = (e) => {
        let checked = this.state.radio;
        this.setState({radio:!checked});
        console.log(!checked);
    };

    showPreview = (e) => {
        this.setState({ previewShow: true });
    };

    render() {
        let stems = this.state.qnData.map((obj, index) => {
            let stem;
            if (obj.id===1){
                stem='';
            } else {
                stem=obj.stem;
            }
            let qn=obj.question;
            return (
                <div key={index} className="stem">
                    <h3 style={{marginTop: "3%", color: "#337ab7", marginLeft: "2%"}}><strong>Question {obj.id}</strong></h3>
                    <div style={{whiteSpace:"pre-wrap", paddingLeft: "3%", fontSize:"120%", paddingRight: "3%"}}>{ReactHtmlParser(stem)}</div>
                    <div style={{whiteSpace:"pre-wrap", paddingLeft: "3%", fontSize:"120%", paddingRight: "3%"}}>{ReactHtmlParser(qn)}</div>
                </div>
            );
        });

        const overviewTitle = this.state.overview?(
            <span className="title" style={{fontSize: "180%"}}><strong><center>-| Case Overview</center></strong></span>
        ):(
            <span className="title" style={{fontSize: "180%"}}><strong><center>+| Case Overview</center></strong></span>
        );

        const questionTitle = this.state.question?(
            <span className="title" style={{fontSize: "180%"}}><strong><center>-| Case Questions</center></strong></span>
        ):(
            <span className="title" style={{fontSize: "180%"}}><strong><center>+| Case Questions</center></strong></span>
        );
        let questions = this.state.qnData;
        questions.sort(this.compare);
        let questionNodes = questions.map((obj, index) => {
            return (
                <Question
                    key={index}
                    process={this.props.process}
                    id={obj.id}
                    stem={obj.stem}
                    question={obj.question}
                    attachment={obj.attachment}
                    pearlAttachment={obj.pearlAttachment}
                    type={obj.type}
                    openEnded={obj.openEnded}
                    optionData={obj.optionData}
                    numOptions={obj.numOptions}
                    pearl={obj.pearl}
                    time={obj.time}
                    mark={obj.mark}
                    reference={obj.reference}
                    handleUpdateQuestion={this.handleUpdateQuestion}
                    handleDeleteQuestion={this.deleteQuestion}
                    handleAddQuestion={this.addQuestion}
                    handleQuestionChange={this.handleQuestionChange}
                    handleFile={this.handleFile}
                    handleInputChange={this.handleInputChange}
                    handleNumberChange={this.handleNumberChange}
                    handlePearlChange={this.handlePearlChange}
                    handlePearlFile={this.handlePearlFile}
                    handleReferenceChange={this.handleReferenceChange}
                    handleStemChange={this.handleStemChange}
                    handleMCQChange={this.handleMCQChange}
                    handleOpenEndedChange={this.handleOpenEndedChange}
                />
            );
        });

        const modalMessage = this.props.process==="vet" ? "Your case has been released successfully! You will be redirected to the Homepage." : "Your case has been uploaded successfully! You will be redirected to the Homepage.";

        return(
            <div>
                <div align="center" className="heading">
                    <h1>Have a case to share?</h1>
                    <h4>
                        <em><br/>
                        Refer to the <a href="./MedSense WorkPlan.pdf" target="_blank">CASE TEMPLATE</a> to understand the format required.
                        {/*<br/><br/><img src="./stop.png" alt="" style={{height:"2em", marginLeft: "0"}} hspace="15"/>*/}
                        <br/><br/>In addition, ensure that all texts and attachments<br/>do not contain identifiable information such as NRICs or patient's faces.
                        <br/><br/>Note that cases uploaded by students will need to be vetted by faculty<br/>before they are released as a game.
                        <br/><br/>Expand and collapse the headers to reduce the scrolling you will need to do! <br/>
                        </em>
                    </h4>
                </div>

                <div id="main">
                    <form className="case-area">
                        <PanelGroup accordion bsStyle="primary" style={{marginLeft: "14%", marginRight: "15%", padding: "0"}}>
                            <Panel eventKey="1">
                                <Panel.Heading onClick={(e) => this.setState({overview:!this.state.overview})}>
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
                                        handleUpdateOverview={this.handleUpdateOverview}
                                        process={this.props.process}
                                    />
                                </Panel.Body>
                            </Panel>
                        </PanelGroup>

                        <PanelGroup accordion bsStyle="primary" style={{marginLeft: "14%", marginRight: "15%", padding: "0"}}>
                            <Panel eventKey="1" style={{border: "0"}}>
                                <Panel.Heading onClick={(e) => this.setState({question:!this.state.question})}><Panel.Title toggle>{questionTitle}</Panel.Title></Panel.Heading>
                                <Panel.Body collapsible>
                                    <div className="question-area">
                                        {questionNodes}
                                    </div>

                                    <div className="add-question-button">
                                        <Button type="button" bsSize="large" bsStyle="link" onClick={(e) => this.addQuestion(this.state.qnData.length+1)}><Glyphicon glyph="plus-sign"/> Add Question</Button><br />
                                    </div>
                                </Panel.Body>
                            </Panel>
                        </PanelGroup>

                        {this.renderPDPA()}

                        <Row>
                            <Col smOffset={2} sm={2}>
                                <div className="preview-case-button">
                                    <Button type="button" align="center" bsStyle="primary" bsSize="large"  onClick={(e) => this.showPreview(e)}>Preview</Button>
                                </div>
                            </Col>
                            <Col smOffset={4} sm={2}>
                                <div className="submit-case-button">
                                    <Button type="button" align="center" bsStyle="primary" bsSize="large" onClick={(e) => this.saveChanges(e)}>Submit</Button>
                                </div>
                            </Col>
                        </Row>

                        <BootstrapModal bsSize="large" show={this.state.previewShow} onHide={(e) => this.setState({ previewShow: false })}>
                            <BootstrapModal.Header closeButton>
                                <BootstrapModal.Title id="contained-modal-title-lg" style={{fontSize: "200%", fontWeight: "bold"}}>{this.state.title}</BootstrapModal.Title>
                            </BootstrapModal.Header>
                            <BootstrapModal.Body>
                                <h3 style={{marginTop: "0", color: "#337ab7"}}><strong>Case Scenario</strong></h3>
                                <div className="row" style={{whiteSpace:"pre-wrap", paddingLeft: "3%", fontSize:"120%", paddingRight: "3%"}}>
                                    {ReactHtmlParser(this.state.scenario)}
                                </div>
                                <div className="row">{stems}</div>
                            </BootstrapModal.Body>
                            <BootstrapModal.Footer>
                                <Button onClick={(e) => this.setState({ previewShow: false })}>Close</Button>
                            </BootstrapModal.Footer>
                        </BootstrapModal>

                        <BootstrapModal
                            show={this.state.vmShow}
                            onHide={(e) => this.setState({ vmShow: false })}
                            aria-labelledby="contained-modal-title-vm">
                            <BootstrapModal.Header closeButton>
                                <BootstrapModal.Title id="contained-modal-title-vm">Unable to Submit</BootstrapModal.Title>
                            </BootstrapModal.Header>
                            <BootstrapModal.Body>
                                <p>{this.state.error}</p>
                            </BootstrapModal.Body>
                            <BootstrapModal.Footer>
                                <Button onClick={(e) => this.setState({ vmShow: false })}>Close</Button>
                            </BootstrapModal.Footer>
                        </BootstrapModal>

                        <BootstrapModal
                            show={this.state.vmConfirm}
                            onHide={(e) => this.setState({ vmConfirm: false })}
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
                                <p>{modalMessage}</p>
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

export default Main;