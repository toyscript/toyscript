import React, { useState } from "react";
import { Container, Tab, Tabs } from "react-bootstrap";

import "../contents.css"
import Summary from "./Summary";
import Place from "./Place";
import Time from "./Time";
import Character from "./Character"
import Kakao from "./Kakao"
import Header from "./Header";
import CharacterEmotion from "./CharacterEmotion"
import CharacterWordCloud from "./CharacterWordCloud";

function ControlledTabs() {
  const [key, setKey] = useState('summary');

  const chartBackgroundColor = {
    backgroundColor: "white",
    borderRadius: "20px"
  };

  return (
    <>
    <Header />
    <br />
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
          <Container style={{ backgroundColor: "rgb(246, 233, 180)" }}>
            <br />
            <div style={chartBackgroundColor}>
              <div style={{ padding: "20px" }}>
                <p style={{ padding: "20px" }}>
                  <CharacterEmotion />
                  <CharacterWordCloud />
                </p>
              </div>
            </div>
            {/* <Character /> */}
            <br />
          </ Container>
        </Tab>
        <Tab id="place" eventKey="place" title="Place">
          <Place />
        </Tab>
        <Tab id="time" eventKey="time" title="Time">
          <Time />
        </Tab>
      </Tabs>
    </Container>
    <Kakao />
    <br />
  </>
  );
}

export default ControlledTabs;