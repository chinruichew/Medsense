import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, MenuItem, NavItem } from 'react-bootstrap';

class Header extends Component {
    renderContent() {
        switch (this.props.auth) {
            case null:
                return;
            case false:
                return(
                    <Nav pullRight>
                        <NavItem eventKey={1}><Link to="/acknowledgement">Acknowledgement</Link></NavItem>
                        <NavDropdown eventKey={2} title="Login/Sign Up" id="login-dropdown">
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
                                <NavItem eventKey={1}><Link to="/upload">Case Upload</Link></NavItem>
                                <NavItem eventKey={2}><Link to="/vetting">Case Vetting</Link></NavItem>
                                <NavItem eventKey={3}><Link to="/forum">Discussion Forum</Link></NavItem>
                                <NavItem eventKey={4}><Link to="/profile">My Profile</Link></NavItem>
                                <NavItem eventKey={5}><Link to="/acknowledgement">Acknowledgement</Link></NavItem>
                                <NavItem eventKey={6} href="/api/logout">Logout</NavItem>
                            </Nav>
                        );
                    case 'student':
                        return(
                            <Nav pullRight>
                                <NavItem eventKey={1}><Link to="/upload">Case Upload</Link></NavItem>
                                <NavItem eventKey={3}><Link to="/forum">Discussion Forum</Link></NavItem>
                                <NavItem eventKey={4}><Link to="/profile">My Profile</Link></NavItem>
                                <NavItem eventKey={5}><Link to="/acknowledgement">Acknowledgement</Link></NavItem>
                                <NavItem eventKey={6} href="/api/logout">Logout</NavItem>
                            </Nav>
                        );
                }
        }
    }

    render() {
        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">Medsense</Link>
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