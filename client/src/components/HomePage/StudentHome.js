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
                                <NavLink to='/search'>
                                    <Button style={{background: "white", color: 'black', width: "15em", height: "11em"}} bsSize="large">
                                        <img src="./challenge.png" alt="" style={{height:"5em", marginBottom: "3%"}}/>
                                        <br/>Start doing a case<br/>
                                        <p style={{color:"#1aa3ff", marginTop:"2%", fontWeight:"bold"}}> <em>There are {this.state.pendingCases.length} new cases</em></p>
                                    </Button>
                                </NavLink>
                            </div>
                        </div>
                        <br/>
                        {/*<div className="row">*/}
                            {/*<strong><h3 style={{fontStyle:"italic", marginBottom:"1%"}}>Latest Discussion Replies</h3></strong>*/}
                            {/*<Table responsive>*/}
                                {/*<thead>*/}
                                {/*<tr style={{background: '#82C5D9', fontSize:'130%'}}>*/}
                                    {/*<th><center>Your Post</center></th>*/}
                                    {/*<th><center>Case Title</center></th>*/}
                                    {/*<th><center>Reply</center></th>*/}
                                    {/*<th><center>Replied by</center></th>*/}
                                    {/*<th><center>Date Replied</center></th>*/}
                                    {/*<th></th>*/}
                                {/*</tr>*/}
                                {/*</thead>*/}
                                {/*<tbody>*/}
                                {/*<tr align="center">*/}
                                    {/*<td>Can someone explain Qn1?</td>*/}
                                    {/*<td>Case 1</td>*/}
                                    {/*<td>xxxxx...xxxx</td>*/}
                                    {/*<td>Prof. Chong</td>*/}
                                    {/*<td>05 Nov 2017<br/>16:51</td>*/}
                                    {/*<td><Button  type="button" bsStyle="primary">View</Button></td>*/}
                                {/*</tr>*/}
                                {/*<tr align="center">*/}
                                    {/*<td>Key learning points of case 2</td>*/}
                                    {/*<td>Case 2</td>*/}
                                    {/*<td>xxx....xxxxxxx</td>*/}
                                    {/*<td>Kimberly_Yay</td>*/}
                                    {/*<td>04 Nov 2017<br/>22:41</td>*/}
                                    {/*<td><Button  type="button" bsStyle="primary">View</Button></td>*/}
                                {/*</tr>*/}
                                {/*<tr align="center">*/}
                                    {/*<td>Why should we ask for "Fever chills rigor"???</td>*/}
                                    {/*<td>Case 10</td>*/}
                                    {/*<td>xxx....xxxx</td>*/}
                                    {/*<td>Cici2</td>*/}
                                    {/*<td>01 Nov 2017<br/>22:41</td>*/}
                                    {/*<td><Button  type="button" bsStyle="primary">View</Button></td>*/}
                                {/*</tr>*/}
                                {/*</tbody>*/}
                            {/*</Table>*/}
                        {/*</div>*/}
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