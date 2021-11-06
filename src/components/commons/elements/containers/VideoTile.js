import React from "react";
import {Link} from "react-router-dom";
import {FaPlay} from "react-icons/all";

const VideoTile = ({className, id, title, link, firstName, lastName}) => {
    return (
        <div className={`article-tile tile-video ${className}`}>
            <Link className="tile-url" to={`/view/video/${id}`}/>
            <canvas className="video-thumbnail"/>
            <div className="tile-overlay">
                <div className="tile-details">
                    <h1 className="tile-title">{title}</h1>
                    {firstName &&
                    <div className="tile-author">by {firstName} {lastName}</div>}
                </div>
            </div>
            <div className="play-button-container">
                <div className="play-button-wrapper">
                    <FaPlay/>
                </div>
            </div>
        </div>
    )
}
export default VideoTile;