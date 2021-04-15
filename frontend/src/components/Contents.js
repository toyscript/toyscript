import React, { useState } from "react";
import { Container, Tab, Tabs } from "react-bootstrap";

import "../contents.css"
import Summary from "./Summary";
import Place from "./Place";
import Time from "./Time";

function ControlledTabs() {
  const [key, setKey] = useState('home');


  return (
    <>
      <Container className="Contents">
        <Tabs
          className="Tabs"
          activeKey={key}
          onSelect={(k) => setKey(k)}
        >
          <Tab id="summary" eventKey="summary" title="Summary">
            <Summary />
          </Tab>
          <Tab id="character" eventKey="character" title="Character">
            <Container>
              <p style={{backgroundColor:"rgb(246, 238, 204)"}}>
                character page
              </p>
            </Container>
          </Tab>
          <Tab id="place" eventKey="place" title="Place">
            <Place />
          </Tab>
          <Tab id="time" eventKey="time" title="Time">
            <Time />
          </Tab>
        </Tabs>
      </Container>

      <img
        src="/images/buzz.png"
        className="buzz"
        alt="helper buzz"
      />

    </>
  );
}

export default ControlledTabs;