import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

import './Admin.css';
import Approach from './Approach';
import { fetchApproach } from '../../actions';

class TermManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentWillMount() {
        this.props.fetchApproach();
    }

    renderContent() {
        switch (this.state.auth) {
            case false:
                return <Redirect to='/' />;
            default:
                switch (this.props.approach) {
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

function mapStateToProps({ auth, approach }) {
    return { auth, approach };
}



export default connect(mapStateToProps, { fetchApproach })(TermManager);