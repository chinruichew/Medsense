import React, { Component } from 'react';
import { Tabs, Tab, Thumbnail, Row, Col, Image } from 'react-bootstrap';

import './Acknowledgement.css';

class Acknowledgement extends Component {
    render() {
        return(
            <div style={{marginLeft: "4%", marginRight: "4%"}}>
                <Tabs defaultActiveKey={1} style={{marginTop: "3%", fontSize: "large"}}>
                    <Tab eventKey={1} title="NUS">
                        <h2 style={{textAlign: "center", color: "#199ED8", fontWeight: "bold",
                            marginBottom: "0", marginTop: "2%"}}>PROFESSORS</h2>
                        <hr style={{borderColor: "#199ED8", borderWidth: "3px", marginTop: "1%"}}/>
                        <div style={{padding: "2%"}}>
                            <Row>
                                <Col sm={4}>
                                    <center>
                                        <Thumbnail style={{width: "17em", height: "17em"}}>
                                            <Image src="https://s3-ap-southeast-1.amazonaws.com/medsense-team-images/nus-team-images/proftay.png" circle style={{width: "14em", height: "14em"}} />
                                            <h5 style={{textAlign: "center", fontSize: "100%"}}>Prof. Tay Sook Muay</h5>
                                        </Thumbnail>
                                    </center>
                                </Col>
                            </Row>
                        </div>

                        <h2 style={{textAlign: "center", color: "#199ED8", fontWeight: "bold",
                            marginBottom: "0", marginTop: "2%"}}>TEAM MEDSENSE</h2>
                        <hr style={{borderColor: "#199ED8", borderWidth: "3px", marginTop: "1%"}}/>
                        <div style={{padding: "2%"}}>
                            <Row>
                                <Col sm={4}>
                                    <center>
                                        <Thumbnail style={{width: "17em", height: "17em"}}>
                                            <Image src="https://s3-ap-southeast-1.amazonaws.com/medsense-team-images/nus-team-images/jamie.png" circle style={{width: "14em", height: "14em"}} />
                                            <h5 style={{textAlign: "center", fontSize: "100%"}}>Kee Xiang Lee Jamie</h5>
                                        </Thumbnail>
                                    </center>
                                </Col>
                                <Col sm={4}>
                                    <center>
                                        <Thumbnail style={{width: "17em", height: "17em"}}>
                                            <Image src="https://s3-ap-southeast-1.amazonaws.com/medsense-team-images/nus-team-images/justin.png" circle style={{width: "14em", height: "14em"}} />
                                            <h5 style={{textAlign: "center", fontSize: "100%"}}>Justin Ng Choon Hwee</h5>
                                        </Thumbnail>
                                    </center>
                                </Col>
                                <Col sm={4}>
                                    <center>
                                        <Thumbnail style={{width: "17em", height: "17em"}}>
                                            <Image src="https://s3-ap-southeast-1.amazonaws.com/medsense-team-images/nus-team-images/andrea.png" circle style={{width: "14em", height: "14em"}} />
                                            <h5 style={{textAlign: "center", fontSize: "100%"}}>Andrea Ang Jing Shi</h5>
                                        </Thumbnail>
                                    </center>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={4}>
                                    <center>
                                        <Thumbnail style={{width: "17em", height: "17em"}}>
                                            <Image src="https://s3-ap-southeast-1.amazonaws.com/medsense-team-images/nus-team-images/jeremy.png" circle style={{width: "14em", height: "14em"}} />
                                            <h5 style={{textAlign: "center", fontSize: "100%"}}>Jeremy Teoh</h5>
                                        </Thumbnail>
                                    </center>
                                </Col>
                                <Col sm={4}>
                                    <center>
                                        <Thumbnail style={{width: "17em", height: "17em"}}>
                                            <Image src="https://s3-ap-southeast-1.amazonaws.com/medsense-team-images/nus-team-images/philip.png" circle style={{width: "14em", height: "14em"}} />
                                            <h5 style={{textAlign: "center", fontSize: "100%"}}>Philip Ong Zheng Yang</h5>
                                        </Thumbnail>
                                    </center>
                                </Col>
                                <Col sm={4}>
                                    <center>
                                        <Thumbnail style={{width: "17em", height: "17em"}}>
                                            <Image src="https://s3-ap-southeast-1.amazonaws.com/medsense-team-images/nus-team-images/sarah.png" circle style={{width: "14em", height: "14em"}} />
                                            <h5 style={{textAlign: "center", fontSize: "100%"}}>Sarah Tham Zhuling</h5>
                                        </Thumbnail>
                                    </center>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={4}>
                                    <center>
                                        <Thumbnail style={{width: "17em", height: "17em"}}>
                                            <Image src="https://s3-ap-southeast-1.amazonaws.com/medsense-team-images/nus-team-images/lawrence.png" circle style={{width: "14em", height: "14em"}} />
                                            <h5 style={{textAlign: "center", fontSize: "100%"}}>Wong Wen Jun Lawrence</h5>
                                        </Thumbnail>
                                    </center>
                                </Col>
                            </Row>
                        </div>
                    </Tab>
                    <Tab eventKey={2} title="SMU">
                        <h2 style={{textAlign: "center", color: "#199ED8", fontWeight: "bold",
                            marginBottom: "0", marginTop: "2%"}}>SMU-TCS ICITY LAB</h2>
                        <hr style={{borderColor: "#199ED8", borderWidth: "3px", marginTop: "1%"}}/>
                        <div style={{padding: "2%"}}>
                            <Row>
                                <Col sm={4}>
                                    <center>
                                        <Thumbnail style={{width: "17em", height: "17em"}}>
                                            <Image src="https://s3-ap-southeast-1.amazonaws.com/medsense-team-images/icity-images/profhp.png" circle style={{width: "14em", height: "14em"}} />
                                            <h5 style={{textAlign: "center", fontSize: "100%"}}>Prof. Tan Hwee Pink</h5>
                                        </Thumbnail>
                                    </center>
                                </Col>
                                <Col sm={4}>
                                    <center>
                                        <Thumbnail style={{width: "17em", height: "17em"}}>
                                            <Image style={{width: "14em", height: "14em"}} src="https://s3-ap-southeast-1.amazonaws.com/medsense-team-images/icity-images/profhx.png" circle />
                                            <h5 style={{textAlign: "center", fontSize: "100%"}}>Prof. Tan Hwee-Xian</h5>
                                        </Thumbnail>
                                    </center>
                                </Col>
                                <Col sm={4}>
                                    <center>
                                        <Thumbnail style={{width: "17em", height: "17em"}}>
                                            <Image src="https://s3-ap-southeast-1.amazonaws.com/medsense-team-images/icity-images/icitybt.png" circle style={{width: "14em", height: "14em"}} />
                                            <h5 style={{textAlign: "center", fontSize: "100%"}}>Ng Boon Thai</h5>
                                        </Thumbnail>
                                    </center>
                                </Col>
                                <Col sm={4}>
                                    <center>
                                        <Thumbnail style={{width: "17em", height: "17em"}}>
                                            <Image src="https://s3-ap-southeast-1.amazonaws.com/medsense-team-images/icity-images/icitycris.png" circle style={{width: "14em", height: "14em"}} />
                                            <h5 style={{textAlign: "center", fontSize: "100%"}}>Cris Tan Jun Liang</h5>
                                        </Thumbnail>
                                    </center>
                                </Col>
                            </Row>
                        </div>

                        <h2 style={{textAlign: "center", color: "#199ED8", fontWeight: "bold",
                            marginBottom: "0", marginTop: "2%"}}>TEAM ZENITH</h2>
                        <hr style={{borderColor: "#199ED8", borderWidth: "3px", marginTop: "1%"}}/>
                        <div style={{padding: "2%"}}>
                            <Row>
                                <Col sm={4}>
                                    <center>
                                        <Thumbnail style={{width: "17em", height: "17em"}}>
                                            <Image src="https://s3-ap-southeast-1.amazonaws.com/medsense-team-images/zenith-team-images/amelia.jpg" circle style={{width: "14em", height: "14em"}} />
                                            <h5 style={{textAlign: "center", fontSize: "100%"}}>Lee Jing Hua Amelia</h5>
                                        </Thumbnail>
                                    </center>
                                </Col>
                                <Col sm={4}>
                                    <center>
                                        <Thumbnail style={{width: "17em", height: "17em"}}>
                                            <Image src="https://s3-ap-southeast-1.amazonaws.com/medsense-team-images/zenith-team-images/chinrui.jpg" circle style={{width: "14em", height: "14em"}} />
                                            <h5 style={{textAlign: "center", fontSize: "100%"}}>Chew Chin Rui</h5>
                                        </Thumbnail>
                                    </center>
                                </Col>
                                <Col sm={4}>
                                    <center>
                                        <Thumbnail style={{width: "17em", height: "17em"}}>
                                            <Image src="https://s3-ap-southeast-1.amazonaws.com/medsense-team-images/zenith-team-images/ervin.png" circle style={{width: "14em", height: "14em"}} />
                                            <h5 style={{textAlign: "center", fontSize: "100%"}}>Ervin Chong Sheng Loong</h5>
                                        </Thumbnail>
                                    </center>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={4}>
                                    <center>
                                        <Thumbnail style={{width: "17em", height: "17em"}}>
                                            <Image src="https://s3-ap-southeast-1.amazonaws.com/medsense-team-images/zenith-team-images/mingrui.png" circle style={{width: "14em", height: "14em"}} />
                                            <h5 style={{textAlign: "center", fontSize: "100%"}}>Huang Ming Rui</h5>
                                        </Thumbnail>
                                    </center>
                                </Col>
                                <Col sm={4}>
                                    <center>
                                        <Thumbnail style={{width: "17em", height: "17em"}}>
                                            <Image src="https://s3-ap-southeast-1.amazonaws.com/medsense-team-images/zenith-team-images/ricky.jpg" circle style={{width: "14em", height: "14em"}} />
                                            <h5 style={{textAlign: "center", fontSize: "100%"}}>Ricky Franslay</h5>
                                        </Thumbnail>
                                    </center>
                                </Col>
                                <Col sm={4}>
                                    <center>
                                        <Thumbnail style={{width: "17em", height: "17em"}}>
                                            <Image src="https://s3-ap-southeast-1.amazonaws.com/medsense-team-images/zenith-team-images/qimin.jpg" circle style={{width: "14em", height: "14em"}} />
                                            <h5 style={{textAlign: "center", fontSize: "100%"}}>Wang Qimin</h5>
                                        </Thumbnail>
                                    </center>
                                </Col>
                            </Row>
                        </div>
                    </Tab>
                    <Tab eventKey={3} title="Team">
                        <div className="container-fluid" style={{marginTop: '30px'}}>
                            <Row class="text-center">
                                <h2 style={{textAlign: "center", color: "#199ED8", fontWeight: "bold" }}>TEAM ZENITH FYP Final Presentation 2018</h2>
                                <hr style={{borderColor: "#199ED8", borderWidth: "3px", marginTop: "1%"}}/>
                                <div className="col-xs-12 col-md-offset-3 col-md-6">
                                    <div className="panel panel-default">
                                        <div className="team-panel-image">
                                            <Image src="https://s3-ap-southeast-1.amazonaws.com/medsense-team-images/combined-team-image.jpg" circle className="panel-image-preview"/>
                                        </div>
                                    </div>
                                </div>
                            </Row>
                        </div>
                    </Tab>
                </Tabs>
            </div>
        );
    }
}

export default Acknowledgement;