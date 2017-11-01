import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
//import { Collapse } from 'react-bootstrap';
import { bindAll } from 'lodash';
import Question from './Question.js'

class Main extends React.Component{
    constructor(props){
        super(props);
        this.state={
            title:'',
            difficulty:"Select One",
            speciality:"Select One",
            subspeciality:"Select One",
            approach:null,
            scenario:'',
            valid:false,
        };
        bindAll(this, 'handleTitleChange', 'handleDifficultyChange', 'handleSpecialityChange', 'handleSubspecialityChange',
            'handleApproachChange', 'handleScenarioChange', 'saveChanges', 'question', 'addQuestion', 'subspeciality');
    }

    handleTitleChange(e){
        this.setState({ title: e.target.value });
    }
    handleDifficultyChange(e){
        this.setState({ difficulty: e.target.value });
    }
    handleSpecialityChange(e){
        this.setState({ speciality: e.target.value });

    }
    handleSubspecialityChange(e){
        this.setState({ subspeciality: e.target.value });
    }
    handleApproachChange(e){
        let options = e.target.options;
        let value = [];
        for (let i = 1, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        if (value.length>0){
            this.setState({ approach: value });
        }

    }
    handleScenarioChange(e){
        this.setState({ scenario: e.target.value });
    }

    saveChanges(e) {
        e.preventDefault();
        if (this.state.title==='' || this.state.difficulty==="Select One" || this.state.speciality==="Select One" || this.state.subspeciality==="Select One" || this.state.approach===null || this.state.scenario===''){
            window.alert("Please fill in all required information!");
        } else {
            this.setState({ valid: true });
            window.alert("Success!");
        }

        let {title, difficulty, speciality, subspeciality, approach, scenario, valid} = this.state;
        console.log(this.state);
    }

    question(){
        if (this.state.valid){
            return <Question />;
        }
    }

    addQuestion(){
        if (!this.state.valid){
            return (
                <Button type="submit" align="center" bsStyle="primary" onClick={(e)=>this.saveChanges(e)}>Next</Button>
            );
        }
    }

    //this function is hardcoded, should take from DB
    //approach too
    subspeciality(){

        if (this.state.speciality==="Medicine"){
            return(
                <select value={this.state.subspeciality} name="subspeciality" onChange={(e)=>this.handleSubspecialityChange(e)}>
                    <option value="Select One">Select One</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Endocrinology">Endocrinology</option>
                    <option value="Gastroenterology">Gastroenterology</option>
                    <option value="Neurology">Neurology</option>
                    <option value="Oncology">Oncology</option>
                    <option value="Renal">Renal</option>
                    <option value="Respiratory">Respiratory</option>
                    <option value="Rheumatology">Rheumatology</option>
                </select>
            );
        } else if (this.state.speciality==="Orthopaedics"){
            return(
                <select value={this.state.subspeciality} name="subspeciality" onChange={(e)=>this.handleSubspecialityChange(e)}>
                    <option value="Select One">Select One</option>
                    <option value="Hand">Hand</option>
                    <option value="Spine">Spine</option>
                    <option value="Oncology">Oncology</option>
                </select>
            );
        } else if (this.state.speciality==="Surgery"){
            return(
                <select value={this.state.subspeciality} name="subspeciality" onChange={(e)=>this.handleSubspecialityChange(e)}>
                    <option value="Select One">Select One</option>
                    <option value="Breast">Breast</option>
                    <option value="Colorectal">Colorectal</option>
                    <option value="Urology">Urology</option>
                    <option value="Vascular">Vascular</option>
                </select>
            );
        }
        return;
    }

    render(){
        return(
            <div>
                <form action="/uploadMain" method="post">
                    <table>
                        <tr align="left">
                            <th>Case Title</th>
                            <th>Difficulty Level</th>
                        </tr>
                        <tr align="left">
                            <td><input type="text" placeholder="Enter a title" value={this.state.title} name="title" onChange={(e)=>this.handleTitleChange(e)}/></td>
                            <td>
                                <select value={this.state.difficulty} name="difficulty" onChange={(e)=>this.handleDifficultyChange(e)}>
                                    <option value="Select One">Select One</option>
                                    <option value="Beginner">Beginner</option>
                                    <option value="Advanced">Advanced</option>
                                </select>
                            </td>
                        </tr>

                        <tr align="left">
                            <th>Speciality</th>
                            <th>Sub-speciality</th>
                        </tr>
                        <tr align="left">
                            <td>
                                <select value={this.state.speciality} name="speciality" onChange={(e)=>this.handleSpecialityChange(e)}>
                                    <option value="Select One">Select One</option>
                                    <option value="Medicine">Medicine</option>
                                    <option value="Orthopaedics">Orthopaedics</option>
                                    <option value="Surgery">Surgery</option>
                                </select>
                            </td>
                            <td>
                                {this.subspeciality()}
                            </td>
                        </tr>

                        <tr align="left">
                            <th>Approach(es)</th>
                        </tr>
                        <tr align="left">
                            <td>Hold down the Ctrl (Windows) / Command (Mac) button to select multiple options.</td>
                        </tr>
                        <tr align="left">
                            <td>
                                <select value={this.state.approach} name="approach" onChange={(e)=>this.handleApproachChange(e)} multiple>
                                    <option value="Select All Relevant">Select All Relevant</option>
                                    <option value="Abdominal Pain">Abdominal Pain</option>
                                    <option value="Breathlessness">Breathlessness</option>
                                    <option value="Chest Pain">Chest Pain</option>
                                    <option value="Cough">Cough</option>
                                    <option value="Diarrhea">Diarrhea</option>
                                </select>
                            </td>
                        </tr>

                        <tr align="left">
                            <th>Case Scenario</th>
                        </tr>
                        <tr align="left">
                            <td><input type="text" placeholder="Enter a brief description of the patient" value={this.state.scenario} name="scenario" onChange={(e)=>this.handleScenarioChange(e)}/></td>
                        </tr>
                    </table>
                    {this.addQuestion()}
                </form>

                {this.question()}
            </div>
        );
    }
}

export default Main;