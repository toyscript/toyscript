import React, { useState } from "react";
import { Container, Tab, Tabs } from "react-bootstrap";

import "../contents.css"
import Summary from "./Summary";

function ControlledTabs() {
  const [key, setKey] = useState('home');


  return (
    <Container>
      <Tabs
        className="Tabs"
        activeKey={key}
        onSelect={(k) => setKey(k)}
      >
        <Tab id="summary" eventKey="summary" title="Summary">
          <Container style={{backgroundColor:"rgb(246, 238, 204)"}}>
            <Summary />
          </Container>
        </Tab>
        <Tab id="character" eventKey="character" title="Character">
          <Container>
            <p style={{backgroundColor:"rgb(246, 238, 204)"}}>
              character page
            </p>
          </Container>
        </Tab>
        <Tab id="place" eventKey="place" title="Place">
          <Container>
            <canvas style={{backgroundColor:"rgb(246, 238, 204)"}}>
              place page
            </canvas>
          </Container>
        </Tab>
        <Tab id="time" eventKey="time" title="Time">
          <p style={{backgroundColor:"rgb(246, 238, 204)"}}>time page</p>
        </Tab>
      </Tabs>
    </Container>
    
  );
}

export default ControlledTabs;