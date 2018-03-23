import React, { Component } from 'react';
import {Button, Carousel, Col, Image} from 'react-bootstrap';
import {NavLink, Redirect} from "react-router-dom";
import axios from 'axios';

import "./Home.css";
import Bounce from "react-reveal/Bounce";
import Slide from "react-reveal/Slide";
import LightSpeed from "react-reveal/LightSpeed";
import Zoom from "react-reveal/Zoom";
import Flip from "react-reveal/Flip";
import Rotate from "react-reveal/Rotate";
import Roll from "react-reveal/Roll";

class ProfessorHome extends Component {
    state = {
        recommendedPendingCases: null,
        redirectToVetting: false,
        caseId: null
    };

    componentDidMount() {
        axios.get('/api/getProfessorRecommendedCases').then(res => {
            this.setState({
                recommendedPendingCases: res.data
            });
        }).catch(err => {
            console.log(err);
        });
    }

    handleCarouselButtonClick = (caseId) => {
        this.setState({
            redirectToVetting: true,
            caseId
        });
    };

    renderCarousel2 = () => {
        if(this.state.recommendedPendingCases.length > 3) {
            const recommendedCasesV2 = this.state.recommendedPendingCases.map((recommendedPendingCase, index) => {
                if(index >= 3 && index < 6) {
                    const subspecialities = recommendedPendingCase.subspeciality;
                    let subSpecialityString = subspecialities[0];
                    for(let i = 1; i < subspecialities.length; i++) {
                        subSpecialityString += ', ' + subspecialities[i];
                    }

                    const recommendationBox = <Button key={index} onClick={(e) => this.handleCarouselButtonClick(recommendedPendingCase._id)} className="carousel-button" bsSize="large">
                        <img src="./approach1.jpg" alt={recommendedPendingCase.title}/>
                        <h3>{recommendedPendingCase.title}</h3>
                        <h4>{recommendedPendingCase.speciality}</h4>
                        <h4>{subSpecialityString}</h4>
                    </Button>;

                    const animationStyles = [Zoom, Flip, Rotate, Bounce, Slide, Roll, LightSpeed];
                    const animationStyle = animationStyles[Math.floor(Math.random()*animationStyles.length)];
                    let recommendationAnimation = <Zoom left>
                        {recommendationBox}
                    </Zoom>;
                    if(animationStyle === Flip) {
                        recommendationAnimation = <Flip left>
                            {recommendationBox}
                        </Flip>;
                    }
                    if(animationStyle === Rotate) {
                        recommendationAnimation = <Rotate top left>
                            {recommendationBox}
                        </Rotate>;
                    }
                    if(animationStyle === Bounce) {
                        recommendationAnimation = <Bounce left>
                            {recommendationBox}
                        </Bounce>;
                    }
                    if(animationStyle === Slide) {
                        recommendationAnimation = <Slide left>
                            {recommendationBox}
                        </Slide>;
                    }
                    if(animationStyle === Roll) {
                        recommendationAnimation = <Roll left>
                            {recommendationBox}
                        </Roll>;
                    }
                    if(animationStyle === LightSpeed) {
                        recommendationAnimation = <LightSpeed left>
                            {recommendationBox}
                        </LightSpeed>;
                    }
                    return(
                        <div className="col-md-4">
                            {recommendationAnimation}
                        </div>
                    );
                }
                return(
                    <Carousel.Item className="carousel-item">
                        {recommendedCasesV2}
                    </Carousel.Item>
                );
            });
        }
        return;
    };

    renderRecommendations = () => {
        switch(this.state.recommendedPendingCases) {
            case null:
                return;
            default:
                const recommendedPendingCases = this.state.recommendedPendingCases.map((recommendedPendingCase, index) => {
                    if(index < 3) {
                        const subspecialities = recommendedPendingCase.subspeciality;
                        let subSpecialityString = subspecialities[0];
                        for(let i = 1; i < subspecialities.length; i++) {
                            subSpecialityString += ', ' + subspecialities[i];
                        }

                        const recommendationBox = <Button key={index} onClick={(e) => this.handleCarouselButtonClick(recommendedPendingCase._id)} className="carousel-button" bsSize="large">
                            <img src="./approach1.jpg" alt={recommendedPendingCase.title}/>
                            <h3>{recommendedPendingCase.title}</h3>
                            <h4>{recommendedPendingCase.speciality}</h4>
                            <h4>{subSpecialityString}</h4>
                        </Button>;

                        const animationStyles = [Zoom, Flip, Rotate, Bounce, Slide, Roll, LightSpeed];
                        const animationStyle = animationStyles[Math.floor(Math.random()*animationStyles.length)];
                        let recommendationAnimation = <Zoom left>
                            {recommendationBox}
                        </Zoom>;
                        if(animationStyle === Flip) {
                            recommendationAnimation = <Flip left>
                                {recommendationBox}
                            </Flip>;
                        }
                        if(animationStyle === Rotate) {
                            recommendationAnimation = <Rotate top left>
                                {recommendationBox}
                            </Rotate>;
                        }
                        if(animationStyle === Bounce) {
                            recommendationAnimation = <Bounce left>
                                {recommendationBox}
                            </Bounce>;
                        }
                        if(animationStyle === Slide) {
                            recommendationAnimation = <Slide left>
                                {recommendationBox}
                            </Slide>;
                        }
                        if(animationStyle === Roll) {
                            recommendationAnimation = <Roll left>
                                {recommendationBox}
                            </Roll>;
                        }
                        if(animationStyle === LightSpeed) {
                            recommendationAnimation = <LightSpeed left>
                                {recommendationBox}
                            </LightSpeed>;
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
                    <Carousel className="carousel">
                        <Carousel.Item className="carousel-item">
                            {recommendedPendingCases}
                        </Carousel.Item>
                        {this.renderCarousel2()}
                    </Carousel>
                );
        }
    };

    render() {
        switch(this.state.redirectToVetting) {
            case true:
                return(
                    <Redirect to={{
                        pathname: "/vetting",
                        caseId: this.state.caseId
                    }} />
                );
            default:
                let imgUrl = './homepage.png';
                return(
                    <div className="container-fluid">
                        <div className="text-center">
                            <h1 style={{color: "#199ED8", fontWeight: "bold", marginTop: "0"}}>Pending Cases</h1>
                        </div>

                        {this.renderRecommendations()}

                        <div style={{backgroundImage: 'url(' + imgUrl + ')', backgroundSize: 'cover',
                            height: "350px", textAlign: "center", color: "white"}}>
                            <h1 style={{paddingTop: "7%", fontWeight: "bold"}}>Upload Case</h1>
                            <hr style={{borderColor: "white", borderWidth: "5px", marginTop: "1%", width: "70%"}}/>
                            <p>Description of case upload</p><br/>
                            <NavLink to='/upload'>
                                <Button style={{background: "#199ED8", color: 'white', border: "0", width: "8em",
                                    height: "3em", verticalAlign: "center"}}>
                                    <h4 style={{padding: "0", margin: "0"}}>Upload</h4>
                                </Button>
                            </NavLink>
                        </div>
                        <br/>
                        <div >
                            <Col sm={6} style={{backgroundColor: "#F7F7F7", height: "180px"}}>
                                <h3 style={{marginLeft: "3%", paddingTop: "3%"}}>FOLLOW US</h3>
                                <a href="https://www.facebook.com/medsense/">
                                    <Image src="./facebook.png" alt="Medsense Facebook" style={{width: "3em", marginLeft: "8%" }}/>
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
                    </div>
                );
        }
    }
}

export default ProfessorHome;