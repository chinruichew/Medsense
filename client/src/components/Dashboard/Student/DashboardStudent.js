import React, {Component} from 'react';
import axios from 'axios';

import IndividualCaseStatistics from "./DashboardComponents/IndividualCaseStatistics";

class DashboardStudent extends Component {
    state = {
        answers: null,
        constants: null
    };

    componentDidMount() {
        // Get all individual answers
        axios.get('/api/getIndividualAnswers').then(res => {
            this.setState({answers: res.data});
        }).catch(err => {
            console.log(err);
        });

        // Get Constant Types
        axios.get('/api/getConstantTypes').then(res => {
            this.setState({constants: res.data});
        }).catch(err => {
            console.log(err);
        });
    }

    renderContent = () => {
        switch(this.state.constants) {
            case null:
                return;
            default:
                switch(this.state.answers) {
                    case null:
                        return;
                    default:
                        return(
                            <div className="container">
                                <div className="row">
                                    <IndividualCaseStatistics answers={this.state.answers} constants={this.state.constants} />
                                </div>
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