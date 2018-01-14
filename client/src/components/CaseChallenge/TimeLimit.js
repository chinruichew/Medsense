import React, { Component } from 'react';
import { Form, FormGroup, ControlLabel, Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { bindAll } from 'lodash';

class TimeLimit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            game: this.props.case,
            authid: this.props.authid,
            authname: this.props.authname
        };

        bindAll(this, 'renderTimeLimitContent', 'redirect');
    }

    redirect(){
        window.location.reload();
    }

    renderTimeLimitContent(){
        //return this.props.randomCase.title;
        return(
            <div>
                <h1>{this.state.game.title}</h1>
                <h3>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Aenean euismod bibendum laoreet.
                    Proin gravida dolor sit amet lacus accumsan et viverra justo commodo.
                    Proin sodales pulvinar tempor. Cum sociis natoque
                    (Instructions? Scoring system? + Random: more points）
                </h3>
                <br /><br />
                <Form horizontal>
                    <FormGroup controlId="formHorizontalEmail">
                        <Col componentClass={ControlLabel} sm={4}>
                            <h3>Difficulty </h3>
                        </Col>
                        <Col componentClass={ControlLabel} sm={4}>
                            <h3>{this.state.game.difficulty}</h3>
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="formHorizontalEmail">
                        <Col componentClass={ControlLabel} sm={4}>
                            <h3>Time Limit </h3>
                        </Col>
                        <Col componentClass={ControlLabel} sm={2}>
                            <h3>Yes </h3>
                        </Col>
                        <Col componentClass={ControlLabel} sm={2}>
                            <h3>No </h3>
                        </Col>
                    </FormGroup>
                    <br /><br />
                    <FormGroup>
                        <Col sm={2} className='pull-left'>
                            <Button bsStyle="primary" bsSize="large" onClick={(e) => this.redirect()}>
                                <img className="left-picture" hspace = "5" src="./backArrow.png"style={{height:"18px"}} alt=""/>
                                Find a case
                            </Button>
                        </Col>
                        <Col sm={2} className='pull-right'>
                            <Button bsStyle="primary" bsSize="large" >
                                Start Challenge
                                <img className="left-picture" hspace = "5" src="./nextarrow.png"style={{height:"18px"}} alt=""/>
                            </Button>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        );

    }




    render() {
        return (
            <div className="container">

                {this.renderTimeLimitContent()}

            </div> 
        );


    }
}

export default TimeLimit;