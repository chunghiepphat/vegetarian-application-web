import React, {useEffect} from "react";
import Panel from "../../commons/elements/containers/Panel";
import ArticleCard from "../../commons/elements/containers/ArticleCard";
import {PanelEmp} from "../../commons/elements/loaders/AlertEmpty";
import {PanelErr} from "../../commons/elements/loaders/AlertError";
import {PanelLoader} from "../../commons/elements/loaders/Loader";
import LocalizedStrings from "react-localization";

const DraftBlogs = ({location, data, isLoading, isError, fetchData}) => {
    // Localizations
    let strings = new LocalizedStrings({
        en: {
            blogDraftHeader: "Blogs",
            blogDraftMessage: "Your saved drafts & private blogs.",
            blogNoDraft: "It seems you haven't saved any drafts yet.",
        },
        vi: {
            blogDraftHeader: "Bài viết",
            blogDraftMessage: "Nháp và bài viết ẩn của tôi.",
            blogNoDraft: "Bạn chưa có bài viết nháp nào.",
        }
    });

    useEffect(() => {
        fetchData();
    }, [location]);

    return (
        <section>
            <div className="section-content">
                <h1>{strings.blogDraftHeader}</h1>
                <i>{strings.blogDraftMessage}</i>
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
                            </> : <PanelEmp message={strings.blogNoDraft}/>}
                        </> : <PanelErr reload={fetchData}/>}
                    </> : <PanelLoader/>}
                </Panel>
            </div>
        </section>
    )
}

export default DraftBlogs;