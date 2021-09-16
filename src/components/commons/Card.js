import React from "react";
import "./Card.css";
import {Link} from "react-router-dom";

const Card = (props) => {
    return (
        <div>
            <article className="card-article">
                <figure>
                    <img src={props.image} alt="Article thumbnail"/>
                </figure>
                <h1><Link to="/placeholder">Placeholder<span/></Link></h1>
            </article>
        </div>
    )
}

export default Card;