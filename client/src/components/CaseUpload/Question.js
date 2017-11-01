import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
//import { Collapse } from 'react-bootstrap';
import { bindAll } from 'lodash';

class Question extends React.Component{
    constructor(props){
        super(props);
        this.state={
            stem:'',
            question:'',
            attachment:null,
            filename:null,
            filetype:null,
            type:"Select One",
            openEnded:'',
            mcq1:'',
            mcq2:'',
            mcq3:'',
            mcq4:'',
            mcq5:'',
            mcq6:'',
            check1:false,
            check2:false,
            check3:false,
            check4:false,
            check5:false,
            check6:false,
            pearl:'',
            time:"Select One",
            reference:'',
            valid:false,
        };
        bindAll(this, 'handleFile', 'handleStemChange', 'handleQuestionChange', 'handleTypeChange', 'handleOpenEndedChange',
            'handleMCQ1Change', 'handleMCQ2Change', 'handleMCQ3Change', 'handleMCQ4Change', 'handleMCQ5Change', 'handleMCQ6Change',
            'handleCheck1Change', 'handleCheck2Change', 'handleCheck3Change', 'handleCheck4Change', 'handleCheck5Change',
            'handleCheck6Change', 'handlePearlChange', 'handleTimeChange', 'handleReferenceChange', 'saveChanges','answer',
            'nextQuestion', 'question');
    }

    handleFile(e){
        const reader = new FileReader();
        const file = e.target.files[0];
        reader.onload = (upload) => {
            this.setState({
                attachment: upload.target.result,
                filename: file.name,
                filetype: file.type
            });
        };
        reader.readAsDataURL(file);
    }

    handleStemChange(e){
        this.setState({ stem: e.target.value });
    }
    handleQuestionChange(e){
        this.setState({ question: e.target.value });
    }
    handleTypeChange(e){
        this.setState({ type: e.target.value });
    }
    handleOpenEndedChange(e){
        this.setState({ openEnded: e.target.value });
    }
    handleMCQ1Change(e){
        this.setState({ mcq1: e.target.value });
    }
    handleMCQ2Change(e){
        this.setState({ mcq2: e.target.value });
    }
    handleMCQ3Change(e){
        this.setState({ mcq3: e.target.value });
    }
    handleMCQ4Change(e){
        this.setState({ mcq4: e.target.value });
    }
    handleMCQ5Change(e){
        this.setState({ mcq5: e.target.value });
    }
    handleMCQ6Change(e){
        this.setState({ mcq6: e.target.value });
    }
    handleCheck1Change(e){
        this.setState({ check1: e.target.checked });
    }
    handleCheck2Change(e){
        this.setState({ check2: e.target.checked });
    }
    handleCheck3Change(e){
        this.setState({ check3: e.target.checked });
    }
    handleCheck4Change(e){
        this.setState({ check4: e.target.checked });
    }
    handleCheck5Change(e){
        this.setState({ check5: e.target.checked });
    }
    handleCheck6Change(e){
        this.setState({ check6: e.target.checked });
    }
    handlePearlChange(e){
        this.setState({ pearl: e.target.value });
    }
    handleTimeChange(e){
        this.setState({ time: e.target.value });
    }
    handleReferenceChange(e){
        this.setState({ reference: e.target.value });
    }

    saveChanges(e){
        e.preventDefault();
        if (this.state.type==="Select One"|| this.state.question==='' || this.state.time==="Select One"){
            window.alert("Please fill in all required information!");
        } else if (this.state.type==="MCQ"){
            if (this.state.mcq1==='' || this.state.mcq2===''){
                window.alert("Please fill in the first 2 MCQ answers!");
            } else if (this.state.mcq3==='' && this.state.check3){
                window.alert("Please fill in an answer for third answer option or uncheck that option!");
            } else if (this.state.mcq4==='' && this.state.check4){
                window.alert("Please fill in an answer for fourth answer option or uncheck that option!");
            } else if (this.state.mcq5==='' && this.state.check5){
                window.alert("Please fill in an answer for fifth answer option or uncheck that option!");
            } else if (this.state.mcq6==='' && this.state.check6){
                window.alert("Please fill in an answer for sixth answer option or uncheck that option!");
            } else if (!this.state.check1 && !this.state.check2 && !this.state.check3 && !this.state.check4 && !this.state.check5 && !this.state.check6){
                window.alert("Please check at least 1 correct answer!");
            } else {
                this.setState({ valid: true });
                window.alert("Success!");
            }
        } else if (this.state.type==="Open-ended" && this.state.openEnded===''){
            window.alert("Please fill in the Open-ended answer!");
        } else {
            this.setState({ valid: true });
            window.alert("Success!");
        }

        let {title, difficulty, speciality, subspeciality, approach, scenario, valid} = this.state;
        console.log(this.state);
    }

