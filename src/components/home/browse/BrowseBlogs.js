import React, {useEffect, useState} from "react";
import Thread from "../../commons/elements/Thread";

const BrowseBlogs = () => {
    const api = "http://14.161.47.36:8080/hiepphat-0.0.1-SNAPSHOT/api/blogs/getall?page=1&limit=100";
    const [data, setData] = useState([]);

    // Executes fetch once on page load
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(api);
            const result = await response.json();
            setData(result.listResult);
        }
        fetchData();
    }, []);

    return (
        <main>
            <section>
                <div className="section-content">
                    <h1>Blogs</h1>
                    <i>Stories, thoughts, discussions and more.</i>
                </div>
                <div className="thread-list">
                    {data && data.map(blog => (
                        <Thread key={blog.blog_id}
                                id={blog.blog_id}
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
        </main>
    )
}

export default BrowseBlogs;