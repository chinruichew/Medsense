import React, {Component} from 'react';
import axios from 'axios';

import IndividualCaseStatistics from "./DashboardComponents/IndividualCaseStatistics";

class DashboardStudent extends Component {
    state = {
        answers: null
    };

    componentDidMount() {
        axios.get('/api/getIndividualAnswers').then(res => {
            this.setState({answers: res.data});
        }).catch(err => {
            console.log(err);
        });
    }

    renderContent = () => {
        return(
            <div className="container">
                <div className="row">
                    <IndividualCaseStatistics/>
                </div>
            </div>
        );
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