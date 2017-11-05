import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { bindAll } from 'lodash';
import { updateStudent } from '../../actions/index';

class StudentProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            username: this.props.username,
            school: this.props.school,
            year: this.props.year
        };
        bindAll(this, 'handleSchoolChange', 'handleYearChange', 'handleSaveChange');
    }

    handleSchoolChange(e) {
        this.setState({ school: e.target.value });
    }

    handleYearChange(e) {
        this.setState({ year: e.target.value });
    }

    handleSaveChange(e) {
        this.props.updateStudent(this.state).then((response) => {
            if (response) {
                console.log(response)
                window.alert("Successfully Updated")
            }
        }).catch(() => { })
    }

    render() {
        return (
            <div>
                <div className="col-sm-5 col-sm-offset-2">

                    <div className="row" style={{ marginRight: "200px", marginLeft: "0px" }}>
                        <h3> <b>{this.state.username}</b> </h3>
                    </div>

                    <div className="row">
                        <div className="form-group col-lg-5">
                            <div className="cols-sm-5">
                                <div className="input-group">
                                    <span className="input-group-addon"><i className="fa fa-graduation-cap fa-lg" aria-hidden="true"></i></span>
                                    <select className="form-control" value={this.state.year} onChange={(e) => this.handleYearChange(e)}>
                                        <option value="1">Year 1</option>
                                        <option value="2">Year 2</option>
                                        <option value="3">Year 3</option>
                                        <option value="4">Year 4</option>
                                        <option value="5">Year 5</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="form-group col-lg-5">
                            <div className="cols-sm-5">
                                <div className="input-group">
                                    <span className="input-group-addon"><i className="fa fa-university fa-lg" aria-hidden="true"></i></span>
                                    <select className="form-control" value={this.state.school} onChange={(e) => this.handleSchoolChange(e)}>
                                        <option value="Duke-NUS">Duke-NUS</option>
                                        <option value="NTU">NTU</option>
                                        <option value="NUS">NUS</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*<input type="hidden" value={this.props.student.id} name="studentid" />*/}

                    <div className="form-group col-lg-8" style={{ marginRight: "200px", marginLeft: "190px", marginBottom: "150px" }}>
                        <button type="submit" onClick={(e) => this.handleSaveChange(e)} className="btn btn-primary">Save</button>
                    </div>

                    {/*<div className="row" style={{ marginRight: "250px", marginLeft: "100px" }}>
                        <h3> <b>Scoreboard</b> <img src="./placeholder.png" alt="" /> </h3>
                    </div>*/}

                    <div className="row" style={{ marginRight: "200px", marginLeft: "0px" }}>
                        <h3> <b>Scoreboard</b> <img src="./placeholder.png" alt="" /> </h3>
                    </div>
                </div>

                <div className="col-sm-4">
                    <div className="row" style={{ marginRight: "200px", marginLeft: "0px" }}>
                        <h3> <b>Graphs</b> <img src="./placeholder.png" alt="" /> </h3>
                    </div>
                    <div className="row" style={{ marginRight: "200px", marginLeft: "0px" }}>
                        <h3> <b>Analytics</b> <img src="./placeholder.png" alt="" /> </h3>
                    </div>
                </div>

            </div>
        )
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps, { updateStudent })(StudentProfile);


