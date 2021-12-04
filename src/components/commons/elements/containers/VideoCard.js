import React, {useContext} from "react";
import "./VideoCard.css";
import {articleStatusStrings} from "../../../../resources/CommonDisplayStrings";
import {LocaleContext} from "../../../../context/LocaleContext";
import {UserContext} from "../../../../context/UserContext";
import moment from "moment";
import {Link} from "react-router-dom";
import placeholderThumbnail from "../../../../assets/card-thumbnail-default.png";
import {FaHeart, FaPlay, FaRegHeart} from "react-icons/all";

const VideoCard = ({
                       className, id,
                       title, thumbnail,
                       userId, firstName, lastName, time,
                       totalLikes, isFavorite, status
                   }) => {
    const user = useContext(UserContext);
    articleStatusStrings.setLanguage(useContext(LocaleContext));
    const statusText = [
        `${articleStatusStrings.statusPending}`,
        `${articleStatusStrings.statusApproved}`,
        `${articleStatusStrings.statusRejected}`,
    ]
    const statusColor = [
        "text-neutral",
        "text-positive",
        "text-negative"
    ]

    return (
        <div className={`card card--video ${className}`}>
            <Link className="card__url" to={user && user.role === "admin" ?
                `/console/review/video/${id}` : `/view/video/${id}`}/>
            <div style={{position: "relative"}}>
                <picture className="card__thumbnail">
                    <source srcSet={thumbnail}/>
                    <img src={placeholderThumbnail} alt=""/>
                </picture>
                <div className="card__overlay">
                    <div className="card__play-button">
                        <FaPlay/>
                    </div>
                </div>
            </div>
            <div className="card__details">
                {status &&
                <p className={`card__article-status ${statusColor[status - 1]}`}>
                    {statusText[status - 1]}
                </p>}
                <div className="card__glance">
                    {totalLikes > -1 &&
                    <div className="card__like-count">
                        {isFavorite ? <FaHeart style={{fill: "#f33334"}}/> : <FaRegHeart/>}
                        {totalLikes}</div>}
                    {time &&
                    <p className="card__timestamp">{moment(time).format("lll")}</p>}
                </div>
                <h1 className="card__title">{title}</h1>
                {firstName &&
                <p className="card-author">
                    <Link to={user && user.role === "admin" ?
                        `/console/user/${userId}` : `/view/user/${userId}`}>
                        {firstName} {lastName}
                    </Link>
                </p>}
            </div>

        </div>
    )
}
export default VideoCard;