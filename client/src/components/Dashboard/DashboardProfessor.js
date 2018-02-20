import React, {Component} from 'react';
import axios from 'axios';

import StudentLeaderboard from "./DashboardComponents/StudentLeaderboard";
import ContributionLeaderboard from "./DashboardComponents/ContributionLeaderboard";
import CaseStatistics from "./DashboardComponents/CaseStatistics";

class DashboardProfessor extends Component {
    state = {
        studentLeaders: null,
        contributionLeaders: null,
        cases: null,
        answers: null
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

        // Get all Cases
        axios.get('/api/fetchVettedCases').then(res => {
            this.setState({cases: res.data});
        }).catch(err => {
            console.log(err);
        });

        // Get all Question Answers
        axios.get('/api/fetchAnswers').then(res => {
            this.setState({answers: res.data});
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
                        switch(this.state.cases) {
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
                                        <div className="row">
                                            <CaseStatistics cases={this.state.cases} />
                                        </div>
                                    </div>
                                );
                        }
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