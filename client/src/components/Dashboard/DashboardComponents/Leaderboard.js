import React, {Component} from 'react';
import {Image} from "react-bootstrap";

class Leaderboard extends Component {
    renderLeaderboard = () => {
        switch(this.props.leaders) {
            case null:
                return;
            default:
                const leaders = this.props.leaders.map(leader => {
                    return(
                        <div className="col-md-12">
                            <div className="col-md-offset-2 col-md-8">
                                <div className="col-md-4">
                                    {leader.leftColumn}
                                </div>
                                <div className="col-md-4">
                                    {leader.midColumn}
                                </div>
                                <div className="col-md-4">
                                    {leader.rightColumn}
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
            <div className="col-md-12">
                <h1>{this.props.title}</h1>
                <Image src={this.props.imageURL} alt={this.props.imageTitle} style={{height: '100px', width: '100%'}}/>
                {this.renderLeaderboard()}
            </div>
        );
    }
}

export default Leaderboard;