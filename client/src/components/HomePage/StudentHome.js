import React, { Component } from 'react';
import {Button, Table} from 'react-bootstrap';
import {NavLink} from "react-router-dom";
import axios from 'axios';

class StudentHome extends Component {
    state = {
        pendingCases: null
    };

    componentDidMount() {
        axios.get('/api/getVettedCasesSinceUserLogin').then(res => {
            this.setState({pendingCases: res.data});
        }).catch(err => {
            console.log(err);
        })
    }

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