import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { Container } from "react-bootstrap";
import {ReactComponent as SceneIcon} from "./icons/cut-scene.svg";
import {ReactComponent as PlaceIcon} from "./icons/maps.svg";
import {ReactComponent as MovieIcon} from "./icons/video-camera.svg";
import {ReactComponent as WriterIcon} from "./icons/writing-tool.svg";
import {ReactComponent as PageIcon} from "./icons/paper.svg";
import {ReactComponent as MinionIcon} from "./icons/minion.svg";


function Summary() {
  const style = {
    backgroundColor: "rgb(246, 233, 180)",
  };
  const chartBackgroundColor = {
    backgroundColor: "white",
    borderRadius: "20px",
    padding: "20px",
  };
  const summaryApiUrl =
    "http://elice-kdt-ai-track-vm-da-04.koreacentral.cloudapp.azure.com:5000/api/movies/1212";
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [totalCharacters, setTotalCharacters] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalScenes, setTotalScenes] = useState(0);
  const [totalPlaces, setTotalPlaces] = useState(0);

  useEffect(() => {
    const fetchSummaryData = async () => {
      await axios.get(summaryApiUrl).then((response) => {
        setAuthor(response.data.author);
        setTitle(response.data.title);
        setTotalCharacters(response.data.totalCharacters);
        setTotalPages(response.data.totalPages);
        setTotalPlaces(response.data.totalPlaces);
        setTotalScenes(response.data.totalScenes);
      });
      // console.log(author, title, totalCharacters, totalPages, totalPlaces, totalScenes);
    };
    fetchSummaryData();
  }, []);

  return (
    <Container style={style}>
      <br />
      <div style={chartBackgroundColor}>
        <VerticalTimeline>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: "rgb(204, 225, 242)", color: "black" }}
            contentArrowStyle={{
              borderRight: "7px solid  rgb(204, 225, 242)",
            }}
            iconStyle={{ background: "rgb(204, 225, 242)", color: "#fff" }}
            icon={<MovieIcon />}
          >
            <h4 className="vertical-timeline-element-subtitle" style={{textAlign: "center", color: "#696969"}}>
              TITLE
            </h4>
            <h1 className="vertical-timeline-element-title" style={{textAlign: "center"}}>
              {title === null? "no result" : title}
            </h1>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: "rgb(198, 248, 229)", color: "black" }}
            contentArrowStyle={{
              borderRight: "7px solid  rgb(198, 248, 229)",
            }}
            iconStyle={{ background: "rgb(198, 248, 229)", color: "#fff" }}
            icon={<WriterIcon />}
          >
            <h4 className="vertical-timeline-element-title" style={{textAlign: "center", color: "#696969"}}>
              AUTHOR</h4>
            <h1 className="vertical-timeline-element-subtitle"  style={{textAlign: "center"}}>
            {author === null? "no result" : author}
            </h1>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: "rgb(251, 247, 213)", color: "black" }}
            contentArrowStyle={{
              borderRight: "7px solid  rgb(251, 247, 213)",
            }}
            iconStyle={{ background: "rgb(251, 247, 213)", color: "#fff" }}
            icon={<MinionIcon />}
          >
            <h4 className="vertical-timeline-element-title" style={{textAlign: "center", color: "#696969"}}>
              TOTAL CHARACTERS</h4>
            <h1 className="vertical-timeline-element-subtitle"style={{textAlign: "center"}}>
              {totalCharacters === null? "no result" : totalCharacters}
            </h1>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: "rgb(249, 222, 215)", color: "black" }}
            contentArrowStyle={{
              borderRight: "7px solid  rgb(249, 222, 215)",
            }}
            iconStyle={{ background: "rgb(249, 222, 215)", color: "#fff" }}
            icon={<PlaceIcon />}
          >
            <h4 className="vertical-timeline-element-title" style={{textAlign: "center", color: "#696969"}}>TOTAL PLACES</h4>
            <h1 className="vertical-timeline-element-subtitle" style={{textAlign: "center"}}>
            {totalPlaces === null? "no result" : totalPlaces}
            </h1>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--education"
            contentStyle={{ background: "rgb(245, 205, 222)", color: "black" }}
            contentArrowStyle={{
              borderRight: "7px solid  rgb(245, 205, 222)",
            }}
            iconStyle={{ background: "rgb(245, 205, 222)", color: "#fff" }}
            icon={<SceneIcon />}
          >
            <h4 className="vertical-timeline-element-title" style={{textAlign: "center", color: "#696969"}}>
              TOTAL SCENES
            </h4>
            <h1 className="vertical-timeline-element-subtitle"  style={{textAlign: "center"}}>
              {totalScenes === null? "no result" : totalScenes}
            </h1>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--education"
            contentStyle={{ background: "rgb(226, 190, 241)", color: "black" }}
            contentArrowStyle={{
              borderRight: "7px solid  rgb(226, 190, 241)",
            }}
            iconStyle={{ background: "rgb(226, 190, 241)", color: "#fff" }}
            icon={<PageIcon />}
          >
            <h4 className="vertical-timeline-element-title" style={{textAlign: "center", color: "#696969"}}>
              TOTAL PAGES
            </h4>
            <h1 className="vertical-timeline-element-subtitle" style={{textAlign: "center"}}>
            {totalPages === null? "no result" : totalPages}
            </h1>
          </VerticalTimelineElement>
        </VerticalTimeline>
      </div>
      
      <br />
    </Container>
  );
}

export default Summary;
