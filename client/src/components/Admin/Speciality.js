import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, ControlLabel, FormGroup, FormControl, Table, Col, Row, Modal } from 'react-bootstrap';
import { addNewSpeciality, deleteSpeciality } from '../../actions';
import './Admin.css';

class Speciality extends Component {
    state = {
        speciality: "",
        showDeleteConfirm: false,
        specialityidToDelete: ""
    };

    renderTableSpeciality() {
        return (
            <Table responsive>
                <thead>
                    <tr style={{ background: '#D9EDF7', fontSize: "130%" }}>
                        <th><center>Specialityes</center></th>
                        <th> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</th>
                    </tr>
                </thead>
                {this.renderSpeciality()}
            </Table>
        );
    }

    handleDeleteAdminSpeciality(e) {
        this.setState({specialityidToDelete: e._id, showDeleteConfirm: true});
    }

    deleteAdminSpeciality(e){
        this.setState({showDeleteConfirm: false});
        this.props.deleteSpeciality(this.state.specialityidToDelete);
    }

    renderSpeciality() {
        let allSpeciality = this.props.speciality.map(speciality => {
            return <tr>
                <td><center>{speciality.speciality}</center></td>
                <td><center><Button bsStyle="primary" onClick={(e) => this.handleDeleteAdminSpeciality(speciality)}>Delete</Button></center></td >
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
                        <Button style={{ fontSize: "125%" }} bsStyle="primary"
                                onClick={(e) => this.addSpeciality()}>Add Speciality</Button>
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
            window.alert("Speciality not filled")
        } else {
            this.props.addNewSpeciality(this.state).then(function (response) {
                if (response.data === "Speciality Exists") {
                    window.alert("Speciality Exists");
                } else {
                    window.alert("Speciality Created");
                }
            });
        }
    }

    render() {
        return (
            <div style={{paddingTop: "1%"}}>
                {this.setSpeciality()}
                <br/>
                {this.renderTableSpeciality()}

                <Modal show={this.state.showDeleteConfirm} onHide={(e) => this.setState({ showDeleteConfirm: false })}>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title">
                            Deletion Confirmation
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure you want to delete this speciality?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="success" onClick={(e) => this.deleteAdminSpeciality(e) }>Yes</Button>
                        <Button bsStyle="danger" onClick={(e) => this.setState({ showDeleteConfirm: false})}>No</Button>
                    </Modal.Footer>
                </Modal>

            </div>
        );
    }
}

function mapStateToProps({ auth, speciality }) {
    return { auth, speciality };
}

export default connect(mapStateToProps, { addNewSpeciality, deleteSpeciality })(Speciality);


