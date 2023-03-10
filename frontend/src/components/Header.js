import React from "react"
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { LinkContainer } from "react-router-bootstrap"
import { useNavigate } from "react-router-dom"

import { logout } from "../store/actions/userAction"
const Header = () => {
  const dispatch = useDispatch()
  const nav = useNavigate()
  const { userInfo } = useSelector((state) => state.userLogin)
  const logoutHandler = () => {
    console.log("logggin out")
    dispatch(logout())
    nav("/login")
  }
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>React-Bootstrap</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i> Cart
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                // <NavDropdown title={userInfo.name} id="username">
                //   <LinkContainer to="/profile">
                //     <NavDropdown.Item>Profile</NavDropdown.Item>
                //   </LinkContainer>
                //   <LinkContainer onClick={() => dispatch(logout)}>
                //     <NavDropdown.Item>Logout</NavDropdown.Item>
                //   </LinkContainer>
                // </NavDropdown>
                <>
                  <NavDropdown title={userInfo.name} id="username">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>

                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user"></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
