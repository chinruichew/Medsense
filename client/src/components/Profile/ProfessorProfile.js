import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Image, Table } from 'react-bootstrap';
import BootstrapModal from '../UI/Modal/VettingBootstrapModal.js';
import { updateProfessor } from '../../actions/index';
import UploadProfilePicture from './UploadProfilePicture';

class ProfessorProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            username: this.props.username,
            speciality: this.props.speciality,
            subspeciality: this.props.subspeciality,
            school: this.props.school
        };
    }

    handleSpecialityChange = (e) =>{
        this.setState({ speciality: e.target.value });
    };

    handleSubSpecialityChange = (e) =>{
        const options = e.target.options;
        let value = [];
        for (let i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        if (value.length > 0) {
            this.setState({ subspeciality: value });
        }
    };

    handleSchoolChange = (e) =>{
        this.setState({ school: e.target.value });
    };

    handleEdit = (e) =>{
        this.setState({ vmShow: true });
    };

    handleUpdate = (e) =>{
        e.preventDefault();
        this.props.updateProfessor(this.state).then((response) => {
            if (response) {
                console.log(response);
                this.setState({ vmShow: false });
                console.log(this.props.refresh);
            }
        }).catch(() => { })
    };

    render() {
        let vmClose = () => this.setState({ vmShow: false });
        const subspecialities = this.state.subspeciality;
        let subSpecialityString = subspecialities[0];
        for (let i = 1; i < subspecialities.length; i++) {
            subSpecialityString += ', ' + subspecialities[i];
        }

        return (
            <div>
                <div align="center">
                    <div className="main-center" style={{paddingBottom: "0", paddingTop: "0"}}>
                        <Image src={this.props.auth.profilepicture} style={{width: '200px'}} alt={this.props.auth.username}  circle />
                        <h3> <b>{this.state.username}</b> </h3>
                    </div><br />
                    <Table  style={{width: '700px'}}>
                        <tr>
                            <td><center>
                                <Image src="./school.png" circle style={{width: "3em", height: "3em", borderRight: "1"}} />
                            </center></td>
                            <td><center>
                                <Image src="./specialty.png" circle style={{width: "3em", height: "3em"}} />
                            </center></td>
                            <td><center>
                                <Image src="./subspecialty.png" circle style={{width: "3em", height: "3em"}} />
                            </center></td>
                            <td><center>
                                <Image src="./contribution.png" circle style={{width: "3em", height: "3em"}} />
                            </center></td>
                        </tr>
                        <tr>
                            <td style={{width: '100px'}} ><center>
                                <h4 > {this.state.school} </h4>
                            </center></td>
                            <td style={{width: '100px'}} ><center>
                                <h4> {this.state.speciality} </h4>
                            </center></td>
                            <td style={{width: '100px'}} ><center>
                                <h4>{subSpecialityString}</h4>
                            </center></td>
                            <td style={{width: '100px'}} ><center>
                                <h4> Silver </h4>
                            </center></td>
                        </tr>
                    </Table>
                    <br/>
                    <div style={{ maxWidth: 400, margin: '0 auto 10px' }}>
                        <Button onClick={(e) => this.handleEdit(e)} bsStyle="primary" bsSize="large" block>
                            Edit
                        </Button>
                    </div>
                </div>
                <BootstrapModal
                    show={this.state.vmShow}
                    onHide={vmClose}
                    aria-labelledby="error-modal">
                    <BootstrapModal.Header closeButton>
                        <BootstrapModal.Title id="error-modal-">Profile Update</BootstrapModal.Title>
                    </BootstrapModal.Header>
                    <BootstrapModal.Body>
                        <UploadProfilePicture/>

                        <div className="main-center" style={{paddingTop:'0%', paddingBottom:'0%'}}>
                            <div className="form-group">
                                <div className="input-group">
                                    <span className="input-group-addon"><i className="fa fa-heartbeat fa-lg" aria-hidden="true"></i></span>
                                    <select className="form-control" value={this.state.speciality} onChange={(e) => this.handleSpecialityChange(e)}>
                                        <option value="Medicine">Medicine</option>
                                        <option value="Surgery">Surgery</option>
                                        <option value="Orthopedics">Orthopedics</option>
                                        <option value="Others">Others</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="main-center" style={{paddingTop:'0%', paddingBottom:'0%'}}>
                            <div className="form-group">
                                <div className="input-group">
                                    <span className="input-group-addon"><i className="fa fa-plus-square fa-lg" aria-hidden="true"></i></span>
                                    {this.setSubspeciality()}
                                </div>
                            </div>
                        </div>

                        <div className="main-center" style={{paddingTop:'0%', paddingBottom:'0%'}}>
                            <div className="form-group">

                                <div className="input-group">
                                    <span className="input-group-addon"><i className="fa fa-university fa-lg" aria-hidden="true"></i></span>
                                    <select className="form-control" value={this.state.school} onChange={(e) => this.handleSchoolChange(e)}>
                                        <option value="Duke-NUS">Duke-NUS</option>
                                        <option value="NTU">NTU</option>
                                        <option value="NUS">NUS</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <center>
                            <div style={{  maxWidth: 200, maxHeight: 30 , paddingTop:'0%'}}>
                                <Button type="submit" onClick={(e) => this.handleUpdate(e)} bsStyle="primary" bsSize="small" block>
                                    Update Profile
                                </Button>
                            </div>
                        </center>
                    </BootstrapModal.Body>
                    <BootstrapModal.Footer>
                        <Button onClick={vmClose}>Close</Button>
                    </BootstrapModal.Footer>
                </BootstrapModal>
            </div>
        )
    }


    setSubspeciality() {
        if (this.state.speciality === "Medicine") {
            return (
                <select className="form-control" value={this.state.subspeciality} name="subspeciality" onChange={(e) => this.handleSubSpecialityChange(e)} multiple>
                    {/*<option value="Select One">Select One</option>*/}
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
        } else if (this.state.speciality === "Others") {
            return (
                <select className="form-control" value={this.state.subspeciality} name="subspeciality" onChange={(e) => this.handleSubSpecialityChange(e)} multiple>
                    {/*<option value="Select One">Select One</option>*/}
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
        } else if (this.state.speciality === "Surgery") {
            return (
                <select className="form-control" value={this.state.subspeciality} name="subspeciality" onChange={(e) => this.handleSubSpecialityChange(e)} multiple>
                    {/*<option value="Select One">Select One</option>*/}
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
        } else if (this.state.speciality === "Orthopedics") {
            return (
                <select className="form-control" value={this.state.subspeciality} name="subspeciality" onChange={(e) => this.handleSubSpecialityChange(e)} multiple>
                        {/*<option value="Select One">Select One</option>*/}
                        <option value="Foot and Ankle Surgery">Foot and Ankle Surgery</option>
                        <option value="Hip and Knee Surgery">Hip and Knee Surgery</option>
                        <option value="Musculoskeletal Oncology">Musculoskeletal Oncology</option>
                        <option value="Musculoskeletal Trauma">Musculoskeletal Trauma</option>
                        <option value="Paediatric Orthopaedics">Paediatric Orthopaedics</option>
                        <option value="Shoulder & Elbow Surgery">Shoulder & Elbow Surgery</option>
                        <option value="Spine Surgery">Spine Surgery</option>
                        <option value="Sports medicine">Sports medicine</option>
                        <option value="Department of Hand & Reconstructive Microsurgery Trauma">Department of Hand & Reconstructive Microsurgery Trauma</option>
                </select>
            );
        }
        return;
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps, { updateProfessor })(ProfessorProfile);

