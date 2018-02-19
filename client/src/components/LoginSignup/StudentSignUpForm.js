import React, { Component } from 'react';
import axios from 'axios';
import BootstrapModal from '../UI/Modal/VettingBootstrapModal.js';
import { Button, Popover, OverlayTrigger } from 'react-bootstrap';

class StudentSignUpForm extends Component {
    state = {
        username: this.props.username,
        password: this.props.password,
        confirm_password: this.props.confirm_password,
        school: this.props.school,
        year: this.props.year
    };

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

    handleUserSignUp = () => {
        let regex = /^.*(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+).*$/;
        if (this.state.password===null){
            this.setState({vmShow: true, error: "The password should contain at least 8 characters.", password: "", confirm_password: ""});
        }
        else if(this.state.password.length<8){
            this.setState({vmShow: true, error: "The password should contain at least 8 characters.", password: "", confirm_password: ""});
        } else if(!regex.test(this.state.password)){
            this.setState({vmShow: true, error: "The password should contain both letter(s) and number(s).", password: "", confirm_password: ""});
        } else if(this.state.password!==this.state.confirm_password){
            this.setState({vmShow: true, error: "The passwords do not match, please check again.", password: "", confirm_password: ""});
        } else {
            axios.post('/api/signup', {
                ...this.state
            }).then(res => {
                if (res.data === 'User Exists') {
                    this.setState({vmShow: true, error: "The username already exists, please choose another one."});
                } else {
                    this.setState({vm: true});
                }
            });
        }
    };

    redirect() {
        window.location = '/login';
    }



    render() {
        const popoverHover = (
            <Popover id="popover-trigger-hover" title="Password">
                Passwords must contain both letter(s) and number(s) and be at least 8 characters long.
            </Popover>
        );
        let vmClose = () => this.setState({ vmShow: false });
        return(
            <div className="main-center">
                <img src="./medsense_logo.png" style={{height: '110px', width: '290px'}} alt="Medsense" />
                <br/><br/><br/>
                <form className="form-horizontal">
                    <div className="form-group">
                        <label for="username" className="cols-sm-2 control-label"><span style={{fontSize:'120%'}}>Username</span></label>
                        <div className="cols-sm-10">
                            <div className="input-group">
                                <span className="input-group-addon"><i className="fa fa-user fa" aria-hidden="true"></i></span>
                                <input type="text" className="form-control" name="username" id="username"  placeholder="Enter your Username" value={this.state.username} onChange={(e) => this.handleUsernameChange(e)}  />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">

                        <label for="password" className="cols-sm-2 control-label"><span style={{fontSize:'120%'}}>Password</span>
                        <OverlayTrigger trigger={['hover']} placement="bottom" overlay={popoverHover}><img src='./info.png' hspace="5" alt="" style={{height:"1.3em", marginBottom:"1em"}}/></OverlayTrigger>
                        </label>
                        <div className="cols-sm-10">
                            <div className="input-group">
                                <span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true"></i></span>
                                <input type="password" className="form-control" name="password" id="password"  placeholder="Enter your Password" value={this.state.password} onChange={(e) => this.handlePasswordChange(e)} />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label for="confirm_password" className="cols-sm-2 control-label"><span style={{fontSize:'120%'}}>Confirm Password</span></label>
                        <div className="cols-sm-10">
                            <div className="input-group">
                                <span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true"></i></span>
                                <input type="password" className="form-control" name="confirm_password" id="confirm_password"  placeholder="Confirm your Password" value={this.state.confirm_password} onChange={(e) => this.handleConfirmPasswordChange(e)} />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="cols-sm-2 control-label"><span style={{fontSize:'120%'}}>School</span></label>
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
                        <label className="cols-sm-2 control-label"><span style={{fontSize:'120%'}}>Year of Study</span></label>
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
                        <button onClick={this.handleUserSignUp} type="button" className="btn btn-primary btn-lg btn-block login-button">Register</button>
                    </div>
                </form>
                <BootstrapModal
                    show={this.state.vmShow}
                    onHide={vmClose}
                    aria-labelledby="username-modal">
                    <BootstrapModal.Header closeButton>
                        <BootstrapModal.Title id="username-modal">Unable to Register</BootstrapModal.Title>
                    </BootstrapModal.Header>
                    <BootstrapModal.Body>
                        <p>{this.state.error}</p>
                    </BootstrapModal.Body>
                    <BootstrapModal.Footer>
                        <Button onClick={vmClose}>Close</Button>
                    </BootstrapModal.Footer>
                </BootstrapModal>
                <BootstrapModal
                    show={this.state.vm}
                    aria-labelledby="success-modal">
                    <BootstrapModal.Header>
                        <BootstrapModal.Title id="success-modal">Account Created</BootstrapModal.Title>
                    </BootstrapModal.Header>
                    <BootstrapModal.Body>
                        <p>Your account has been created successfully! You will be redirected to the Login page.</p>
                    </BootstrapModal.Body>
                    <BootstrapModal.Footer>
                        <Button onClick={this.redirect}>OK</Button>
                    </BootstrapModal.Footer>
                </BootstrapModal>
            </div>
        );
    }
}

export default StudentSignUpForm;