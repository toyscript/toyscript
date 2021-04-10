import React, { useState } from "react";
import { Container, Tab, Tabs } from "react-bootstrap";

import "../contents.css"
import Place from "./Place";
import Time from "./Time";

function ControlledTabs() {
  const [key, setKey] = useState('home');

  return (
    <Container>
      <Tabs
        className="contents"
        activeKey={key}
        onSelect={(k) => setKey(k)}
      >
        <Tab id="summary" eventKey="summary" title="Summary">
          <p style={{backgroundColor:"rgb(246, 238, 204)"}}>summary page
          </p>
        </Tab>
        <Tab id="character" eventKey="character" title="Character">
          <p style={{backgroundColor:"rgb(246, 238, 204)"}}>character page</p>
        </Tab>
        <Tab id="place" eventKey="place" title="Place">
          <Place />
        </Tab>
        <Tab id="time" eventKey="time" title="Time">
          <Time />
        </Tab>
      </Tabs>
    </Container>
    
  );
}

export default ControlledTabs;