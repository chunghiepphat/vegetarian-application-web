import React, {useContext, useEffect, useState} from "react";
import {apiBase} from "../../../helpers/Helpers";
import ArticleCard from "../../commons/elements/containers/ArticleCard";
import {PanelLoader, SectionLoader} from "../../commons/elements/loaders/Loader";
import {UserContext} from "../../../context/UserContext";
import Panel from "../../commons/elements/containers/Panel";
import {PanelEmp} from "../../commons/elements/loaders/AlertEmpty";
import {PanelErr} from "../../commons/elements/loaders/AlertError";

const PostedBlogs = ({user, location, data, isLoading, isError, fetchData}) => {
    const api = `${apiBase}/blogs/getallbyuserID/${user.id}?page=1&limit=100`;
    // Executes fetch once on page load
    useEffect(() => {
        fetchData(api);
    }, [location, user]);

    return (
        <section>
            <div className="section-content">
                <h1>Blogs</h1>
                <i>Your public blogs and stories.</i>
                <Panel filler="card-full">
                    {!isLoading ? <>
                        {!isError ? <>
                            {data && data.length > 0 ? <>
                                {data.map(item => (
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
                                                 isFavorite={item.is_like}
                                                 totalLikes={item.totalLike}
                                                 status={item.status}/>))}
                            </> : <PanelEmp message="It seems you haven't posted anything yet."/>}
                        </> : <PanelErr reload={fetchData} api={api}/>}
                    </> : <PanelLoader/>}
                </Panel>
            </div>
        </section>
    )
}

export default PostedBlogs;