import React, {useContext, useEffect, useState} from "react";
import {Redirect, Route, Switch, useLocation, useParams} from "react-router-dom";
import {apiBase} from "../../../helpers/Helpers";
import BlogContent from "./blog/BlogContent";
import BlogComments from "./blog/BlogComments";
import BlogHeader from "./blog/BlogHeader";
import {SectionLoader} from "../../commons/elements/loaders/Loader";
import BlogToolbar from "./blog/BlogToolbar";
import EditBlog from "../../user/edit/EditBlog";
import {UserContext} from "../../../context/UserContext";
import {SectionEmp} from "../../commons/elements/loaders/AlertEmpty";
import {SectionErr} from "../../commons/elements/loaders/AlertError";

const ViewBlog = ({data, isLoading, isError, fetchData}) => {
    let {id} = useParams();
    const location = useLocation();
    const user = useContext(UserContext);
    const api = `${apiBase}/blogs/getblogby/${id}?userID=${user.id}`;
    useEffect(() => {
        fetchData(api)
    }, [id, location]);

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
                    {!isLoading ? <>
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
                                        <BlogToolbar id={id} data={data} reload={fetchData}/>
                                        <BlogContent data={data}/>
                                        <BlogComments data={data}/>
                                    </article>
                                </div>
                            </> : <SectionEmp/>}
                        </> : <SectionErr reload={fetchData}/>}
                    </> : <SectionLoader/>}
                </Route>
                <Redirect to="/not-found"/>
            </Switch>
        </section>
    )
}

export default ViewBlog;