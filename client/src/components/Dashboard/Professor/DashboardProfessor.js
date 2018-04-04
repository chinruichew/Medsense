import React, {Component} from 'react';
import axios from 'axios';
import {Tab, Tabs} from "react-bootstrap";

import StudentLeaderboard from "../DashboardComponents/StudentLeaderboard";
import ContributionLeaderboard from "../DashboardComponents/ContributionLeaderboard";
import ProfessorCaseStatistics from "./ProfessorCaseStatistics";
import NoAssociatedCasesFound from "./NoAssociatedCasesFound";
import ProfessorOverview from "./ProfessorOverview";

class DashboardProfessor extends Component {
    state = {
        studentLeaders: null,
        contributionLeaders: null,
        associatedCases: null,
        answers: null
    };

    componentDidMount() {
        // Get professor associated cases, either uploaded or vetted by them
        axios.get('/api/getProfessorAssociatedCases').then(res => {
            this.setState({
                associatedCases: res.data
            });
        }).catch(err => {
            console.log(err);
        });

        // Get leaders with highest scores
        axios.get('/api/getLeadersWithHighestScores').then(res => {
            this.setState({studentLeaders: res.data});
        }).catch(err => {
            throw(err);
        });

        // Get leaders with highest contributions
        axios.get('/api/getLeadersWithHighestContributions').then(res => {
            this.setState({contributionLeaders: res.data});
        }).catch(err => {
            throw(err);
        });

        // Get all users answers
        axios.get('/api/fetchAnswers').then(res => {
            this.setState({answers: res.data});
        }).catch(err => {
            throw(err);
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
                        switch(this.state.associatedCases) {
                            case null:
                                return;
                            default:
                                if(this.state.associatedCases.uploaded.length === 0 && this.state.associatedCases.vetted.length === 0) {
                                    return(
                                        <NoAssociatedCasesFound/>
                                    );
                                }
                                switch(this.state.answers) {
                                    case null:
                                        return;
                                    default:
                                        return(
                                            <div className="container">
                                                <Tabs defaultActiveKey={1}>
                                                    <Tab eventKey={1} title="Overview">
                                                        <div className="row">
                                                            <ProfessorOverview answers={this.state.answers} />
                                                        </div>
                                                    </Tab>
                                                    <Tab eventKey={2} title="Case Statistics">
                                                        <div className="row">
                                                            <ProfessorCaseStatistics associatedCases={this.state.associatedCases} />
                                                        </div>
                                                    </Tab>
                                                    <Tab eventKey={3} title="Leaderboard">
                                                        <div className="row">
                                                            <br/>
                                                            <div className="col-md-6">
                                                                <StudentLeaderboard leaders={this.state.studentLeaders} />
                                                            </div>
                                                            <div className="col-md-6">
                                                                <ContributionLeaderboard leaders={this.state.contributionLeaders} />
                                                            </div>
                                                        </div>
                                                    </Tab>
                                                </Tabs>
                                            </div>
                                        );
                                }
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