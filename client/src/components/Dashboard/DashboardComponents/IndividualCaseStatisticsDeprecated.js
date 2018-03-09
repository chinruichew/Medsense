import React, {Component} from 'react';
import ReactHtmlParser from 'react-html-parser';

class IndividualCaseStatistics extends Component {
    state = {
        answers: this.props.answers,
        caseStatsDisplay: '',
        scorePercentage: 0
    };

    changeCase = (e) => {
        const answerId = e.target.value;
        const answers = this.state.answers;
        for(let i = 0; i < answers.length; i++) {
            const answer = answers[i];
            if(answer._id === answerId) {
                let totalScore = 0;
                let totalMark = 0;
                const questions = answer.case.questions;
                const caseStatsDisplay = questions.map((question, index) => {
                    let answers = '';
                    if(question.type === this.props.constants.QUESTION_TYPE_OPEN_ENDED) {
                        answers = ReactHtmlParser(question.openEnded);
                    } else if(question.type === this.props.constants.QUESTION_TYPE_MCQ) {
                        for(let i = 1; i <= 6; i++) {
                            if(question['check' + i]) {
                                answers = question['mcq' + i] + '\n';
                            }
                        }
                    }
                    let modelAnswers = '';
                    for(let i = 0; i < questions.length; i++) {
                        const realQuestion = questions[i];
                        if(realQuestion.question === question.question) {
                            if(realQuestion.type === this.props.constants.QUESTION_TYPE_OPEN_ENDED) {
                                modelAnswers = ReactHtmlParser(realQuestion.openEnded);
                            } else if(realQuestion.type === this.props.constants.QUESTION_TYPE_MCQ) {
                                for(let i = 1; i <= 6; i++) {
                                    if(realQuestion['check' + i]) {
                                        modelAnswers = realQuestion['mcq' + i] + '\n';
                                    }
                                }
                            }
                            break;
                        }
                    }
                    totalScore += parseInt(question.score,10);
                    totalMark += parseInt(question.mark,10);
                    let timeTaken = 'NIL';
                    if(question.timeTaken !== 0) {
                        timeTaken = question.timeTaken + ' seconds';
                    }
                    return(
                        <ul key={index}>
                            <li>{index + 1}</li>
                            <li>{ReactHtmlParser(question.question)}</li>
                            <li>{answers}</li>
                            <li>{modelAnswers}</li>
                            <li>{question.score + ' / ' + question.mark}</li>
                            <li>{timeTaken}</li>
                        </ul>
                    );
                });
                this.setState({caseStatsDisplay: caseStatsDisplay, scorePercentage: Math.round(totalScore/totalMark*100)});
                break;
            }
        }
    };

    renderContent = () => {
        return(
            <div>
                {this.state.caseStatsDisplay}
            </div>
        );
    };

    render() {
        return(
            <div>
                {this.renderContent()}
            </div>
        );
    }
}

export default IndividualCaseStatistics;