import React, { Component } from 'react';
import { Button, Panel, PanelGroup } from 'react-bootstrap';
import BootstrapModal from '../UI/Modal/VettingBootstrapModal.js';
import ReactHtmlParser from 'react-html-parser';
import {connect} from "react-redux";
import axios from 'axios';
import {completeGame} from "../../actions";
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faSquare from "@fortawesome/fontawesome-free-regular/faSquare";
import faCheckSquare from "@fortawesome/fontawesome-free-regular/faCheckSquare";

class GameResults extends Component {
    state = {
        vmShow:false,
        points: this.props.auth.points,
    };

    componentDidMount() {
        window.scrollTo(0, 0);
        this.props.completeGame({
            score: this.props.score,
            xp: this.props.xp
        });
        this.checkLevel();
    }

    renderContent(){
        const game = this.props.game;
        switch(game) {
            case null:
                return;
            default:
                const lpTitle = <span className="title" style={{fontSize: "180%"}}><strong>Key Learning Objectives</strong></span>;

                const mcqAnswers = game.mcqAnswers;
                let questions = this.props.case.questions.map((question, index) => {
                    let openEndedAnswer = null;
                    let mcqAnswer = null;
                    for(let i = 0; i < mcqAnswers.length; i++) {
                        if(mcqAnswers[i].questionId === question._id) {
                            mcqAnswer = mcqAnswers[i];
                            break;
                        }
                    }

                    let studentAnswer = "";
                    let modelAnswer = '';
                    if (question.type==="MCQ") {
                        // Map student answer
                        const mcqAnswerOptions = mcqAnswer.mcqAnswerOptions;
                        const mcqAnswerOptionMapping = [];
                        for(let i = 0; i < mcqAnswerOptions.length; i++) {
                            const mcqAnswerOption = mcqAnswerOptions[i];
                            if(mcqAnswerOption.check) {
                                const questionOptions = question.options;
                                for(let j = 0; j < questionOptions.length; j++) {
                                    const questionOption = questionOptions[j];
                                    if(questionOption._id === mcqAnswerOption.questionOption) {
                                        mcqAnswerOptionMapping.push({
                                            index: i,
                                            text: questionOption.mcq,
                                            check: mcqAnswerOption.check
                                        });
                                        break;
                                    }
                                }
                            } else {
                                const questionOptions = question.options;
                                for(let j = 0; j < questionOptions.length; j++) {
                                    const questionOption = questionOptions[j];
                                    if(questionOption._id === mcqAnswerOption.questionOption) {
                                        mcqAnswerOptionMapping.push({
                                            index: i,
                                            text: questionOption.mcq,
                                            check: mcqAnswerOption.check
                                        });
                                        break;
                                    }
                                }
                            }
                        }
                        studentAnswer = mcqAnswerOptionMapping.map((mcqAnswerOptionMap, index) => {
                            if(mcqAnswerOptionMap.check) {
                                return(
                                    <p key={index}><FontAwesomeIcon icon={faCheckSquare} className="mcq-option-icon" />{mcqAnswerOptionMap.text}</p>
                                );
                            } else {
                                return(
                                    <p key={index}><FontAwesomeIcon icon={faSquare} className="mcq-option-icon" />{mcqAnswerOptionMap.text}</p>
                                );
                            }
                        });

                        // Concat model answer
                        const mcqQuestionOptionMapping = [];
                        for(let i = 0; i < question.options.length; i++) {
                            const option = question.options[i];
                            mcqQuestionOptionMapping.push({
                                index: i,
                                text: option.mcq,
                                check: option.check
                            });
                        }
                        modelAnswer = mcqQuestionOptionMapping.map((mcqQuestionOptionMap, index) => {
                            if(mcqQuestionOptionMap.check) {
                                return(
                                    <p key={index}><FontAwesomeIcon icon={faCheckSquare} className="mcq-option-icon" />{mcqQuestionOptionMap.text}</p>
                                );
                            } else {
                                return(
                                    <p key={index}><FontAwesomeIcon icon={faSquare} className="mcq-option-icon" />{mcqQuestionOptionMap.text}</p>
                                );
                            }
                        });
                    } else {
                        modelAnswer = ReactHtmlParser(question.openEnded);

                        // Get student answer
                        const openEndedAnswers = game.openEndedAnswers;
                        for(let i = 0; i < openEndedAnswers.length; i++) {
                            openEndedAnswer = openEndedAnswers[i];
                            if(openEndedAnswer.questionId === question._id) {
                                studentAnswer = ReactHtmlParser(openEndedAnswer.studentAnswer);
                                break;
                            }
                        }
                    }

                    const answer = openEndedAnswer === null? mcqAnswer: openEndedAnswer;
                    const scoreStyle = answer.score < answer.mark/2? 'red': 'green';
                    const qnTitle = <span className="title" style={{fontSize: "180%"}}><strong>Question {question.id}</strong></span>;

                    if(question.id === "1"){
                        return (
                            <div key={index}>
                                <PanelGroup accordion>
                                    <Panel eventKey="1" bsStyle="primary" style={{marginLeft: "10%", marginRight: "10%", padding: "0"}}>
                                        <Panel.Heading>
                                            <Panel.Title toggle>{qnTitle}</Panel.Title>
                                        </Panel.Heading>
                                        <Panel.Body collapsible>
                                            <h3 style={{color: scoreStyle}}>Your Score: {answer.score}/{answer.mark}</h3>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <h3 className="result-heading">Case Scenario</h3>
                                                    <h4>
                                                        <p>{ReactHtmlParser(this.props.case.scenario)}</p>
                                                    </h4>
                                                </div>
                                            </div>
                                            <h3 className="result-heading">Question</h3>
                                            <h4>
                                                {ReactHtmlParser(question.question)}
                                            </h4>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <h3 className="result-heading">Your Answer</h3>
                                                    <h4>
                                                        {studentAnswer}
                                                    </h4>
                                                </div>
                                                <div className="col-md-6">
                                                    <h3 className="result-heading">Model Answer</h3>
                                                    <h4>
                                                        {modelAnswer}
                                                    </h4>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <h3 className="result-heading">Clinical Pearls</h3>
                                                    <h4>
                                                        {ReactHtmlParser(question.pearl)}
                                                    </h4>
                                                </div>
                                            </div>
                                        </Panel.Body>
                                    </Panel>
                                </PanelGroup>
                            </div>
                        );
                    }else{
                        const stem = question.stem.replace(/\s+/g, '')===""?<div></div>:<div className="col-md-12">
                            <h3 className="result-heading">STEM</h3>
                            <h4>
                                <p>{ReactHtmlParser(question.stem)}</p>
                            </h4>
                        </div>;
                        return (
                            <div key={index}>
                                <PanelGroup accordion>
                                    <Panel eventKey="1" bsStyle="primary" style={{marginLeft: "10%", marginRight: "10%", padding: "0"}}>
                                        <Panel.Heading>
                                            <Panel.Title toggle>{qnTitle}</Panel.Title>
                                        </Panel.Heading>
                                        <Panel.Body collapsible>
                                            <div className="row">
                                                {stem}
                                            </div>
                                            <h3 style={{color: scoreStyle}}>Your Score: {answer.score}/{answer.mark}</h3>
                                            <h3 className="result-heading">Question</h3>
                                            <h4>
                                                {ReactHtmlParser(question.question)}
                                            </h4>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <h3 className="result-heading">Your Answer</h3>
                                                    <h4>
                                                        {studentAnswer}
                                                    </h4>
                                                </div>
                                                <div className="col-md-6">
                                                    <h3 className="result-heading">Model Answer</h3>
                                                    <h4>
                                                        {modelAnswer}
                                                    </h4>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <h3 className="result-heading">Clinical Pearls</h3>
                                                    <h4>
                                                        {ReactHtmlParser(question.pearl)}
                                                    </h4>
                                                </div>
                                            </div>
                                        </Panel.Body>
                                    </Panel>
                                </PanelGroup>
                            </div>
                        );
                    }
                });
                return(
                    <div>
                        <div align="center">
                            <h1 className="game-heading"><strong>{this.props.case.title}</strong></h1>
                            <h2> You have earned {this.props.xp} XP! </h2>
                            <br /><br />
                        <h4 style={{marginLeft: "10%", marginRight: "10%", padding: "0"}}>
                            <em>Expand and collapse the headers to view the answers for the case!</em>
                        </h4>
                        </div>
                        <br/>
                        <PanelGroup accordion>
                            <Panel eventKey="1" bsStyle="primary" style={{marginLeft: "10%", marginRight: "10%", padding: "0"}}>
                                <Panel.Heading>
                                    <Panel.Title toggle>{lpTitle}</Panel.Title>
                                </Panel.Heading>
                                <Panel.Body collapsible>
                                    <h4>{ReactHtmlParser(this.props.case.learning)}</h4>
                                </Panel.Body>
                            </Panel>
                        </PanelGroup>
                        {questions}
                    </div>
                );
        }
    }

