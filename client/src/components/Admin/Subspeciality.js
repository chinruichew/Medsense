import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, ControlLabel, FormGroup, FormControl, Table } from 'react-bootstrap';

import { addNewSubspeciality, deleteSubspeciality } from '../../actions';
import './Admin.css';
import axios from 'axios';

class Subspeciality extends Component {
    state = {
        fetchedspecialities: [],
        speciality: "",
        subspeciality: ""
    };

    componentDidMount() {
        axios.post('/api/fetchSpeciality').then(res => {
            this.setState({
                fetchedspecialities: res.data
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

    deleteAdminSubspeciality(e) {
        this.props.deleteSubspeciality(e._id)
    }

    renderSubspeciality() {
        let allSubspeciality = this.props.subspeciality.map(subspeciality => {
            return <tr>
                <td><center>{subspeciality.subspeciality}</center></td>
                <td><Button bsStyle="primary" onClick={(e) => this.deleteAdminSubspeciality(subspeciality)}>Delete</Button></td >
            </tr>
        });

        return (
            <tbody>
                {allSubspeciality}
            </tbody>
        );

    }

    setSpecialities() {
        let items = [];
        for (let i = 0; i <= this.state.fetchedspecialities.length; i++) {
            const arr = this.state.fetchedspecialities;
            const object = arr[i];
            if (object != null) {
                items.push(<option key={object.speciality} value={object.speciality}>{object.speciality}</option>);
            }
        }
        return (
            <FormGroup controlId="formControlsDifficulty">
                <ControlLabel style={{ fontSize: "150%" }}>Select Speciality:</ControlLabel>
                <FormControl componentClass="select" value={this.state.speciality} name="speciality" onChange={(e) => this.handleSpecialityChange(e)}>
                    {items}
                </FormControl>
            </FormGroup>
        );
    }

    handleSpecialityChange(e) {
        const value = e.target.value;
        this.setState({ speciality: value });
    }

    setSubspeciality() {
        return (
            <FormGroup controlId="formControlsTitle">
                <ControlLabel style={{ fontSize: "150%" }}>Subspeciality:</ControlLabel>
                <FormControl type="text" value={this.state.subspeciality} name="username" onChange={(e) => this.handleSubspecialityChange(e)} />
            </FormGroup>
        );
    }

    handleSubspecialityChange(e) {
        const value = e.target.value;
        this.setState({ subspeciality: value });
    }

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

    render() {
        return (
            <div>
                {this.setSpecialities()}
                {this.setSubspeciality()}
                <Button style={{ fontSize: "125%" }} bsStyle="primary" onClick={(e) => this.addSubspeciality()}>Add Subspeciality</Button>
                {this.renderTableSubspeciality()}
            </div>
        );
    }
}

function mapStateToProps({ auth, subspeciality }) {
    return { auth, subspeciality };
}

export default connect(mapStateToProps, { addNewSubspeciality, deleteSubspeciality })(Subspeciality);