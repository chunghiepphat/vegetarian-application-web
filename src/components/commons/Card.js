import React from "react";
import "./Card.css";

class Card extends React.Component {
    render() {
        return (
            <div>
                <article className="card-article">
                    <figure>
                        <img src={this.props.image} alt="Article thumbnail"/>
                    </figure>
                    <h1><a href={this.props.url}>{this.props.children}<span></span></a></h1>
                </article>
            </div>
        )
    }
}

export default Card;