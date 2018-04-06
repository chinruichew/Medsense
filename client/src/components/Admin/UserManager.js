import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

import './Admin.css';
import NewUser from './NewUser';
import DeleteUser from './ManageUser';
import { fetchAdminUsers } from '../../actions';

class UserManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            display: 'user',
        };
    }

    componentWillMount() {
        this.props.fetchAdminUsers();
    }

    renderContent() {
        switch (this.state.auth) {
            case false:
                return <Redirect to='/' />;
            default:
                switch (this.props.adminUsers) {
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
        }
    }

    render() {
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