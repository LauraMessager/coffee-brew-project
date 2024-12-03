import React from "react";
import { Link } from "react-router-dom";
import "../../styles/footer.scss";

const Footer = () => {
  return (
    <footer>
      <div className="section">
        <Link to="/about">About us</Link>
      </div>
      <div className="section">
        <Link to="/term-of-use">Term of Use</Link>
      </div>
      <div className="section">
        <p>
          Brought to you by
          <img src="/SCALogo.png" alt="SCA" />
        </p>
      </div>
    </footer>
  );
};

export default Footer;
