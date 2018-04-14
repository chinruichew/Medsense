import React, {Component} from 'react';
import axios from 'axios';
import {Button, Image} from "react-bootstrap";

import ProfessorIndividualCaseStatistics from "./ProfessorIndividualCaseStatistics";

class ProfessorCaseStatistics extends Component {
    state = {
        reviewedCase: null,
        caseId: this.props.overviewToCaseDetailId || null,
        redirectToOverview: false
    };

    componentDidMount() {
        if(this.props.overviewToCaseDetailId) {
            axios.get('/api/getCaseById?caseId=' + this.props.overviewToCaseDetailId).then(res => {
                this.setState({
                    reviewedCase: res.data
                });
            }).catch(err => {
                console.log(err);
            });
        }
    }

    returnToCaseStats = (redirectToOverview) => {
        this.setState({
            reviewedCase: null,
            redirectToOverview
        });
    };

    renderContent = () => {
        switch(this.state.redirectToOverview) {
            case false:
                switch(this.props.overviewToCaseDetailId) {
                    case undefined:
                        switch(this.state.reviewedCase) {
                            case null:
                                switch(this.props.associatedCases) {
                                    case null:
                                        return;
                                    default:
                                        const uploadedCases = this.props.associatedCases.uploaded;
                                        const vettedCases = this.props.associatedCases.vetted;
                                        const uploadedSection = uploadedCases.map((uploadedCase, index) => {
                                            let picName = "./" + uploadedCase.subspeciality[0] + ".png";
                                            let placeholderImage = <Image circle src={picName} style={{height: '150px', width: '150px'}} onError={(e)=>{e.target.src="./Other Subspeciality.png"}}/>;
                                            return(
                                                <div key={uploadedCase._id} className="col-md-4 case-div">
                                                    <div className="card">
                                                        <div className="card-content text-center">
                                                            {placeholderImage}
                                                            <h4>{uploadedCase.title}</h4>
                                                            <p>Speciality: {uploadedCase.speciality}</p>
                                                            <p>Difficulty: {uploadedCase.difficulty}</p>
                                                            <Button onClick={(e) => this.setState({reviewedCase: uploadedCase})} bsStyle="primary">Review</Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        });
                                        const vettedSection = vettedCases.map((vettedCase, index) => {
                                            let picName = "./" + vettedCase.subspeciality[0] + ".png";
                                            let placeholderImage = <Image circle src={picName} style={{height: '150px', width: '150px'}} onError={(e)=>{e.target.src="./Other Subspeciality.png"}}/>;
                                            return(
                                                <div key={vettedCase._id} className="col-md-4 case-div">
                                                    <div className="card">
                                                        <div className="card-content text-center">
                                                            {placeholderImage}
                                                            <h4>{vettedCase.title}</h4>
                                                            <p>Speciality: {vettedCase.speciality}</p>
                                                            <p>Difficulty: {vettedCase.difficulty}</p>
                                                            <Button onClick={(e) => this.setState({reviewedCase: vettedCase})} bsStyle="primary">Review</Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        });
                                        return(
                                            <div>
                                                <div className="col-md-12 text-center">
                                                    <h3>Uploaded Cases</h3>
                                                    {uploadedSection}
                                                </div>
                                                <div className="col-md-12 text-center" style={{marginBottom: "3%"}}>
                                                    <h3>Vetted Cases</h3>
                                                    {vettedSection}
                                                </div>
                                                <br/>
                                            </div>
                                        );
                                }
                            default:
                                return(
                                    <ProfessorIndividualCaseStatistics returnToCaseStats={this.returnToCaseStats} reviewedCase={this.state.reviewedCase}/>
                                );
                        }
                    default:
                        switch(this.state.reviewedCase) {
                            case null:
                                return;
                            default:
                                return(
                                    <ProfessorIndividualCaseStatistics returnToCaseStats={this.returnToCaseStats} reviewedCase={this.state.reviewedCase} redirectFromOverview={this.props.overviewToCaseDetailId !== undefined && this.props.overviewToCaseDetailId !== null}/>
                                );
                        }
                }
            default:
                this.props.resetBarChartFilters();
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

export default ProfessorCaseStatistics;