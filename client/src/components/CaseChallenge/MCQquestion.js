import React, { Component } from 'react';
import { Form, FormGroup, Table, Col } from 'react-bootstrap';
import { Checkbox, Button, Row } from 'react-bootstrap';
import { bindAll } from 'lodash';
import Answers from './Answers';
import { Line } from 'rc-progress';

class MCQquestion extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showAnswers: false,
            showNextButton: true,
            authid: this.props.authid,
            authname: this.props.authname,
            time: {}, 
            seconds: 5
        };
        this.timer = 0;
        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
        //this.chooseFind = this.chooseFind.bind(this);
        bindAll(this, 'selectDone');
    }

    startTimer() {
        if (this.timer == 0) {
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
        if (seconds == 0) {
            clearInterval(this.timer);
            {this.selectDone()}
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

    selectDone = () => {
        const {showAnswers} = this.state;
        const {showNextButton} = this.state;
        if(!showAnswers){
            this.setState({showAnswers: !showAnswers})
            this.setState({showNextButton: !showNextButton})
            {this.pauseTimer()}
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
                    <Button onClick={this.selectDone} hspace = "20" bsStyle="primary" bsSize="large" className="pull-right">
                        Done
                    </Button>
                </div> 
            );
        }
    }

    renderProgressBar(progress){ 
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
            <Col sm={2} align="left"><h4> 5/10 Questions</h4> </Col>
            </div>
        );
    }

    renderContent(){ 
        return(
            <div className='container' align="justify">
                <h1>
                    <Row>
                        <Col sm={3}>Bloody Episode </Col>
                        {this.renderProgressBar(50)}
                    </Row>
                </h1> 

                <br />
                
                <h3> 
                    <Row> 
                        
                        <Col sm={3}>Question 5  </Col>
                        <Col sm={5} className='pull-right'>{this.renderTimer(0.2)}</Col>
                    </Row> 
                </h3> 

                <br />

                <h4> 
                    71-year-old lady elective admission to the orthopedic service for elective 
                    TKR coming morning. You are the house-officer on call and was called by the 
                    nurse to review patient has she appears to have sudden onset right sided weakness. 
                    Patient is sleepy but arousable with right hemiparesis. She said she woke up 
                    with the weakness and nurses confirm that patient well 2 hours ago before her nap.<br /><br />

                    Background history include hypertension, hyperlipidemia, diabetes, atrial 
                    fibrillation and previous history of NSTEMI 10 years ago. She is taking 
                    perindopril, bisoprolol, glipizide and warfarin. She stopped warfarin 5 days ago. <br /><br />

                    On examination patient had right upper motor seven nerve palsy and right sided 
                    weakness with a power of 2/5 in both upper and lower limbs.
                </h4>

                <br />

                <h4> 
                    You performed a stat hypocount which showed a serum glucose of 4.1. 
                    And sent off FBC, PTINR and performed an ECG.
                    <br />
                    The following was the CT brain of the patient:
                </h4> 

                <br />

                <form> <h4> 
                    <FormGroup>
                        <div class="col-md-10 col-md-offset-3"> 
                            <Table responsive> 
                                <tr > 
                                    <td data-align= 'left'> <Checkbox >PT-INR</Checkbox>  </td>
                                    <td> <Checkbox >Hypocount</Checkbox> </td>
                                </tr> 

                                <tr> 
                                    <td data-align= 'left'> <Checkbox >FBC</Checkbox>  </td>
                                    <td> <Checkbox >ECG</Checkbox> </td>
                                </tr> 

                                <tr> 
                                    <td> <Checkbox >CXR</Checkbox>  </td>
                                </tr> 
                            </Table> 
                        </div>

                        <br /><br /><br />

                        {this.renderShowNextButton()}
                    </FormGroup>
                  </h4>
                </form> 

                
                {this.state.showAnswers && <Answers/>}

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

export default MCQquestion;