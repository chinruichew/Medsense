import React, { Component } from 'react';
import { bindAll } from 'lodash';
import {Button, Table} from 'react-bootstrap';

import './Home.css';

class Home extends Component {
    constructor(props){
        super(props);
        this.state={
            user:"student",
        }
    }
    render(){
        if (this.state.user==="prof"){
            return(
                <div className="home-container">
                    <div className="picture">
                        <a href="/upload"><img className="left-picture" src="./profUpload.png" /><br/>Create a case.<br/>Share your knowledge!</a>
                        <a href="/vetting"><img src="./profVet.png" /><br/>Vet a case.<br/>There are 20 pending cases!</a>
                    </div>
                    <h3>Latest Discussion Posts</h3><br/>
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
            );
        } else {
            return(
                <div className="home-container">
                    <a href="/challenge"><img src="./stuChallenge.png" height="310" width="470"/><br/>Try a case.<br/>There are 26 new cases!</a><br/>
                    <a href="/upload"><img src="./stuUpload.png" height="310" width="470"/><br/>Create a case.<br/>Share your experiences!</a><br/>
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
            );
        }

    }
}

export default Home;