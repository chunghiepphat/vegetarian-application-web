import React, {useContext} from "react";
import "./VideoTile.css";
import {Link} from "react-router-dom";
import {UserContext} from "../../../../context/UserContext";
import {FaPlay} from "react-icons/all";

const VideoTile = ({className, id, title, firstName, lastName, status}) => {
    const user = useContext(UserContext);
    const statusText = [
        "Review pending.",
        "Approved.",
        "Rejected."
    ]
    const statusColor = [
        "text-neutral",
        "text-positive",
        "text-negative"
    ]

    return (
        <div className={`article-tile tile-video ${className}`}>
            <Link className="tile-url" to={user && user.role === "admin" ?
                `/console/video/${id}` : `/view/video/${id}`}/>
            <canvas className="video-thumbnail"/>
            <div className="tile-overlay">
                <div className="tile-details">
                    <h1 className="tile-title">{title}</h1>
                    {firstName &&
                    <div className="tile-author">by {firstName} {lastName}</div>}
                    {status &&
                    <p className={`tile-status ${statusColor[status - 1]}`}>
                        {statusText[status - 1]}
                    </p>}
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