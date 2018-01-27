import React, { Component } from 'react';
import { connect } from 'react-redux';
import Main from './Main';
import { Redirect } from 'react-router-dom';
import * as ReactGA from "react-ga";
import axios from 'axios';

class CaseStart extends Component {
    state = {
        constants: null
    };

    componentDidMount() {
        axios.get('/api/getConstantTypes').then(res => {
            this.setState({constants: res.data});
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
                switch (this.props.auth.usertype) {
                    case this.state.constants.USER_TYPE_PROFESSOR:
                        return (
                            <Main authid={this.props.auth._id}
                                authname={this.props.auth.username} />
                        );
                    case this.state.constants.USER_TYPE_STUDENT:
                        return (
                            <Main authid={this.props.auth._id}
                                authname={this.props.auth.username} />
                        );
                    default:
                        return;
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
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(CaseStart);