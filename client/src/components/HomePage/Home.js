import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Button, Table} from 'react-bootstrap';

import './Home.css';

class Home extends Component {
    renderContent() {
        switch(this.props.auth) {
            case null:
                return;
            default:
                if (this.props.auth.usertype === "professor"){
                    return(
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-sm-6 text-center" style={{fontSize:'150%'}}> 
                                    <a href="/upload"><img className="left-picture" src="./profUpload.png" alt="" /><br/><br/>Create a case.<br/>Share your knowledge!</a>
                                </div>
                                <div className="col-sm-6 text-center" style={{fontSize:'150%'}}>
                                    <a href="/vetting"><img src="./profVet.png" alt="" /><br/><br/>Vet a case.<br/>You have pending cases!</a>
                                </div>
                            </div>
                            <br/>
                            <div className="row">
                                <strong><h3>Latest Discussion Posts</h3></strong><br/>
                                <Table responsive>
                                    <thead >
                                    <tr style={{background: '#D9EDF7', fontSize:'130%'}}>
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
                } else {
                    return(
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-sm-6 text-center" style={{fontSize:'150%'}}> 
                                    <a href="/challenge"><img src="./stuChallenge.png" alt="" height="310" width="470"/><br/><br/>Try a case.<br/>There are 26 new cases!</a><br/>
                                </div>
                                <div className="col-sm-6 text-center" style={{fontSize:'150%'}}>
                                    <a href="/upload"><img src="./stuUpload.png" alt="" height="310" width="470"/><br/><br/>Create a case.<br/>Share your experiences!</a><br/>
                                </div>
                            </div>
                            <br/>
                            <div className="row">
                                <strong><h3>Latest Discussion Replies</h3></strong><br/>
                                <Table responsive>
                                    <thead>
                                    <tr style={{background: '#D9EDF7', fontSize:'130%'}}>
                                        <th><center>Your Post</center></th>
                                        <th><center>Case Title</center></th>
                                        <th><center>Reply</center></th>
                                        <th><center>Replied by</center></th>
                                        <th><center>Date Replied</center></th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr align="center">
                                        <td>Can someone explain Qn1?</td>
                                        <td>Case 1</td>
                                        <td>xxxxx...xxxx</td>
                                        <td>Prof. Chong</td>
                                        <td>05 Nov 2017<br/>16:51</td>
                                        <td><Button  type="button" bsStyle="primary">View</Button></td>
                                    </tr>
                                    <tr align="center">
                                        <td>Key learning points of case 2</td>
                                        <td>Case 2</td>
                                        <td>xxx....xxxxxxx</td>
                                        <td>Kimberly_Yay</td>
                                        <td>04 Nov 2017<br/>22:41</td>
                                        <td><Button  type="button" bsStyle="primary">View</Button></td>
                                    </tr>
                                    <tr align="center">
                                        <td>Why should we ask for "Fever chills rigor"???</td>
                                        <td>Case 10</td>
                                        <td>xxx....xxxx</td>
                                        <td>Cici2</td>
                                        <td>01 Nov 2017<br/>22:41</td>
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

    render(){
        return(
            <div style={{padding:'5%'}}>
                {this.renderContent()}
            </div>
        );
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(Home);