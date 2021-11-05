import React, {useContext, useEffect, useState} from "react";
import {apiBase} from "../../../helpers/Helpers";
import ArticleCard from "../../commons/elements/containers/ArticleCard";
import {SectionLoader} from "../../commons/elements/loaders/Loader";
import {UserContext} from "../../../context/UserContext";

const PostedBlogs = () => {
    const user = useContext(UserContext);
    const token = JSON.parse(localStorage.getItem("accessToken"));
    const [data, setData] = useState([]);

    // Generates request headers
    let headers = new Headers();
    if (token) {
        headers.append("Authorization", `Bearer ${token.token}`);
    }
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    const fetchData = async () => {
        // Generates request
        let request = {
            method: 'GET',
            headers: headers,
        };
        const api = `${apiBase}/blogs/getallbyuserID/${user.id}?page=1&limit=100`;
        const response = await fetch(api, request);
        const result = await response.json();
        setData(result.listResult);
    }
    // Executes fetch once on page load
    useEffect(() => {
        fetchData().catch(error => {
            console.error(error);
        });
    }, [user]);

    return (
        <section>
            <div className="section-content">
                <h1>Blogs</h1>
                <i>Stories, thoughts, discussions and more.</i>
                {data &&
                <div className="panel">
                    {data.length > 0 ?
                        data.map(item => (
                            <ArticleCard className="card-full"
                                         key={item.blog_id}
                                         id={item.blog_id}
                                         type="blog"
                                         title={item.blog_title}
                                         thumbnail={item.blog_thumbnail}
                                         subtitle={item.blog_subtitle}
                                         userId={item.user_id}
                                         firstName={item.first_name}
                                         lastName={item.last_name}
                                         totalLikes={item.totalLike}
                                         status={item.status}/>
                        ))
                        :
                        <SectionLoader/>
                    }
                </div>
                }
            </div>
        </section>
    )
}

export default PostedBlogs;