import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { bindAll } from 'lodash';

class ProfessorProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            professor: this.props.professor,
            school: this.props.professor.school,
            speciality: this.props.professor.speciality,
            subspeciality: this.props.professor.subspeciality,
            profilepicture: this.props.professor.profilepicture,
            filename: null,
            filetype: null
        };
        bindAll(this, 'handleSchoolChange', 'handleSpecialityChange', 'handleSubspecialityChange', 'handleFile');
    }

    handleSchoolChange(e) {
        this.setState({ school: e.target.value });
    }

    handleSpecialityChange(e) {
        this.setState({ speciality: e.target.value });
    }

    handleSubspecialityChange(e) {
        this.setState({ subspeciality: e.target.value });
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
        let { school, speciality, subspeciality, profilepicture, filename, filetype} = this.state;

        let professor = Object.assign({}, this.state.professor);
        professor.school = school;
        professor.speciality = speciality;
        professor.subspeciality = subspeciality;
        professor.profilepicture = profilepicture;

        this.setState({ professor });
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

        let subspeciality;
        if (this.state.speciality == "Surgery") {
            subspeciality = (<select value={this.state.subspeciality}
                onChange={this.handleSubspecialityChange}
                style={{ "width": "160px" }}
                className="form-control has-error">
                <option value="Cardiology">Cardiology</option>
                <option value="Respiratory">Respiratory</option>
                <option value="Gastroenterology">Gastroenterology</option>
                <option value="Renal">Renal</option>
                <option value="Neurology">Neurology</option>
                <option value="Rheumatology">Rheumatology</option>
                <option value="Endocrinology">Endocrinology</option>
                <option value="Oncology">Oncology</option>

            </select>);
        } else if (this.state.speciality == "Medicine") {
            subspeciality = (<select value={this.state.subspeciality}
                onChange={this.handleSubspecialityChange}
                style={{ "width": "160px" }}
                className="form-control has-error">
                <option value="Upper GI">Upper GI</option>
                <option value="Colorectal">Colorectal</option>
                <option value="HPB">HPB</option>
                <option value="HN">HN</option>
                <option value="Breast">Breast</option>
                <option value="Urology">Urology</option>
                <option value="Vascular">Vascular</option>
            </select>);
        } else {
            subspeciality = (<select value={this.state.subspeciality}
                onChange={this.handleSubspecialityChange}
                style={{ "width": "160px" }}
                className="form-control has-error">
                <option value="Hand">Hand</option>
                <option value="UL">UL</option>
                <option value="LL">LL</option>
                <option value="Spine">Spine</option>
                <option value="Oncology">Oncology</option>
            </select>);
        }

        return (
            <div>
                <table style={{ "tableLayout": "fixed", "width": "350px", "lineHeight": "90px", "margin": "0 auto" }}>
                    <tbody>
                    <tr align="left"><td>Username</td><td>{this.state.professor.username}</td></tr>

                    <tr align="left"><td>School</td><td><select value={this.state.school}
                        onChange={this.handleSchoolChange}
                        style={{ "width": "160px" }}
                        className="form-control has-error">
                        <option value="Duke-NUS">Duke-NUS</option>
                        <option value="NTU">NTU</option>
                        <option value="NUS">NUS</option>
                    </select></td></tr>

                    <tr align="left"><td>Speciality</td><td><select value={this.state.speciality}
                        onChange={this.handleSpecialityChange}
                        style={{ "width": "160px" }}
                        className="form-control has-error">
                        <option value="Surgery">Surgery</option>
                        <option value="Medicine">Medicine</option>
                        <option value="Orthopaedics">Orthopaedics</option>
                    </select></td></tr>

                    <tr align="left"><td>Sub-Speciality</td><td>
                        {subspeciality}</td></tr>

                    <tr align="left">
                        <td>Profile Picture</td>
                        <td><input type="file" onChange={this.handleFile} /></td>
                    </tr>
                    </tbody>
                </table>

                <Button align="right" bsStyle="primary" onClick={(e) => this.saveChanges(e)}>Save Changes</Button>
            </div>
        )
    }
}

export default ProfessorProfile;