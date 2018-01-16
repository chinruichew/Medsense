import React, { Component } from 'react';
import { Form, FormControl, FormGroup, Col } from 'react-bootstrap';
import { Button, Row } from 'react-bootstrap';
import { bindAll } from 'lodash';
import Answers from './MCQAnswers';
import { Line } from 'rc-progress';
import ImageMagnifier from './ImageMagnifier';
 

class OpenEnded extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showAnswers: false,
            showNextButton: true,
            authid: this.props.authid,
            authname: this.props.authname,
            time: {}, 
            seconds: 30
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
            <Col sm={2} align="left"><h4> 10/10 Questions</h4> </Col>
            </div>
        );
    }

    renderPicture(){ 

    }

    renderContent(){ 
        return(
            <div className='container' align="justify">
                <h1>
                    <Row>
                        <Col sm={3}>Bloody Episode </Col>
                        {this.renderProgressBar(100)}
                    </Row>
                </h1> 

                <br />
                
                <h3> 
                    <Row> 
                        
                        <Col sm={3}>Question 10  </Col>
                        <Col sm={5} className='pull-right'>{this.renderTimer(0.2)}</Col>
                    </Row> 
                </h3> 

                <br />

                <h4> 
                Mr Tan was diagnosed with Stage 3 Colorectal CA.  <br /> <br />
                Colonoscopy showed the following: 
                </h4>

                <br />

                <h4> 
                    You have informed your registrar whom instructed you to order an urgent CT brain. 
                    Which of the following will be the most important initial investigation?
                </h4> 
                    <Row>
                    <div class="col-md-3 col-md-offset-4" >{<ImageMagnifier/>} </div>
                    </Row>
                    <Row>
                    <div class="col-md-3 col-md-offset-4"  align="center">
                        <h5>
                            Mouse over image to zoom
                        </h5>
                    </div>
                    </Row>
                    
                <br />

                
                    <form> 
                    <h4> 
                        What is the abnormality in this CT-brain?
                        
                        <div > 
                        <FormGroup controlId="formControlsOpenEnded">
                            
                            <FormControl componentClass="textarea" style={{height: '600px'}} placeholder="Enter your answer" />
                        </FormGroup>
                        </div>

                            

                        {this.renderShowNextButton()}
                        
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

export default OpenEnded;