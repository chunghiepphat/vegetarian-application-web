import React, {useContext, useEffect, useState} from "react";
import {historyDisplayStrings} from "../../../resources/UserDisplayStrings";
import {LocaleContext} from "../../../context/LocaleContext";
import {apiUrl} from "../../../helpers/Variables";
import Panel from "../../commons/elements/containers/Panel";
import ArticleCard from "../../commons/elements/containers/ArticleCard";
import {PanelLoader} from "../../commons/elements/loaders/Loader";
import {PanelEmp} from "../../commons/elements/loaders/AlertEmpty";
import {PanelErr} from "../../commons/elements/loaders/AlertError";

const PostedBlogs = ({user, fetchData}) => {
    // Localizations
    historyDisplayStrings.setLanguage(useContext(LocaleContext));

    // Fetches data on page load
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const api = `${apiUrl}/blogs/getallbyuserID/${user.id}?page=1&limit=100`;
    useEffect(() => {
        fetchData(api, setData, setIsLoading, setIsError);
    }, [user]);

    return (
        <section>
            <div className="section-content">
                <h1>{historyDisplayStrings.historyBlogsHeader}</h1>
                <p>{historyDisplayStrings.historyBlogSubheader}</p>
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
                                                 totalLikes={item.totalLike}
                                                 status={item.status}/>))}
                            </> : <PanelEmp message={historyDisplayStrings.historyBlogsEmpty}/>}
                        </> : <PanelErr reload={() => fetchData(api, setData, setIsLoading, setIsError)}/>}
                    </> : <PanelLoader/>}
                </Panel>
            </div>
        </section>
    )
}

export default PostedBlogs;