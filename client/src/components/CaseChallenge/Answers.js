import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class Answers extends Component {

    renderContent(){
        return(
            <div className='container'> 
                <h4> 
                    Answer <br /> 
                    Hypercount <br /><br /><br />

                    PEARL <br /> 
                    This is the type of question that frustrates people in the exams. Most people 
                    will argue what does this test, most of us will do all if not most of the above 
                    test anyway. Unfortunately, YLL likes to set such questions. PT-INR is a commonly
                    selected option as people believe that its important in determination of 
                    thrombolysis. However, do realize that exclusion of mimics given that she is a 
                    diabetic patient is most important before considering treatment of stroke. Moreover, 
                    it’s unlikely although not impossible that INR is more than 1.7, if patient has truly 
                    stopped taking warfarin for 5 days. FBC usually done to look at Hb and platelet levels
                    before starting thrombolysis. <br /><br /><br />

                    References <br /> 
                    American Psychological Association. (n.d.). Recovering emotionally from disaster.<br />
                    Retrieved from http://www.apa.org/helpcenter/recovering-disasters.aspx <br /><br />

                </h4> 

            </div> 
        );
    }

    renderNextQuestion(){ 
        return(
            <Button onClick={this.selectDone} hspace = "20" bsStyle="primary" bsSize="large" className="pull-right">
                Next Question
            </Button>
        );
    }

    render() {
        return(
            <div>
                {this.renderContent()}
                <br /><br />
                {this.renderNextQuestion()}
            </div>
        );
    }
}

export default Answers;