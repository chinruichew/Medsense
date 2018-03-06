import React, { Component } from 'react';
import { Button, Table } from 'react-bootstrap';
import { NavLink } from "react-router-dom";

class AdminHome extends Component {
    state = {

    };

    render() {

        return (
            <div className="container-fluid">
                <div className="text-center">
                    <h2>Welcome back to Medsense</h2>
                </div><br /><br />
            </div>
        );

    }
}

export default AdminHome;