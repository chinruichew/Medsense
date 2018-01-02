import React, { Component } from 'react';
import { bindAll } from 'lodash';
import { Button, FormGroup, ControlLabel, FormControl, InputGroup, Accordion, Panel } from 'react-bootstrap';

import './Vetting.css';

class Question extends Component {
    constructor(props){
        super(props);
        this.state={
            id: this.props.id,
            stem: this.props.stem,
            question: this.props.question,
            attachment: this.props.attachment,
            filename: this.props.filename,
            filetype: this.props.filetype,
            type: this.props.type,
            openEnded: this.props.openEnded,
            mcq1: this.props.mcq1,
            mcq2: this.props.mcq2,
            mcq3: this.props.mcq3,
            mcq4: this.props.mcq4,
            mcq5: this.props.mcq5,
            mcq6: this.props.mcq6,
            check1: this.props.check1,
            check2: this.props.check2,
            check3: this.props.check3,
            check4: this.props.check4,
            check5: this.props.check5,
            check6: this.props.check6,
            pearl: this.props.pearl,
            time: this.props.time,
            reference: this.props.reference,
            open: false,
        };
        bindAll(this, 'handleFile', 'handleStemChange', 'handleQuestionChange', 'handleTypeChange', 'handleOpenEndedChange',
            'handleMCQ1Change', 'handleMCQ2Change', 'handleMCQ3Change', 'handleMCQ4Change', 'handleMCQ5Change', 'handleMCQ6Change',
            'handleCheck1Change', 'handleCheck2Change', 'handleCheck3Change', 'handleCheck4Change', 'handleCheck5Change',
            'handleCheck6Change', 'handlePearlChange', 'handleTimeChange', 'handleReferenceChange','answer', 'update', 'deleteQuestion');
    }

    deleteQuestion(){
        let id = this.props.id;
        this.props.handleDeleteQuestion(id);
    }

    update(value,key){
        let details = {
            stem: this.state.stem,
            question: this.state.question,
            attachment: this.state.attachment,
            filename: this.state.filename,
            filetype: this.state.filetype,
            type: this.state.type,
            openEnded: this.state.openEnded,
            mcq1: this.state.mcq1,
            mcq2: this.state.mcq2,
            mcq3: this.state.mcq3,
            mcq4: this.state.mcq4,
            mcq5: this.state.mcq5,
            mcq6: this.state.mcq6,
            check1: this.state.check1,
            check2: this.state.check2,
            check3: this.state.check3,
            check4: this.state.check4,
            check5: this.state.check5,
            check6: this.state.check6,
            pearl: this.state.pearl,
            time: this.state.time,
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
            case "pearl":
                details.pearl = value;
                this.props.handleUpdateQuestion(details,this.state.id);
                return;
            case "time":
                details.time = value;
                this.props.handleUpdateQuestion(details,this.state.id);
                return;
            case "reference":
                details.reference = value;
                this.props.handleUpdateQuestion(details,this.state.id);
                return;
            default:
                this.props.handleUpdateQuestion(details,this.state.id);
                return;
        }
    }

    handleFile(e){
        const reader = new FileReader();
        const file = e.target.files[0];
        reader.onload = (upload) => {
            this.setState({
                attachment: upload.target.result,
                filename: file.name,
                filetype: file.type,
            });
        };
        reader.readAsDataURL(file);
    }

