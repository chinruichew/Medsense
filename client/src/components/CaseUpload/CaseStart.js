import React, { Component } from 'react';
import { connect } from 'react-redux';
import Main from './Main';
import { Redirect } from 'react-router-dom';
import * as ReactGA from "react-ga";
import constants from '../../utility/constantTypes';

class CaseStart extends Component {
    renderContent() {
        switch (this.props.auth) {
            case null:
                return;
            case false:
                return <Redirect to='/' />;
            default:
                switch (this.props.auth.usertype) {
                    case constants.USER_TYPE_PROFESSOR:
                        return (
                            <Main authid={this.props.auth._id}
                                authname={this.props.auth.username} />
                        );
                    case constants.USER_TYPE_STUDENT:
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