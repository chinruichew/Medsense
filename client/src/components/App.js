import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Login from './LoginSignup/Login';
import Header from './Header';
import Home from './Home';
import StudentSignup from "./LoginSignup/StudentSignup";
import CaseUpload from './CaseUpload/Main';
import StudentDashboard from './ProfileDashboard/StudentProfile';
import ProfessorDashboard from './ProfileDashboard/ProfessorProfile';
import MainProfile from './ProfileDashboard/MainProfile';
import CaseVetting from './CaseVetting/Vetting';

import './App.css';

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
                    <Route exact path="/signup" component={StudentSignup} />
                    <Route exact path="/upload" component={CaseUpload} />
                    <Route exact path="/vetting" component={CaseVetting} />
                    <Route exact path="/student_dashboard" component={MainProfile} />
                    <Route exact path="/professor_dashboard" component={MainProfile} />
                    <Route exact path="/" component={Home} />
                </div>
            </BrowserRouter>
        );
    }
}

export default connect(null, actions)(App);