import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {FaAngleRight} from "react-icons/fa";
import Card from "../../../commons/elements/containers/Card";
import {apiPattern} from "../../../../helpers/Helpers";
import Panel from "../../../commons/elements/containers/Panel";

const DashboardBlogs = () => {
    // Gets current user's info
    let user = JSON.parse(localStorage.getItem("userInfo"));

    // Fetches data on page load
    const api = `${apiPattern}/blogs/get10blogbyuser/${user.id}`;
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(api);
            const result = await response.json();
            setData(result.listResult);
        }
        fetchData().catch(error => {
            console.error(error);
        });
    }, [api]);

    return (
        <section>
            <header className="section-header linked-header">
                <h1>Your recent blogs</h1>
                <Link to={`/${user.id}/history/blogs`}><FaAngleRight/>View all</Link>
            </header>
            <div className="section-content">
                <Panel data={data}>
                    {data && data.map(blog => (
                        <Card className="card-full"
                              id={blog.blog_id}
                              type="blog"
                              title={blog.blog_title}
                              thumbnail={blog.blog_thumbnail}
                              subtitle={blog.blog_subtitle}
                              first_name={blog.first_name}
                              last_name={blog.last_name}
                        />
                    ))}
                </Panel>
            </div>
        </section>
    )
}

export default DashboardBlogs;