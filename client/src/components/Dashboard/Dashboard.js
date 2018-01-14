import React, { Component } from 'react';
import * as ReactGA from "react-ga";

class Dashboard extends Component {
    render() {
        // React GA
        ReactGA.initialize('UA-112382826-1');
        ReactGA.pageview(window.location.pathname + window.location.search);

        return(
            <div className="container">
                <div className="row" style={{ marginRight: "200px", marginLeft: "0px" }}>
                    <h3> <b>Scoreboard</b> <img src="./placeholder.png" alt="" /> </h3>
                </div>
                <div className="row" style={{ marginRight: "200px", marginLeft: "0px" }}>
                    <h3> <b>Graphs</b> <img src="./placeholder.png" alt="" /> </h3>
                </div>
                <div className="row" style={{ marginRight: "200px", marginLeft: "0px" }}>
                    <h3> <b>Analytics</b> <img src="./placeholder.png" alt="" /> </h3>
                </div>
            </div>
        );
    }
}

export default Dashboard;