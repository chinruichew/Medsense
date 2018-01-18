import React, { Component } from 'react';
import { Form, FormGroup, Table, Col } from 'react-bootstrap';
import { Checkbox, Button, Row } from 'react-bootstrap';
import { Line } from 'rc-progress';
import { bindAll } from 'lodash';

import MCQAnswers from './MCQAnswers';

class MCQquestion extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showAnswers: false,
            showNextButton: true,
            authid: this.props.authid,
            authname: this.props.authname,
            time: {}, 
            seconds: parseFloat(this.props.question.time) * 60,
        };
        this.timer = 0;
        bindAll(this, 'selectDone', 'startTimer', 'countDown', 'secondsToTime', 'pauseTimer', 'renderTimer',
            'renderShowNextButton', 'renderProgressBar', 'renderScenario', 'renderMCQ3', 'renderMCQ4', 'renderMCQ5',
            'renderMCQ6', 'renderContent', 'handleNextQuestion');
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
        const {showAnswers} = this.state;
        const {showNextButton} = this.state;
        if(!showAnswers){
            this.setState({showAnswers: !showAnswers});
            this.setState({showNextButton: !showNextButton});
            this.pauseTimer()
        }
    }

    renderTimer(duration){
        return(
            <div className='pull-right'>
                {this.startTimer()}
                Time Remaining: {this.state.time.m} mins {this.state.time.s} secs
            </div>
        );
    }

    renderShowNextButton(){
        const {showNextButton} = this.state;
        if(showNextButton){
            return(
                <div>
                    <Button onClick={(e) => this.selectDone()} hspace = "20" bsStyle="primary" bsSize="large" className="pull-right">
                        Done
                    </Button>
                </div>
            );
        }
    }

    renderProgressBar(){
        let progress = parseFloat(this.props.question.id)/parseFloat(this.props.totalQnNum)* 100;
        console.log(progress)
        return(
            <div >
            <Col sm={6} align="center">
                <Line
                    percent= {progress}
                    strokeWidth="3"
                    trailWidth = "3"
                    strokeColor="#3FC7FA"
                />
            </Col>
            <Col sm={2} align="left"><h4> {this.props.question.id}/{this.props.totalQnNum} Questions</h4> </Col>
            </div>
        );
    }

    renderScenario(){
        if(this.props.question.id === 1){
            return this.props.scenario;
        }else{
            return this.props.question.stem;
        }
    }

    renderMCQ3(){
        if(this.props.question.mcq3.length !== 0){
            return(
                <tr >
                    <td data-align= 'left'> <Checkbox >{this.props.question.mcq3}</Checkbox>  </td>
                </tr>
            );
        }
    }

    renderMCQ4(){
        if(this.props.question.mcq4.length !== 0){
            return(
                <tr >
                    <td data-align= 'left'> <Checkbox >{this.props.question.mcq4}</Checkbox>  </td>
                </tr>
            );
        }
    }

    renderMCQ5(){
        if(this.props.question.mcq5.length !== 0){
            return(
                <tr >
                    <td data-align= 'left'> <Checkbox >{this.props.question.mcq5}</Checkbox>  </td>
                </tr>
            );
        }
    }

    renderMCQ6(){
        if(this.props.question.mcq6.length !== 0){
            return(
                <tr >
                    <td data-align= 'left'> <Checkbox >{this.props.question.mcq6}</Checkbox>  </td>
                </tr>
            );
        }
    }

    handleNextQuestion(prevQn){
        this.props.handleNextQuestion(prevQn);
    }

    renderContent(){

        return(
            <div className='container' align="justify">
                <h1>
                    <Row>
                        <Col sm={3}> {this.props.caseTitle} </Col>
                        {this.renderProgressBar()}
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

                <h4>
                    {this.renderScenario()}
                </h4>

                <br />

                <h4>
                    {this.props.question.question}
                </h4>

                <br />

                <form> <h4>
                    <FormGroup>
                        <div class="col-md-10 col-md-offset-3">
                            <Table responsive>
                                <tr >
                                    <td data-align= 'left'> <Checkbox >{this.props.question.mcq1}</Checkbox>  </td>
                                </tr>
                                <tr >
                                    <td data-align= 'left'> <Checkbox >{this.props.question.mcq2}</Checkbox>  </td>
                                </tr>
                                {this.renderMCQ3()}
                                {this.renderMCQ4()}
                                {this.renderMCQ5()}
                                {this.renderMCQ6()}

                            </Table>
                        </div>

                        <br /><br /><br />

                        {this.renderShowNextButton()}
                    </FormGroup>
                  </h4>
                </form>


                {this.state.showAnswers && <MCQAnswers question={this.props.question} handleNextQuestion={this.handleNextQuestion}/>}

            </div>
        );
    }

    render() {
        console.log(this.props.question);
        return (
            <Form horizontal>
                {this.renderContent()}  
            </Form> 
        );
    }
}

export default MCQquestion;