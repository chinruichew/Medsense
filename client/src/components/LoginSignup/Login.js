import React, { Component } from 'react';

class Login extends Component {
    componentDidMount() {
        // Dynamically set background image
        document.body.style.backgroundImage = "url('./home_background.jpg')";
        document.body.style.backgroundSize = "100% 1200px";
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="main-login main-center">
                        <img src="./medsense_logo.png" style={{height: '120px', width: '300px'}} />
                        <form className="form-horizontal" method="get" action="/auth/local">
                            <div className="form-group">
                                <label for="username" className="cols-sm-2 control-label">Username</label>
                                <div className="cols-sm-10">
                                    <div className="input-group">
                                        <span className="input-group-addon"><i className="fa fa-user fa" aria-hidden="true"></i></span>
                                        <input type="text" className="form-control" name="username" id="username"  placeholder="Enter your Username"/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label for="password" className="cols-sm-2 control-label">Password</label>
                                <div className="cols-sm-10">
                                    <div className="input-group">
                                        <span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true"></i></span>
                                        <input type="password" className="form-control" name="password" id="password"  placeholder="Enter your Password"/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group ">
                                <button type="submit" className="btn btn-primary btn-lg btn-block login-button">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;
