import React, { Component } from 'react';
import axios from 'axios';
import AdminStudentStatistics from "./AdminStudentStatistics";
import AdminCaseStatistics from "./AdminCaseStatistics";
import AdminGameStatistics from "./AdminGameStatistics";


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
                <AdminGameStatistics/>
                <AdminCaseStatistics/>
            </div>
        );

    }
}

export default AdminDashboard;