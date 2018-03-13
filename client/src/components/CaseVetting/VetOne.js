import React, { Component } from 'react';
import { connect } from 'react-redux';
import Main from '../CaseUpload/Main.js';

class VetOne extends Component {
    state = {
        id: this.props.id,
        title: this.props.title,
        difficulty: this.props.difficulty,
        speciality: this.props.speciality,
        subspeciality: this.props.subspeciality,
        approach: this.props.approach,
        scenario: this.props.scenario,
        learning: this.props.learning,
        timestamp: this.props.timestamp,
        questions: this.props.questions,
    };

    render() {
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
                    questions={this.props.questions}/>
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
