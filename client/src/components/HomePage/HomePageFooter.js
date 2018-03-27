import React, { Component } from 'react';
import {Col, Image, Row} from "react-bootstrap";

class HomePageFooter extends Component {
    render() {
        return(
            <div className="footer-row">
                <Col md={6} className="footer-col-left">
                    <h3>FOLLOW US</h3>
                    <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/medsense/">
                        <Image src="./facebook.png" alt="Medsense Facebook" className="footer-fb-img" />
                    </a>
                </Col>
                <Col md={2} mdOffset={4} className="footer-col-right text-center">
                    <h3>VERSION</h3>
                    <h5>Version 2.0
                        <br/>Last Updated: 1 April 2018
                    </h5>
                </Col>
            </div>
        );
    }
}

export default HomePageFooter;