    answer(){
        if(this.state.type==="MCQ"){
            return(
                <table>
                    <tr align="left">
                        <td>
                            <input type="checkbox" checked={this.state.check1} name="check1" onChange={(e)=>this.handleCheck1Change(e)}/>
                            <input type="text" placeholder="Enter an answer" value={this.state.mcq1} name="mcq1" onChange={(e)=>this.handleMCQ1Change(e)}/>
                            <br/>
                        </td>
                        <td>
                            <input type="checkbox" checked={this.state.check2} name="check2" onChange={(e)=>this.handleCheck2Change(e)}/>
                            <input type="text" placeholder="Enter an answer" value={this.state.mcq2} name="mcq2" onChange={(e)=>this.handleMCQ2Change(e)}/>
                            <br/>
                        </td>
                    </tr>
                    <tr align="left">
                        <td>
                            <input type="checkbox" checked={this.state.check3} name="check3" onChange={(e)=>this.handleCheck3Change(e)}/>
                            <input type="text" placeholder="Optional" value={this.state.mcq3} name="mcq3" onChange={(e)=>this.handleMCQ3Change(e)}/>
                            <br/>
                        </td>
                        <td>
                            <input type="checkbox" checked={this.state.check4} name="check4" onChange={(e)=>this.handleCheck4Change(e)}/>
                            <input type="text" placeholder="Optional" value={this.state.mcq4} name="mcq4" onChange={(e)=>this.handleMCQ4Change(e)}/>
                            <br/>
                        </td>
                    </tr>
                    <tr align="left">
                        <td>
                            <input type="checkbox" checked={this.state.check5} name="check5" onChange={(e)=>this.handleCheck5Change(e)}/>
                            <input type="text" placeholder="Optional" value={this.state.mcq5} name="mcq5" onChange={(e)=>this.handleMCQ5Change(e)}/>
                            <br/>
                        </td>
                        <td>
                            <input type="checkbox" checked={this.state.check6} name="check6" onChange={(e)=>this.handleCheck6Change(e)}/>
                            <input type="text" placeholder="Optional" value={this.state.mcq6} name="mcq6" onChange={(e)=>this.handleMCQ6Change(e)}/>
                        </td>
                    </tr>
                </table>
            );
        } else if(this.state.type==="Open-ended"){
            return(
                <input type="text" placeholder="Enter an answer" value={this.state.openEnded} name="openEnded" onChange={(e)=>this.handleOpenEndedChange(e)}/>
            );
        }
        return;
    }

    nextQuestion(){
        if (!this.state.valid){
            return(
                <Button type="submit" align="center" bsStyle="primary" onClick={(e)=>this.saveChanges(e)}>Add Question</Button>
            );
        }
    }

    question(){
        if (this.state.valid){
            return <Question />;
        }
    }

    render(){
        return(
            <div>
                <form action="/uploadQuestion" method="post">
                    <table>
                        <tr align="left">
                            <th>STEM</th>
                        </tr>
                        <tr align="left">
                            <td><input type="text" placeholder="Enter a continuation of the scenario" value={this.state.stem} name="stem" onChange={(e)=>this.handleStemChange(e)}/></td>
                        </tr>

                        <tr align="left">
                            <th>Question</th>
                        </tr>
                        <tr align="left">
                            <td><input type="text" placeholder="Enter a question" value={this.state.question} name="question" onChange={(e)=>this.handleQuestionChange(e)}/></td>
                        </tr>

                        <tr align="left">
                            <th>Add Attachment</th>
                        </tr>
                        <tr align="left">
                            <td><input type="file" onChange={(e)=>this.handleFile(e)}/></td>
                        </tr>

                        <tr align="left">
                            <th>Question Type</th>
                        </tr>
                        <tr align="left">
                            <td>
                                <select value={this.state.type} name="type" onChange={(e)=>this.handleTypeChange(e)}>
                                    <option value="Select One">Select One</option>
                                    <option value="MCQ">MCQ</option>
                                    <option value="Open-ended">Open-ended</option>
                                </select>
                            </td>
                        </tr>

                        <tr align="left">
                            <th>Answer(s)</th>
                        </tr>
                        <tr align="left">
                            <td>{this.answer()}</td>
                        </tr>

                        <tr align="left">
                            <th>PEARL</th>
                        </tr>
                        <tr align="left">
                            <td><input type="text" placeholder="Enter an explanation for the answer(s)" value={this.state.pearl} name="pearl" onChange={(e)=>this.handlePearlChange(e)}/></td>
                        </tr>

                        <tr align="left">
                            <th>Time Limit</th>
                        </tr>
                        <tr align="left">
                            <td>
                                <select value={this.state.time} name="time" onChange={(e)=>this.handleTimeChange(e)}>
                                    <option value="Select One">Select One</option>
                                    <option value="0.5">0.5</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="5">5</option>
                                    <option value="8">8</option>
                                    <option value="10">10</option>
                                    <option value="12">12</option>
                                </select> Minute(s)
                            </td>
                        </tr>

                        <tr align="left">
                            <th>Reference(s)</th>
                        </tr>
                        <tr align="left">
                            <td><input type="text" placeholder="Enter your references" value={this.state.reference} name="reference" onChange={(e)=>this.handleReferenceChange(e)}/></td>
                        </tr>
                    </table>
                    {this.nextQuestion()}
                </form>
                {this.question()}
            </div>
        );
    }
}

export default Question;