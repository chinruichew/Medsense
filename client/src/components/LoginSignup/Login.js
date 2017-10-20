import React, { Component } from 'react';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
    }

    handleUsernameChange(e) {
        this.setState({ username: e.target.value });
    }

    handlePasswordChange(e) {
        this.setState({ password: e.target.value });
    }

    handleLogin(e) {
        console.log(this.state.username);
        console.log(this.state.password);
    }

    render() {
        return (
            <div>
                <input type="text"
                    placeholder="Enter Username"
                    value={this.state.username}
                    onChange={(e) => this.handleUsernameChange(e)} />

                <input type="text"
                    placeholder="Enter Password"
                    value={this.state.password}
                    onChange={(e) => this.handlePasswordChange(e)} />

                <button type="button"
                    onClick={(e) => this.handleLogin(e)}>
                    Login </button>
            </div>
        )
    }
}

export default Login;
