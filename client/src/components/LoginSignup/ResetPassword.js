import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';

import BootstrapModal from '../UI/Modal/VettingBootstrapModal.js';

class ResetPassword extends Component {
    state = {
        username: '',
        email: '',
        errorShow: false,
        successShow: false
    };

    handleUsernameChange = (e) => {
        this.setState({username: e.target.value});
    };

    handleEmailChange = (e) => {
        this.setState({email: e.target.value});
    };

    onResetPassword = (e) => {
        e.preventDefault();
        axios.post('/api/resetPassword', {
            ...this.state
        }).then(res => {
            if(res.data === 'Done') {
                this.setState({successShow: true});
            } else {
                this.setState({errorShow: true});
            }
        }).catch(err => {
            throw(err);
        });
    };

    render() {
        return(
            <div className="container-fluid">
                <div className="row">
                    <div className="main-center">
                        <img src="./medsense_logo.png" style={{height: '110px', width: '290px'}} alt="Medsense" />
                        <br/><br/><br/>
                        <form className="form-horizontal" onSubmit={this.onResetPassword}>
                            <div className="form-group">
                                <label for="username" className="cols-sm-2 control-label"><span style={{fontSize:'120%'}}>Username</span></label>
                                <div className="cols-sm-10">
                                    <div className="input-group">
                                        <span className="input-group-addon"><i className="fa fa-user fa" aria-hidden="true"></i></span>
                                        <input onChange={this.handleUsernameChange} value={this.state.username} type="text" className="form-control" name="username" id="username"  placeholder="Enter your Username"/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label for="user_email" className="cols-sm-2 control-label"><span style={{fontSize:'120%'}}>Email</span></label>
                                <div className="cols-sm-10">
                                    <div className="input-group">
                                        <span className="input-group-addon"><i className="fa fa-envelope fa-lg" aria-hidden="true"></i></span>
                                        <input type="email" className="form-control" name="user_email" id="user_email"  placeholder="Enter your Email" value={this.state.email} onChange={(e) => this.handleEmailChange(e)} />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary btn-lg btn-block login-button">Reset Password</button>
                            </div>
                        </form>
                    </div>
                </div>

                <BootstrapModal
                    show={this.state.successShow}
                    onHide={(e) => this.setState({successShow: false})}
                    aria-labelledby="error-modal">
                    <BootstrapModal.Header closeButton>
                        <BootstrapModal.Title id="error-modal-">Password successfully reset!</BootstrapModal.Title>
                    </BootstrapModal.Header>
                    <BootstrapModal.Body>
                        <p>Your password has been successfully reset. You will be redirected to Login</p>
                    </BootstrapModal.Body>
                    <BootstrapModal.Footer>
                        <Button onClick={(e) => window.location = '/login'}>Close</Button>
                    </BootstrapModal.Footer>
                </BootstrapModal>

                <BootstrapModal
                    show={this.state.errorShow}
                    onHide={(e) => this.setState({errorShow: false})}
                    aria-labelledby="error-modal">
                    <BootstrapModal.Header closeButton>
                        <BootstrapModal.Title id="error-modal-">Unable to Login</BootstrapModal.Title>
                    </BootstrapModal.Header>
                    <BootstrapModal.Body>
                        <p>The username or email is incorrect, please try again.</p>
                    </BootstrapModal.Body>
                    <BootstrapModal.Footer>
                        <Button onClick={(e) => this.setState({errorShow: false})}>Close</Button>
                    </BootstrapModal.Footer>
                </BootstrapModal>
            </div>
        );
    }
}

export default ResetPassword;