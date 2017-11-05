import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { bindAll } from 'lodash';

class StudentProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            student: this.props.student,
            school: this.props.student.school,
            year: this.props.student.year,
            profilepicture: this.props.student.profilepicture,
            filename: null,
            filetype: null
        };
        bindAll(this, 'handleSchoolChange', 'handleYearChange', 'handleFile');
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
        let { school, year, profilepicture, filename, filetype} = this.state;

        let student = Object.assign({}, this.state.student);
        student.school = school;
        student.year = year;
        student.profilepicture = profilepicture;
        this.setState({ student });
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
                <table style={{ "table-layout": "fixed", "width": "350px", "line-height": "90px", "margin": "0 auto" }}>
                    <tr align="left"> <td>Username</td> <td>Username</td> </tr>

                    <tr align="left"> <td>School</td> <td> <select value={this.state.school}
                        onChange={this.handleSchoolChange}
                        style={{ "width": "160px" }}
                        className="form-control has-error">
                        <option value="Duke-NUS">Duke-NUS</option>
                        <option value="NTU">NTU</option>
                        <option value="NUS">NUS</option>
                    </select> </td> </tr>

                    <tr align="left"> <td>Year of Study</td> <td> <select value={this.state.year}
                        onChange={this.handleYearChange}
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

                <Button align="right" bsStyle="primary" onClick={(e) => this.saveChanges(e)}>Save Changes</Button>
            </div>
        )
    }
}

export default StudentProfile;