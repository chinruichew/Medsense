import React, { Component } from 'react';
import { Button, Col } from 'react-bootstrap';
import { bindAll } from 'lodash';
import { connect } from 'react-redux';
import {addMCQAnswerOfQuestion} from '../../actions';
import ReactHtmlParser from 'react-html-parser';

class MCQAnswers extends Component {
    state = {
        showResult: false,
        answerCount: 0,
        mcqAnswer: "",
        stuCorrectAnswerCount: 0,
        score: 0,
        authid: this.props.authid,
        mark: this.props.question.mark,
        question: this.props.question.question,
        stem: this.props.question.stem,
        type: this.props.question.type,
        attachment: this.props.question.attachment,
        pearl: this.props.question.pearl,
        reference: this.props.question.reference,
        mcq1: this.props.question.mcq1,
        mcq2: this.props.question.mcq2,
        mcq3: this.props.question.mcq3,
        mcq4: this.props.question.mcq4,
        mcq5: this.props.question.mcq5,
        mcq6: this.props.question.mcq6,
        check1Stu: this.props.check1Stu,
        check2Stu: this.props.check2Stu,
        check3Stu: this.props.check3Stu,
        check4Stu: this.props.check4Stu,
        check5Stu: this.props.check5Stu,
        check6Stu: this.props.check6Stu,
        timeLimit: this.props.timeLimit,
        date: this.props.date,
        seconds: this.props.seconds,
    };

    componentDidMount() {
        this.getMCQAnswer();
        window.scrollTo(0, 0);
        this.props.addMCQAnswerOfQuestion(this.state);
    }

    getMCQAnswer = () => {
        let answer = "";
        let answerCount = 0;
        let stuCorrectCount = 0;
        let stuWrongCount = 0;

        if (this.props.question.check1) {
            answer += this.props.question.mcq1 + ", ";
            answerCount += 1;
            if (this.props.question.check1 === this.props.check1Stu) {
                stuCorrectCount += 1;
            }
        }else{
            if(this.props.check1Stu) {
                stuWrongCount += 1;
            }
        }

        if (this.props.question.check2) {
            answer += this.props.question.mcq2 + ", ";
            answerCount += 1;
            if (this.props.question.check2 === this.props.check2Stu) {
                stuCorrectCount += 1;
            }
        }else{
            if(this.props.check2Stu){
                stuWrongCount += 1;
            }
        }

        if (this.props.question.check3) {
            answer += this.props.question.mcq3 + ", ";
            answerCount += 1;
            if (this.props.question.check3 === this.props.check3Stu) {
                stuCorrectCount += 1;
            }
        }else {
            if (this.props.check3Stu) {
                stuWrongCount += 1;
            }
        }


        if (this.props.question.check4) {
            answer += this.props.question.mcq4 + ", ";
            answerCount += 1;
            if (this.props.question.check4 === this.props.check4Stu) {
                stuCorrectCount += 1;
            }
        }else {
            if (this.props.check4Stu) {
                stuWrongCount += 1;
            }
        }

        if (this.props.question.check5) {
            answer += this.props.question.mcq5 + ", ";
            answerCount += 1;
            if (this.props.question.check5 === this.props.check5Stu) {
                stuCorrectCount += 1;
            }
        }else {
            if (this.props.check5Stu) {
                stuWrongCount += 1;
            }
        }

        if (this.props.question.check6) {
            answer += this.props.question.mcq6 + ", ";
            answerCount += 1;
            if (this.props.question.check6 === this.props.check6Stu) {
                stuCorrectCount += 1;
            }
        }else {
            if (this.props.check6Stu) {
                stuWrongCount += 1;
            }
        }

        answer = answer.substring(0, answer.length - 2);
        this.setState({ answerCount: answerCount, mcqAnswer: answer });

        this.setState({ stuCorrectAnswerCount: stuCorrectCount });

        let finalScore = (stuCorrectCount-stuWrongCount) * (this.state.mark / answerCount);

        if(stuWrongCount < stuCorrectCount){
            this.setState({score: Math.round(finalScore)});
        }

    };


    renderContent = () => {
        //if (!this.state.showResult) {
            return (
                <Col sm={11}>
                    <h3>You got {this.state.stuCorrectAnswerCount} / {this.state.answerCount} correct!</h3><br />
                    <h3>Your score for this question: {this.state.score}</h3>
                    <h4>
                        <strong>Answer</strong> <br />
                        <h4 style={{border: "0", background: "white", padding: "0", fontSize: "medium", whiteSpace:"pre-wrap", wordBreak:"keep-all"}}>{ReactHtmlParser(this.state.mcqAnswer)}</h4> <br /><br />

                        <strong>PEARL</strong> <br />
                        <h4 style={{border: "0", background: "white", padding: "0", fontSize: "medium", whiteSpace:"pre-wrap", wordBreak:"keep-all"}}>{ReactHtmlParser(this.props.question.pearl)} </h4><br /><br />

                        <strong>References</strong> <br />
                        <h4 style={{border: "0", background: "white", padding: "0", fontSize: "medium", whiteSpace:"pre-wrap", wordBreak:"keep-all"}}>{ReactHtmlParser(this.props.question.reference)}</h4> <br /><br />

                    </h4>
                    {this.renderNextQuestion()}
                </Col>
            );
        // }else{
        //     return <GameResults />
        // }

    };

    renderNextQuestion = () => {
        if (this.props.question.id === this.props.totalQnNum + "") {
            return (
                <Col smOffset={10}>
                    <Button onClick={(e) => this.complete()} hspace="20" bsStyle="primary" bsSize="large" className="pull-right">
                        View Score
                    </Button>
                </Col>
            );
        } else {
            return (
                <Col smOffset={10}>
                    <Button onClick={(e) => this.nextQuestion()} hspace="20" bsStyle="primary" bsSize="large"
                        className="pull-right">
                        Next Question
                    </Button>
                </Col>
            );
        }
    };

    complete = () => {
        this.props.updateScore(this.state.score);
        this.props.handleViewScore();
    };

    nextQuestion = () => {
        this.props.updateScore(this.state.score);
        this.props.handleNextQuestion(parseFloat(this.props.question.id));
    };

    render() {
        return (
            <div>
                {this.renderContent()}
            </div>
        );
    }
}

function mapStateToProps({ game}) {
    return {
        game
    };
}

const mapDispatchToProps = dispatch => {
    return {
        addMCQAnswerOfQuestion: (values) => dispatch(addMCQAnswerOfQuestion(values))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MCQAnswers);