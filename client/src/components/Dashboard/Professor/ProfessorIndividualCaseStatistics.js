import React, {Component} from 'react';
import {Button} from "react-bootstrap";
import Timeline from 'react-visjs-timeline';
import axios from 'axios';

class ProfessorIndividualCaseStatistics extends Component {
    state = {
        answers: null,
        selectedAnswerIndex: 0
    };

    componentDidMount() {
        axios.get('/api/getAnswersByCase?id=' + this.props.reviewedCase._id).then(res => {
            this.setState({
                answers: res.data
            })
        }).catch(err => {
            console.log(err);
        });
    }

    visTimelineClickHandler = (props) => {
        const answerId = props.item;
        if(answerId !== null) {
            this.setState({
                selectedAnswerIndex: answerId
            });
        }
    };

    renderOverviews = () => {
        const options = {
            width: '100%',
            height: '200px',
            stack: false,
            showMajorLabels: true,
            showCurrentTime: true,
            zoomMin: 1000,
            type: 'range',
            autoResize: true
        };
        const items = [];
        for(let i = 0; i < this.state.answers.length; i++) {
            const answer = this.state.answers[i];
            items.push({
                start: new Date(answer.startTime),
                end: new Date(answer.endTime),
                content: 'Attempt ' + answer.attempt,
                title: 'Attempt ' + answer.attempt,
                id: i
            });
        }
        return(
            <div>
                <Timeline options={options} items={items} clickHandler={this.visTimelineClickHandler} />
            </div>
        );
    };

    renderContent = () => {
        switch(this.state.answers) {
            case null:
                return;
            default:
                return(
                    <div className="container">
                        <div className="row">
                            <br/>
                            <div className="col-md-4 text-left">
                                <Button style={{marginTop: '20px'}} onClick={this.props.returnToCaseStats} bsStyle="primary">Back to cases</Button>
                            </div>
                            <div className="col-md-4 text-center">
                                <h1>{this.props.reviewedCase.title}</h1>
                            </div>
                        </div>
                        <div className="row" style={{marginBottom: '10px'}}>
                            {this.renderOverviews()}
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

export default ProfessorIndividualCaseStatistics;