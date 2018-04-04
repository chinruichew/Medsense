import React, { Component } from 'react';
import {Button, FormGroup, FormControl, ControlLabel, Col, Row} from 'react-bootstrap';
import { bindAll } from 'lodash';
import axios from 'axios';
import "./Game.css";

class SearchBySpeciality extends Component {
    state = {
        showSpecialityTable: false,
        speciality: "Select One",
        subspeciality: "Select One",
        specialityCases: '',
        specialityList: [],
        subspecialityList: [],
        answers: null
    };

    componentDidMount(){
        axios.get('/api/fetchAnswers').then(res => {
            this.setState({
                answers: res.data
            })
        }).catch(err => {
            console.log(err);
        });

        axios.post('/api/fetchCasesSpeciality', {
        }).then(res => {
            this.setState({specialityList:res.data.sort()});
        });
        // this.node.scrollIntoView();
    }

    handleReturnCase(game){
        this.props.handleReturnCase(game);
    }

    handleSpecialityChange(e) {
        const value = e.target.value;
        this.setState({ speciality: value });
        if (value==="Select One") {
            this.setState({subspecialityList: []});
        } else {
            axios.post('/api/fetchCasesSubspeciality', {
                speciality: value,
            }).then(res => {
                this.setState({subspecialityList: res.data.sort()});
            });
        }
    }

    handleSubspecialityChange = (e) => {
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
    };

    filterBySpeciality = () => {
        this.setState({ showSpecialityTable: true});
        axios.post('/api/fetchCaseBySpeciality', {
            speciality: this.state.speciality,
            subspeciality: this.state.subspeciality
        }).then(res => {
            if(res.data.length > 0) {
                const subspecialities = this.state.subspeciality;
                const specialityCases = res.data.map((specialityCase, index) => {
                    let specialities = "";
                    if (subspecialities!=="Select One") {
                        const subspeciality = specialityCase.subspeciality;

                        for (let i = 0; i < subspeciality.length - 1; i++) {
                            specialities += subspeciality[i] + ", ";
                        }
                        specialities += subspeciality[subspeciality.length - 1];

                        let numAttempts = 0;
                        for(let i = 0; i < this.state.answers.length; i++) {
                            const answer = this.state.answers[i];
                            numAttempts = answer.case._id === specialityCase._id? numAttempts+1: numAttempts;
                        }
                        const attemptDisplay = numAttempts > 1? 'Attempts': 'Attempt';

                        let picName = "./" + specialityCase.approach[0] + ".png";
                        const caseBox = <Button onClick={(e)=>this.handleReturnCase(specialityCase)} className="case-button" bsSize="large">
                            <img src={picName} onError={(e)=>{e.target.src="./Other Approach.png"}}/>
                            <h3 className="case-title">{specialityCase.title}</h3>
                            <h4>{specialityCase.difficulty}</h4>
                            <h5 className="display-list">{specialities}</h5>
                            <h5>{numAttempts} {attemptDisplay}</h5>
                        </Button>;

                        return(
                            <Col md={4}>
                                {caseBox}
                            </Col>
                        );
                    }
                });
                const specialityState = (
                    <div className="row search-result">{specialityCases}</div>
                );
                this.setState({specialityCases: specialityState});
            } else {
                const specialityState = (
                    <div className="search-result" style={{ fontSize: "150%", fontWeight: "200" }}>
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
    };

    renderSubspeciality = () => {
        switch(this.state.answers) {
            case null:
                return;
            default:
                let subspecialities = this.state.subspecialityList.map((obj, index) => {
                    return <option value={obj}>{obj}</option>;
                });
                if (this.state.speciality==="Clinical Practicum") {
                    return <FormGroup controlId="formControlsSubspeciality" style={{ paddingTop: "0", paddingLeft: "7%" }}>
                        <Col componentClass={ControlLabel} sm={2}>
                            <ControlLabel style={{ fontSize: "150%" }}>Sub-speciality</ControlLabel>
                            <div style={{ fontSize: "90%", fontWeight: "200" }}>Hold down the Ctrl (Windows) / Command (Mac) button to select multiple options.
                            </div>
                        </Col>
                        <Col sm={8}>
                            <FormControl componentClass="select" size='5' value={this.state.subspeciality} name="subspeciality" onChange={(e) => this.handleSubspecialityChange(e)} multiple>
                                <option value="Select One">Select All Relevant</option>
                                {subspecialities}
                            </FormControl>
                        </Col>
                    </FormGroup>;
                } else {
                    return <FormGroup controlId="formControlsSubspeciality" style={{ paddingTop: "0", paddingLeft: "7%" }}>
                        <Col componentClass={ControlLabel} sm={2}>
                            <ControlLabel style={{ fontSize: "150%" }}>Sub-speciality</ControlLabel>
                        </Col>
                        <Col sm={8}>
                            <FormControl componentClass="select"  value={this.state.subspeciality} name="subspeciality" onChange={(e) => this.handleSubspecialityChange(e)}>
                                <option value="Select One">Select One</option>
                                {subspecialities}
                            </FormControl>
                        </Col>
                    </FormGroup>;
                }
        }
    };

    render() {
        let specialities = this.state.specialityList.map((obj, index) => {
            return <option value={obj}>{obj}</option>;
        });
        return (
            <div ref={node => this.node = node}>
                <Row>
                    <FormGroup controlId="formControlsSpeciality" style={{ paddingTop: "0", paddingLeft: "7%" }}>
                        <Col componentClass={ControlLabel} sm={2}>
                            <ControlLabel style={{ fontSize: "150%", textAlign: "right" }}>Speciality</ControlLabel>
                        </Col>
                        <Col sm={8}>
                            <FormControl componentClass="select" value={this.state.speciality} name="speciality" onChange={(e) => this.handleSpecialityChange(e)}>
                                <option value="Select One">Select One</option>
                                {specialities}
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
                    {this.renderSubspeciality()}
                </Row>
                <br />
                {this.state.specialityCases}
            </div>
        );
    }
}

export default SearchBySpeciality;