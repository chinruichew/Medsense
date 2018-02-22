import React, {Component} from 'react';
import axios from 'axios';

import StudentLeaderboard from "../DashboardComponents/StudentLeaderboard";
import ContributionLeaderboard from "../DashboardComponents/ContributionLeaderboard";
import IndividualCaseStatistics from "../DashboardComponents/IndividualCaseStatistics";

class DashboardStudent extends Component {
    state = {
        studentLeaders: null,
        contributionLeaders: null,
        answers: null,
        constants: null
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

        // Get all individual answers
        axios.get('/api/getIndividualAnswers').then(res => {
            this.setState({answers: res.data});
        }).catch(err => {
            console.log(err);
        });

        // Get Constant Types
        axios.get('/api/getConstantTypes').then(res => {
            this.setState({constants: res.data});
        }).catch(err => {
            console.log(err);
        });
    }

    renderContent = () => {
        switch(this.state.constants) {
            case null:
                return;
            default:
                switch(this.state.answers) {
                    case null:
                        return;
                    default:
                        return(
                            <div className="container">
                                <div className="row" style={{minHeight: '500px'}}>
                                    <IndividualCaseStatistics answers={this.state.answers} constants={this.state.constants} />
                                </div>
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

export default DashboardStudent;