import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, ControlLabel, FormGroup, FormControl, Table, Col, Row, Modal } from 'react-bootstrap';
import { addNewSubspeciality, deleteSubspeciality } from '../../actions';
import axios from 'axios';
import Multiselect from 'react-bootstrap-multiselect';

import './Admin.css';

class Subspeciality extends Component {
    state = {
        subspeciality: "",
        showSpec: false,
        specialities: null,
        selectedOptions: [],
        showDeleteConfirm: false,
        subspecialityidToDelete: ""
    };

    componentDidMount() {
        axios.post('/api/fetchSpeciality').then(res => {
            this.setState({
                specialities: res.data
            });
        });
    }

    renderTableSubspeciality() {
        return (
            <Table responsive>
                <thead>
                    <tr style={{ background: '#D9EDF7', fontSize: "130%" }}>
                        <th><center>Subspeciality</center></th>
                        <th> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</th>
                    </tr>
                </thead>
                {this.renderSubspeciality()}
            </Table>
        );
    }

    // deleteAdminSubspeciality(e) {
    //     this.props.deleteSubspeciality(e._id)
    // }

    handleDeleteAdminSubspeciality(e) {
        this.setState({subspecialityidToDelete: e._id, showDeleteConfirm: true});
    }

    deleteAdminSubspeciality(e){
        this.setState({showDeleteConfirm: false});
        this.props.deleteSubspeciality(this.state.subspecialityidToDelete);
    }


    renderSubspeciality() {
        let allSubspeciality = this.props.subspeciality.map(subspeciality => {
            return <tr>
                <td><center>{subspeciality.subspeciality}</center></td>
                <td><center><Button bsStyle="primary" onClick={(e) => this.handleDeleteAdminSubspeciality(subspeciality)}>Delete</Button></center></td >
            </tr>
        });

        return (
            <tbody>
                {allSubspeciality}
            </tbody>
        );

    }

    setSubspeciality() {
        return (
            <FormGroup controlId="formControlsTitle">
                <ControlLabel style={{ fontSize: "150%" }}>Subspeciality:</ControlLabel>
                <Row>
                    <Col sm={9}>
                        <FormControl type="text" value={this.state.subspeciality} name="username"
                                     onChange={(e) => this.handleSubspecialityChange(e)} />
                    </Col>
                    <Col smOffset={10}><Button style={{ fontSize: "125%" }} bsStyle="primary" onClick={(e) => this.showSpecialities()}>Choose Speciality</Button>
                    </Col>
                </Row>
            </FormGroup>
        );
    }

    handleSubspecialityChange(e) {
        const value = e.target.value;
        this.setState({ subspeciality: value });
    }

    showSpecialities = () => {
        this.setState({
            showSpec: true
        });
    };

    addSubspeciality() {
        if (this.state.subspeciality.trim() === '' || this.state.subspeciality == null) {
            window.alert("Subspeciality not filled")
        } else {
            this.props.addNewSubspeciality(this.state).then(function (response) {
                if (response.data === "Subspeciality Exists") {
                    window.alert("Subspeciality Exists")
                } else {
                    window.alert("Subspeciality Created")
                }
            });
        }
    }

    handleChange = (options) => {
        for(let i = 0; i < options.length; i++) {
            const option = options[i];
            let toAdd = true;
            for(let j = 0; j < this.state.selectedOptions.length; j++) {
                const selectedOption = this.state.selectedOptions[j];
                if(selectedOption === option.innerText) {
                    toAdd = false;
                    break;
                }
            }
            if(toAdd) {
                this.state.selectedOptions.push(option.innerText);
            }
        }
    };

    renderSpecialitySelection = () => {
        if(this.state.showSpec) {
            const specialities = [];
            for(let i = 0; i < this.state.specialities.length; i++) {
                const speciality = this.state.specialities[i];
                if(speciality.speciality !== "Clinical Practicum") {
                    specialities.push({
                        value: speciality.speciality
                    });
                }
            }

            return(
                <form>
                    <Row>
                        <Col sm={9}>
                            <Multiselect onChange={this.handleChange} data={specialities} />
                        </Col>
                        <Col smOffset={10}>
                            <Button style={{ fontSize: "125%" }} bsStyle="primary" onClick={(e) => this.addSubspeciality()}>Add Subspeciality</Button>
                        </Col>
                    </Row>
                </form>
            );
        }
        return;
    };

    renderContent = () => {
        switch(this.state.specialities) {
            case null:
                return;
            default:
                return (
                    <div style={{paddingTop: "1%"}}>
                        {this.setSubspeciality()}
                        <br/>
                        {this.renderSpecialitySelection()}
                        <br/>
                        {this.renderTableSubspeciality()}
                    </div>
                );
        }
    };

    render() {
        return(
            <div>
                {this.renderContent()}

                <Modal show={this.state.showDeleteConfirm} onHide={(e) => this.setState({ showDeleteConfirm: false })}>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title">
                            Deletion Confirmation
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure you want to delete this subspeciality?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={(e) => this.deleteAdminSubspeciality(e) }>Yes</Button>
                        <Button onClick={(e) => this.setState({ showDeleteConfirm: false})}>No</Button>
                    </Modal.Footer>
                </Modal>

            </div>
        );
    }
}

function mapStateToProps({ auth, subspeciality }) {
    return { auth, subspeciality };
}

export default connect(mapStateToProps, { addNewSubspeciality, deleteSubspeciality })(Subspeciality);


