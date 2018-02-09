import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import * as ReactGA from "react-ga";

import './Home.css';
import StudentHome from "./StudentHome";
import ProfessorHome from "./ProfessorHome";
import {fetchUnvetCases} from "../../actions";

class Home extends Component {
    state = {
        constants: null
    };

    componentDidMount() {
        this.props.fetchUnvetCases();
        axios.get('/api/getConstantTypes').then(res => {
            setTimeout(function () { this.setState({constants: res.data}); }.bind(this), 1000);
        }).catch(err => {
            console.log(err);
        });
    }

    renderContent() {
        switch(this.props.auth) {
            case null:
                return;
            case false:
                return <Redirect to='/' />;
            default:
                switch(this.state.constants) {
                    case null:
                        return;
                    default:
                        if (this.props.auth.usertype === this.state.constants.USER_TYPE_PROFESSOR || this.props.auth.usertype === this.state.constants.USER_TYPE_ADMIN ){
                            return(
                                <ProfessorHome user={this.props.auth} unvetCases={this.props.cases}/>
                            );
                        } else {
                            return(
                                <StudentHome/>
                            );
                        }
                }
        }
    }

    render(){
        // React GA
        ReactGA.initialize('UA-112382826-1');
        ReactGA.pageview(window.location.pathname + window.location.search);

        return(
            <div style={{padding:'2%'}}>
                {this.renderContent()}
            </div>
        );
    }
}

function mapStateToProps({ auth, cases }) {
    return { auth, cases };
}

export default connect(mapStateToProps, {fetchUnvetCases})(Home);