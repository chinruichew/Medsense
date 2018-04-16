import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import {whyDidYouUpdate} from "why-did-you-update";
import HttpsRedirect from 'react-https-redirect';

import './App.css';
import Login from './LoginSignup/Login';
import Home from './HomePage/Home';
import Header from './Header/Header';
import About from './About/About';
import StudentSignup from "./LoginSignup/StudentSignup";
import Profile from './Profile/MainProfile';
import Dashboard from './Dashboard/Dashboard';
import CaseVetting from './CaseVetting/Vetting';
import CaseStart from './CaseUpload/CaseStart';
import CaseChallenge from './CaseChallenge/Main';
import AdminCaseManager from './Admin/CaseManager';
import AdminUserManager from './Admin/UserManager';
import AdminTermManager from './Admin/TermManager';
import NotFound from "./NotFound/NotFound";
import ResetPassword from "./LoginSignup/ResetPassword";
import Acknowledgement from './Acknowledgement/Acknowledgement';

class App extends Component {
    componentDidMount() {
        // Render optimization Tracker
        // whyDidYouUpdate(React);

        this.props.fetchUser();
    }

    render() {
        return (
            <BrowserRouter>
                <HttpsRedirect>
                    <Header />
                    <Switch>
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/resetPassword" component={ResetPassword} />
                        <Route exact path="/home" component={Home} />
                        <Route exact path="/register" component={StudentSignup} />
                        <Route exact path="/upload" component={CaseStart} />
                        <Route exact path="/vetting" component={CaseVetting} />
                        <Route exact path="/profile" component={Profile} />
                        <Route exact path="/dashboard" component={Dashboard} />
                        <Route exact path="/game" component={CaseChallenge} />
                        <Route exact path="/admincasemanager" component={AdminCaseManager} />
                        <Route exact path="/adminusermanager" component={AdminUserManager} />
                        <Route exact path="/admintermmanager" component={AdminTermManager} />
                        <Route exact path="/" component={About}/>
                        <Route exact path="/about" component={Acknowledgement}/>
                        <Route path="/" component={NotFound} />
                    </Switch>
                </HttpsRedirect>
            </BrowserRouter>
        );
    }
}

export default connect(null, actions)(App);