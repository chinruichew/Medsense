import React, { Component } from 'react';
import {Button, Table} from 'react-bootstrap';
import {NavLink} from "react-router-dom";
import axios from 'axios';

import BootstrapModal from '../UI/Modal/UploadBootstrapModal.js';

class StudentHome extends Component {
    state = {
        pendingCases: null,
        showModal: false,
        year: null
    };

    componentDidMount() {
        // Get vetted cases since last login
        axios.get('/api/getVettedCasesSinceUserLogin').then(res => {
            this.setState({pendingCases: res.data});
        }).catch(err => {
            throw(err);
        });

        // Check for need to prompt user to update year
        axios.get('/api/checkUserToUpdateYear').then(res => {
            this.setState({showModal: res.data});
        }).catch(err => {
            throw(err);
        });
    }

    handleYearChange = (e) => {
        const year = e.target.value;
        this.setState({year});
    };

    submitYear = (e) => {
        axios.post('/api/updateUserfromYearlyPrompt', {
            year: 'Year ' + this.state.year
        }).then(res => {
            console.log(res);
        }).catch(err => {
            throw(err);
        });
    };

    renderContent() {
        switch(this.state.pendingCases) {
            case null:
                return;
            default:
                return(
                    <div className="container-fluid">
                        <div className="text-center">
                            <h2>Welcome back to Medsense</h2>
                        </div><br/><br/>
                        <div className="row">
                            <div className="col-sm-offset-3 col-sm-3 text-center" style={{fontSize:'150%'}}>
                                <NavLink to='/upload'>
                                    <Button style={{background: "white", color: 'black', width: "15em", height: "11em"}} bsSize="large">
                                        <img src="./upload.png" alt="" style={{height:"5em", marginBottom: "3%"}}/>
                                        <br/>Upload a case<br/>
                                        <p style={{color:"#1aa3ff", marginTop:"2%", fontWeight:"bold"}}>Share your experiences</p>
                                    </Button>
                                </NavLink>
                            </div>
                            <div className="col-sm-3  text-center" style={{fontSize:'150%'}}>
                                <NavLink to='/game'>
                                    <Button style={{background: "white", color: 'black', width: "15em", height: "11em"}} bsSize="large">
                                        <img src="./challenge.png" alt="" style={{height:"5em", marginBottom: "3%"}}/>
                                        <br/>Start doing a case<br/>
                                        <p style={{color:"#1aa3ff", marginTop:"2%", fontWeight:"bold"}}> <em>There are {this.state.pendingCases.length} new cases</em></p>
                                    </Button>
                                </NavLink>
                            </div>
                        </div>
                        <br/>
                        <div className="row">
                            <strong><h3 style={{fontStyle:"italic", marginBottom:"1%"}}>Game Recommendations</h3></strong>
                            <Table responsive>
                                <thead>
                                <tr style={{background: '#82C5D9', fontSize:'130%'}}>
                                    <th><center>Case Title</center></th>
                                    <th><center>Approaches</center></th>
                                    <th><center>Speciality</center></th>
                                    <th><center>Sub-speciality</center></th>
                                    <th><center>Difficulty</center></th>
                                    <th><center>Last Updated</center></th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr align="center">
                                    <td>Approach to Abdominal Pain</td>
                                    <td>Abdominal Pain</td>
                                    <td>Medicine</td>
                                    <td>Endocrinology</td>
                                    <td>Beginner</td>
                                    <td>05 Jan 2018<br/>4:51pm</td>
                                    <td><Button  type="button" bsStyle="primary">Try</Button></td>
                                </tr>
                                <tr align="center">
                                    <td>Severe Migraine</td>
                                    <td>Headache</td>
                                    <td>Medicine</td>
                                    <td>Neurology</td>
                                    <td>Beginner</td>
                                    <td>04 Feb 2018<br/>10:41pm</td>
                                    <td><Button  type="button" bsStyle="primary">Try</Button></td>
                                </tr>
                                <tr align="center">
                                    <td>Blood in Stools</td>
                                    <td>Gastrointestinal Bleed</td>
                                    <td>Surgery</td>
                                    <td>Colorectal</td>
                                    <td>Beginner</td>
                                    <td>01 Feb 2018<br/>9:41pm</td>
                                    <td><Button  type="button" bsStyle="primary">Try</Button></td>
                                </tr>
                                </tbody>
                            </Table>

                            <BootstrapModal
                                show={this.state.showModal}
                                onHide={(e) => this.setState({ showModal: false })}
                                aria-labelledby="contained-modal-title-vm">
                                <BootstrapModal.Header closeButton>
                                    <BootstrapModal.Title id="contained-modal-title-vm">Update your year</BootstrapModal.Title>
                                </BootstrapModal.Header>
                                <BootstrapModal.Body>
                                    <p>It is around the start of a new semester! Have you moved on to a new academic year? Update your current year.</p>
                                    <form>
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
                                    </form>
                                </BootstrapModal.Body>
                                <BootstrapModal.Footer>
                                    <Button onClick={(e) => this.submitYear(e)}>Submit</Button>
                                    <Button onClick={(e) => this.setState({ showModal: false })}>Close</Button>
                                </BootstrapModal.Footer>
                            </BootstrapModal>
                        </div>
                    </div>
                );
        }
    }

    render() {
        return(
            <div>
                {this.renderContent()}
            </div>
        );
    }
}

export default StudentHome;