import React, { Component } from 'react';
import { Button, Accordion, Panel } from 'react-bootstrap';
import { bindAll } from 'lodash';
import Question from './Question.js';
import Overview from './Overview.js';
import BootstrapModal from './BootstrapModal.js';
import './Upload.css';

class Main extends Component{
    constructor(props){
        super(props);
        this.state={
            qID:1,
            qnData:[],
            title:'',
            difficulty:"Select One",
            speciality:"Select One",
            subspeciality:"Select One",
            approach:null,
            scenario:'',
            learning: '',
        };
        bindAll(this, 'addQuestion', 'saveChanges', 'handleUpdateOverview', 'handleUpdateQuestion');
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
            this.setState({vmShow:true, error: "Case Overview: Please fill in the Case Title!"});
        } else if (this.state.difficulty==="Select One"){
            this.setState({vmShow:true, error: "Case Overview: Please select a Difficulty Level!"});
        } else if (this.state.speciality==="Select One"){
            this.setState({vmShow:true, error: "Case Overview: Please select a Speciality!"});
        } else if (this.state.subspeciality==="Select One"){
            this.setState({vmShow:true, error: "Case Overview: Please select a Sub-specialiy!"});
        } else if (this.state.approach===null){
            this.setState({vmShow:true, error: "Case Overview: Please select at least 1 Approach!"});
        } else if (this.state.scenario===''){
            this.setState({vmShow:true, error: "Case Overview: Please fill in the Case Scenario!"});
        } else if (this.state.learning==='') {
            this.setState({vmShow:true, error: "Case Overview: Please fill in the Key Learning Points!"});
        } else if (true){

            let questions = this.state.qnData;
            let error='';
            let BreakException ={};
            try {
                questions.forEach(function (obj) {
                    if (obj.question === '') {
                        console.log(this);
                        error="Question #" + obj.id + ": Please fill in the Question!";
                        throw BreakException;
                    } else if (obj.type === "Select One") {
                        error="Question #" + obj.id + ": Please select a Question Type!";
                        throw BreakException;
                    } else if (obj.pearl === '') {
                        error="Question #" + obj.id + ": Please fill in the PEARL!";
                        throw BreakException;
                    } else if (obj.time === "Select One") {
                        error="Question #" + obj.id + ": Please select a Time Limit!";
                        throw BreakException;
                    } else if (obj.type === "MCQ") {
                        if (obj.mcq1 === '' || obj.mcq2 === '') {
                            error="Question #" + obj.id + ": Please fill in the first 2 MCQ answers!";
                            throw BreakException;
                        } else if (obj.mcq3 === '' && obj.check3) {
                            error="Question #" + obj.id + ": Please fill in an answer for third answer option or uncheck that option!";
                            throw BreakException;
                        } else if (obj.mcq4 === '' && obj.check4) {
                            error="Question #" + obj.id + ": Please fill in an answer for fourth answer option or uncheck that option!";
                            throw BreakException;
                        } else if (obj.mcq5 === '' && obj.check5) {
                            error="Question #" + obj.id + ": Please fill in an answer for fifth answer option or uncheck that option!";
                            throw BreakException;
                        } else if (obj.mcq6 === '' && obj.check6) {
                            error="Question #" + obj.id + ": Please fill in an answer for sixth answer option or uncheck that option!";
                            throw BreakException;
                        } else if (!obj.check1 && !obj.check2 && !obj.check3 && !obj.check4 && !obj.check5 && !obj.check6) {
                            error="Question #" + obj.id + ": Please check at least 1 correct answer!";
                            throw BreakException;
                        }
                    } else if (obj.type === "Open-ended" && obj.openEnded === '') {
                        error="Question #" + obj.id + ": Please fill in the Open-ended answer!";
                        throw BreakException;
                    }
                });
            } catch(e){
                this.setState({vmShow:true, error: error});
                return;
            }
        } else {
            window.alert("Success!");
        }
    }

    handleUpdateQuestion(details, id){
        let questions = this.state.qnData;
        questions.forEach(function (obj) {
            if (obj.id === id) {
                obj.stem=details.stem;
                obj.question=details.question;
                obj.attachment=details.attachment;
                obj.filename=details.filename;
                obj.filtype=details.filetype;
                obj.type=details.type;
                obj.openEnded=details.openEnded;
                obj.mcq1=details.mcq1;
                obj.mcq2=details.mcq2;
                obj.mcq3=details.mcq3;
                obj.mcq4=details.mcq4;
                obj.mcq5=details.mcq5;
                obj.mcq6=details.mcq6;
                obj.check1=details.check1;
                obj.check2=details.check2;
                obj.check3=details.check3;
                obj.check4=details.check4;
                obj.check5=details.check5;
                obj.check6=details.check6;
                obj.pearl=details.pearl;
                obj.time=details.time;
                obj.reference=details.reference;
            }
        });
        this.setState({ qnData: questions });
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
        let vmClose = () => this.setState({vmShow:false});
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
                    reference={obj.reference}
                    handleUpdateQuestion={this.handleUpdateQuestion}/>
            );
        });

        let stems = this.state.qnData.map((obj, index) => {
            return (
                <div className="stem">
                    <div className="stem-label">
                        Question {obj.id}
                    </div>
                    {obj.stem}
                </div>
            );
        });


        return(
            <div id="main">
                <div className="story">
                    <p className="story-title">Story So Far</p>
                    <p>Case Scenario</p>
                    {this.state.scenario}<br/><br/>
                    <p>Case Continuation</p>
                    {stems}<br/><br/>
                </div>

                <form action="/api/uploadCase" method="post" className="case-area">
                    <Accordion>
                        <Panel header="▽ Case Overview" eventKey="1">
                            <Overview
                                title={this.state.title}
                                difficulty={this.state.difficulty}
                                speciality={this.state.speciality}
                                subspeciality={this.state.subspeciality}
                                approach={this.state.approach}
                                scenario={this.state.scenario}
                                learning={this.state.learning}
                                handleUpdateOverview={this.handleUpdateOverview}/>
                        </Panel>
                    </Accordion>

                    <Accordion>
                        <Panel header="▽ Case Questions" eventKey="1">
                            <div className="question-area">
                                {questionNodes}
                            </div>


                            <div className="add-question-button">
                            <Button  type="button" bsStyle="primary" onClick={(e)=>this.addQuestion()}>Add Question</Button><br/>
                            </div>
                        </Panel>
                    </Accordion>
                    <div className="submit-case-button">
                    <Button type="submit" align="center" bsStyle="primary" onClick={(e)=>this.saveChanges(e)}>Submit</Button>
                    </div>
                    <BootstrapModal
                        show={this.state.vmShow}
                        onHide={vmClose}
                        aria-labelledby="contained-modal-title-sm">
                        <BootstrapModal.Header closeButton>
                            <BootstrapModal.Title id="contained-modal-title-sm">Unable to Submit</BootstrapModal.Title>
                        </BootstrapModal.Header>
                        <BootstrapModal.Body>
                            <p>{this.state.error}</p>
                        </BootstrapModal.Body>
                        <BootstrapModal.Footer>
                            <Button onClick={vmClose}>Close</Button>
                        </BootstrapModal.Footer>
                    </BootstrapModal>
                </form>
            </div>
        );
    }
}

export default Main;