    handleStemChange(e){
        const value = e.target.value;
        this.setState({ stem: value });
        this.update(value, "stem");
    }
    handleQuestionChange(e){
        const value = e.target.value;
        this.setState({ question: value });
        this.update(value, "question");
    }
    handleTypeChange(e){
        const value = e.target.value;
        this.setState({ type: value });
        this.update(value, "type");
    }
    handleOpenEndedChange(e){
        const value = e.target.value;
        this.setState({ openEnded: value });
        this.update(value, "openEnded");
    }
    handleMCQ1Change(e){
        const value = e.target.value;
        this.setState({ mcq1: value });
        this.update(value, "mcq1");
    }
    handleMCQ2Change(e){
        const value = e.target.value;
        this.setState({ mcq2: value });
        this.update(value, "mcq2");
    }
    handleMCQ3Change(e){
        const value = e.target.value;
        this.setState({ mcq3: value });
        this.update(value, "mcq3");
    }
    handleMCQ4Change(e){
        const value = e.target.value;
        this.setState({ mcq4: value });
        this.update(value, "mcq4");
    }
    handleMCQ5Change(e){
        const value = e.target.value;
        this.setState({ mcq5: value });
        this.update(value, "mcq5");
    }
    handleMCQ6Change(e){
        const value = e.target.value;
        this.setState({ mcq6: value });
        this.update(value, "mcq6");
    }
    handleCheck1Change(e){
        const value = e.target.checked;
        this.setState({ check1: value });
        this.update(value, "check1");
    }
    handleCheck2Change(e){
        const value = e.target.checked;
        this.setState({ check2: value });
        this.update(value, "check2");
    }
    handleCheck3Change(e){
        const value = e.target.checked;
        this.setState({ check3: value });
        this.update(value, "check3");
    }
    handleCheck4Change(e){
        const value = e.target.checked;
        this.setState({ check4: value });
        this.update(value, "check4");
    }
    handleCheck5Change(e){
        const value = e.target.checked;
        this.setState({ check5: value });
        this.update(value, "check5");
    }
    handleCheck6Change(e){
        const value = e.target.checked;
        this.setState({ check6: value });
        this.update(value, "check6");
    }
    handlePearlChange(e){
        const value = e.target.value;
        this.setState({ pearl: value });
        this.update(value, "pearl");
    }
    handleTimeChange(e){
        const value = e.target.value;
        this.setState({ time: value });
        this.update(value, "time");
    }
    handleReferenceChange(e){
        const value = e.target.value;
        this.setState({ reference: value });
        this.update(value, "reference");
    }

    answer(){
        if(this.state.type==="MCQ"){
            return(
                <div>
                    <FormGroup>
                        <ControlLabel>Answer 1<span style={{color:"red"}}>*</span></ControlLabel>
                        <InputGroup>
                            <InputGroup.Addon>
                                <input type="checkbox" aria-label="..." checked={this.state.check1} name="check1" onChange={(e)=>this.handleCheck1Change(e)}/>
                            </InputGroup.Addon>
                            <FormControl type="text" placeholder="Enter an answer" value={this.state.mcq1} name="mcq1" onChange={(e)=>this.handleMCQ1Change(e)}/>
                        </InputGroup>
                    </FormGroup>

                    <FormGroup>
                        <ControlLabel>Answer 2<span style={{color:"red"}}>*</span></ControlLabel>
                        <InputGroup>
                            <InputGroup.Addon>
                                <input type="checkbox" aria-label="..." checked={this.state.check2} name="check2" onChange={(e)=>this.handleCheck2Change(e)}/>
                            </InputGroup.Addon>
                            <FormControl type="text" placeholder="Enter an answer" value={this.state.mcq2} name="mcq2" onChange={(e)=>this.handleMCQ2Change(e)}/>
                        </InputGroup>
                    </FormGroup>

                    <FormGroup>
                        <ControlLabel>Answer 3</ControlLabel>
                        <InputGroup>
                            <InputGroup.Addon>
                                <input type="checkbox" aria-label="..." checked={this.state.check3} name="check3" onChange={(e)=>this.handleCheck3Change(e)}/>
                            </InputGroup.Addon>
                            <FormControl type="text" placeholder="Optional" value={this.state.mcq3} name="mcq3" onChange={(e)=>this.handleMCQ3Change(e)}/>
                        </InputGroup>
                    </FormGroup>

                    <FormGroup>
                        <ControlLabel>Answer 4</ControlLabel>
                        <InputGroup>
                            <InputGroup.Addon>
                                <input type="checkbox" aria-label="..." checked={this.state.check4} name="check4" onChange={(e)=>this.handleCheck4Change(e)}/>
                            </InputGroup.Addon>
                            <FormControl type="text" placeholder="Optional" value={this.state.mcq4} name="mcq4" onChange={(e)=>this.handleMCQ4Change(e)}/>
                        </InputGroup>
                    </FormGroup>

                    <FormGroup>
                        <ControlLabel>Answer 5</ControlLabel>
                        <InputGroup>
                            <InputGroup.Addon>
                                <input type="checkbox" aria-label="..." checked={this.state.check5} name="check5" onChange={(e)=>this.handleCheck5Change(e)}/>
                            </InputGroup.Addon>
                            <FormControl type="text" placeholder="Optional" value={this.state.mcq5} name="mcq5" onChange={(e)=>this.handleMCQ5Change(e)}/>
                        </InputGroup>
                    </FormGroup>

                    <FormGroup>
                        <ControlLabel>Answer 6</ControlLabel>
                        <InputGroup>
                            <InputGroup.Addon>
                                <input type="checkbox" aria-label="..." checked={this.state.check6} name="check6" onChange={(e)=>this.handleCheck6Change(e)}/>
                            </InputGroup.Addon>
                            <FormControl type="text" placeholder="Optional" value={this.state.mcq6} name="mcq6" onChange={(e)=>this.handleMCQ6Change(e)}/>
                        </InputGroup>
                    </FormGroup>
                </div>
            );
        } else if(this.state.type==="Open-ended"){
            return(
                <FormGroup controlId="formControlsOpenEnded">
                    <ControlLabel>Answer<span style={{color:"red"}}>*</span></ControlLabel>
                    <FormControl componentClass="textarea" style={{height:400}} placeholder="Enter an answer" value={this.state.openEnded} name="openEnded" onChange={(e)=>this.handleOpenEndedChange(e)}/>
                </FormGroup>
            );
        }
        return;
    }

