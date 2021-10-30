import React from "react";
import "./Card.css";
import {Link} from "react-router-dom";
import placeholderThumbnail from "../../../../assets/card-thumbnail-default.png";
import moment from "moment";
import {FaRegHeart} from "react-icons/all";

const Card = ({
                  adminConsole,
                  className, id, type, hideThumbnail,
                  title, subtitle, thumbnail,
                  firstName, lastName, time,
                  totalLikes, status,
              }) => {

    return (
        <div className={`card ${className}`}>
            <Link className="card-url" to={adminConsole ? `/console/${type}/${id}` : `/view/${type}/${id}`}/>
            {!hideThumbnail &&
            <picture className="card-thumbnail">
                <source srcSet={thumbnail}/>
                <img src={placeholderThumbnail} alt=""/>
            </picture>}
            <div className="card-details">
                <h1 className="card-title">{title}</h1>
                {subtitle &&
                <p className="card-subtitle">{subtitle.substring(0, 150)}{subtitle.length > 150 && <>...</>}</p>}
                <p className="card-author"><Link to={`/user`}>{firstName} {lastName}</Link></p>
                {time &&
                <p className="card-timestamp">{moment(time).format("lll")}</p>}
                {totalLikes !== null &&
                <div className="card-likes"><FaRegHeart/> {totalLikes}</div>}
                {status &&
                <p className="card-status">
                    {status === 1 &&
                    <span className="text-neutral">Waiting for approval</span>}
                    {status === 2 &&
                    <span className="text-positive">Approved and published</span>}
                    {status === 3 &&
                    <span className="text-negative">Declined</span>}
                </p>}
            </div>
        </div>
    )
}

export default Card;