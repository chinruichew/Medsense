import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, MenuItem } from 'react-bootstrap';

class Header extends Component {
    renderContent() {
        return(
            <Nav pullRight>
                <NavDropdown eventKey={2} title="Login/Sign Up" id="login-dropdown">
                    <MenuItem eventKey={2.3} href="/login">Login</MenuItem>
                    <MenuItem eventKey={2.4} href="/signup">Sign Up</MenuItem>
                </NavDropdown>
            </Nav>
        );
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

export default Header;