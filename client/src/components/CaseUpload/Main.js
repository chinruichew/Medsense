import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Collapse } from 'react-bootstrap';
import { bindAll } from 'lodash';
import Question from './Question.js'
import Overview from './Overview.js'

class Main extends Component{
    constructor(props){
        super(props);
        this.state={
            qID:1,
            qnData:[],
            valid:false,
            qnList:[],
            title:'',
            difficulty:"Select One",
            speciality:"Select One",
            subspeciality:"Select One",
            approach:null,
            scenario:'',
            learning: '',
        };
        bindAll(this, 'addQuestion', 'saveChanges', 'handleUpdateOverview');
    }

    addQuestion(){
        this.setState({
            qID: this.state.qID+1,
            qnData: this.state.qnData.concat(
                {
                    "id": this.state.qID,
                    "stem":'',
                    "question":'',
                    "attachment":null,
                    "filename":null,
                    "filetype":null,
                    "type":"Select One",
                    "openEnded":'',
                    "mcq1":'',
                    "mcq2":'',
                    "mcq3":'',
                    "mcq4":'',
                    "mcq5":'',
                    "mcq6":'',
                    "check1":false,
                    "check2":false,
                    "check3":false,
                    "check4":false,
                    "check5":false,
                    "check6":false,
                    "pearl":'',
                    "time":"Select One",
                    "reference":'',
                }
            ),
        });
    }

    saveChanges(e){
        e.preventDefault();
        if (this.state.title===''){
            window.alert("Please fill in the Case Title!");
        } else if (this.state.difficulty==="Select One"){
            window.alert("Please select a Difficulty Level!");
        } else if (this.state.speciality==="Select One"){
            window.alert("Please select a Speciality!");
        } else if (this.state.subspeciality==="Select One"){
            window.alert("Please select a Sub-specialiy!");
        } else if (this.state.approach===null){
            window.alert("Please select at least 1 Approach!");
        } else if (this.state.scenario===''){
            window.alert("Please fill in the Case Scenario!");
        } else {
            this.setState({ valid: true });
            window.alert("Success!");
        }
        for (let i=1; i<this.state.qnList.length; i++){

            if (this.state.type==="Select One"){
                window.alert("Please select a Question Type!");
            } else if (this.state.question===''){
                window.alert("Please fill in the Question!");
            } else if (this.state.time==="Select One"){
                window.alert("Please select a Time Limit!");
            } else if (this.state.type==="MCQ"){
                if (this.state.mcq1==='' || this.state.mcq2===''){
                    window.alert("Please fill in the first 2 MCQ answers!");
                } else if (this.state.mcq3==='' && this.state.check3){
                    window.alert("Please fill in an answer for third answer option or uncheck that option!");
                } else if (this.state.mcq4==='' && this.state.check4){
                    window.alert("Please fill in an answer for fourth answer option or uncheck that option!");
                } else if (this.state.mcq5==='' && this.state.check5){
                    window.alert("Please fill in an answer for fifth answer option or uncheck that option!");
                } else if (this.state.mcq6==='' && this.state.check6){
                    window.alert("Please fill in an answer for sixth answer option or uncheck that option!");
                } else if (!this.state.check1 && !this.state.check2 && !this.state.check3 && !this.state.check4 && !this.state.check5 && !this.state.check6){
                    window.alert("Please check at least 1 correct answer!");
                } else {
                    this.setState({ valid: true });
                    window.alert("Success!");
                }
            } else if (this.state.type==="Open-ended" && this.state.openEnded===''){
                window.alert("Please fill in the Open-ended answer!");
            } else {
                this.setState({ valid: true });
                window.alert("Success!");
            }

        }

        console.log(this.state);
    }

    handleUpdateOverview(details){
        this.setState({
            title: details.title,
            difficulty: details.difficulty,
            speciality: details.speciality,
            subspeciality: details.subspeciality,
            approach: details.approach,
            scenario: details.scenario,
            learning: details.learning,
        });
    }

    render(){

        let questionNodes = this.state.qnData.map((obj, index) => {

            return (
                <Question
                    id={obj.id}
                    stem={obj.stem}
                    question={obj.question}
                    attachment={obj.attachment}
                    filename={obj.filename}
                    filetype={obj.filtype}
                    type={obj.type}
                    openEnded={obj.openEnded}
                    mcq1={obj.mcq1}
                    mcq2={obj.mcq2}
                    mcq3={obj.mcq3}
                    mcq4={obj.mcq4}
                    mcq5={obj.mcq5}
                    mcq6={obj.mcq6}
                    check1={obj.check1}
                    check2={obj.check2}
                    check3={obj.check3}
                    check4={obj.check4}
                    check5={obj.check5}
                    check6={obj.check6}
                    pearl={obj.pearl}
                    time={obj.time}
                    reference={obj.reference} />
            );
        })
        return(
            <div>
                <form action="/api/uploadCase" method="post">
                    <p>Insert Case Overview collapsible bar over here :D</p>
                    <Overview
                        title={this.state.title}
                        difficulty={this.state.difficulty}
                        speciality={this.state.speciality}
                        subspeciality={this.state.subspeciality}
                        approach={this.state.approach}
                        scenario={this.state.scenario}
                        learning={this.state.learning}
                        handleUpdateOverview={this.handleUpdateOverview}/>
                    <p>Insert Case Question collapsible bar over here :D</p>
                    {questionNodes}
                    <Button type="button" bsStyle="primary" onClick={(e)=>this.addQuestion()}>Add Question</Button><br/>
                    <Button type="submit" align="center" bsStyle="primary" onClick={(e)=>this.saveChanges(e)}>Submit</Button>
                </form>
            </div>
        );
    }
}

export default Main;