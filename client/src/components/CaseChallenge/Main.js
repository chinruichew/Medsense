import React, { Component } from 'react';
import { Button, Table } from 'react-bootstrap';
import { bindAll } from 'lodash';
import FindCase from './FindCase';
import * as ReactGA from "react-ga";


class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showFindTable: false,
            authid: this.props.authid,
            authname: this.props.authname
        };
        //this.chooseFind = this.chooseFind.bind(this);
        bindAll(this, 'chooseFind');
    }

    chooseFind = () => {
        const {showFindTable} = this.state;
        if(!showFindTable){
            this.setState({showFindTable: !showFindTable})
        }
    };

    render() {
        // React GA
        ReactGA.initialize('UA-112382826-1');
        ReactGA.pageview(window.location.pathname + window.location.search);

        return (
            <div className="container">
                <h2>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Aenean euismod bibendum laoreet. 
                    Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. 
                    Proin sodales pulvinar tempor. Cum sociis natoque
                    (Instructions? Scoring system? + Random: more points）
                </h2>
                <Table responsive>
                    <tr align="center">
                        <td><Button onClick={this.chooseRandom} bsStyle="primary" bsSize="large">Try a Random Case</Button></td>
                        <td><Button onClick={this.chooseFind} bsStyle="primary" bsSize="large">Find a Case</Button></td>
                    </tr>
                </Table>
                <br />
                {this.state.showFindTable && <FindCase/>}
            </div>
        );


    }
}

export default Main;