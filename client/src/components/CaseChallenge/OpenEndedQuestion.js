import React, { Component } from 'react';
import {Form, FormGroup, Col, Glyphicon} from 'react-bootstrap';
import { Button, Row, ControlLabel, Panel } from 'react-bootstrap';
import { bindAll } from 'lodash';
import { Line } from 'rc-progress';
import ReactHtmlParser from 'react-html-parser';
import OpenEndedAnswer from "./OpenEndedAnswer";
import ImageMagnifier from "./ImageMagnifier";
import ReactQuill from 'react-quill';
import axios from 'axios';
import BootstrapModal from '../UI/Modal/UploadBootstrapModal.js';
import './Game.css';
import 'react-quill/dist/quill.snow.css';

const toolbarOptions = [
    [{ 'header': [1, 2, 3, false] }],
    ['bold', 'italic', 'underline'],        // toggled buttons
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'indent': '-1'}, { 'indent': '+1' }],
    ['clean']                                         // remove formatting button
];

class OpenEndedQuestion extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mark: this.props.question.mark,
            question: this.props.question.question,
            stem: this.props.question.stem,
            type: this.props.question.type,
            attachment: this.props.question.attachment,
            pearl: this.props.question.pearl,
            reference: this.props.question.reference,
            showAnswers: false,
            openEnded: "",
            showNextButton: true,
            answerid: this.props.answerid,
            authid: this.props.authid,
            time: {},
            timeLimit: parseFloat(this.props.question.time) * 60,
            seconds: parseFloat(this.props.question.time) * 60,
            score: 0,
            questionStart: null,
            showSTEMs: false
        };
        this.timer = 0;
        bindAll(this, 'selectDone', 'startTimer', 'countDown', 'secondsToTime', 'pauseTimer', 'renderTimer',
            'renderShowNextButton', 'renderProgressBar', 'renderScenario', 'renderContent', 'handleOpenEndedChange',
            'renderStorySoFar');
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
        this.setState({ time: timeLeftVar, questionStart: new Date() });
        window.scrollTo(0, 0)
    }

    selectDone() {
        const {showNextButton} = this.state;
        if (!this.state.showAnswers) {
            this.pauseTimer();
        }
        let score = "toBeFilled";
        axios.post('/api/matchNLP', {
            id: this.props.question._id,
            values: this.state
        }).then(res => {
            score = res['data']['data'];
            // setTimeout(function () { this.setState({ score: score*this.state.mark }); }.bind(this), 1);
            this.setState({ score: score*this.state.mark });
            if (!this.state.showAnswers) {
                this.setState({ showAnswers: true });
                this.setState({ showNextButton: !showNextButton});
            }
        })
    }

    renderTimer(duration) {
        if (this.props.timeLimit) {
            return (
                <Col>
                    {this.startTimer()}
                    <img src="./timer.png" hspace='5' alt="" style={{ height: "35px" }} /> {this.state.time.m}
                    min {this.state.time.s} sec
                </Col>
            );
        }
    }

    renderStorySoFar(){
        let stems = this.props.case.questions.map((obj, index) => {
            if (parseFloat(obj.id) < parseFloat(this.props.question.id)) {
                let stem = '';
                if (obj.id !== 1) {
                    stem = obj.stem;
                }

                return (
                    <div style={{color: "black"}} className="stem">
                        {ReactHtmlParser(stem)}
                        <br />
                    </div>
                );
            }
            return '';
        });

        if (this.props.question.id > "1") {
            return (
                <div className="previous-stem">
                    <h3>Case Scenario</h3>
                    <h5>{ReactHtmlParser(this.props.scenario)}</h5>
                    <h3>STEM</h3>
                    <h5>{stems}</h5>
                </div>
            );
        }
    }

    renderPreviousSTEM = () => {
        if (this.props.question.id > "1") {
            return (
                <Row>
                    <Col className="previous-stem-col">
                        <Button type="button" bsStyle="link" className="previous-stem-btn" onClick={(e) => this.setState({ showSTEMs: true })}>
                            <h3><Glyphicon glyph="glyphicon glyphicon-book"/> Read Story So Far</h3>
                        </Button>
                    </Col>
                </Row>
            );
        }

    }

    renderShowNextButton() {
        const {showNextButton} = this.state;
        if (showNextButton) {
            return (
                <Col smOffset={10}>
                    <Button onClick={(e) => this.selectDone()} hspace="20" bsStyle="primary" bsSize="large">
                        Done
                    </Button>
                </Col>
            );
        }
    }

    renderProgressBar() {
        let progress = parseFloat(this.props.question.id) / parseFloat(this.props.totalQnNum) * 100;
        return (
            <div >
                <Col sm={9} align="left" style={{paddingLeft: "0", width: "81%"}}>
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
            return ReactHtmlParser(this.props.scenario);
        } else {
            return ReactHtmlParser(this.props.question.stem);
        }
    }

    handleOpenEndedChange(value){
        this.setState({ openEnded: value });
    }

    renderContent() {
        return (
            <div className='container'>
                <h1>
                    <Row>
                        <div style={{marginBottom:"1%"}}>{this.props.caseTitle}</div>
                        {this.renderProgressBar()}
                    </Row>
                </h1>
                <br/>
                <h3>
                    <Row style={{width: "95%"}}>
                        <Col sm={3} style={{paddingLeft: "0", fontWeight: "bold"}}>Question {this.props.question.id} </Col>
                        <Col className='pull-right'>{this.renderTimer(0.2)}</Col>
                    </Row>
                </h3>

                {this.renderPreviousSTEM()}

                <Row>
                    <Panel bsStyle="info" id="panel" style={{ borderWidth: "thick", width: "93%" }}>
                        <div className="game-question-area">
                            <h4 style={{ border: "0", background: "white", padding: "0", fontSize: "medium",
                                whiteSpace: "pre-wrap", wordBreak: "keep-all" }}>{this.renderScenario()}
                            </h4>
                            <h4 style={{ border: "0", background: "white", padding: "0", fontSize: "medium",
                                whiteSpace: "pre-wrap", wordBreak: "keep-all" }}>{ReactHtmlParser(this.props.question.question)}
                            </h4>
                            <br/>
                            <Row style={{margin: "0", padding:"0"}}>
                                <div className="col-md-5 col-md-offset-2" style={{marginLeft: "9%", marginBottom: "2%"}}>
                                    {<ImageMagnifier url={this.props.question.attachment} />}
                                </div>
                            </Row>
                            <Row>
                                <Col smOffset={1}>
                                    <Form style={{ margin: "0", width: "90%"}}><h4>
                                        <FormGroup style={{height:'300px'}} controlId="formControlsOpenEnded">
                                            <ControlLabel style={{padding: "0", margin: "0"}}>Your Answer</ControlLabel><br /><br/>
                                            <ReactQuill value={this.state.openEnded}
                                                        modules={{toolbar: toolbarOptions}}
                                                        onChange={this.handleOpenEndedChange}
                                                        placeholder="Enter your answer"
                                                        style={{height:'200px'}}/>
                                        </FormGroup>
                                    </h4></Form></Col>
                            </Row>
                        </div>
                    </Panel>
                    {this.renderShowNextButton()}

                    {this.state.showAnswers &&
                        <Col sm={11}>
                            <h3>You got {(this.state.score/this.state.mark*100).toFixed(2)} % correct! </h3>
                            <h3>Your score for this question: {Math.round(this.state.score)} / {this.state.mark}</h3><br/>
                        </Col>}

                    {this.state.showAnswers && <OpenEndedAnswer
                        caseid={this.props.caseid}
                        score={Math.round(this.state.score)}
                        authid={this.props.authid}
                        timeLimit={this.state.timeLimit}
                        seconds={this.state.seconds}
                        openEnded={this.state.openEnded}
                        updateScore={this.props.updateScore}
                        question={this.props.question}
                        totalQnNum={this.props.totalQnNum}
                        handleViewScore={this.props.handleViewScore}
                        handleNextQuestion={this.props.handleNextQuestion}
                        questionStart={this.state.questionStart}
                        questionEnd={new Date()}
                        questionId={this.props.question._id}
                        nlpAccuracy={(this.state.score/this.state.mark*100).toFixed(2)}
                        questionNumber={this.props.question.id}
                    />}
                </Row>

                <BootstrapModal bsSize="large" show={this.state.showSTEMs} onHide={(e) => this.setState({ showSTEMs: false })}>
                    <BootstrapModal.Header closeButton>
                        <BootstrapModal.Title id="contained-modal-title-lg" style={{fontSize: "200%", fontWeight: "bold"}}>Story So Far</BootstrapModal.Title>
                    </BootstrapModal.Header>
                    <BootstrapModal.Body>
                        {this.renderStorySoFar()}
                    </BootstrapModal.Body>
                    <BootstrapModal.Footer>
                        <Button onClick={(e) => this.setState({ showSTEMs: false })}>Close</Button>
                    </BootstrapModal.Footer>
                </BootstrapModal>

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

export default OpenEndedQuestion;