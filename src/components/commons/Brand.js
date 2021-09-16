import React from "react";
import "./Brand.css";
import siteLogo from "assets/site-logo.png";

const Brand = () => {
    return (
        <picture className="site-brand">
            <img src={siteLogo} alt="Banner placeholder"/>
        </picture>
    );
}

export default Brand;