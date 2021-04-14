import React from "react";
import { Container } from "react-bootstrap";
import  {  Graph  }  from  "react-d3-graph" ;


const Character = () => {
  
  const style = {
    backgroundColor: "rgb(246, 233, 180)",
  };

  const chartBackgroundColor = {
    backgroundColor: "white",
    borderRadius: "20px",
    padding: "20px",
  };

  // graph payload (with minimalist structure)
  const data = {
    nodes: [{ id: "REX" }, { id: "ANDY" }, { id: "BUZZ" }, { id: "WOODY" }, { id: "ALIEN" }, { id: "JESSIE" }, { id: "ONE-EYED BART" }, 
            { id: "HAMM" }, { id: "LOTSO" }, { id: "KEN" }, { id: "MRS. POTATO HEAD" }, { id: "MR. POTATO HEAD" }],
    links: [
        { source: "BUZZ", target: "WOODY" },
        { source: "BUZZ", target: "ALIEN" },
        { source: "BUZZ", target: "JESSIE" },
        { source: "BUZZ", target: "ONE-EYED BART" },
        { source: "BUZZ", target: "ANDY" },
        { source: "BUZZ", target: "REX" },
        { source: "BUZZ", target: "JESSIE" },
        { source: "BUZZ", target: "HAMM" },
        { source: "BUZZ", target: "LOTSO" },
        { source: "BUZZ", target: "KEN" },
        { source: "ANDY", target: "WOODY" },
        { source: "ANDY", target: "BUZZ" },
        { source: "ANDY", target: "MRS. POTATO HEAD" },
        { source: "ANDY", target: "HAMM" },
        { source: "ANDY", target: "MR. POTATO HEAD" },
        { source: "ANDY", target: "JESSIE" },
        { source: "ANDY", target: "REX" },
        { source: "ANDY", target: "LOTSO" },
    ],
  };

  // the graph configuration, just override the ones you need
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

  const onClickNode = function(nodeId) {
    window.alert(`Clicked node ${nodeId}`);
  };

  const onClickLink = function(source, target) {
    window.alert(`Clicked link between ${source} and ${target}`);
  };

  return (
    <Container style={style}>
      <br />
      <div style={chartBackgroundColor}>
        <Graph
            id="graph-id" // id is mandatory
            data={data}
            config={myConfig}
            onClickNode={onClickNode}
            onClickLink={onClickLink}   
        />;
      </div>
      <br />
    </Container>
  );
};

export default Character;
