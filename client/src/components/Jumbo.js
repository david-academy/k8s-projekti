import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'

const Jumbo = () => {
    const styles = {
        container: {
            backgroundSize: 'cover',
            height: "128px",
            backgroundRepeat: 'no-repeat',
            backgroundColor: '#ededeb',
            borderRadius: "0px",
            textAlign: "center",
            color: 'white'
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
                    </Navbar.Brand>
                </Nav>
                <Nav>
                
                </Nav>
            </Navbar.Collapse>

        </Navbar>

    )
}
export default Jumbo