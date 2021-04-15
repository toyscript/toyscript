import React from "react";
import { Navbar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../footer.css";

function Footer() {
  return (
      <Navbar className="menuBar" expand="lg" sticky="bottom">
        <Navbar.Brand href="/aboutus">
          <img src="/images/aboutus.png" className="aboutus" alt="aboutus" />
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>copyright © 2021 LAM OR NOT LAM. All rights reserved. </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
  );
}

export default Footer;
