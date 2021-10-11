import React from "react";
import "./Card.css";
import {Link} from "react-router-dom";
import placeholderThumbnail from "../../../../assets/card-thumbnail-default.png";
import moment from "moment";
import {FaRegHeart} from "react-icons/all";

const Card = ({className, id, type, title, subtitle, thumbnail, firstName, lastName, time, totalLike}) => {
    return (
        <div className={`card ${className}`}>
            <Link className="card-url" to={`/view/${type}/${id}`}/>
            <picture className="card-thumbnail">
                <source srcSet={thumbnail}/>
                <img src={placeholderThumbnail} alt=""/>
            </picture>
            <div className="card-details">
                <h1 className="card-title">{title}</h1>
                {subtitle &&
                <p className="card-subtitle">{subtitle.substring(0, 150)}{subtitle.length > 150 && <>...</>}</p>}
                {totalLike != null && <>
                    <div><FaRegHeart/> {totalLike}</div>
                </>
                }

                <p className="card-author"><Link to={`/user`}>{firstName} {lastName}</Link></p>
                <p className="card-timestamp">{moment(time).format("lll")}</p>
            </div>
        </div>
    )
}

export default Card;