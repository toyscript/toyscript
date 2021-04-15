import React, { useState } from "react";
import { Container, Tab, Tabs } from "react-bootstrap";

import "../contents.css"
import Summary from "./Summary";
import Place from "./Place";
import Time from "./Time";
import Character from "./Character"
import Kakao from "./Kakao"
import Header from "./Header";

function ControlledTabs(prop) {
  let movieId = prop.location.pathname;
  // console.log(movieId) ///result/1212
  movieId = movieId.split('/')[2]; // 1212

  const [key, setKey] = useState('summary');


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
          <Summary movieId={movieId} />
        </Tab>
        <Tab id="character" eventKey="character" title="Character">
          <Character movieId={movieId} />
        </Tab>
        <Tab id="place" eventKey="place" title="Place">
          <Place movieId={movieId} />
        </Tab>
        <Tab id="time" eventKey="time" title="Time">
          <Time movieId={movieId} />
        </Tab>
      </Tabs>
    </Container>
    <Kakao />
    <br />
  </>
  );
}

export default ControlledTabs;