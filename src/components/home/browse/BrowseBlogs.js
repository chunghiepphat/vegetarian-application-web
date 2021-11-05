import React, {useEffect, useState} from "react";
import ArticleCard from "../../commons/elements/containers/ArticleCard";
import {apiBase} from "../../../helpers/Helpers";
import {SectionLoader} from "../../commons/elements/loaders/Loader";
import Panel from "../../commons/elements/containers/Panel";

const BrowseBlogs = () => {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        const api = `${apiBase}/blogs/getall?page=1&limit=100`;
        const response = await fetch(api);
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
                <h1>Blogs</h1>
                <i>Stories, thoughts, discussions and more.</i>
                {data &&
                <Panel filler="card-full">
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
                                         time={item.time_created}
                                         totalLikes={item.totalLike}/>
                        ))
                        : <SectionLoader/>}
                </Panel>}
            </div>
        </section>
    )
}

export default BrowseBlogs;