import React from "react";
import { Button, Container, FormControl, InputGroup, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import "../main.css"
import Header from "./Header";


function Main() {

  return(
    <>
      <Header/>

      <br />
      <center>
        <Nav.Link href="/">
          <img
            src="/images/logo.png"
            className="logo"
            alt="logo"
          />
        </Nav.Link>
      </center>

      <Container className="search">
        <InputGroup>
          <FormControl
            placeholder="Let's Search !"
            aria-describedby="basic-addon2"
          />
          <InputGroup.Append>
            <Button variant="outline-danger">GO!</Button>
          </InputGroup.Append>
        </InputGroup>
      </Container>

      <hr/>
    </>
  )
}


export default Main;