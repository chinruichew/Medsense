import React, { Component } from 'react';
import {Col, Table} from "react-bootstrap";
import {BarChart, XAxis, YAxis, Tooltip, Bar} from 'recharts';

class AdminStudentStatistics extends Component {
    renderNTUStudentChart(){
        let stuData = [];
        let ntu = this.props.ntu;

        ntu.sort(function(a, b) {
            return a._id - b._id;
        });

        for (let item in ntu){
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
        let nus = this.props.nus;

        nus.sort(function(a, b) {
            return a._id - b._id;
        });

        for (let item in nus){
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
        let duke = this.props.dukenus;

        duke.sort(function(a, b) {
            return a._id - b._id;
        });

        for (let item in duke){
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

    renderContent = () => {
        let totalStu = 0;
        let ntu = this.props.ntu;
        let nus = this.props.nus;
        let duke = this.props.dukenus;

        for (let item in ntu){
            totalStu += ntu[item].count;
        }

        for (let item in nus){
            totalStu += nus[item].count;
        }

        for (let item in duke){
            totalStu += duke[item].count;
        }

        let nusstudents = this.props.nus.map(item => (
            <tr align="center">
                <td>{item._id}</td>
                <td>{item.count}</td>
            </tr>

        ));

        let ntustudents = this.props.ntu.map(item => (
            <tr align="center">
                <td>{item._id}</td>
                <td>{item.count}</td>
            </tr>

        ));

        let dukenustudents = this.props.dukenus.map(item => (
            <tr align="center">
                <td>{item._id}</td>
                <td>{item.count}</td>
            </tr>

        ));
        
        return(
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
                    <div className="col-md-4">
                        <center> <b>NUS</b> </center>
                        <br/>
                        {this.renderNUSStudentChart()}
                    </div>
                    <div className="col-md-4">
                        <center> <b>NTU</b> </center>
                        <br/>
                        {this.renderNTUStudentChart()}
                    </div>
                    <div className="col-md-4">
                        <center> <b>Duke-NUS</b> </center>
                        <br/>
                        {this.renderDukeStudentChart()}
                    </div>
                </div>
            </div>
        );
    };

    render() {
        return(
            <div className="student-stats">
                {this.renderContent()}
            </div>
        );
    }
}

export default AdminStudentStatistics;