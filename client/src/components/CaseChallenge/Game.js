import React, { Component } from 'react';
import {connect} from 'react-redux';
import {fetchGameById} from '../../actions';

class Game extends Component {
    constructor(props){
        super(props);
        this.state = {
            caseId: this.props.caseId,
        }
    }

    componentDidMount() {
        this.props.fetchGameById(this.state.caseId);
    }

    renderContent() {
        switch(this.props.game) {
            case null:
                return;
            default:
                console.log(this.props.game);
                return this.props.game.title;
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

function mapStateToProps2({game}) {
    return {
        game
    };
}

export default connect(mapStateToProps2, {fetchGameById})(Game);