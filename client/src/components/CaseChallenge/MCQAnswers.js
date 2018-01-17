import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { bindAll } from 'lodash';

class MCQAnswers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            answerCount: 0,
            mcqAnswer: "",
            authid: this.props.authid,
            authname: this.props.authname
        };

        bindAll(this, 'renderContent', 'getMCQAnswer', 'renderNextQuestion', 'nextQuestion');
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

        answer = answer.substring(0, answer.length - 2);
        this.setState({answerCount: answerCount, mcqAnswer: answer});
        
    }

    renderContent(){
        return(
            <div className='container'>
                <h3>You got __ / {this.state.answerCount} correct!</h3><br />
                <h4> 
                    <strong>Answer</strong> <br />
                    {this.state.mcqAnswer} <br /><br /><br />

                    <strong>PEARL</strong> <br />
                    {this.props.question.pearl} <br /><br /><br />

                    <strong>References</strong> <br />
                    {this.props.question.reference} <br /><br />

                </h4> 

            </div> 
        );
    }

    renderNextQuestion(){ 
        return(
            <Button onClick={(e) => this.nextQuestion()} hspace = "20" bsStyle="primary" bsSize="large" className="pull-right">
                Next Question
            </Button>
        );
    }

    nextQuestion(){
        this.props.handleNextQuestion(parseFloat(this.props.question.id));
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

export default MCQAnswers;