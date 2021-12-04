import React, {useContext} from "react";
import "./UserCard.css";
import {Link} from "react-router-dom";
import {UserContext} from "../../../context/UserContext";
import Avatar from "../../commons/elements/Avatar";

const UserCard = ({
                      className, id,
                      firstName, lastName, avatar,
                      country, email, role, isActive
                  }) => {
    const user = useContext(UserContext);

    return (
        <div className={`user-card ${className}`}>
            <Link className="card__url" to={user && user.role === "admin" ?
                `/console/review/user/${id}`
                : `/view/user/${id}`}/>
            <div className="card-cell-1">
                <Avatar className={"card-avatar"} userImage={avatar}/>
            </div>
            <div className="card-cell-2">
                <div>
                    <h1 className="card-user">{firstName} {lastName} - ID {id}</h1>
                    <p className="card-email">{email}</p>
                </div>
            </div>
            <div className="card-cell-3">
                <p className="card-country">{country}</p>
            </div>
            <div className="card-cell-4">
                <p className="card-role">{role}</p>
            </div>
            <div className="card-cell-5">
                {isActive ?
                    <p className={`card__article-status text-positive`}>Account is active.</p>
                    : <p className={`card__article-status text-negative`}>Account is deactivated. </p>}
            </div>
        </div>
    )
}

export default UserCard;