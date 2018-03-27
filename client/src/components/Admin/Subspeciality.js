import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, ControlLabel, FormGroup, FormControl, Table, Col, Row } from 'react-bootstrap';
import { addNewSubspeciality, deleteSubspeciality } from '../../actions';
import './Admin.css';

class Subspeciality extends Component {
    state = {
        subspeciality: ""
    };

    componentDidMount() {

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
                <td><center><Button bsStyle="primary" onClick={(e) => this.deleteAdminSubspeciality(subspeciality)}>Delete</Button></center></td >
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
                    <Col smOffset={10}><Button style={{ fontSize: "125%" }} bsStyle="primary"
                                               onClick={(e) => this.addSubspeciality()}>Add Subspeciality</Button>
                    </Col>
                </Row>
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
            })
            console.log(this.state.subspeciality)
        }
    }

    render() {
        return (
            <div style={{paddingTop: "1%"}}>
                {this.setSubspeciality()}
                <br/>
                {this.renderTableSubspeciality()}
            </div>
        );
    }
}

function mapStateToProps({ auth, subspeciality }) {
    return { auth, subspeciality };
}

export default connect(mapStateToProps, { addNewSubspeciality, deleteSubspeciality })(Subspeciality);


