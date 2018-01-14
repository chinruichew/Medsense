import React, { Component } from 'react';
import { Form, FormGroup, ControlLabel, Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

class TimeLimit extends Component {


    renderDifficulty(){ 
        return(
            <FormGroup controlId="formHorizontalEmail">
                <Col componentClass={ControlLabel} sm={4}>
                    <h3>Difficulty </h3>
                </Col>
                <Col componentClass={ControlLabel} sm={4}>
                    <h3>Beginner</h3>
                </Col>
            </FormGroup>
        );
    }

    renderTimeLimit(){ 
        return(
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
        );

    }

    renderPageNav(){
        return(
            <FormGroup>
                <Col sm={2} className='pull-left'>
                <Button onClick={this.chooseRandom} bsStyle="primary" bsSize="large" >
                    <img className="left-picture" hspace = "5" src="./backArrow.png"style={{height:"18px"}} alt=""/>
                    Find a case
                </Button>
                </Col>
                <Col sm={2} className='pull-right'>
                <Button onClick={this.chooseRandom} bsStyle="primary" bsSize="large" >
                    Start Challenge
                    <img className="left-picture" hspace = "5" src="./nextarrow.png"style={{height:"18px"}} alt=""/>
                </Button>
                </Col>
            </FormGroup>
        );
    }

    

    renderForm(){
        return(
            <Form horizontal>
                {this.renderDifficulty()}<br />
                {this.renderTimeLimit()} 
                <br /><br />
                {this.renderPageNav()}
            </Form>

        );
    }

    render() {
        return (
            <div className="container">
                <h1>Insert case title here</h1>
                <h3>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Aenean euismod bibendum laoreet. 
                    Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. 
                    Proin sodales pulvinar tempor. Cum sociis natoque
                    (Instructions? Scoring system? + Random: more points）
                </h3>
                <br /><br />
                {this.renderForm()}

            </div> 
        );


    }
}

export default TimeLimit;