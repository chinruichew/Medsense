import React, {Component} from 'react';
import axios from 'axios';

class IndividualCaseStatistics extends Component {
    state = {
        answer: null
    };

    componentDidMount() {
        axios.get('/api/getCaseAnswerById?id=' + new URLSearchParams(this.props.location.search).entries().next().value[1]).then(res => {
            this.setState({answer: res.data});
        });
    }

    renderContent = () => {
        const answer = this.state.answer;
        switch(answer) {
            case null:
                return;
            default:
                return(
                    <div>
                        <h1>{answer.case.title}</h1>
                        <p>Attempt {answer.attempt}</p>
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