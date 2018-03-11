import React, { Component } from 'react';
import {
    Button, FormGroup, ControlLabel, FormControl, InputGroup, Panel, Row,
    PanelGroup, OverlayTrigger, Popover
} from 'react-bootstrap';
import ReactQuill from 'react-quill';
import ImageMagnifier from "./ImageMagnifier";
import '../CaseUpload/Upload.css';
import 'react-quill/dist/quill.snow.css';

const toolbarOptions = [
    [{ 'header': [1, 2, 3, false] }],
    ['bold', 'italic', 'underline'],        // toggled buttons
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'indent': '-1'}, { 'indent': '+1' }],
    ['clean']                                         // remove formatting button
];

class Question extends Component {
    constructor(props){
        super(props);
        this.state={
            id: this.props.id,
            stem: this.props.stem,
            question: this.props.question,
            attachment: this.props.attachment,
            pearlAttachment: this.props.pearlAttachment,
            type: this.props.type,
            openEnded: this.props.openEnded,
            optionData: [],
            mcq: "Select One",
            pearl: this.props.pearl,
            time: this.props.time,
            mark: this.props.mark,
            reference: this.props.reference,
            open: false,
            changefile:false,
        };
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            id: nextProps.id,
            stem: nextProps.stem,
            question: nextProps.question,
            attachment: nextProps.attachment,
            pearlAttachment: nextProps.pearlAttachment,
            type: nextProps.type,
            openEnded: nextProps.openEnded,
            optionData: nextProps.optionData,
            pearl: nextProps.pearl,
            time: nextProps.time,
            mark: nextProps.mark,
            reference: nextProps.reference,
        });
    }

    deleteQuestion = () =>{
        let id = this.props.id;
        this.props.handleDeleteQuestion(id);
    };

    addQuestion = () =>{
        let id = this.state.id;
        this.props.handleAddQuestion(id);
    };

    update = (value,key) =>{
        let details = {
            ...this.state
        };

        switch(key) {
            case "stem":
                details.stem = value;
                this.props.handleUpdateQuestion(details,this.state.id);
                return;
            case "question":
                details.question = value;
                this.props.handleUpdateQuestion(details,this.state.id);
                return;
            case "type":
                details.type = value;
                this.props.handleUpdateQuestion(details,this.state.id);
                return;
            case "openEnded":
                details.openEnded = value;
                this.props.handleUpdateQuestion(details,this.state.id);
                return;
            case "optionData":
                details.optionData = value;
                this.props.handleUpdateQuestion(details,this.state.id);
                return;
            case "pearl":
                details.pearl = value;
                this.props.handleUpdateQuestion(details,this.state.id);
                return;
            case "time":
                details.time = value;
                this.props.handleUpdateQuestion(details,this.state.id);
                return;
            case "mark":
                details.mark = value;
                this.props.handleUpdateQuestion(details,this.state.id);
                return;
            case "reference":
                details.reference = value;
                this.props.handleUpdateQuestion(details,this.state.id);
                return;
            case "attachment":
                details.attachment = value;
                this.props.handleUpdateQuestion(details,this.state.id);
                return;
            case "pearlAttachment":
                details.pearlAttachment = value;
                this.props.handleUpdateQuestion(details,this.state.id);
                return;
            default:
                this.props.handleUpdateQuestion(details,this.state.id);
                return;
        }
    };

    handleFile = (e) =>{
        const value = e.target.files[0];
        this.setState({ attachment: value });
        this.update(value, "attachment");
    };

    handlePearlFile = (e) =>{
        const value = e.target.files[0];
        this.setState({ pearlAttachment: value });
        this.update(value, "pearlAttachment");
    };

    handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]:value});
        this.update(value, name);
    };

    handleMCQChange = (e) => {
        const name = e.target.name;
        this.state.optionData.forEach(function (obj) {
            if (obj.id  === parseInt(name.slice(-1),10)){
                if (name.substring(0,3)==="mcq"){
                    obj.mcq = e.target.value;
                } else {
                    obj.check = e.target.checked;
                }
            }
        });

        this.update(this.state.optionData, "optionData");
    };

    handleNumberChange = (e) => {
        const value = e.target.value;
        let temp = [];
        if (this.state.type ==="MCQ" && value!==this.state.mcq){
            let id = value==="Select One"?0:parseInt(value,10);
            let prevId = this.state.mcq==="Select One"?0:parseInt(this.state.mcq,10);
            if (id > prevId){
                for (let i=0;i<this.state.optionData.length;i++){
                    if(this.state.optionData[i].id<=prevId){
                        temp.push(this.state.optionData[i]);
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
                for (let j=0;j<this.state.optionData.length;j++){
                    if(this.state.optionData[j].id<=id){
                        temp.push(this.state.optionData[j]);
                    }
                }
            }
            this.setState({mcq: value, optionData: temp});
            this.update(temp, "optionData");
        }
    };

    handleStemChange = (value) =>{
        this.setState({ stem: value });
        this.update(value, "stem");
    };

    handleQuestionChange = (value) =>{
        this.setState({ question: value });
        this.update(value, "question");
    };

    handleOpenEndedChange = (value) =>{
        this.setState({ openEnded: value });
        this.update(value, "openEnded");
    };

    handlePearlChange = (value) =>{
        this.setState({ pearl: value });
        this.update(value, "pearl");
    };

    handleReferenceChange = (value) =>{
        this.setState({ reference: value });
        this.update(value, "reference");
    };

    options = () =>{
        if (this.state.type==="MCQ" && this.state.mcq!=="Select One"){
            let array = [];
            for (let i=1;i<=parseInt(this.state.mcq,10);i++) {
                array.push(i);
            }

            let options = array.map((number, index) => {
                let mandatory = number<3 ? "*": "";
                return(
                    <div>
                        <FormGroup>
                            <ControlLabel>Option {number}<span style={{color:"red"}}>{mandatory}</span></ControlLabel>
                            <InputGroup>
                                <InputGroup.Addon>
                                    <input type="checkbox" aria-label="..." checked={this.state["check"+number]} name={"check"+number} onChange={(e)=>this.handleMCQChange(e)}/>
                                </InputGroup.Addon>
                                <FormControl type="text" placeholder="Enter an answer" value={this.state["mcq"+number]} name={"mcq"+number} onChange={(e)=>this.handleMCQChange(e)}/>
                            </InputGroup>
                        </FormGroup>
                    </div>
                );
            });
            return options;
        }
    };

    answer = () =>{
        if(this.state.type==="MCQ"){
            return(
                <FormGroup controlId="formControlsMCQ">
                    <ControlLabel style={{ fontSize: "150%" }}>Number of Options<span style={{color:"red"}}>*</span></ControlLabel>
                    <FormControl componentClass="select" value={this.state.mcq} name="mcq" onChange={(e)=>this.handleNumberChange(e)}>
                        <option value="Select One">Select One</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </FormControl>
                </FormGroup>
            );
        } else if(this.state.type==="Open-ended"){
            return(
                <FormGroup controlId="formControlsOpenEnded" style={{height:'200px'}}>
                        <ControlLabel style={{ fontSize: "150%" }}>Answer<span style={{color:"red"}}>*</span>
                            <br />
                        </ControlLabel>
                    <ReactQuill value={this.state.openEnded}
                                modules={{toolbar: toolbarOptions}}
                                onChange={this.handleOpenEndedChange}
                                placeholder="Enter an answer"
                                style={{height:'100px'}}/>
                </FormGroup>
            );
        }
        return;
    };

    checkQ1 = () =>{
        if (parseInt(this.props.id, 10)===1){
            return;
        }
        return (
            <FormGroup controlId="formControlsSTEM" style={{height: '200px'}}>
                <ControlLabel style={{fontSize: "150%"}}>STEM</ControlLabel>
                <ReactQuill value={this.state.stem}
                            modules={{toolbar: toolbarOptions}}
                            onChange={this.handleStemChange}
                            placeholder="Enter a continuation of the scenario"
                            style={{height: '100px'}}/>
            </FormGroup>
        );
    };

    showAttachment = () =>{
        if (this.state.attachment) {
            let source;
            if (typeof(this.state.attachment)==="string"){
                console.log(this.state.attachment);
                source = this.state.attachment;
            } else {
                source = window.URL.createObjectURL(this.state.attachment);
            }
            return (
                <Row>
                    <div className="col-md-5 col-md-offset-1">
                        <ImageMagnifier url={source}/></div>
                </Row>
            );
        }
    };

    showPearlAttachment = () =>{
        if (this.state.pearlAttachment) {
            let source;
            if (typeof(this.state.pearlAttachment)==="string"){
                console.log(this.state.pearlAttachment);
                source = this.state.pearlAttachment;
            } else {
                source = window.URL.createObjectURL(this.state.pearlAttachment);
            }
            return (
                <Row>
                    <div className="col-md-5 col-md-offset-1">
                        <ImageMagnifier url={source}/></div>
                </Row>
            );
        }
    };

    showUpload = () =>{
        if (this.state.changefile){
            return <FormControl type="file" onChange={(e)=>this.handleFile(e)} accept=".jpg, .jpeg, .png"/>;
        }
    };

    showPearlUpload = () =>{
        if (this.state.changePearlfile){
            return <FormControl type="file" onChange={(e)=>this.handlePearlFile(e)} accept=".jpg, .jpeg, .png"/>;
        }
    };

    handleShowUpload = () =>{
        this.setState({ changefile: true });
    };

    handleShowPearlUpload = () =>{
        this.setState({ changePearlfile: true });
    };

    render(){
        let button;
        if (typeof(this.state.attachment)==="string" && this.state.attachment!==""){
            button = <Button onClick={(e) => this.handleShowUpload()}>Change Attachment</Button>;
        } else if (!this.state.changefile) {
            button = <FormControl type="file" onChange={(e)=>this.handleFile(e)} accept=".jpg, .jpeg, .png"/>;
        }
        let pearlButton;
        if (typeof(this.state.pearlAttachment)==="string" && this.state.pearlAttachment!==""){
            pearlButton = <Button onClick={(e) => this.handleShowPearlUpload()}>Change Attachment</Button>;
        } else if (!this.state.changePearlfile) {
            pearlButton = <FormControl type="file" onChange={(e)=>this.handlePearlFile(e)} accept=".jpg, .jpeg, .png"/>;
        }

        const popoverHover = (
            <Popover id="popover-trigger-hover" title="Clinical Pearls">
                Notes on how to approach the question, add-on explanations to the answers provided or simply useful tips on how to survive in the wards.
            </Popover>
        );

        return(
            <div id="question">
                <div className="add-question-button">
                    <Button type="button" bsStyle="primary" onClick={(e) => this.addQuestion()}>Add Question</Button><br />
                </div><br/>
                <PanelGroup accordion>
                    <Panel>
                        <Panel.Heading><Panel.Title toggle>{"Question #"+this.state.id}</Panel.Title></Panel.Heading>
                        <Panel.Body collapsible>
                        <div className="delete-question-button">
                        <Button  type="button" bsStyle="primary" onClick={(e)=>this.deleteQuestion()}>Delete Question</Button><br/>
                        </div>
                        {this.checkQ1()}

                        <FormGroup controlId="formControlsQuestion" style={{height:'200px'}}>
                            <ControlLabel style={{ fontSize: "150%" }}>Question {this.props.id}<span style={{color:"red"}}>*</span></ControlLabel>
                            <ReactQuill value={this.state.question}
                                        modules={{toolbar: toolbarOptions}}
                                        onChange={this.handleQuestionChange}
                                        placeholder="Enter a question"
                                        style={{height:'100px'}}/>
                        </FormGroup>

                        <FormGroup controlId="formControlsAttachment">
                            <ControlLabel style={{ fontSize: "150%" }}>Question Attachment</ControlLabel>
                            {this.showAttachment()}
                            {button}
                            {this.showUpload()}
                        </FormGroup>

                        <FormGroup controlId="formControlsType">
                            <ControlLabel style={{ fontSize: "150%" }}>Question Type<span style={{color:"red"}}>*</span></ControlLabel>
                            <FormControl componentClass="select" value={this.state.type} name="type" onChange={(e)=>this.handleInputChange(e)}>
                                <option value="Select One">Select One</option>
                                <option value="MCQ">MCQ</option>
                                <option value="Open-ended">Open-ended</option>
                            </FormControl>
                        </FormGroup>

                        {this.answer()}
                        {this.options()}

                        <FormGroup controlId="formControlsPEARL" style={{height:'200px'}}>
                            <ControlLabel style={{ fontSize: "150%" }}>Clinical Pearls<span style={{color:"red"}}>*</span>
                                <OverlayTrigger trigger={['hover']} placement="bottom" overlay={popoverHover}><img src='./info.png' hspace="5" alt="" style={{height:"1em", marginBottom:"1em"}}/></OverlayTrigger>
                            </ControlLabel>
                            <ReactQuill value={this.state.pearl}
                                        modules={{toolbar: toolbarOptions}}
                                        onChange={this.handlePearlChange}
                                        placeholder="Enter an explanation for the answer(s)"
                                        style={{height:'100px'}}/>
                        </FormGroup>

                        <FormGroup controlId="formControlsPearlAttachment">
                            <ControlLabel style={{ fontSize: "150%" }}>Clinical Pearls Attachment</ControlLabel>
                            {this.showPearlAttachment()}
                            {pearlButton}
                            {this.showPearlUpload()}
                        </FormGroup>

                        <FormGroup controlId="formControlsTime">
                            <ControlLabel style={{ fontSize: "150%" }}>Time Limit<span style={{color:"red"}}>*</span></ControlLabel>
                            <InputGroup>
                                <FormControl componentClass="select" value={this.state.time} name="time" onChange={(e)=>this.handleInputChange(e)}>
                                    <option value="Select One">Select One</option>
                                    <option value="0.5">0.5</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="5">5</option>
                                    <option value="8">8</option>
                                    <option value="10">10</option>
                                    <option value="12">12</option>
                                    <option value="15">15</option>
                                </FormControl>
                                <InputGroup.Addon>Minute(s)</InputGroup.Addon>
                            </InputGroup>
                        </FormGroup>

                        <FormGroup>
                            <ControlLabel style={{ fontSize: "150%" }}>Allocate Marks<span style={{color:"red"}}>*</span></ControlLabel>
                            <InputGroup>
                                <FormControl type="text" placeholder="Enter a positive whole number" value={this.state.mark}
                                             onChange={(e)=>this.handleInputChange(e)} name="mark" />
                                <InputGroup.Addon>Mark(s)</InputGroup.Addon>
                            </InputGroup>
                        </FormGroup>

                        <FormGroup controlId="formControlsReferences" style={{height:'200px'}}>
                            <ControlLabel style={{ fontSize: "150%" }}>References</ControlLabel>
                            <ReactQuill value={this.state.reference}
                                        modules={{toolbar: toolbarOptions}}
                                        onChange={this.handleReferenceChange}
                                        placeholder="Enter your references"
                                        style={{height:'100px'}}/>
                        </FormGroup>
                        </Panel.Body>
                    </Panel>
                </PanelGroup>
            </div>
        );
    }
}

export default Question;