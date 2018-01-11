import React, { Component } from 'react';
import { connect } from 'react-redux';
import {fetchRandomCase} from '../../actions';

class Temp extends Component {
    componentDidMount() {
        this.props.fetchRandomCase();
    }

    renderRandomCase(){
        switch(this.props.games) {
            case null:
                return;
            default:
                console.log(this.props.games);
                return this.props.games.title;
        }
    }

    render(){

        return (
            <div>
                {this.renderRandomCase()}
            </div>
        );
    }
}

function mapStateToProps({games}) {
    return {
        games
    };
}

export default connect(mapStateToProps, {fetchRandomCase})(Temp);
