import React, { Component } from 'react';
import { Form, FormGroup, Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import {fetchGameById, getAttempt, startGame} from '../../actions';
import MCQquestion from "./MCQquestion";
import OpenEndedQuestion from "./OpenEndedQuestion";
import GameResults from "./GameResults";

function makeUnique() {
    const now = new Date().getTime();
    let random = Math.floor(Math.random() * 100000);
    // zero pad random
    random = "" + random;
    while (random.length < 5) {
        random = "0" + random;
    }
    return String(now + random);
}

class TimeLimit extends Component {
    state = {
        challenge: this.props.case,
        showGameView: false,
        withTimeLimit: false,
        noTimeLimit: true,
        currentQn: 1,
        caseid: "",
        date: "",
        showResult:false,
        score: 0,
    };

    componentDidMount() {
        console.log(this.props.case);
        this.props.fetchGameById(this.state.challenge._id);
        window.scrollTo(0, 0)
    }

    startGame = () => {
        switch (this.props.auth) {
            case null:
                return;
            default:
                let date = this.state.date;
                if (this.state.date === "") {
                    date = makeUnique();
                    this.setState({date: date});
                }
                this.props.startGame({
                    case: this.state.challenge,
                    score: this.state.score
                });
                window.setTimeout(() => {
                    const gameOverview = this.props.getAttempt();
                    this.setState({attempt: gameOverview.values.attempt, authid: this.props.auth._id, showGameView:true});
                },200);
        }
    };

    withTimeLimit = () => {
        this.setState({ withTimeLimit: true, noTimeLimit: false });
    };

    withoutTimeLimit = () => {
        this.setState({ withTimeLimit: false, noTimeLimit: true });
    };

    handleNextQuestion = (prevQn) => {
        this.setState({ currentQn: prevQn + 1 });
    };

    updateScore = (points) => {
        this.setState(function(prevState, props){
            return {score: prevState.score+=points}
        });
    };

    handleViewScore = () => {
        this.setState({showResult: true});
    };

    renderTimeLimitContent = () => {
        if (!this.state.showGameView) {
            let timerBtnBgColor = this.state.withTimeLimit ? "#82C5D9" : "#CDE0EB";
            let noTimerBtnBgColor = this.state.noTimeLimit ? "#82C5D9" : "#CDE0EB";
            return (
                <div className='container' style={{margin: "0"}}>
                    <div align="center">
                        <h1>{this.state.challenge.title}</h1><br />
                        <h4>
                            <em>
                                Earn extra points when you try a case with time limit!
                                <br />
                            </em>
                        </h4>
                    </div>
                    <br /><br />
                    <Form horizontal style={{width: "95%"}}>
                        <Col smOffset={3} style={{marginLeft: "35%"}}>
                            <FormGroup controlId="formHorizontalEmail">
                                <Col sm={3}>
                                    <h3>Difficulty </h3>
                                </Col>
                                <Col sm={2}>
                                    <h3>{this.state.challenge.difficulty}</h3>
                                </Col>
                            </FormGroup>
                        </Col>
                        <Col smOffset={3} style={{marginLeft: "35%"}}>
                            <FormGroup >
                                <Col sm={3}>
                                    <h3 style={{marginTop: "5%"}}>Time Limit </h3>
                                </Col>
                                <Col sm={2} className='pull-left'>
                                    <Button style={{ background: timerBtnBgColor, color: 'black', border: 0, width: '60%'}}
                                        onClick={(e) => this.withTimeLimit()}>
                                        <h3 style={{margin: "0"}}>Yes</h3>
                                    </Button>
                                </Col>
                                <Col sm={2}>
                                    <Button style={{ background: noTimerBtnBgColor, color: 'black', border: 0, width: '60%' }}
                                        onClick={(e) => this.withoutTimeLimit()}>
                                        <h3 style={{ margin: "0" }}>No</h3>
                                    </Button>
                                </Col>
                            </FormGroup>
                        </Col>
                        <br /><br />
                        <FormGroup style={{width: "95%"}}>
                            <Col smOffset={1} sm={2} className='pull-left'>
                                <Button bsStyle="primary" bsSize="large" onClick={(e) => window.location.reload()}>
                                    <img className="left-picture" hspace="5" src="./backArrow.png" style={{ height: "18px" }} alt="" />
                                    Find a case
                                </Button>
                            </Col>
                            <Col sm={2} className='pull-right'>
                                <Button bsStyle="primary" bsSize="large" onClick={(e) => this.startGame()}>
                                    Start Challenge
                                    <img className="left-picture" hspace="5" src="./nextarrow.png" style={{ height: "18px" }} alt="" />
                                </Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </div>
            );
        } else if(!this.state.showResult){
            return (
                <div>
                    {this.renderGameContent()}
                </div>
            );
        } else {
            const gameCase = this.props.game.gameCase;
            switch (gameCase) {
                case null:
                    return;
                default:
                    //need to get the attempt when storeCaseAnswer
                    let attempt = this.state.attempt;
                    const base = gameCase.difficulty === "Beginner" ? (0.5**(attempt-1)) * 500 : (0.5**(attempt-1)) * 1000;
                    let total = 0;
                    for (let i = 0; i < gameCase.questions.length; i++) {
                        total += parseFloat(gameCase.questions[i].mark);
                    }

                    const score = this.state.score / total * base;
                    const final = Math.round(this.state.withTimeLimit ? score * 1.5 : score);

                    return <GameResults date={this.state.date} caseid={this.state.caseid} case={gameCase} xp={final} score={this.state.score}/>;
            }
        }
    };


    renderGameContent = () => {
        const gameCase = this.props.game.gameCase;
        switch (gameCase) {
            case null:
                return;
            default:
                let timeLimit = this.state.withTimeLimit;
                let currentQn = this.state.currentQn;
                let scenario = gameCase.scenario;
                let totalQnNum = gameCase.questions.length;
                let caseTitle = gameCase.title;
                let questionNodes = gameCase.questions.map((obj, index) => {
                    if (obj.id === currentQn + "") {
                        if (obj.type === "MCQ") {
                            return <MCQquestion key={index} date={this.state.date} caseid={gameCase._id} authid={this.state.authid} question={obj} scenario={scenario} timeLimit={timeLimit}
                                                totalQnNum={totalQnNum} caseTitle={caseTitle} case={gameCase} handleViewScore={this.handleViewScore}
                                                handleNextQuestion={this.handleNextQuestion} updateScore={this.updateScore}/>
                        } else {
                            return <OpenEndedQuestion key={index} date={this.state.date} caseid={gameCase._id} authid={this.state.authid} question={obj} scenario={scenario} timeLimit={timeLimit} totalQnNum={totalQnNum}
                                                      case={gameCase} caseTitle={caseTitle} handleViewScore={this.handleViewScore} handleNextQuestion={this.handleNextQuestion} updateScore={this.updateScore}/>
                        }
                    } else {
                        return '';
                    }
                });
                return questionNodes;
        }

    };

    render() {
        return (
            <div className="container">
                {this.renderTimeLimitContent()}
            </div>
        );


    }
}

function mapStateToProps({ game, auth}) {
    return {
        game, auth
    };
}

const mapDispatchToProps = dispatch => {
    return {
        fetchGameById: (id) => dispatch(fetchGameById(id)),
        startGame: (gameCase, score) => dispatch(startGame(gameCase, score)),
        getAttempt: () => dispatch(getAttempt())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TimeLimit);