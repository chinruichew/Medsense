import React, { Component } from 'react';
import {Col, ControlLabel, FormControl, FormGroup, Table} from "react-bootstrap";
import {BarChart, XAxis, YAxis, Tooltip, Bar} from 'recharts';
import axios from 'axios';

class AdminCaseStatistics extends Component {
    state = {
        specialityCount: [],
        speciality: "",
        subspecialityArray: [],
        subspecData: [],
        caseSpecialityArray: []
    };

    componentDidMount() {
        axios.post('/api/fetchSpecialityCount').then(res => {
            this.setState({
                specialityCount: res.data
            });
        }).catch(err => {
            console.log(err);
        });

        axios.get('/api/fetchCaseSpecialityCount').then(res => {
            this.setState({
                caseSpecialityArray: res.data
            });
        }).catch(err => {
            console.log(err);
        });
    }

    renderSubspecChart = () => {
        if (this.state.subspecData.length === 0) {
            return (
                <Col smOffset={1}>
                    There currently are no cases under this subspeciality.
                </Col>
            );
        } else{
            return(
                <BarChart width={1100} height={250} data={this.state.subspecData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
            );
        }
    };

    handleSpecialityChange = (e) => {
        const value = e.target.value;
        this.setState({ speciality: value });
        axios.post('/api/fetchSpecialityCount', {
            speciality: value
        }).then(res => {
            this.setState({
                specialityCount: res.data
            });
            this.state.subspecialityArray = [];
            this.state.countArray = [];
            const data = [];
            for (let item in res.data) {
                this.state.subspecialityArray.push(res.data[item]['_id']);
                this.state.countArray.push(res.data[item]['count']);
                data.push({name: res.data[item]['_id'], count: res.data[item]['count'] });
            }
            this.setState({subspecData: data});
        }).catch(err => {
            console.log(err);
        });
    };

    render() {
        let caseSpeciality = this.state.caseSpecialityArray.map(item => (
            <tr align="center">
                <td>{item._id}</td>
                <td>{item.count}</td>
            </tr>

        ));

        return(
            <div className="case-stats">
                <div className="col-lg-12">
                    <h2 align="center"><strong>Case Statistics</strong></h2>
                    <br/>
                    <Col sm={6} smOffset={3}>
                        <Table responsive className="table">
                            <thead>
                            <tr style={{ background: '#D9EDF7', fontSize: "130%" }}>
                                <th><center>Speciality</center></th>
                                <th><center>Count</center></th>
                            </tr>
                            </thead>
                            <tbody>
                            {caseSpeciality}
                            </tbody>
                        </Table>
                    </Col>
                </div>
                <Col sm={9} smOffset={1}>
                    <FormGroup controlId="formControlsDifficulty">
                        <ControlLabel>Select Sub-speciality:</ControlLabel>
                        <FormControl componentClass="select" value={this.state.speciality} name="usertype" onChange={(e) => this.handleSpecialityChange(e)}>
                            <option value="Select One">Select One</option>
                            <option value="Clinical Practicum">Clinical Practicum</option>
                            <option value="Medicine">Medicine</option>
                            <option value="Surgery">Surgery</option>
                            <option value="Orthopaedics">Orthopedics</option>
                            <option value="Others">Others</option>
                        </FormControl>
                    </FormGroup>
                </Col>
                <div className="col-md-12 text-center" style={{paddingLeft: '80px', paddingTop: '20px'}}>
                    {this.renderSubspecChart()}
                </div>
            </div>
        );
    }
}

export default AdminCaseStatistics;