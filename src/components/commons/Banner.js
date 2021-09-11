import React from "react";
import "./Banner.css";
import Thumbnail from "assets/banner-placeholder.png";

let article = "Banner article title";
let articleUrl = "#";
let firstName = "Joe";
let lastName = "Mama";
let country = "Britain"
let userUrl = "#";

class Banner extends React.Component {
    render() {
        return (
            <section class="home-banner">
                <figure>
                    <img src={Thumbnail} alt="Banner thumbnail"/>
                </figure>
                <div>
                    <h1><a href={articleUrl}>{article}</a></h1>
                    <p><a href={userUrl}>{firstName} {lastName}, from {country}</a></p>
                </div>
            </section>
        )
    }
}

export default Banner