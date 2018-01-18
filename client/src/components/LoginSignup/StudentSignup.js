import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import StudentSignUpForm from './StudentSignUpForm';
import {connect} from "react-redux";
import * as ReactGA from "react-ga";

class StudentSignup extends Component {
    state = {
        username: null,
        password: null,
        confirm_password: null,
        school: "Duke-NUS",
        year: "Year 1"
    };

    handleSchoolChange(e) {
        this.setState({ school: e.target.value });
    }

    handleYearChange(e) {
        this.setState({ year: e.target.value });
    }

    renderContent() {
        switch(this.props.auth) {
            case null:
                return;
            case false:
                return(
                    <div className="row">
                        <StudentSignUpForm username={this.state.username} password={this.state.password} confirm_password={this.state.confirm_password} school={this.state.school} year={this.state.year} />
                    </div>
                );
            default:
                return(<Redirect to="/home" />);
        }
    }

    render() {
        // React GA
        ReactGA.initialize('UA-112382826-1');
        ReactGA.pageview(window.location.pathname + window.location.search);

        return (
            <div className="container-fluid">
                {this.renderContent()}
            </div>
        )
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(StudentSignup);