import React, {useEffect, useState} from "react";
import LocalizedStrings from "react-localization";
import {Redirect, Route, Switch, useParams} from "react-router-dom";
import {apiUrl} from "../../../helpers/Variables";
import BlogHeader from "./blog/BlogHeader";
import BlogToolbar from "./blog/BlogToolbar";
import BlogContent from "./blog/BlogContent";
import BlogComments from "./blog/BlogComments";
import EditBlog from "../../user/edit/EditBlog";
import {SectionEmp} from "../../commons/elements/loaders/AlertEmpty";
import {SectionErr} from "../../commons/elements/loaders/AlertError";

const ViewBlog = ({user, location, fetchData}) => {
    let {id} = useParams();
    // Localizations
    let strings = new LocalizedStrings({
        en: {
            messageLoading: "Loading the article...",
        },
        vi: {
            messageLoading: "Đang tải bài viết...",
        }
    });
    // Data states & API endpoint
    const [data, setData] = useState();
    const [isError, setIsError] = useState(false);
    const api = `${apiUrl}/blogs/getblogby/${id}${user ? `?userID=${user.id}` : ``}`;
    // Fetches data on page load
    useEffect(() => {
        fetchData(api, setData, setIsError);
    }, [id]);

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
                                    <BlogToolbar id={id} location={location} data={data}
                                                 reload={() => fetchData(api, setData, setIsError)}/>
                                    <BlogContent data={data}/>
                                    <BlogComments data={data}/>
                                </article>
                            </div>
                        </> : <SectionEmp message={strings.messageLoading}/>}
                    </> : <SectionErr reload={() => fetchData(api, setData, setIsError)}/>}
                </Route>
                <Redirect to="/not-found"/>
            </Switch>
        </section>
    )
}

export default ViewBlog;