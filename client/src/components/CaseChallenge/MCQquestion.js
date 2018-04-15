import React, { Component } from 'react';
import {Form, FormGroup, Col, Glyphicon} from 'react-bootstrap';
import { Checkbox, Button, Row, Panel } from 'react-bootstrap';
import { Line } from 'rc-progress';
import ReactHtmlParser from 'react-html-parser';
import MCQAnswers from './MCQAnswers';
import ImageMagnifier from "./ImageMagnifier";
import BootstrapModal from '../UI/Modal/UploadBootstrapModal.js';
import './Game.css';

class MCQquestion extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mark: this.props.question.mark,
            question: this.props.question,
            stem: this.props.question.stem,
            type: this.props.question.type,
            attachment: this.props.question.attachment,
            pearl: this.props.question.pearl,
            reference: this.props.question.reference,
            showAnswers: false,
            showNextButton: true,
            answerid: this.props.answerid,
            authid: this.props.authid,
            timeLimit: parseFloat(this.props.question.time) * 60,
            time: {},
            seconds: parseFloat(this.props.question.time) * 60,
            questionStart: null,
            checkedMCQs: [],
            showSTEMs: false
        };
        this.timer = 0;
    }

    startTimer = () => {
        if (this.timer === 0) {
            this.timer = setInterval(this.countDown, 1000);
        }
    };

    countDown = () => {
        // Remove one second, set state so a re-render happens.
        let seconds = this.state.seconds - 1;
        this.setState({
            time: this.secondsToTime(seconds),
            seconds: seconds,
        });

        // Check if we're at zero.
        if (seconds === 0) {
            clearInterval(this.timer);
            this.selectDone();
        }
    };

    secondsToTime = (secs) => {
        let divisor_for_minutes = secs % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);

        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);

        let obj = {
            "m": minutes,
            "s": seconds
        };
        return obj;
    };

    pauseTimer = () =>{
        clearInterval(this.timer);
    };

    componentDidMount() {
        const options = this.props.question.options;
        const newOptions = [];
        for(let i = 0; i < options.length; i++) {
            const option = options[i];
            const newOption = {
                check: false,
                questionOption: option._id
            };
            newOptions.push(newOption);
        }
        this.setState({checkedMCQs: newOptions});

        let timeLeftVar = this.secondsToTime(this.state.seconds);
        this.setState({ time: timeLeftVar, questionStart: new Date() });
        window.scrollTo(0, 0)
    }

    selectDone = () => {
        const { showAnswers } = this.state;
        const { showNextButton } = this.state;
        if (!showAnswers) {
            this.setState({ showAnswers: !showAnswers });
            this.setState({ showNextButton: !showNextButton });
            this.pauseTimer();
        }
    };

    renderTimer = (duration) => {
        if (this.props.timeLimit) {
            return (
                <Col>
                    {this.startTimer()}
                    <img src="./timer.png" hspace='5' alt="" style={{ height: "35px" }} /> {this.state.time.m}
                    min {this.state.time.s} sec
                </Col>
            );
        }
        return;
    };

    renderShowNextButton = () =>{
        const { showNextButton } = this.state;
        if (showNextButton) {
            return (
                <Col smOffset={10}>
                    <Button onClick={(e) => this.selectDone()} hspace="20" bsStyle="primary" bsSize="large">
                        Done
                    </Button>
                </Col>
            );
        }
    };

    renderProgressBar = () =>{
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
    };

    renderScenario = () =>{
        if (this.props.question.id === 1 + "") {
            return ReactHtmlParser(this.props.scenario);
        } else {
            return ReactHtmlParser(this.props.question.stem);
        }
    };

    renderStorySoFar = () =>{
        let stems = this.props.case.questions.map((obj, index) => {
            if (parseFloat(obj.id) < parseFloat(this.props.question.id)) {
                let stem = '';
                if (obj.id !== 1) {
                    stem = obj.stem;
                }

                return (
                    <div style={{color: "black"}}>
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
    };

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

    handleCheckChange = (value, optionId) => {
        // Set value for MCQ option
        let newOptions = [];
        for(let i = 0; i < this.state.checkedMCQs.length; i++) {
            const option = this.state.checkedMCQs[i];
            if(option.questionOption === optionId) {
                option.check = value;
            }
            newOptions.push(option);
        }

        // Set new check MCQs state
        this.setState({checkedMCQs: newOptions});
    };

    renderMCQs = () => {
        return this.props.question.options.map((option, index) => {
            return(
                <Checkbox key={index} onChange={(e) => this.handleCheckChange(e.target.checked, option._id)}>{option.mcq}</Checkbox>
            );
        });
    };

    // handlePreviousSTEM

    render() {
        return (
            <Form horizontal>
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
                            <Col sm={3} style={{paddingLeft: "0", fontWeight: "bold"}}>Question {this.props.question.id}  </Col>
                            <Col className='pull-right'>{this.renderTimer(0.2)}</Col>
                        </Row>
                    </h3>

                    {this.renderPreviousSTEM()}

                    <Row>
                        <Panel bsStyle="info" id="panel" style={{ borderWidth: "thick", width: "93%" }}>

                            <div className="game-question-area">
                                <h4 style={{ border: "0", background: "white", padding: "0", fontSize: "medium",
                                    whiteSpace: "pre-wrap", wordBreak: "keep-all" }}>{this.renderScenario()}</h4>
                                <h4 style={{ border: "0", background: "white", padding: "0", fontSize: "medium",
                                    whiteSpace: "pre-wrap", wordBreak: "keep-all" }}>
                                    {ReactHtmlParser(this.props.question.question)} ({this.state.mark} {this.state.mark > 1? 'marks': 'mark'})
                                </h4>
                                <br/>
                                <Row style={{margin: "0", padding:"0"}}>
                                    <div className="col-md-5 col-md-offset-2" style={{marginLeft: "9%", marginBottom: "2%"}}>
                                        {<ImageMagnifier url={this.props.question.attachment} />}
                                    </div>
                                </Row>
                                <Form><h4>
                                    <FormGroup>
                                        <div className="col-md-6 col-md-offset-2">
                                            {this.renderMCQs()}
                                        </div>
                                    </FormGroup>
                                </h4></Form>
                            </div>
                        </Panel>

                        {this.renderShowNextButton()}

                        {this.state.showAnswers && <MCQAnswers
                            caseid={this.props.caseid}
                            authid={this.props.authid}
                            timeLimit={this.state.timeLimit}
                            seconds={this.state.seconds}
                            question={this.props.question}
                            totalQnNum={this.props.totalQnNum}
                            updateScore={this.props.updateScore}
                            handleViewScore={this.props.handleViewScore}
                            handleNextQuestion={this.props.handleNextQuestion}
                            questionStart={this.state.questionStart}
                            questionEnd={new Date()}
                            questionId={this.props.question._id}
                            questionNumber={this.props.question.id}
                            checkedMCQs={this.state.checkedMCQs}
                        />}
                    </Row>
                </div>

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
            </Form>


        );
    }
}

export default MCQquestion;