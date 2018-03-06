import React, { Component } from 'react';
import { bindAll } from 'lodash';
import {
    Button, FormGroup, ControlLabel, FormControl, InputGroup, Panel, Row,
    PanelGroup, Popover, OverlayTrigger
} from 'react-bootstrap';
import ReactQuill from 'react-quill';
import ImageMagnifier from "./ImageMagnifier";
import './Upload.css';
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
            type: this.props.type,
            openEnded: this.props.openEnded,
            mcq1: this.props.mcq1,
            mcq2: this.props.mcq2,
            mcq3: this.props.mcq3,
            mcq4: this.props.mcq4,
            mcq5: this.props.mcq5,
            mcq6: this.props.mcq6,
            mcq7: this.props.mcq7,
            mcq8: this.props.mcq8,
            mcq9: this.props.mcq9,
            mcq10: this.props.mcq10,
            check1: this.props.check1,
            check2: this.props.check2,
            check3: this.props.check3,
            check4: this.props.check4,
            check5: this.props.check5,
            check6: this.props.check6,
            check7: this.props.check7,
            check8: this.props.check8,
            check9: this.props.check9,
            check10: this.props.check10,
            pearl: this.props.pearl,
            time: this.props.time,
            mark: this.props.mark,
            reference: this.props.reference,
            open: false,
            showfile: false,
        };
        bindAll(this, 'handleFile', 'handleStemChange', 'handleQuestionChange', 'handleOpenEndedChange',
            'showAttachment', 'handlePearlChange', 'handleReferenceChange','answer', 'update',
            'showPearlAttachment', 'handlePearlFile', 'deleteQuestion');
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
            mcq1: nextProps.mcq1,
            mcq2: nextProps.mcq2,
            mcq3: nextProps.mcq3,
            mcq4: nextProps.mcq4,
            mcq5: nextProps.mcq5,
            mcq6: nextProps.mcq6,
            mcq7: nextProps.mcq7,
            mcq8: nextProps.mcq8,
            mcq9: nextProps.mcq9,
            mcq10: nextProps.mcq10,
            check1: nextProps.check1,
            check2: nextProps.check2,
            check3: nextProps.check3,
            check4: nextProps.check4,
            check5: nextProps.check5,
            check6: nextProps.check6,
            check7: nextProps.check7,
            check8: nextProps.check8,
            check9: nextProps.check9,
            check10: nextProps.check10,
            pearl: nextProps.pearl,
            time: nextProps.time,
            mark: nextProps.mark,
            reference: nextProps.reference,
        });
    }

    deleteQuestion = () =>{
        let id = this.state.id;
        this.props.handleDeleteQuestion(id);
    }

    addQuestion = () =>{
        let id = this.state.id;
        this.props.handleAddQuestion(id);
    }

    update(value,key){
        let details = {
            stem: this.state.stem,
            question: this.state.question,
            attachment: this.state.attachment,
            pearlAttachment: this.state.pearlAttachment,
            type: this.state.type,
            openEnded: this.state.openEnded,
            mcq1: this.state.mcq1,
            mcq2: this.state.mcq2,
            mcq3: this.state.mcq3,
            mcq4: this.state.mcq4,
            mcq5: this.state.mcq5,
            mcq6: this.state.mcq6,
            mcq7: this.state.mcq7,
            mcq8: this.state.mcq8,
            mcq9: this.state.mcq9,
            mcq10: this.state.mcq10,
            check1: this.state.check1,
            check2: this.state.check2,
            check3: this.state.check3,
            check4: this.state.check4,
            check5: this.state.check5,
            check6: this.state.check6,
            check7: this.state.check7,
            check8: this.state.check8,
            check9: this.state.check9,
            check10: this.state.check10,
            pearl: this.state.pearl,
            time: this.state.time,
            mark: this.state.mark,
            reference: this.state.reference,
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
            case "mcq1":
                details.mcq1 = value;
                this.props.handleUpdateQuestion(details,this.state.id);
                return;
            case "mcq2":
                details.mcq2 = value;
                this.props.handleUpdateQuestion(details,this.state.id);
                return;
            case "mcq3":
                details.mcq3 = value;
                this.props.handleUpdateQuestion(details,this.state.id);
                return;
            case "mcq4":
                details.mcq4 = value;
                this.props.handleUpdateQuestion(details,this.state.id);
                return;
            case "mcq5":
                details.mcq5 = value;
                this.props.handleUpdateQuestion(details,this.state.id);
                return;
            case "mcq6":
                details.mcq6 = value;
                this.props.handleUpdateQuestion(details,this.state.id);
                return;
            case "mcq7":
                details.mcq7 = value;
                this.props.handleUpdateQuestion(details,this.state.id);
                return;
            case "mcq8":
                details.mcq8 = value;
                this.props.handleUpdateQuestion(details,this.state.id);
                return;
            case "mcq9":
                details.mcq9 = value;
                this.props.handleUpdateQuestion(details,this.state.id);
                return;
            case "mcq10":
                details.mcq10 = value;
                this.props.handleUpdateQuestion(details,this.state.id);
                return;
            case "check1":
                details.check1 = value;
                this.props.handleUpdateQuestion(details,this.state.id);
                return;
            case "check2":
                details.check2 = value;
                this.props.handleUpdateQuestion(details,this.state.id);
                return;
            case "check3":
                details.check3 = value;
                this.props.handleUpdateQuestion(details,this.state.id);
                return;
            case "check4":
                details.check4 = value;
                this.props.handleUpdateQuestion(details,this.state.id);
                return;
            case "check5":
                details.check5 = value;
                this.props.handleUpdateQuestion(details,this.state.id);
                return;
            case "check6":
                details.check6 = value;
                this.props.handleUpdateQuestion(details,this.state.id);
                return;
            case "check7":
                details.check7 = value;
                this.props.handleUpdateQuestion(details,this.state.id);
                return;
            case "check8":
                details.check8 = value;
                this.props.handleUpdateQuestion(details,this.state.id);
                return;
            case "check9":
                details.check9 = value;
                this.props.handleUpdateQuestion(details,this.state.id);
                return;
            case "check10":
                details.check10 = value;
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
    }

    handleFile(e){
        const value = e.target.files[0];
        this.setState({ attachment: value });
        this.update(value, "attachment");
    }

    handlePearlFile(e){
        const value = e.target.files[0];
        this.setState({ pearlAttachment: value });
        this.update(value, "pearlAttachment");
    }

    handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]:value});
        this.update(value, name);
    };

    handleStemChange(value){
        this.setState({ stem: value });
        this.update(value, "stem");
    }
    handleQuestionChange(value){
        this.setState({ question: value });
        this.update(value, "question");
    }

    handleOpenEndedChange(value){
        this.setState({ openEnded: value });
        this.update(value, "openEnded");
    }

    handleCheckChange = (e) => {
        const name = e.target.name;
        const value = e.target.checked;
        this.setState({ [name]: value });
        this.update(value, name);
    }

    handlePearlChange(value){
        this.setState({ pearl: value });
        this.update(value, "pearl");
    }

    handleReferenceChange(value){
        this.setState({ reference: value });
        this.update(value, "reference");
    }

    options(){
        if (this.state.type==="MCQ" && this.state.mcq!=="Select One"){
            let array = [];
            for (let i=1;i<=parseInt(this.state.mcq);i++) {
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
                                    <input type="checkbox" aria-label="..." checked={this.state["check"+number]} name={"check"+number} onChange={(e)=>this.handleCheckChange(e)}/>
                                </InputGroup.Addon>
                                <FormControl type="text" placeholder="Enter an answer" value={this.state["mcq"+number]} name={"mcq"+number} onChange={(e)=>this.handleInputChange(e)}/>
                            </InputGroup>
                        </FormGroup>
                    </div>
                );
            });
            return options;
        }
    }

    answer(){
        if(this.state.type==="MCQ"){
            return(
                <div>
                    <FormGroup controlId="formControlsMCQ">
                        <ControlLabel style={{ fontSize: "150%" }}>Number of Options<span style={{color:"red"}}>*</span></ControlLabel>
                            <FormControl componentClass="select" value={this.state.mcq} name="mcq" onChange={(e)=>this.handleInputChange(e)}>
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
                </div>
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
    }

    checkQ1(){
        if (this.state.id===1){
            return;
        }
        return (
            <FormGroup controlId="formControlsSTEM" style={{height:'200px'}}>
                <ControlLabel style={{ fontSize: "150%" }}>STEM</ControlLabel>
                <ReactQuill value={this.state.stem}
                            modules={{toolbar: toolbarOptions}}
                            onChange={this.handleStemChange}
                            placeholder="Enter a continuation of the scenario"
                            style={{height:'100px'}}/>
            </FormGroup>
        );
    }

    showAttachment(){
        if (this.state.attachment) {
            let source = window.URL.createObjectURL(this.state.attachment);
            return (
                <Row>
                <div className="col-md-5 col-md-offset-1">
                    <ImageMagnifier url={source} /></div></Row>
            );
        }
    }

    showPearlAttachment(){
        if (this.state.pearlAttachment) {
            let source = window.URL.createObjectURL(this.state.pearlAttachment);
            return (
                <Row>
                    <div className="col-md-5 col-md-offset-1">
                        <ImageMagnifier url={source} /></div></Row>
            );
        }
    }

    render(){
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
                        <Panel.Heading><Panel.Title toggle>{"▽ Question #"+this.state.id}</Panel.Title></Panel.Heading>
                        <Panel.Body collapsible>
                        <div className="delete-question-button">
                        <Button  type="button" bsStyle="primary" onClick={(e)=>this.deleteQuestion()}>Delete Question</Button><br/>
                        </div>
                        {this.checkQ1()}

                        <FormGroup controlId="formControlsQuestion" style={{height:'200px'}}>
                            <ControlLabel style={{ fontSize: "150%" }}>Question {this.state.id}<span style={{color:"red"}}>*</span></ControlLabel>
                            <ReactQuill value={this.state.question}
                                        modules={{toolbar: toolbarOptions}}
                                        onChange={this.handleQuestionChange}
                                        placeholder="Enter a question"
                                        style={{height:'100px'}}/>
                        </FormGroup>

                        <FormGroup controlId="formControlsAttachment">
                            <ControlLabel style={{ fontSize: "150%" }}>Question Attachment</ControlLabel>
                            {this.showAttachment()}
                            <FormControl type="file" onChange={(e)=>this.handleFile(e)} accept=".jpg, .jpeg, .png"/>
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
                            <FormControl type="file" onChange={(e)=>this.handlePearlFile(e)} accept=".jpg, .jpeg, .png"/>
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