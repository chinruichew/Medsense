import React, { Component } from 'react';
import { connect } from 'react-redux';
import Main from './Main';

class CaseStart extends Component {
    renderContent() {
        switch (this.props.auth) {
            case null:
                return;
            case false:
                return (
                    <div />
                );
            default:
                switch (this.props.auth.usertype) {
                    case 'professor':
                        return (
                            <Main authid={this.props.auth._id} />
                        );
                    case 'student':
                        return (
                            <Main authid={this.props.auth._id} />
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