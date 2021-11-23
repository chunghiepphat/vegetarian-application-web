import React, {useEffect} from "react";
import ArticleCard from "../../commons/elements/containers/ArticleCard";
import {PanelLoader} from "../../commons/elements/loaders/Loader";
import Panel from "../../commons/elements/containers/Panel";
import {PanelEmp} from "../../commons/elements/loaders/AlertEmpty";
import {PanelErr} from "../../commons/elements/loaders/AlertError";
import LocalizedStrings from "react-localization";

const FavoriteBlogs = ({location, data, isLoading, isError, fetchData}) => {
    // Localizations
    let strings = new LocalizedStrings({
        en: {
            blogHeader: "Blogs",
            blogMessageHeader: "Stories you added to favorites will be shown here.",

        },
        vi: {
            blogHeader: "Bài viết",
            blogMessageHeader: "Bài viết yêu thích của bạn sẽ được hiển thị ở đây.",
        }
    });

    useEffect(() => {
        fetchData();
    }, [location]);

    return (
        <section>
            <div className="section-content">
                <h1>{strings.blogHeader}</h1>
                <p>{strings.blogMessageHeader}</p>
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
                                                 time={item.time_created}/>))}
                            </> : <PanelEmp/>}
                        </> : <PanelErr reload={fetchData}/>}
                    </> : <PanelLoader/>}
                </Panel>
            </div>
        </section>
    )
}

export default FavoriteBlogs;