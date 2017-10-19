import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import './App.css';

import Login from './Login';

class App extends Component {
    componentDidMount() {
        this.props.fetchUser();
    }

    render() {
        return(
            <BrowserRouter>
                <div>
                    <Route exact path="/login" component={Login} />
                </div>
            </BrowserRouter>
        );
    }
}

export default connect(null, actions)(App);
