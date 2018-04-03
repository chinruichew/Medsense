import React, {Component} from 'react';
import {Image} from "react-bootstrap";
import axios from 'axios';

class StudentLeaderboard extends Component {
    state = {
        userLevelsMapping: null
    };

    componentDidMount() {
        axios.post('/api/calculateUserLevels', {
            users: this.props.leaders
        }).then(res => {
            this.setState({
                userLevelsMapping: res.data
            });
        }).catch(err => {
            console.log(err);
        });
    }

    renderLeaderboard = () => {
        switch(this.props.leaders) {
            case null:
                return;
            default:
                switch(this.state.userLevelsMapping) {
                    case null:
                        return;
                    default:
                        return this.props.leaders.map(leader => {
                            let level = 0;
                            for(let i = 0; i < this.state.userLevelsMapping.length; i++) {
                                const userLevelMap = this.state.userLevelsMapping[i];
                                if(userLevelMap.user._id === leader._id) {
                                    level = userLevelMap.level;
                                    break;
                                }
                            }
                            return(
                                <div key={leader._id} className="col-md-12">
                                    <div className="col-md-offset-2 col-md-8">
                                        <div className="col-md-6 text-left leader_text_div">
                                            <p className="leader_text_font">{leader.username}</p>
                                        </div>
                                        <div className="col-md-6 text-right leader_text_div">
                                            <p className="leader_text_font">Level {level}</p>
                                        </div>
                                    </div>
                                    <div className="col-md-2"></div>
                                </div>
                            );
                        });
                }
        }
    };

    render() {
        return(
            <div className="col-md-12 text-center leaderboard_container">
                <h2>Student Case Challenge Leaderboard</h2>
                <Image className="leaderboard_image" src="./Student Case Challenge Leaderboard.png" alt="Student Case Challenge Leaderboard" />
                {this.renderLeaderboard()}
            </div>
        );
    }
}

export default StudentLeaderboard;