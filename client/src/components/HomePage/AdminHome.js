import React, { Component } from 'react';
import { Button, Table } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import axios from 'axios'

class AdminHome extends Component {
    state = {
        caseCount: "",
        specialityCount: ""
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
    }

    render() {

        return (
            <div className="container-fluid">
                <div className="text-center">
                    {/* <h2>Welcome back to Medsense</h2> */}
                </div>
                <div className="row">
                    row1
                </div>
                <div className="row">
                    <div class="col-lg-6">{this.state.caseCount.length}</div>
                    <div class="col-lg-6">{this.state.specialityCount.length}</div>
                </div>
            </div>
        );

    }
}

export default AdminHome;