import React, { Component } from 'react';
import {Button, Carousel, Col} from 'react-bootstrap';
import {NavLink} from "react-router-dom";
import "./Home.css";

class ProfessorHome extends Component {
    state = {
        unvetCases: this.props.unvetCases
    };

    render() {
        switch(this.state.unvetCases) {
            case null:
                return;
            default:
                const unvetCases = this.state.unvetCases;
                const userSubSpeciality = this.props.user.subspeciality;
                let numCasesPending = 0;
                let toVet = false;
                for(let i = 0; i < unvetCases.length; i++) {
                    const caseSubspecialities = unvetCases[i].subspeciality;
                    for(let j = 0; j < caseSubspecialities.length; j++) {
                        const caseSubspeciality = caseSubspecialities[j];
                        for(let k = 0; k < userSubSpeciality.length; k++) {
                            if(caseSubspeciality === userSubSpeciality[k]) {
                                toVet = true;
                            }
                        }
                    }
                    if(toVet) {
                        numCasesPending += 1;
                    }
                    toVet = false;
                }
                let imgUrl = './homepage.png'
                return(
                    <div className="container-fluid">
                        <div className="text-center">
                            <h1 style={{color: "#199ED8", fontWeight: "bold", marginTop: "0"}}>Pending Cases</h1>
                        </div>

                        <Carousel style={{height: "25em"}} className="carousel">
                            <Carousel.Item style={{paddingLeft: "12%", paddingTop: "3%"}}>
                                <Button style={{background: "white", color: 'black', width: "14em", height: "13em", marginRight: "8%"}} bsSize="large">
                                    <img src="./approach1.jpg" alt="" style={{height:"8em"}}/>
                                    <h3 style={{fontWeight: "bold", margin: "0"}}>Case Title</h3>
                                    <h4 style={{margin: "0"}}>Speciality</h4>
                                    <h4 style={{margin: "0"}}>Sub-speciality</h4>
                                </Button>
                                <Button style={{background: "white", color: 'black', width: "14em", height: "13em", marginRight: "8%"}} bsSize="large">
                                    <img src="./approach1.jpg" alt="" style={{height:"8em"}}/>
                                    <h3 style={{fontWeight: "bold", margin: "0"}}>Case Title</h3>
                                    <h4 style={{margin: "0"}}>Speciality</h4>
                                    <h4 style={{margin: "0"}}>Sub-speciality</h4>
                                </Button>
                                <Button style={{background: "white", color: 'black', width: "14em", height: "13em", marginRight: "8%"}} bsSize="large">
                                    <img src="./approach1.jpg" alt="" style={{height:"8em"}}/>
                                    <h3 style={{fontWeight: "bold", margin: "0"}}>Case Title</h3>
                                    <h4 style={{margin: "0"}}>Speciality</h4>
                                    <h4 style={{margin: "0"}}>Sub-speciality</h4>
                                </Button>
                            </Carousel.Item>
                            <Carousel.Item style={{paddingLeft: "12%", paddingTop: "3%"}}>
                                <Button style={{background: "white", color: 'black', width: "15em", height: "13em", marginRight: "8%"}} bsSize="large">
                                    <img src="./approach1.jpg" alt="" style={{height:"8em"}}/>
                                    <h3 style={{fontWeight: "bold", margin: "0"}}>Case Title</h3>
                                    <h4 style={{margin: "0"}}>Speciality</h4>
                                    <h4 style={{margin: "0"}}>Sub-speciality</h4>
                                </Button>
                                <Button style={{background: "white", color: 'black', width: "15em", height: "13em", marginRight: "8%"}} bsSize="large">
                                    <img src="./approach1.jpg" alt="" style={{height:"8em"}}/>
                                    <h3 style={{fontWeight: "bold", margin: "0"}}>Case Title</h3>
                                    <h4 style={{margin: "0"}}>Speciality</h4>
                                    <h4 style={{margin: "0"}}>Sub-speciality</h4>
                                </Button>
                            </Carousel.Item>
                        </Carousel>

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
                    </div>
                );
        }
    }
}

export default ProfessorHome;