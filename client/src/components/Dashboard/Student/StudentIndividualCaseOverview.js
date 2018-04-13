import React, {Component} from 'react';
import {Panel} from "react-bootstrap";
import ReactHtmlParser from "react-html-parser";

class StudentIndividualCaseOverview extends Component {
    renderContent = () => {
        switch(this.props.case) {
            case null:
                return;
            default:
                return(
                    <Panel bsStyle="primary" defaultExpanded>
                        <Panel.Heading>
                            <Panel.Title componentClass="h3" toggle>Case Overview</Panel.Title>
                        </Panel.Heading>
                        <Panel.Collapse>
                            <Panel.Body>
                                <h4><strong>Scenario</strong></h4>
                                {ReactHtmlParser(this.props.case.scenario)}
                                <br/>
                                <h4><strong>Learning</strong></h4>
                                {ReactHtmlParser(this.props.case.learning)}
                            </Panel.Body>
                        </Panel.Collapse>
                    </Panel>
                );
        }
    };

    render() {
        return(
            <div className="col-md-12">
                {this.renderContent()}
            </div>
        );
    }
}

export default StudentIndividualCaseOverview;