    checkLevel = () =>{
        const xp = this.state.points + this.props.xp;
        const prev = this.state.points;
        axios.get('/api/calculateUserLevel?xp=' + prev).then(res => {
            const prevLevel = res.data;
            axios.get('/api/calculateUserLevel?xp=' + xp).then(res => {
                const currLevel = res.data;
                if (prevLevel !== currLevel) {
                    this.setState({vmShow: true, level: currLevel});
                }
            });
        });
    };

    render(){
        let vmClose = () => this.setState({ vmShow: false });

        return(
            <div className='container'>
                {this.renderContent()}
                <BootstrapModal
                    show={this.state.vmShow}
                    onHide={vmClose}
                    aria-labelledby="levelup-modal">
                    <BootstrapModal.Header closeButton>
                        <center><BootstrapModal.Title id="levelup-modal">LEVEL UP</BootstrapModal.Title></center>
                    </BootstrapModal.Header>
                    <BootstrapModal.Body>
                        <center><img hspace="5" src="./congrats.png" style={{ height: "50%" }} alt="" />
                            <p>{this.state.points+this.props.xp} XP</p>
                        <p>Level {this.state.level}</p>
                            <p>Your level increased</p></center>
                    </BootstrapModal.Body>
                    <BootstrapModal.Footer>
                        <center><Button onClick={vmClose}>OKAY</Button></center>
                    </BootstrapModal.Footer>
                </BootstrapModal>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        completeGame: (values) => dispatch(completeGame(values))
    }
};

function mapStateToProps({ auth, game }) {
    return { auth, game };
}

export default connect(mapStateToProps, mapDispatchToProps)(GameResults);