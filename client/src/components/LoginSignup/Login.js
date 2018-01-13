import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {connect} from "react-redux";
import axios from 'axios';
import BootstrapModal from '../UI/Modal/VettingBootstrapModal.js';
import { Button } from 'react-bootstrap';
import * as ReactGA from "react-ga";

class Login extends Component {
    state = {
        username: '',
        password: '',
        authentication: false
    };

    componentDidMount() {
        // Dynamically set background image
        document.body.style.backgroundImage = "url('./home_background.jpg')";
        document.body.style.backgroundSize = "100% 1200px";
    }

    handleUsernameChange = (e) => {
        this.setState({username: e.target.value});
    };

    handlePasswordChange = (e) => {
        this.setState({password: e.target.value});
    };

    onLogin = (e) => {
        e.preventDefault();
        axios.post('/api/login', {
            ...this.state
        }).then(res => {
            if(res.data === 'Authenticated') {
                // this.setState({authentication: true});
                window.location = '/home';
            } else {
                // alert(res.data);
                this.setState({vmShow: true});
            }
        });
    };

    renderContent() {
        let vmClose = () => this.setState({ vmShow: false });
        switch(this.props.auth) {
            case null:
                return;
            case false:
                return (
                    <div className="container-fluid">
                        <div className="row">
                            <div className="main-login main-center">
                                <img src="./medsense_logo.png" style={{height: '120px', width: '300px'}} alt="Medsense" />
                                <form className="form-horizontal" method="post" onSubmit={this.onLogin}>
                                    <div className="form-group">
                                        <label for="username" className="cols-sm-2 control-label">Username</label>
                                        <div className="cols-sm-10">
                                            <div className="input-group">
                                                <span className="input-group-addon"><i className="fa fa-user fa" aria-hidden="true"></i></span>
                                                <input onChange={this.handleUsernameChange} value={this.state.username} type="text" className="form-control" name="username" id="username"  placeholder="Enter your Username"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label for="password" className="cols-sm-2 control-label">Password</label>
                                        <div className="cols-sm-10">
                                            <div className="input-group">
                                                <span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true"></i></span>
                                                <input onChange={this.handlePasswordChange} value={this.state.password} type="password" className="form-control" name="password" id="password"  placeholder="Enter your Password"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group ">
                                        <button type="submit" className="btn btn-primary btn-lg btn-block login-button">Login</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <BootstrapModal
                            show={this.state.vmShow}
                            onHide={vmClose}
                            aria-labelledby="error-modal">
                            <BootstrapModal.Header closeButton>
                                <BootstrapModal.Title id="error-modal-">Unable to Login</BootstrapModal.Title>
                            </BootstrapModal.Header>
                            <BootstrapModal.Body>
                                <p>The username or password is incorrect, please try again.</p>
                            </BootstrapModal.Body>
                            <BootstrapModal.Footer>
                                <Button onClick={vmClose}>Close</Button>
                            </BootstrapModal.Footer>
                        </BootstrapModal>
                    </div>
                );
            default:
                return(<Redirect to="/home" />);
        }
    }

    render() {
        // React GA
        ReactGA.initialize('UA-112382826-1');
        ReactGA.pageview(window.location.pathname + window.location.search);

        return(
            <div>
                {this.renderContent()}
            </div>
        );
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(Login);
