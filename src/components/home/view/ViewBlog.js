import React, {useEffect, useState} from "react";
import LocalizedStrings from "react-localization";
import {Redirect, Route, Switch, useLocation, useParams} from "react-router-dom";
import {apiUrl} from "../../../helpers/Variables";
import BlogHeader from "./blog/BlogHeader";
import BlogContent from "./blog/BlogContent";
import EditBlog from "../../user/edit/EditBlog";
import {SectionEmp} from "../../commons/elements/loaders/AlertEmpty";
import {SectionErr} from "../../commons/elements/loaders/AlertError";
import ArticleToolbar from "./ArticleToolbar";
import ArticleComments from "./ArticleComments";

const ViewBlog = ({user, fetchData}) => {
    let {id} = useParams();
    const location = useLocation();

    // Localizations
    let strings = new LocalizedStrings({
        en: {
            messageLoading: "Loading the article...",
        },
        vi: {
            messageLoading: "Đang tải bài viết...",
        }
    });
    // Fetches article content on page load
    const [data, setData] = useState();
    const [locale, setLocale] = useState("");
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    let api = `${apiUrl}/blogs/getblogby/${id}?translate=${locale}${user ? `&userID=${user.id}` : ``}`;
    useEffect(() => {
        fetchData(api, setData, setIsError, setIsLoading);
    }, [id, api, location]);

    return (
        <section>
            <Switch>
                {/*Edit mode*/}
                {user && data && user.id === data.user_id &&
                <Route exact path={`/view/blog/:id/edit`}>
                    <EditBlog id={id} data={data}/>
                </Route>}
                {/*View mode*/}
                <Route exact path={`/view/blog/:id/`}>
                    {!isError ? <>
                        {data ? <>
                            <div className="section-content">
                                <article>
                                    {data.blog_thumbnail &&
                                    <picture className="article-thumbnail">
                                        <source srcSet={data.blog_thumbnail}/>
                                        <img src="" alt=""/>
                                    </picture>}
                                    <BlogHeader data={data}/>
                                    <ArticleToolbar type={"blog"} id={id} data={data}
                                                    isLoading={isLoading} setLocale={setLocale}
                                                    reload={() => fetchData(api, setData, setIsError, setIsLoading)}/>
                                    <BlogContent data={data}/>
                                    <ArticleComments type={"blog"} data={data}/>
                                </article>
                            </div>
                        </> : <SectionEmp message={strings.messageLoading}/>}
                    </> : <SectionErr reload={() => fetchData(api, setData, setIsError, setIsLoading)}/>}
                </Route>
                <Redirect to="/not-found"/>
            </Switch>
        </section>
    )
}

export default ViewBlog;