import React, {Component} from 'react';

import Leaderboard from "./DashboardComponents/Leaderboard";

class DashboardProfessor extends Component {
    render() {
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <Leaderboard />
                    </div>
                    <div className="col-md-6">
                        <Leaderboard />
                    </div>
                </div>
            </div>
        );
    }
}

export default DashboardProfessor;