import React from "react";
import moment from "moment";
import Avatar from "../../../commons/elements/Avatar";

const BlogHeader = ({data}) => {
    return (
        <section className="article-title">
            <h1>{data.blog_title}</h1>
            <div className="article-info">
                <div className="article-author">
                    <Avatar className="article-avatar" data={data}/>
                    <div className="article-user">
                        {data.first_name} {data.last_name}
                    </div>
                </div>
                <div className="article-timestamp">
                    <span>
                        {moment(data.time).format("lll")}
                    </span>
                    {data.time_updated &&
                    <span>
                        (edited {moment(data.time_updated).format("lll")})
                    </span>}
                </div>
            </div>
            <p>{data.blog_subtitle}</p>
        </section>
    )
}

export default BlogHeader;