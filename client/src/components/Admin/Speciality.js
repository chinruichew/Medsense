import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, ControlLabel, FormGroup, FormControl, Table, Row, Col } from 'react-bootstrap';
import { addNewSpeciality, deleteSpeciality } from '../../actions';
import './Admin.css';

class Speciality extends Component {
    state = {
        speciality: ""
    };

    componentDidMount() {

    }

    renderTableSpeciality() {
        return (
            <Table responsive>
                <thead>
                    <tr style={{ background: '#D9EDF7', fontSize: "130%" }}>
                        <th><center>Speciality</center></th>
                        <th> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</th>
                    </tr>
                </thead>
                {this.renderSpeciality()}
            </Table>
        );
    }

    deleteAdminSpeciality(e) {
        this.props.deleteSpeciality(e._id)
    }

    renderSpeciality() {
        let allSpeciality = this.props.speciality.map(speciality => {
            return <tr>
                <td><center>{speciality.speciality}</center></td>
                <td><center><Button bsStyle="primary" onClick={(e) => this.deleteAdminSpeciality(speciality)}>Delete</Button></center></td >
            </tr>
        });

        return (
            <tbody>
                {allSpeciality}
            </tbody>
        );

    }

    setSpeciality() {
        return (
            <FormGroup controlId="formControlsTitle">
                <ControlLabel style={{ fontSize: "150%" }}>Speciality:</ControlLabel>
                <Row>
                    <Col sm={9}>
                        <FormControl type="text" value={this.state.speciality} name="username"
                                     onChange={(e) => this.handleSpecialityChange(e)} />
                    </Col>
                    <Col smOffset={10}>
                        <Button style={{ fontSize: "125%" }} bsStyle="primary" o
                                nClick={(e) => this.addSpeciality()}>Add Speciality</Button>
                    </Col>
                </Row>
            </FormGroup>
        );
    }

    handleSpecialityChange(e) {
        const value = e.target.value;
        this.setState({ speciality: value });
    }

    addSpeciality() {
        if (this.state.speciality.trim() === '' || this.state.speciality == null) {
            window.alert("Approach not filled")
        } else {
            this.props.addNewSpeciality(this.state).then(function (response) {
                if (response.data === "Speciality Exists") {
                    window.alert("Speciality Exists")
                } else {
                    window.alert("Speciality Created")
                }
            })
        }
    }


    render() {
        return (
            <div style={{paddingTop: "1%"}}>
                {this.setSpeciality()}
                <br/>
                {this.renderTableSpeciality()}
            </div>
        );
    }
}

function mapStateToProps({ auth, speciality }) {
    return { auth, speciality };
}

export default connect(mapStateToProps, { addNewSpeciality, deleteSpeciality })(Speciality);
