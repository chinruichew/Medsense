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
                                <div className="col-sm-6 text-center">
                                    <a href="/upload"><img className="left-picture" src="./profUpload.png" alt="" /><br/>Create a case.<br/>Share your knowledge!</a>
                                </div>
                                <div className="col-sm-6 text-center">
                                    <a href="/vetting"><img src="./profVet.png" alt="" /><br/>Vet a case.<br/>There are 20 pending cases!</a>
                                </div>
                            </div>
                            <br/>
                            <div className="row">
                                <h3>Latest Discussion Posts</h3>
                                <Table responsive>
                                    <thead >
                                    <tr style={{color: "#82C5D9"}}>
                                        <th>Discussion Post</th>
                                        <th>Authored by</th>
                                        <th>Sub-speciality</th>
                                        <th>Date Posted</th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>Clarification on  case 1 Qn 2 answer</td>
                                        <td>You</td>
                                        <td>Sub-Speciality 1</td>
                                        <td>4:51PM<br/>5 November 2017</td>
                                        <td><Button  type="button" bsStyle="primary">View</Button></td>
                                    </tr>
                                    <tr>
                                        <td>Key learning points of case 2</td>
                                        <td>Prof. Ng</td>
                                        <td>Sub-Speciality 2</td>
                                        <td>10:41PM<br/>4 November 2017</td>
                                        <td><Button  type="button" bsStyle="primary">View</Button></td>
                                    </tr>
                                    <tr>
                                        <td>Why is the answer "Stage1 Colorectal Cancer"???</td>
                                        <td>Ketty123</td>
                                        <td>Sub-Speciality 1</td>
                                        <td>10:41PM<br/>3 November 2017</td>
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
                                <div className="col-sm-6 text-center">
                                    <a href="/challenge"><img src="./stuChallenge.png" alt="" height="310" width="470"/><br/>Try a case.<br/>There are 26 new cases!</a><br/>
                                </div>
                                <div className="col-sm-6 text-center">
                                    <a href="/upload"><img src="./stuUpload.png" alt="" height="310" width="470"/><br/>Create a case.<br/>Share your experiences!</a><br/>
                                </div>
                            </div>
                            <br/>
                            <div className="row">
                                <h3>Latest Discussion Replies</h3><br/>
                                <Table responsive>
                                    <thead>
                                    <tr>
                                        <th>Your Post</th>
                                        <th>Case Title</th>
                                        <th>Reply</th>
                                        <th>Replied by</th>
                                        <th>Date Replied</th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>Can someone explain Qn1?</td>
                                        <td>Case 1</td>
                                        <td>xxxxx...xxxx</td>
                                        <td>Prof. Chong</td>
                                        <td>4:51PM<br/>5 November 2017</td>
                                        <td><Button  type="button" bsStyle="primary">View</Button></td>
                                    </tr>
                                    <tr>
                                        <td>Key learning points of case 2</td>
                                        <td>Case 2</td>
                                        <td>xxx....xxxxxxx</td>
                                        <td>Kimberly_Yay</td>
                                        <td>10:41PM<br/>4 November 2017</td>
                                        <td><Button  type="button" bsStyle="primary">View</Button></td>
                                    </tr>
                                    <tr>
                                        <td>Why should we ask for "Fever chills rigor"???</td>
                                        <td>Case 10</td>
                                        <td>xxx....xxxx</td>
                                        <td>Cici2</td>
                                        <td>10:41PM<br/>1 November 2017</td>
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
            <div>
                {this.renderContent()}
            </div>
        );
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(Home);