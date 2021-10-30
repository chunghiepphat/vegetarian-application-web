import React from "react";
import moment from "moment";
import Avatar from "../../../commons/elements/Avatar";
import {Link} from "react-router-dom";

const BlogHeader = ({data}) => {
    return (
        <section className="article-title">
            <h1>{data.blog_title}</h1>
            <p>{data.blog_subtitle}</p>
            <div className="article-info">
                <div className="article-author">
                    <Avatar className="author-avatar" data={data}/>
                    <div className="author-name">
                        {data.first_name} {data.last_name}
                    </div>
                    <Link to={`/view/user/${data.user_id}`}/>
                </div>
                <div className="article-timestamp">
                    <span className="timestamp-created">
                        {moment(data.time).format("lll")}
                    </span>
                    {data.time_updated &&
                    <span className="timestamp-updated">
                        (edited {moment(data.time_updated).format("lll")})
                    </span>}
                </div>
            </div>
        </section>
    )
}

export default BlogHeader;