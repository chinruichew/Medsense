import React, { Component } from 'react';
import { Form, FormGroup, Col } from 'react-bootstrap';
import { Button, Row, ControlLabel, FormControl, Panel } from 'react-bootstrap';
import { bindAll } from 'lodash';
import { Line } from 'rc-progress';
import ReactHtmlParser from 'react-html-parser';
import OpenEndedAnswer from "./OpenEndedAnswer";
import ImageMagnifier from "./ImageMagnifier";
import ReactQuill from 'react-quill';
import axios from 'axios';

import 'react-quill/dist/quill.snow.css';

var toolbarOptions = [
    [{ 'header': [1, 2, 3, false] }],
    ['bold', 'italic', 'underline'],        // toggled buttons
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
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
            date: this.props.date,
            seconds: parseFloat(this.props.question.time) * 60,
            score: 0,
        };
        this.timer = 0;
        bindAll(this, 'selectDone', 'startTimer', 'countDown', 'secondsToTime', 'pauseTimer', 'renderTimer',
            'renderShowNextButton', 'renderProgressBar', 'renderScenario', 'renderContent', 'handleOpenEndedChange');
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
        window.scrollTo(0, 0)
    }

    selectDone() {
        const {showAnswers} = this.state;
        const {showNextButton} = this.state;
        if (!showAnswers) {
            this.setState({ showAnswers: !showAnswers });
            this.setState({ showNextButton: !showNextButton });
            this.pauseTimer();
        }
        var score = "toBeFilled";
        axios.post('/api/matchNLP', {
            id: this.props.question._id,
            values: this.state
        }).then(res => {
            score = res['data']['data'];
            setTimeout(function () { this.setState({ score: score*this.state.mark }); }.bind(this), 1);
        })
    }

    renderTimer(duration) {
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
            return ReactHtmlParser(this.props.scenario);
        } else {
            return ReactHtmlParser(this.props.question.stem);
        }
    }

    handleOpenEndedChange(value){
        this.setState({ openEnded: value });
        // console.log(this.state.openEnded);
    }

    renderContent() {
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
                        <Col sm={3}>Question {this.props.question.id} </Col>
                        <Col sm={5} className='pull-right'>{this.renderTimer(0.2)}</Col>
                    </Row>
                </h3>

                <br />
                <Panel bsStyle="info" id="panel" style={{ borderWidth: "thick", width: "93%" }}>
                    <h4 style={{ border: "0", background: "white", padding: "0", fontSize: "medium", whiteSpace: "pre-wrap", wordBreak: "keep-all" }}>{this.renderScenario()}</h4>
                    <br />
                    <h4 style={{ border: "0", background: "white", padding: "0", fontSize: "medium", whiteSpace: "pre-wrap", wordBreak: "keep-all" }}>{ReactHtmlParser(this.props.question.question)}</h4>
                    <br/>
                    <Row>
                    <div class="col-md-5 col-md-offset-2">{<ImageMagnifier url={this.props.question.attachment} />}</div>
                    </Row>
                    <Row>
                        <Col smOffset={1}>
                            <Form style={{ margin: "0", width: "90%"}}><h4>
                                <FormGroup style={{height:'300px'}}>
                                    <FormGroup controlId="formControlsOpenEnded">
                                        <ControlLabel style={{padding: "0", margin: "0"}}>Your Answer</ControlLabel><br /><br/>

                                        {/*<FormControl componentClass="textarea" rows={6} placeholder="Enter your answer" value={this.state.openEnded} name="openEnded" onChange={(e) => this.handleOpenEndedChange(e)} />*/}

                                        <ReactQuill value={this.state.openEnded}
                                                    modules={{toolbar: toolbarOptions}}
                                                    onChange={this.handleOpenEndedChange}
                                                    placeholder="Enter your answer"
                                                    style={{height:'200px'}}/>
                                    </FormGroup>

                                </FormGroup>
                            </h4></Form></Col>
                    </Row>
                </Panel>
                {this.renderShowNextButton()}

                {this.state.showAnswers && <h3>You got {(this.state.score/this.state.mark*100).toFixed(2)} % correct! <br/>Your score for this question: {Math.round(this.state.score)} / {this.state.mark}</h3>}

                {this.state.showAnswers && <OpenEndedAnswer
                    caseid={this.props.caseid}
                    score={this.state.score}
                    authid={this.props.authid}
                    timeLimit={this.state.timeLimit}
                    seconds={this.state.seconds}
                    date={this.props.date}
                    openEnded={this.state.openEnded}
                    updateScore={this.props.updateScore}
                    question={this.props.question}
                    totalQnNum={this.props.totalQnNum}
                    handleViewScore={this.props.handleViewScore}
                    handleNextQuestion={this.props.handleNextQuestion} />}

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