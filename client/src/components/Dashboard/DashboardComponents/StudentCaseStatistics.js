import React, {Component} from 'react';
import {Image} from "react-bootstrap";
import {NavLink} from "react-router-dom";

class StudentCaseStatistics extends Component {
    state = {
        answers: this.props.answers
    };

    renderContent = () => {
        const selectOptions = this.state.answers.map((answer, index) => {
            return(
                <option key={answer._id} value={answer._id}>{answer.case.title + ' (Attempt ' + answer.attempt + ')'}</option>
            );
        });

        const answers = this.state.answers.map((answer, index) => {
            console.log(answer);
            let placeholderImage = <Image circle src="/individual_case_image.jpg" style={{height: '150px', width: '150px'}} />;
            if(index % 2 === 0) {
                placeholderImage = <Image circle src="/individual_case_image_2.jpg" style={{height: '150px', width: '150px'}} />;
            }
            return(
                <div key={answer._id} className="col-md-4">
                    <NavLink to={"/caseStatsIndividual?case=" + answer._id}>
                        <div className="card">
                            <div className="card-content text-center">
                                {placeholderImage}
                                <h4>{answer.case.title}</h4>
                                <p>Speciality: {answer.case.speciality}</p>
                                <p>Attempt {answer.attempt}</p>
                            </div>
                        </div>
                    </NavLink>
                </div>
            );
        });
        return answers;
    };

    render() {
        return(
            <div className="col-md-12">
                {this.renderContent()}
            </div>
        );
    }
}

export default StudentCaseStatistics;