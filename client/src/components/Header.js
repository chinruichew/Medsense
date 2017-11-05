import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, NavDropdown, MenuItem, NavItem, Image } from 'react-bootstrap';

class Header extends Component {
    renderContent() {
        switch (this.props.auth) {
            case null:
                return;
            case false:
                return(
                    <Nav pullRight>
                        <NavItem className="navItem" eventKey={1} href="/acknowledgement" >Acknowledgement</NavItem>
                        <NavDropdown className="navItem" eventKey={2} title="Login/Sign Up" id="login-dropdown">
                            <MenuItem eventKey={2.1} href="/login">Login</MenuItem>
                            <MenuItem eventKey={2.2} href="/signup">Sign Up</MenuItem>
                        </NavDropdown>
                    </Nav>
                );
            default:
                // Check for user type
                switch (this.props.auth.usertype) {
                    case 'professor':
                        return(
                            <Nav pullRight>
                                <NavItem className="navItem" eventKey={1} href="/upload">Case Upload</NavItem>
                                <NavItem className="navItem" eventKey={2} href="/vetting">Case Vetting</NavItem>
                                <NavItem className="navItem" eventKey={3} href="/forum">Discussion Forum</NavItem>
                                <NavItem className="navItem" eventKey={4} href="/professor_dashboard">Dashboard</NavItem>
                                <NavItem className="navItem" eventKey={5} href="/acknowledgement">Acknowledgement</NavItem>
                                <NavItem className="navItem" eventKey={6} href="/api/logout">Logout</NavItem>
                                <img src="https://s3-ap-southeast-1.amazonaws.com/profile-picture-images/user_profile.jpg" className="img-circle" style={{height: '45px', width: '45px'}} />
                            </Nav>
                        );
                    case 'student':
                        return(
                            <Nav pullRight>
                                <NavItem className="navItem" eventKey={1} href="/upload">Case Challenge</NavItem>
                                <NavItem className="navItem" eventKey={2} href="/upload">Case Upload</NavItem>
                                <NavItem className="navItem" eventKey={3} href="/forum">Discussion Forum</NavItem>
                                <NavItem className="navItem" eventKey={4} href="/student_dashboard">Dashboard</NavItem>
                                <NavItem className="navItem" eventKey={5} href="/acknowledgement">Acknowledgement</NavItem>
                                <NavItem className="navItem" eventKey={6} href="/api/logout">Logout</NavItem>
                                <img src="https://s3-ap-southeast-1.amazonaws.com/profile-picture-images/user_profile.jpg" className="img-circle" style={{height: '45px', width: '45px'}} />
                            </Nav>
                        );
                }
        }
    }

    render() {
        return (
            <Navbar id="navbar">
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/" style={{padding: '0px'}}><img src="./medsense_logo.png" style={{height: '60px', width: '200px', padding: '0px'}}/></a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    {this.renderContent()}
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(Header);