import React, { useState } from "react";
import { Container, Tab, Tabs } from "react-bootstrap";

import "../contents.css"
import Summary from "./Summary";
import Place from "./Place";
import Time from "./Time";
import Character from "./Character"
import Kakao from "./Kakao"
<<<<<<< HEAD
import Header from "./Header";
<<<<<<< HEAD
import CharacterEmotion from "./CharacterEmotion"
import CharacterWordCloud from "./CharacterWordCloud";
=======
>>>>>>> beaf02d2fc3ba123fbc240ea19855c5de8a6f893
=======
import CharacterEmotion from "./CharacterEmotion"
>>>>>>> 4015b76c6252a1cf4a9f3ef3502f0dab96bc3514

function ControlledTabs(prop) {
  let movieId = prop.location.pathname;
  // console.log(movieId) ///result/1212
  movieId = movieId.split('/')[2]; // 1212

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
          <Summary movieId={movieId} />
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
            {/* <Kakao /> */}
            {/* <Character /> */}
            <br />
          </ Container>
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