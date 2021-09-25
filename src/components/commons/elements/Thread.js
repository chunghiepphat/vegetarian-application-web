import React from "react";
import "./Thread.css";
import {Link} from "react-router-dom";

const Thread = ({id, type, title, thumbnail, excerpt, first_name, last_name}) => {
    return (
        <div className="thread-wrapper">
            <Link to={`/view/${type}/${id}`}>
                <div className="thread-item">
                    <picture className="thread-thumbnail">
                        <source srcSet={thumbnail}/>
                        <img src="" alt=""/>
                    </picture>
                    <div className="thread-overview">
                        <p className="thread-title">{title}</p>
                        <p className="thread-author">- by {first_name} {last_name}</p>
                        <p className="thread-excerpt">{excerpt}...</p>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default Thread;