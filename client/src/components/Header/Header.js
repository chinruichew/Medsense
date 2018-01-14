import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Navbar, Nav, NavDropdown, MenuItem, NavItem, Image} from 'react-bootstrap';
import {NavLink} from "react-router-dom";

class Header extends Component {
    renderContent() {
        switch (this.props.auth) {
            case null:
                return;
            case false:
                return(
                    <Nav pullRight>
                        <NavItem className="navItem" eventKey={1}><NavLink to="/acknowledgements">Acknowledgements</NavLink></NavItem>
                        <NavDropdown className="navItem" eventKey={2} title="Login/Sign Up" id="login-dropdown">
                            <MenuItem eventKey={2.1}><NavLink to="/login">Login</NavLink></MenuItem>
                            <MenuItem eventKey={2.2}><NavLink to="/signup">Sign Up</NavLink></MenuItem>
                        </NavDropdown>
                    </Nav>
                );
            default:
                // Check for user type
                switch (this.props.auth.usertype) {
                    case 'professor':
                        return(
                            <Nav pullRight>
                                <NavItem className="navItem" eventKey={2}><NavLink to="/upload">Case Upload</NavLink></NavItem>
                                <NavItem className="navItem" eventKey={3}><NavLink to="/vetting">Case Vetting</NavLink></NavItem>
                                <NavItem className="navItem" eventKey={4}><NavLink to="/forum">Discussion Forum</NavLink></NavItem>
                                <NavItem className="navItem" eventKey={5}><NavLink to="/dashboard">Dashboard</NavLink></NavItem>
                                <NavItem className="navItem" eventKey={6}><NavLink to="/acknowledgements">Acknowledgements</NavLink></NavItem>
                                <NavItem className="navItem" eventKey={7} href="/api/logout">Logout</NavItem>
                                <NavLink to="/profile"><Image src={this.props.auth.profilepicture} className="img-circle" style={{height: '45px', width: '45px'}} /></NavLink>
                            </Nav>
                        );
                    case 'student':
                        return(
                            <Nav pullRight>
                                <NavItem className="navItem" eventKey={2}><NavLink to="/case_challenge">Case Challenge</NavLink></NavItem>
                                <NavItem className="navItem" eventKey={3}><NavLink to="/upload">Case Upload</NavLink></NavItem>
                                <NavItem className="navItem" eventKey={4}><NavLink to="/forum">Discussion Forum</NavLink></NavItem>
                                <NavItem className="navItem" eventKey={5}><NavLink to="/dashboard">Dashboard</NavLink></NavItem>
                                <NavItem className="navItem" eventKey={6}><NavLink to="/acknowledgements">Acknowledgements</NavLink></NavItem>
                                <NavItem className="navItem" eventKey={7} href="/api/logout">Logout</NavItem>
                                <NavLink to="/profile"><Image src={this.props.auth.profilepicture} className="img-circle" style={{height: '45px', width: '45px'}} /></NavLink>
                            </Nav>
                        );
                    default:
                        return;
                }
        }
    }

    renderLogo() {
        switch(this.props.auth) {
            case null:
                return;
            case false:
                return(
                    <NavLink to="/" style={{padding: '0px'}}><Image src="./medsense_logo.png" style={{height: '60px', width: '200px', padding: '0px'}}/></NavLink>
                );
            default:
                return(
                    <NavLink to="/home" style={{padding: '0px'}}><Image src="./medsense_logo.png" style={{height: '60px', width: '200px', padding: '0px'}}/></NavLink>
                );
        }
    }

    render() {
        return (
            <Navbar id="navbar" fixedTop={false}>
                <Navbar.Header>
                    <Navbar.Brand>
                        {this.renderLogo()}
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