import React, { Component } from 'react';
import {BarChart, XAxis, YAxis, Tooltip, Bar} from 'recharts';
import axios from 'axios';

class AdminGameStatistics extends Component {
    state = {
        specialityList: null,
        answers: null
    };

    componentDidMount() {
        axios.post('/api/fetchSpeciality').then(res => {
            this.setState({
                specialityList: res.data
            })
        }).catch(err => {
            console.log(err);
        });

        axios.get('/api/fetchAnswers').then(res => {
            this.setState({
                answers: res.data
            })
        }).catch(err => {
            console.log(err);
        });
    }

    renderGameSpecialityChart = () => {
        switch(this.state.specialityList) {
            case null:
                return;
            default:
                switch(this.state.answers) {
                    case null:
                        return;
                    default:
                        const answerSpecialityMap = [];
                        for(let i = 0; i < this.state.answers.length; i++) {
                            const answer = this.state.answers[i];
                            const answerCase = answer.case;
                            let toAdd = true;
                            for(let j = 0; j < answerSpecialityMap.length; j++) {
                                const answerSpecialityMapObject = answerSpecialityMap[j];
                                if(answerSpecialityMapObject.speciality === answerCase.speciality) {
                                    answerSpecialityMapObject.totalScore += answer.score;
                                    answerSpecialityMapObject.numAttempts++;
                                    toAdd = false;
                                    break;
                                }
                            }
                            if(toAdd) {
                                answerSpecialityMap.push({
                                    speciality: answerCase.speciality,
                                    totalScore: answer.score,
                                    numAttempts: 1
                                });
                            }
                        }

                        const xAxisData = [];
                        for(let i = 0; i < answerSpecialityMap.length; i++) {
                            const answerSpecialityMapObject = answerSpecialityMap[i];
                            xAxisData.push({name: answerSpecialityMapObject.speciality, count: answerSpecialityMapObject.numAttempts});
                        }

                        return(
                            <BarChart width={700} height={250} data={xAxisData}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="count" fill="#ffada3" />
                            </BarChart>
                        );
                }
        }
    };

    render() {
        return(
            <div className="game-stats">
                <div className="col-md-12">
                    <h2 align="center"><strong>Game Statistics</strong></h2>
                    <br/>
                </div>
                <div className="col-md-12 text-center">
                    <h3>Number of Game Plays per Speciality</h3>
                </div>
                <div className="col-md-offset-3 col-md-4">
                    <br/>
                    {this.renderGameSpecialityChart()}
                </div>
            </div>
        );
    }
}

export default AdminGameStatistics;