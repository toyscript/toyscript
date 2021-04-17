import React, { useState, useEffect } from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import axios from "axios";
import "../contents.css"
import Header from "./Header";
import Summary from "./Summary";
import Character from "./Character";
import Place from "./Place";
import Time from "./Time";
import Kakao from "./Kakao"


function ControlledTabs(prop) {
  let movieId = prop.location.pathname;
  movieId = movieId.split('/')[2];

  const [key, setKey] = useState('summary');

  const summaryApiUrl =
    `http://elice-kdt-ai-track-vm-da-04.koreacentral.cloudapp.azure.com:5000/api/movies/${movieId}`;

    const [author, setAuthor] = useState("");
    const [title, setTitle] = useState("");
    const [totalCharacters, setTotalCharacters] = useState(0);
    const [totalScenes, setTotalScenes] = useState(0);
    const [totalPlaces, setTotalPlaces] = useState(0);
  
    useEffect(() => {
      const fetchSummaryData = async () => {
        await axios.get(summaryApiUrl).then((response) => {
          setAuthor(response.data.author);
          setTitle(response.data.title);
          setTotalCharacters(response.data.totalCharacters);
          setTotalPlaces(response.data.totalPlaces);
          setTotalScenes(response.data.totalScenes);
        });
      };
      fetchSummaryData();
    }, []);

  return (
    <>
    <Header />
    <br/>
    <Container className="Contents">
      <Tabs
        className="Tabs"
        activeKey={key}
        onSelect={(k) => setKey(k)}
      >
        <Tab id="summary" eventKey="summary" title="Summary">
          <Summary 
            movieId={movieId}
            author={author}
            title={title}
            totalCharacters={totalCharacters}
            totalScenes={totalScenes}
            totalPlaces={totalPlaces}
          />
        </Tab>
        <Tab id="character" eventKey="character" title="Character">
          <Character 
            movieId={movieId} 
            title={title}
            totalCharacters={totalCharacters}
          />
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
