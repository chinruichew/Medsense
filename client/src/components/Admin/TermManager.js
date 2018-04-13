import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import './Admin.css';
import Approach from './Approach';
import Speciality from './Speciality';
import Subspeciality from './Subspeciality';
import { fetchApproach2, fetchSpeciality, fetchSubspeciality } from '../../actions';

class TermManager extends Component {
    state = {
        constants: null
    };

    componentDidMount() {
        axios.get('/api/getConstantTypes').then(res => {
            this.setState({constants: res.data});
        }).catch(err => {
            console.log(err);
        });
    }

    componentWillMount() {
        this.props.fetchApproach2();
        this.props.fetchSpeciality();
        this.props.fetchSubspeciality();
    }

    renderContent() {
        switch(this.props.auth) {
            case null:
                return;
            case false:
                return <Redirect to='/' />;
            default:
                switch(this.state.constants) {
                    case null:
                        return;
                    default:
                        switch(this.props.auth.usertype) {
                            case this.state.constants.USER_TYPE_ADMIN:
                                switch (this.props.speciality && this.props.approach && this.props.subspeciality) {
                                    case null:
                                        return;
                                    default:
                                        return (
                                            <div className="container-fluid">
                                                <div className="col-sm-12">
                                                    <Tabs defaultActiveKey={1} className="tab">
                                                        <Tab eventKey={1} title="Approach">
                                                            <br />
                                                            <Approach />
                                                            <br />
                                                        </Tab>
                                                        <Tab eventKey={2} title="Speciality">
                                                            <br />
                                                            <Speciality />
                                                            <br />
                                                        </Tab>
                                                        <Tab eventKey={3} title="Subspeciality">
                                                            <br />
                                                            <Subspeciality />
                                                            <br />
                                                        </Tab>
                                                    </Tabs>
                                                </div>
                                                <br />
                                                <br />
                                            </div>
                                        );
                                }
                            default:
                                return <Redirect to='/' />;
                        }
                }
        }
    }

    render() {
        return (
            <div>
                {this.renderContent()}
            </div>
        );
    }
}

function mapStateToProps({ auth, approach, speciality, subspeciality }) {
    return { auth, approach, speciality, subspeciality };
}



export default connect(mapStateToProps, { fetchApproach2, fetchSpeciality, fetchSubspeciality })(TermManager);