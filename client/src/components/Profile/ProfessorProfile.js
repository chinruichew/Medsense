import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Button, ControlLabel, FormControl, FormGroup, Image, OverlayTrigger, Popover, Table} from 'react-bootstrap';
import BootstrapModal from '../UI/Modal/VettingBootstrapModal.js';
import { updateProfessor } from '../../actions/index';
import UploadProfilePicture from './UploadProfilePicture';
import axios from 'axios';

class ProfessorProfile extends Component {
    state = {
        id: this.props.id,
        username: this.props.username,
        speciality: this.props.speciality,
        subspeciality: this.props.subspeciality,
        school: this.props.school,
        oldPassword: '',
        newPassword: '',
        newPasswordConfirmation: '',
        contributionRank: null
    };

    componentDidMount(){
        axios.post('/api/calculateContributionPoints').then(res => {
            axios.get('/api/getContributionRank?points=' + res.data).then(res => {
                this.setState({contributionRank: res.data});
                axios.get('/api/getNextContributionRank?rank=' + res.data).then(res => {
                    this.setState({nextContribution: res.data});
                }).catch(err => {
                    console.log(err);
                });
            }).catch(err => {
                console.log(err);
            });
        }).catch(err => {
            console.log(err);
        });
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
                this.setState({ vmShow: false });
            }
        }).catch(() => { })
    };

    setOldPassword = (e) => {
        this.setState({
            oldPassword: e.target.value
        });
    };

    setNewPassword = (e) => {
        this.setState({
            newPassword: e.target.value
        });
    };

    setNewPasswordConfirmation = (e) => {
        this.setState({
            newPasswordConfirmation: e.target.value
        });
    };

    validatePassword = () => {
        let regex = /^.*(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+).*$/;
        if(this.state.newPassword === null || this.state.newPassword.length < 8) {
            window.alert('The password should contain at least 8 characters.');
            return false;
        } else if(!regex.test(this.state.newPassword)) {
            window.alert('The password should contain both letter(s) and number(s).');
            return false;
        }
        return true;
    };

    handlePasswordChange = () => {
        if(this.validatePassword()) {
            axios.post('/api/changePassword', {
                oldPassword: this.state.oldPassword,
                newPassword: this.state.newPassword,
                newPasswordConfirmation: this.state.newPasswordConfirmation
            }).then(res => {
                this.setState({
                    oldPassword: '',
                    newPassword: '',
                    newPasswordConfirmation: ''
                });

                if(res.data !== "Success") {
                    window.alert(res.data);
                } else {
                    window.location.reload();
                }
            }).catch(err => {
                console.log(err);
            });
        } else {
            this.setState({
                oldPassword: '',
                newPassword: '',
                newPasswordConfirmation: ''
            });
        }
    };

    render() {
        let subSpeciality = this.state.subspeciality.map((obj, index) => {
           return <p key={index}>{obj}</p>;
        });

        const popover = (
            <Popover id="popover-trigger-hover" title="Contribution Rank">
                Next Goal: {this.state.nextContribution}
            </Popover>
        );

        const showContributor = this.state.contributionRank === "" ? "" : <td><center>
            <OverlayTrigger trigger={['hover']} placement="top" overlay={popover}><Image src={'https://s3-ap-southeast-1.amazonaws.com/medsense-web-decorator/case-contributor-badges/' + this.state.contributionRank + '.png'} circle style={{width: "3em", height: "3em"}} /></OverlayTrigger>
        </center></td>;
        const contributionRank = this.state.contributionRank === "" ? "" : <td style={{width: '100px'}} ><center>
            <h4> {this.state.contributionRank} </h4>
        </center></td>;

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
                            {showContributor}
                        </tr>
                        <tr>
                            <td style={{width: '100px'}} ><center>
                                <h4 > {this.state.school} </h4>
                            </center></td>
                            <td style={{width: '100px'}} ><center>
                                <h4> {this.state.speciality} </h4>
                            </center></td>
                            <td style={{width: '100px'}} ><center>
                                <h4> {subSpeciality} </h4>
                            </center></td>
                            {contributionRank}
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
                    onHide={(e) => this.setState({ vmShow: false })}
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
                            <div style={{  maxWidth: 200, maxHeight: 30 , paddingTop:'0%', marginBottom: '50px'}}>
                                <Button type="submit" onClick={(e) => this.handleUpdate(e)} bsStyle="primary" bsSize="small" block>
                                    Update Profile
                                </Button>
                            </div>
                        </center>

                        <div className="main-center" style={{paddingTop:'0%', paddingBottom:'0%'}}>
                            <form>
                                <FormGroup>
                                    <ControlLabel>Old Password</ControlLabel>
                                    <FormControl type="password" value={this.state.oldPassword} onChange={this.setOldPassword} />
                                </FormGroup>
                                <FormGroup>
                                    <ControlLabel>New Password</ControlLabel>
                                    <FormControl type="password" value={this.state.newPassword} onChange={this.setNewPassword} />
                                </FormGroup>
                                <FormGroup>
                                    <ControlLabel>Confirm New Password</ControlLabel>
                                    <FormControl type="password" value={this.state.newPasswordConfirmation} onChange={this.setNewPasswordConfirmation} />
                                </FormGroup>
                            </form>
                        </div>

                        <center>
                            <div style={{  maxWidth: 200, maxHeight: 30 , paddingTop:'0%'}}>
                                <Button type="button" onClick={(e) => this.handlePasswordChange(e)} bsStyle="primary" bsSize="small" block>
                                    Change Password
                                </Button>
                            </div>
                        </center>
                    </BootstrapModal.Body>
                    <BootstrapModal.Footer>
                        <Button onClick={(e) => this.setState({ vmShow: false })}>Close</Button>
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

