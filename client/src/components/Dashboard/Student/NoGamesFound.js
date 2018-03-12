import React, {Component} from 'react';
import {Button, Row} from "react-bootstrap";
import {Redirect} from "react-router-dom";

class NoGamesFound extends Component {
    state = {
        redirectToGame: false
    };

    redirectToGame = () => {
        this.setState({redirectToGame: true});
    };

    renderContent = () => {
        switch(this.state.redirectToGame) {
            case false:
                return(
                    <div className="container-fluid">
                        <Row>
                            <div className="col-md-12 text-center">
                                <h1>Unfortunately, it seems that you have not attempted any games yet!</h1>
                                <h2>We cannot analyse your scores and ability without that :/</h2>
                                <h2>Head on to the Game section to play some games: <Button type="button" bsStyle="primary" onClick={(e) => this.redirectToGame()}>Play Game</Button></h2>
                            </div>
                        </Row>
                    </div>
                );
            default:
                return(
                    <Redirect to="/game" />
                );
        }
    };

    render() {
        return(
            <div>
                {this.renderContent()}
            </div>
        );
    }
}

export default NoGamesFound;