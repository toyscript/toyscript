import React, { useState, useEffect } from "react";
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
import {ReactComponent as MinionIcon} from "./icons/minion.svg";


const Summary = ({
  author, 
  title, 
  totalCharacters, 
  totalPlaces,
  totalScenes
}) => {

  return (
    <Container className="TabContents">
      <div className="TabContentsInner">
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
        </VerticalTimeline>
      </div>
    </Container>
  );
}

export default Summary;
