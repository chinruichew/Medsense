import React, { Component } from 'react';
import { connect } from 'react-redux';
import BootstrapModal from '../UI/Modal/VettingBootstrapModal.js';
import { bindAll } from 'lodash';
import { updateStudent } from '../../actions/index';
import { Button } from 'react-bootstrap';

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
        e.preventDefault();
        this.props.updateStudent(this.state).then((response) => {
            if (response) {
                console.log(response)
                this.setState({ vmShow: true });
            }
        }).catch(() => { })
    }

    render() {
        let vmClose = () => this.setState({ vmShow: false });
        return (
            <div>
                <div className="col-sm-5 col-sm-offset-2">

                    <div className="row" style={{paddingTop: "60%"}}>
                        <h3> <b>{this.state.username}</b> </h3>
                    </div>

                    <div className="row">
                        <div className="form-group">

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

                    <div className="row">
                        <div className="form-group">

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

                    {/*<input type="hidden" value={this.props.student.id} name="studentid" />*/}
                    <div className="row">
                    <div className="form-group">
                        <button type="submit" onClick={(e) => this.handleSaveChange(e)} className="btn btn-primary btn-lg btn-block login-button">Save</button>
                    </div>
                    </div>
                </div>
                <BootstrapModal
                    show={this.state.vmShow}
                    onHide={vmClose}
                    aria-labelledby="error-modal">
                    <BootstrapModal.Header closeButton>
                        <BootstrapModal.Title id="error-modal-">Profile Update</BootstrapModal.Title>
                    </BootstrapModal.Header>
                    <BootstrapModal.Body>
                        <p>Your profile has been successfully updated.</p>
                    </BootstrapModal.Body>
                    <BootstrapModal.Footer>
                        <Button onClick={vmClose}>Close</Button>
                    </BootstrapModal.Footer>
                </BootstrapModal>
            </div>
        )
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps, { updateStudent })(StudentProfile);


