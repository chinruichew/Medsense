import React, {Component} from 'react';
import {Image} from "react-bootstrap";

class StudentCaseStatistics extends Component {
    state = {
        answers: this.props.answers
    };

    renderContent = () => {
        const answers = this.state.answers.map(answer => {
            console.log(answer);
            return(
                <div key={answer._id} className="col-md-4">
                    <a href="/home">
                        <div className="card">
                            <div className="card-content text-center">
                                <Image circle src="/individual_case_image.jpg" style={{height: '150px', width: '150px'}} />
                                <h4>{answer.case.title}</h4>
                                <p>Attempt {answer.attempt}</p>
                            </div>
                        </div>
                    </a>
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