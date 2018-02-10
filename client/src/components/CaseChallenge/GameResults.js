import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import BootstrapModal from '../UI/Modal/VettingBootstrapModal.js';

class GameResults extends Component {
    constructor(props){
        super(props);
        this.state={
            vmShow:false,
            points:0,
        };
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        axios.post('/api/updateUserPoints', {
            score: this.props.score
        }).then(res => {
            this.setState({points: res.data.points})
            this.checkLevel();
        });
        axios.post('/api/gameCompleted', {
            authid: this.props.authid,
            date: this.props.date,
            score: this.props.score,
        });

    }

    renderContent(){
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
            return (
                <div>
                    <h3>Question {obj.id}</h3>
                    <h4 style={{whiteSpace: "pre-wrap", wordBreak: "keep-all"}}>
                        {obj.stem}
                        <br/>
                        {obj.question}
                    </h4>
                    <br/>
                    <h3>Answer</h3>
                    <h4 style={{whiteSpace: "pre-wrap", wordBreak: "keep-all"}}>
                        {answer}
                        <br/>
                        {obj.pearl}
                    </h4>
                    <br/>
                </div>
            );
        });
        return(
            <div>
                <div align="center">
                <h1>{this.props.case.title}</h1>
                <h1> You have earned {this.props.score} XP! </h1>
                <br /><br />

                </div>
                <h3><img src="./checklist.png" hspace='5' alt="" style={{ width: "5%" }} />Learning Points</h3>
                <h4>{this.props.case.learning}</h4>
                <br/>
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

    checkLevel(){
        console.log(this.props.score);
        const prev = this.state.points-this.props.score;
        console.log(this.state.points);
        const prevLevel = Math.floor((50+Math.sqrt(400*prev-37500))/100);
        const currLevel = Math.floor((50+Math.sqrt(400*this.state.points-37500))/100);
        console.log(prevLevel);
        console.log(currLevel);
        if (prevLevel!==currLevel){
            this.setState({vmShow:true, level:currLevel});
        }
    }

    render() {
        let vmClose = () => this.setState({ vmShow: false });
        return(
            <div className='container'>
                {this.renderContent()}
                {/* {this.renderDiscussionForum()} */}
                <BootstrapModal
                    show={this.state.vmShow}
                    onHide={vmClose}
                    aria-labelledby="levelup-modal">
                    <BootstrapModal.Header closeButton>
                        <center><BootstrapModal.Title id="levelup-modal">LEVEL UP</BootstrapModal.Title></center>
                    </BootstrapModal.Header>
                    <BootstrapModal.Body>
                        <center><img hspace="5" src="./congrats.png" style={{ height: "50%" }} alt="" />
                            <p>{this.state.points} XP</p>
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

export default GameResults;