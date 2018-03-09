import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

import './Admin.css';
import Approach from './Approach';
import Speciality from './Speciality';
import { fetchApproach, fetchSpeciality } from '../../actions';

class TermManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentWillMount() {
        this.props.fetchApproach();
        this.props.fetchSpeciality();
    }

    renderContent() {
        switch (this.state.auth) {
            case false:
                return <Redirect to='/' />;
            default:
                switch (this.props.speciality && this.props.approach) {
                    case null:
                        return;
                    default:
                        return (
                            <div className="container-fluid">
                                <div className="row">
                                    <div className='col-sm-9 col-sm-offset-1'>
                                        <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                                            <Tab eventKey={1} title="Approach">
                                                <br />
                                                <Approach />
                                                <br />
                                            </Tab>
                                            <Tab eventKey={2} title="Speciality">
                                                <br />
                                                <Speciality />
                                            </Tab>
                                        </Tabs>
                                    </div>
                                </div>
                                <br />
                                {/* Insert User Manager code here */}
                                <br />
                            </div>
                        );
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

function mapStateToProps({ auth, approach, speciality }) {
    return { auth, approach, speciality };
}



export default connect(mapStateToProps, { fetchApproach, fetchSpeciality })(TermManager);