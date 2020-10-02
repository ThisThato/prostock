import React, { Fragment } from "react";
import {
  Navbar,
  Nav,
  Container,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
// import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Fragment>
      <header>
        <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
          <Container>
            <Navbar.Brand href='/'>ProStock</Navbar.Brand>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
              <Nav className='ml-auto'>
                <Nav.Link href='/cart'>
                  {" "}
                  <i className='fas fa-shopping-cart'></i>Cart
                </Nav.Link>
                <Nav.Link href='/login'>
                  <i className='fas fa-user'></i>Sign In
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    </Fragment>
  );
};

export default Header;
