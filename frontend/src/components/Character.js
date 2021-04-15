import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Graph } from "react-d3-graph";


const Character = () => {
  const allCharactersRelationApiUrl =
    // "http://elice-kdt-ai-track-vm-da-04.koreacentral.cloudapp.azure.com:5000/api/1212/characters/relations";
    "http://elice-kdt-ai-track-vm-da-04.koreacentral.cloudapp.azure.com:5000/api/1212/characters/relations?test=1";
    // "http://elice-kdt-ai-track-vm-da-04.koreacentral.cloudapp.azure.com:5000/api/1212/characters/relations?test3=1";
  const [data, setData] = useState({});

  const style = {
    backgroundColor: "rgb(246, 233, 180)",
  };

  const chartBackgroundColor = {
    backgroundColor: "white",
    borderRadius: "20px",
    padding: "20px",
  };

  useEffect(() => {
    const fetchAllRelationData = async () => {
      const source = [];
      const target = [];
      const links = [];
      const nodes = [];


      await axios.get(allCharactersRelationApiUrl).then((response) => {

        for (let dataObj of response.data) {
          source.push(dataObj.source);
          target.push(dataObj.target);

        }
        let allSource = source.slice();
        for (let i in target) {
          allSource.push(target[i]);
        }
        let uniqueSourceSet = new Set(allSource);
        let uniqueSourceList = [...uniqueSourceSet];

        for (let i = 0; i < uniqueSourceList.length; i++) {
          const dict = {
            id: uniqueSourceList[i],
          };
          nodes.push(dict);
        }
        for (let i = 0; i < source.length; i++) {
          const dict = {
            source: source[i],
            target: target[i],

          }
          links.push(dict);
        }

      });
      setData({
        nodes: nodes,
        links: links
      });
    };
    fetchAllRelationData();
  }, []);

  const myConfig = {
    "automaticRearrangeAfterDropNode": false, //nodeHighlightBehavior, staticGraph와 함께 사용할 수 없다.
    "collapsible": false,
    "directed": true,
    "focusAnimationDuration": 0.75,
    "focusZoom": 1,
    "freezeAllDragEvents": false,
    "height": 400,
    "highlightDegree": 1, // 관계 차수를 결정하는 옵션, 가장 중요하다. 2차로 하면 source-target-target으로 이어진다.
    // "highlightDegree": 2, // 2차 관계가 보기엔 멋있는데, 관계 자체를 파악하긴 어렵다.
    "highlightOpacity": 0.2,
    "linkHighlightBehavior": true,
    "maxZoom": 12,
    "minZoom": 0.05,
    "nodeHighlightBehavior": true,
    "panAndZoom": false,
    "staticGraph": false,
    "staticGraphWithDragAndDrop": false,
    "width": 800,
    "d3": {
      "alphaTarget": 0.05,
      "gravity": -400,
      "linkLength": 100,
      "linkStrength": 1,
      "disableLinkForce": false,
    },
    "node": {
      "color": "white",
      "fontColor": "black",
      "fontSize": 25,
      "fontWeight": "bold",
      "highlightColor": "purple",
      "highlightFontSize": 45,
      "highlightFontWeight": "bold",
      "highlightStrokeColor": "white",
      "highlightStrokeWidth": 2,
      // "labelPosition" : "right",
      "mouseCursor": "pointer",
      "opacity": 0.9,
      "renderLabel": true,
      "size": 800,
      "strokeColor": "black",
      "strokeWidth": 1.5,
      "svg": "",
      "symbolType": "circle"
    },
    "link": {
      "color": "white",
      "fontColor": "black",
      "fontSize": 4,
      "fontWeight": "normal",
      "highlightColor": "purple",
      "highlightFontSize": 12,
      "highlightFontWeight": "normal",
      "labelProperty": "label",
      // "labelProperty": true,
      "mouseCursor": "pointer",
      "opacity": 0.5,
      "renderLabel": false,
      "semanticStrokeWidth": true,
      "strokeWidth": 4,
      "markerHeight": 5,
      "markerWidth": 5,
      // "type" : "STRAIGHT",
      "type" : "CURVE_SMOOTH",
      "strokeDasharray": 0,
      "strokeDashoffset": 0,
      "strokeLinecap": "butt"
    }
  }

  const myConfig2 = {
    "automaticRearrangeAfterDropNode": false, //nodeHighlightBehavior, staticGraph와 함께 사용할 수 없다.
    "collapsible": false,
    "directed": true,
    "focusAnimationDuration": 0.75,
    "focusZoom": 1,
    "freezeAllDragEvents": false,
    "height": 400,
    // "highlightDegree": 1, // 관계 차수를 결정하는 옵션, 가장 중요하다. 2차로 하면 source-target-target으로 이어진다.
    "highlightDegree": 2, // 2차 관계가 보기엔 멋있는데, 관계 자체를 파악하긴 어렵다.
    "highlightOpacity": 0.2,
    "linkHighlightBehavior": true,
    "maxZoom": 12,
    "minZoom": 0.05,
    "nodeHighlightBehavior": true,
    "panAndZoom": false,
    "staticGraph": false,
    "staticGraphWithDragAndDrop": false,
    "width": 800,
    "d3": {
      "alphaTarget": 0.05,
      "gravity": -400,
      "linkLength": 100,
      "linkStrength": 1,
      "disableLinkForce": false,
    },
    "node": {
      "color": "white",
      "fontColor": "black",
      "fontSize": 25,
      "fontWeight": "bold",
      "highlightColor": "orange",
      "highlightFontSize": 45,
      "highlightFontWeight": "bold",
      "highlightStrokeColor": "white",
      "highlightStrokeWidth": 2,
      // "labelPosition" : "right",
      "mouseCursor": "pointer",
      "opacity": 0.9,
      "renderLabel": true,
      "size": 800,
      "strokeColor": "black",
      "strokeWidth": 1.5,
      "svg": "",
      "symbolType": "circle"
    },
    "link": {
      "color": "white",
      "fontColor": "black",
      "fontSize": 4,
      "fontWeight": "normal",
      "highlightColor": "orange",
      "highlightFontSize": 12,
      "highlightFontWeight": "normal",
      "labelProperty": "label",
      // "labelProperty": true,
      "mouseCursor": "pointer",
      "opacity": 0.5,
      "renderLabel": false,
      "semanticStrokeWidth": true,
      "strokeWidth": 4,
      "markerHeight": 5,
      "markerWidth": 5,
      // "type" : "STRAIGHT",
      "type" : "CURVE_SMOOTH",
      "strokeDasharray": 0,
      "strokeDashoffset": 0,
      "strokeLinecap": "butt"
    }
  }

  return (
    <Container style={style}>
      <br />
      <div style={chartBackgroundColor}>
        <Graph
          id="graph-id" 
          data={data}
          config={myConfig}
        />
        <Graph
          id="graph-id2" 
          data={data}
          config={myConfig2}
        />
      </div>
      {/* <div style={chartBackgroundColor}>
        
      </div> */}
      <br />
    </Container>
  );
};

export default Character;