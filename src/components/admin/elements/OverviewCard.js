import React from "react";
import "./OverviewCard.css";
import "../../commons/elements/containers/ArticleCard.css";
import {Link} from "react-router-dom";
import {FaAngleRight} from "react-icons/fa";

const OverviewCard = ({url, number, text, action}) => {
    let textColor;
    if (number >= 0 && number < 5) textColor = "text-positive";
    else if (number >= 5 && number < 20) textColor = "text-neutral";
    else if (number >= 20) textColor = "text-negative";

    return (
        <div className="overview-card">
            {url && <Link className="card-url" to={url}/>}
            <div className="card-details">
                {number >= 0 && <p className={`card-stat-number ${textColor}`}>{number}</p>}
                {text && <p className="card-stat-text">{text}</p>}
                {action && <p className="card-stat-action">{action} <FaAngleRight/></p>}
            </div>
        </div>
    )
}

export default OverviewCard;