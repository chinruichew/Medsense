import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, ButtonToolbar, Tabs, Tab, ControlLabel, FormGroup, FormControl, Table } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { bindAll } from 'lodash';
import Main from './Main';
import Admin from './Admin';
import CaseManager from './CaseManager';
import './Admin.css';

class UserManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            display: 'user',
            usertype: 'Student',
            username: '',
            password: '',
            school: '',
            year: '',
            speciality: '',
            subspeciality: '',
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
        this.setState({ speciality: value });
    }

    handleSubspecialityChange(e) {
        const value = e.target.value;
        this.setState({ subspeciality: value });
    }
    
    handleSeniorChange(e) {
        const value = e.target.value;
        this.setState({ seniorStatus: value });
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
                    <FormControl componentClass="select" value={this.state.usertype} name="usertype" onChange={(e) => this.handleSchoolChange(e)}>
                        <option value="Duke-NUS">Duke-NUS</option>
                        <option value="NTU">NTU</option>
                        <option value="NUS">NUS</option>
                    </FormControl>
                </FormGroup>
            );
        
    }

    setYear() {
        if (this.state.usertype === "Student"){
            return (
                <FormGroup controlId="formControlsDifficulty">
                    <ControlLabel style={{ fontSize: "100%" }}>Select Year:</ControlLabel>
                    <FormControl componentClass="select" value={this.state.year} name="year" onChange={(e) => this.handleYearChange(e)}>
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
    setSeniorStatus() {
        if (this.state.usertype === "Student"){
            return (
                <FormGroup controlId="formControlsDifficulty">
                    <ControlLabel style={{ fontSize: "100%" }}>Senior Team:</ControlLabel>
                    <FormControl componentClass="select" value={this.state.year} name="seniorStatus" onChange={(e) => this.handleSeniorChange(e)}>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
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
                        <option value="Select One">Select One</option>
                        <option value="Medicine">Medicine</option>
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
                    <FormGroup controlId="formControlsSubspeciality">
                        <ControlLabel style={{ fontSize: "150%" }}>Sub-speciality<span style={{ color: "red" }}>*</span></ControlLabel>
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
                    <FormGroup controlId="formControlsSubspeciality">
                        <ControlLabel style={{ fontSize: "150%" }}>Sub-speciality<span style={{ color: "red" }}>*</span></ControlLabel>
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

    createUser(){
        /*add create user code here*/
    }

    renderTableStudent() {
        if (this.state.usertype === "Student"){
            return (
                <Table responsive>
                    <thead>
                        <tr style={{ background: '#D9EDF7', fontSize: "130%" }}>
                            <th><center>Username</center></th>
                            <th><center>School</center></th>
                            <th><center>Year</center></th>
                            <th><center>Senior Team</center></th>
                            <th><center>Level</center></th>
                            <th><center>XP</center></th>
                            <th><center>Date Registered</center></th>
                            <th> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</th>
                        </tr>
                        
                    </thead>
                    {this.renderStudents()}
                    {this.renderStudents()}
                    
    
    
                </Table>
            );
        }
        
    }

    renderStudents(){
        if (this.state.usertype === "Student"){
            return (
                
                    <tbody>
                        <tr>
                            <td><center>Username 1</center></td>
                            <td><center>School 1</center></td>
                            <td><center>Year 1</center></td>
                            <td><center>Senior Team 1</center></td>
                            <td><center>Level 1</center></td>
                            <td><center>XP 1</center></td>
                            <td><center>Date Registered 1</center></td>
                            <td> <Button type="button" bsStyle="primary">View</Button></td >
                        </tr>
                    </tbody> 
            );
        }
    }

    renderTableProfessors() {
        if (this.state.usertype === "Professor"){
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
                    {this.renderProfessors()}
                </Table>
            );
        }
        
    }
    
    renderProfessors(){
        if (this.state.usertype === "Professor"){
            return (
                
                    <tbody>
                        <tr>
                            <td><center>Username 1</center></td>
                            <td><center>School 1</center></td>
                            <td><center>Speciality 1</center>></td>
                            <td><center>Sub-Speciality 1</center>></td>
                            <td><center>Contribution 1</center></td>
                            <td> <Button type="button" bsStyle="primary">View</Button></td >
                        </tr>
                    </tbody> 
            );
        }
    }

    renderContent() {
        switch (this.state.auth) {
            case false:
                return <Redirect to='/' />;
            default:
                switch (this.props.cases) {
                    case null:
                        return;
                    default:
                        if (this.state.display === '') {
                            return (
                                <Admin />
                            );
                        } else if (this.state.display === 'case') {
                            return (
                                <CaseManager />
                            );
                        } else {
                            return (
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-sm-4 text-center" style={{ fontSize: '150%' }}>
                                            <strong> <h3>User Manager</h3> </strong>
                                        </div>
                                        <div className="col-sm-6">
                                            <ButtonToolbar>
                                                <Button bsStyle="primary" onClick={(e) => this.goToAdmin()}>Admin HomePage</Button>
                                                <Button bsStyle="primary" onClick={(e) => this.goToCaseManager()}>Case Management</Button>
                                                <Button bsStyle="primary" onClick={(e) => this.goToUserManager()}>User Management</Button>
                                                <Button bsStyle="primary">Discussion Board</Button>

                                            </ButtonToolbar>
                                        </div>
                                        <div className='col-sm-9 col-sm-offset-1'>
                                            <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                                                <Tab eventKey={1} title="Add New User">
                                                    <br />
                                                    {this.setUserType()}
                                                    {this.setUsername()}
                                                    {this.setPassword()}
                                                    {this.setSchool()}
                                                    {this.setYear()}
                                                    {this.setSpeciality()}
                                                    {this.setSubspeciality()}  
                                                    <br /> 
                                                    <Button bsStyle="primary" onClick={(e) => this.createUser()}>Create User</Button>
                                                </Tab>
                                                <Tab eventKey={2} title="Delete User">
                                                <br />
                                                {this.setUserType()}
                                                {this.setUsername()} 
                                                {this.setSchool()}
                                                {this.setYear()}
                                                {this.setSeniorStatus()}
                                                {this.setSpeciality()}
                                                {this.setSubspeciality()}
                                                <br />
                                                {this.renderTableStudent()}
                                                {this.renderTableProfessors()}
                                                
                                                    

	                                            </Tab>
                                            </Tabs>
                                        </div>
                                    </div>
                                    <br />
                                    {/* Insert User Manager code here */}
                                    <br />
                                </div>
                            );
                        }
                }
        }
    }

    render() {
        return (
            <div>
                {this.renderContent()}
            </div>
        );
    }
    goToCaseManager() {
        this.setState({
            display: 'case'
        });
    }

    goToUserManager() {
        this.setState({
            display: 'user'
        });
    }
    goToAdmin() {
        this.setState({
            display: ''
        });
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}



export default connect(mapStateToProps)(UserManager);