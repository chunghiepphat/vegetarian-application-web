import React from "react";
import "./Tile.css";
import {Link} from "react-router-dom";
import placeholderThumbnail from "../../../../assets/card-thumbnail-default.png";

const Tile = ({className, id, type, title, thumbnail, firstName, lastName}) => {
    return (
        <div className={`tile ${className}`}>
            <Link className="tile-url" to={`/view/${type}/${id}`}/>
            <picture className="tile-thumbnail">
                <source srcSet={thumbnail}/>
                <img src={placeholderThumbnail} alt=""/>
            </picture>
            <div className="tile-overlay">
                <div className="tile-details">
                    <h1 className="tile-title">{title}</h1>
                    <p className="tile-author">by {firstName} {lastName}</p>
                </div>
            </div>
        </div>
    )
}

export default Tile;