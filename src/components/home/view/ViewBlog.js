import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

const ViewRecipe = () => {
    let {id} = useParams();
    console.log(id);
    const api = `http://14.161.47.36:8080/hiepphat-0.0.1-SNAPSHOT/api/blogs/getblogby/${id}`;
    const [blog, setBlog] = useState([]);

    // Fetches recipes data
    const getRecipe = async () => {
        const response = await fetch(api)
        const result = await response.json();
        return result;
    }

    // Executes fetch once on page load
    useEffect(async () => {
        const blog = await getRecipe();
        console.log(blog);
        setBlog(blog);
    }, []);

    return (
        <main>
            <section>
                <div className="section-content">
                    <h1>{blog.blog_title}</h1>
                    <i>{blog.first_name} {blog.last_name}</i>
                    <p>{blog.blog_content}</p>

                </div>
            </section>
        </main>

    )
}

export default ViewRecipe;