import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCaseById } from '../../actions';
import { bindAll } from 'lodash';
import dispatch from "redux/es/createStore";

class VetOne extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            title: this.props.title,
            difficulty: this.props.difficulty,
            speciality: this.props.speciality,
            subspecialit: this.props.subspeciality,
            approach: this.props.approach,
            scenario: this.props.scenario,
            learning: this.props.learning,
            timestamp: this.props.timestamp,
            questions: this.props.questions
        };
    }

    componentDidMount() {
        console.log(this.state.questions)
    }

    render() {
        return (
            <div>
                {this.state.id}
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
