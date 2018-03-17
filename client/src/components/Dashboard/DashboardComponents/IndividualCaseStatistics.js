import React, {Component} from 'react';
import axios from 'axios';
import {Button} from "react-bootstrap";
import Timeline from 'react-visjs-timeline';

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
                    // const options = {
                    //     width: '100%',
                    //     height: '60px',
                    //     stack: false,
                    //     showMajorLabels: true,
                    //     showCurrentTime: true,
                    //     zoomMin: 1000000,
                    //     type: 'background',
                    //     format: {
                    //         minorLabels: {
                    //             minute: 'h:mma',
                    //             hour: 'ha'
                    //         }
                    //     }
                    // };
                    // const items = [{
                    //     start: new Date(2010, 7, 15),
                    //     end: new Date(2010, 7, 16),
                    //     content: 'Trajectory A',
                    //     type: 'point',
                    //     title: 'hello'
                    // }];
                    return(
                        <div>
                            {/*<Timeline options={options} items={items} />*/}
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
                            {answers}
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