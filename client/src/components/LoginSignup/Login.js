import React, { Component } from 'react';
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
        //let { username, password } = this.state;
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row" style={{"marginTop": '150px'}}>
                    <div className="col-sm-4 col-sm-offset-4">
                        <form action="/auth/local" method="get">
                            <div className="input-group" style={{"marginBottom": '10px'}}>
                                <span className="input-group-addon"><span className="glyphicon glyphicon-user"></span></span>
                                <input type="text"
                                       placeholder="Enter Username"
                                       value={this.state.username}
                                       className="form-control"
                                       style={{ "width": "180px" }}
                                       onChange={(e) => this.handleUsernameChange(e)}
                                        name="email"/>
                            </div>
                            <div className="input-group" style={{"marginBottom": '10px'}}>
                                <span className="input-group-addon"><span className="glyphicon glyphicon-lock"></span></span>
                                <input type="password"
                                       placeholder="Enter Password"
                                       value={this.state.password}
                                       className="form-control has-error"
                                       style={{ "width": "180px" }}
                                       onChange={(e) => this.handlePasswordChange(e)}
                                       name="password"/>
                            </div>
                            <button type="submit"
                                    className="btn btn-primary">
                                Login
                            </button>
                        </form>
                    </div>
                </div>
                <br />
            </div >
        )
    }
}

export default Login;
