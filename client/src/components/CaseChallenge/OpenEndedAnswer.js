import React, { Component } from 'react';
import { Button, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import {addOpenEndedAnswerOfQuestion} from '../../actions';
import ReactHtmlParser from 'react-html-parser';

class OpenEndedAnswer extends Component {
    state = {
        showResult: false,
        authid: this.props.authid,
        timeLimit: this.props.timeLimit,
        seconds: this.props.seconds,
        mark: this.props.question.mark,
        question: this.props.question.question,
        stem: this.props.question.stem,
        type: this.props.question.type,
        attachment: this.props.question.attachment,
        pearl: this.props.question.pearl,
        reference: this.props.question.reference,
        openEnded: this.props.openEnded,
        score: this.props.score,
        questionStart: this.props.questionStart,
        questionEnd: this.props.questionEnd,
        questionId: this.props.questionId,
        nlpAccuracy: this.props.nlpAccuracy,
        questionNumber: this.props.questionNumber
    };

    componentDidMount() {
        this.props.addOpenEndedAnswerOfQuestion(this.state);
        this.node.scrollIntoView();
    }

    renderContent = () => {
        return (
            <Col sm={11}>
                <h4 style={{color: "#199ED8"}}><strong>Answer</strong> </h4>
                <h4 style={{border: "0", background: "white", padding: "0", fontSize: "medium", whiteSpace:"pre-wrap",
                    wordBreak:"keep-all"}}>{ReactHtmlParser(this.props.question.openEnded)}
                </h4> <br />

                <h4 style={{color: "#199ED8"}}><strong>PEARL</strong></h4>
                <h4 style={{border: "0", background: "white", padding: "0", fontSize: "medium", whiteSpace:"pre-wrap",
                    wordBreak:"keep-all"}}>{ReactHtmlParser(this.props.question.pearl)}
                </h4><br />

                <h4 style={{color: "#199ED8"}}><strong>References</strong></h4>
                <h4 style={{border: "0", background: "white", padding: "0", fontSize: "medium", whiteSpace:"pre-wrap",
                    wordBreak:"keep-all"}}>{ReactHtmlParser(this.props.question.reference)}
                </h4><br /><br />
                {this.renderNextQuestion()}
            </Col>
        );
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
        this.props.updateScore(Math.round(this.props.score));
        this.props.handleViewScore();
    };

    nextQuestion = () => {
        this.props.updateScore(Math.round(this.props.score));
        this.props.handleNextQuestion(parseFloat(this.props.question.id));
    };

    render() {
        return (
            <div ref={node => this.node = node}>
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
        addOpenEndedAnswerOfQuestion: (values) => dispatch(addOpenEndedAnswerOfQuestion(values))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(OpenEndedAnswer);