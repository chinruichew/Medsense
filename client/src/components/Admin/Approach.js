import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, ControlLabel, FormGroup, FormControl, Table } from 'react-bootstrap';

import { addNewApproach } from '../../actions';
import './Admin.css';
import axios from 'axios';

class Approach extends Component {
    state = {
        approach: ""
    };

    componentDidMount() {

    }

    renderTableApproach() {
        return (
            <Table responsive>
                <thead>
                    <tr style={{ background: '#D9EDF7', fontSize: "130%" }}>
                        <th><center>Approaches</center></th>
                    </tr>
                </thead>
                {this.renderApproach()}
            </Table>
        );
    }

    deleteAdminApproach(e) {
        console.log(e)
        console.log(e._id)
        //this.props.deleteAdminStudent(e._id)
    }

    renderApproach() {
        let allApproach = this.props.approach.map(approach => {
            return <tr>
                <td><center>{approach.approach}</center></td>
                <td><Button onClick={(e) => this.deleteAdminApproach(approach)}>Delete</Button></td >
            </tr>
        });

        return (
            <tbody>
                {allApproach}
            </tbody>
        );

    }

    setApproach() {
        return (
            <FormGroup controlId="formControlsTitle">
                <ControlLabel style={{ fontSize: "150%" }}>Approach:</ControlLabel>
                <FormControl type="text" value={this.state.approach} name="username" onChange={(e) => this.handleApproachChange(e)} />
            </FormGroup>
        );
    }

    handleApproachChange(e) {
        const value = e.target.value;
        this.setState({ approach: value });
    }

    addApproach() {
        if (this.state.approach.trim() === '' || this.state.approach == null) {
            window.alert("Approach not filled")
        } else {
            this.props.addNewApproach(this.state).then(function (response) {
                if (response.data === "Approach Exists") {
                    window.alert("Approach Exists")
                } else {
                    window.alert("Approach Created")
                }
            })
            console.log(this.state.approach)
        }
    }


    render() {
        return (
            <div>
                {this.setApproach()}
                <Button style={{ fontSize: "125%" }} bsStyle="primary" onClick={(e) => this.addApproach()}>Add Approach</Button>
                {this.renderTableApproach()}
            </div>
        );
    }
}

function mapStateToProps({ auth, approach }) {
    return { auth, approach };
}

export default connect(mapStateToProps, { addNewApproach })(Approach);
