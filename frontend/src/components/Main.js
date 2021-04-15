import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  FormControl,
  InputGroup,
  Nav,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../main.css";
import Header from "./Header";
import Contents from "./Contents";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import axios from "axios";

function Main() {
  const MovieListApiUrl = `http://elice-kdt-ai-track-vm-da-04.koreacentral.cloudapp.azure.com:5000/api/movies`;
  const [term, setTerm] = useState("");
  const [results, setResults] = useState([]);
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
          let movieTitleList = [];
          let movieIdList = [];
          for (let dataObj of response.data) {
            movieTitleList.push(dataObj.title);
            movieIdList.push(dataObj.movieId);
          }
          setResults(movieTitleList);
          setMovieIds(movieIdList);
        });
    };
    if (term) {
      search();
    }
  }, [term]);
  // console.log(movieIds, results)

  const handleOnClick = () => {};

  return (
    <>
      <Header />

      <br />
      <Container>
        <center>
          <a href="/">
            <img src="/images/logo.png" className="logo" alt="logo" />
          </a>
        </center>
        <img src="/images/woody.png" className="woody" alt="leaning Woody" />
      </Container>

      <Container className="search">
        <InputGroup>
          <FormControl
            placeholder=" 영화 제목을 입력하세요 !"
            aria-describedby="basic-addon2"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          />
          <InputGroup.Append>
            <Button className="go-button" variant="outline-danger">
              <Link
                to="/result"
                onClick={(event) => {
                  console.log(event);
                }}
              >
                GO!
              </Link>
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </Container>

      <br />
      <br />
      <br />

      <Footer />
    </>
  );
}

export default Main;
