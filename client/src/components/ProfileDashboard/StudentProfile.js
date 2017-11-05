import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { bindAll } from 'lodash';

class StudentProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            username: this.props.username,
            school: this.props.school,
            year: this.props.year
        };
        bindAll(this, 'handleSchoolChange', 'handleYearChange', 'handleSave');
    }

    handleSchoolChange(e) {
        this.setState({ school: e.target.value });
    }

    handleYearChange(e) {
        this.setState({ year: e.target.value });
    }

    handleSave(e) {

    }

    render() {
        return (
            <div>
                <div className="col-sm-5 col-sm-offset-2">
                    <form method="post" action="/api/updateStudent">
                        <div class="row" style={{ marginRight: "200px", marginLeft: "0px" }}>
                            <h3> <b>{this.state.username}</b> </h3>
                        </div>

                        <div class="row">
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

                        <div class="row">
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
                            <button type="submit" className="btn btn-primary">Save</button>
                        </div>

                    </form>

                    <div class="row" style={{ marginRight: "200px", marginLeft: "55px" }}>
                        <h3> <b>Scoreboard</b> </h3>
                    </div>
                </div>

                <div className="col-sm-4">
                    <div class="row" style={{ marginRight: "200px", marginLeft: "55px", marginBottom: "260px" }}>
                        <h3> <b>Analytics1</b> </h3>
                    </div>
                    <div class="row" style={{ marginRight: "200px", marginLeft: "55px" }}>
                        <h3> <b>Analytics2</b> </h3>
                    </div>
                </div>

            </div>
        )
    }
}

export default StudentProfile;

