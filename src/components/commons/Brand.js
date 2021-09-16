import React from "react";
import "./Brand.css";
import siteLogo from "assets/site-logo.png";

const Brand = () => {
    return (
        <picture className="site-brand">
            <img src={siteLogo} alt="HomeBanner placeholder"/>
        </picture>
    );
}

export default Brand;