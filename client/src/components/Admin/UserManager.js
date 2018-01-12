import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Button, Table, Modal, Alert, ButtonToolbar} from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import Main from './Main';
import Admin from './Admin';
import CaseManager from './CaseManager';
import './Admin.css';

class UserManager extends Component {
    
    state = {
        display: 'user'        
    };
    renderContent() {
        switch(this.state.auth) {
            case false:
                return <Redirect to='/' />;
            default:
                switch(this.props.cases) {
                    case null:
                        return;
                    default:
                        if(this.state.display === '') {
                            return(
                                <Admin/>
                            );
                        } else if(this.state.display === 'case'){
                            return(
                                <CaseManager/>
                            );
                        } else{
                            return(
                                <div className="container-fluid">    
                                    <div className="row">
                                        <div className="col-sm-4 text-center" style={{fontSize:'150%'}}>
                                            <strong> <h3>User Manager</h3> </strong>
                                        </div>
                                        <div className="col-sm-6 left">
                                            <ButtonToolbar>
                                                <Button bsStyle="primary" onClick={(e)=>this.goToAdmin()}>Admin HomePage</Button>
                                                <Button bsStyle="primary" onClick={(e)=>this.goToCaseManager()}>Case Management</Button>
                                                <Button bsStyle="primary"onClick={(e)=>this.goToUserManager()}>User Management</Button>
                                                <Button bsStyle="primary">Discussion Board</Button>
                                                
                                            </ButtonToolbar>
                                        </div>
                                    </div>
                                    <br/>
                                    {/* Insert User Manager code here */}
                                    <br/>
                                </div>
                            );
                        }
                }
        }                    
    }

    render() {
        return(
            <div>    
                {this.renderContent()}
            </div>
        );
    }
    goToCaseManager(){
        this.setState({
            display: 'case'
        });
    }
    
    goToUserManager(){
        this.setState({
            display: 'user'
        });
    }
    goToAdmin(){
        this.setState({
            display: ''
        });
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}



export default connect(mapStateToProps)(UserManager);