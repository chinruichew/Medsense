import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, ButtonToolbar, FormGroup, ControlLabel, FormControl, Table, Modal } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { bindAll } from 'lodash';
import Admin from './Admin';
import UserManager from './UserManager';
import { deleteAdminCase, fetchFilteredAdminCases } from '../../actions';


import './Admin.css';

class CaseManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            display: 'case',
            title: ''   ,
            difficulty: 'Beginner',
            subspeciality: [],
            approach: [],
            casestatus: 'Pending',
            displayModal: false,
            case: null,
            oneCaseQuestions: [],
            oneCaseId: ''
        };
        bindAll(this, 'handleTitleChange', 'handleDifficultyChange', 'handleSpecialityChange', 'handleSubspecialityChange',
            'handleApproachChange', 'handleScenarioChange', 'setSubspeciality', 'setName', 'setSpeciality', 'setApproach', 'setDifficulty', 'handleOpenModal', 'handleCloseModal');
    }

    handleOpenModal(oneCase) {
        this.setState({ displayModal: true, oneCaseQuestions: oneCase.questions, oneCaseId: oneCase._id });
    }

    handleCloseModal() {
        this.setState({ displayModal: false });
    }


    searchCases(e) {
        this.props.fetchFilteredAdminCases(this.state);
    }

    deleteCase(e) {
        var oneCaseId = this.state.oneCaseId
        this.props.deleteAdminCase(oneCaseId)
        this.setState({ displayModal: false });
    }

    handleTitleChange(e) {
        const value = e.target.value;
        this.setState({ title: value });
    }

    handleDifficultyChange(e) {
        const value = e.target.value;
        this.setState({ difficulty: value });
    }
    handleSpecialityChange(e) {
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

    handleApproachChange(e) {
        const options = e.target.options;
        let value = [];
        for (let i = 1, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        if (value.length > 0) {
            this.setState({ approach: value });
        }
        // const value = e.target.value;
        // this.setState({ approach: value });
        // this.update(value, "approach");
    }
    handleScenarioChange(e) {
        const value = e.target.value;
        this.setState({ scenario: value });
    }

    handleCaseStatusChange(e) {
        const value = e.target.value;
        this.setState({ casestatus: value });
    }

    handleTimeChange(e) {
        const value = e.target.value;
        this.setState({ time: value });
    }


    setName() {
        return (
            <FormGroup controlId="formControlsTitle">
                <ControlLabel style={{ fontSize: "150%" }}>Case Title</ControlLabel>
                <FormControl style={{ fontSize: "125%" }} type="text" placeholder="Enter a title" value={this.state.title} name="title" onChange={(e) => this.handleTitleChange(e)} />
            </FormGroup>
        );
    }

    setApproach() {
        return (
            <FormGroup controlId="formControlsApproach">
                <ControlLabel style={{ fontSize: "150%" }}>Approaches
                    {/*<ControlLabel style={{ fontSize: "150%" }}>Approach<span style={{color:"red"}}>*</span>*/}
                    <br />
                    <div style={{ fontSize: "70%", fontWeight: "200" }}>Hold down the Ctrl (Windows) / Command (Mac) button to select multiple options.
                </div>
                </ControlLabel>
                <FormControl componentClass="select" size='10' value={this.state.approach} name="approach" onChange={(e) => this.handleApproachChange(e)} multiple>
                    {/*<FormControl componentClass="select" value={this.state.approach} name="approach" onChange={(e) => this.handleApproachChange(e)}>*/}
                    <option value="Select All Relevant">Select All Relevant</option>
                    {/*<option value="Select One">Select One</option>*/}
                    <option value="Abdominal Pain" selected>Abdominal Pain</option>
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
        )
    }

    setSpeciality() {
        return (
            <FormGroup controlId="formControlsSpeciality" style={{ paddingBottom: "0" }}>
                <ControlLabel style={{ fontSize: "150%" }}>Speciality</ControlLabel>
                <FormControl componentClass="select" value={this.state.speciality} name="speciality" onChange={(e) => this.handleSpecialityChange(e)}>
                    <option value="Select One">Select One</option>
                    <option value="Clinical Practicum">Clinical Practicum</option>
                    <option value="Medicine">Medicine</option>
                    <option value="Surgery">Surgery</option>
                    <option value="Orthopedics">Orthopedics</option>
                    <option value="Others">Others</option>
                </FormControl>
            </FormGroup>
        );
    }

    

    setSubspeciality() {
        return (
            <FormGroup controlId="formControlsSubspeciality">
                <ControlLabel style={{ fontSize: "150%" }}>Sub-specialties
                        <br />
                    <div style={{ fontSize: "70%", fontWeight: "200" }}>Hold down the Ctrl (Windows) / Command (Mac) button to select multiple options.
                        </div>
                </ControlLabel>
                <FormControl  componentClass="select" size='10' value={this.state.subspeciality} name="subspeciality" onChange={(e) => this.handleSubspecialityChange(e)} multiple>
                    <option value="Select One">Select All Relevant</option>

                    <optgroup label="--Medicine--"></optgroup>
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

                    <optgroup label="--Surgery--"></optgroup>
                    <option value="Breast">Breast</option>
                    <option value="Colorectal">Colorectal</option>
                    <option value="General Surgery">General Surgery</option>
                    <option value="Head & Neck">Head & Neck</option>
                    <option value="Hepato-pancreato-biliary">Hepato-pancreato-biliary</option>
                    <option value="Surgical Oncology">Surgical Oncology</option>
                    <option value="Upper Gastrointestinal & Bariatric Surgery">Upper Gastrointestinal & Bariatric Surgery</option>
                    <option value="Urology">Urology</option>
                    <option value="Vascular Surgery">Vascular Surgery</option>

                    <optgroup label="--Orthopedics--"></optgroup>
                    <option value="Foot and Ankle Surgery">Foot and Ankle Surgery</option>
                    <option value="Hip and Knee Surgery">Hip and Knee Surgery</option>
                    <option value="Musculoskeletal Oncology">Musculoskeletal Oncology</option>
                    <option value="Musculoskeletal Trauma">Musculoskeletal Trauma</option>
                    <option value="Paediatric Orthopaedics">Paediatric Orthopaedics</option>
                    <option value="Shoulder & Elbow Surgery">Shoulder & Elbow Surgery</option>
                    <option value="Spine Surgery">Spine Surgery</option>
                    <option value="Sports medicine">Sports medicine</option>
                    <option value="Department of Hand & Reconstructive Microsurgery Trauma">Department of Hand & Reconstructive Microsurgery Trauma</option>

                    <optgroup label="--Others--"></optgroup>
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

    }

    setDifficulty() {
        return (
            <FormGroup controlId="formControlsDifficulty">
                <ControlLabel style={{ fontSize: "150%" }}>Difficulty Level</ControlLabel>
                <FormControl componentClass="select" value={this.state.difficulty} name="difficulty" onChange={(e) => this.handleDifficultyChange(e)}>
                    <option value="Beginner">Beginner</option>
                    <option value="Advanced">Advanced</option>
                </FormControl>
            </FormGroup>
        );
    }

    setCaseStatus() {
        return (
            <FormGroup controlId="formControlsDifficulty">
                <ControlLabel style={{ fontSize: "150%" }}>Case Status</ControlLabel>
                <FormControl componentClass="select" value={this.state.casestatus} name="casestatus" onChange={(e) => this.handleCaseStatusChange(e)}>
                    <option value="Pending">Pending</option>
                    <option value="Vetted">Vetted</option>
                </FormControl>
            </FormGroup>
        );
    }

    setTime() {
        return (
            <FormGroup controlId="formControlsDifficulty">
                <ControlLabel style={{ fontSize: "150%" }}>Select Case from:</ControlLabel>
                <FormControl componentClass="select" value={this.state.time} name="time" onChange={(e) => this.handleTimeChange(e)}>
                    <option value="all time">All time</option>
                    <option value="past day">Past day</option>
                    <option value="past week">Past week</option>
                    <option value="past month">Past month</option>
                    <option value="past year">Past Year</option>
                </FormControl>
            </FormGroup>
        );
    }


    renderTable() {
        return (
            <Table responsive>
                <thead>
                    <tr style={{ background: '#D9EDF7', fontSize: "130%" }}>
                        <th><center>Case Title</center></th>
                        <th><center>Approach</center></th>
                        <th><center>Speciality</center></th>
                        <th><center>Sub-Speciality</center></th>
                        <th><center>Difficulty Level</center></th>
                        <th><center>Uploaded By</center></th>
                        <th><center>Last Updated</center></th>
                        <th> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</th>
                    </tr>
                </thead>

                {this.renderCases()}


            </Table>
        );
    }

    renderCases() {

        let allCases = this.props.adminCases.map(item => (
            <tr align="center">
                <td>{item.title}</td>
                <td>{item.approach.join(", ")}</td>
                <td>{item.speciality}</td>
                <td>{item.subspeciality}</td>
                <td>{item.difficulty}</td>
                <td>{item.authorname}</td>
                <td>{item.timestamp.split(" ")[2] + " " + item.timestamp.split(" ")[1] + " " + item.timestamp.split(" ")[3]}<br />{item.timestamp.split(" ")[4].split(":")[0] + ":" + item.timestamp.split(" ")[4].split(":")[1]}</td>
                <td> <Button type="button" bsStyle="primary" onClick={(e) => this.handleOpenModal(item)}>View</Button></td >
            </tr>

        ))


        return (
            <tbody>
                {allCases}
            </tbody>

        );
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
                        } else if (this.state.display === 'user') {
                            return (
                                <UserManager />
                            );
                        } else {
                            return (
                                <div className="container-fluid">
                                    <div className='container-fluid'>
                                        <div className='col-sm-12'>
                                            {this.setName()}
                                        </div>

                                        {/* <div className='col-sm-6'>
                                            {this.setSpeciality()}
                                        </div> */}
                                        <div className='col-sm-6'>
                                            {this.setSubspeciality()}
                                        </div>
                                        <div className='col-sm-6'>
                                            {this.setApproach()}
                                        </div> 
                                        <div className='col-sm-6'>
                                            {this.setDifficulty()}
                                        </div>
                                        <div className='col-sm-6'>
                                            {this.setCaseStatus()}
                                        </div> 
                                        {/* <div className='col-sm-4'>
                                            {this.setTime()}
                                        </div> */}
                                        <div className='col-sm-12' align='right'>
                                            <Button type="button" bsSize="lg" bsStyle="primary" onClick={(e) => this.searchCases()}> &nbsp; Search &nbsp;</Button>
                                        </div>
                                    </div>
                                    <br /><br />
                                    <div className='col-sm-12'>
                                        {this.renderTable()}
                                    </div>
                                    {this.renderModal()}
                                </div>
                            );
                        }
                }
        }
    }

    renderModal() {
        let allQuestions = this.state.oneCaseQuestions.map(question => {
            if (question.type === "MCQ") {
                return <div>
                    <p> Stem {question.stem} </p>
                    <p> MCQ 1: &nbsp; {question.mcq1} &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Answer 1: {JSON.stringify(question.check1)} </p>
                    <p> MCQ 2: &nbsp; {question.mcq2} &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Answer 1: {JSON.stringify(question.check2)} </p>
                    <p> MCQ 3: &nbsp; {question.mcq3} &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Answer 1: {JSON.stringify(question.check3)} </p>
                    <p> MCQ 4: &nbsp; {question.mcq4} &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Answer 1: {JSON.stringify(question.check4)} </p>
                    <p> MCQ 5: &nbsp; {question.mcq5} &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Answer 1: {JSON.stringify(question.check5)} </p>
                    <p> MCQ 6: &nbsp; {question.mcq6} &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Answer 1: {JSON.stringify(question.check6)} </p>
                </div>
            } else {
                return <div>
                    <p> Stem {question.stem} </p>
                    <p> Open Ended: &nbsp; {question.mcq1} &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Answer 1: {JSON.stringify(question.check1)} </p>
                </div>
            }
        })

        return (
            <Modal show={this.state.displayModal} onHide={this.handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {allQuestions}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={(e) => this.deleteCase()}>Delete</Button>
                </Modal.Footer>
            </Modal>
        );

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

function mapStateToProps({ adminCases }) {
    return { adminCases };
}



export default connect(mapStateToProps, { deleteAdminCase, fetchFilteredAdminCases })(CaseManager);