import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { bindAll } from 'lodash';

class Answers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            answerCount: 0,
            answer: "",
            authid: this.props.authid,
            authname: this.props.authname
        };

        bindAll(this, 'renderContent', 'getMCQAnswer', 'renderNextQuestion');
    }

    componentDidMount(){
        this.getMCQAnswer();
    }

    getMCQAnswer(){
        let answer = "";
        let answerCount = 0;
        if(this.props.question.check1){
            answer += this.props.question.mcq1 + ", ";
            answerCount += 1;
        }

        if(this.props.question.check2){
            answer += this.props.question.mcq2 + ", ";
            answerCount += 1;
        }

        if(this.props.question.check3){
            answer += this.props.question.mcq3 + ", ";
            answerCount += 1;
        }

        if(this.props.question.check4){
            answer += this.props.question.mcq4 + ", ";
            answerCount += 1;
        }

        if(this.props.question.check5){
            answer += this.props.question.mcq5 + ", ";
            answerCount += 1;
        }

        if(this.props.question.check6){
            answer += this.props.question.mcq6 + ", ";
            answerCount += 1;
        }

        this.setState({answerCount: answerCount, answer: answer.slice(0, -1)});
        
    }

    renderContent(){
        return(
            <div className='container'>
                <h3>You got __ / {this.state.answerCount} correct!</h3>
                <h4> 
                    Answer <br /> 
                    {this.state.answer} <br /><br /><br />

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