import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Collapse } from 'react-bootstrap';
import { bindAll } from 'lodash';
import Question from './Question.js'
import Overview from './Overview.js'

class Main extends React.Component{
    constructor(props){
        super(props);
        this.state={
            qID:1,
            valid:false,
            qnList:[],
        };
        bindAll(this, 'addQuestion');
    }

    addQuestion(){
        this.setState({
            qID:this.state.qID+1,
            qnList: this.state.qnList.concat(<Question qID={this.state.qID}/>)
        });
    }

    render(){
        return(
            <div>
                <form action="/uploadMain" method="post">
                    <p>Insert Case Overview collapsible bar over here :D</p>
                    <Overview />
                    <p>Insert Case Question collapsible bar over here :D</p>
                    {this.state.qnList}
                    <Button type="button" bsStyle="primary" onClick={(e)=>this.addQuestion()}>Add Question</Button><br/>
                    <Button type="submit" align="center" bsStyle="primary" onClick={(e)=>this.saveChanges(e)}>Submit</Button>
                </form>


            </div>
        );
    }
}

export default Main;