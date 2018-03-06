import React, { Component } from 'react';
import {Button, FormGroup, FormControl, ControlLabel, Col, Row, Table} from 'react-bootstrap';
import axios from 'axios';
import moment from "moment";

class SearchByApproach extends Component {
    state = {
        showApproachTable: false,
        approach: null,
        approachCase: null,
        approachList: []
    };

    componentDidMount(){
        axios.post('/api/fetchCasesApproach', {
        }).then(res => {
            this.setState({approachList:res.data.sort()});
        });
    }

    handleReturnCase = (game) => {
        this.props.handleReturnCase(game);
    };

    handleApproachChange = (e) => {
        const options = e.target.options;
        let value = [];
        for (let i = 1, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        if (value.length > 0) {
            this.setState({ approach: value });
        }
    };

    filterByApproach = () => {
        axios.post('/api/fetchCaseByApproach', {
            approach: this.state.approach
        }).then(res => {
            if(res.data.length > 0) {
                const approaches = this.state.approach;
                const approachCase = res.data.map(approachCase => {
                    let same = false;
                    let additionalApproaches = [];
                    for (let i=0; i<approachCase.approach.length; i++){
                        for (let j=0; j<approaches.length; j++){
                            if (approachCase.approach[i]===approaches[j]){
                                same = true;
                            }
                        }
                        if(!same){
                            additionalApproaches.push(approachCase.approach[i]);
                        }
                        same = true;
                    }

                    let additionalApproach = "";
                    if(additionalApproaches.length === 0){
                        additionalApproach = "-";
                    } else {
                        for (let k = 0; k < additionalApproaches.length - 1; k++) {
                            additionalApproach += additionalApproaches[k] + ", ";
                        }
                        additionalApproach += additionalApproaches[additionalApproaches.length - 1];
                    }

                    const subspecialities = approachCase.subspeciality;
                    let specialities = "";
                    for (let i=0; i<subspecialities.length-1; i++){
                        specialities+=subspecialities[i] + ", ";
                    }
                    specialities+=subspecialities[subspecialities.length-1];

                    let dateTime = moment(approachCase.uploadTime).format('Do MMMM YYYY h:mm a');
                    let date = dateTime.substring(0,dateTime.length-8);
                    let time = dateTime.substring(dateTime.length-8,dateTime.length);

                    return(
                        <tr align="center" key={approachCase._id}>
                            <td>{approachCase.title}</td>
                            <td>{additionalApproach}</td>
                            <td>{approachCase.speciality}</td>
                            <td>{specialities}</td>
                            <td>{approachCase.difficulty}</td>
                            {/*<td>{approachCase.authorid.username}</td>*/}
                            <td>{date}<br/>{time}</td>
                            <td><Button  type="button" bsStyle="primary" onClick={(e)=>this.handleReturnCase(approachCase)}>Try</Button></td>
                        </tr>
                    );
                });
                const approachState = (
                    <Table responsive>
                        <thead>
                        <tr style={{background: '#82C5D9', fontSize: "130%"}}>
                            <th>
                                <center>Case Title</center>
                            </th>
                            <th>
                                <center>Additional Approaches</center>
                            </th>
                            <th>
                                <center>Speciality</center>
                            </th>
                            <th>
                                <center>Sub-speciality</center>
                            </th>
                            <th>
                                <center>Difficulty Level</center>
                            </th>
                            {/*<th>*/}
                                {/*<center>Uploaded by</center>*/}
                            {/*</th>*/}
                            <th>
                                <center>Last Updated</center>
                            </th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {approachCase}
                        </tbody>
                    </Table>
                );
                this.setState({approachCase: approachState});
            } else {
                const approachState = (
                    <div style={{ fontSize: "150%", fontWeight: "200" }}>
                        <br />
                        <img src="./sad.png" hspace='5' alt="" style={{ height: "35px" }} />
                        Sorry, no cases found.  Please try other approaches!
                    </div>
                );
                this.setState({approachCase: approachState});
            }
        }).catch(err => {
            console.log(err);
        });
    };

    render(){
        let approaches = this.state.approachList.map((obj, index) => {
            return <option value={obj}>{obj}</option>;
        });
        return(
            <div>
                <FormGroup controlId="formControlsApproach" style={{ paddingTop: "0", paddingLeft: "7%" }}>
                    <Col smOffset={0.5}>
                    <ControlLabel style={{ fontSize: "150%" }}>Approach(es)<br />
                        <div style={{ fontSize: "60%", fontWeight:"200"}}>
                            Hold down the Ctrl (Windows) / Command (Mac) button to select multiple options.
                        </div>
                    </ControlLabel>
                    <Row>
                        <Col sm={10}>
                            <FormControl componentClass="select" size='5' value={this.state.approach} name="approach" onChange={(e) => this.handleApproachChange(e)} multiple>
                                <option value="Select All Relevant">Select All Relevant</option>
                                {approaches}
                            </FormControl>
                        </Col>
                        <Col sm={2}>
                            <Button style={{ background: "#199ED8", border: 0 }} bsStyle="primary" onClick={(e) => this.filterByApproach()}>
                                Search
                            </Button>
                        </Col>
                    </Row>
                    </Col>
                </FormGroup>
                <br/>
                {this.state.approachCase}
            </div>
        );
    }
}

export default SearchByApproach;