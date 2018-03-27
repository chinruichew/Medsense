import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, ControlLabel, FormGroup, FormControl, Table, Col } from 'react-bootstrap';

import { fetchFilteredAdminStudents, fetchFilteredAdminProfessors, fetchFilteredAdminAdmins, deleteAdminStudent, deleteAdminProfessor, deleteAdminAdmin } from '../../actions';
import './Admin.css';
import axios from 'axios';

class DeleteUser extends Component {
    state = {
        display: 'user',
        usertype: 'Student',
        username: '',
        school: '',
        year: '',
        speciality: '',
        subspeciality: [],
        seniorStatus: '',
        constants: ''
    };

    componentDidMount() {
        axios.get('/api/getConstantTypes').then(res => {
            this.setState({ constants: res.data });
        }).catch(err => {
            console.log(err);
        });
    }

    handleUsertypeChange = (e) => {
        const value = e.target.value;
        this.setState({ usertype: value });
    };

    handleUsernameChange(e) {
        const value = e.target.value;
        this.setState({ username: value });
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
        this.setState({ subspeciality: [] });
        const value = e.target.value;
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
                    <option value="Professor">Professor</option>
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

    setPassword() {
        return (
            <FormGroup controlId="formControlsTitle">
                <ControlLabel style={{ fontSize: "150%" }}>Password:</ControlLabel>
                <FormControl type="password" value={this.state.title} name="password" onChange={(e) => this.handlePasswordChange(e)} />
            </FormGroup>
        );
    }

    setSchool() {
        if (this.state.usertype !== this.state.constants.USER_TYPE_ADMIN) {
            return (
                <FormGroup controlId="formControlsDifficulty">
                    <ControlLabel style={{ fontSize: "150%" }}>Select School:</ControlLabel>
                    <FormControl componentClass="select" value={this.state.school} name="usertype" onChange={(e) => this.handleSchoolChange(e)}>
                        <option value="">Select School</option>
                        <option value="Duke-NUS">Duke-NUS</option>
                        <option value="NTU">NTU</option>
                        <option value="NUS">NUS</option>
                    </FormControl>
                </FormGroup>
            );
        }
    }

    setYear() {
        if (this.state.usertype === this.state.constants.USER_TYPE_STUDENT) {
            return (
                <FormGroup controlId="formControlsDifficulty">
                    <ControlLabel style={{ fontSize: "150%" }}>Select Year:</ControlLabel>
                    <FormControl componentClass="select" value={this.state.year} name="year" onChange={(e) => this.handleYearChange(e)}>
                        <option value="">Select Year</option>
                        <option value="1">Year 1</option>
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
        if (this.state.usertype === this.state.constants.USER_TYPE_PROFESSOR) {
            return (
                <FormGroup controlId="formControlsSpeciality" style={{ paddingBottom: "0" }}>
                    <ControlLabel style={{ fontSize: "150%" }}>Speciality</ControlLabel>
                    <FormControl componentClass="select" value={this.state.speciality} name="speciality" onChange={(e) => this.handleSpecialityChange(e)}>
                        <option value="">Select Speciality</option>
                        <option value="Medicine">Medicine</option>
                        <option value="Surgery">Surgery</option>
                        <option value="Orthopedics">Orthopedics</option>
                        <option value="Others">Others</option>
                    </FormControl>
                </FormGroup>
            );
        }

    }
    setSubspeciality() {
        if (this.state.usertype === this.state.constants.USER_TYPE_PROFESSOR) {
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
                    <FormGroup controlId="formControlsSubspeciality">
                        <ControlLabel style={{ fontSize: "150%" }}>Sub-speciality
                            <br />
                            <div style={{ fontSize: "70%", fontWeight: "200" }}>Hold down the Ctrl (Windows) / Command (Mac) button to select multiple options.
                            </div>
                        </ControlLabel>
                        <FormControl size='8' componentClass="select" value={this.state.subspeciality} name="subspeciality" onChange={(e) => this.handleSubspecialityChange(e)} multiple>
                            <option value="Select One">Select All Relevant</option>
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
                    <FormGroup controlId="formControlsSubspeciality">
                        <ControlLabel style={{ fontSize: "150%" }}>Sub-speciality
                            <br />
                            <div style={{ fontSize: "70%", fontWeight: "200" }}>Hold down the Ctrl (Windows) / Command (Mac) button to select multiple options.
                            </div>
                        </ControlLabel>
                        <FormControl size='8' componentClass="select" value={this.state.subspeciality} name="subspeciality" onChange={(e) => this.handleSubspecialityChange(e)} multiple>
                            <option value="Select One">Select All Relevant</option>
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

            } else {
                return (
                    <FormGroup controlId="formControlsSubspeciality">
                        <ControlLabel style={{ fontSize: "150%" }}>Sub-speciality<span style={{ color: "red" }}>*</span></ControlLabel>
                        <FormControl componentClass="select" value={this.state.subspeciality} name="subspeciality" onChange={(e) => this.handleSubspecialityChange(e)}>
                            <option value="Select One">Please select a Speciality first</option>
                        </FormControl>
                    </FormGroup>
                );
            }

        }

    }

    handleSeniorChange(e) {
        const value = e.target.value;
        this.setState({ seniorStatus: value });
    }

    renderTableStudent() {
        if (this.state.usertype === this.state.constants.USER_TYPE_STUDENT) {
            return (
                <Table responsive>
                    <thead>
                        <tr style={{ background: '#D9EDF7', fontSize: "130%" }}>
                            <th><center>Username</center></th>
                            <th><center>School</center></th>
                            <th><center>Year</center></th>
                            {/*<th><center>Senior Team</center></th>*/}
                            <th><center>Level</center></th>
                            <th><center>XP</center></th>
                            <th><center>Date Registered</center></th>
                            <th> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</th>
                        </tr>

                    </thead>
                    {this.renderStudents()}
                </Table>
            );
        }

    }

    deleteAdminStudent(e) {
        this.props.deleteAdminStudent(e._id)
    }

    deleteAdminProfessor(e) {
        this.props.deleteAdminProfessor(e._id)
    }

    deleteAdminAdmin(e) {
        this.props.deleteAdminAdmin(e._id)
    }

    convert(xp) {
        let level = 1;
        if (xp < 480) {
            level = 1;
        } else {
            level = Math.floor((120 + Math.sqrt(120 ** 2 - 4 * 120 * (240 - xp))) / (2 * 120));
        }
        return level;
    }

    renderStudents() {
        let allStudents = this.props.adminUsers.map(user => {
            if (user.usertype === this.state.constants.USER_TYPE_STUDENT) {
                return <tr>
                    <td><center>{user.username}</center></td>
                    <td><center>{user.school}</center></td>
                    <td><center>{user.year}</center></td>
                    {/*<td><center>{user.year === "4" || user.year === "5" ? "Yes" : "No"}</center></td>*/}
                    {/* <td><center>{user._id}</center></td> */}
                    <td><center>{this.convert(user.points)}</center></td>
                    <td><center>{user.points}</center></td>
                    <td><center>{user.timestamp.split("T")[0]}</center></td>
                    <td><center><Button bsStyle="primary" onClick={(e) => this.deleteAdminStudent(user)}>Delete</Button></center></td >
                </tr>
            }
            return '';
        });
        if (this.state.usertype === this.state.constants.USER_TYPE_STUDENT) {
            return (
                <tbody>
                    {allStudents}
                </tbody>
            );
        }
    }

    renderTableAdmins() {
        if (this.state.usertype === this.state.constants.USER_TYPE_ADMIN) {
            return (
                <Table responsive className="admin-table">
                    <thead>
                        <tr style={{ background: '#D9EDF7', fontSize: "130%" }}>
                            <th><center>Username</center></th>
                            <th> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</th>
                        </tr>

                    </thead>
                    {this.renderAdmins()}
                </Table>
            );
        }

    }

    renderAdmins() {
        let allAdmins = this.props.adminUsers.map(user => {
            if (user.usertype === this.state.constants.USER_TYPE_ADMIN) {
                return <tr>
                    <td><center>{user.username}</center></td>
                    <td><center><Button bsStyle="primary" onClick={(e) => this.deleteAdminAdmin(user)}>Delete</Button></center></td >
                </tr>
            }
            return '';
        });
        if (this.state.usertype === this.state.constants.USER_TYPE_ADMIN) {
            return (
                <tbody>
                    {allAdmins}
                </tbody>
            );
        }
    }

    renderTableProfessors() {
        if (this.state.usertype === this.state.constants.USER_TYPE_PROFESSOR) {
            return (
                <Table responsive>
                    <thead>
                        <tr style={{ background: '#D9EDF7', fontSize: "130%" }}>
                            <th><center>Username</center></th>
                            <th><center>School</center></th>
                            <th><center>Speciality</center></th>
                            <th><center>Sub-Speciality</center></th>
                            <th><center>Contribution</center></th>
                            <th> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</th>
                        </tr>
                    </thead>
                    {this.renderProfessors()}
                </Table>
            );
        }
    }

    renderProfessors() {
        let allProfessors = this.props.adminUsers.map(user => {
            if (user.usertype === this.state.constants.USER_TYPE_PROFESSOR) {
                return <tr>
                    <td><center>{user.username}</center></td>
                    <td><center>{user.school}</center></td>
                    <td><center>{user.speciality}</center></td>
                    <td><center>{user.subspeciality.join(", ")}</center></td>
                    <td><center>Contribution 1</center></td>
                    <td><center><Button bsStyle="primary" onClick={(e) => this.deleteAdminProfessor(user)}>Delete</Button></center></td >
                </tr>
            }
            return '';
        });
        if (this.state.usertype === this.state.constants.USER_TYPE_PROFESSOR) {
            return (
                <tbody>
                    {allProfessors}
                </tbody>
            );
        }
    }

    searchUser() {
        if (this.state.usertype === this.state.constants.USER_TYPE_STUDENT) {
            this.props.fetchFilteredAdminStudents(this.state);
        } else if (this.state.usertype === this.state.constants.USER_TYPE_ADMIN) {
            this.props.fetchFilteredAdminAdmins(this.state);
        }
        else {
            this.props.fetchFilteredAdminProfessors(this.state);
        }
    }

    render() {
        return (
            <div style={{paddingTop: "1%"}}>
                {this.setUserType()}
                {this.setUsername()}
                {this.setSchool()}
                {this.setYear()}
                {this.setSpeciality()}
                {this.setSubspeciality()}
                <br />
                <Col smOffset={6}>
                    <Button style={{ fontSize: "125%" }} bsStyle="primary" onClick={(e) => this.searchUser()}>Search</Button>
                </Col>
                <br /><br /><br />
                {this.renderTableStudent()}
                {this.renderTableProfessors()}
                {this.renderTableAdmins()}
            </div>
        );
    }
}

function mapStateToProps({ auth, adminUsers }) {
    return { auth, adminUsers };
}

export default connect(mapStateToProps, { fetchFilteredAdminStudents, fetchFilteredAdminProfessors, fetchFilteredAdminAdmins, deleteAdminStudent, deleteAdminProfessor, deleteAdminAdmin })(DeleteUser);
