import React, { Component } from 'react';
import { Form, FormGroup, Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { bindAll } from 'lodash';
import { connect } from 'react-redux';

import { fetchGameById, storeCaseAnswer } from '../../actions';
import MCQquestion from "./MCQquestion";
import OpenEndedQuestion from "./OpenEndedQuestion";
import { ObjectID } from 'bson';

function makeUnique() {
    var now = new Date().getTime();
    var random = Math.floor(Math.random() * 100000);
    // zero pad random
    random = "" + random;
    while (random.length < 5) {
        random = "0" + random;
    }
    return String(now + random);
}

class TimeLimit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            challenge: this.props.case,
            showGameView: false,
            withTimeLimit: false,
            noTimeLimit: true,
            currentQn: 1,
            authid: this.props.authid,
            authname: this.props.authname,
            caseid: "",
            date: ""
        };

        bindAll(this, 'renderTimeLimitContent', 'redirect', 'renderGameContent', 'startGame',
            'withTimeLimit', 'withoutTimeLimit', 'handleNextQuestion');
    }

    componentDidMount() {
        this.props.fetchGameById(this.state.challenge._id);
    }

    redirect() {
        window.location.reload();
    }

    startGame() {
        this.setState({ showGameView: true });
    }

    withTimeLimit() {
        this.setState({ withTimeLimit: true, noTimeLimit: false });
    }

    withoutTimeLimit() {
        this.setState({ withTimeLimit: false, noTimeLimit: true });
    }

    renderTimeLimitContent() {
        //return this.props.randomCase.title;
        if (!this.state.showGameView) {
            let timerBtnBgColor = this.state.withTimeLimit ? "#82C5D9" : "#CDE0EB";
            let noTimerBtnBgColor = this.state.noTimeLimit ? "#82C5D9" : "#CDE0EB";
            return (
                <div className='container' style={{margin: "0"}}>
                    <div align="center">
                        <h1>{this.state.challenge.title}</h1><br />
                        <h4>
                            <em>
                                Earn points when you try a case with time limit!
                                <br />
                                <br />Cases in advanced mode gives you more points than beginner mode.
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
                                <Button bsStyle="primary" bsSize="large" onClick={(e) => this.redirect()}>
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
        } else {
            return (
                <div>
                    {this.renderGameContent()}
                </div>
            );
        }
    }


    renderGameContent() {
        switch (this.props.auth) {
            case null:
                return;
            default:
                switch (this.props.game) {
                    case null:
                        return;
                    default:
                        let caseid = this.state.caseid
                        if (this.state.caseid === "") {
                            caseid = new ObjectID();
                            this.setState({ caseid: caseid })
                        } 
                        let date = this.state.date;
                        if (this.state.date === "") {
                            date = makeUnique();
                            this.setState({ date: date});
                            this.props.storeCaseAnswer(this.props.auth._id, this.state.caseid, date, this.state.challenge);
                        } 
                        let timeLimit = this.state.withTimeLimit;
                        let currentQn = this.state.currentQn;
                        let scenario = this.props.game.scenario;
                        let totalQnNum = this.props.game.questions.length;
                        let caseTitle = this.props.game.title;
                        let questionNodes = this.props.game.questions.map((obj, index) => {
                            if (obj.id === currentQn + "") {
                                if (obj.type === "MCQ") {
                                    return <MCQquestion date={date} answerid={caseid} authid={this.props.auth._id} question={obj} scenario={scenario} timeLimit={timeLimit}
                                        totalQnNum={totalQnNum} caseTitle={caseTitle}
                                        handleNextQuestion={this.handleNextQuestion} />
                                } else {
                                    return <OpenEndedQuestion date={date} answerid={caseid} authid={this.props.auth._id} question={obj} scenario={scenario} timeLimit={timeLimit} totalQnNum={totalQnNum}
                                        caseTitle={caseTitle} handleNextQuestion={this.handleNextQuestion} />
                                }
                            } else {
                                return '';
                            }
                        });
                        return questionNodes;
                }
        }
    }

    handleNextQuestion(prevQn) {
        this.setState({ currentQn: prevQn + 1 });
    }

    render() {
        return (
            <div className="container">
                {this.renderTimeLimitContent()}
            </div>
        );


    }
}

function mapStateToProps2({ game, auth }) {
    return {
        game,
        auth
    };
}

export default connect(mapStateToProps2, { fetchGameById, storeCaseAnswer })(TimeLimit);