import React, {useContext} from "react";
import {searchDisplayStrings} from "../../../../resources/PublicDisplayStrings";
import {LocaleContext} from "../../../../context/LocaleContext";
import Panel from "../../../commons/elements/containers/Panel";
import ArticleCard from "../../../commons/elements/containers/ArticleCard";
import {PanelEmp} from "../../../commons/elements/loaders/AlertEmpty";

const ResultBlogs = ({data}) => {
    // Localizations
    searchDisplayStrings.setLanguage(useContext(LocaleContext));

    return (
        <section>
            <div className="section-content">
                <Panel filler="card-narrow" style={{justifyContent: "space-evenly"}}>
                    {data && data.length > 0 ? <>
                        {data.map(item => (
                            <ArticleCard className="card-narrow"
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
                    </> : <PanelEmp message={searchDisplayStrings.searchResultsBlogsEmpty}/>}
                </Panel>
            </div>
        </section>
    )
}

export default ResultBlogs;