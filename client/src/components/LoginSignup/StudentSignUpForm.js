import React, { Component } from 'react';
import { bindAll } from 'lodash';
import axios from 'axios';

class StudentSignUpForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: this.props.username,
            password: this.props.password,
            confirm_password: this.props.confirm_password,
            school: this.props.school,
            year: this.props.year
        };
        bindAll(this, 'handleUserSignUp');
    }

    handleSchoolChange(e) {
        this.setState({ school: e.target.value });
    }

    handleYearChange(e) {
        this.setState({ year: e.target.value });
    }

    handleUsernameChange(e) {
        this.setState({ username: e.target.value });
    }

    handlePasswordChange(e) {
        this.setState({ password: e.target.value });
    }

    handleConfirmPasswordChange(e) {
        this.setState({ confirm_password: e.target.value });
    }

    handleUserSignUp() {
        axios.post('/api/signup', {
            ...this.state
        }).then(res => {
            if(res.data === 'User Exists') {
                alert('User Exists');
            }
        });
    }

    render() {
        return(
            <div className="main-login main-center">
                <img src="./medsense_logo.png" style={{height: '120px', width: '300px'}} />
                <form className="form-horizontal">
                    <div className="form-group">
                        <label for="username" className="cols-sm-2 control-label">Username</label>
                        <div className="cols-sm-10">
                            <div className="input-group">
                                <span className="input-group-addon"><i className="fa fa-user fa" aria-hidden="true"></i></span>
                                <input type="text" className="form-control" name="username" id="username"  placeholder="Enter your Username" value={this.state.username} onChange={(e) => this.handleUsernameChange(e)}  />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label for="password" className="cols-sm-2 control-label">Password</label>
                        <div className="cols-sm-10">
                            <div className="input-group">
                                <span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true"></i></span>
                                <input type="password" className="form-control" name="password" id="password"  placeholder="Enter your Password" value={this.state.password} onChange={(e) => this.handlePasswordChange(e)} />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label for="confirm_password" className="cols-sm-2 control-label">Confirm Password</label>
                        <div className="cols-sm-10">
                            <div className="input-group">
                                <span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true"></i></span>
                                <input type="password" className="form-control" name="confirm_password" id="confirm_password"  placeholder="Confirm your Password" value={this.state.confirm_password} onChange={(e) => this.handleConfirmPasswordChange(e)} />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="cols-sm-2 control-label">School</label>
                        <div className="cols-sm-10">
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
                    <div className="form-group">
                        <label className="cols-sm-2 control-label">Year of Study</label>
                        <div className="cols-sm-10">
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
                    <div className="form-group">
                        <button onClick={this.handleUserSignUp} type="button" className="btn btn-primary btn-lg btn-block login-button">Sign Up</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default StudentSignUpForm;