import React, { useEffect, useState } from "react";
import {
  Container,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../main.css";
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";

function Main() {
  const MovieListApiUrl = `http://elice-kdt-ai-track-vm-da-04.koreacentral.cloudapp.azure.com:5000/api/movies`;
  const [term, setTerm] = useState("");
  const [movieIds, setMovieIds] = useState([]);

  useEffect(() => {
    const search = async () => {
      await axios
        .get(MovieListApiUrl, {
          params: {
            query: term,
          },
        })
        .then((response) => {
          let movieIdList = [];
          for (let dataObj of response.data) {
            movieIdList.push(dataObj.movieId);
          }
          setMovieIds(movieIdList);
        });
    };
    if (term) {
      search();
    }
  }, [term]);

  return (
    <>
      <Header />

      <br />
      <main id="main">
      <Container>
        <center>
          <a href="/">
            <img src="/images/logo.png" className="logo" alt="logo" />
          </a>
        </center>
        {/* <img src="/images/woody.png" className="woody" alt="leaning Woody" /> */}
      </Container>

      <div className="container">
        <div className="d-flex justify-content-center">
          <div className="searchbar">
            <input
              className="search_input"
              type="text"
              placeholder="영화 제목을 입력하세요 !"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              />
            <a href={`result/${movieIds}`} class="search_icon">
              Go!
            </a>
          </div>
        </div>
      </div>

      </main>
      <Footer />
    </>
  );
}

export default Main;
