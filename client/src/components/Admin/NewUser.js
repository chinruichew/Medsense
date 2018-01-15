import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, ButtonToolbar, Tabs, Tab, ControlLabel, FormGroup, FormControl, Table } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { bindAll } from 'lodash';
import Admin from './Admin';
import CaseManager from './CaseManager';
import './Admin.css';
import { addNewStudent, addNewProfessor } from '../../actions';

class NewUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            display: 'user',
            usertype: 'Student',
            username: '',
            password: '',
            school: 'Duke-NUS',
            year: '1',
            speciality: 'Medicine',
            subspeciality: 'Cardiology',
            seniorStatus: '',
        };
        bindAll(this, 'handleUsertypeChange');
    }

    handleUsertypeChange(e) {
        const value = e.target.value;
        this.setState({ usertype: value });
    }

    handleUsernameChange(e) {
        const value = e.target.value;
        this.setState({ username: value });
    }

    handlePasswordChange(e) {
        const value = e.target.value;
        this.setState({ password: value });
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
        if (value == "Surgery") {
            this.setState({ subspeciality: "Breast" })
        }

        if (value == "Others") {
            this.setState({ subspeciality: "Anaesthesiology" })
        }

        this.setState({ speciality: value });
    }

    handleSubspecialityChange(e) {
        const value = e.target.value;
        this.setState({ subspeciality: value });
    }

    setUserType() {
        return (
            <FormGroup controlId="formControlsDifficulty">
                <ControlLabel style={{ fontSize: "100%" }}>Select User Type:</ControlLabel>
                <FormControl componentClass="select" value={this.state.usertype} name="usertype" onChange={(e) => this.handleUsertypeChange(e)}>
                    <option value="Student">Student</option>
                    <option value="Professor">Professor</option>
                </FormControl>
            </FormGroup>
        );
    }

    setUsername() {
        return (
            <FormGroup controlId="formControlsTitle">
                <ControlLabel style={{ fontSize: "100%" }}>Username:</ControlLabel>
                <FormControl type="text" value={this.state.title} name="username" onChange={(e) => this.handleUsernameChange(e)} />
            </FormGroup>
        );
    }

    setPassword() {
        return (
            <FormGroup controlId="formControlsTitle">
                <ControlLabel style={{ fontSize: "100%" }}>Password:</ControlLabel>
                <FormControl type="password" value={this.state.title} name="password" onChange={(e) => this.handlePasswordChange(e)} />
            </FormGroup>
        );
    }

    setSchool() {
        return (
            <FormGroup controlId="formControlsDifficulty">
                <ControlLabel style={{ fontSize: "100%" }}>Select School:</ControlLabel>
                <FormControl componentClass="select" value={this.state.school} name="school" onChange={(e) => this.handleSchoolChange(e)}>
                    <option value="Duke-NUS" default>Duke-NUS</option>
                    <option value="NTU">NTU</option>
                    <option value="NUS">NUS</option>
                </FormControl>
            </FormGroup>
        );

    }

    setYear() {
        if (this.state.usertype === "Student") {
            return (
                <FormGroup controlId="formControlsDifficulty">
                    <ControlLabel style={{ fontSize: "100%" }}>Select Year:</ControlLabel>
                    <FormControl componentClass="select" value={this.state.year} name="year" onChange={(e) => this.handleYearChange(e)}>
                        <option value="Year 1" default>Year 1</option>
                        <option value="Year 2">Year 2</option>
                        <option value="Year 3">Year 3</option>
                        <option value="Year 4">Year 4</option>
                        <option value="Year 5">Year 5</option>
                    </FormControl>
                </FormGroup>
            );
        }
    }

    setSpeciality() {
        if (this.state.usertype === "Professor") {
            return (
                <FormGroup controlId="formControlsSpeciality" style={{ paddingBottom: "0" }}>
                    <ControlLabel style={{ fontSize: "100%" }}>Speciality</ControlLabel>
                    <FormControl componentClass="select" value={this.state.speciality} name="speciality" onChange={(e) => this.handleSpecialityChange(e)}>
                        <option value="Medicine" default>Medicine</option>
                        <option value="Surgery">Surgery</option>
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
                        <ControlLabel style={{ fontSize: "100%" }}>Sub-speciality</ControlLabel>
                        <FormControl componentClass="select" value={this.state.subspeciality} name="subspeciality" onChange={(e) => this.handleSubspecialityChange(e)}>
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
                        <ControlLabel style={{ fontSize: "150%" }}>Sub-speciality<span style={{ color: "red" }}>*</span></ControlLabel>
                        <FormControl componentClass="select" value={this.state.subspeciality} name="subspeciality" onChange={(e) => this.handleSubspecialityChange(e)}>
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
                        <ControlLabel style={{ fontSize: "150%" }}>Sub-speciality<span style={{ color: "red" }}>*</span></ControlLabel>
                        <FormControl componentClass="select" value={this.state.subspeciality} name="subspeciality" onChange={(e) => this.handleSubspecialityChange(e)}>
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

            }

        }

    }

    createUser() {
        if (this.state.username.trim() == '' || this.state.username == null) {
            window.alert("Username not filled")
        } else if (this.state.password.trim() == '' || this.state.password == null) {
            window.alert("Password not filled")
        } else {
            if (this.state.usertype == "Student") {
                this.props.addNewStudent(this.state).then(function (response) {
                    if (response.data == "User Exists") {
                        window.alert("User Exists")
                    } else {
                        window.alert("User Created")
                    }
                })
            } else {
                this.props.addNewProfessor(this.state).then(function (response) {
                    if (response.data == "User Exists") {
                        window.alert("User Exists")
                    } else {
                        window.alert("User Created")
                    }
                })
            }
        }
    }

    render() {
        return (
            <div>
                {this.setUserType()}
                {this.setUsername()}
                {this.setPassword()}
                {this.setSchool()}
                {this.setYear()}
                {this.setSpeciality()}
                {this.setSubspeciality()}
                <Button bsStyle="primary" onClick={(e) => this.createUser()}>Create User</Button>
            </div>
        );
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps, { addNewStudent, addNewProfessor })(NewUser);
