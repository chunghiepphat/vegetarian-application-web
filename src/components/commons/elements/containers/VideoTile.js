import React, {useContext} from "react";
import "./VideoTile.css";
import {Link} from "react-router-dom";
import {UserContext} from "../../../../context/UserContext";
import placeholderThumbnail from "../../../../assets/card-thumbnail-default.png";
import {FaPlay} from "react-icons/all";

const VideoTile = ({className, id, title, thumbnail, firstName, lastName, status}) => {
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
        <div className={`tile-a tile-video ${className}`}>
            <Link className="tile-a__url" to={user && user.role === "admin" ?
                `/console/review/video/${id}` : `/view/video/${id}`}/>
            <picture className="tile-a__thumbnail">
                <source srcSet={thumbnail}/>
                <img src={placeholderThumbnail} alt=""/>
            </picture>
            <div className="tile-a__overlay">
                <div className="tile-a__details">
                    <h1 className="tile-a__title">{title}</h1>
                    {firstName &&
                    <div className="tile-a__author">by {firstName} {lastName}</div>}
                    {status &&
                    <p className={`tile-a__status ${statusColor[status - 1]}`}>
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