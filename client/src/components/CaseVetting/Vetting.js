import React, { Component } from 'react';
import { bindAll } from 'lodash';
import {Button, Tabs, Tab, FormGroup, FormControl, InputGroup, Table} from 'react-bootstrap';

class Vetting extends Component {
    constructor(props){
        super(props);
        this.state={
            filterPending:"All",
            filterVetted:"All",
        };
        bindAll(this, );
    }

    handleFilterPendingChange(e){
        this.setState({filterPending:e.target.value});
    }

    handleFilterVettedChange(e){
        this.setState({filterVetted:e.target.value});
    }

    vetCase(e){
        //perform redirection to case upload
    }

    render(){
        return(
            <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                <Tab eventKey={1} title="Pending Cases">
                    <br/>
                    <FormGroup controlId="formControlsPending">
                        <InputGroup>
                            <InputGroup.Addon>Filter by Sub-speciality</InputGroup.Addon>
                            <FormControl componentClass="select" value={this.state.filterPending} name="filterPending" onChange={(e)=>this.handleFilterPendingChange(e)}>
                                <option value="All">All</option>
                                <option value="Sub1">Sub1</option>
                                <option value="Sub2">Sub2</option>
                            </FormControl>
                        </InputGroup>
                    </FormGroup>

                    <br/>
                    <Table responsive>
                        <thead>
                        <tr>
                            <th>Case Title</th>
                            <th>Sub-sepciality</th>
                            <th>Uploaded by</th>
                            <th>Upload Date</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>1</td>
                            <td>xxx</td>
                            <td>Amy</td>
                            <td>4:51PM<br/>3 November 2017</td>
                            <td><Button  type="button" bsStyle="primary" onClick={(e)=>this.vetCase()}>Vet</Button></td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>xxx</td>
                            <td>Bob</td>
                            <td>10:41PM<br/>4 November 2017</td>
                            <td><Button  type="button" bsStyle="primary" onClick={(e)=>this.vetCase()}>Vet</Button></td>
                        </tr>
                        </tbody>
                    </Table>
                </Tab>
                <Tab eventKey={2} title="Vetted Cases">
                    <br/>
                    <FormGroup controlId="formControlsVetted">
                        <InputGroup>
                            <InputGroup.Addon>Filter by Sub-speciality</InputGroup.Addon>
                            <FormControl componentClass="select" value={this.state.filterVetted} name="filterVetted" onChange={(e)=>this.handleFilterVettedChange(e)}>
                                <option value="All">All</option>
                                <option value="Sub1">Sub1</option>
                                <option value="Sub2">Sub2</option>
                            </FormControl>
                        </InputGroup>
                    </FormGroup>

                    <br/>
                    <Table responsive>
                        <thead>
                        <tr>
                            <th>Case Title</th>
                            <th>Sub-sepciality</th>
                            <th>Uploaded by</th>
                            <th>Upload Date</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>1</td>
                            <td>xxx</td>
                            <td>Amy</td>
                            <td>4:51PM<br/>3 November 2017</td>
                            <td><Button  type="button" bsStyle="primary" onClick={(e)=>this.vetCase()}>Vet</Button></td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>xxx</td>
                            <td>Bob</td>
                            <td>10:41PM<br/>4 November 2017</td>
                            <td><Button  type="button" bsStyle="primary" onClick={(e)=>this.vetCase()}>Vet</Button></td>
                        </tr>
                        </tbody>
                    </Table>
                </Tab>
            </Tabs>
        );
    }
}

export default Vetting;