import React, { Component } from 'react';
import {connect} from 'react-redux';
import { bindAll } from 'lodash';
import {Form, Button, Tabs, Tab, FormGroup, FormControl, InputGroup, Table, ControlLabel, Col} from 'react-bootstrap';
import {fetchCases} from '../../actions';

class Vetting extends Component {
    constructor(props){
        super(props);
        this.state={
            showVetView: false,
            vetId: '',
            filterPending:"All",
            filterVetted:"All",
            renderedCases: ''
        };
        bindAll('renderUnvetCases');
    }

    componentDidMount() {
        this.props.fetchCases();
    }

    renderUnvetCases() {
        return this.props.cases.map((vetCase, index) => {
            return(
                <tr key={vetCase._id}>
                    <td>{vetCase.title}</td>
                    <td>{vetCase.subspeciality}</td>
                    <td>{vetCase.author}</td>
                    <td>{vetCase.timestamp}</td>
                    <td><Button  type="button" bsStyle="primary" onClick={(e)=>this.vetCase(vetCase._id)}>Vet</Button></td>
                </tr>
            );
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
                                                <option value="Sub1">Sub1</option>
                                                <option value="Sub2">Sub2</option>
                                            </FormControl>
                                        </Col>
                                    </FormGroup>
                                </Form>
                                <br/>
                                <Table responsive>
                                    <thead>
                                    <tr>
                                        <th>Case Title</th>
                                        <th>Sub-speciality</th>
                                        <th>Uploaded by</th>
                                        <th>Upload Date</th>
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
                                <Table responsive>
                                    <thead>
                                    <tr>
                                        <th>Case Title</th>
                                        <th>Sub-speciality</th>
                                        <th>Uploaded by</th>
                                        <th>Date Uploaded</th>
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
                } else {
                    return(
                        <div>
                            <h1>IMPLEMENT CASE VETTING UI HERE</h1>
                        </div>
                    );
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

export default connect(mapStateToProps, {fetchCases})(Vetting);