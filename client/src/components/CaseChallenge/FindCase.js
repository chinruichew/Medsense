import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Tabs, Tab, FormGroup, FormControl, Table, ControlLabel, Col, Row } from 'react-bootstrap';
//import axios from 'axios';
import { bindAll } from 'lodash';

class FindCase extends Component {

    constructor(props) {
        super(props);
        this.state = {
            itemsToShow: 3,
            expanded: false,
            expandableList: [],
        };
        bindAll(this, 'showMore', 'displayMore', 'filterByApproach', 'filterBySpeciality', 'handleApproachChange');
    }

    showMore(approachList) {
        const list = ['Apple', 'Orange', 'Peach', 'Banana'];//this should be approachList
        this.state.itemsToShow === 3 ? (
            this.setState({ itemsToShow: list.length, expanded: true })
        ) : (
                this.setState({ itemsToShow: 3, expanded: false })
            )
    }

    displayMore(anyList) {
        const list = ['Apple', 'Orange', 'Peach', 'Banana'];//this should be approachList
        let result = "";
        for (let i = 0; i < this.state.itemsToShow; i++) {
            result = result + list[i] + "\n";
        }
        //return result;
        return (
            <div>
                {result.split("\n").map(i => {
                    return <div>{i}</div>;
                })}
            </div>);

    }

    filterByApproach(approachList) {
        //search case by approach
        //Display data retrieved from DB
        if (true) {
            return (
                <Table responsive>
                    <thead>
                        <tr style={{ background: '#D9EDF7', fontSize: "130%" }}>
                            <th><center>Case Title</center></th>
                            <th><center>Additional Approach</center></th>
                            <th><center>Speciality</center></th>
                            <th><center>Sub-Speciality</center></th>
                            <th><center>Difficulty Level</center></th>
                            <th><center>Uploaded by</center></th>
                            <th><center>Upload Date</center></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr align="center">
                            <td>Case Title</td>
                            <td>{this.displayMore(['Approach1', 'Approach2'])}
                                <a onClick={(e) => this.showMore(['Approach1', 'Approach2'])}>
                                    {this.state.expanded ? (
                                        <Button bsStyle="link">Show Less</Button>
                                    ) : (
                                            <Button bsStyle="link">Show More</Button>
                                        )
                                    }
                                </a>
                            </td>
                            <td>speciality</td>
                            <td>
                            {this.displayMore(['Approach1', 'Approach2'])}
                                <a onClick={(e) => this.showMore(['Approach1', 'Approach2'])}>
                                    {this.state.expanded ? (
                                        <Button bsStyle="link">Show Less</Button>
                                    ) : (
                                            <Button bsStyle="link">Show More</Button>
                                        )
                                    }
                                </a>
                            </td>
                            <td>difficulty level</td>
                            <td>upload by</td>
                            <td>upload date</td>
                            <td><Button bsStyle="primary">TRY</Button></td>
                        </tr>
                    </tbody>
                </Table>
            );
        } else {
            return (
                <div style={{ fontSize: "150%", fontWeight: "200" }}>
                    <br />
                    <img src="./sad.png" hspace='5' alt="" style={{ height: "35px" }} />
                    Sorry, no cases found.  Please try other approaches!
                </div>
            );
        }
    }


    filterBySpeciality(Spe, SubspeList) {
        //search case by speciality and sub-speciality list
        //Display data retrieved from DB
        if (true) {
            return (
                <Table responsive>
                    <thead>
                        <tr style={{ background: '#D9EDF7', fontSize: "130%" }}>
                            <th><center>Case Title</center></th>
                            <th><center>Approach</center></th>
                            <th><center>Difficulty Level</center></th>
                            <th><center>Uploaded by</center></th>
                            <th><center>Upload Date</center></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr align="center">
                            <td>Case Title</td>
                            <td>{this.displayMore(['Approach1', 'Approach2'])}
                                <a onClick={(e) => this.showMore(['Approach1', 'Approach2'])}>
                                    {this.state.expanded ? (
                                        <Button bsStyle="link">Show Less</Button>
                                    ) : (
                                            <Button bsStyle="link">Show More</Button>
                                        )
                                    }
                                </a>

                            </td>
                            <td>beginner</td>
                            <td>upload by</td>
                            <td>upload date</td>
                            <td><Button bsStyle="primary">TRY</Button></td>
                        </tr>
                    </tbody>
                </Table>
            );
        } else {
            return (
                <div style={{ fontSize: "150%", fontWeight: "200" }}>
                    <br />
                    <img src="./sad.png" hspace='5' alt="" style={{ height: "35px" }} />
                    Sorry, no cases found.  Please try other specialities / sub-specialities!
                </div>
            );
        }
    }

