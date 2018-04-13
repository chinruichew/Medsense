import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, ControlLabel, FormControl, Table, Modal } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { bindAll } from 'lodash';
import axios from 'axios';
import { deleteAdminCase, fetchFilteredAdminCases, fetchAdminCases } from '../../actions';
import ReactHtmlParser from 'react-html-parser';

import './Admin.css';

class CaseManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            display: 'case',
            title: '',
            difficulty: 'Beginner',
            subspeciality: [],
            approach: [],
            casestatus: 'Pending',
            displayModal: false,
            case: null,
            oneCaseQuestions: [],
            oneCaseId: '',
            showConfirmDelete: false,
            oneCase: '',
            approachList: [],
            specialityList: [],
            specialities: null,
            recommendations: null,
            answers: null,
            constants: null
        };
        bindAll(this, 'handleTitleChange', 'handleDifficultyChange', 'handleSubspecialityChange',
            'handleApproachChange', 'handleScenarioChange', 'setSubspeciality', 'setName', 'setApproach',
            'setDifficulty', 'handleOpenModal', 'handleCloseModal', 'handleOpenConfirmDelete', 'handleCloseConfirmDelete');
    }

    componentDidMount() {
        axios.get('/api/getRecommendations').then(res => {
            this.setState({ recommendations: res.data });
        }).catch(err => {
            console.log(err);
        });

        axios.get('/api/fetchAnswers').then(res => {
            this.setState({ answers: res.data });
        }).catch(err => {
            console.log(err);
        });

        axios.get('/api/getConstantTypes').then(res => {
            this.setState({constants: res.data});
        }).catch(err => {
            console.log(err);
        });
    }

    componentWillMount() {
        this.props.fetchAdminCases();
        axios.post('/api/fetchApproach2', {
        }).then(res => {
            this.setState({approachList:res.data});
        });
        axios.post('/api/fetchSpeciality', {
        }).then(res => {
            this.setState({specialityList:res.data});

            const specialitiesToFetch = [];
            this.state.specialityList.map((obj, index) => {
                if(obj.speciality!=="Clinical Practicum") {
                    specialitiesToFetch.push(obj.speciality);
                }
            });

            axios.post('/api/batchFetchSubSpecialities', {
                specialities: specialitiesToFetch
            }).then(res => {
                const fetchedSubSpecialityMapping = res.data;
                const specialities = fetchedSubSpecialityMapping.map((fetchedSubSpecialityMap, index) => {
                    const subspecialities = fetchedSubSpecialityMap.subSpecialities[0].subspecialities.map((subSpeciality, index) => {
                        return <option key={index} value={subSpeciality.subspeciality}>{subSpeciality.subspeciality}</option>;
                    });
                    return <optgroup key={index} label={"--" + fetchedSubSpecialityMap.speciality + "--"}>{subspecialities}</optgroup>;
                });
                this.setState({specialities: specialities});
            });
        });
    }

    handleOpenModal(oneCase) {
        this.setState({ displayModal: true, oneCaseQuestions: oneCase.questions, oneCaseId: oneCase._id, oneCase: oneCase });
    }

    handleCloseModal() {
        this.setState({ displayModal: false });
    }

    handleOpenConfirmDelete() {
        this.setState({ showConfirmDelete: true });
    }

    handleCloseConfirmDelete() {
        this.setState({ showConfirmDelete: false });
    }


    searchCases(e) {
        this.props.fetchFilteredAdminCases(this.state.subspeciality, this.state.approach, this.state.title, this.state.casestatus, this.state.difficulty);
    }

    deleteCase(e) {
        const oneCaseId = this.state.oneCaseId;
        this.props.deleteAdminCase(oneCaseId);
        this.setState({ displayModal: false, showConfirmDelete: false });
    }

    handleTitleChange(e) {
        const value = e.target.value;
        this.setState({ title: value });
    }

    handleDifficultyChange(e) {
        const value = e.target.value;
        this.setState({ difficulty: value });
    }

    handleSubspecialityChange(e) {
        const options = e.target.options;
        let value = [];
        for (let i = 1, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        if (value.length > 0) {
            this.setState({ subspeciality: value });
        }
    }

    handleApproachChange(e) {
        const options = e.target.options;
        let value = [];
        for (let i = 1, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        if (value.length > 0) {
            this.setState({ approach: value });
        }
        // const value = e.target.value;
        // this.setState({ approach: value });
        // this.update(value, "approach");
    }
    handleScenarioChange(e) {
        const value = e.target.value;
        this.setState({ scenario: value });
    }

    handleCaseStatusChange(e) {
        const value = e.target.value;
        this.setState({ casestatus: value });
    }

    handleTimeChange(e) {
        const value = e.target.value;
        this.setState({ time: value });
    }


    setName() {
        return (
            <FormGroup controlId="formControlsTitle">
                <ControlLabel style={{ fontSize: "150%" }}>Case Title</ControlLabel>
                <FormControl style={{ fontSize: "125%" }} type="text" placeholder="Enter a title" value={this.state.title} name="title" onChange={(e) => this.handleTitleChange(e)} />
            </FormGroup>
        );
    }

    setApproach() {
        let approaches = this.state.approachList.map((obj, index) => {
            return <option key={index} value={obj.approach}>{obj.approach}</option>;
        });
        return (
            <FormGroup controlId="formControlsApproach">
                <ControlLabel style={{ fontSize: "150%" }}>Approaches
                    <br />
                    <div style={{ fontSize: "70%", fontWeight: "200" }}>Hold down the Ctrl (Windows) / Command (Mac) button to select multiple options.</div>
                </ControlLabel>
                <FormControl componentClass="select" size='10' value={this.state.approach} name="approach" onChange={(e) => this.handleApproachChange(e)} multiple>
                    <option value="Select All Relevant">Select All Relevant</option>
                    {approaches}
                </FormControl>
            </FormGroup>
        )
    }

    setSubspeciality = () => {
        switch(this.state.specialities) {
            case null:
                return;
            default:
                return (
                    <FormGroup controlId="formControlsSubspeciality">
                        <ControlLabel style={{ fontSize: "150%" }}>Sub-specialties
                            <br />
                            <div style={{ fontSize: "70%", fontWeight: "200" }}>Hold down the Ctrl (Windows) / Command (Mac) button to select multiple options.
                            </div>
                        </ControlLabel>
                        <FormControl componentClass="select" size='10' value={this.state.subspeciality} name="subspeciality" onChange={(e) => this.handleSubspecialityChange(e)} multiple>
                            <option value="Select One">Select All Relevant</option>
                            {this.state.specialities}
                        </FormControl>
                    </FormGroup>
                );
        }
    };

    setDifficulty() {
        return (
            <FormGroup controlId="formControlsDifficulty">
                <ControlLabel style={{ fontSize: "150%" }}>Difficulty Level</ControlLabel>
                <FormControl componentClass="select" value={this.state.difficulty} name="difficulty" onChange={(e) => this.handleDifficultyChange(e)}>
                    <option value="Beginner">Beginner</option>
                    <option value="Advanced">Advanced</option>
                </FormControl>
            </FormGroup>
        );
    }

    setCaseStatus() {
        return (
            <FormGroup controlId="formControlsDifficulty">
                <ControlLabel style={{ fontSize: "150%" }}>Case Status</ControlLabel>
                <FormControl componentClass="select" value={this.state.casestatus} name="casestatus" onChange={(e) => this.handleCaseStatusChange(e)}>
                    <option value="Pending">Pending</option>
                    <option value="Vetted">Vetted</option>
                </FormControl>
            </FormGroup>
        );
    }

    setTime() {
        return (
            <FormGroup controlId="formControlsDifficulty">
                <ControlLabel style={{ fontSize: "150%" }}>Select Case from:</ControlLabel>
                <FormControl componentClass="select" value={this.state.time} name="time" onChange={(e) => this.handleTimeChange(e)}>
                    <option value="all time">All time</option>
                    <option value="past day">Past day</option>
                    <option value="past week">Past week</option>
                    <option value="past month">Past month</option>
                    <option value="past year">Past Year</option>
                </FormControl>
            </FormGroup>
        );
    }


    renderTable() {
        return (
            <Table responsive className="case-table">
                <thead>
                    <tr style={{ background: '#D9EDF7', fontSize: "130%" }}>
                        <th>Case Title</th>
                        <th>Approach</th>
                        <th>Speciality</th>
                        <th>Sub-Speciality</th>
                        <th>Difficulty Level</th>
                        <th>Uploaded By</th>
                        <th>Number of game plays</th>
                        <th>Student Recommendation Clicks</th>
                        <th>Last Updated</th>
                        <th> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</th>
                    </tr>
                </thead>

                {this.renderCases()}


            </Table>
        );
    }

    renderCases= () => {
        switch(this.state.recommendations) {
            case null:
                return;
            default:
                switch(this.state.answers) {
                    case null:
                        return;
                    default:
                        let allCases = this.props.adminCases.map(adminCase => {
                            // Calculate total clicks for each case
                            let totalClicks = 0;
                            for (let i = 0; i < this.state.recommendations.length; i++) {
                                const recommendation = this.state.recommendations[i];
                                if (recommendation.case !== undefined && recommendation.case._id === adminCase._id) {
                                    totalClicks += recommendation.recommendationClicks.length;
                                }
                            }

                            // Calculate total game plays for each case
                            let totalGamePlays = 0;
                            for (let i = 0; i < this.state.answers.length; i++) {
                                const answer = this.state.answers[i];
                                if (answer.case !== undefined && answer.case._id === adminCase._id) {
                                    totalGamePlays++;
                                }
                            }

                            return (
                                <tr align="center">
                                    <td>{adminCase.title}</td>
                                    <td>{adminCase.approach.join(", ")}</td>
                                    <td>{adminCase.speciality}</td>
                                    <td>{adminCase.subspeciality.join(", ")}</td>
                                    <td>{adminCase.difficulty}</td>
                                    <td>{adminCase.authorid['username']}</td>
                                    <td>{totalGamePlays}</td>
                                    <td>{totalClicks}</td>
                                    <td>{adminCase.uploadTime.split("T")[0]}</td>
                                    <td><Button type="button" bsStyle="primary"
                                                onClick={(e) => this.handleOpenModal(adminCase)}>View</Button></td>
                                </tr>
                            );
                        });


                        return (
                            <tbody>
                            {allCases}
                            </tbody>

                        );
                }
        }
    };

    renderContent() {
        switch (this.props.auth) {
            case null:
                return;
            case false:
                return <Redirect to='/' />;
            default:
                switch(this.state.constants) {
                    case null:
                        return;
                    default:
                        switch(this.props.auth.usertype) {
                            case this.state.constants.USER_TYPE_ADMIN:
                                switch (this.props.adminCases) {
                                    case null:
                                        return;
                                    default:
                                        return (
                                            <div className="container-fluid" >
                                                <div className='container-fluid'>
                                                    <div className='col-sm-12'>
                                                        {this.setName()}
                                                    </div>
                                                    <div className='col-sm-6'>
                                                        {this.setSubspeciality()}
                                                    </div>
                                                    <div className='col-sm-6'>
                                                        {this.setApproach()}
                                                    </div>
                                                    <div className='col-sm-6'>
                                                        {this.setDifficulty()}
                                                    </div>
                                                    <div className='col-sm-6'>
                                                        {this.setCaseStatus()}
                                                    </div>
                                                    {/* <div className='col-sm-4'>
                                            {this.setTime()}
                                        </div> */}

                                                    <div className='col-sm-12' align='center'>
                                                        <br/>
                                                        <Button type="button" bsSize="lg" bsStyle="primary" onClick={(e) => this.searchCases()}> &nbsp; Search &nbsp;</Button>
                                                    </div>
                                                </div>
                                                <br /><br />
                                                <div className='col-sm-12'>
                                                    {this.renderTable()}
                                                </div>
                                                {this.renderModal()}
                                            </div>
                                        );
                                }
                            default:
                                return <Redirect to='/' />;
                        }
                }
        }
    }

    renderModal() {
        let allQuestions = this.state.oneCaseQuestions.map((question, id) => {
            if (question.type === "MCQ") {
                return <div>
                    <h5><b><u>Question {id + 1}</u></b></h5>
                    <p>{ReactHtmlParser(question.question)}</p><br/>
                </div>
            } else {
                return <div>
                    <h5><b><u>Question {id + 1}</u></b></h5>
                    <p>{ReactHtmlParser(question.question)}</p><br/>
                </div>
            }
        });
        let scenario = "";
        let caseStatus = "";
        let difficulty = "";
        let learning = "";

        if(this.state.oneCase != '') {
            scenario = this.state.oneCase.scenario;
            console.log(this.state.oneCase);
            caseStatus = this.state.oneCase.status;
            difficulty = this.state.oneCase.difficulty;
            learning = this.state.oneCase.learning;
        }
        const oneCaseTitle = <span className="title" style={{fontSize: "120%"}}><strong>{this.state.oneCase.title}</strong></span>;
        return (
            <div>
                <Modal show={this.state.displayModal} onHide={this.handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>{oneCaseTitle}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="delete-case-detail">
                        <h4>Case Status</h4>
                        <p>{caseStatus}</p>
                        <h4>Difficulty Level</h4> <p>{difficulty}</p>
                        <h4>Key Learning Objectives</h4>
                        <p>{ReactHtmlParser(learning)}</p>
                        <h4>Case Scenario</h4>
                        <p>{ReactHtmlParser(scenario)} </p>
                        <h4>Case Questions</h4>
                        {allQuestions}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={(e) => this.handleOpenConfirmDelete()}>Delete</Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={this.state.showConfirmDelete} onHide={this.handleCloseConfirmDelete}>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title">
                            Deletion Confirmation
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure you want to delete this case?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={(e) => this.deleteCase()}>Yes</Button>
                        <Button onClick={(e) => this.handleCloseConfirmDelete()}>No</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );

    }



    render() {
        return (
            <div>
                {this.renderContent()}
            </div>
        );
    }
    goToCaseManager() {
        this.setState({
            display: 'case'
        });
    }

    goToUserManager() {
        this.setState({
            display: 'user'
        });
    }
    goToAdmin() {
        this.setState({
            display: ''
        });
    }
}

function mapStateToProps({ adminCases, auth }) {
    return { adminCases, auth };
}



export default connect(mapStateToProps, { deleteAdminCase, fetchFilteredAdminCases, fetchAdminCases })(CaseManager);