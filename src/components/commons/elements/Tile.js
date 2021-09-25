import React from "react";
import "./Tile.css";
import {Link} from "react-router-dom";
import placeholderThumbnail from "../../../assets/card-thumbnail-default.png";

const Tile = ({id, type, title, thumbnail, first_name, last_name}) => {
    return (
        <div className="tile-wrapper">
            <Link to={`/view/${type}/${id}`}>
                <div className="tile-item">
                    <picture className="tile-thumbnail">
                        <source srcSet={thumbnail}/>
                        <img src={placeholderThumbnail} alt=""/>
                    </picture>
                    <div className="tile-overlay">
                        <div className="tile-description">
                            <p className="tile-author">{first_name} {last_name}</p>
                            <p className="tile-title">{title}</p>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default Tile;