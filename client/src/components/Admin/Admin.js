import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { fetchAdminCases, fetchAdminUsers } from '../../actions';
import { Redirect } from 'react-router-dom';
import CaseManager from './CaseManager';
import UserManager from './UserManager';
import './Admin.css';
import * as ReactGA from "react-ga";

class Admin extends Component {
    state = {
        display: ''
    };

    componentWillMount() {
        this.props.fetchAdminCases();
        this.props.fetchAdminUsers();
    }

    renderContent() {
        switch (this.props.auth) {
            case null:
                return;
            case false:
                return <Redirect to='/' />;
            default:
                switch (this.props.cases) {
                    case null:
                        return;
                    default:
                        if (this.state.display === '') {
                            return (
                                <div className="container-fluid">
                                    <br />
                                    <div className="row">
                                        <div className="col-sm-6 text-center" style={{ fontSize: '150%' }}>
                                            <a href="/admin_dashboard"><img src="./portal_statistics.png" alt="Portal Statistics" style={{ height: "400px" }} /><br /><br />Portal Statistics</a>
                                        </div>
                                        <div className="col-sm-4 text-center" style={{ fontSize: '150%' }}>
                                            <a href="/admin_dashboard"><img src="./user_statistics.png" alt="User Statistics" style={{ height: "400px" }} /><br /><br />User Statistics</a>
                                        </div>
                                    </div>
                                    <br />
                                </div>
                            );
                        } else if (this.state.display === 'case') {
                            return (
                                <div>
                                    <CaseManager />
                                </div>
                            );
                        } else if (this.state.display === 'user') {
                            return (
                                <div>
                                    <UserManager />
                                </div>
                            );
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
                <div className='col-sm-9 col-sm-offset-1'>
                    <ButtonToolbar>
                        <Button bsStyle="default" onClick={(e) => this.goToCaseManager()}>Case Management</Button>
                        <Button bsStyle="default" onClick={(e) => this.goToUserManager()}>User Management</Button>
                    </ButtonToolbar>
                </div>
                <br />
                <br />
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

function mapStateToProps({ auth, adminCases, adminUsers }) {
    return { auth, adminCases, adminUsers };
}



export default connect(mapStateToProps, { fetchAdminCases, fetchAdminUsers })(Admin);