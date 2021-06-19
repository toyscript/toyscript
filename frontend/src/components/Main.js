import React, { useEffect, useState } from "react";
import {
  Alert,
  Container
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/main.css";
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";
import { Link } from "react-router-dom";

function Main() {
  const MovieListApiUrl = `https://toyscriptapi.azurewebsites.net/api/movies`;
  const [term, setTerm] = useState("");
  const [movieIds, setMovieIds] = useState([]);
  const [movieTitles, setMovieTitles] = useState([]);

  // 사용자 input 을 query 검색어로.
  useEffect(() => {
    const search = async () => {
      await axios
        .get(MovieListApiUrl, {
          params: {
            query: term,
          },
        })
        .then((response) => {
          // console.log(response);
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
      // 없거나 여러개일 때?
      alert("영화 제목을 다시 확인해주세요.")
    }
  }

  let movieIdString = movieIds.toString();
  // console.log(movieIdString)
  

  return (
    <>
    {/* HEADER */}
      <Header />
      <main id="main">
        {/* LOGO */}
        <Container>
          <center>
            <a href="/">
              <img src="/images/logo.png" className="logo" alt="logo" />
            </a>
          </center>
        </Container>
        {/* SEARCH BAR */}
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
        {/* 검색바 밑에 DB에 있고, 검색어와 부분 일치하는 영화 목록 보여주기 */}
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
