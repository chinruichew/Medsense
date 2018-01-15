import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCaseById } from '../../actions';
import VetOne from './VetOne';

class VettingEditing extends Component {
    state = {
        case: null,
        vetId: this.props.vetId,
    };

    componentDidMount() {
        this.props.fetchCaseById(this.state);
    }

    renderContent() {
        switch (this.props.caseById) {
            case null:
                return;
            default:
                return (
                    <div>
                        <VetOne id={this.props.caseById._id}
                            title={this.props.caseById.title}
                            difficulty={this.props.caseById.difficulty}
                            speciality={this.props.caseById.speciality}
                            subspeciality={this.props.caseById.subspeciality}
                            approach={this.props.caseById.approach}
                            scenario={this.props.caseById.scenario}
                            learning={this.props.caseById.learning}
                            timestamp={this.props.caseById.timestamp}
                            questions={this.props.caseById.questions}
                            authorname={this.props.caseById.authorname}
                            authorid={this.props.caseById.authorid}
                        ></VetOne>
                    </div>
                );
        }
    }

    render() {
        return (
            <div>
                {this.renderContent()}
            </div>
        );
    }
}

function mapStateToProps({caseById}) {
    return {
        caseById
    };
}

export default connect(mapStateToProps, { fetchCaseById })(VettingEditing);
