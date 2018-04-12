import React, {Component} from 'react';
import {Image} from "react-bootstrap";
import axios from 'axios';

class ContributionLeaderboard extends Component {
    state = {
        leaders: null,
        userContributionRankMapping: null
    };

    componentDidMount() {
        // Get leaders with highest contributions
        axios.get('/api/getLeadersWithHighestContributions').then(res => {
            this.setState({leaders: res.data});

            axios.post('/api/getContributionRanks', {
                users: this.state.leaders
            }).then(res => {
                this.setState({
                    userContributionRankMapping: res.data
                });
            }).catch(err => {
                console.log(err);
            });
        }).catch(err => {
            throw(err);
        });
    }

    renderLeaderboard = () => {
        switch(this.state.leaders) {
            case null:
                return;
            default:
                switch(this.state.userContributionRankMapping) {
                    case null:
                        return;
                    default:
                        return this.state.userContributionRankMapping.map((userContributionRankMap, index) => {
                            const numContributions = userContributionRankMap.user.numContributions;
                            const caseWord = numContributions > 1? 'cases': 'case';
                            const contributionImage = userContributionRankMap.rank !== ''? <Image src={'case-contributor-badges/' + userContributionRankMap.rank + '.png'} className="case-contributor-badges" />: '';

                            return(
                                <div key={index} className="col-md-12">
                                    <div className="col-md-4 leader_text_div text-left">
                                        <div className="col-md-2">
                                            {contributionImage}
                                        </div>
                                        <div className="col-md-5">
                                            <p className="leader_text_font">{userContributionRankMap.rank}</p>
                                        </div>
                                    </div>
                                    <div className="col-md-4 leader_text_div">
                                        <p className="leader_text_font">{userContributionRankMap.user.username}</p>
                                    </div>
                                    <div className="col-md-4 leader_text_div">
                                        <p className="leader_text_font">{numContributions + ' ' + caseWord}</p>
                                    </div>
                                </div>
                            );
                        });
                }
        }
    };

    render() {
        return(
            <div className="col-md-12 text-center leaderboard_container">
                <h2>Contribution Leaderboard</h2>
                <Image className="leaderboard_image" src="./Contribution Leaderboard.png" alt="Contribution Leaderboard" />
                <div className="col-md-12">
                    <div className="col-md-4 leader_text_font text-center">
                        <h4><strong><u>Rank</u></strong></h4>
                    </div>
                    <div className="col-md-4 leader_text_font text-center">
                        <h4><strong><u>Student</u></strong></h4>
                    </div>
                    <div className="col-md-4 leader_text_font text-center">
                        <h4><strong><u>No. of Cases</u></strong></h4>
                    </div>
                </div>
                {this.renderLeaderboard()}
            </div>
        );
    }
}

export default ContributionLeaderboard;