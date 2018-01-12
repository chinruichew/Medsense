import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Table, Panel } from 'react-bootstrap';
import { bindAll } from 'lodash';
import FindCase from './FindCase';


class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            findBtnBackground: false,
            randomBtnBackground: false,
            showFindTable: false,
            authid: this.props.authid,
            authname: this.props.authname
        };

        bindAll(this, 'chooseFind', 'redirect');
    }

    chooseFind () {
        if(!this.state.showFindTable){
            this.setState({showFindTable: !this.state.showFindTable})
        }

        if(!this.state.findBtnBackground){
            this.setState({findBtnBackground: !this.state.findBtnBackground})
        }
    }

    redirect(){
        window.location = 'test';
    }

    render() {
        let findBtnBgColor = this.state.findBtnBackground ?  "#82C5D9": "#CDE0EB";
        let randomBtnBgColor = this.state.randomBtnBackground ?  "#82C5D9": "#CDE0EB";
        return (
            <div className='container'>
                <h2>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Aenean euismod bibendum laoreet. 
                    Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. 
                    Proin sodales pulvinar tempor. Cum sociis natoque
                    (Instructions? Scoring system? + Random: more points）
                </h2>
                <br />
                <br />
                <Table responsive>
                    <tr align="center">
                        <td style={{width: "50%"}}>
                            <Button style={{background: randomBtnBgColor, fontSize: "200%", color: 'black', border: 0}} 
                                onClick={(e)=> this.redirect()}bsSize="large">
                                    Try a Random Case
                            </Button>
                        </td>
                        <td>
                            <Button style={{background: findBtnBgColor, fontSize: "200%", color: 'black', border: 0}}
                                onClick={(e)=> this.chooseFind ()} bsSize="large">
                                Find a Case       
                            </Button>
                        </td>
                        <td>       </td>
                    </tr>
                </Table>
                <br />
                {this.state.showFindTable && <FindCase/>}
            </div>
        );


    }
}

export default Main;