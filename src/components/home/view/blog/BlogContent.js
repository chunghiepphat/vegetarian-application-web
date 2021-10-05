import React from "react";

const BlogContent = ({data}) => {
    return (
        <section className="article-content">
            <div dangerouslySetInnerHTML={{__html: data.blog_content}}/>
        </section>
    )
}

export default BlogContent;