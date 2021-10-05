import React from "react";
import moment from "moment";
import Avatar from "../../../commons/elements/Avatar";

const BlogInfo = ({data}) => {
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
                <div className="article-time">
                    {moment(data.time).format("lll")}
                </div>
            </div>
            <p>{data.blog_subtitle}</p>
        </section>
    )
}

export default BlogInfo;