import React, { Component } from 'react';
import { Button, Table, ControlLabel, FormGroup, FormControl, Col, Row } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import {BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar} from 'recharts';
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
        dukenus: [],
        subspecData: [],
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
            const data = [];
            for (var item in res.data) {
                this.state.subspecialityArray.push(res.data[item]['_id']);
                this.state.countArray.push(res.data[item]['count']);
                data.push({name: res.data[item]['_id'], count: res.data[item]['count'] });
                console.log(res.data[item]['_id'])
                console.log(res.data[item]['count'])
            }
            this.setState({subspecData: data});
            console.log(data);


        }).catch(err => {
            console.log(err);
        });

    }


    renderSubspecChart(){
        if (this.state.subspecData.length == 0) {
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

    }

    renderNTUStudentChart(){
        let stuData = [];
        let ntu = this.state.ntu;

        ntu.sort(function(a, b) {
            return a._id - b._id;
        });

        for (var item in ntu){
            stuData.push({name: "year" + ntu[item]._id, count: ntu[item].count});
        }

        return(
            <BarChart width={300} height={250} data={stuData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#ff7f0e" />
            </BarChart>
        );
    }

    renderNUSStudentChart(){
        let stuData = [];
        let nus = this.state.nus;

        nus.sort(function(a, b) {
            return a._id - b._id;
        });

        for (var item in nus){
            stuData.push({name: "year" + nus[item]._id, count: nus[item].count});
        }

        return(
            <BarChart width={300} height={250} data={stuData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#1f77b4" />
            </BarChart>
        );
    }

    renderDukeStudentChart(){
        let stuData = [];
        let duke = this.state.dukenus;

        duke.sort(function(a, b) {
            return a._id - b._id;
        });

        for (var item in duke){
            stuData.push({name: "year" + duke[item]._id, count: duke[item].count});
        }

        return(
            <BarChart width={300} height={250} data={stuData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8c564b" />
            </BarChart>
        );
    }

    render() {
        let totalStu = 0;
        let ntu = this.state.ntu;
        let nus = this.state.nus;
        let duke = this.state.dukenus;

        for (var item in ntu){
            totalStu += ntu[item].count;
        }

        for (var item in nus){
            totalStu += nus[item].count;
        }

        for (var item in duke){
            totalStu += duke[item].count;
        }

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
                <div className="student-stats">
                    <div className="col-lg-12">
                        <h2 align="center"><strong>Student Statistics</strong></h2>
                        <br/>
                        <Col sm={6} smOffset={3}>
                            <Table responsive className="stu-table">
                                <tbody>
                                <tr align="center">
                                    <td><h4><strong>Students</strong></h4></td>
                                    <td><h4><strong>{totalStu}</strong></h4></td>
                                </tr>
                                </tbody>
                            </Table>
                        </Col>
                        <div className="row">
                            <div class="col-lg-4">
                                <center> <b>NUS</b> </center>
                                <br/>
                                {this.renderNUSStudentChart()}
                            </div>
                            <div class="col-lg-4">
                                <center> <b>NTU</b> </center>
                                <br/>
                                {this.renderNTUStudentChart()}
                            </div>
                            <div class="col-lg-4">
                                <center> <b>Duke-NUS</b> </center>
                                <br/>
                                {this.renderDukeStudentChart()}
                            </div>
                        </div>
                    </div>
                </div>

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
                    <Col sm={12}>
                        {this.renderSubspecChart()}
                    </Col>
                </div>




                {/*<div className="row">*/}
                    {/*<div class="col-lg-4">*/}
                        {/*<Table className="table">*/}
                            {/*<thead>*/}
                                {/*<tr style={{ background: '#D9EDF7', fontSize: "130%" }}>*/}
                                    {/*<th><center>Year</center></th>*/}
                                    {/*<th><center>Count</center></th>*/}
                                {/*</tr>*/}
                            {/*</thead>*/}
                            {/*<tbody>*/}
                                {/*{nusstudents}*/}
                            {/*</tbody>*/}
                        {/*</Table>*/}

                    {/*</div>*/}
                    {/*<div class="col-lg-4">*/}
                        {/*<Table className="table">*/}
                            {/*<thead>*/}
                                {/*<tr style={{ background: '#D9EDF7', fontSize: "130%" }}>*/}
                                    {/*<th><center>Year</center></th>*/}
                                    {/*<th><center>Count</center></th>*/}
                                {/*</tr>*/}
                            {/*</thead>*/}
                            {/*<tbody>*/}
                                {/*{ntustudents}*/}
                            {/*</tbody>*/}
                        {/*</Table>*/}

                    {/*</div>*/}
                    {/*<div class="col-lg-4">*/}
                        {/*<Table className="table">*/}
                            {/*<thead>*/}
                                {/*<tr style={{ background: '#D9EDF7', fontSize: "130%" }}>*/}
                                    {/*<th><center>Year</center></th>*/}
                                    {/*<th><center>Count</center></th>*/}
                                {/*</tr>*/}
                            {/*</thead>*/}
                            {/*<tbody>*/}
                                {/*{dukenustudents}*/}
                            {/*</tbody>*/}
                        {/*</Table>*/}

                    {/*</div>*/}
                {/*</div>*/}

                {/*<div className="row">*/}
                    {/*<div class="col-lg-6">*/}


                        {/*<Table responsive className="table">*/}
                            {/*<thead>*/}
                                {/*<tr style={{ background: '#D9EDF7', fontSize: "130%" }}>*/}
                                    {/*<th><center>Subspeciality</center></th>*/}
                                    {/*<th><center>Count</center></th>*/}
                                {/*</tr>*/}
                            {/*</thead>*/}
                            {/*<tbody>*/}
                                {/*{scases}*/}
                            {/*</tbody>*/}
                        {/*</Table>*/}

                    {/*</div>*/}
                    {/*<div class="col-lg-6">*/}
                        {/*<br /><br /><br /><br /><br />*/}
                        {/*<Table responsive className="table">*/}
                            {/*<thead>*/}
                                {/*<tr style={{ background: '#D9EDF7', fontSize: "130%" }}>*/}
                                    {/*<th><center>Approach</center></th>*/}
                                    {/*<th><center>Count</center></th>*/}
                                {/*</tr>*/}
                            {/*</thead>*/}
                            {/*<tbody>*/}
                                {/*{cases}*/}
                            {/*</tbody>*/}
                        {/*</Table>*/}

                    {/*</div>*/}

                {/*</div>*/}

            </div>
        );

    }
}

export default AdminHome;