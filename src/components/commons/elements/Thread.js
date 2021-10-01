import React from "react";
import "./Thread.css";
import {Link} from "react-router-dom";

const Thread = ({id, type, title, subtitle, thumbnail, first_name, last_name}) => {

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
                        <p className="thread-author">{first_name} {last_name}</p>
                        <p className="thread-excerpt">{subtitle.substring(0, 150)}{subtitle.length > 150 && <>...</>}</p>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default Thread;