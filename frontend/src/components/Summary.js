import React from "react";

function Summary () {

  return (
    <>
      <div style={{position:"absolute", fontSize:"60px", color:"black", fontFamily:"fantasy", zIndex:"2", right:"35%", top:"118%"}}>
        <span> 60 </span>
      </div>
      <div style={{position:"absolute", fontSize:"60px", color:"black", fontFamily:"fantasy", zIndex:"2", right:"60%", top:"135%"}}>
        <span> 60 </span>
      </div>
      <div style={{position:"absolute", fontSize:"60px", color:"black", fontFamily:"fantasy", zIndex:"2", right:"33%", top:"153%"}}>
        <span> 1322 </span>
      </div>
      <div style={{position:"absolute", fontSize:"60px", color:"black", fontFamily:"fantasy", zIndex:"2", right:"60%", top:"170%"}}>
        <span> 60 </span>
      </div>
      <center>
        <img 
          src="/images/summary.png"
          height="600px" 
          width="900px"
          style={{paddingTop:"20px", paddingBottom:"20px", position:"relative", zIndex:"1"}}
        />
      </center>
    </>
  );
}

export default Summary;