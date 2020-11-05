import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, Form } from 'react-bootstrap';
import UserDropdown from '../UserDropdown';
import { isBrowser, isMobile } from "react-device-detect";

const navLinkStyle = {
    color: 'white',
    textDecoration: 'none'
}

const activeLinkStyle = {
    fontWeight: 'bold'
}

const marginLeft = {
    marginLeft: 50
}

const bardsStyle = {
    color: 'white'
}

const browserBarsStyle = {
    ...marginLeft, 
    ...bardsStyle
}

const titleStyle = {
    fontSize: 18,
    marginRight: 100,
    fontWeight: 'bold'
}

const Header = ({ toggleSidebar }) => {
    return (
        <Navbar bg="primary" variant="dark">
            <Nav className="mr-auto">
                <Nav.Link as={NavLink} to="/" style={navLinkStyle} exact activeStyle={activeLinkStyle}>
                    <span style={titleStyle}>
                        CXP
                    </span>
                </Nav.Link>
                {
                    isBrowser &&
                    <Nav.Link style={browserBarsStyle} onClick={toggleSidebar}>
                        <i className="fa fa-bars"></i>
                    </Nav.Link>
                }
                
            </Nav>
            <Form inline>
                {
                    isMobile &&
                    <Nav.Link style={bardsStyle} onClick={toggleSidebar}>
                        <i className="fa fa-bars"></i>
                    </Nav.Link>
                }
                <UserDropdown />
            </Form>
        </Navbar>
    )
}

export default Header;