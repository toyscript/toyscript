import axios from "axios";
import React, { useEffect, useState } from "react";
import { Graph } from "react-d3-graph";


const Character = ({ movieId }) => {
  const allCharactersRelationApiUrl =
    `http://elice-kdt-ai-track-vm-da-04.koreacentral.cloudapp.azure.com:5000/api/${movieId}/characters/relations`;
  const [data, setData] = useState({});

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
    "automaticRearrangeAfterDropNode": false, // Cannot use with nodeHighlightBehavior, staticGraph
    "collapsible": false,
    "directed": true,
    "focusAnimationDuration": 0.75,
    "focusZoom": 1,
    "freezeAllDragEvents": false,
    "height": 600,
    "highlightDegree": 1, // 관계 차수를 결정하는 옵션
    // "highlightDegree": 2,
    "highlightOpacity": 0.2,
    "linkHighlightBehavior": true,
    "maxZoom": 12,
    "minZoom": 0.05,
    "nodeHighlightBehavior": true,
    "panAndZoom": false,
    "staticGraph": false,
    "staticGraphWithDragAndDrop": false,
    "width": 900,
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
    "automaticRearrangeAfterDropNode": false, 
    "collapsible": false,
    "directed": true,
    "focusAnimationDuration": 0.75,
    "focusZoom": 1,
    "freezeAllDragEvents": false,
    "height": 600,
    "highlightDegree": 2,
    "highlightOpacity": 0.2,
    "linkHighlightBehavior": true,
    "maxZoom": 12,
    "minZoom": 0.05,
    "nodeHighlightBehavior": true,
    "panAndZoom": false,
    "staticGraph": false,
    "staticGraphWithDragAndDrop": false,
    "width": 900,
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
      "mouseCursor": "pointer",
      "opacity": 0.5,
      "renderLabel": false,
      "semanticStrokeWidth": true,
      "strokeWidth": 4,
      "markerHeight": 5,
      "markerWidth": 5,
      "type" : "CURVE_SMOOTH",
      "strokeDasharray": 0,
      "strokeDashoffset": 0,
      "strokeLinecap": "butt"
    }
  }

  return (
      <div style={chartBackgroundColor}>
        <p style={{ padding: "20px" }}>
          대본의 등장인물들이 서로 어떻게 연결되어 있는지 궁금하신가요?
          여기에서 등장인물들의 모든 관계를 확인하실 수 있습니다!
          <br />
          * Tip!!
          그래프가 보이지 않는다면 마우스 휠을 통해 그래프 사이즈를 조절해보세요!
          처음엔 등장인물들이 멀리 떨어져있답니다.
          등장인물의 이름들이 너무 작게보인다면 
          페이지를 새로고침(F5)하고 10초 정도 기다렸다가 들어와보세요!
          관계가 복잡할수록 첫 렌더링에 시간이 조금 걸린답니다.
          <br />
          TOY SCRIPT는 등장인물의 관계를 편하게 파악할 수 있도록
          등장인물의 이름 위에 마우스 커서를 올리면 
          해당 등장인물과 관계가 있는 등장인물들이 표시됩니다!
          <br /> 
        </p>
        <p>
          <center>
            <b>1차 관계 네트워크</b>
          </center>
          같은 씬에 등장하는 인물들의 1차원적인 연결 관계를 확인할 수 있습니다.
          <br />
        </p>
        <Graph
          id="graph-id" 
          data={data}
          config={myConfig}
        />
        <br />
        <hr />
        <p>
          <center>
            <b>2차 관계 네트워크</b>
          </center>
          관계에서 새로운 관계로 이어지는 2차 관계도 확인할 수 있습니다.
          주연 등장인물로부터 파생되는 관계를 확인해보시면
          등장인물들이 얼마나 유기적으로 연결되어 있는지 한 눈에 보이실겁니다!
          <br />
        </p>
        <Graph
          id="graph-id2" 
          data={data}
          config={myConfig2}
        />
      <br />
      <hr />
      </div>
  );
};

export default Character;