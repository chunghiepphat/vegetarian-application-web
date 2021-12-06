import React from "react";
import "./ArticleTile.css";
import {Link} from "react-router-dom";
import placeholderThumbnail from "../../../../assets/card-thumbnail-default.png";
import {FaHeart, FaRegHeart} from "react-icons/all";
import { articleStatusStrings } from "resources/CommonDisplayStrings";

const ArticleTile = ({
                         className, id, type,
                         title, thumbnail,
                         firstName, lastName,
                         totalLikes, isFavorite, status
                     }) => {
    const statusText = [
        `${articleStatusStrings.statusPendingShort}`,
        `${articleStatusStrings.statusApprovedShort}`,
        `${articleStatusStrings.statusRejectedShort}`,
    ]
    const statusColor = [
        "text-neutral",
        "text-positive",
        "text-negative"
    ]
    return (
        <div className={`tile ${className}`}>
            <Link className="tile__url" to={`/view/${type}/${id}`}/>
            <picture className="tile__thumbnail">
                <source srcSet={thumbnail}/>
                <img src={placeholderThumbnail} alt=""/>
            </picture>
            <div className="tile__overlay">
                <div className="tile__details">
                    {totalLikes !== undefined &&
                    <div className="tile__like-count">
                        {isFavorite ? <FaHeart style={{fill: "#f18182"}}/> : <FaRegHeart/>}
                        {totalLikes}</div>}
                    <h1 className="tile__title">{title}</h1>
                    {firstName &&
                    <div className="tile__author">by {firstName} {lastName}</div>}
                    {status &&
                    <p className={`tile__article-status ${statusColor[status - 1]}`}>
                        {statusText[status - 1]}
                    </p>}
                </div>
            </div>
        </div>
    )
}

export default ArticleTile;