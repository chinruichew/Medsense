import React, { Component } from 'react';
import { bindAll } from 'lodash';

class Overview extends React.Component{
    constructor(props){
        super(props);
        this.state={
            title:'',
            difficulty:"Select One",
            speciality:"Select One",
            subspeciality:"Select One",
            approach:null,
            scenario:'',
            learning: '',
            valid:false,
        };
        bindAll(this, 'handleTitleChange', 'handleDifficultyChange', 'handleSpecialityChange', 'handleSubspecialityChange',
            'handleApproachChange', 'handleScenarioChange', 'handleLearningChange', 'saveChanges', 'subspeciality');
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
    handleLearningChange(e){
        this.setState({ learning: e.target.value });
    }

    saveChanges(e) {
        e.preventDefault();
        if (this.state.title===''){
            window.alert("Please fill in the Case Title!");
        } else if (this.state.difficulty==="Select One"){
            window.alert("Please select a Difficulty Level!");
        } else if (this.state.speciality==="Select One"){
            window.alert("Please select a Speciality!");
        } else if (this.state.subspeciality==="Select One"){
            window.alert("Please select a Sub-specialiy!");
        } else if (this.state.approach===null){
            window.alert("Please select at least 1 Approach!");
        } else if (this.state.scenario===''){
            window.alert("Please fill in the Case Scenario!");
        } else {
            this.setState({ valid: true });
            window.alert("Success!");
        }

        console.log(this.state);
    }

    subspeciality(){

        if (this.state.speciality==="Medicine"){
            return(
                <select value={this.state.subspeciality} name="subspeciality" onChange={(e)=>this.handleSubspecialityChange(e)}>
                    <option value="Select One">Select One</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Endocrinology">Endocrinology</option>
                    <option value="Gastroenterology & Hepatology">Gastroenterology & Hepatology</option>
                    <option value="Haematology">Haematology</option>
                    <option value="Internal Medicine">Internal Medicine</option>
                    <option value="Medical Oncology">Medical Oncology</option>
                    <option value="Neurology">Neurology</option>
                    <option value="Renal Medicine">Renal Medicine</option>
                    <option value="Respiratory & Critical Care Medicine">Respiratory & Critical Care Medicine</option>
                    <option value="Rheumatology & Immunology">Rheumatology & Immunology</option>

                </select>
            );
        } else if (this.state.speciality==="Others"){
            return(
                <select value={this.state.subspeciality} name="subspeciality" onChange={(e)=>this.handleSubspecialityChange(e)}>
                    <option value="Select One">Select One</option>
                    <option value="Anaesthesiology">Anaesthesiology</option>
                    <option value="Ear Nose & Throat">Ear Nose & Throat</option>
                    <option value="Emergency Medicine">Emergency Medicine</option>
                    <option value="Geriatric Medicine">Geriatric Medicine</option>
                    <option value="Infectious Diseases">Infectious Diseases</option>
                    <option value="Neonatal">Neonatal</option>
                    <option value="Obstetrics & Gynaecology">Obstetrics & Gynaecology</option>
                    <option value="Ophthalmology">Ophthalmology</option>
                    <option value="Palliative Medicine">Palliative Medicine</option>
                    <option value="Psychiatry">Psychiatry</option>
                    <option value="Rehabilitation Medicine">Rehabilitation Medicine</option>
                </select>
            );
        } else if (this.state.speciality==="Surgery"){
            return(
                <select value={this.state.subspeciality} name="subspeciality" onChange={(e)=>this.handleSubspecialityChange(e)}>
                    <option value="Select One">Select One</option>
                    <option value="Breast">Breast</option>
                    <option value="Colorectal">Colorectal</option>
                    <option value="General Surgery">General Surgery</option>
                    <option value="Head & Neck">Head & Neck</option>
                    <option value="Hepato-pancreato-biliary">Hepato-pancreato-biliary</option>
                    <option value="Surgical Oncology">Surgical Oncology</option>
                    <option value="Upper Gastrointestinal & Bariatric Surgery">Upper Gastrointestinal & Bariatric Surgery</option>
                    <option value="Urology">Urology</option>
                    <option value="Vascular Surgery">Vascular Surgery</option>
                </select>
            );
        }
        return;
    }

    render(){
        return(
            <div>
                <table>
                        <tr>
                            <th>Case Title</th>
                            <th>Difficulty Level</th>
                        </tr>
                        <tr>
                            <td><input type="text" placeholder="Enter a title" value={this.state.title} name="title" onChange={(e)=>this.handleTitleChange(e)}/></td>
                            <td>
                                <select value={this.state.difficulty} name="difficulty" onChange={(e)=>this.handleDifficultyChange(e)}>
                                    <option value="Select One">Select One</option>
                                    <option value="Beginner">Beginner</option>
                                    <option value="Advanced">Advanced</option>
                                </select>
                            </td>
                        </tr>

                        <tr>
                            <th>Speciality</th>
                            <th>Sub-speciality</th>
                        </tr>
                        <tr>
                            <td>
                                <select value={this.state.speciality} name="speciality" onChange={(e)=>this.handleSpecialityChange(e)}>
                                    <option value="Select One">Select One</option>
                                    <option value="Medicine">Medicine</option>
                                    <option value="Surgery">Surgery</option>
                                    <option value="Others">Others</option>
                                </select>
                            </td>
                            <td>
                                {this.subspeciality()}
                            </td>
                        </tr>

                        <tr>
                            <th colspan="2">Approach(es)</th>
                        </tr>
                        <tr>
                            <td colspan="2">Hold down the Ctrl (Windows) / Command (Mac) button to select multiple options.</td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <select value={this.state.approach} name="approach" onChange={(e)=>this.handleApproachChange(e)} multiple>
                                    <option value="Select All Relevant">Select All Relevant</option>
                                    <option value="Abdominal Pain">Abdominal Pain</option>
                                    <option value="Breathlessness">Breathlessness</option>
                                    <option value="Chest Pain">Chest Pain</option>
                                    <option value="Confusion">Confusion</option>
                                    <option value="Cough">Cough</option>
                                    <option value="Diarrhea">Diarrhea</option>
                                    <option value="Dizziness">Dizziness</option>
                                    <option value="Falls">Falls</option>
                                    <option value="Fever">Fever</option>
                                    <option value="Gastrointestinal bleed">Gastrointestinal bleed</option>
                                    <option value="Headache">Headache</option>
                                    <option value="Jaundice">Jaundice</option>
                                    <option value="Limb pain">Limb pain</option>
                                    <option value="Limb swelling ">Limb swelling</option>
                                    <option value="Palpitations">Palpitations</option>
                                    <option value="Seizure">Seizure</option>
                                    <option value="Syncope">Syncope</option>
                                    <option value="Vomiting">Vomiting</option>
                                    <option value="Weakness">Weakness</option>
                                </select>
                            </td>
                        </tr>

                        <tr>
                            <th colspan="2">Case Scenario</th>
                        </tr>
                        <tr>
                            <td colspan="2"><input type="text" placeholder="Enter a brief description of the patient" value={this.state.scenario} name="scenario" onChange={(e)=>this.handleScenarioChange(e)}/></td>
                        </tr>

                        <tr>
                            <th colspan="2">Key Learning Points</th>
                        </tr>
                        <tr>
                            <td colspan="2"><input type="text" placeholder="Enter the key learning points of this case" value={this.state.learning} name="learning" onChange={(e)=>this.handleLearningChange(e)}/></td>
                        </tr>
                </table>
            </div>
        );
    }
}

export default Overview;