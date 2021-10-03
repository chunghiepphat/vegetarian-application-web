import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {FaAngleRight} from "react-icons/fa";
import Card from "../../commons/elements/containers/Card";
import {apiPattern} from "../../../helpers/Helpers";
import Panel from "../../commons/elements/containers/Panel";

const HomeBlogs = () => {
    const api = `${apiPattern}/api/blogs/get10blogs`;
    const [data, setData] = useState([]);

    // Executes fetch once on page load
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
                <h1>Newest stories around</h1>
                <Link to="/browse/blogs"><FaAngleRight/>See more</Link>
            </header>
            <div className="section-content">
                <Panel>
                    {data.map(blog => (
                        <Card className="card-full"
                              key={blog.blog_id}
                              id={blog.blog_id}
                              type="blog"
                              title={blog.blog_title}
                              thumbnail={blog.blog_thumbnail}
                              subtitle={blog.blog_subtitle}
                              first_name={blog.first_name}
                              last_name={blog.last_name}/>
                    ))}
                </Panel>
            </div>
        </section>
    )
}

export default HomeBlogs;