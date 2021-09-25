import React from "react";
import "./Card.css";
import {Link} from "react-router-dom";
import placeholderThumbnail from "../../../assets/card-thumbnail-default.png";

const Card = ({id, type, title, thumbnail, first_name, last_name}) => {
    return (
        <div className="card-wrapper">
            <Link to={`/view/${type}/${id}`}>
                <div className="card-item">
                    <picture className="card-thumbnail">
                        <source srcSet={thumbnail}/>
                        <img src={placeholderThumbnail} alt=""/>
                    </picture>
                    <div className="card-overlay">
                        <div className="card-description">
                            <p className="card-author">{first_name} {last_name}</p>
                            <p className="card-title">{title}</p>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default Card;