import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { bindAll } from 'lodash';

class ProfessorProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            username: this.props.username,
            speciality: this.props.speciality,
            subspeciality: this.props.subspeciality,
            school: this.props.school
        };
        bindAll(this, 'handleSpecialityChange', 'handleSubSpecialityChange', 'handleSchoolChange', 'setSubspeciality');
    }

    handleSpecialityChange(e) {
        this.setState({ speciality: e.target.value });
    }

    handleSubSpecialityChange(e) {
        this.setState({ subspeciality: e.target.value });
    }

    handleSchoolChange(e) {
        this.setState({ school: e.target.value });
    }

    handleSaveChange(e) {

    }

    render() {
        return (
            <div>
                <div className="col-sm-5 col-sm-offset-2">
                    <form method="post" action="/api/updateProfessor">
                        <div class="row" style={{ marginRight: "200px", marginLeft: "0px" }}>
                            <h3> <b>{this.state.username}</b> </h3>
                        </div>

                        <div class="row">
                            <div className="form-group col-lg-5">
                                <div className="cols-sm-5">
                                    <div className="input-group">
                                        <span className="input-group-addon"><i className="fa fa-heartbeat fa-lg" aria-hidden="true"></i></span>
                                        <select className="form-control" value={this.state.speciality} onChange={(e) => this.handleSpecialityChange(e)}>
                                            <option value="Medicine">Medicine</option>
                                            <option value="Surgery">Surgery</option>
                                            <option value="Others">Others</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div className="form-group col-lg-5">
                                <div className="cols-sm-5">
                                    <div className="input-group">
                                        <span className="input-group-addon"><i className="fa fa-plus-square fa-lg" aria-hidden="true"></i></span>
                                        {this.setSubspeciality()}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div className="form-group col-lg-5">
                                <div className="cols-sm-5">
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
                        </div>

                        <input type="hidden" value={this.state.id} name="id" />
                         <input type="hidden" value={this.state.speciality} name="speciality" />

                        <div className="form-group col-lg-8" style={{ marginRight: "200px", marginLeft: "190px", marginBottom: "150px" }}>
                            <button type="submit" className="btn btn-primary">Save</button>
                        </div>

                    </form>

                    <div class="row" style={{ marginRight: "200px", marginLeft: "55px" }}>
                        <h3> <b>Scoreboard</b> </h3>
                    </div>
                </div>

                <div className="col-sm-4">
                    <div class="row" style={{ marginRight: "200px", marginLeft: "55px", marginBottom: "300px" }}>
                        <h3> <b>Analytics1</b> </h3>
                    </div>
                    <div class="row" style={{ marginRight: "200px", marginLeft: "55px" }}>
                        <h3> <b>Analytics2</b> </h3>
                    </div>
                </div>

            </div>
        )
    }


    setSubspeciality() {
        if (this.state.speciality === "Medicine") {
            return (
                <select className="form-control" value={this.state.subspeciality} name="subspeciality" onChange={(e) => this.handleSubSpecialityChange(e)}>
                    <option value="Select One">Select One</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Endocrinology">Endocrinology</option>
                    <option value="Gastroenterology & Hepatology">Gastroenterology & Hepatology</option>
                    <option value="Haematology">Haematology</option>
                    <option value="Internal Medicine">Internal Medicine</option>
                    <option value="Medical Oncology">Medical Oncology</option>
                    <option value="Neurology">Neurology</option>
                    <option value="Renal Medicine">Renal Medicine</option>
                    <option value="Respiratory & Critical Care Medicine">Respiratory & Critical Care Medicine</option>
                    <option value="Rheumatology & Immunology">Rheumatology & Immunology</option>
                </select>
            );
        } else if (this.state.speciality === "Others") {
            return (
                <select className="form-control" value={this.state.subspeciality} name="subspeciality" onChange={(e) => this.handleSubSpecialityChange(e)}>
                    <option value="Select One">Select One</option>
                    <option value="Anaesthesiology">Anaesthesiology</option>
                    <option value="Ear Nose & Throat">Ear Nose & Throat</option>
                    <option value="Emergency Medicine">Emergency Medicine</option>
                    <option value="Geriatric Medicine">Geriatric Medicine</option>
                    <option value="Infectious Diseases">Infectious Diseases</option>
                    <option value="Neonatal">Neonatal</option>
                    <option value="Obstetrics & Gynaecology">Obstetrics & Gynaecology</option>
                    <option value="Ophthalmology">Ophthalmology</option>
                    <option value="Palliative Medicine">Palliative Medicine</option>
                    <option value="Psychiatry">Psychiatry</option>
                    <option value="Rehabilitation Medicine">Rehabilitation Medicine</option>
                </select>
            );
        } else if (this.state.speciality === "Surgery") {
            return (
                <select className="form-control" value={this.state.subspeciality} name="subspeciality" onChange={(e) => this.handleSubSpecialityChange(e)}>
                    <option value="Select One">Select One</option>
                    <option value="Breast">Breast</option>
                    <option value="Colorectal">Colorectal</option>
                    <option value="General Surgery">General Surgery</option>
                    <option value="Head & Neck">Head & Neck</option>
                    <option value="Hepato-pancreato-biliary">Hepato-pancreato-biliary</option>
                    <option value="Surgical Oncology">Surgical Oncology</option>
                    <option value="Upper Gastrointestinal & Bariatric Surgery">Upper Gastrointestinal & Bariatric Surgery</option>
                    <option value="Urology">Urology</option>
                    <option value="Vascular Surgery">Vascular Surgery</option>
                </select>
            );
        }
        return;
    }
}

export default ProfessorProfile;

