import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel, Col, Row } from 'react-bootstrap';
import { bindAll } from 'lodash';
import axios from 'axios';

import ApproachCases from './ApproachCases';

class SearchByApproach extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showApproachTable: false,
            approach: null,
            finalApproach: null,
            approachCase: ''
        };
        bindAll(this, 'handleApproachChange', 'handleReturnCase');
    }

    handleReturnCase(game){
        this.props.handleReturnCase(game);
    }

    handleApproachChange(e) {
        const options = e.target.options;
        let value = [];
        for (let i = 1, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        if (value.length > 0) {
            this.setState({ approach: value });
            //this.update(value, "approach");
        }
        // const value = e.target.value;
        // this.setState({ approach: value });
        // this.update(value, "approach");
    }

    filterByApproach = () => {
        axios.post('/api/fetchCaseByApproach', {
            approach: this.state.approach
        }).then(res => {
            console.log(res);
            const approachCase = res.data.map(approachCase => {
                return(
                    <div>
                        {approachCase._id}
                    </div>
                );
            });
            this.setState({approachCase: approachCase});
        }).catch(err => {
            console.log(err);
        });
    };

    // renderTable(){
    //
    // }
    render(){
        return(
            <div>
                <FormGroup controlId="formControlsApproach">
                    <ControlLabel style={{ fontSize: "150%" }}>Approach(es)<br />
                        <div style={{ fontSize: "70%", fontWeight:"200"}}>
                            Hold down the Ctrl (Windows) / Command (Mac) button to select multiple options.
                        </div>
                    </ControlLabel>
                    <Row>
                        <Col sm={10}>
                            <FormControl componentClass="select" value={this.state.approach} name="approach" onChange={(e) => this.handleApproachChange(e)} multiple>
                                <option value="Select All Relevant">Select All Relevant</option>
                                <option value="Abdominal Pain">Abdominal Pain</option>
                                <option value="Breathlessness">Breathlessness</option>
                                <option value="Chest Pain">Chest Pain</option>
                                <option value="Confusion">Confusion</option>
                                <option value="Cough">Cough</option>
                                <option value="Diarrhea">Diarrhea</option>
                                <option value="Dizziness">Dizziness</option>
                                <option value="Falls">Falls</option>
                                <option value="Fever">Fever</option>
                                <option value="Gastrointestinal bleed">Gastrointestinal bleed</option>
                                <option value="Headache">Headache</option>
                                <option value="Jaundice">Jaundice</option>
                                <option value="Limb pain">Limb pain</option>
                                <option value="Limb swelling ">Limb swelling</option>
                                <option value="Palpitations">Palpitations</option>
                                <option value="Seizure">Seizure</option>
                                <option value="Syncope">Syncope</option>
                                <option value="Vomiting">Vomiting</option>
                                <option value="Weakness">Weakness</option>
                            </FormControl>
                        </Col>
                        <Col sm={2}>
                            <Button style={{ background: "#199ED8", border: 0 }} bsStyle="primary" onClick={(e) => this.filterByApproach()}>
                                Search
                            </Button>
                        </Col>
                    </Row>
                </FormGroup>
                {this.state.approachCase}
            </div>
        );
    }
}

export default SearchByApproach;