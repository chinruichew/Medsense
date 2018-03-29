import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, ControlLabel, FormGroup, FormControl, Table, Col, Row } from 'react-bootstrap';
import { addNewApproach, deleteApproach } from '../../actions';
import './Admin.css';

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
                        <th> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</th>
                    </tr>
                </thead>
                {this.renderApproach()}
            </Table>
        );
    }

    deleteAdminApproach(e) {
        this.props.deleteApproach(e._id)
    }

    renderApproach() {
        let allApproach = this.props.approach.map(approach => {
            return <tr>
                <td><center>{approach.approach}</center></td>
                <td><center><Button bsStyle="primary" onClick={(e) => this.deleteAdminApproach(approach)}>Delete</Button></center></td >
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
                <Row>
                    <Col sm={9}>
                        <FormControl type="text" value={this.state.approach} name="username"
                                     onChange={(e) => this.handleApproachChange(e)} />
                    </Col>
                    <Col smOffset={10}>
                        <Button style={{ fontSize: "125%" }} bsStyle="primary"
                                onClick={(e) => this.addApproach()}>Add Approach</Button>
                    </Col>
                </Row>
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
            });
        }
    }


    render() {
        return (
            <div style={{paddingTop: "1%"}}>
                {this.setApproach()}
                <br/>
                {this.renderTableApproach()}
            </div>
        );
    }
}

function mapStateToProps({ auth, approach }) {
    return { auth, approach };
}

export default connect(mapStateToProps, { addNewApproach, deleteApproach })(Approach);
