import React from "react";
import "./Card.css";
import {Link} from "react-router-dom";
import placeholderThumbnail from "../../assets/card-thumbnail-default.png";

const Card = (props) => {
    return (
        <div>
            <article className="card">
                <picture className="card-thumbnail">
                    <source srcSet=""/>
                    <img src={placeholderThumbnail} alt="avatar"/>
                </picture>
                <h1><Link to="/placeholder">Placeholder<span/></Link></h1>
            </article>
        </div>
    )
}

export default Card;