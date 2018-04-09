import React, { Component } from 'react';
import { Button, Table, ControlLabel, FormGroup, FormControl, Col, Row } from 'react-bootstrap';
import {BarChart, XAxis, YAxis, Tooltip, Bar} from 'recharts';
import axios from 'axios';
import AdminStudentStatistics from "./AdminStudentStatistics";
import AdminCaseStatistics from "./AdminCaseStatistics";


class AdminDashboard extends Component {
    state = {
        caseCount: [],
        countArray: [],
        nus: [],
        ntu: [],
        dukenus: []
    };

    componentDidMount() {
        axios.get('/api/fetchCount').then(res => {
            this.setState({
                caseCount: res.data
            });
        }).catch(err => {
            console.log(err);
        });

        axios.get('/api/fetchStudentCount').then(res => {
            this.setState({
                nus: res.data[0],
                ntu: res.data[1],
                dukenus: res.data[2]
            });
        }).catch(err => {
            console.log(err);
        });
    }

    render() {
        return (
            <div className="container-fluid">
                <AdminStudentStatistics nus={this.state.nus} ntu={this.state.ntu} dukenus={this.state.dukenus} />
                <AdminCaseStatistics/>
            </div>
        );

    }
}

export default AdminDashboard;