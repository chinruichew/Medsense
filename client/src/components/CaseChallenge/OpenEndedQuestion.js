import React, { Component } from 'react';
import { Form, FormGroup, Col } from 'react-bootstrap';
import { Button, Row, ControlLabel, FormControl, Panel } from 'react-bootstrap';
import { bindAll } from 'lodash';
import { Line } from 'rc-progress';
import { connect } from 'react-redux';
import { storeCaseAnswerOpenEnded } from '../../actions';

import OpenEndedAnswer from "./OpenEndedAnswer";
import ImageMagnifier from "./ImageMagnifier";

class OpenEndedQuestion extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showAnswers: false,
            openEnded: "",
            showNextButton: true,
            answerid: this.props.answerid,
            authid: this.props.authid,
            authname: this.props.authname,
            time: {},
            date: this.props.date,
            seconds: parseFloat(this.props.question.time) * 60
        };
        this.timer = 0;
        bindAll(this, 'selectDone', 'startTimer', 'countDown', 'secondsToTime', 'pauseTimer', 'renderTimer',
            'renderShowNextButton', 'renderProgressBar', 'renderScenario', 'renderContent', 'handleNextQuestion', 'handleOpenEndedChange');
    }

    startTimer() {
        if (this.timer === 0) {
            this.timer = setInterval(this.countDown, 1000);
        }
    }

    countDown() {
        // Remove one second, set state so a re-render happens.
        let seconds = this.state.seconds - 1;
        this.setState({
            time: this.secondsToTime(seconds),
            seconds: seconds,
        });

        // Check if we're at zero.
        if (seconds === 0) {
            clearInterval(this.timer);
            this.selectDone()
        }
    }

    secondsToTime(secs) {
        let divisor_for_minutes = secs % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);

        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);

        let obj = {
            "m": minutes,
            "s": seconds
        };
        return obj;
    }

    pauseTimer() {
        clearInterval(this.timer);
    }

    componentDidMount() {
        let timeLeftVar = this.secondsToTime(this.state.seconds);
        this.setState({ time: timeLeftVar });
    }

    selectDone() {
        this.props.storeCaseAnswerOpenEnded(this.state)
        const {showAnswers} = this.state;
        const {showNextButton} = this.state;
        if (!showAnswers) {
            this.setState({ showAnswers: !showAnswers });
            this.setState({ showNextButton: !showNextButton });
            this.pauseTimer();
        }
    }

    renderTimer(duration) {
        console.log(this.props.timeLimit);
        if (this.props.timeLimit) {
            return (
                <div className='pull-right'>
                    {this.startTimer()}
                    <img src="./timer.png" hspace='5' alt="" style={{ height: "35px" }} /> {this.state.time.m}
                    min {this.state.time.s} sec
                </div>
            );
        }
        return;
    }

    renderShowNextButton() {
        const {showNextButton} = this.state;
        if (showNextButton) {
            return (
                <div>
                    <Button onClick={(e) => this.selectDone()} hspace="20" bsStyle="primary" bsSize="large" className="pull-right">
                        Done
                    </Button>
                </div>
            );
        }
    }

    renderProgressBar() {
        let progress = parseFloat(this.props.question.id) / parseFloat(this.props.totalQnNum) * 100;
        return (
            <div >
                <Col sm={10} align="left">
                    <Line
                        percent={progress}
                        strokeWidth="2"
                        trailWidth="1"
                        strokeColor="#82C5D9"
                        strokeLinecap="square"
                    />
                </Col>
                <Col sm={2} align="left"><h4>{this.props.question.id}/{this.props.totalQnNum} Questions</h4> </Col>
            </div>
        );
    }

    renderScenario() {
        if (this.props.question.id === 1 + "") {
            return this.props.scenario;
        } else {
            return this.props.question.stem;
        }
    }


    handleNextQuestion(prevQn) {
        this.props.handleNextQuestion(prevQn);
    }

    handleOpenEndedChange(e) {
        const value = e.target.value;
        this.setState({ openEnded: value });
    }

    renderContent() {
        let imageZoom = this.props.question.attachment !== "" ? (<div class="col-md-5 col-md-offset-2" align="center">
            <h5>
                Mouse over image to zoom
            </h5>
        </div>) : (<div></div>)

        return (
            <div className='container'>
                <h1>
                    <Row>
                        <div>{this.props.caseTitle}</div>
                        <br />{this.renderProgressBar()}
                    </Row>
                </h1>

                <br />

                <h3>
                    <Row>
                        <Col sm={3}>Question {this.props.question.id}  </Col>
                        <Col sm={5} className='pull-right'>{this.renderTimer(0.2)}</Col>
                    </Row>
                </h3>

                <br />
                <Panel bsStyle="info" id="panel">
                    <h4>{this.renderScenario()}</h4>

                    <br />

                    <h4>{this.props.question.question}</h4>


                    <div class="col-md-5 col-md-offset-2">{<ImageMagnifier url={this.props.question.attachment} />}</div>
                    {imageZoom}

                    <br />

                    <br />
                    <div class="col-md-10 col-md-offset-1">
                        <Form><h4>
                            <FormGroup>
                                <FormGroup controlId="formControlsOpenEnded">
                                    <ControlLabel>Your Answer</ControlLabel><br />

                                    <FormControl componentClass="textarea" rows={6} placeholder="Enter your answer" value={this.state.openEnded} name="openEnded" onChange={(e) => this.handleOpenEndedChange(e)} />

                                </FormGroup>

                            </FormGroup>
                        </h4></Form>
                    </div>
                </Panel>
                {this.renderShowNextButton()}

                {this.state.showAnswers && <OpenEndedAnswer question={this.props.question} totalQnNum={this.props.totalQnNum} handleNextQuestion={this.handleNextQuestion} />}

            </div>
        );
    }

    render() {
        return (
            <Form horizontal>
                {this.renderContent()}
            </Form>
        );
    }
}

function mapStateToProps2({ game, auth }) {
    return {
        game,
        auth
    };
}

export default connect(mapStateToProps2, { storeCaseAnswerOpenEnded })(OpenEndedQuestion);

