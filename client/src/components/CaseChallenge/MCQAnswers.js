import React, { Component } from 'react';
import { Button, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import {addMCQAnswerOfQuestion} from '../../actions';
import ReactHtmlParser from 'react-html-parser';

class MCQAnswers extends Component {
    state = {
        showResult: false,
        // answerCount: 0,
        // mcqAnswer: "",
        // stuCorrectAnswerCount: 0,
        score: 0,
        authid: this.props.authid,
        mark: this.props.question.mark,
        question: this.props.question,
        stem: this.props.question.stem,
        type: this.props.question.type,
        attachment: this.props.question.attachment,
        pearl: this.props.question.pearl,
        reference: this.props.question.reference,
        timeLimit: this.props.timeLimit,
        date: this.props.date,
        seconds: this.props.seconds,
        questionStart: this.props.questionStart,
        questionEnd: this.props.questionEnd,
        questionId: this.props.questionId,
        questionNumber: this.props.questionNumber,
        checkedMCQs: this.props.checkedMCQs
    };

    componentDidMount() {
        const answers = this.getMCQAnswer();
        window.scrollTo(0, 0);
        this.props.addMCQAnswerOfQuestion({
            ...this.state,
            ...answers
        });
    }

    getMCQAnswer = () => {
        let answer = "";
        let answerCount = 0;
        let stuCorrectCount = 0;
        let stuWrongCount = 0;

        const questionOptions = this.state.question.options;
        for(let i = 0; i < this.state.checkedMCQs.length; i++) {
            const checkedMCQ = this.state.checkedMCQs[i];
            for(let j = 0; j < questionOptions.length; j++) {
                const questionOption = questionOptions[j];
                if(checkedMCQ.questionOption === questionOption._id) {
                    if(checkedMCQ.check) {
                        answer += questionOption.mcq + ", ";
                        answerCount += 1;
                    }
                    if(checkedMCQ.check === questionOption.check) {
                        stuCorrectCount++;
                    } else {
                        stuWrongCount++;
                    }
                    break;
                }
            }
        }



        let finalScore = (stuCorrectCount-stuWrongCount) * (this.state.mark / answerCount);

        let toReturn = { answerCount: answerCount, mcqAnswer: answer.substring(0, answer.length - 2), stuCorrectAnswerCount: stuCorrectCount };
        if(stuWrongCount < stuCorrectCount){
            toReturn.score = Math.round(finalScore);
        }

        return(toReturn);
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