    checkQ1(){
        if (this.props.id===1){
            return;
        }
        return (
            <FormGroup controlId="formControlsSTEM">
                <ControlLabel style={{ fontSize: "150%" }}>STEM</ControlLabel>
                <FormControl componentClass="textarea" style={{height:'600px'}} placeholder="Enter a continuation of the scenario" value={this.state.stem} name="stem" onChange={(e)=>this.handleStemChange(e)} />
            </FormGroup>
        );
    }

    render(){
        return(
            <div id="question">
                <Accordion>
                    <Panel header={"▽ Question #"+this.props.id} eventKey="1">
                        <div className="delete-question-button">
                        <Button  type="button" bsStyle="primary" onClick={(e)=>this.deleteQuestion()}>Delete Question</Button><br/>
                        </div>
                        {this.checkQ1()}

                        <FormGroup controlId="formControlsQuestion">
                            <ControlLabel style={{ fontSize: "150%" }}>Question {this.props.id}<span style={{color:"red"}}>*</span></ControlLabel>
                            <FormControl componentClass="textarea" placeholder="Enter a question" value={this.state.question} name="question" onChange={(e)=>this.handleQuestionChange(e)} />
                        </FormGroup>

                        <FormGroup controlId="formControlsAttachment">
                            <ControlLabel style={{ fontSize: "150%" }}>Add Attachment</ControlLabel>
                            <FormControl type="file" onChange={(e)=>this.handleFile(e)} />
                        </FormGroup>

                        <FormGroup controlId="formControlsType">
                            <ControlLabel style={{ fontSize: "150%" }}>Question Type<span style={{color:"red"}}>*</span></ControlLabel>
                            <FormControl componentClass="select" value={this.state.type} name="type" onChange={(e)=>this.handleTypeChange(e)}>
                                <option value="Select One">Select One</option>
                                <option value="MCQ">MCQ</option>
                                <option value="Open-ended">Open-ended</option>
                            </FormControl>
                        </FormGroup>

                        {this.answer()}

                        <FormGroup controlId="formControlsPEARL">
                            <ControlLabel style={{ fontSize: "150%" }}>PEARL<span style={{color:"red"}}>*</span></ControlLabel>
                            <FormControl componentClass="textarea" placeholder="Enter an explanation for the answer(s)" value={this.state.pearl} name="pearl" onChange={(e)=>this.handlePearlChange(e)} />
                        </FormGroup>

                        <FormGroup controlId="formControlsTime">
                            <ControlLabel style={{ fontSize: "150%" }}>Time Limit<span style={{color:"red"}}>*</span></ControlLabel>
                            <InputGroup>
                                <FormControl componentClass="select" value={this.state.time} name="time" onChange={(e)=>this.handleTimeChange(e)}>
                                    <option value="Select One">Select One</option>
                                    <option value="0.5">0.5</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="5">5</option>
                                    <option value="8">8</option>
                                    <option value="10">10</option>
                                    <option value="12">12</option>
                                </FormControl>
                                <InputGroup.Addon>Minute(s)</InputGroup.Addon>
                            </InputGroup>
                        </FormGroup>

                        <FormGroup controlId="formControlsReferences">
                            <ControlLabel style={{ fontSize: "150%" }}>References</ControlLabel>
                            <FormControl componentClass="textarea" placeholder="Enter your references" value={this.state.reference} name="reference" onChange={(e)=>this.handleReferenceChange(e)} />
                        </FormGroup>
                    </Panel>
                </Accordion>
            </div>
        );
    }
}

export default Question;