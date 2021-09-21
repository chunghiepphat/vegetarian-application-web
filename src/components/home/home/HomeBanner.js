import React from "react";
import "components/home/Home.css";
import Thumbnail from "assets/home-banner-placeholder.png";
import {Link} from "react-router-dom";

let article = "Banner article title";
let firstName = "Joe";
let lastName = "Dohn";
let country = "Britain"

const HomeBanner = () => {

    return (
        <div className="banner-container">
            <div className="home-banner">
                <figure className="banner-thumbnail">
                    <img src={Thumbnail} alt="Banner thumbnail"/>
                </figure>
                <div className="banner-details">
                    <h1><Link to="/article">{article}</Link></h1>
                    <p><Link to="/user">{firstName} {lastName}, from {country}</Link></p>
                </div>
            </div>
        </div>
    )
}

export default HomeBanner