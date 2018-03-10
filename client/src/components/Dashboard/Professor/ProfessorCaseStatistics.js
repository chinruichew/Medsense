import React, {Component} from 'react';
import {Table} from "react-bootstrap";

class ProfessorCaseStatistics extends Component {
    render() {
        console.log(this.props.answers);
        const answers = this.props.answers;
        const cases = this.props.cases.map(statCase => {
            let totalScore = 0;
            let numAnswers = 0;
            let totalTime = 0;
            for(let i = 0; i < answers.length; i++) {
                const answer = answers[i];
                if(answer.case._id === statCase._id) {
                    totalScore += answer.score;
                    numAnswers++;
                    const mcqAnswers = answer.mcqAnswers;
                    for(let j = 0; j < mcqAnswers.length; j++) {
                        const mcqAnswer = mcqAnswers[j];
                        totalTime += (mcqAnswer.questionEnd - mcqAnswer.questionStart);
                    }
                    const openEndedAnswers = answer.openEndedAnswers;
                    for(let j = 0; j < openEndedAnswers.length; j++) {
                        const openEndedAnswers = openEndedAnswers[j];
                        totalTime += (openEndedAnswers.questionEnd - openEndedAnswers.questionStart);
                    }
                }
            }
            return(
                <tr align="center">
                    <td>{statCase.title}</td>
                    <td>{totalScore/numAnswers}</td>
                    <td>{totalTime}</td>
                </tr>
            );
        });
        return(
            <div className="col-md-12">
                <h2>Case Statistics</h2>
                <Table responsive>
                    <thead >
                        <tr style={{background: '#82C5D9', fontSize:'130%'}}>
                            <th><center>Case Title</center></th>
                            <th><center>Average Score</center></th>
                            <th><center>Average Time Spent</center></th>
                        </tr>
                    </thead>
                    <tbody>
                        {cases}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default ProfessorCaseStatistics;