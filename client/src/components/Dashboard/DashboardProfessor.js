import React, {Component} from 'react';
import axios from 'axios';

import Leaderboard from "./DashboardComponents/Leaderboard";

class DashboardProfessor extends Component {
    state = {
        leaders: null
    };

    componentDidMount() {
        axios.get('/api/getLeadersWithHighestScores').then(res => {
            this.setState({leaders: res.data});
        }).catch(err => {
            console.log(err);
        });
    };

    renderContent = () => {
        switch(this.state.leaders) {
            case null:
                return;
            default:
                return(
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <Leaderboard leaders={this.state.leaders} />
                            </div>
                            <div className="col-md-6">
                                {/*<Leaderboard />*/}
                            </div>
                        </div>
                    </div>
                );
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