import React, {useEffect} from "react";
import {Redirect, Route, Switch, useParams} from "react-router-dom";
import {apiBase} from "../../../helpers/Helpers";
import BlogHeader from "./blog/BlogHeader";
import BlogToolbar from "./blog/BlogToolbar";
import BlogContent from "./blog/BlogContent";
import BlogComments from "./blog/BlogComments";
import EditBlog from "../../user/edit/EditBlog";
import {SectionEmp} from "../../commons/elements/loaders/AlertEmpty";
import {SectionErr} from "../../commons/elements/loaders/AlertError";

const ViewBlog = ({user, location, data, isError, fetchData}) => {
    let {id} = useParams();
    const api = `${apiBase}/blogs/getblogby/${id}${user ? `?userID=${user.id}` : ``}`;
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
                                    <BlogToolbar id={id} data={data} reload={fetchData} mainApi={api}/>
                                    <BlogContent data={data}/>
                                    <BlogComments data={data}/>
                                </article>
                            </div>
                        </> : <SectionEmp message="Loading the article..."/>}
                    </> : <SectionErr reload={fetchData} api={api}/>}
                </Route>
                <Redirect to="/not-found"/>
            </Switch>
        </section>
    )
}

export default ViewBlog;