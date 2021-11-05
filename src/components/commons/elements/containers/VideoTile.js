import React from "react";
import {Link} from "react-router-dom";

const VideoTile = ({className, id, title, link, firstName, lastName}) => {
    return (
        <div className={`tile tile-video ${className}`}>
            <Link className="tile-url" to={`/view/video/${id}`}/>
            <div className="tile-overlay">
                <div className="tile-details">
                    <h1 className="tile-title">{title}</h1>
                    {firstName &&
                    <div className="tile-author">by {firstName} {lastName}</div>}
                </div>
            </div>
        </div>
    )
}
export default VideoTile;