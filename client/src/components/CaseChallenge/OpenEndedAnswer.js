import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { bindAll } from 'lodash';

class OpenEndedAnswer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            authid: this.props.authid,
            authname: this.props.authname
        };

        bindAll(this, 'renderContent', 'renderNextQuestion', 'nextQuestion');
    }

    renderContent(){
        return(
            <div className='container'>
                <h3>You got __ points!</h3><br />
                <h4>
                    <strong>Answer</strong> <br />
                    {this.props.question.openEnded} <br /><br />

                    <strong>PEARL</strong> <br />
                    {this.props.question.pearl} <br /><br />

                    <strong>References</strong> <br />
                    {this.props.question.reference} <br /><br />

                </h4>

            </div>
        );
    }

    renderNextQuestion(){
        if(this.props.question.id===this.props.totalQnNum+""){
            return(
                <div>
                    <Button onClick={(e) => this.complete()} hspace = "20" bsStyle="primary" bsSize="large" className="pull-right">
                        View Score
                    </Button>
                </div>
            );
        } else {
            return (
                <Button onClick={(e) => this.nextQuestion()} hspace="20" bsStyle="primary" bsSize="large"
                        className="pull-right">
                    Next Question
                </Button>
            );
        }
    }

    complete(){

    }

    nextQuestion(){
        this.props.handleNextQuestion(parseFloat(this.props.question.id));
    }

    render() {
        return(
            <div>
                {this.renderContent()}
                {this.renderNextQuestion()}
            </div>
        );
    }
}

export default OpenEndedAnswer;