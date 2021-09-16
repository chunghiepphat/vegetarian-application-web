import React from "react";
import "./HomeBanner.css";
import Thumbnail from "assets/home-banner-placeholder.png";

let article = "HomeBanner article title";
let articleUrl = "#";
let firstName = "Joe";
let lastName = "Dohn";
let country = "Britain"
let userUrl = "#";

const HomeBanner = () => {
    return (
        <div className="home-banner">
            <figure>
                <img src={Thumbnail} alt="HomeBanner thumbnail"/>
            </figure>
            <div>
                <h1><a href={articleUrl}>{article}</a></h1>
                <p><a href={userUrl}>{firstName} {lastName}, from {country}</a></p>
            </div>
        </div>
    )
}

export default HomeBanner