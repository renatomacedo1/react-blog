import React from "react";
import "./header.css";
import img from "../../assets/header-img.jpeg";

function Header() {
  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleSm">React & Node</span>
        <span className="headerTitleLg">Blog</span>
      </div>
      <img className="headerImage" src={img} alt="image" />
    </div>
  );
}

export default Header;