    handleApproachChange(e) {
        // const value = e.target.value;
        // this.setState({ approach: value });
        // this.update(value, "approach");
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
    }

    handleSpecialityChange(e) {
        const value = e.target.value;
        this.setState({ speciality: value });
        //this.update(value, "speciality");
    }
    handleSubspecialityChange(e) {
        const options = e.target.options;
        let value = [];
        for (let i = 1, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        if (value.length > 0) {
            this.setState({ subspeciality: value });
            //this.update(value, "subspeciality");
        }
    }

    setSubspeciality() {
        
                if (this.state.speciality === "Medicine") {
                    return (
                        <FormGroup controlId="formControlsSubspeciality">
                            <ControlLabel>Sub-speciality<span style={{color:"red"}}>*</span></ControlLabel>
                            <FormControl componentClass="select" value={this.state.subspeciality} name="subspeciality" onChange={(e) => this.handleSubspecialityChange(e)}>
                                <option value="Select One">Select One</option>
                                <option value="Cardiology">Cardiology</option>
                                <option value="Endocrinology">Endocrinology</option>
                                <option value="Gastroenterology & Hepatology">Gastroenterology & Hepatology</option>
                                <option value="Haematology">Haematology</option>
                                <option value="Internal Medicine">Internal Medicine</option>
                                <option value="Medical Oncology">Medical Oncology</option>
                                <option value="Neurology">Neurology</option>
                                <option value="Renal Medicine">Renal Medicine</option>
                                <option value="Respiratory & Critical Care Medicine">Respiratory & Critical Care Medicine</option>
                                <option value="Rheumatology & Immunology">Rheumatology & Immunology</option>
                            </FormControl>
                        </FormGroup>
                    );
                } else if (this.state.speciality === "Others") {
                    return (
                        <FormGroup controlId="formControlsSepciality">
                            <ControlLabel>Sub-speciality<span style={{color:"red"}}>*</span></ControlLabel>
                            <FormControl componentClass="select" value={this.state.subspeciality} name="subspeciality" onChange={(e) => this.handleSubspecialityChange(e)}>
                                <option value="Select One">Select One</option>
                                <option value="Anaesthesiology">Anaesthesiology</option>
                                <option value="Ear Nose & Throat">Ear Nose & Throat</option>
                                <option value="Emergency Medicine">Emergency Medicine</option>
                                <option value="Geriatric Medicine">Geriatric Medicine</option>
                                <option value="Infectious Diseases">Infectious Diseases</option>
                                <option value="Neonatal">Neonatal</option>
                                <option value="Obstetrics & Gynaecology">Obstetrics & Gynaecology</option>
                                <option value="Ophthalmology">Ophthalmology</option>
                                <option value="Palliative Medicine">Palliative Medicine</option>
                                <option value="Psychiatry">Psychiatry</option>
                                <option value="Rehabilitation Medicine">Rehabilitation Medicine</option>
                            </FormControl>
                        </FormGroup>
                    );
                } else if (this.state.speciality === "Surgery") {
                    return (
                        <FormGroup controlId="formControlsSepciality">
                            <ControlLabel>Sub-speciality<span style={{color:"red"}}>*</span></ControlLabel>
                            <FormControl componentClass="select" value={this.state.subspeciality} name="subspeciality" onChange={(e) => this.handleSubspecialityChange(e)}>
                                <option value="Select One">Select One</option>
                                <option value="Breast">Breast</option>
                                <option value="Colorectal">Colorectal</option>
                                <option value="General Surgery">General Surgery</option>
                                <option value="Head & Neck">Head & Neck</option>
                                <option value="Hepato-pancreato-biliary">Hepato-pancreato-biliary</option>
                                <option value="Surgical Oncology">Surgical Oncology</option>
                                <option value="Upper Gastrointestinal & Bariatric Surgery">Upper Gastrointestinal & Bariatric Surgery</option>
                                <option value="Urology">Urology</option>
                                <option value="Vascular Surgery">Vascular Surgery</option>
                            </FormControl>
                        </FormGroup>
                    );
                } else if (this.state.speciality === "Clinical Practicum") {
                    return (
                        <FormGroup controlId="formControlsSubspeciality">
                            <ControlLabel>Sub-speciality<span style={{color:"red"}}>*</span>
                                <br />
                                <div style={{ fontSize: "70%", fontWeight:"200"}}>Hold down the Ctrl (Windows) / Command (Mac) button to select multiple options.
                                </div>
                            </ControlLabel>
                            <FormControl componentClass="select" value={this.state.subspeciality} name="subspeciality" onChange={(e) => this.handleSubspecialityChange(e)} multiple>
                                <option value="Select One">Select All Relevant</option>
                                <option value="Anaesthesiology">Anaesthesiology</option>
                                <option value="Breast">Breast</option>
                                <option value="Cardiology">Cardiology</option>
                                <option value="Colorectal">Colorectal</option>
                                <option value="Ear Nose & Throat">Ear Nose & Throat</option>
                                <option value="Emergency Medicine">Emergency Medicine</option>
                                <option value="Endocrinology">Endocrinology</option>
                                <option value="Gastroenterology & Hepatology">Gastroenterology & Hepatology</option>
                                <option value="General Surgery">General Surgery</option>
                                <option value="Geriatric Medicine">Geriatric Medicine</option>
                                <option value="Haematology">Haematology</option>
                                <option value="Head & Neck">Head & Neck</option>
                                <option value="Hepato-pancreato-biliary">Hepato-pancreato-biliary</option>
                                <option value="Infectious Diseases">Infectious Diseases</option>
                                <option value="Internal Medicine">Internal Medicine</option>
                                <option value="Medical Oncology">Medical Oncology</option>
                                <option value="Neonatal">Neonatal</option>
                                <option value="Neurology">Neurology</option>
                                <option value="Obstetrics & Gynaecology">Obstetrics & Gynaecology</option>
                                <option value="Ophthalmology">Ophthalmology</option>
                                <option value="Palliative Medicine">Palliative Medicine</option>
                                <option value="Psychiatry">Psychiatry</option>
                                <option value="Rehabilitation Medicine">Rehabilitation Medicine</option>
                                <option value="Renal Medicine">Renal Medicine</option>
                                <option value="Respiratory & Critical Care Medicine">Respiratory & Critical Care Medicine</option>
                                <option value="Rheumatology & Immunology">Rheumatology & Immunology</option>
                                <option value="Surgical Oncology">Surgical Oncology</option>
                                <option value="Upper Gastrointestinal & Bariatric Surgery">Upper Gastrointestinal & Bariatric Surgery</option>
                                <option value="Urology">Urology</option>
                                <option value="Vascular Surgery">Vascular Surgery</option>
                            </FormControl>
                        </FormGroup>
                    );
                }
        
                return;
            }

    render() {
        return (
            <div>
                <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                    <Tab eventKey={1} title="Approach">
                        <br />
                        <Form>
                            <FormGroup controlId="formControlsApproach">
                                <ControlLabel style={{ fontSize: "150%" }}>Approach(es)<span style={{ color: "red" }}>*</span>
                                    <br />
                                    <div style={{ fontSize: "70%", fontWeight: "200" }}>
                                        Hold down the Ctrl (Windows) / Command (Mac) button to select multiple options.
                                    </div>
                                </ControlLabel>
                                <Row>
                                    <Col sm={10}>
                                        <FormControl componentClass="select" value={this.state.approach} name="approach" onChange={(e) => this.handleApproachChange(e)} multiple>
                                            {/*<FormControl componentClass="select" value={this.state.approach} name="approach" onChange={(e) => this.handleApproachChange(e)}>*/}
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
                                        <Button type="button" bsStyle="primary" onClick={(e)=>this.filterByApproach(['approachList'])}>Search</Button>
                                    </Col>
                                </Row>
                            </FormGroup>
                        </Form>
                        {this.filterByApproach('approachList')}
                    </Tab>
                    <Tab eventKey={2} title="Speciality & Sub-speciality">
                        <br />
                        <Form horizontal>
                        <FormGroup controlId="formControlsSepciality" style={{paddingBottom:"0"}}>
                    <ControlLabel style={{ fontSize: "150%"}}>Filter by Speciality</ControlLabel>
                    <FormControl componentClass="select" value={this.state.speciality} name="speciality" onChange={(e) => this.handleSpecialityChange(e)}>
                        <option value="Select One">Select One</option>
                        <option value="Clinical Practicum">Clinical Practicum</option>
                        <option value="Medicine">Medicine</option>
                        <option value="Surgery">Surgery</option>
                        <option value="Others">Others</option>
                    </FormControl>
                    <ControlLabel style={{ fontSize: "150%"}}>Filter by Sub-Speciality</ControlLabel>
                    {this.setSubspeciality()}
                </FormGroup>
                <Button type="button" bsStyle="primary" onClick={this.filterBySpeciality}>Search</Button>
                        </Form>
                        <br />
                        {this.filterBySpeciality('Spe', 'SubspeList')}
                    </Tab>
                </Tabs>
            </div>
        );
    }


}

// function mapStateToProps2({vettedCases}) {
//     return {
//         vettedCases
//     };
// }

// export default connect(mapStateToProps2, {fetchVettedCases})(VettedCases);
export default FindCase;