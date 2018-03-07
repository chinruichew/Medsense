import React, { Component } from 'react';
import { connect } from 'react-redux';
import Main from './Main.js';

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
        authorname:this.props.authorname,
        authorid: this.props.authorid,
    };

    render() {
        return (
            <div>
                <Main
                    id={this.props.id}
                    title={this.props.title}
                    difficulty={this.props.difficulty}
                    speciality={this.props.speciality}
                    subspeciality={this.props.subspeciality}
                    approach={this.props.approach}
                    scenario={this.props.scenario}
                    learning={this.props.learning}
                    timestamp={this.props.timestamp}
                    questions={this.props.questions}
                    authorname={this.props.authorname}
                    authorid={this.props.authorid}/>
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
