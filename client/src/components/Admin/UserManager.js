import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import * as ReactGA from "react-ga";

import './Admin.css';
import NewUser from './NewUser';
import DeleteUser from './ManageUser';
import { fetchAdminUsers } from '../../actions';

class UserManager extends Component {
    state = {
        display: 'user',
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
        this.props.fetchAdminUsers();
    }

    renderContent() {
        switch (this.props.auth) {
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
                                switch(this.props.adminUsers) {
                                    case null:
                                        return;
                                    default:
                                        return (
                                            <div>
                                                <div className="container-fluid">
                                                    <div className='col-sm-12'>
                                                        <Tabs defaultActiveKey={1} className="tab">
                                                            <Tab eventKey={1} title="Add New User">
                                                                <br />
                                                                <NewUser />
                                                                <br />
                                                            </Tab>
                                                            <Tab eventKey={2} title="Manage User">
                                                                <br />
                                                                <DeleteUser />
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
                            default:
                                return <Redirect to='/' />;
                        }
                }
        }
    }

    render() {
        // React GA
        ReactGA.initialize('UA-112382826-1');
        ReactGA.pageview(window.location.pathname + window.location.search);

        return (
            <div>
                {this.renderContent()}
            </div>
        );
    }
    goToCaseManager() {
        this.setState({
            display: 'case'
        });
    }

    goToUserManager() {
        this.setState({
            display: 'user'
        });
    }
    goToAdmin() {
        this.setState({
            display: ''
        });
    }
}

function mapStateToProps({ auth, adminUsers }) {
    return { auth, adminUsers };
}



export default connect(mapStateToProps, { fetchAdminUsers })(UserManager);