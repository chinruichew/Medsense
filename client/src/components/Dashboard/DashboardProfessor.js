import React, {Component} from 'react';
import axios from 'axios';

import StudentLeaderboard from "./DashboardComponents/StudentLeaderboard";
import ContributionLeaderboard from "./DashboardComponents/ContributionLeaderboard";

class DashboardProfessor extends Component {
    state = {
        studentLeaders: null,
        contributionLeaders: null
    };

    componentDidMount() {
        // Get leaders with highest scores
        axios.get('/api/getLeadersWithHighestScores').then(res => {
            this.setState({studentLeaders: res.data});
        }).catch(err => {
            console.log(err);
        });

        // Get leaders with highest contributions
        axios.get('/api/getLeadersWithHighestContributions').then(res => {
            this.setState({contributionLeaders: res.data});
        }).catch(err => {
            console.log(err);
        });
    };

    renderContent = () => {
        switch(this.state.studentLeaders) {
            case null:
                return;
            default:
                switch(this.state.contributionLeaders) {
                    case null:
                        return;
                    default:
                        return(
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-6">
                                        <StudentLeaderboard leaders={this.state.studentLeaders} />
                                    </div>
                                    <div className="col-md-6">
                                        <ContributionLeaderboard leaders={this.state.contributionLeaders} />
                                    </div>
                                </div>
                            </div>
                        );
                }
        }
    };

    render() {
        return(
            <div>
                {this.renderContent()}
            </div>
        );
    }
}

export default DashboardProfessor;