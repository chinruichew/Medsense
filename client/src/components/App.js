import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
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
import Admin from './Admin/Admin';
import Result from './CaseChallenge/GameResults';

class App extends Component {
    componentDidMount() {
        this.props.fetchUser();
    }

    render() {
        //need to store session
        return (
            <BrowserRouter>
                <div>
                    <Header />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/home" component={Home} />
                    <Route exact path="/register" component={StudentSignup} />
                    <Route exact path="/upload" component={CaseStart} />
                    <Route exact path="/vetting" component={CaseVetting} />
                    <Route exact path="/profile" component={Profile} />
                    <Route exact path="/dashboard" component={Dashboard} />
                    <Route exact path="/search" component={CaseChallenge} />
                    <Route exact path="/admin" component={Admin} />
                    <Route exact path="/result" component={Result} />
                    <Route exact path="/" component={About} />
                </div>
            </BrowserRouter>
        );
    }
}

export default connect(null, actions)(App);