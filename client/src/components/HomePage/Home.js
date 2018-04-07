import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import * as ReactGA from "react-ga";

import './Home.css';
import StudentHome from "./StudentHome";
import ProfessorHome from "./ProfessorHome";
import AdminHome from "./AdminHome";
import {Helmet} from "react-helmet";

class Home extends Component {
    state = {
        constants: null
    };

    componentDidMount() {
        axios.get('/api/getConstantTypes').then(res => {
            setTimeout(function () { this.setState({ constants: res.data }); }.bind(this), 1000);
        }).catch(err => {
            console.log(err);
        });
    }

    renderContent() {
        switch (this.props.auth) {
            case null:
                return;
            case false:
                return <Redirect to='/' />;
            default:
                switch (this.state.constants) {
                    case null:
                        return;
                    default:
                        if (this.props.auth.usertype === this.state.constants.USER_TYPE_PROFESSOR) {
                            return (
                                <ProfessorHome user={this.props.auth} />
                            );
                        } else if (this.props.auth.usertype === this.state.constants.USER_TYPE_ADMIN) {
                            return (
                                <AdminHome />
                            )

                        } else {
                            return (
                                <StudentHome />
                            );
                        }
                }
        }
    }

    render() {
        // React GA
        ReactGA.initialize('UA-112382826-1');
        ReactGA.pageview(window.location.pathname + window.location.search);

        const medsenseDescription = "Ever felt like getting a bit more practice? This is the place for you. Medsense is a case-based simulation website for medical trainees,with faculty-vetted cases from you, for you. Upload an interesting case or try out a case and check out your strength and weaknesses at your dashboard. Come make sense of medicine.";

        return (
            <div style={{ padding: '2%' }}>
                <Helmet>
                    <title>Medsense</title>
                    <meta name="description" content={medsenseDescription} />
                </Helmet>
                {this.renderContent()}
            </div>
        );
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps, {})(Home);