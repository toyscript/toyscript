import React, { useEffect, useState } from "react";
import {
  Alert,
  Container
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../main.css";
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";
import { Link } from "react-router-dom";

function Main() {
  const MovieListApiUrl = `http://elice-kdt-ai-track-vm-da-04.koreacentral.cloudapp.azure.com:5000/api/movies`;
  const [term, setTerm] = useState("");
  const [movieIds, setMovieIds] = useState([]);
  const [movieTitles, setMovieTitles] = useState([]);

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
          let movieTitleList = [];
          for (let dataObj of response.data) {
            movieIdList.push(dataObj.movieId);
            movieTitleList.push(dataObj.title);
          }
          setMovieIds(movieIdList);
          setMovieTitles(movieTitleList);
        });
    };
    if (term) {
      search();
    }
  }, [term]);

  const handleGoClick = (movieIds) => {
    if (movieIds.length === 0 || movieIdString.includes(',')) {
      alert("영화 제목을 다시 확인해주세요.")
    }
  }

  let movieIdString = movieIds.toString();
  

  return (
    <>
      <Header />
      <main id="main">
        <Container>
          <center>
            <a href="/">
              <img src="/images/logo.png" className="logo" alt="logo" />
            </a>
          </center>
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
              {movieIds.length === 0 || movieIdString.includes(',')?
              <Link to="/" onClick={() => handleGoClick(movieIds)}> Go!</Link>
              :
              <Link to={`result/${movieIds}`}> Go!</Link>}
            </div>
          </div>
        </div>
            {term.length === 0?
            ""
            :
            movieTitles.map((movietitle) => {
              return (
                <div className="d-flex justify-content-center">
                  <ul>
                  <li>{movietitle}</li> 
                </ul>
                </div>
                
              );
            })}
      </main>
      <Footer />
    </>
  );
}

export default Main;
