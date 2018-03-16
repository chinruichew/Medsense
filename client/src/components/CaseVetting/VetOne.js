import React, { Component } from 'react';
import { connect } from 'react-redux';
import Main from '../CaseUpload/Main.js';

class VetOne extends Component {
    render() {
        const questions = this.props.questions;
        for(let i = 0; i < questions.length; i++) {
            const question = questions[i];
            question.optionData = question.options;
        }
        return (
            <div>
                <Main
                    process={"vet"}
                    id={this.props.id}
                    title={this.props.title}
                    difficulty={this.props.difficulty}
                    speciality={this.props.speciality}
                    subspeciality={this.props.subspeciality}
                    approach={this.props.approach}
                    scenario={this.props.scenario}
                    learning={this.props.learning}
                    timestamp={this.props.timestamp}
                    questions={questions}
                />
            </div>
        );
    }
}

function mapStateToProps({caseById}) {
    return {
        caseById
    };
}

export default connect(mapStateToProps, {})(VetOne);
