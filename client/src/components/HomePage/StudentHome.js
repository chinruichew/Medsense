import React, { Component } from 'react';
import {Button, Carousel, Col, Image} from 'react-bootstrap';
import {NavLink, Redirect} from "react-router-dom";
import axios from 'axios';
import BootstrapModal from '../UI/Modal/UploadBootstrapModal.js';
import Zoom from 'react-reveal/Zoom';
import Flip from 'react-reveal/Flip';
import Rotate from 'react-reveal/Rotate';
import Bounce from 'react-reveal/Bounce';
import Slide from 'react-reveal/Slide';
import Roll from 'react-reveal/Roll';
import LightSpeed from 'react-reveal/LightSpeed';

import "./Home.css";
import Fade from "react-reveal/Fade";
import HomePageFooter from "./HomePageFooter";

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
        axios.post('/api/addRecommendationClick', {
            caseId: gameId
        }).then(res => {
            this.setState({
                directToRecommendedGame: true,
                gameId
            });
        }).catch(err => {
            console.log(err);
        });
    };

    handleCarouselSelect = () => {
        // Animation reset here
    };

    renderCarousel2 = () => {
        if(this.state.recommendedCases.length > 3) {
            const recommendedCasesV2 = this.state.recommendedCases.map((recommendedCase, index) => {
                if (index >= 3 && index < 6) {
                    const subspecialities = recommendedCase.subspeciality;
                    let subSpecialityString = subspecialities[0];
                    for (let i = 1; i < subspecialities.length; i++) {
                        subSpecialityString += ', ' + subspecialities[i];
                    }

                    const recommendationBox = <Button key={index} onClick={(e) => this.handleCarouselButtonClick(recommendedCase._id)} className="carousel-button" bsSize="large">
                        <img src="./approach1.jpg" alt={recommendedCase.title}/>
                        <h3>{recommendedCase.title}</h3>
                        <h4>{recommendedCase.speciality}</h4>
                        <h4>{subSpecialityString}</h4>
                    </Button>;

                    const animationStyles = [Zoom, Fade, Flip, Rotate, Bounce, Slide, Roll, LightSpeed];
                    const animationStyle = animationStyles[Math.floor(Math.random()*animationStyles.length)];
                    const animationDirections = ['left', 'right', 'top', 'bottom'];
                    const animationDirection = animationDirections[Math.floor(Math.random()*animationDirections.length)];
                    const animationBiDirections = ['left', 'right'];
                    const animationBiDirection = animationBiDirections[Math.floor(Math.random()*animationBiDirections.length)];
                    const animationDiagonalDirections = ['top left', 'top right', 'bottom left', 'bottom right'];
                    const animationDiagonalDirection = animationDiagonalDirections[Math.floor(Math.random()*animationDiagonalDirections.length)];
                    let recommendationAnimation = '';
                    if(animationStyle === Zoom) {
                        if(animationDirection === 'left') {
                            recommendationAnimation = <Zoom left>
                                {recommendationBox}
                            </Zoom>;
                        }
                        if(animationDirection === 'right') {
                            recommendationAnimation = <Zoom right>
                                {recommendationBox}
                            </Zoom>;
                        }
                        if(animationDirection === 'top') {
                            recommendationAnimation = <Zoom top>
                                {recommendationBox}
                            </Zoom>;
                        }
                        if(animationDirection === 'bottom') {
                            recommendationAnimation = <Zoom bottom>
                                {recommendationBox}
                            </Zoom>;
                        }
                    }
                    if(animationStyle === Fade) {
                        if(animationDirection === 'left') {
                            recommendationAnimation = <Fade left>
                                {recommendationBox}
                            </Fade>;
                        }
                        if(animationDirection === 'right') {
                            recommendationAnimation = <Fade right>
                                {recommendationBox}
                            </Fade>;
                        }
                        if(animationDirection === 'top') {
                            recommendationAnimation = <Fade top>
                                {recommendationBox}
                            </Fade>;
                        }
                        if(animationDirection === 'bottom') {
                            recommendationAnimation = <Fade bottom>
                                {recommendationBox}
                            </Fade>;
                        }
                    }
                    if(animationStyle === Flip) {
                        if(animationDirection === 'left') {
                            recommendationAnimation = <Flip left>
                                {recommendationBox}
                            </Flip>;
                        }
                        if(animationDirection === 'right') {
                            recommendationAnimation = <Flip right>
                                {recommendationBox}
                            </Flip>;
                        }
                        if(animationDirection === 'top') {
                            recommendationAnimation = <Flip top>
                                {recommendationBox}
                            </Flip>;
                        }
                        if(animationDirection === 'bottom') {
                            recommendationAnimation = <Flip bottom>
                                {recommendationBox}
                            </Flip>;
                        }
                    }
                    if(animationStyle === Rotate) {
                        if(animationDiagonalDirection === 'top left') {
                            recommendationAnimation = <Rotate top left>
                                {recommendationBox}
                            </Rotate>;
                        }
                        if(animationDiagonalDirection === 'top right') {
                            recommendationAnimation = <Rotate top right>
                                {recommendationBox}
                            </Rotate>;
                        }
                        if(animationDiagonalDirection === 'bottom left') {
                            recommendationAnimation = <Rotate bottom left>
                                {recommendationBox}
                            </Rotate>;
                        }
                        if(animationDiagonalDirection === 'bottom right') {
                            recommendationAnimation = <Rotate bottom right>
                                {recommendationBox}
                            </Rotate>;
                        }
                    }
                    if(animationStyle === Bounce) {
                        if(animationDirection === 'left') {
                            recommendationAnimation = <Bounce left>
                                {recommendationBox}
                            </Bounce>;
                        }
                        if(animationDirection === 'right') {
                            recommendationAnimation = <Bounce right>
                                {recommendationBox}
                            </Bounce>;
                        }
                        if(animationDirection === 'top') {
                            recommendationAnimation = <Bounce top>
                                {recommendationBox}
                            </Bounce>;
                        }
                        if(animationDirection === 'bottom') {
                            recommendationAnimation = <Bounce bottom>
                                {recommendationBox}
                            </Bounce>;
                        }
                    }
                    if(animationStyle === Slide) {
                        if(animationDirection === 'left') {
                            recommendationAnimation = <Slide left>
                                {recommendationBox}
                            </Slide>;
                        }
                        if(animationDirection === 'right') {
                            recommendationAnimation = <Slide right>
                                {recommendationBox}
                            </Slide>;
                        }
                        if(animationDirection === 'top') {
                            recommendationAnimation = <Slide top>
                                {recommendationBox}
                            </Slide>;
                        }
                        if(animationDirection === 'bottom') {
                            recommendationAnimation = <Slide bottom>
                                {recommendationBox}
                            </Slide>;
                        }
                    }
                    if(animationStyle === Roll) {
                        if(animationDirection === 'left') {
                            recommendationAnimation = <Roll left>
                                {recommendationBox}
                            </Roll>;
                        }
                        if(animationDirection === 'right') {
                            recommendationAnimation = <Roll right>
                                {recommendationBox}
                            </Roll>;
                        }
                        if(animationDirection === 'top') {
                            recommendationAnimation = <Roll top>
                                {recommendationBox}
                            </Roll>;
                        }
                        if(animationDirection === 'bottom') {
                            recommendationAnimation = <Roll bottom>
                                {recommendationBox}
                            </Roll>;
                        }
                    }
                    if(animationStyle === LightSpeed) {
                        if(animationBiDirection === 'left') {
                            recommendationAnimation = <LightSpeed left>
                                {recommendationBox}
                            </LightSpeed>;
                        }
                        if(animationBiDirection === 'right') {
                            recommendationAnimation = <LightSpeed right>
                                {recommendationBox}
                            </LightSpeed>;
                        }
                    }

                    return(
                        <div className="col-md-4">
                            {recommendationAnimation}
                        </div>
                    );
                }
                return;
            });

            return(
                <Carousel.Item className="carousel-item" onSelect={this.handleCarouselSelect}>
                    {recommendedCasesV2}
                </Carousel.Item>
            );
        }
        return;
    };

    renderRecommendations = () => {
        switch(this.state.recommendedCases) {
            case null:
                return;
            default:
                const recommendedCases = this.state.recommendedCases.map((recommendedCase, index) => {
                    if(index < 3) {
                        const subspecialities = recommendedCase.subspeciality;
                        let subSpecialityString = subspecialities[0];
                        for(let i = 1; i < subspecialities.length; i++) {
                            subSpecialityString += ', ' + subspecialities[i];
                        }

                        const recommendationBox = <Button key={index} onClick={(e) => this.handleCarouselButtonClick(recommendedCase._id)} className="carousel-button" bsSize="large">
                            <img src="./approach1.jpg" alt={recommendedCase.title}/>
                            <h3>{recommendedCase.title}</h3>
                            <h4>{recommendedCase.speciality}</h4>
                            <h4>{subSpecialityString}</h4>
                        </Button>;

                        const animationStyles = [Zoom, Fade, Flip, Rotate, Bounce, Slide, Roll, LightSpeed];
                        const animationStyle = animationStyles[Math.floor(Math.random()*animationStyles.length)];
                        const animationDirections = ['left', 'right', 'top', 'bottom'];
                        const animationDirection = animationDirections[Math.floor(Math.random()*animationDirections.length)];
                        const animationBiDirections = ['left', 'right'];
                        const animationBiDirection = animationBiDirections[Math.floor(Math.random()*animationBiDirections.length)];
                        const animationDiagonalDirections = ['top left', 'top right', 'bottom left', 'bottom right'];
                        const animationDiagonalDirection = animationDiagonalDirections[Math.floor(Math.random()*animationDiagonalDirections.length)];
                        let recommendationAnimation = '';
                        if(animationStyle === Zoom) {
                            if(animationDirection === 'left') {
                                recommendationAnimation = <Zoom left>
                                    {recommendationBox}
                                </Zoom>;
                            }
                            if(animationDirection === 'right') {
                                recommendationAnimation = <Zoom right>
                                    {recommendationBox}
                                </Zoom>;
                            }
                            if(animationDirection === 'top') {
                                recommendationAnimation = <Zoom top>
                                    {recommendationBox}
                                </Zoom>;
                            }
                            if(animationDirection === 'bottom') {
                                recommendationAnimation = <Zoom bottom>
                                    {recommendationBox}
                                </Zoom>;
                            }
                        }
                        if(animationStyle === Fade) {
                            if(animationDirection === 'left') {
                                recommendationAnimation = <Fade left>
                                    {recommendationBox}
                                </Fade>;
                            }
                            if(animationDirection === 'right') {
                                recommendationAnimation = <Fade right>
                                    {recommendationBox}
                                </Fade>;
                            }
                            if(animationDirection === 'top') {
                                recommendationAnimation = <Fade top>
                                    {recommendationBox}
                                </Fade>;
                            }
                            if(animationDirection === 'bottom') {
                                recommendationAnimation = <Fade bottom>
                                    {recommendationBox}
                                </Fade>;
                            }
                        }
                        if(animationStyle === Flip) {
                            if(animationDirection === 'left') {
                                recommendationAnimation = <Flip left>
                                    {recommendationBox}
                                </Flip>;
                            }
                            if(animationDirection === 'right') {
                                recommendationAnimation = <Flip right>
                                    {recommendationBox}
                                </Flip>;
                            }
                            if(animationDirection === 'top') {
                                recommendationAnimation = <Flip top>
                                    {recommendationBox}
                                </Flip>;
                            }
                            if(animationDirection === 'bottom') {
                                recommendationAnimation = <Flip bottom>
                                    {recommendationBox}
                                </Flip>;
                            }
                        }
                        if(animationStyle === Rotate) {
                            if(animationDiagonalDirection === 'top left') {
                                recommendationAnimation = <Rotate top left>
                                    {recommendationBox}
                                </Rotate>;
                            }
                            if(animationDiagonalDirection === 'top right') {
                                recommendationAnimation = <Rotate top right>
                                    {recommendationBox}
                                </Rotate>;
                            }
                            if(animationDiagonalDirection === 'bottom left') {
                                recommendationAnimation = <Rotate bottom left>
                                    {recommendationBox}
                                </Rotate>;
                            }
                            if(animationDiagonalDirection === 'bottom right') {
                                recommendationAnimation = <Rotate bottom right>
                                    {recommendationBox}
                                </Rotate>;
                            }
                        }
                        if(animationStyle === Bounce) {
                            if(animationDirection === 'left') {
                                recommendationAnimation = <Bounce left>
                                    {recommendationBox}
                                </Bounce>;
                            }
                            if(animationDirection === 'right') {
                                recommendationAnimation = <Bounce right>
                                    {recommendationBox}
                                </Bounce>;
                            }
                            if(animationDirection === 'top') {
                                recommendationAnimation = <Bounce top>
                                    {recommendationBox}
                                </Bounce>;
                            }
                            if(animationDirection === 'bottom') {
                                recommendationAnimation = <Bounce bottom>
                                    {recommendationBox}
                                </Bounce>;
                            }
                        }
                        if(animationStyle === Slide) {
                            if(animationDirection === 'left') {
                                recommendationAnimation = <Slide left>
                                    {recommendationBox}
                                </Slide>;
                            }
                            if(animationDirection === 'right') {
                                recommendationAnimation = <Slide right>
                                    {recommendationBox}
                                </Slide>;
                            }
                            if(animationDirection === 'top') {
                                recommendationAnimation = <Slide top>
                                    {recommendationBox}
                                </Slide>;
                            }
                            if(animationDirection === 'bottom') {
                                recommendationAnimation = <Slide bottom>
                                    {recommendationBox}
                                </Slide>;
                            }
                        }
                        if(animationStyle === Roll) {
                            if(animationDirection === 'left') {
                                recommendationAnimation = <Roll left>
                                    {recommendationBox}
                                </Roll>;
                            }
                            if(animationDirection === 'right') {
                                recommendationAnimation = <Roll right>
                                    {recommendationBox}
                                </Roll>;
                            }
                            if(animationDirection === 'top') {
                                recommendationAnimation = <Roll top>
                                    {recommendationBox}
                                </Roll>;
                            }
                            if(animationDirection === 'bottom') {
                                recommendationAnimation = <Roll bottom>
                                    {recommendationBox}
                                </Roll>;
                            }
                        }
                        if(animationStyle === LightSpeed) {
                            if(animationBiDirection === 'left') {
                                recommendationAnimation = <LightSpeed left>
                                    {recommendationBox}
                                </LightSpeed>;
                            }
                            if(animationBiDirection === 'right') {
                                recommendationAnimation = <LightSpeed right>
                                    {recommendationBox}
                                </LightSpeed>;
                            }
                        }

                        return(
                            <div key={index} className="col-md-4">
                                {recommendationAnimation}
                            </div>
                        );
                    }
                    return;
                });

                return(
                    <Carousel className="carousel" onSelect={this.handleCarouselSelect}>
                        <Carousel.Item className="carousel-item">
                            {recommendedCases}
                        </Carousel.Item>
                        {this.renderCarousel2()}
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
                            <div className="container-fluid">
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

                                <HomePageFooter/>

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