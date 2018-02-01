import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class GameResults extends Component {
    componentDidMount() {
        window.scrollTo(0, 0)
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
                console.log(obj.openEnded);
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

    render() {
        return(
            <div className='container'>
                {this.renderContent()}
                
                {/* {this.renderDiscussionForum()} */}
            </div>
        );
    }
}

export default GameResults;