import React, {useEffect} from "react";
import {apiBase} from "../../../../helpers/Helpers";
import Panel from "../../../commons/elements/containers/Panel";
import ArticleCard from "../../../commons/elements/containers/ArticleCard";
import {PanelLoader} from "../../../commons/elements/loaders/Loader";
import {PanelEmp} from "../../../commons/elements/loaders/AlertEmpty";
import {PanelErr} from "../../../commons/elements/loaders/AlertError";

const UserBlogs = ({user, location, data, isLoading, isError, fetchData, userId}) => {
    const api = `${apiBase}/blogs/getallbyuserIDdifferent/${userId}?page=1&limit=100${user ? `&userID=${user.id}` : ``}`;
    // Executes fetch once on page load
    useEffect(() => {
        fetchData(api);
    }, [location, user]);

    return (
        <section>
            <div className="section-content">
                <h1>Blogs</h1>
                <p>Blogs and stories shared by this user are shown here.</p>
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
                                                 time={item.time_created}
                                                 isFavorite={item.is_like}
                                                 totalLikes={item.totalLike}/>))}
                            </> : <PanelEmp/>}
                        </> : <PanelErr reload={fetchData} api={api}/>}
                    </> : <PanelLoader/>}
                </Panel>
            </div>
        </section>
    )
}

export default UserBlogs;