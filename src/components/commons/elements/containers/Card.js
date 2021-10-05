import React from "react";
import "./Card.css";
import {Link} from "react-router-dom";
import placeholderThumbnail from "../../../../assets/card-thumbnail-default.png";

const Card = ({className, id, type, title, subtitle, thumbnail, firstName, lastName}) => {
    return (
        <div className={`card ${className}`}>
            <Link className="card-url" to={`/view/${type}/${id}`}/>
            <picture className="card-thumbnail">
                <source srcSet={thumbnail}/>
                <img src={placeholderThumbnail} alt=""/>
            </picture>
            <div className="card-details">
                <h1 className="card-title">{title}</h1>
                {subtitle &&
                <p className="card-subtitle">{subtitle.substring(0, 150)}{subtitle.length > 150 && <>...</>}</p>}
                <p className="card-author"><Link to={`/user`}>{firstName} {lastName}</Link></p>
            </div>
        </div>
    )
}

export default Card;