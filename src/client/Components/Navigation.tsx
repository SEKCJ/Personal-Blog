import React, { } from 'react';
import { Button, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { IAppProps } from '../App';

const Navigation: React.FC<IAppProps> = props => {

    return (
        <Navbar expand="lg" bg="success" variant="dark" className="sticky-top">
            <Navbar.Brand>Cesar's Blog</Navbar.Brand>
            <Navbar.Toggle aria-controls="blogNav" />
            <Navbar.Collapse id="blogNav">
                <Nav className="ml-auto">
                    <Nav.Link as={Link} to="/admin/post">New Blog</Nav.Link>
                    <Nav.Link as={Link} to="/">View Blogs</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Navigation;