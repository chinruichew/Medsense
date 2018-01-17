import React, { Component } from 'react';
import { Form, FormGroup, ControlLabel, Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { bindAll } from 'lodash';
import {connect} from 'react-redux';
import {fetchGameById} from '../../actions';
import MCQquestion from "./MCQquestion";
import OpenEnded from "./OpenEnded";

class TimeLimit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            challenge: this.props.case,
            showGameView: false,
            withTimeLimit: false,
            currentQn:1,
            authid: this.props.authid,
            authname: this.props.authname
        };

        bindAll(this, 'renderTimeLimitContent', 'redirect', 'renderGameContent', 'startGame', 'withTimeLimit', 'withoutTimeLimit');
    }

    componentDidMount() {
        this.props.fetchGameById(this.state.challenge._id);
    }

    redirect(){
        window.location.reload();
    }

    startGame(){
        this.setState({showGameView:true});
    }

    withTimeLimit () {
        this.setState({withTimeLimit: true});
    }

    withoutTimeLimit(){
        this.setState({withTimeLimit: false});
    }

    renderTimeLimitContent(){
        //return this.props.randomCase.title;
        if(!this.state.showGameView){
            let timerBtnBgColor = this.state.timer ? "#82C5D9" : "#CDE0EB";
            let noTimerBtnBgColor = this.state.noTimer ? "#82C5D9" : "#CDE0EB";
            return(
                <div>
                    <h1>{this.state.challenge.title}</h1>
                    <h3>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Aenean euismod bibendum laoreet.
                        Proin gravida dolor sit amet lacus accumsan et viverra justo commodo.
                        Proin sodales pulvinar tempor. Cum sociis natoque
                        (Instructions? Scoring system? + Random: more points）
                    </h3>
                    <br /><br />
                    <Form horizontal>
                        <Col smOffset={4}>
                        <FormGroup controlId="formHorizontalEmail">
                            <Col componentClass={ControlLabel} sm={3}>
                                <h3>Difficulty </h3>
                            </Col>
                            <Col componentClass={ControlLabel} sm={2}>
                                <h3>{this.state.challenge.difficulty}</h3>
                            </Col>
                        </FormGroup>
                        </Col>
                        <Col smOffset={4}>
                            <FormGroup >
                                <Col sm={3}>
                                    <h3>Time Limit </h3>
                                </Col>
                                <Col sm={3} className='pull-left'>
                                    <Button style={{ background: timerBtnBgColor, color: 'black', border: 0, width: '60%' }}
                                            onClick={(e)=> this.withTimeLimit()}>
                                        <h3>Yes</h3>
                                    </Button>
                                </Col>
                                <Col sm={3}>
                                    <Button style={{ background: noTimerBtnBgColor, color: 'black', border: 0, width: '60%' }}
                                            onClick={(e)=> this.withoutTimeLimit()}>
                                        <h3 style={{ border: "50%" }}>No</h3>
                                    </Button>
                                </Col>
                            </FormGroup>
                        </Col>
                        <br /><br />
                        <FormGroup>
                            <Col sm={2} className='pull-left'>
                                <Button bsStyle="primary" bsSize="large" onClick={(e) => this.redirect()}>
                                    <img className="left-picture" hspace = "5" src="./backArrow.png"style={{height:"18px"}} alt=""/>
                                    Find a case
                                </Button>
                            </Col>
                            <Col sm={2} className='pull-right'>
                                <Button bsStyle="primary" bsSize="large" onClick={(e) => this.startGame()}>
                                    Start Challenge
                                    <img className="left-picture" hspace = "5" src="./nextarrow.png"style={{height:"18px"}} alt=""/>
                                </Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </div>
            );
        }else{
            return (
                <div>
                    {this.renderGameContent()}
                </div>
            );
        }


    }


    renderGameContent() {
        switch(this.props.game) {
            case null:
                return;
            default:
                // console.log(this.props.game.questions);
                let timeLimit = this.state.withTimeLimit;
                let currentQn = this.state.currentQn;
                let scenario = this.props.game.scenario;
                let totalQnNum = this.props.game.questions.length;
                let caseTitle = this.props.game.title;
                let questionNodes = this.props.game.questions.map((obj, index) => {
                    //console.log(obj.type);
                    //console.log(totalQnNum);
                    if(obj.id === currentQn+""){
                        if(obj.type === "MCQ"){
                            //console.log(totalQnNum);
                            return <MCQquestion question={obj} scenario={scenario} timeLimit={timeLimit}
                                                totalQnNum={totalQnNum} caseTitle={caseTitle}/>
                        }
                    }else{
                        return (<div>Hello!</div>);
                    }
                });
                return questionNodes;
                //return this.props.game.title;
        }
    }

    render() {
        return (
            <div className="container">

                {this.renderTimeLimitContent()}

            </div> 
        );


    }
}

function mapStateToProps2({game}) {
    return {
        game
    };
}

export default connect(mapStateToProps2, {fetchGameById})(TimeLimit);