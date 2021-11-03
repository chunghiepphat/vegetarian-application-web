import React, {useEffect, useState} from "react";
import {apiBase} from "../../../../helpers/Helpers";
import ArticleCard from "../../../commons/elements/containers/ArticleCard";
import {SectionLoader} from "../../../commons/elements/loaders/Loader";
import Panel from "../../../commons/elements/containers/Panel";

const UserBlogs = ({userId}) => {
    const [data, setData] = useState([]);
    const token = JSON.parse(localStorage.getItem("accessToken"));

    let headers = new Headers();
    if (token) {
        headers.append("Authorization", `Bearer ${token.token}`);
    }
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    const fetchData = async () => {
        // Generate request
        let request = {
            method: 'GET',
            headers: headers,
        };
        const api = `${apiBase}/blogs/admin/getallbyuser/${userId}?page=1&limit=100`;
        const response = await fetch(api, request);
        const result = await response.json();
        setData(result.listResult);
    }

    // Executes fetch once on page load
    useEffect(() => {
        fetchData().catch(error => {
            console.error(error);
        });
    }, []);

    return (
        <section>
            <div className="section-content">
                {data &&
                <Panel filler="card-medium">
                    {data.length > 0 ?
                        data.map(item => (
                            <ArticleCard className="card-medium"
                                         key={item.blog_id}
                                         id={item.blog_id}
                                         type="blog"
                                         title={item.blog_title}
                                         thumbnail={item.blog_thumbnail}
                                         subtitle={item.blog_subtitle}
                                         userId={item.user_id}
                                         firstName={item.first_name}
                                         lastName={item.last_name}
                                         totalLikes={item.totalLike}/>
                        ))
                        :
                        <SectionLoader/>
                    }
                </Panel>
                }
            </div>
        </section>
    )
}

export default UserBlogs;