import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { bindAll } from 'lodash';

class OpenEndedAnswer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showResult: false,
            authid: this.props.authid,
            authname: this.props.authname
        };

        bindAll(this, 'renderContent', 'renderNextQuestion', 'nextQuestion');
    }

    renderContent() {
        //if (!this.state.showResult) {
            return (
                <div className='container'>
                    <h3>You got __ points!</h3><br />
                    <h4>
                        <strong>Answer</strong> <br />
                        <h4 style={{border: "0", background: "white", padding: "0", fontSize: "medium", whiteSpace:"pre-wrap", wordBreak:"keep-all"}}>{this.props.question.openEnded}</h4> <br /><br />

                        <strong>PEARL</strong> <br />
                        <h4 style={{border: "0", background: "white", padding: "0", fontSize: "medium", whiteSpace:"pre-wrap", wordBreak:"keep-all"}}>{this.props.question.pearl} </h4><br /><br />

                        <strong>References</strong> <br />
                        <h4 style={{border: "0", background: "white", padding: "0", fontSize: "medium", whiteSpace:"pre-wrap", wordBreak:"keep-all"}}>{this.props.question.reference} </h4><br /><br />

                    </h4>
                    {this.renderNextQuestion()}

                </div>
            );
        //}else{
            //return <GameResults />
        //}

    }

    renderNextQuestion() {
        if (this.props.question.id === this.props.totalQnNum + "") {
            return (
                <div>
                    <Button onClick={(e) => this.complete()} hspace="20" bsStyle="primary" bsSize="large" className="pull-right">
                        View Score
                    </Button>
                </div>
            );
        } else {
            return (
                <Button onClick={(e) => this.nextQuestion()} hspace="20" bsStyle="primary" bsSize="large"
                    className="pull-right">
                    Next Question
                </Button>
            );
        }
    }

    complete() {
        // this.setState({
        //     showResult: true
        // });
        window.location = '/result';
    }

    nextQuestion() {
        this.props.handleNextQuestion(parseFloat(this.props.question.id));
    }

    render() {
        return (
            <div>
                {this.renderContent()}
            </div>
        );
    }
}

export default OpenEndedAnswer;