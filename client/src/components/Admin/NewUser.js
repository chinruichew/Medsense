import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, ControlLabel, FormGroup, FormControl, Col } from 'react-bootstrap';

import './Admin.css';
import { addNewStudent, addNewProfessor, addNewAdmin } from '../../actions';

class NewUser extends Component {
    state = {
        display: 'user',
        usertype: 'Student',
        username: '',
        email: '',
        school: 'Duke-NUS',
        year: 'Year 1',
        speciality: 'Medicine',
        subspeciality: [],
        seniorStatus: '',
    };

    handleUsertypeChange = (e) => {
        const value = e.target.value;
        this.setState({ usertype: value });
    };

    handleUsernameChange(e) {
        const value = e.target.value;
        this.setState({ username: value });
    }

    handleEmailChange(e) {
        const value = e.target.value;
        this.setState({ email: value });
    }


    handleYearChange(e) {
        const value = e.target.value;
        this.setState({ year: value });
    }

    handleSchoolChange(e) {
        const value = e.target.value;
        this.setState({ school: value });
    }

    handleSpecialityChange(e) {
        const value = e.target.value;
        if (value === "Surgery") {
            this.setState({ subspeciality: "Breast" })
        }

        if (value === "Others") {
            this.setState({ subspeciality: "Anaesthesiology" })
        }

        this.setState({ speciality: value });
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
        }
    }

    setUserType() {
        return (
            <FormGroup controlId="formControlsDifficulty">
                <ControlLabel style={{ fontSize: "150%" }}>Select User Type:</ControlLabel>
                <FormControl componentClass="select" value={this.state.usertype} name="usertype" onChange={(e) => this.handleUsertypeChange(e)}>
                    <option value="Student">Student</option>
                    <option value="Professor">Professor</option>#
                    <option value="Admin">Admin</option>
                </FormControl>
            </FormGroup>
        );
    }

    setUsername() {
        return (
            <FormGroup controlId="formControlsTitle">
                <ControlLabel style={{ fontSize: "150%" }}>Username:</ControlLabel>
                <FormControl type="text" value={this.state.title} name="username" onChange={(e) => this.handleUsernameChange(e)} />
            </FormGroup>
        );
    }

    setEmail = () => {
        return (
            <FormGroup controlId="formControlsTitle">
                <ControlLabel style={{ fontSize: "150%" }}>Email:</ControlLabel>
                <FormControl type="email" value={this.state.title} name="email" onChange={(e) => this.handleEmailChange(e)} />
            </FormGroup>
        );
    };

    setSchool() {
        if (this.state.usertype === "Student" || this.state.usertype === "Professor" ) {
            return (
                <FormGroup controlId="formControlsDifficulty">
                    <ControlLabel style={{ fontSize: "150%" }}>Select School:</ControlLabel>
                    <FormControl componentClass="select" value={this.state.school} name="school" onChange={(e) => this.handleSchoolChange(e)}>
                        <option value="Duke-NUS" default>Duke-NUS</option>
                        <option value="NTU">NTU</option>
                        <option value="NUS">NUS</option>
                    </FormControl>
                </FormGroup>
            );
        }

    }

    setYear() {
        if (this.state.usertype === "Student") {
            return (
                <FormGroup controlId="formControlsDifficulty">
                    <ControlLabel style={{ fontSize: "150%" }}>Select Year:</ControlLabel>
                    <FormControl componentClass="select" value={this.state.year} name="year" onChange={(e) => this.handleYearChange(e)}>
                        <option value="1" default>Year 1</option>
                        <option value="2">Year 2</option>
                        <option value="3">Year 3</option>
                        <option value="4">Year 4</option>
                        <option value="5">Year 5</option>
                    </FormControl>
                </FormGroup>
            );
        }
    }

    setSpeciality() {
        if (this.state.usertype === "Professor") {
            return (
                <FormGroup controlId="formControlsSpeciality" style={{ paddingBottom: "0" }}>
                    <ControlLabel style={{ fontSize: "150%" }}>Speciality</ControlLabel>
                    <FormControl componentClass="select" value={this.state.speciality} name="speciality" onChange={(e) => this.handleSpecialityChange(e)}>
                        <option value="Medicine" default>Medicine</option>
                        <option value="Surgery">Surgery</option>
                        <option value="Orthopedics">Orthopedics</option>
                        <option value="Others">Others</option>
                    </FormControl>
                </FormGroup>
            );
        }

    }

    setSubspeciality() {
        if (this.state.usertype === "Professor") {
            if (this.state.speciality === "Medicine") {
                return (
                    <FormGroup controlId="formControlsSubspeciality">
                        <ControlLabel style={{ fontSize: "150%" }}>Sub-speciality
                            <br />
                            <div style={{ fontSize: "70%", fontWeight: "200" }}>Hold down the Ctrl (Windows) / Command (Mac) button to select multiple options.
                            </div>
                        </ControlLabel>
                        <FormControl size='8' componentClass="select" value={this.state.subspeciality} name="subspeciality" onChange={(e) => this.handleSubspecialityChange(e)} multiple>
                            <option value="Select One">Select All Relevant</option>
                            <option value="Cardiology" default>Cardiology</option>
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
                    <FormGroup controlId="formControlsSubspeciality">
                        <ControlLabel style={{ fontSize: "150%" }}>Sub-speciality
                            <br />
                            <div style={{ fontSize: "70%", fontWeight: "200" }}>Hold down the Ctrl (Windows) / Command (Mac) button to select multiple options.
                            </div>
                        </ControlLabel>
                        <FormControl size='8' componentClass="select" value={this.state.subspeciality} name="subspeciality" onChange={(e) => this.handleSubspecialityChange(e)} multiple>
                            <option value="Select One">Select All Relevant</option>
                            <option value="Anaesthesiology" default >Anaesthesiology</option>
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
                    <FormGroup controlId="formControlsSubspeciality">
                        <ControlLabel style={{ fontSize: "150%" }}>Sub-speciality
                            <br />
                            <div style={{ fontSize: "70%", fontWeight: "200" }}>Hold down the Ctrl (Windows) / Command (Mac) button to select multiple options.
                            </div>
                        </ControlLabel>
                        <FormControl size='8' componentClass="select" value={this.state.subspeciality} name="subspeciality" onChange={(e) => this.handleSubspecialityChange(e)} multiple>
                            <option value="Select One">Select All Relevant</option>
                            <option value="Breast" default>Breast</option>
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

            } else if (this.state.speciality === "Orthopedics") {
                return (
                    <FormGroup controlId="formControlsSubspeciality">
                        <ControlLabel style={{ fontSize: "150%" }}>Sub-speciality
                            <br />
                            <div style={{ fontSize: "70%", fontWeight: "200" }}>Hold down the Ctrl (Windows) / Command (Mac) button to select multiple options.
                            </div>
                        </ControlLabel>
                        <FormControl size='8' componentClass="select" value={this.state.subspeciality} name="subspeciality" onChange={(e) => this.handleSubspecialityChange(e)} multiple>
                            <option value="Select One">Select All Relevant</option>
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

        }

    }

    createUser() {
        if (this.state.username.trim() === '' || this.state.username == null) {
            window.alert("Username not filled")
        } else if (this.state.email.trim() === '' || this.state.email == null) {
            window.alert("Email not filled")
        } else {
            if (this.state.usertype === "Student") {
                this.props.addNewStudent(this.state).then(function (response) {
                    console.log(response.data);
                    if (response.data === "User Exists") {
                        window.alert("User Exists");
                    } else {
                        window.alert("User Created");
                    }
                })
            } else if (this.state.usertype === "Admin") {
                this.props.addNewAdmin(this.state).then(function (response) {
                    if (response.data === "User Exists") {
                        window.alert("User Exists");
                    } else {
                        window.alert("User Created");
                    }
                })
            } else {
                this.props.addNewProfessor(this.state).then(function (response) {
                    if (response.data === "User Exists") {
                        window.alert("User Exists");
                    } else {
                        window.alert("User Created");
                    }
                })
            }
        }
    }

    render() {
        return (
            <div style={{paddingTop: "1%"}}>
                {this.setUserType()}
                {this.setUsername()}
                {this.setEmail()}
                {this.setSchool()}
                {this.setYear()}
                {this.setSpeciality()}
                {this.setSubspeciality()}
                <br/>
                <br/>
                <Col smOffset={5}>
                    <Button style={{ fontSize: "125%" }} bsStyle="primary" onClick={(e) => this.createUser()}>Create User</Button>
                </Col>
            </div>
        );
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps, { addNewStudent, addNewProfessor, addNewAdmin })(NewUser);
