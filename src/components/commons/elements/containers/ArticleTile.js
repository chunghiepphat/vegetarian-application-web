import React from "react";
import "./ArticleTile.css";
import {Link} from "react-router-dom";
import placeholderThumbnail from "../../../../assets/card-thumbnail-default.png";
import {FaHeart, FaRegHeart} from "react-icons/all";

const ArticleTile = ({
                         className, id, type,
                         title, thumbnail,
                         firstName, lastName,
                         totalLikes, isFavorite, status
                     }) => {
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
        <div className={`tile-a ${className}`}>
            <Link className="tile-a__url" to={`/view/${type}/${id}`}/>
            <picture className="tile-a__thumbnail">
                <source srcSet={thumbnail}/>
                <img src={placeholderThumbnail} alt=""/>
            </picture>
            <div className="tile-a__overlay">
                <div className="tile-a__details">
                    {totalLikes !== undefined &&
                    <div className="tile-a__like-count">
                        {isFavorite ? <FaHeart style={{fill: "#f18182"}}/> : <FaRegHeart/>}
                        {totalLikes}</div>}
                    <h1 className="tile-a__title">{title}</h1>
                    {firstName &&
                    <div className="tile-a__author">by {firstName} {lastName}</div>}
                    {status &&
                    <p className={`tile-a__status ${statusColor[status - 1]}`}>
                        {statusText[status - 1]}
                    </p>}
                </div>
            </div>
        </div>
    )
}

export default ArticleTile;