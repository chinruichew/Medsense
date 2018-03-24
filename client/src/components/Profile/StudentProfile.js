import React, { Component } from 'react';
import { connect } from 'react-redux';
import BootstrapModal from '../UI/Modal/VettingBootstrapModal.js';
import axios from 'axios';
import { updateStudent } from '../../actions/index';
import { Button } from 'react-bootstrap';
import { Line } from 'rc-progress';
import UploadProfilePicture from './UploadProfilePicture';
import {Image, Table} from "react-bootstrap";

class StudentProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            username: this.props.username,
            school: this.props.school,
            year: this.props.year,
            vmShow: false,
        };
    }

    componentDidMount(){
        axios.get('/api/calculateUserLevel?xp=' + this.props.auth.points).then(res => {
            console.log(res);
            this.setState({level: res.data});
        });
    }

    handleSchoolChange = (e) =>{
        this.setState({ school: e.target.value });
    };

    handleYearChange = (e) =>{
        this.setState({ year: e.target.value });
    };

    handleEdit = (e) =>{
        this.setState({ vmShow: true });
    };

    handleUpdate = (e) =>{
        e.preventDefault();
        this.props.updateStudent(this.state).then((response) => {
            if (response) {
                this.setState({ vmShow: false });
            }
        }).catch(() => { })
    };

    renderProgressBar = () =>{
        let nextLvlPoints = 480+240*(this.state.level-1)*(this.state.level+2)/2;
        let progress = this.props.auth.points / nextLvlPoints * 100;
        return <Line    percent={progress}
                        strokeWidth="8"
                        trailWidth="8"
                        strokeColor="#82C5D9"
                        strokeLinecap="round"/>
    };

    render() {
        let vmClose = () => this.setState({ vmShow: false });
        return (
            <div>
                <div align="center">
                    <div className="main-center" style={{paddingBottom: "0", paddingTop: "0"}}>
                        <Image src={this.props.auth.profilepicture} style={{width: '18em', marginTop: '10%'}} alt={this.props.auth.username}  circle />
                        <h3> <b>{this.state.username}</b> </h3>
                        <h4 style={{textAlign:"center", marginBottom:"1em"}}>
                            {this.renderProgressBar()}
                            <b>{this.props.auth.points}/{480+240*(this.state.level-1)*(this.state.level+2)/2} XP</b>
                        </h4>
                    </div>
                    <Table  style={{width: '700px'}} >
                        <tr>
                            <td><center>
                                <Image src="./school.png" circle style={{width: "3em", height: "3em", borderRight: "1"}} />
                            </center></td>
                            <td><center>
                                <Image src="./year.png" circle style={{width: "3em", height: "3em"}} />
                            </center></td>
                            <td><center>
                                <Image src="./experience.png" circle style={{width: "3em", height: "3em"}} />
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
                                <h4> Year {this.state.year} </h4>
                            </center></td>
                            <td style={{width: '100px'}} ><center>
                                <h4> {this.props.auth.points} XP </h4>
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
                                    <span className="input-group-addon"><i className="fa fa-graduation-cap fa-lg" aria-hidden="true"></i></span>
                                    <select className="form-control" value={this.state.year} onChange={(e) => this.handleYearChange(e)}>
                                        <option value="1">Year 1</option>
                                        <option value="2">Year 2</option>
                                        <option value="3">Year 3</option>
                                        <option value="4">Year 4</option>
                                        <option value="5">Year 5</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="main-center" style={{paddingTop:'0%', paddingBotoom:'0%'}}>
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
                        <Button onClick={(e) => this.setState({ vmShow: false })}>Close</Button>
                    </BootstrapModal.Footer>
                </BootstrapModal>
            </div>
        )
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps, { updateStudent })(StudentProfile);


