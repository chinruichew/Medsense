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
                        <NavDropdown eventKey={2} title="Login/Sign Up" id="login-dropdown">
                            <MenuItem eventKey={2.3} href="/login">Login</MenuItem>
                            <MenuItem eventKey={2.4} href="/signup">Sign Up</MenuItem>
                        </NavDropdown>
                    </Nav>
                );
            default:
                return(
                    <Nav pullRight>
                        <NavItem eventKey={2} href="/api/logout">Logout</NavItem>
                    </Nav>
                );
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