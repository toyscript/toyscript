import React from "react";
import { Button, Container, FormControl, InputGroup, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import "../main.css"
import Header from "./Header";
import Contents from "./Contents";
import Footer from "./Footer";


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
            placeholder=" 영화 제목을 입력하세요 !"
            aria-describedby="basic-addon2"
          />
          <InputGroup.Append>
            <a href="#result"><Button variant="outline-danger">GO!</Button></a>
          </InputGroup.Append>
        </InputGroup>
      </Container>

      <hr id="result"/>
      <br />
      <br />
      <br />
      <Contents/>
      <hr/>
      <Footer />
    </>
  )
}


export default Main;