import React, { Component } from 'react';
import {Button, Table} from 'react-bootstrap';
import {NavLink} from "react-router-dom";

class ProfessorHome extends Component {
    state = {
        unvetCases: this.props.unvetCases
    };

    render() {
        switch(this.state.unvetCases) {
            case null:
                return;
            default:
                const unvetCases = this.state.unvetCases;
                const userSubSpeciality = this.props.user.subspeciality;
                let numCasesPending = 0;
                let toVet = false;
                for(let i = 0; i < unvetCases.length; i++) {
                    const caseSubspecialities = unvetCases[i].subspeciality;
                    for(let j = 0; j < caseSubspecialities.length; j++) {
                        const caseSubspeciality = caseSubspecialities[j];
                        for(let k = 0; k < userSubSpeciality.length; k++) {
                            if(caseSubspeciality === userSubSpeciality[k]) {
                                toVet = true;
                            }
                        }
                    }
                    if(toVet) {
                        numCasesPending += 1;
                    }
                    toVet = false;
                }
                return(
                    <div className="container-fluid">
                        <div className="text-center">
                            <h2>Welcome back to Medsense</h2>
                        </div><br/><br/>
                        <div className="row">
                            <div className="col-sm-offset-3 col-sm-3 text-center" style={{fontSize:'150%'}}>
                                <NavLink to='/upload'>
                                    <Button style={{background: "white", color: 'black', width: "15em", height: "11em"}} bsSize="large">
                                        <img className="left-picture" src="./upload.png" alt="" style={{height:"5em", marginBottom: "3%"}}/>
                                        <br/>Upload a case <br/>
                                        <p style={{color:"#1aa3ff", marginTop:"2%", fontWeight:"bold"}}>Share your knowledge</p>
                                    </Button>
                                </NavLink>
                            </div>
                            <div className="col-sm-3 text-center" style={{fontSize:'150%'}}>
                                <NavLink to='/vetting'>
                                    <Button style={{background: "white", color: 'black', width: "15em", height: "11em"}} bsSize="large">
                                        <img src="./vet.png" alt="" style={{height:"5em", marginBottom: "3%"}}/>
                                        <br/>Vet a case<br/>
                                        <p style={{color:"#1aa3ff", marginTop:"2%", fontWeight:"bold"}}> <em>You have {numCasesPending} pending cases</em></p>
                                    </Button>
                                </NavLink>
                            </div>
                        </div>
                        <br/>
                        <div className="row">
                            <strong><h3 style={{fontStyle:"italic", marginBottom:"1%"}}>Upload Recommendations</h3></strong>
                            <Table responsive>
                                <thead >
                                <tr style={{background: '#82C5D9', fontSize:'130%'}}>
                                    <th><center>S/N</center></th>
                                    <th><center>Approach</center></th>
                                    <th><center>Sub-speciality</center></th>
                                    <th><center>Difficulty</center></th>
                                    <th><center>Recommended Time Limit</center></th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr align="center">
                                    <td>1</td>
                                    <td>Cough</td>
                                    <td>Respiratory & Critical Care Medicine</td>
                                    <td>Beginner</td>
                                    <td>5min (MCQ)<br/>12min (Open-ended)</td>
                                    <td><Button  type="button" bsStyle="primary">Upload</Button></td>
                                </tr>
                                <tr align="center">
                                    <td>2</td>
                                    <td>Dizziness</td>
                                    <td>Respiratory & Critical Care Medicine</td>
                                    <td>Advanced</td>
                                    <td>5min (MCQ)<br/>8min (Open-ended)</td>
                                    <td><Button  type="button" bsStyle="primary">Upload</Button></td>
                                </tr>
                                <tr align="center">
                                    <td>3</td>
                                    <td>Palpitations</td>
                                    <td>Cardiology</td>
                                    <td>Beginner</td>
                                    <td>2min (MCQ)<br/>10min (Open-ended)</td>
                                    <td><Button  type="button" bsStyle="primary">Upload</Button></td>
                                </tr>
                                </tbody>
                            </Table>
                        </div>
                    </div>
                );
        }
    }
}

export default ProfessorHome;