import React, { Component } from 'react';

class Dashboard extends Component {
    render() {
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