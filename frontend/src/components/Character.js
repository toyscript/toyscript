import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Graph } from "react-d3-graph";


const Character = () => {
  const allCharactersRelationApiUrl =
    "http://elice-kdt-ai-track-vm-da-04.koreacentral.cloudapp.azure.com:5000/api/1212/characters/relations";
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
      const weight = [];

      await axios.get(allCharactersRelationApiUrl).then((response) => {
        // console.log(response.data)
        for (let dataObj of response.data) {
          source.push(dataObj.source);
          target.push(dataObj.target);
          weight.push(dataObj.value);
        }
        let uniqueSourceSet = new Set(source);
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
            strokeWidth : weight[i]
          }
          links.push(dict);
          
        //   for (let j = 0; j < Math.sqrt(weight/(weight.length-1)); j++) {
        //     links.push(dict);
        //   }
        }
        // console.log(nodes);
        //(54) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
        // 0: {id: "ONE-EYED BART"}
        // 1: {id: "WOODY"}
        // 2: {id: "JESSIE"}
        // console.log(links);
        //(291) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, …]
        // 0: {source: "ONE-EYED BART", target: "WOODY"}
        // 1: {source: "ONE-EYED BART", target: "JESSIE"}
        // 2: {source: "ONE-EYED BART", target: "BUZZ"}
        // console.log(weight);
        // (291) [50, 31, 25, 1, 220, 363, 198, 268, 115, 175, 99, 242, 76, 287, 218, 107, 49, 116, 83, 80, 194, 116, 39, 12, 22, 11, 12, 7, 7, 5, 17, 11, 41, 12, 22, 11, 12, 7, 7, 6, 17, 11, 373, 141, 141, 104, 81, 123, 77, 182, 98, 137, 62, 50, 66, 41, 44, 33, 37, 89, 37, 177, 291, 97, 67, 80, 94, 60, 145, 93, 229, 103, 27, 47, 54, 45, 67, 4, 1, 16, 3, 133, 48, 14, 16, 7, 9, 14, 53, 15, 24, 21, 66, 21, 26, 6, 49, 80, 93, 104, …]

      });
      setData({
        nodes: nodes,
        links: links
      });
    };
    fetchAllRelationData();
  }, []);

  const myConfig = {
    nodeHighlightBehavior: true,
    node: {
      color: "lightgreen",
      size: 120,
      highlightStrokeColor: "blue",
    },
    link: {
      highlightColor: "lightblue",
    },
  };

  return (
    <Container style={style}>
      <br />
      <div style={chartBackgroundColor}>
        okay
        <Graph
          id="graph-id" 
          data={data}
          config={myConfig}
        />
      </div>
      <br />
    </Container>
  );
};

export default Character;