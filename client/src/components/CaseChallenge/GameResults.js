import React, { Component } from 'react';
import { Button, Panel, PanelGroup } from 'react-bootstrap';
import BootstrapModal from '../UI/Modal/VettingBootstrapModal.js';
import ReactHtmlParser from 'react-html-parser';
import {connect} from "react-redux";
import axios from 'axios';
import {completeGame} from "../../actions";

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
        const lpTitle = <span className="title" style={{fontSize: "180%"}}><strong>Learning Points</strong></span>

        let questions = this.props.case.questions.map((obj, index) => {
            let answer="";
            if (obj.type==="MCQ"){
                if (obj.check1) {
                    answer += obj.mcq1 + ", ";
                }
                if (obj.check2) {
                    answer += obj.mcq2 + ", ";
                }
                if (obj.check3) {
                    answer += obj.mcq3 + ", ";
                }
                if (obj.check4) {
                    answer += obj.mcq4 + ", ";
                }
                if (obj.check5) {
                    answer += obj.mcq5 + ", ";
                }
                if (obj.check6) {
                    answer += obj.mcq6 + ", ";
                }
                answer = answer.substring(0, answer.length - 2);
            } else {
                answer = obj.openEnded;
            }

            const qnTitle = <span className="title" style={{fontSize: "180%"}}><strong>Question {obj.id}</strong></span>

            if(obj.id === "1"){
                return (
                    <div key={index}>
                        <PanelGroup accordion>
                            <Panel eventKey="1" bsStyle="primary" style={{marginLeft: "14%", marginRight: "15%", padding: "0"}}>
                                <Panel.Heading>
                                    <Panel.Title toggle>{qnTitle}</Panel.Title>
                                </Panel.Heading>
                                <Panel.Body collapsible>
                                    <h3 className="result-heading">Case Scenario</h3>
                                    <h4 style={{whiteSpace: "pre-wrap", wordBreak: "keep-all"}}>
                                        {ReactHtmlParser(this.props.case.scenario)}
                                    </h4>
                                    <h3 className="result-heading">Question</h3>
                                    <h4 style={{whiteSpace: "pre-wrap", wordBreak: "keep-all"}}>
                                        {ReactHtmlParser(obj.question)}
                                    </h4>
                                    <h3 className="result-heading">Answer</h3>
                                    <h4 style={{whiteSpace: "pre-wrap", wordBreak: "keep-all"}}>
                                        {ReactHtmlParser(answer)}
                                    </h4>
                                    <h3 className="result-heading">PEARL</h3>
                                    <h4 style={{whiteSpace: "pre-wrap", wordBreak: "keep-all"}}>
                                        {ReactHtmlParser(obj.pearl)}
                                    </h4>
                                </Panel.Body>
                            </Panel>
                        </PanelGroup>
                    </div>
                );
            }else{
                return (
                    <div key={index}>
                        <PanelGroup accordion>
                            <Panel eventKey="1" bsStyle="primary" style={{marginLeft: "14%", marginRight: "15%", padding: "0"}}>
                                <Panel.Heading>
                                    <Panel.Title toggle>{qnTitle}</Panel.Title>
                                </Panel.Heading>
                                <Panel.Body collapsible>
                                    <h3 className="result-heading">STEM</h3>
                                    <h4 style={{whiteSpace: "pre-wrap", wordBreak: "keep-all"}}>
                                        {ReactHtmlParser(obj.stem)}
                                    </h4>
                                    <h3 className="result-heading">Question</h3>
                                    <h4 style={{whiteSpace: "pre-wrap", wordBreak: "keep-all"}}>
                                        {ReactHtmlParser(obj.question)}
                                    </h4>
                                    <h3 className="result-heading">Answer</h3>
                                    <h4 style={{whiteSpace: "pre-wrap", wordBreak: "keep-all"}}>
                                        {ReactHtmlParser(answer)}
                                    </h4>
                                    <h3 className="result-heading">PEARL</h3>
                                    <h4 style={{whiteSpace: "pre-wrap", wordBreak: "keep-all"}}>
                                        {ReactHtmlParser(obj.pearl)}
                                    </h4>
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
                <h1><strong>{this.props.case.title}</strong></h1>
                <h2> You have earned {this.props.xp} XP! </h2>
                <br /><br />

                </div>
                <h4 style={{marginLeft: "14%", marginRight: "15%", padding: "0"}}>
                    <em>Expand and collapse the headers to view the answers for the case!</em>
                </h4>
                <br/>
                <PanelGroup accordion>
                    <Panel eventKey="1" bsStyle="primary" style={{marginLeft: "14%", marginRight: "15%", padding: "0"}}>
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
    
    renderDiscussionForum(){ 
        return(
            <div className='container' align="justify">
                <h3> Have a question to ask? </h3> 
                <Button   bsStyle="primary" bsSize="large">
                    Start a discussion post!
                </Button>
            </div> 
        );
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

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps, mapDispatchToProps)(GameResults);