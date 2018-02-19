import React, {Component} from 'react';
import {Image} from "react-bootstrap";

import './ContributionLeaderboard.css';

class ContributionLeaderboard extends Component {
    renderLeaderboard = () => {
        switch(this.props.leaders) {
            case null:
                return;
            default:
                console.log(this.props.leaders);
                const leadersToMap = this.props.leaders;
                const leaders = Object.keys(leadersToMap).map(function(key) {
                    return(
                        <div className="col-md-12">
                            <div className="col-md-offset-2 col-md-8">
                                <div className="col-md-6 text-left leader_text_div">
                                    <p className="leader_text_font">{key}</p>
                                </div>
                                <div className="col-md-6 text-right leader_text_div">
                                    <p className="leader_text_font">{leadersToMap[key]}</p>
                                </div>
                            </div>
                            <div className="col-md-2"></div>
                        </div>
                    );
                });
                return leaders;

                // const leaders = this.props.leaders.map(leader => {
                //     let elements = '';
                //     for(const key in leader) {
                //         elements += <div className="col-md-12">
                            {/*<div className="col-md-offset-2 col-md-8">*/}
                                {/*<div className="col-md-6 text-left leader_text_div">*/}
                                    {/*<p className="leader_text_font">{key}</p>*/}
                                {/*</div>*/}
                                {/*<div className="col-md-6 text-right leader_text_div">*/}
                                    {/*<p className="leader_text_font">{leader[key]}</p>*/}
                                {/*</div>*/}
                            {/*</div>*/}
                            {/*<div className="col-md-2"></div>*/}
                        {/*</div>*/}
                //     }
                //     return(
                //         <div className="col-md-12">
                //             {elements}
                //         </div>
                //     );
                // });
                // return leaders;
        }
    };

    render() {
        return(
            <div className="col-md-12 text-center leaderboard_container">
                <h2>Contribution Leaderboard</h2>
                <Image src="./Contribution Leaderboard.png" alt="Contribution Leaderboard" style={{height: '150px', width: '200px'}}/>
                {this.renderLeaderboard()}
            </div>
        );
    }
}

export default ContributionLeaderboard;