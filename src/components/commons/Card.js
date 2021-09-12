import React from "react";
import "./Card.css";

const Card = () => {
    return (
        <div>
            <article className="card-article">
                <figure>
                    <img src={this.props.image} alt="Article thumbnail"/>
                </figure>
                <h1><a href={this.props.url}>{this.props.children}<span/></a></h1>
            </article>
        </div>
    )
}

export default Card;