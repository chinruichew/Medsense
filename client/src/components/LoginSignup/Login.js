import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { bindAll } from 'lodash';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
        bindAll(this, 'handleUsernameChange', 'handlePasswordChange', 'handleLogin');
    }

    handleUsernameChange(e) {
        this.setState({ username: e.target.value });
    }

    handlePasswordChange(e) {
        this.setState({ password: e.target.value });
    }

    handleLogin(e) {
        let { username, password } = this.state;
    }

    render() {
        return (
            <div style={{
                "position": "fixed",
                "top": "35%",
                "left": "40%",
                "margin-top": "-30px",
                "margin-left": "-40px"
            }}>
                <div className="row">
                    <div className="col-lg-4 col-lg-offset-4">
                        <div className="input-group">
                            <span className="input-group-addon"><span className="glyphicon glyphicon-user"></span></span>
                            <input type="text"
                                placeholder="Enter Username"
                                value={this.state.username}
                                className="form-control"
                                style={{ "width": "180px" }}
                                onChange={(e) => this.handleUsernameChange(e)} />
                        </div>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-lg-4 col-lg-offset-4">
                        <div className="input-group">
                            <span className="input-group-addon"><span className="glyphicon glyphicon-lock"></span></span>
                            <input type="password"
                                placeholder="Enter Password"
                                value={this.state.password}
                                className="form-control has-error"
                                style={{ "width": "180px" }}
                                onChange={(e) => this.handlePasswordChange(e)} />
                        </div>
                    </div>
                </div>
                <br />
                <button style={{"marginRight":"30px"}}type="button"
                    className="btn btn-primary"
                    onClick={(e) => this.handleLogin(e)}>
                    Login </button>
            </div >
        )
    }
}

export default Login;
