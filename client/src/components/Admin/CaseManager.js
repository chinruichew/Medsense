import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, ButtonToolbar, FormGroup, ControlLabel, FormControl, Table, Modal } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { bindAll } from 'lodash';
import Main from './Main';
import Admin from './Admin';
import UserManager from './UserManager';
import { fetchAdminCases  } from '../../actions';


import './Admin.css';

class CaseManager extends Component {
    constructor(props) {
        super(props);
        this.state = {

            display: 'case',
            adminCases: this.props.adminCases,
            title: this.props.title,
            difficulty: this.props.difficulty,
            speciality: this.props.speciality,
            subspeciality: this.props.subspeciality,
            approach: this.props.approach,
            scenario: this.props.scenario,
            learning: this.props.learning,
            displayModal: false,
            case: null,
            vetId: ''
        };
        bindAll(this, 'handleTitleChange', 'handleDifficultyChange', 'handleSpecialityChange', 'handleSubspecialityChange',
            'handleApproachChange', 'handleScenarioChange', 'setSubspeciality', 'setName', 'setSpeciality', 'setApproach', 'setDifficulty', 'handleOpenModal', 'handleCloseModal');
    }
    

    componentDidMount() {
        this.props.fetchAdminCases();
    }



    handleOpenModal(id) {
        this.setState({ displayModal: true, vetId: id });
        console.log(this.state.vetId)
    }

    handleCloseModal() {
        this.setState({ displayModal: false });
    }


    searchCases(e) {

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


    setName() {
        return (
            <FormGroup controlId="formControlsTitle">
                <ControlLabel style={{ fontSize: "150%" }}>Case Title<span style={{ color: "red" }}>*</span></ControlLabel>
                <FormControl type="text" placeholder="Enter a title" value={this.state.title} name="title" onChange={(e) => this.handleTitleChange(e)} />
            </FormGroup>
        );
    }

    setApproach() {
        return (
            <FormGroup controlId="formControlsApproach">
                <ControlLabel style={{ fontSize: "150%" }}>Approach(es)<span style={{ color: "red" }}>*</span>
                    {/*<ControlLabel style={{ fontSize: "150%" }}>Approach<span style={{color:"red"}}>*</span>*/}
                    <br />
                    <div style={{ fontSize: "70%", fontWeight: "200" }}>Hold down the Ctrl (Windows) / Command (Mac) button to select multiple options.
                </div>
                </ControlLabel>
                <FormControl componentClass="select" value={this.state.approach} name="approach" onChange={(e) => this.handleApproachChange(e)} multiple>
                    {/*<FormControl componentClass="select" value={this.state.approach} name="approach" onChange={(e) => this.handleApproachChange(e)}>*/}
                    <option value="Select All Relevant">Select All Relevant</option>
                    {/*<option value="Select One">Select One</option>*/}
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
                </FormControl>
            </FormGroup>
        )
    }

    setSpeciality() {
        return (
            <FormGroup controlId="formControlsSpeciality" style={{ paddingBottom: "0" }}>
                <ControlLabel style={{ fontSize: "150%" }}>Speciality<span style={{ color: "red" }}>*</span></ControlLabel>
                <FormControl componentClass="select" value={this.state.speciality} name="speciality" onChange={(e) => this.handleSpecialityChange(e)}>
                    <option value="Select One">Select One</option>
                    <option value="Clinical Practicum">Clinical Practicum</option>
                    <option value="Medicine">Medicine</option>
                    <option value="Surgery">Surgery</option>
                    <option value="Others">Others</option>
                </FormControl>
            </FormGroup>
        );
    }

    setSubspeciality() {
        if (this.state.speciality === "Medicine") {
            return (
                <FormGroup controlId="formControlsSubspeciality">
                    <ControlLabel style={{ fontSize: "150%" }}>Sub-speciality<span style={{ color: "red" }}>*</span></ControlLabel>
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

        } else if (this.state.speciality === "Clinical Practicum") {
            return (
                <FormGroup controlId="formControlsSubspeciality">
                    <ControlLabel style={{ fontSize: "150%" }}>Sub-speciality<span style={{ color: "red" }}>*</span>
                        <br />
                        <div style={{ fontSize: "70%", fontWeight: "200" }}>Hold down the Ctrl (Windows) / Command (Mac) button to select multiple options.
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

    setDifficulty() {
        return (
            <FormGroup controlId="formControlsDifficulty">
                <ControlLabel style={{ fontSize: "150%" }}>Difficulty Level<span style={{ color: "red" }}>*</span></ControlLabel>
                <FormControl componentClass="select" value={this.state.difficulty} name="difficulty" onChange={(e) => this.handleDifficultyChange(e)}>
                    <option value="Select One">Select One</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Advanced">Advanced</option>
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
                <td>{item.approach}</td>
                <td>{item.speciality}</td>
                <td>{item.subspeciality}</td>
                <td>{item.difficulty}</td>
                <td>{item.authorname}</td>
                <td>{item.timestamp.split(" ")[2] + " " + item.timestamp.split(" ")[1] + " " + item.timestamp.split(" ")[3]}<br />{item.timestamp.split(" ")[4].split(":")[0] + ":" + item.timestamp.split(" ")[4].split(":")[1]}</td>
                <td> <Button type="button" bsStyle="primary" onClick={(e)=>this.handleOpenModal(item._id)}>View</Button></td >
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
                                    <div className="row">
                                        <div className="col-sm-4 text-center" style={{ fontSize: '150%' }}>
                                            <strong> <h3>Case Manager</h3> </strong>
                                        </div>
                                        <div className="col-sm-6 left">
                                            <ButtonToolbar>
                                                <Button bsStyle="primary" onClick={(e) => this.goToAdmin()}>Admin HomePage</Button>
                                                <Button bsStyle="primary" onClick={(e) => this.goToCaseManager()}>Case Management</Button>
                                                <Button bsStyle="primary" onClick={(e) => this.goToUserManager()}>User Management</Button>
                                                <Button bsStyle="primary">Discussion Board</Button>

                                            </ButtonToolbar>
                                        </div>
                                    </div>
                                    <br />
                                    <div className='container-fluid'>
                                        <div className='col-sm-12'>
                                            {this.setName()}
                                        </div>

                                        <div className='col-sm-6'>
                                            {this.setSpeciality()}
                                        </div>
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
                                            <center>
                                                <Button type="button" bsSize="lg" bsStyle="primary" onClick={(e) => this.searchCases()}> &nbsp; Search &nbsp;</Button>
                                            </center>
                                        </div>
                                    </div>
                                    <br />
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
        
        
        return (
            <Modal show={this.state.displayModal} onHide={this.handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.caseById}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Modal Body
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.handleCloseModal}>Close</Button>
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



export default connect(mapStateToProps, { fetchAdminCases })(CaseManager);