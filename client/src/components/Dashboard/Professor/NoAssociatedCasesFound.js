import React, {Component} from 'react';
import {Button, Row} from "react-bootstrap";
import {Redirect} from "react-router-dom";

class NoAssociatedCasesFound extends Component {
    state = {
        redirectToUpload: false,
        redirectToVet: false
    };

    redirectToUpload = () => {
        this.setState({
            redirectToUpload: true
        });
    };

    redirectToVet = () => {
        this.setState({
            redirectToVet: true
        });
    };

    renderContent = () => {
        switch(this.state.redirectToUpload) {
            case false:
                switch(this.state.redirectToVet) {
                    case false:
                        return(
                            <div className="container-fluid">
                                <Row>
                                    <div className="col-md-12 text-center">
                                        <h1>Unfortunately, it seems that you have not uploaded or vetted any case yet!</h1>
                                        <h2>We cannot analyse any case performance without that :/</h2>
                                        <h2>Head on to the Upload page to upload a case: <Button type="button" bsStyle="primary" onClick={(e) => this.redirectToUpload()}>Upload a Case</Button></h2>
                                        <h2>Or</h2>
                                        <h2>Head on to the Vet page to vet a case: <Button type="button" bsStyle="primary" onClick={(e) => this.redirectToVet()}>Vet a Case</Button></h2>
                                    </div>
                                </Row>
                            </div>
                        );
                    default:
                        return(
                            <Redirect to="/vetting" />
                        );
                }
            default:
                return(
                    <Redirect to="/upload" />
                );
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

export default NoAssociatedCasesFound;