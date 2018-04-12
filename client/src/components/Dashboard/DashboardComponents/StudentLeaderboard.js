import React, {Component} from 'react';
import {Image} from "react-bootstrap";
import axios from 'axios';

class StudentLeaderboard extends Component {
    state = {
        leaders: null,
        userLevelsMapping: null,
        userLevelRankMapping: null
    };

    componentDidMount() {
        // Get leaders with highest scores
        axios.get('/api/getLeadersWithHighestScores').then(res => {
            this.setState({leaders: res.data});

            axios.post('/api/calculateUserLevels', {
                users: this.state.leaders
            }).then(res => {
                this.setState({
                    userLevelsMapping: res.data
                });

                axios.post('/api/getLevelRanks', {
                    userLevelsMapping: this.state.userLevelsMapping
                }).then(res => {
                    this.setState({
                        userLevelRankMapping: res.data
                    });
                }).catch(err => {
                    console.log(err);
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
                switch(this.state.userLevelsMapping) {
                    case null:
                        return;
                    default:
                        switch(this.state.userLevelRankMapping) {
                            case null:
                                return;
                            default:
                                return this.state.leaders.map(leader => {
                                    // Get user level
                                    let level = 0;
                                    for(let i = 0; i < this.state.userLevelsMapping.length; i++) {
                                        const userLevelMap = this.state.userLevelsMapping[i];
                                        if(userLevelMap.user._id === leader._id) {
                                            level = userLevelMap.level;
                                            break;
                                        }
                                    }

                                    // Get user rank
                                    let rank = '';
                                    for(let i = 0; i < this.state.userLevelRankMapping.length; i++) {
                                        const userLevelRankMap = this.state.userLevelRankMapping[i];
                                        if(userLevelRankMap.user._id === leader._id) {
                                            rank = userLevelRankMap.rank;
                                            break;
                                        }
                                    }

                                    return(
                                        <div key={leader._id} className="col-md-12">
                                            <div className="col-md-4 leader_text_div">
                                                <div className="col-md-2">
                                                    <Image src={'case-challenge-badges/' + rank + '.png'} className="case-challenge-badges" />
                                                </div>
                                                <div className="col-md-5">
                                                    <p className="leader_text_font">{rank}</p>
                                                </div>
                                            </div>
                                            <div className="col-md-4 leader_text_div">
                                                <p className="leader_text_font">{leader.username}</p>
                                            </div>
                                            <div className="col-md-4 leader_text_div">
                                                <p className="leader_text_font">Level {level}</p>
                                            </div>
                                        </div>
                                    );
                                });
                        }
                }
        }
    };

    render() {
        return(
            <div className="col-md-12 text-center leaderboard_container">
                <h2>Student Case Challenge Leaderboard</h2>
                <Image className="leaderboard_image" src="./Student Case Challenge Leaderboard.png" alt="Student Case Challenge Leaderboard" />
                <div className="col-md-12">
                    <div className="col-md-4 leader_text_font text-center">
                        <h4><strong><u>Rank</u></strong></h4>
                    </div>
                    <div className="col-md-4 leader_text_font text-center">
                        <h4><strong><u>Student</u></strong></h4>
                    </div>
                    <div className="col-md-4 leader_text_font text-center">
                        <h4><strong><u>Level</u></strong></h4>
                    </div>
                </div>
                {this.renderLeaderboard()}
            </div>
        );
    }
}

export default StudentLeaderboard;