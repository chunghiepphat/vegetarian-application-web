import React from "react";
import "./OverviewCard.css";
import "../../commons/elements/containers/ArticleCard.css";
import {Link} from "react-router-dom";
import {FaAngleRight} from "react-icons/fa";

const OverviewCard = ({url, number, text, action}) => {
    return (
        <div className="overview-card">
            {url && <Link className="card-url" to={url}/>}
            <div className="card-details">
                {number &&
                <p className={`card-stat-number 
                ${number > 0 && number <= 5 && "text-positive"} 
                ${number > 5 && number <= 20 && "text-neutral"}
                ${number > 20 && "text-negative"}`}>
                    {number}
                </p>}
                {text && <p className="card-stat-text">{text}</p>}
                {action && <p className="card-stat-action">{action} <FaAngleRight/></p>}
            </div>
        </div>
    )
}

export default OverviewCard;