import React, { Component } from 'react';
import {connect} from 'react-redux';
import {fetchCaseById} from '../../actions';
import { bindAll } from 'lodash';
import dispatch from "redux/es/createStore";

class VettingEditing extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    renderContent() {
        switch(this.props.cases) {
            case null:
                return;
            default:
                return(
                    <div>Hi</div>
                );
        }
    }

    render() {
        return(
            <div>
                {this.renderContent()}
            </div>
        );
    }
}

export default VettingEditing;

/*
function mapStateToProps3({caseById}) {
    return {
        caseById
    };
}

export default connect(mapStateToProps3, {fetchCaseById})(VettingEditing);
*/