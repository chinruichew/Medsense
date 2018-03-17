import React, {Component} from 'react';
import axios from 'axios';
import {Button} from "react-bootstrap";

class IndividualCaseStatistics extends Component {
    state = {
        answers: null
    };

    componentDidMount() {
        axios.get('/api/getAnswersByCase?id=' + this.props.caseId).then(res => {
            this.setState({answers: res.data});
        });
    }

    renderContent = () => {
        switch(this.state.answers) {
            case null:
                return;
            default:
                const answers = this.state.answers.map((answer, index) => {
                    return(
                        <div>
                            {answer._id}
                        </div>
                    );
                });
                return(
                    <div className="container">
                        <div className="row">
                            <br/>
                            <Button onClick={this.props.returnToCaseStats} bsStyle="primary">Back</Button>
                            <div className="col-md-12 text-center">
                                <h1>{this.state.answers[0].case.title}</h1>
                            </div>
                        </div>
                        <div className="row">
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

export default IndividualCaseStatistics;