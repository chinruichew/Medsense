import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { bindAll } from 'lodash';

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
        bindAll(this, 'handleUsernameChange', 'handlePasswordChange', 'handleConfirmPasswordChange', 'handleSchoolChange', 'handleYearChange', 'handleFile');
    }

    handleUsernameChange(e) {
        this.setState({ username: e.target.value });
    }

    handlePasswordChange(e) {
        this.setState({ password: e.target.value });
    }

    handleConfirmPasswordChange(e) {
        this.setState({ confirmpassword: e.target.value });
    }

    handleSchoolChange(e) {
        this.setState({ school: e.target.value });
    }

    handleYearChange(e) {
        this.setState({ year: e.target.value });
    }

    handleFile(e) {
        const reader = new FileReader();
        const file = e.target.files[0];
        reader.onload = (upload) => {
            this.setState({
                profilepicture: upload.target.result,
                filename: file.name,
                filetype: file.type
            });
        };
        reader.readAsDataURL(file);
    }

    saveChanges(e) {
        e.preventDefault();
        if (this.state.password == null || this.state.confirmpassword == null) {

        } else if (this.state.password !== this.state.confirmpassword) {
            window.alert("Passwords do not match!");
        }

        let { username, password, confirmpassword, school, year, profilepicture, filename, filetype} = this.state;
        console.log(this.state);
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
            <div>
                <form action="/auth/local/signup" method="get">
                    <table style={{ "table-layout": "fixed", "width": "350px", "line-height": "90px", "margin": "0 auto" }}>
                        <tr align="left"> <td >Username</td> <td><input type="text"
                            placeholder="Enter Username"
                            value={this.state.username}
                            className="form-control has-error"
                            style={{ "width": "180px" }}
                            onChange={(e) => this.handleUsernameChange(e)} /></td> </tr>

                        <tr align="left"> <td>Password</td> <td> <input type="password"
                            placeholder="Enter Password"
                            value={this.state.password}
                            className="form-control has-error"
                            style={{ "width": "180px" }}
                            onChange={(e) => this.handlePasswordChange(e)} /> </td> </tr>

                        <tr align="left"> <td>Confirm Password</td> <td> <input type="password"
                            placeholder="Confirm Password"
                            value={this.state.confirmpassword}
                            className="form-control has-error"
                            style={{ "width": "180px" }}
                            onChange={(e) => this.handleConfirmPasswordChange(e)} /> </td> </tr>

                        <tr align="left"> <td>School</td> <td> <select value={this.state.school}
                            onChange={(e) => this.handleSchoolChange(e)}
                            style={{ "width": "160px" }}
                            className="form-control has-error">
                            <option value="Duke-NUS">Duke-NUS</option>
                            <option value="NTU">NTU</option>
                            <option value="NUS">NUS</option>
                        </select> </td> </tr>

                        <tr align="left"> <td>Year of Study</td> <td> <select value={this.state.year}
                            onChange={(e) => this.handleYearChange(e)}
                            style={{ "width": "160px" }}
                            className="form-control has-error">
                            <option value="1">Year 1</option>
                            <option value="2">Year 2</option>
                            <option value="3">Year 3</option>
                            <option value="4">Year 4</option>
                            <option value="5">Year 5</option>
                        </select> </td> </tr>

                        <tr align="left">
                            <td>Profile Picture</td>
                            <td> <input type="file" onChange={this.handleFile} /> </td>
                        </tr>
                    </table>
                    <Button type="submit" align="right" bsStyle="primary">Sign Up</Button>
                </form>
            </div>
        )
    }
}

export default StudentSignup;