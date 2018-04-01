import React, { Component } from 'react';
import { Button, Table, ControlLabel, FormGroup, FormControl, Col } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import axios from 'axios';


class AdminHome extends Component {
    state = {
        caseCount: [],
        specialityCount: [],
        speciality: "",
        subspecialityArray: [],
        countArray: [],
        caseSpecialityArray: [],
        nus: [],
        ntu: [],
        dukenus: []
    };

    componentDidMount() {
        axios.get('/api/fetchCount').then(res => {
            console.log(res)
            this.setState({
                caseCount: res.data
            });
        }).catch(err => {
            console.log(err);
        });
        axios.post('/api/fetchSpecialityCount').then(res => {
            console.log(res)
            this.setState({
                specialityCount: res.data
            });
        }).catch(err => {
            console.log(err);
        });
        axios.get('/api/fetchCaseSpecialityCount').then(res => {
            console.log(res)
            this.setState({
                caseSpecialityArray: res.data
            });
        }).catch(err => {
            console.log(err);
        });
        axios.get('/api/fetchStudentCount').then(res => {
            console.log(res)
            this.setState({
                nus: res.data[0],
                ntu: res.data[1],
                dukenus: res.data[2]
            });
        }).catch(err => {
            console.log(err);
        });
    }

    handleSpecialityChange(e) {
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
            for (var item in res.data) {
                this.state.subspecialityArray.push(res.data[item]['_id']);
                this.state.countArray.push(res.data[item]['count']);
                console.log(res.data[item]['_id'])
                console.log(res.data[item]['count'])
            }
            console.log(this.state.subspecialityArray)
        }).catch(err => {
            console.log(err);
        });

    }

    render() {

        let caseSpeciality = this.state.caseSpecialityArray.map(item => (
            <tr align="center">
                <td>{item._id}</td>
                <td>{item.count}</td>
            </tr>

        ))

        let cases = this.state.caseCount.map(item => (
            <tr align="center">
                <td>{item._id}</td>
                <td>{item.count}</td>
            </tr>

        ))

        let scases = this.state.specialityCount.map(item => (
            <tr align="center">
                <td>{item._id}</td>
                <td>{item.count}</td>
            </tr>

        ))

        let nusstudents = this.state.nus.map(item => (
            <tr align="center">
                <td>{item._id}</td>
                <td>{item.count}</td>
            </tr>

        ))

        let ntustudents = this.state.ntu.map(item => (
            <tr align="center">
                <td>{item._id}</td>
                <td>{item.count}</td>
            </tr>

        ))

        let dukenustudents = this.state.dukenus.map(item => (
            <tr align="center">
                <td>{item._id}</td>
                <td>{item.count}</td>
            </tr>

        ))

        return (
            <div className="container-fluid">
                <div className="text-center">
                    {/* <h2>Welcome back to Medsense</h2> */}
                </div>
                <div className="row">
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
                </div>

                <div className="row">
                    <div class="col-lg-4">
                        <center style={{ background: '#D9EDF7', fontSize: "130%" }}> <b>NUS</b> </center>
                    </div>
                    <div class="col-lg-4">
                    <center style={{ background: '#D9EDF7', fontSize: "130%" }}> <b>NTU</b> </center>
                    </div>
                    <div class="col-lg-4">
                    <center style={{ background: '#D9EDF7', fontSize: "130%" }}> <b>Duke-NUS</b> </center>
                    </div>
                </div>

                <div className="row">
                    <div class="col-lg-4">
                        <Table className="table">
                            <thead>
                                <tr style={{ background: '#D9EDF7', fontSize: "130%" }}>
                                    <th><center>Year</center></th>
                                    <th><center>Count</center></th>
                                </tr>
                            </thead>
                            <tbody>
                                {nusstudents}
                            </tbody>
                        </Table>

                    </div>
                    <div class="col-lg-4">
                        <Table className="table">
                            <thead>
                                <tr style={{ background: '#D9EDF7', fontSize: "130%" }}>
                                    <th><center>Year</center></th>
                                    <th><center>Count</center></th>
                                </tr>
                            </thead>
                            <tbody>
                                {ntustudents}
                            </tbody>
                        </Table>

                    </div>
                    <div class="col-lg-4">
                        <Table className="table">
                            <thead>
                                <tr style={{ background: '#D9EDF7', fontSize: "130%" }}>
                                    <th><center>Year</center></th>
                                    <th><center>Count</center></th>
                                </tr>
                            </thead>
                            <tbody>
                                {dukenustudents}
                            </tbody>
                        </Table>

                    </div>
                </div>

                <div className="row">
                    <div class="col-lg-6">

                        <FormGroup controlId="formControlsDifficulty">
                            <ControlLabel style={{ fontSize: "150%" }}>Select Speciality:</ControlLabel>
                            <FormControl componentClass="select" value={this.state.speciality} name="usertype" onChange={(e) => this.handleSpecialityChange(e)}>
                                <option value="Select One">Select One</option>
                                <option value="Clinical Practicum">Clinical Practicum</option>
                                <option value="Medicine">Medicine</option>
                                <option value="Surgery">Surgery</option>
                                <option value="Orthopaedics">Orthopedics</option>
                                <option value="Others">Others</option>
                            </FormControl>
                        </FormGroup>
                        <Table responsive className="table">
                            <thead>
                                <tr style={{ background: '#D9EDF7', fontSize: "130%" }}>
                                    <th><center>Subspeciality</center></th>
                                    <th><center>Count</center></th>
                                </tr>
                            </thead>
                            <tbody>
                                {scases}
                            </tbody>
                        </Table>

                    </div>
                    <div class="col-lg-6">
                        <br /><br /><br /><br /><br />
                        <Table responsive className="table">
                            <thead>
                                <tr style={{ background: '#D9EDF7', fontSize: "130%" }}>
                                    <th><center>Approach</center></th>
                                    <th><center>Count</center></th>
                                </tr>
                            </thead>
                            <tbody>
                                {cases}
                            </tbody>
                        </Table>

                    </div>
                </div>
            </div>
        );

    }
}

export default AdminHome;