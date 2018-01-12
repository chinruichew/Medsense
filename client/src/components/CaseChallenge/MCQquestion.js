import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, FormControl, FormGroup, ControlLabel, HelpBlock, Table, Col, Thumbnail } from 'react-bootstrap';
import { Checkbox, Button, InputGroup, Row } from 'react-bootstrap';
import { bindAll } from 'lodash';
import Answers from './Answers';
import ReactCountdownClock from 'react-countdown-clock';
import { Line } from 'rc-progress';
import Countdown from 'react-cntdwn';

class MCQquestion extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showAnswers: false,
            showNextButton: true,
            stopTimer: false, 
            authid: this.props.authid,
            authname: this.props.authname,
        };
        //this.chooseFind = this.chooseFind.bind(this);
        bindAll(this, 'selectDone');
    }

    selectDone = () => {
        const {showAnswers} = this.state;
        const {showNextButton} = this.state;
        const {stopTimer} = this.state
        if(!showAnswers){
            this.setState({showAnswers: !showAnswers})
            this.setState({showNextButton: !showNextButton})
            this.setState({stopTimer: !stopTimer})
        }
    }

    
    
    renderTimer(duration){ 
        return( 
            <div className='pull-right'>
                <Countdown
                    targetDate={new Date('August 29, 1997')}
                    startDelay={2000}
                    interval={1000}
                    timeSeparator={':'}
                    leadingZero
                    onFinished={(e) => this.selectDone()} 
                />
                {/* <Table> 
                    <tr> <td align="left"> 
                        <h4>Time Left: </h4>
                    </td></tr>
                    <tr> <td align="left"> 
                    <ReactCountdownClock seconds={time}
                    timeFormat = "hms"
                    color="#000"
                    alpha={0.9}
                    size={80}
                    weight={6}
                    onComplete={(e) => this.selectDone()} 
                    paused = {this.state.stopTimer} 
                />
                    </td></tr>
                </Table> */}
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
                        <Col sm={3} className='pull-right'>{this.renderTimer(65)}</Col>
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
                    You have informed your registrar whom instructed you to order an urgent CT brain. 
                    Which of the following will be the most important initial investigation?
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