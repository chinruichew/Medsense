import React, { Component } from 'react';
import {Button, Carousel, Col} from 'react-bootstrap';
import {NavLink, Redirect} from "react-router-dom";
import axios from 'axios';
import BootstrapModal from '../UI/Modal/UploadBootstrapModal.js';
import "./Home.css";

class StudentHome extends Component {
    state = {
        pendingCases: null,
        showModal: false,
        year: null,
        recommendedCases: null,
        directToRecommendedGame: false,
        gameId: null
    };

    componentDidMount() {
        // Get vetted cases since last login
        axios.get('/api/getVettedCasesSinceUserLogin').then(res => {
            this.setState({pendingCases: res.data});
        }).catch(err => {
            throw(err);
        });

        // Check for need to prompt user to update year
        axios.get('/api/checkUserToUpdateYear').then(res => {
            this.setState({showModal: res.data});
        }).catch(err => {
            throw(err);
        });

        // Fetch recommended cases for students
        axios.get('/api/getStudentRecommendedCases').then(res => {
            this.setState({
                recommendedCases: res.data
            })
        }).catch(err => {
            console.log(err);
        });
    }

    handleYearChange = (e) => {
        const year = e.target.value;
        this.setState({year});
    };

    submitYear = (e) => {
        axios.post('/api/updateUserfromYearlyPrompt', {
            year: 'Year ' + this.state.year
        }).then(res => {
            console.log(res);
        }).catch(err => {
            throw(err);
        });
    };

    handleCarouselButtonClick = (gameId) => {
        this.setState({
            directToRecommendedGame: true,
            gameId
        });
    };

    renderRecommendations = () => {
        switch(this.state.recommendedCases) {
            case null:
                return;
            default:
                const recommendedCases = this.state.recommendedCases.map((recommendedCase, index) => {
                    if(index < 3) {
                        recommendedCase = recommendedCase._doc;
                        const subspecialities = recommendedCase.subspeciality;
                        let subSpecialityString = subspecialities[0];
                        for(let i = 1; i < subspecialities.length; i++) {
                            subSpecialityString += ', ' + subspecialities[i];
                        }
                        return(
                            <Button key={index} onClick={(e) => this.handleCarouselButtonClick(recommendedCase._id)} className="carousel-button" bsSize="large">
                                <img src="./approach1.jpg" alt={recommendedCase.title}/>
                                <h3>{recommendedCase.title}</h3>
                                <h4>{recommendedCase.speciality}</h4>
                                <h4>{subSpecialityString}</h4>
                            </Button>
                        );
                    }
                });
                const recommendedCasesV2 = this.state.recommendedCases.map((recommendedCase, index) => {
                    if(index >= 3 && index < 6) {
                        recommendedCase = recommendedCase._doc;
                        const subspecialities = recommendedCase.subspeciality;
                        let subSpecialityString = subspecialities[0];
                        for(let i = 1; i < subspecialities.length; i++) {
                            subSpecialityString += ', ' + subspecialities[i];
                        }
                        return(
                            <Button onClick={(e) => this.handleCarouselButtonClick(recommendedCase._id)} className="carousel-button" bsSize="large">
                                <img src="./approach1.jpg" alt={recommendedCase.title}/>
                                <h3>{recommendedCase.title}</h3>
                                <h4>{recommendedCase.speciality}</h4>
                                <h4>{subSpecialityString}</h4>
                            </Button>
                        );
                    }
                });
                return(
                    <Carousel className="carousel">
                        <Carousel.Item className="carousel-item">
                            {recommendedCases}
                        </Carousel.Item>
                        <Carousel.Item className="carousel-item">
                            {recommendedCasesV2}
                        </Carousel.Item>
                    </Carousel>
                );
        }
    };

    renderContent() {
        switch(this.state.directToRecommendedGame) {
            case false:
                switch(this.state.pendingCases) {
                    case null:
                        return;
                    default:
                        let imgUrl = './homepage.png';
                        return(
                            <div>
                                <div className="text-center">
                                    <h1 style={{color: "#199ED8", fontWeight: "bold", marginTop: "0"}}>Recommended Cases</h1>
                                </div>

                                {this.renderRecommendations()}

                                <div className="image-div" style={{backgroundImage: 'url(' + imgUrl + ')'}}>
                                    <h1>Upload Case</h1>
                                    <hr/>
                                    <p>Description of case upload</p><br/>
                                    <NavLink to='/upload'>
                                        <Button className="image-button">
                                            <h4>Upload</h4>
                                        </Button>
                                    </NavLink>
                                </div>
                                <br/>
                                <div >
                                    <Col sm={6} style={{backgroundColor: "#F7F7F7", height: "180px"}}>
                                        <h3 style={{marginLeft: "3%", paddingTop: "3%"}}>FOLLOW US</h3>
                                        <a target="_blank" href="https://www.facebook.com/medsense/">
                                            <img src="./facebook.png" style={{width: "3em", marginLeft: "8%" }}/>
                                        </a>
                                    </Col>
                                    <Col smOffset={6} style={{backgroundColor: "#F7F7F7", height: "180px"}}>
                                        <h3 style={{marginLeft: "79%", paddingTop: "5%"}}>VERSION</h3>
                                        <h5 style={{marginLeft: "70%", fontSize: "130%", textAlign: "center"}}>Version 2.0
                                            <br/>Last Updated: 1 April 2018
                                        </h5>
                                    </Col>
                                </div>

                                <div style={{margin: "2%"}}>Copyright © Medsense, 2018</div>

                                <div>
                                    <BootstrapModal
                                        show={this.state.showModal}
                                        onHide={(e) => this.setState({ showModal: false })}
                                        aria-labelledby="contained-modal-title-vm">
                                        <BootstrapModal.Header closeButton>
                                            <BootstrapModal.Title id="contained-modal-title-vm">Update your year</BootstrapModal.Title>
                                        </BootstrapModal.Header>
                                        <BootstrapModal.Body>
                                            <p>It is around the start of a new semester! Have you moved on to a new academic year? Update your current year.</p>
                                            <form>
                                                <div className="form-group">
                                                    <div className="input-group">
                                                        <span className="input-group-addon"><i className="fa fa-graduation-cap fa-lg" aria-hidden="true"></i></span>
                                                        <select className="form-control" value={this.state.year} onChange={(e) => this.handleYearChange(e)}>
                                                            <option value="1">Year 1</option>
                                                            <option value="2">Year 2</option>
                                                            <option value="3">Year 3</option>
                                                            <option value="4">Year 4</option>
                                                            <option value="5">Year 5</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </form>
                                        </BootstrapModal.Body>
                                        <BootstrapModal.Footer>
                                            <Button onClick={(e) => this.submitYear(e)}>Submit</Button>
                                            <Button onClick={(e) => this.setState({ showModal: false })}>Close</Button>
                                        </BootstrapModal.Footer>
                                    </BootstrapModal>
                                </div>
                            </div>
                        );
                }
            default:
                return(
                    <Redirect to={{
                        pathname: "/game",
                        gameId: this.state.gameId
                    }} />
                );
        }
    }

    render() {
        return(
            <div>
                {this.renderContent()}
            </div>
        );
    }
}

export default StudentHome;