import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Form, Button, Tabs, Tab, FormGroup, Table, ControlLabel, Col} from 'react-bootstrap';
import {fetchUnvetCases} from '../../actions';
import VettedCases from './VettedCases';
import VettingEditing from './VettingEditing';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import FilterSubSpecialityOptions from "./FilterSubSpecialityOptions";
import * as ReactGA from "react-ga";

class Vetting extends Component {
    state = {
        showVetView: false,
        vetId: '',
        filterPending:"All",
        filterVetted:"All",
        renderedCases: '',
        auth: '',
        currentUser: null
    };

    componentDidMount() {
        this.props.fetchUnvetCases();
        axios.get('/api/current_user').then(res => {
            this.setState({auth: res.data!=='', currentUser: res.data});
        });
    }

    renderUnvetCases() {
        switch(this.state.currentUser) {
            case null:
                return;
            default:
                return this.props.cases.reverse().map((vetCase, index) => {
                    const userSubSpecialities = this.state.currentUser.subspeciality.split(",");
                    switch(this.state.filterPending) {
                        case 'All':
                            let toRenderAllCase = false;
                            for(let i = 0; i < userSubSpecialities.length; i++) {
                                const userSubSpeciality = userSubSpecialities[i];
                                for(let j = 0; j < vetCase.subspeciality.length; j++) {
                                    if(vetCase.subspeciality[j] === userSubSpeciality) {
                                        toRenderAllCase = true;
                                        break;
                                    }
                                }
                            }
                            if(toRenderAllCase) {
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
                            return;
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
                                                    <FilterSubSpecialityOptions value={this.state.filterPending} name='filterPending' change={(e)=>this.handleFilterPendingChange(e)} />
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
                                                    <FilterSubSpecialityOptions value={this.state.filterVetted} name='filterVetted' change={(e)=>this.handleFilterVettedChange(e)} />
                                                </Col>
                                            </FormGroup>
                                        </Form>

                                        <br/>
                                        <VettedCases filterVetted={this.state.filterVetted} />
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
        // React GA
        ReactGA.initialize('UA-112382826-1');
        ReactGA.pageview(window.location.pathname + window.location.search);

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