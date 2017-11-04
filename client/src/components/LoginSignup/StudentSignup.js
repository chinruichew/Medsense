import React, { Component } from 'react';

class StudentSignup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            password: null,
            confirmpassword: null,
            school: "Duke-NUS",
            year: "Year 1"
        };
    }

    componentDidMount() {
        // Dynamically set background image
        document.body.style.backgroundImage = "url('./home_background.jpg')";
    }

    handleSchoolChange(e) {
        this.setState({ school: e.target.value });
    }

    handleYearChange(e) {
        this.setState({ year: e.target.value });
    }

    render() {
        let imagepreview;
        if (this.state.profilepicture) {
            imagepreview = (
                <div>
                    <img className='image-preview' src={this.state.profilepicture} width="80" height="80" />
                </div>
            );
        }


        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="main-login main-center">
                        <img src="./medsense_logo.png" style={{height: '120px', width: '300px'}} />
                        <form className="form-horizontal" method="post" action="/auth/local/signup">
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
                            <div className="form-group">
                                <label for="confirm_password" className="cols-sm-2 control-label">Confirm Password</label>
                                <div className="cols-sm-10">
                                    <div className="input-group">
                                        <span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true"></i></span>
                                        <input type="password" className="form-control" name="confirm_password" id="confirm_password"  placeholder="Confirm your Password"/>
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
                                <label>Upload a profile picture:</label>
                                <input type="file" value="profile_picture" />
                            </div>
                            <div className="form-group ">
                                <button type="submit" className="btn btn-primary btn-lg btn-block login-button">Sign Up</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default StudentSignup;