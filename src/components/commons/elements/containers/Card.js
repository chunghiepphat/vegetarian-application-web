import React, {useContext} from "react";
import "./Card.css";
import {Link} from "react-router-dom";
import placeholderThumbnail from "../../../../assets/card-thumbnail-default.png";
import moment from "moment";
import {FaRegHeart} from "react-icons/all";
import {UserContext} from "../../../../context/UserContext";

const Card = ({
                  className, id, type, hideThumbnail,
                  title, subtitle, thumbnail,
                  userId, firstName, lastName, time,
                  totalLikes, status, recommendationCriteria
              }) => {

    const user = useContext(UserContext);

    const statusText = [
        "Waiting for review.",
        "Approved and published.",
        "Declined."
    ]

    const statusColor = [
        "text-neutral",
        "text-positive",
        "text-negative"
    ]

    const recommendationText = [
        "Includes your preferred ingredients.", // 1 - preferences
        "Based on your favorite recipes.",      // 2 - tendency
        "Based on your recent search history",  // 3 - behavior
        "Suitable for your BMI and routine.",   // 4 - body
        "Popular recipe."                       // 5 - popular
    ];

    return (
        <div className={`card ${className}`}>
            <Link className="card-url" to={user && user.role === "admin" ?
                `/console/${type}/${id}`
                : `/view/${type}/${id}`}/>
            {!hideThumbnail &&
            <picture className="card-thumbnail">
                <source srcSet={thumbnail}/>
                <img src={placeholderThumbnail} alt=""/>
            </picture>}

            <div className="card-details">
                {status &&
                <p className={`card-status ${statusColor[status - 1]}`}>
                    {statusText[status - 1]}
                </p>}
                <h1 className="card-title">{title}</h1>
                {subtitle &&
                <p className="card-subtitle">{subtitle.substring(0, 150)}{subtitle.length > 150 && <>...</>}</p>}
                <p className="card-author"><Link to={`/view/user/${userId}`}>{firstName} {lastName}</Link></p>
                {time &&
                <p className="card-timestamp">{moment(time).format("lll")}</p>}
                {totalLikes !== undefined &&
                <div className="card-likes"><FaRegHeart/>{totalLikes}</div>}
                {recommendationCriteria && <p>
                    {recommendationText[recommendationCriteria - 1]}
                </p>}
            </div>
        </div>
    )
}

export default Card;