import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { bindAll } from 'lodash';
import GameResults from './GameResults';

class MCQAnswers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showResult: false,
            answerCount: 0,
            mcqAnswer: "",
            stuCorrectAnswerCount: 0,
            authid: this.props.authid,
            authname: this.props.authname
        };

        bindAll(this, 'renderContent', 'getMCQAnswer', 'renderNextQuestion', 'nextQuestion');
    }

    componentDidMount() {
        this.getMCQAnswer();
    }

    getMCQAnswer() {
        let answer = "";
        let answerCount = 0;
        let stuCorrectCount = 0;
        if (this.props.question.check1) {
            answer += this.props.question.mcq1 + ", ";
            answerCount += 1;
            if (this.props.question.check1 === this.props.check1Stu) {
                stuCorrectCount += 1;
                //console.log(stuCorrectCount);
            }
        }

        if (this.props.question.check2) {
            answer += this.props.question.mcq2 + ", ";
            answerCount += 1;
            if (this.props.question.check2 === this.props.check2Stu) {
                stuCorrectCount += 1;
            }
        }

        if (this.props.question.check3) {
            answer += this.props.question.mcq3 + ", ";
            answerCount += 1;
            if (this.props.question.check3 === this.props.check3Stu) {
                stuCorrectCount += 1;
            }
        }

        if (this.props.question.check4) {
            answer += this.props.question.mcq4 + ", ";
            answerCount += 1;
            if (this.props.question.check4 === this.props.check4Stu) {
                stuCorrectCount += 1;
            }
        }

        if (this.props.question.check5) {
            answer += this.props.question.mcq5 + ", ";
            answerCount += 1;
            if (this.props.question.check5 === this.props.check5Stu) {
                stuCorrectCount += 1;
            }
        }


        if (this.props.question.check6) {
            answer += this.props.question.mcq6 + ", ";
            answerCount += 1;
            if (this.props.question.check6 === this.props.check6Stu) {
                stuCorrectCount += 1;
            }
        }

        answer = answer.substring(0, answer.length - 2);
        this.setState({ answerCount: answerCount, mcqAnswer: answer });

        this.setState({ stuCorrectAnswerCount: stuCorrectCount });

    }

    renderContent() {
        //if (!this.state.showResult) {
            return (
                <div className='container'>
                    <h3>You got {this.state.stuCorrectAnswerCount} / {this.state.answerCount} correct!</h3><br />
                    <h4>
                        <strong>Answer</strong> <br />
                        <h4 style={{border: "0", background: "white", padding: "0", fontSize: "medium", whiteSpace:"pre-wrap", wordBreak:"keep-all"}}>{this.state.mcqAnswer}</h4> <br /><br />

                        <strong>PEARL</strong> <br />
                        <h4 style={{border: "0", background: "white", padding: "0", fontSize: "medium", whiteSpace:"pre-wrap", wordBreak:"keep-all"}}>{this.props.question.pearl} </h4><br /><br />

                        <strong>References</strong> <br />
                        <h4 style={{border: "0", background: "white", padding: "0", fontSize: "medium", whiteSpace:"pre-wrap", wordBreak:"keep-all"}}>{this.props.question.reference}</h4> <br /><br />

                    </h4>
                    {this.renderNextQuestion()}
                </div>
            );
        // }else{
        //     return <GameResults />
        // }

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

export default MCQAnswers;