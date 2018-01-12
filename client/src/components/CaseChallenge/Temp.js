import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRandomCase } from '../../actions';
import { Form, FormGroup, Col, Button } from 'react-bootstrap';
import { bindAll } from 'lodash';

class Temp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timer: false,
            noTimer: false,
        };
        
        bindAll(this, 'withTimeLimit', 'withoutTimeLimit');
    }

    componentDidMount() {
        this.props.fetchRandomCase();
    }

    withTimeLimit () {
        if(!this.state.timer){
            this.setState({timer: !this.state.timer});
            this.setState({noTimer: false});
        }
    }

    withoutTimeLimit(){
        if(!this.state.noTimer){
            this.setState({noTimer: !this.state.noTimer});
            this.setState({timer: false});
        }
    }

    redirectToChallengeMain(){
        window.location = 'case_challenge';
    }


    renderRandomCase() {
        switch (this.props.games) {
            case null:
                return;
            default:
                //console.log(this.props.games);
                let timerBtnBgColor = this.state.timer ? "#82C5D9" : "#CDE0EB";
                let noTimerBtnBgColor = this.state.noTimer ? "#82C5D9" : "#CDE0EB";
                return (
                    <div className="container">
                        <h1>{this.props.games.title}</h1>
                        <h3>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Aenean euismod bibendum laoreet.
                            Proin gravida dolor sit amet lacus accumsan et viverra justo commodo.
                            Proin sodales pulvinar tempor. Cum sociis natoque
                            (Instructions? Scoring system? + Random: more points）
                        </h3>
                        <br />
                        <Form horizontal >
                            <Col smOffset={4}>
                                <FormGroup controlId="formHorizontalEmail">
                                    <Col sm={3}>
                                        <h3>Difficulty</h3>
                                    </Col>
                                    <Col sm={2}>
                                        <h3>{this.props.games.difficulty}</h3>
                                    </Col>
                                </FormGroup>
                            </Col>
                            <br />
                            <Col smOffset={4}>
                                <FormGroup >
                                    <Col sm={3}>
                                        <h3>Time Limit </h3>
                                    </Col>
                                    <Col sm={3} className='pull-left'>
                                        <Button style={{ background: timerBtnBgColor, color: 'black', border: 0, width: '60%' }}
                                            onClick={(e)=> this.withTimeLimit()}>
                                            <h3>Yes</h3>
                                        </Button>
                                    </Col>
                                    <Col sm={3}>
                                        <Button style={{ background: noTimerBtnBgColor, color: 'black', border: 0, width: '60%' }}
                                            onClick={(e)=> this.withoutTimeLimit()}>
                                            <h3 style={{ border: "50%" }}>No</h3>
                                        </Button>
                                    </Col>
                                </FormGroup>
                            </Col>
                            <br /><br />
                            <FormGroup>
                                <Col sm={2} className='pull-left'>
                                    <Button onClick={(e)=>this.redirectToChallengeMain()} bsStyle="primary" bsSize="large" >
                                        <img className="left-picture" hspace="5" src="./backArrow.png" style={{ height: "18px" }} />
                                        Find a case
                                    </Button>
                                </Col>
                                <Col sm={2} className='pull-right'>
                                    <Button  bsStyle="primary" bsSize="large" >
                                        Start Challenge
                                        <img className="left-picture" hspace="5" src="./nextarrow.png" style={{ height: "18px" }} />
                                    </Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </div>
                );
        }
    }

    render() {

        return (
            <div>
                {this.renderRandomCase()}
            </div>
        );
    }
}

function mapStateToProps({ games }) {
    return {
        games
    };
}

export default connect(mapStateToProps, { fetchRandomCase })(Temp);
