import React, {useEffect, useState} from "react";
import {apiBase} from "../../../helpers/Helpers";
import {NavLink, Redirect, Route, Switch, useParams} from "react-router-dom";
import UserBanner from "./user/UserBanner";
import Navbar from "../../commons/elements/bars/Navbar";
import UserRecipes from "./user/UserRecipes";
import UserVideos from "./user/UserVideos";
import UserBlogs from "./user/UserBlogs";

const ViewUser = () => {
    let {id} = useParams();
    const urlRecipe = `/view/user/${id}/recipes`;
    const urlVideo = `/view/user/${id}/videos`;
    const urlBlog = `/view/user/${id}/blogs`;
    const [data, setData] = useState();

    const fetchData = async () => {
        const api = `${apiBase}/user/${id}`
        const response = await fetch(api);
        const result = await response.json();
        setData(result);
    }
    useEffect(() => {
        fetchData().catch(error => {
            console.error(error);
        });
    }, [id])

    return (
        <>
            <UserBanner data={data}/>
            <section className="page-navbar">
                <Navbar>
                    <NavLink to={urlRecipe}>Recipe</NavLink>
                    <NavLink to={urlVideo}>Video</NavLink>
                    <NavLink to={urlBlog}>Blog</NavLink>
                </Navbar>
            </section>
            <Switch>
                <Route exact path={`/view/user/${id}`}><Redirect to={urlRecipe}/></Route>
                <Route path={urlRecipe}><UserRecipes userId={id}/></Route>
                <Route path={urlVideo}><UserVideos userId={id}/></Route>
                <Route path={urlBlog}><UserBlogs userId={id}/></Route>
            </Switch>
        </>
    )
}

export default ViewUser;