import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import axios from 'axios';
import './Upload.css';
import 'react-quill/dist/quill.snow.css';

const toolbarOptions = [
    [{ 'header': [1, 2, 3, false] }],
    ['bold', 'italic', 'underline'],        // toggled buttons
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'indent': '-1'}, { 'indent': '+1' }],
    ['clean']                                         // remove formatting button
];

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
            specialityList: [],
            approachList: [],
            subspecialityList: []
        };
    }

    componentDidMount(){
        axios.post('/api/fetchApproach', {
        }).then(res => {
            this.setState({approachList:res.data});
        });
        axios.post('/api/fetchSpeciality', {
        }).then(res => {
            this.setState({specialityList:res.data});
        });
    }

    update = (value, key) =>{
        let details = {
            ...this.state
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
    };

    handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]:value});
        this.update(value, name);
    };

    handleSpecialityChange = (e) => {
        const value = e.target.value;
        this.setState({ speciality: value });
        this.update(value, "speciality");
        if (value==="Select One") {
            this.setState({subspecialityList: []});
        } else {
            axios.post('/api/fetchSubspeciality', {
                speciality: value,
            }).then(res => {
                // console.log(res.data[0].subspecialities);
                this.setState({subspecialityList: res.data[0].subspecialities});
            });
        }
    };

    handleSelectChange = (e) => {
        const options = e.target.options;
        const name = e.target.name;
        let value = [];
        for (let i = 1, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        if (value.length > 0) {
            this.setState({ [name]: value });
            this.update(value, name);
        }
    };

    handleScenarioChange = (value) => {
        this.setState({ scenario: value });
        this.update(value, "scenario");
    };

    handleLearningChange = (value) => {
        this.setState({ learning: value });
        //console.log(this.state.learning);
        this.update(value, "learning");
    };

    renderSubspeciality = ()=>{
        let subspecialities = this.state.subspecialityList.map((obj, index) => {
            return <option value={obj.subspeciality}>{obj.subspeciality}</option>;
        });
        if (this.state.speciality==="Clinical Practicum") {
            return <FormGroup controlId="formControlsSubspeciality">
                <ControlLabel style={{fontSize: "150%"}}>Sub-specialty<span style={{color: "red"}}>*</span>
                    <br/>
                    <div style={{ fontSize: "70%", fontWeight:"200"}}>Hold down the Ctrl (Windows) / Command (Mac) button to select multiple options.
                    </div>
                </ControlLabel>
                <FormControl componentClass="select" value={this.state.subspeciality} name="subspeciality"
                             onChange={(e) => this.handleSelectChange(e)} multiple>
                    <option value="Select One">Select One</option>
                    {subspecialities}
                </FormControl>
            </FormGroup>;
        } else {
            return <FormGroup controlId="formControlsSubspeciality">
                <ControlLabel style={{fontSize: "150%"}}>Sub-specialty<span style={{color: "red"}}>*</span>
                    <br/>
                </ControlLabel>
                <FormControl componentClass="select" value={this.state.subspeciality} name="subspeciality"
                             onChange={(e) => this.handleSelectChange(e)}>
                    <option value="Select One">Select One</option>
                    {subspecialities}
                </FormControl>
            </FormGroup>;
        }
    };

    render() {
        let approaches = this.state.approachList.map((obj, index) => {
            return <option key={index} value={obj.approach}>{obj.approach}</option>;
        });
        let specialities = this.state.specialityList.map((obj, index) => {
            return <option key={index} value={obj.speciality}>{obj.speciality}</option>;
        });

        return (
            <div id="overview-box">
                <FormGroup controlId="formControlsTitle">
                    <ControlLabel style={{ fontSize: "150%" }}>Case Title<span style={{color:"red"}}>*</span></ControlLabel>
                    <FormControl type="text" placeholder="Enter a title" value={this.state.title} name="title" onChange={(e) => this.handleInputChange(e)} />
                </FormGroup>

                <FormGroup controlId="formControlsDifficulty">
                    <ControlLabel style={{ fontSize: "150%" }}>Difficulty Level<span style={{color:"red"}}>*</span></ControlLabel>
                    <FormControl componentClass="select" value={this.state.difficulty} name="difficulty" onChange={(e) => this.handleInputChange(e)}>
                        <option value="Select One">Select One</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Advanced">Advanced</option>
                    </FormControl>
                </FormGroup>

                <FormGroup controlId="formControlsSpeciality" style={{paddingBottom:"0"}}>
                    <ControlLabel style={{ fontSize: "150%"}}>Speciality<span style={{color:"red"}}>*</span></ControlLabel>
                    <FormControl componentClass="select" value={this.state.speciality} name="speciality" onChange={(e) => this.handleSpecialityChange(e)}>
                        <option value="Select One">Select One</option>
                        {specialities}
                    </FormControl>
                </FormGroup>

                {this.renderSubspeciality()}

                <FormGroup controlId="formControlsApproach">
                    <ControlLabel style={{ fontSize: "150%" }}>Approach(es)<span style={{color:"red"}}>*</span>
                        <br />
                        <div style={{ fontSize: "70%", fontWeight:"200"}}>Hold down the Ctrl (Windows) / Command (Mac) button to select multiple options.
                        </div>
                    </ControlLabel>
                    <FormControl size='10' componentClass="select" value={this.state.approach} name="approach" onChange={(e) => this.handleSelectChange(e)} multiple>
                        <option value="Select All Relevant">Select All Relevant</option>
                        {approaches}
                    </FormControl>
                </FormGroup>

                <FormGroup controlId="formControlsScenario" style={{height:'200px'}}>
                    <ControlLabel style={{ fontSize: "150%" }}>Case Scenario<span style={{color:"red"}}>*</span></ControlLabel>
                    <ReactQuill value={this.state.scenario}
                                modules={{toolbar: toolbarOptions}}
                                onChange={this.handleScenarioChange}
                                placeholder="Enter a brief description of the patient"
                                style={{height:'100px'}}/>
                </FormGroup>

                <FormGroup controlId="formControlsLearning" style={{height:'200px'}}>
                    <ControlLabel style={{ fontSize: "150%" }}>Key Learning Objectives<span style={{color:"red"}}>*</span></ControlLabel>
                    <ReactQuill value={this.state.learning}
                                modules={{toolbar: toolbarOptions}}
                                onChange={this.handleLearningChange}
                                placeholder="Enter the key learning objectives of this case"
                                style={{height:'100px'}}/>
                </FormGroup>

            </div>
        );
    }
}

export default Overview;