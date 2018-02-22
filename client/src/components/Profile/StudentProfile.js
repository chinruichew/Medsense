import React, { Component } from 'react';
import { connect } from 'react-redux';
import BootstrapModal from '../UI/Modal/VettingBootstrapModal.js';
import { bindAll } from 'lodash';
import { updateStudent } from '../../actions/index';
import { Button } from 'react-bootstrap';
import { Line } from 'rc-progress';

class StudentProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            username: this.props.username,
            school: this.props.school,
            year: this.props.year,
            level: isNaN(Math.floor((50+Math.sqrt(400*this.props.xp-37500))/100))?0:Math.floor((50+Math.sqrt(400*this.props.xp-37500))/100),
        };
        bindAll(this, 'handleSchoolChange', 'handleYearChange', 'handleSaveChange', 'renderProgressBar');
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
                this.setState({ vmShow: true });
            }
            this.props.reRenderMain();
        }).catch(() => { })
    }

    renderProgressBar() {
        let nextLvlPoints = 100+this.state.level*(this.state.level+1)/2*50;
        console.log(nextLvlPoints);
        let progress = this.props.xp / nextLvlPoints * 100;
        return <Line    percent={progress}
                        strokeWidth="8"
                        trailWidth="8"
                        strokeColor="#82C5D9"
                        strokeLinecap="round"/>
    }

    render() {
        let vmClose = () => this.setState({ vmShow: false });
        return (
            <div>
                <div className="col-sm-5 col-sm-offset-2">

                    <div className="row" style={{paddingTop: "31%"}}>
                        <h1> <b>{this.state.username}</b> </h1>
                        <h4> <b>Level {this.state.level}</b> </h4>
                    <h5 style={{textAlign:"right", marginBottom:"1em"}}>{this.renderProgressBar()}<b>{this.props.xp}/{100+this.state.level*(this.state.level+1)/2*50} XP</b></h5>
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


