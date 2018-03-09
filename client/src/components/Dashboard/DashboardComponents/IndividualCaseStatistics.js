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
        switch(this.state.answer) {
            case null:
                return;
            default:
                return(
                    <div></div>
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