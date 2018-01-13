import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Tabs, Tab, FormGroup, FormControl, Table, ControlLabel, Col } from 'react-bootstrap';
import axios from 'axios';
import FilterSubSpecialityOptions from "../CaseVetting/FilterSubSpecialityOptions";


class FindCase extends Component {

    state = {
        showApproachView: true,
        vetId: '',
        filterApproach: null,
        filterSpeciality: "All",
        filterSubspeciality: null,
        renderedCases: '',
        auth: ''
    };


    render() {
        return (
            <div>
                <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                    <Tab eventKey={1} title="Approach">
                        <br />
                        <FormGroup controlId="formControlsApproach">
                            <ControlLabel style={{ fontSize: "150%" }}>Approach(es)<span style={{ color: "red" }}>*</span>
                                <br />
                                <div style={{ fontSize: "70%", fontWeight: "200" }}>
                                    Hold down the Ctrl (Windows) / Command (Mac) button to select multiple options.
                                </div>
                            </ControlLabel>
                            <Col sm={10}>
                            <FormControl componentClass="select" name="approach" multiple>
                                Approaches
                            </FormControl>
                            </Col>
                            <Col sm={2}> <Button type="button" bsStyle="primary">Search</Button></Col>
                        </FormGroup>
                    </Tab>
                    <Tab eventKey={2} title="Speciality & Sub-speciality">
                        <br />
                        <Form horizontal>
                            <FormGroup controlId="formControlsSpeciality">
                                <Col componentClass={ControlLabel} sm={2}>
                                    Filter by Speciality
                                </Col>
                                <Col sm={3}>
                                    
                                </Col>
                                <Col componentClass={ControlLabel} sm={2}>
                                    Filter by Sub-speciality
                                </Col>
                                <Col sm={3}>
                                    
                                </Col>
                                <Col sm={1}></Col>
                                <Button type="button" bsStyle="primary">Search</Button>
                            </FormGroup>
                        </Form>
                    </Tab>
                </Tabs>
            </div>
        );
    }


}

export default FindCase;