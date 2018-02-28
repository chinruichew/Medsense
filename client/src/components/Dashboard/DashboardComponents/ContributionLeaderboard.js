import React, {Component} from 'react';
import {Image} from "react-bootstrap";

class ContributionLeaderboard extends Component {
    renderLeaderboard = () => {
        switch(this.props.leaders) {
            case null:
                return;
            default:
                const leadersToMap = this.props.leaders;
                const leaders = Object.keys(leadersToMap).map(function(key) {
                    return(
                        <div key={key} className="col-md-12">
                            <div className="col-md-offset-2 col-md-8">
                                <div className="col-md-6 text-left leader_text_div">
                                    <p className="leader_text_font">{key}</p>
                                </div>
                                <div className="col-md-6 text-right leader_text_div">
                                    <p className="leader_text_font">{leadersToMap[key] + ' cases'}</p>
                                </div>
                            </div>
                            <div className="col-md-2"></div>
                        </div>
                    );
                });
                return leaders;
        }
    };

    render() {
        return(
            <div className="col-md-12 text-center leaderboard_container">
                <h2>Contribution Leaderboard</h2>
                <Image className="leaderboard_image" src="./Contribution Leaderboard.png" alt="Contribution Leaderboard" />
                {this.renderLeaderboard()}
            </div>
        );
    }
}

export default ContributionLeaderboard;