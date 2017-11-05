import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProfessorProfile from './ProfessorProfile';
import StudentProfile from './StudentProfile';

class MainProfile extends Component {
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
                            <ProfessorProfile
                                id={this.props.auth._id}
                                username={this.props.auth.username}
                                speciality={this.props.auth.speciality}
                                subspeciality={this.props.auth.subspeciality}
                                school={this.props.auth.school} />

                        );
                    case 'student':
                        return (
                            <StudentProfile
                                id={this.props.auth._id}
                                username={this.props.auth.username}
                                year={this.props.auth.year}
                                school={this.props.auth.school} />
                        );
                }
        }
    }

    render() {
        return (
            <div>
                {this.renderContent()}
            </div>
        )
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(MainProfile);