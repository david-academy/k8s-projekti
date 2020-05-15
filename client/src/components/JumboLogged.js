import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'

const JumboLogged = ({logout, username}) => {
    const styles = {
        container: {
            backgroundSize: 'cover',
            height: "128px",
            backgroundRepeat: 'no-repeat',
            backgroundColor: '#ededeb',
            borderRadius: "0px",
            textAlign: "center",
            color: 'black'
        }

    }
    return (


        <Navbar style={styles.container}>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Navbar.Brand>
                        <img
                            src="https://digia.com/Static/img/digia-logo.svg"
                            alt="logo"
                            width="103"
                            height="95" />
                <Nav className="justify-content-start">
                    BLOGS
                </Nav>
                    </Navbar.Brand>
                </Nav>
                <Nav>
                    <Nav.Link style={styles.container} className="justify-content-end">
                    <br />
                        User:
                        <br />
                        {username}
                        <br />
                        <span onClick={logout}>
                            <b>Logout</b>
                        </span>
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>

        </Navbar>

    )
}
export default JumboLogged