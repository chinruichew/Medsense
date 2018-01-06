import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Form, Button, Tabs, Tab, FormGroup, FormControl, Table, ControlLabel, Col} from 'react-bootstrap';
import {fetchUnvetCases} from '../../actions';
import VettedCases from './VettedCases';
import VettingEditing from './VettingEditing';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class Vetting extends Component {
    state= {
        showVetView: false,
        vetId: '',
        filterPending:"All",
        filterVetted:"All",
        renderedCases: '',
        auth: ''
    };

    componentDidMount() {
        this.props.fetchUnvetCases();
        axios.get('/api/current_user').then(res => {
            this.setState({auth: res.data!==''});
        });
    }

    renderUnvetCases() {
        console.log(this.state.filterPending);
        return this.props.cases.reverse().map((vetCase, index) => {
            switch(this.state.filterPending) {
                case 'All':
                    let timeStamp = vetCase.timestamp.split(" ");
                    let date = timeStamp[2]+" "+timeStamp[1]+" "+timeStamp[3];
                    let timeArr = timeStamp[4].split(":");
                    let time = timeArr[0]+":"+timeArr[1];
                    return(
                        <tr align="center" key={vetCase._id}>
                            <td>{vetCase.title}</td>
                            <td>{vetCase.subspeciality}</td>
                            <td>{vetCase.authorname}</td>
                            <td>{date}<br/>{time}</td>
                            <td><Button  type="button" bsStyle="primary" onClick={(e)=>this.vetCase(vetCase._id)}>Vet</Button></td>
                        </tr>
                    );
                default:
                    let toRenderCase = false;
                    for(let i = 0; i < vetCase.subspeciality.length; i++) {
                        const vetcaseSubspeciality = vetCase.subspeciality[i];
                        if(vetcaseSubspeciality === this.state.filterPending) {
                            toRenderCase = true;
                        }
                    }
                    if(toRenderCase) {
                        let timeStamp = vetCase.timestamp.split(" ");
                        let date = timeStamp[2]+" "+timeStamp[1]+" "+timeStamp[3];
                        let timeArr = timeStamp[4].split(":");
                        let time = timeArr[0]+":"+timeArr[1];
                        return(
                            <tr align="center" key={vetCase._id}>
                                <td>{vetCase.title}</td>
                                <td>{vetCase.subspeciality}</td>
                                <td>{vetCase.authorname}</td>
                                <td>{date}<br/>{time}</td>
                                <td><Button  type="button" bsStyle="primary" onClick={(e)=>this.vetCase(vetCase._id)}>Vet</Button></td>
                            </tr>
                        );
                    }
            }
        });
    }

    handleFilterPendingChange(e){
        this.setState({filterPending:e.target.value});
    }

    handleFilterVettedChange(e){
        this.setState({filterVetted:e.target.value});
    }

    vetCase(id){
        this.setState({
            showVetView: true,
            vetId: id
        });
    }

    renderContent() {
        switch(this.state.auth) {
            case false:
                return <Redirect to='/' />;
            default:
                switch(this.props.cases) {
                    case null:
                        return;
                    default:
                        if(!this.state.showVetView) {
                            return(
                                <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                                    <Tab eventKey={1} title="Pending Cases">
                                        <br/>
                                        <Form horizontal>
                                            <FormGroup controlId="formControlsPending">
                                                <Col componentClass={ControlLabel} sm={2}>
                                                    Filter by Sub-speciality
                                                </Col>

                                                <Col sm={3}>
                                                    <FormControl componentClass="select" value={this.state.filterPending} name="filterPending" onChange={(e)=>this.handleFilterPendingChange(e)}>
                                                        <option value="All">All</option>
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
                                        </Form>
                                        <br/>
                                        <Table responsive>
                                            <thead>
                                            <tr style={{background: '#D9EDF7', fontSize: "130%"}}>
                                                <th><center>Case Title</center></th>
                                                <th><center>Sub-speciality</center></th>
                                                <th><center>Uploaded by</center></th>
                                                <th><center>Upload Date</center></th>
                                                <th></th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {this.renderUnvetCases()}
                                            </tbody>
                                        </Table>
                                    </Tab>
                                    <Tab eventKey={2} title="Vetted Cases">
                                        <br/>
                                        <Form horizontal>
                                            <FormGroup controlId="formControlsVetted">
                                                <Col componentClass={ControlLabel} sm={2}>
                                                    Filter by Sub-speciality
                                                </Col>

                                                <Col sm={3}>
                                                    <FormControl componentClass="select" value={this.state.filterVetted} name="filterVetted" onChange={(e)=>this.handleFilterVettedChange(e)}>
                                                        <option value="All">All</option>
                                                        <option value="Sub1">Sub1</option>
                                                        <option value="Sub2">Sub2</option>
                                                    </FormControl>
                                                </Col>
                                            </FormGroup>
                                        </Form>

                                        <br/>
                                        <VettedCases />
                                    </Tab>
                                </Tabs>
                            );
                        } else {
                            return(
                                <div>
                                    <VettingEditing vetId={this.state.vetId}/>
                                </div>
                            );
                        }
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

function mapStateToProps({cases}) {
    return {
        cases
    };
}

export default connect(mapStateToProps, {fetchUnvetCases})(Vetting);