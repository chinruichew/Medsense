import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCaseById } from '../../actions';
import { bindAll } from 'lodash';
import dispatch from "redux/es/createStore";

class VettingEditing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            case: null,
            vetId: this.props.vetId,
        };
    }

    componentDidMount() {
        this.props.fetchCaseById(this.state);
    }

    renderContent() {
        switch (this.props.caseById) {
            case null:
                return;
            default:
                return (
                    <div>{this.props.caseById.speciality}</div>
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
