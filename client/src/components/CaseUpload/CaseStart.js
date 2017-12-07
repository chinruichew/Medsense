import React, { Component } from 'react';
import { connect } from 'react-redux';
import Main from './Main';
import { Redirect } from 'react-router-dom';

class CaseStart extends Component {
    renderContent() {
        switch (this.props.auth) {
            case null:
                return;
            case false:
                return <Redirect to='/' />;
            default:
                switch (this.props.auth.usertype) {
                    case 'professor':
                        return (
                            <Main authid={this.props.auth._id}
                                authname={this.props.auth.username} />
                        );
                    case 'student':
                        return (
                            <Main authid={this.props.auth._id}
                                authname={this.props.auth.username} />
                        );
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
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(CaseStart);