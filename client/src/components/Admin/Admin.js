import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Table, Modal, Alert, ButtonToolbar } from 'react-bootstrap';
import { fetchAdminCases } from '../../actions';
import { Redirect } from 'react-router-dom';
import Main from './Main';
import CaseManager from './CaseManager';
import UserManager from './UserManager';
import './Admin.css';
import axios from 'axios';

class Admin extends Component {
    state = {
        display: ''
    };

    componentDidMount() {
        this.props.fetchAdminCases();
    }

    renderContent() {
        switch (this.state.auth) {
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
                                    <div className="row">
                                        <div className="col-sm-4 text-center" style={{ fontSize: '150%' }}>
                                            <strong> <h3>Admin Home Page</h3> </strong>
                                        </div>
                                        <div className="col-sm-6 left">
                                            <ButtonToolbar>
                                                <Button bsStyle="primary" onClick={(e) => this.goToAdmin()}>Admin HomePage</Button>
                                                <Button bsStyle="primary" onClick={(e) => this.goToCaseManager()}>Case Management</Button>
                                                <Button bsStyle="primary" onClick={(e) => this.goToUserManager()}>User Management</Button>
                                                <Button bsStyle="primary">Discussion Board</Button>

                                            </ButtonToolbar>
                                        </div>
                                    </div>
                                    <br />
                                    <div className="row">
                                        <div className="col-sm-6 text-center" style={{ fontSize: '150%' }}>
                                            <a href="/admin_dashboard"><img src="./portal_statistics.png" alt="" style={{ height: "400px" }} /><br /><br />Portal Statistics</a>
                                        </div>
                                        <div className="col-sm-4 text-center" style={{ fontSize: '150%' }}>
                                            <a href="/admin_dashboard"><img src="./user_statistics.png" alt="" style={{ height: "400px" }} /><br /><br />User Statistics</a>
                                        </div>

                                    </div>
                                    <br />
                                </div>
                            );
                        } else if(this.state.display === 'case') {
                            return (
                                <div>
                                    <CaseManager adminCases={this.props.adminCases} />
                                </div>
                            );
                        } else if (this.state.display === 'user'){
                            return (
                                <div>
                                    <UserManager/>
                                </div>
                            );
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

function mapStateToProps({ adminCases }) {
    return { adminCases };
}



export default connect(mapStateToProps, { fetchAdminCases })(Admin);