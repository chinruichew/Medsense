import React, { Component } from 'react';
import { bindAll } from 'lodash';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import ReactQuill from 'react-quill';

import '../CaseUpload/Upload.css';
import 'react-quill/dist/quill.snow.css';

class Overview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title,
            difficulty: this.props.difficulty,
            speciality: this.props.speciality,
            subspeciality: this.props.subspeciality,
            approach: this.props.approach,
            scenario: this.props.scenario,
            learning: this.props.learning,
        };
        bindAll(this, 'handleTitleChange', 'handleDifficultyChange', 'handleSpecialityChange', 'handleSubspecialityChange',
            'handleApproachChange', 'handleScenarioChange', 'handleLearningChange', 'setSubspeciality', 'update');
    }

    update(value, key) {
        let details = {
            title: this.state.title,
            difficulty: this.state.difficulty,
            speciality: this.state.speciality,
            subspeciality: this.state.subspeciality,
            approach: this.state.approach,
            scenario: this.state.scenario,
            learning: this.state.learning,
        };

        switch (key) {
            case "title":
                details.title = value;
                this.props.handleUpdateOverview(details);
                return;
            case "difficulty":
                details.difficulty = value;
                this.props.handleUpdateOverview(details);
                return;
            case "speciality":
                details.speciality = value;
                this.props.handleUpdateOverview(details);
                return;
            case "subspeciality":
                details.subspeciality = value;
                this.props.handleUpdateOverview(details);
                return;
            case "approach":
                details.approach = value;
                this.props.handleUpdateOverview(details);
                return;
            case "scenario":
                details.scenario = value;
                this.props.handleUpdateOverview(details);
                return;
            case "learning":
                details.learning = value;
                this.props.handleUpdateOverview(details);
                return;
            default:
                this.props.handleUpdateOverview(details);
                return;
        }
    }

    handleTitleChange(e) {
        const value = e.target.value;
        this.setState({ title: value });
        this.update(value, "title");
    }
    handleDifficultyChange(e) {
        const value = e.target.value;
        this.setState({ difficulty: value });
        this.update(value, "difficulty");
    }
    handleSpecialityChange(e) {
        const value = e.target.value;
        this.setState({ speciality: value });
        this.update(value, "speciality");
    }
    handleSubspecialityChange(e) {
        const options = e.target.options;
        let value = [];
        for (let i = 1, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        if (value.length > 0) {
            this.setState({ subspeciality: value });
            this.update(value, "subspeciality");
        }
    }
    handleApproachChange(e) {
        // const value = e.target.value;
        // this.setState({ approach: value });
        // this.update(value, "approach");
        const options = e.target.options;
        let value = [];
        for (let i = 1, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        if (value.length > 0) {
            this.setState({ approach: value });
            this.update(value, "approach");
        }
    }
    handleScenarioChange(value) {
        this.setState({ scenario: value });
        this.update(value, "scenario");
    }
    handleLearningChange(value) {
        this.setState({ learning: value });
        this.update(value, "learning");
    }

    setSubspeciality() {

        if (this.state.speciality === "Medicine") {
            return (
                <FormGroup controlId="formControlsSubspeciality">
                    <ControlLabel>Sub-speciality<span style={{color:"red"}}>*</span></ControlLabel>
                    <FormControl componentClass="select" value={this.state.subspeciality} name="subspeciality" onChange={(e) => this.handleSubspecialityChange(e)}>
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
                    </FormControl>
                </FormGroup>
            );
        } else if (this.state.speciality === "Others") {
            return (
                <FormGroup controlId="formControlsSepciality">
                    <ControlLabel>Sub-speciality<span style={{color:"red"}}>*</span></ControlLabel>
                    <FormControl componentClass="select" value={this.state.subspeciality} name="subspeciality" onChange={(e) => this.handleSubspecialityChange(e)}>
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
                    </FormControl>
                </FormGroup>
            );
        } else if (this.state.speciality === "Surgery") {
            return (
                <FormGroup controlId="formControlsSepciality">
                    <ControlLabel>Sub-speciality<span style={{color:"red"}}>*</span></ControlLabel>
                    <FormControl componentClass="select" value={this.state.subspeciality} name="subspeciality" onChange={(e) => this.handleSubspecialityChange(e)}>
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
                    </FormControl>
                </FormGroup>
            );
        } else if (this.state.speciality === "Clinical Practicum") {
            return (
                <FormGroup controlId="formControlsSubspeciality">
                    <ControlLabel>Sub-speciality<span style={{color:"red"}}>*</span>
                        <br />
                        <div style={{ fontSize: "70%", fontWeight:"200"}}>Hold down the Ctrl (Windows) / Command (Mac) button to select multiple options.
                        </div>
                    </ControlLabel>
                    <FormControl componentClass="select" value={this.state.subspeciality} name="subspeciality" onChange={(e) => this.handleSubspecialityChange(e)} multiple>
                        <option value="Select One">Select All Relevant</option>
                        <option value="Anaesthesiology">Anaesthesiology</option>
                        <option value="Breast">Breast</option>
                        <option value="Cardiology">Cardiology</option>
                        <option value="Colorectal">Colorectal</option>
                        <option value="Ear Nose & Throat">Ear Nose & Throat</option>
                        <option value="Emergency Medicine">Emergency Medicine</option>
                        <option value="Endocrinology">Endocrinology</option>
                        <option value="Gastroenterology & Hepatology">Gastroenterology & Hepatology</option>
                        <option value="General Surgery">General Surgery</option>
                        <option value="Geriatric Medicine">Geriatric Medicine</option>
                        <option value="Haematology">Haematology</option>
                        <option value="Head & Neck">Head & Neck</option>
                        <option value="Hepato-pancreato-biliary">Hepato-pancreato-biliary</option>
                        <option value="Infectious Diseases">Infectious Diseases</option>
                        <option value="Internal Medicine">Internal Medicine</option>
                        <option value="Medical Oncology">Medical Oncology</option>
                        <option value="Neonatal">Neonatal</option>
                        <option value="Neurology">Neurology</option>
                        <option value="Obstetrics & Gynaecology">Obstetrics & Gynaecology</option>
                        <option value="Ophthalmology">Ophthalmology</option>
                        <option value="Palliative Medicine">Palliative Medicine</option>
                        <option value="Psychiatry">Psychiatry</option>
                        <option value="Rehabilitation Medicine">Rehabilitation Medicine</option>
                        <option value="Renal Medicine">Renal Medicine</option>
                        <option value="Respiratory & Critical Care Medicine">Respiratory & Critical Care Medicine</option>
                        <option value="Rheumatology & Immunology">Rheumatology & Immunology</option>
                        <option value="Surgical Oncology">Surgical Oncology</option>
                        <option value="Upper Gastrointestinal & Bariatric Surgery">Upper Gastrointestinal & Bariatric Surgery</option>
                        <option value="Urology">Urology</option>
                        <option value="Vascular Surgery">Vascular Surgery</option>
                    </FormControl>
                </FormGroup>
            );
        } else if (this.state.speciality === "Orthopedics") {
            return (
                <FormGroup controlId="formControlsSepciality">
                    <ControlLabel>Sub-speciality<span style={{color:"red"}}>*</span></ControlLabel>
                    <FormControl componentClass="select" value={this.state.subspeciality} name="subspeciality" onChange={(e) => this.handleSubspecialityChange(e)}>
                        <option value="Select One">Select One</option>
                        <option value="Foot and Ankle Surgery">Foot and Ankle Surgery</option>
                        <option value="Hip and Knee Surgery">Hip and Knee Surgery</option>
                        <option value="Musculoskeletal Oncology">Musculoskeletal Oncology</option>
                        <option value="Musculoskeletal Trauma">Musculoskeletal Trauma</option>
                        <option value="Paediatric Orthopaedics">Paediatric Orthopaedics</option>
                        <option value="Shoulder & Elbow Surgery">Shoulder & Elbow Surgery</option>
                        <option value="Spine Surgery">Spine Surgery</option>
                        <option value="Sports medicine">Sports medicine</option>
                        <option value="Department of Hand & Reconstructive Microsurgery Trauma">Department of Hand & Reconstructive Microsurgery Trauma</option>
                    </FormControl>
                </FormGroup>
            );
        }

        return;
    }


    render() {
        return (
            <div id="overview-box">
                <FormGroup controlId="formControlsTitle">
                    <ControlLabel style={{ fontSize: "150%" }}>Case Title<span style={{color:"red"}}>*</span></ControlLabel>
                    <FormControl type="text" placeholder="Enter a title" value={this.state.title} name="title" onChange={(e) => this.handleTitleChange(e)} />
                </FormGroup>

                <FormGroup controlId="formControlsDifficulty">
                    <ControlLabel style={{ fontSize: "150%" }}>Difficulty Level<span style={{color:"red"}}>*</span></ControlLabel>
                    <FormControl componentClass="select" value={this.state.difficulty} name="difficulty" onChange={(e) => this.handleDifficultyChange(e)}>
                        <option value="Select One">Select One</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Advanced">Advanced</option>
                    </FormControl>
                </FormGroup>

                <FormGroup controlId="formControlsSepciality" style={{paddingBottom:"0"}}>
                    <ControlLabel style={{ fontSize: "150%"}}>Speciality<span style={{color:"red"}}>*</span></ControlLabel>
                    <FormControl componentClass="select" value={this.state.speciality} name="speciality" onChange={(e) => this.handleSpecialityChange(e)}>
                        <option value="Select One">Select One</option>
                        <option value="Clinical Practicum">Clinical Practicum</option>
                        <option value="Medicine">Medicine</option>
                        <option value="Surgery">Surgery</option>
                        <option value="Orthopedics">Orthopedics</option>
                        <option value="Others">Others</option>
                    </FormControl>
                </FormGroup>

                {this.setSubspeciality()}

                <FormGroup controlId="formControlsApproach">
                    <ControlLabel style={{ fontSize: "150%" }}>Approach(es)<span style={{color:"red"}}>*</span>
                    {/*<ControlLabel style={{ fontSize: "150%" }}>Approach<span style={{color:"red"}}>*</span>*/}
                        <br />
                        <div style={{ fontSize: "70%", fontWeight:"200"}}>Hold down the Ctrl (Windows) / Command (Mac) button to select multiple options.
                        </div>
                    </ControlLabel>
                    <FormControl componentClass="select" value={this.state.approach} name="approach" onChange={(e) => this.handleApproachChange(e)} multiple>
                    {/*<FormControl componentClass="select" value={this.state.approach} name="approach" onChange={(e) => this.handleApproachChange(e)}>*/}
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
                        <option value="Limb swelling">Limb swelling</option>
                        <option value="Palpitations">Palpitations</option>
                        <option value="Seizure">Seizure</option>
                        <option value="Syncope">Syncope</option>
                        <option value="Vomiting">Vomiting</option>
                        <option value="Weakness">Weakness</option>
                    </FormControl>
                </FormGroup>

                <FormGroup controlId="formControlsScenario" style={{height:'200px'}}>
                    <ControlLabel style={{ fontSize: "150%" }}>Case Scenario<span style={{color:"red"}}>*</span></ControlLabel>
                    <ReactQuill value={this.state.scenario}
                                onChange={this.handleScenarioChange}
                                placeholder="Enter a brief description of the patient"
                                style={{height:'100px'}}/>
                    {/*<FormControl componentClass="textarea" rows={3} placeholder="Enter a brief description of the patient" value={this.state.scenario} name="scenario" onChange={(e) => this.handleScenarioChange(e)} />*/}
                </FormGroup>

                <FormGroup controlId="formControlsLearning" style={{height:'200px'}}>
                    <ControlLabel style={{ fontSize: "150%" }}>Key Learning Points<span style={{color:"red"}}>*</span></ControlLabel>
                    {/*<FormControl componentClass="textarea" rows={3} placeholder="Enter the key learning points of this case" value={this.state.learning} name="learning" onChange={(e) => this.handleLearningChange(e)} />*/}
                    <ReactQuill value={this.state.learning}
                                onChange={this.handleLearningChange}
                                placeholder="Enter the key learning points of this case"
                                style={{height:'100px'}}/>
                </FormGroup>

            </div>
        );
    }
}

export default Overview;