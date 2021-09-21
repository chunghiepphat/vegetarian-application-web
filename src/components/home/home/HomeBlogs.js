import React, {useEffect, useState} from "react";
import "components/home/Home.css";
import {Link} from "react-router-dom";
import {FaAngleRight} from "react-icons/fa";
import Thread from "../../commons/elements/Thread";

const HomeBlogs = () => {
    const api = "http://14.161.47.36:8080/hiepphat-0.0.1-SNAPSHOT/api/blogs/get10blogs";
    const [blogs, setBlogs] = useState([]);

    // Fetches blogs data
    const getLatestBlogs = async () => {
        const response = await fetch(api)
        const result = await response.json();
        return result;
    }

    // Executes on page load
    useEffect(async () => {
        const blogs = await getLatestBlogs();
        setBlogs(blogs.listResult);
    }, []);

    return (
        <section className="home-feed">
            <header className="section-header linked-header">
                <h1>Newest stories around</h1>
                <Link to="/browse/blogs"><FaAngleRight/>See more</Link>
            </header>
            <div className="thread-list">
                {blogs && blogs.map(blog => (
                    <Thread id={blog.blog_id}
                            type="blog"
                            title={blog.blog_title}
                            thumbnail={blog.blog_thumbnail}
                            excerpt={blog.blog_content.substring(0, 150)}
                            first_name={blog.first_name}
                            last_name={blog.last_name}
                    />
                ))}
            </div>
        </section>
    )
}

export default HomeBlogs;