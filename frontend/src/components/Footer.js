import aboutus from "../images/aboutus.png";
import '../footer.css';
import React from "react";

const Footer = () => {
  return (
    <>
      <div className="footer">
        <img className="footer-image" src={aboutus} />
      </div>
    </>
  );
};

export default Footer;
