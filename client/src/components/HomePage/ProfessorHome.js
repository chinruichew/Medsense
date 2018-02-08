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
                for(let i = 0; i < userSubSpeciality.length; i++) {
                    for(let j = 0; j < unvetCases.length; j++) {
                        if(unvetCases[j] === userSubSpeciality[i]) {
                            toVet = true;
                            break;
                        }
                    }
                }
                if(toVet) {
                    numCasesPending += 1;
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
                            <strong><h3 style={{fontStyle:"italic", marginBottom:"1%"}}>Latest Discussion Posts</h3></strong>
                            <Table responsive>
                                <thead >
                                <tr style={{background: '#82C5D9', fontSize:'130%'}}>
                                    <th><center>Discussion Post</center></th>
                                    <th><center>Authored by</center></th>
                                    <th><center>Sub-speciality</center></th>
                                    <th><center>Date Posted</center></th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr align="center">
                                    <td>Clarification on  case 1 Qn 2 answer</td>
                                    <td>You</td>
                                    <td>Sub-Speciality 1</td>
                                    <td>05 Nov 2017<br/>16:51</td>
                                    <td><Button  type="button" bsStyle="primary">View</Button></td>
                                </tr>
                                <tr align="center">
                                    <td>Key learning points of case 2</td>
                                    <td>Prof. Ng</td>
                                    <td>Sub-Speciality 2</td>
                                    <td>04 Nov 2017<br/>22:41</td>
                                    <td><Button  type="button" bsStyle="primary">View</Button></td>
                                </tr>
                                <tr align="center">
                                    <td>Why is the answer "Stage1 Colorectal Cancer"???</td>
                                    <td>Ketty123</td>
                                    <td>Sub-Speciality 1</td>
                                    <td>03 Nov 2017<br/>22:41</td>
                                    <td><Button  type="button" bsStyle="primary">View</Button></td>
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