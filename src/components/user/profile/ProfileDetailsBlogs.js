import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {FaAngleRight} from "react-icons/fa";
import Thread from "../../commons/elements/Thread";

const ProfileDetailsBlogs = () => {
    // Gets current user's info
    let user = JSON.parse(localStorage.getItem("userInfo"));

    // Fetches data on page load
    const api = `http://14.161.47.36:8080/hiepphat-0.0.1-SNAPSHOT/api/blogs/get10blogbyuser/${user.id}`;
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(api);
            const result = await response.json();
            setData(result.listResult);
        }
        fetchData();
    }, [api]);

    return (
        <section className="home-feed">
            <header className="section-header linked-header">
                <h1>Your recent blogs</h1>
                <Link to={`/${user.id}/history/blogs`}><FaAngleRight/>View all</Link>
            </header>
            <div className="thread-list">
                {data && data.map(blog => (
                    <Thread id={blog.blog_id}
                            type="blog"
                            title={blog.blog_title}
                            thumbnail={blog.blog_thumbnail}
                            subtitle={blog.blog_subtitle}
                            first_name={blog.first_name}
                            last_name={blog.last_name}
                    />
                ))}
            </div>
        </section>
    )
}

export default ProfileDetailsBlogs;