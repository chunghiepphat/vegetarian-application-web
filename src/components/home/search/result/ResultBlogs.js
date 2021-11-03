import React from "react";
import ArticleCard from "../../../commons/elements/containers/ArticleCard";
import {useLocation} from "react-router-dom";

const ResultBlogs = () => {
    const location = useLocation()
    const data = location.state.data;
    return (
        <section>
            {data &&
            <div className="section-content">
                <h1>Blogs</h1>
                <div className="panel">
                    {data.map(blog => (
                        <ArticleCard className="card-narrow"
                                     key={blog.blog_id}
                                     id={blog.blog_id}
                                     type="blog"
                                     title={blog.blog_title}
                                     thumbnail={blog.blog_thumbnail}
                                     first_name={blog.first_name}
                                     last_name={blog.last_name}/>
                    ))}
                </div>
            </div>
            }
        </section>
    )
}

export default ResultBlogs;