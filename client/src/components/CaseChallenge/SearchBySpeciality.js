import React, { Component } from 'react';
import {Button, FormGroup, FormControl, ControlLabel, Col, Row, Table} from 'react-bootstrap';
import { bindAll } from 'lodash';
import axios from 'axios';

class SearchBySpeciality extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSpecialityTable: false,
            speciality: "Select One",
            subspeciality: null,
            finalSpeciality: "Select One",
            finalSubspeciality: null,
            specialityCases: ''
        };
        bindAll(this, 'handleSpecialityChange', 'handleSubspecialityChange', 'setSubspeciality', 'filterBySpeciality', 'handleReturnCase');
    }

    handleReturnCase(game){
        this.props.handleReturnCase(game);
    }

    handleSpecialityChange(e) {
        const value = e.target.value;
        this.setState({ speciality: value });
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
        }
    }

    filterBySpeciality(){
        this.setState({ showSpecialityTable: true, finalSpeciality: this.state.speciality, finalSubspeciality: this.state.subspeciality });
        axios.post('/api/fetchCaseBySpeciality', {
            speciality: this.state.finalSpeciality,
            subspeciality: this.state.finalSubspeciality
        }).then(res => {
            console.log(res);
            if(res.data.length > 0) {
                const subspecialities = this.state.subspeciality;
                const specialityCases = res.data.map((specialityCase, index) => {
                    let specialities = "";
                    for (let i=0; i<subspecialities.length-1; i++){
                        specialities+=subspecialities[i] + ", ";
                    }
                    specialities+=subspecialities[subspecialities.length-1];

                    let approaches = "";
                    for (let k=0; k<specialityCase.approach.length-1; k++){
                        approaches+=specialityCase.approach[k] + ", ";
                    }
                    approaches+=specialityCase.approach[specialityCase.approach.length-1];

                    let timeStamp = specialityCase.timestamp.split(" ");
                    let date = timeStamp[2]+" "+timeStamp[1]+" "+timeStamp[3];
                    let timeArr = timeStamp[4].split(":");
                    let time = timeArr[0]+":"+timeArr[1];

                    return(
                        <tr align="center" key={specialityCase._id}>
                            <td>{specialityCase.title}</td>
                            <td>{approaches}</td>
                            <td>{specialityCase.speciality}</td>
                            <td>{specialities}</td>
                            <td>{specialityCase.difficulty}</td>
                            <td>{specialityCase.authorname}</td>
                            <td>{date}<br/>{time}</td>
                            <td><Button  type="button" bsStyle="primary" onClick={(e)=>this.handleReturnCase(specialityCase)}>Try</Button></td>
                        </tr>
                    );
                });
                const specialityState = (
                    <Table responsive>
                        <thead>
                        <tr style={{background: '#82C5D9', fontSize: "130%"}}>
                            <th>
                                <center>Case Title</center>
                            </th>
                            <th>
                                <center>Approaches</center>
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
                            <th>
                                <center>Uploaded by</center>
                            </th>
                            <th>
                                <center>Last Updated</center>
                            </th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {specialityCases}
                        </tbody>
                    </Table>
                );
                this.setState({specialityCases: specialityState});
            } else {
                const specialityState = (
                    <div style={{ fontSize: "150%", fontWeight: "200" }}>
                        <br />
                        <img src="./sad.png" hspace='5' alt="No Subspeciality cases" style={{ height: "35px" }} />
                        Sorry, no cases found.  Please try other specialities / sub-specialities!
                    </div>
                );
                this.setState({specialityCases: specialityState});
            }
        }).catch(err => {
            console.log(err);
        });
    }

    setSubspeciality() {
        if (this.state.speciality === "Medicine") {
            return (
                <FormGroup controlId="formControlsSubspeciality">
                    <Col componentClass={ControlLabel} sm={2}>
                        <ControlLabel style={{ fontSize: "120%" }}>Sub-speciality</ControlLabel>
                    </Col>
                    <Col sm={8}>
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
                    </Col>
                </FormGroup>
            );
        } else if (this.state.speciality === "Others") {
            return (
                <FormGroup controlId="formControlsSubspeciality">
                    <Col componentClass={ControlLabel} sm={2}>
                        <ControlLabel style={{ fontSize: "120%" }}>Sub-speciality</ControlLabel>
                    </Col>
                    <Col sm={8}>
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
                    </Col>
                </FormGroup>
            );
        } else if (this.state.speciality === "Surgery") {
            return (
                <FormGroup controlId="formControlsSubspeciality">
                    <Col componentClass={ControlLabel} sm={2}>
                        <ControlLabel style={{ fontSize: "120%" }}>Sub-speciality</ControlLabel>
                    </Col>
                    <Col sm={8}>
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
                    </Col>
                </FormGroup>
            );

        } else if (this.state.speciality === "Clinical Practicum") {
            return (
                <FormGroup controlId="formControlsSubspeciality">
                    <Col componentClass={ControlLabel} sm={2}>
                        <ControlLabel style={{ fontSize: "120%" }}>Sub-speciality</ControlLabel>
                        <br />
                        <div style={{ fontSize: "70%", fontWeight: "200" }}>Hold down the Ctrl (Windows) / Command (Mac) button to select multiple options.
                    </div>
                    </Col>


                    <Col sm={8}>
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
                    </Col>
                </FormGroup>
            );
        }
        return;
    }

    render() {
        return (
            <div>
                <Row>
                    <FormGroup controlId="formControlsSpeciality" style={{ paddingTop: "0", paddingLeft: "0" }}>
                        <Col componentClass={ControlLabel} sm={2}>
                            <ControlLabel style={{ fontSize: "120%", textAlign: "left" }}>Speciality</ControlLabel>
                        </Col>
                        <Col sm={8}>
                            <FormControl componentClass="select" value={this.state.speciality} name="speciality" onChange={(e) => this.handleSpecialityChange(e)}>
                                <option value="Select One">Select One</option>
                                <option value="Clinical Practicum">Clinical Practicum</option>
                                <option value="Medicine">Medicine</option>
                                <option value="Surgery">Surgery</option>
                                <option value="Others">Others</option>
                            </FormControl>
                        </Col>
                        <Col sm={2}>
                            <Button style={{ background: "#199ED8", border: 0 }} bsStyle="primary"
                                    onClick={(e) => this.filterBySpeciality()}>
                                Search
                            </Button>
                        </Col>
                    </FormGroup>
                </Row>
                <Row>
                    {this.setSubspeciality()}
                </Row>
                <br />
                {this.state.specialityCases}
            </div>
        );
    }
}

export default SearchBySpeciality;