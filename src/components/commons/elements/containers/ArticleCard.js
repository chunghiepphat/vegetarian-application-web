import React, {useContext} from "react";
import "./ArticleCard.css";
import {articleStatusStrings} from "../../../../resources/CommonDisplayStrings";
import {LocaleContext} from "../../../../context/LocaleContext";
import {UserContext} from "../../../../context/UserContext";
import moment from "moment";
import {Link} from "react-router-dom";
import placeholderThumbnail from "../../../../assets/card-thumbnail-default.png";
import {FaHeart, FaRegHeart} from "react-icons/all";

const ArticleCard = ({
                         className, id, type, hideThumbnail,
                         title, subtitle, thumbnail,
                         userId, firstName, lastName, time,
                         totalLikes, isFavorite, status, recommendationCriteria
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
    const recommendationText = [
        `${articleStatusStrings.statusPrefer}`, // 1 - preferences
        `${articleStatusStrings.statusTendency}`,      // 2 - tendency
        `${articleStatusStrings.statusBehavior}`,  // 3 - behavior
        "Suitable for your BMI and routine.",   // 4 - body
        `${articleStatusStrings.statusPopular}`,                      // 5 - popular
    ];

    return (
        <div className={`card ${className}`}>
            <Link className="card__url" to={user && user.role === "admin" ?
                `/console/review/${type}/${id}` : `/view/${type}/${id}`}/>
            {!hideThumbnail &&
            <picture className="card__thumbnail">
                <source srcSet={thumbnail}/>
                <img src={placeholderThumbnail} alt=""/>
            </picture>}
            <div className="card__details">
                {status &&
                <p className={`card__article-status ${statusColor[status - 1]}`}>
                    {statusText[status - 1]}
                </p>}
                <div className="card__glance">
                    {totalLikes !== undefined &&
                    <div className="card__like-count">
                        {isFavorite ? <FaHeart style={{fill: "#f33334"}}/> : <FaRegHeart/>}
                        {totalLikes}</div>}
                    {time &&
                    <p className="card__timestamp">{moment(time).format("lll")}</p>}
                </div>
                {recommendationCriteria &&
                <p className="card__suggestion-criteria">
                    {recommendationText[recommendationCriteria - 1]}
                </p>}
                <h1 className="card__title">{title}</h1>
                {subtitle &&
                <p className="card-subtitle">{subtitle.substring(0, 150)}{subtitle.length > 150 && <>...</>}</p>}
                <p className="card-author">
                    <Link to={user && user.role === "admin" ?
                        `/console/user/${userId}` : `/view/user/${userId}`}>
                        {firstName} {lastName}
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default ArticleCard;