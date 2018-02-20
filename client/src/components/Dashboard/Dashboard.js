import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as ReactGA from "react-ga";
import {fetchConstantTypes} from "../../actions";
import {Redirect} from "react-router-dom";

import DashboardProfessor from "./Professor/DashboardProfessor";
import DashboardStudent from "./Student/DashboardStudent";

class Dashboard extends Component {
    componentDidMount() {
        this.props.fetchConstantTypes();
    }

    renderDashboard = () => {
        switch(this.props.auth) {
            case null:
                return;
            case false:
                return(<Redirect to="/home" />);
            default:
                switch(this.props.constants) {
                    case null:
                        return;
                    default:
                        switch(this.props.auth.usertype) {
                            case this.props.constants.USER_TYPE_PROFESSOR:
                                return(
                                    <div>
                                        <DashboardProfessor />
                                    </div>
                                );
                            case this.props.constants.USER_TYPE_STUDENT:
                                return(
                                    <div>
                                        <DashboardStudent />
                                    </div>
                                );
                            default:
                                return;
                        }
                }
        }
    };

    render() {
        // React GA
        ReactGA.initialize('UA-112382826-1');
        ReactGA.pageview(window.location.pathname + window.location.search);

        return(
            <div>
                {this.renderDashboard()}
            </div>
        );
    }
}

function mapStateToProps({auth, constants}) {
    return {
        auth, constants
    };
}

export default connect(mapStateToProps, {fetchConstantTypes})(Dashboard);