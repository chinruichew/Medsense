import React, { Component } from 'react';
import {Button, FormGroup, FormControl, ControlLabel, Col, Row} from 'react-bootstrap';
import axios from 'axios';

import "./Game.css";

class SearchByApproach extends Component {
    state = {
        showApproachTable: false,
        approach: null,
        approachCase: null,
        approachList: [],
        answers: null
    };

    componentDidMount() {
        axios.get('/api/fetchAnswers').then(res => {
            this.setState({
                answers: res.data
            })
        }).catch(err => {
            console.log(err);
        });

        axios.post('/api/fetchCasesApproach', {
        }).then(res => {
            this.setState({approachList:res.data.sort()});
        });

        this.node.scrollIntoView();
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
                const approachCase = res.data.map(approachCase => {
                    const allApproaches = approachCase.approach;
                    let allApproachString = "";
                    for (let k = 0; k < allApproaches.length - 1; k++) {
                        allApproachString += allApproaches[k] + ", ";
                    }
                    allApproachString += allApproaches[allApproaches.length - 1];

                    let numAttempts = 0;
                    for(let i = 0; i < this.state.answers.length; i++) {
                        const answer = this.state.answers[i];
                        numAttempts = answer.case._id === approachCase._id? numAttempts+1: numAttempts;
                    }
                    const attemptDisplay = numAttempts > 1? 'Attempts': 'Attempt';

                    let picName = "./" + approachCase.subspeciality[0] + ".png";
                    const caseBox = <Button onClick={(e)=>this.handleReturnCase(approachCase)} className="case-button" bsSize="large">
                        <img src={picName} onError={(e)=>{e.target.src="./Other Subspeciality.png"}}/>
                        <h3 className="case-title">{approachCase.title}</h3>
                        <h4>{approachCase.difficulty}</h4>
                        <h5 className="display-list">{allApproachString}</h5>
                        <h5>{numAttempts} {attemptDisplay}</h5>
                    </Button>;

                    return(
                        <Col md={4}>
                            {caseBox}
                        </Col>
                    );
                });

                const approachState = (
                    <div className="row search-result">{approachCase}</div>
                );
                this.setState({approachCase: approachState});
            } else {
                const approachState = (
                    <div className="search-result" style={{ fontSize: "150%", fontWeight: "200" }}>
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

    renderContent = () =>{
        switch(this.state.answers) {
            case null:
                return;
            default:
                let approaches = this.state.approachList.map((obj, index) => {
                    return <option value={obj}>{obj}</option>;
                });
                return(
                    <div ref={node => this.node = node}>
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
    };

    render(){
        return(
            <div ref={node => this.node = node}>
                {this.renderContent()}
            </div>
        );
    }
}

export default SearchByApproach;