import React, {Component} from 'react';
import axios from 'axios';

import StudentLeaderboard from "../DashboardComponents/StudentLeaderboard";
import ContributionLeaderboard from "../DashboardComponents/ContributionLeaderboard";
import StudentCaseStatistics from "./StudentCaseStatistics";
import {Tab, Tabs} from "react-bootstrap";
import NoGamesFound from "./NoGamesFound";
import StudentOverview from "./StudentOverview";

class DashboardStudent extends Component {
    state = {
        studentLeaders: null,
        contributionLeaders: null,
        answers: null,
        constants: null,
        overviewToCaseDetailId: null
    };

    componentDidMount() {
        // Get Constant Types
        axios.get('/api/getConstantTypes').then(res => {
            this.setState({constants: res.data});
        }).catch(err => {
            throw(err);
        });

        // Get all individual answers
        axios.get('/api/getIndividualAnswers').then(res => {
            this.setState({answers: res.data});
        }).catch(err => {
            throw(err);
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
    }

    showCaseDetail = (caseId) => {
        this.setState({
            overviewToCaseDetailId: caseId
        });
    };

    renderCaseOverview = () => {
        switch(this.state.overviewToCaseDetailId) {
            case null:
                return(
                    <StudentOverview answers={this.state.answers} showCaseDetail={this.showCaseDetail}/>
                );
            default:
                return(
                    <StudentCaseStatistics answers={this.state.answers} overviewToCaseDetailId={this.state.overviewToCaseDetailId} />
                );
        }
    };

    renderContent = () => {
        switch(this.state.constants) {
            case null:
                return;
            default:
                switch(this.state.answers) {
                    case null:
                        return;
                    default:
                        if(this.state.answers.length === 0) {
                            return(
                                <NoGamesFound/>
                            );
                        }
                        return(
                            <div className="container">
                                <Tabs defaultActiveKey={1}>
                                    <Tab eventKey={1} title="Overview">
                                        <div className="row">
                                            {this.renderCaseOverview()}
                                        </div>
                                    </Tab>
                                    <Tab eventKey={2} title="Case Statistics">
                                        <div className="row">
                                            <StudentCaseStatistics answers={this.state.answers} />
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