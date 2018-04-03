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

    returnToCaseStats = (redirectToOverview) => {
        this.setState({
            caseId: null,
            redirectToOverview
        });
    };

    renderContent = () => {
        switch(this.state.redirectToOverview) {
            case false:
                switch(this.state.reviewedCase) {
                    case null:
                        switch(this.props.associatedCases) {
                            case null:
                                return;
                            default:
                                const uploadedCases = this.props.associatedCases.uploaded;
                                const vettedCases = this.props.associatedCases.vetted;
                                const uploadedSection = uploadedCases.map((uploadedCase, index) => {
                                    // let placeholderImage = <Image circle src="/case-display-pictures/individual_case_image.jpg" style={{height: '150px', width: '150px'}} />;
                                    // if(index % 2 === 0) {
                                    //     placeholderImage = <Image circle src="/case-display-pictures/individual_case_image_2.jpg" style={{height: '150px', width: '150px'}} />;
                                    // }
                                    let picName = "./" + uploadedCase.subspeciality[0] + ".png";
                                    let placeholderImage = <Image circle src={picName} style={{height: '150px', width: '150px'}} onError={(e)=>{e.target.src="./Other Subspeciality.png"}}/>;
                                    return(
                                        <div key={uploadedCase._id} className="col-md-4 case-div">
                                            <div className="card">
                                                <div className="card-content text-center">
                                                    {placeholderImage}
                                                    <h4>{uploadedCase.title}</h4>
                                                    <p>Speciality: {uploadedCase.speciality}</p>
                                                    <Button onClick={(e) => this.setState({reviewedCase: uploadedCase})} bsStyle="primary">Review</Button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                });
                                const vettedSection = vettedCases.map((vettedCase, index) => {
                                    // let placeholderImage = <Image circle src="/case-display-pictures/individual_case_image.jpg" style={{height: '150px', width: '150px'}} />;
                                    // if(index % 2 === 0) {
                                    //     placeholderImage = <Image circle src="/case-display-pictures/individual_case_image_2.jpg" style={{height: '150px', width: '150px'}} />;
                                    // }
                                    let picName = "./" + vettedCase.subspeciality[0] + ".png";
                                    let placeholderImage = <Image circle src={picName} style={{height: '150px', width: '150px'}} onError={(e)=>{e.target.src="./Other Subspeciality.png"}}/>;
                                    return(
                                        <div key={vettedCase._id} className="col-md-4 case-div">
                                            <div className="card">
                                                <div className="card-content text-center">
                                                    {placeholderImage}
                                                    <h4>{vettedCase.title}</h4>
                                                    <p>Speciality: {vettedCase.speciality}</p>
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
                            <ProfessorIndividualCaseStatistics returnToCaseStats={this.returnToCaseStats} reviewedCase={this.state.reviewedCase} redirectFromOverview={this.props.overviewToCaseDetailId !== undefined && this.props.overviewToCaseDetailId !== null}/>
                        );
                }
            default:
                window.location.reload();
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