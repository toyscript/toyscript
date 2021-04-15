import React from "react";
import { Button, Container, FormControl, InputGroup, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../main.css"
import Header from "./Header";
import Contents from "./Contents";
import Footer from "./Footer";
import { Route, Link } from 'react-router-dom';


function Main() {

  return(
    <>
      <Header/>

      <br />
      <Container>
        <center>
          <a href="/">
            <img
              src="/images/logo.png"
              className="logo"
              alt="logo"
            />
          </a>
        </center>
        <img 
          src="/images/woody.png"
          className="woody"
          alt="leaning Woody"
        /> 
      </Container>

      <Container className="search">
        <InputGroup>
          <FormControl
            placeholder=" 영화 제목을 입력하세요 !"
            aria-describedby="basic-addon2"
          />
          <InputGroup.Append>
            <Link to="/result"><Button className="go-button" variant="outline-danger">GO!</Button></Link>
          </InputGroup.Append>
        </InputGroup>
      </Container>

      <br/>
      <br/>
      <br/>

      <Footer />
    </>
  )
}


export default Main;