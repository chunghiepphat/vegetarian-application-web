import React from "react";
import "./Brand.css";
import {Link} from "react-router-dom";
import siteLogo from "assets/site-logo.png";

const Brand = () => {
    return (
        <Link to="/home" className="brand-link">
            <picture className="brand">
                <img src={siteLogo} alt="Site logo"/>
            </picture>
        </Link>
    )
}

export default Brand;