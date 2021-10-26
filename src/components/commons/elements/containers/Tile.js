import React from "react";
import "./Tile.css";
import {Link} from "react-router-dom";
import placeholderThumbnail from "../../../../assets/card-thumbnail-default.png";
import {FaRegHeart} from "react-icons/all";

const Tile = ({className, id, type, title, thumbnail, firstName, lastName, totalLikes}) => {
    return (
        <div className={`tile ${className}`}>
            <Link className="tile-url" to={`/view/${type}/${id}`}/>
            <picture className="tile-thumbnail">
                <source srcSet={thumbnail}/>
                <img src={placeholderThumbnail} alt=""/>
            </picture>
            <div className="tile-overlay">
                <div className="tile-details">
                    {totalLikes !== undefined &&
                    <div className="tile-likes"><FaRegHeart/> {totalLikes}</div>}
                    <h1 className="tile-title">{title}</h1>
                    <div className="tile-author">by {firstName} {lastName}</div>
                </div>
            </div>
        </div>
    )
}

export default Tile;