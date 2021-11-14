import React, {useEffect, useState} from "react";
import {apiBase} from "../../../helpers/Variables";
import {NavLink, Redirect, Route, Switch, useParams} from "react-router-dom";
import Navbar from "../../commons/elements/bars/Navbar";
import UserRecipes from "./user/UserRecipes";
import UserVideos from "./user/UserVideos";
import UserBlogs from "./user/UserBlogs";
import Avatar from "../../commons/elements/Avatar";

const ReviewUser = () => {
    let {id} = useParams();
    const [isError, setIsError] = useState(false);
    const token = JSON.parse(localStorage.getItem("accessToken"));
    const urlProfile = `/console/user/${id}/profile`;
    const urlRecipe = `/console/user/${id}/recipes`;
    const urlVideo = `/console/user/${id}/videos`;
    const urlBlog = `/console/user/${id}/blogs`;
    const [data, setData] = useState();
    // Generates request headers
    let headers = new Headers();
    if (token) headers.append("Authorization", `Bearer ${token.token}`);
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    const deactivateUser = async (e) => {
        e.preventDefault();
        // Generates request body
        let body = JSON.stringify({
            "is_active": !data.is_active,
        });
        // Generates request
        let request = {
            method: 'PUT',
            headers: headers,
            body: body,
        };
        // Executes fetch
        const api = `${apiBase}/user/changestatus/${id}`;
        const response = await fetch(api, request);
        if (response.ok) {
            await fetchData();
        } else if (response.status === 401) {
            alert("You are not authorized to do that.")
        } else {
            alert("Unexpected error with code: " + response.status);
        }
    }
    const fetchData = async () => {
        const api = `${apiBase}/user/${id}/getbyadmin`
        try {
            const response = await fetch(api)
            if (response.ok) {
                const result = await response.json();
                setData(result);
            } else if (response.status >= 400 && response.status < 600) {
                setIsError(true);
            }
        } catch (error) {
            console.error(error);
            setIsError(true);
        }
    }
    useEffect(() => {
        fetchData();
    }, [id])

    return (
        <section>
            <header className="console-header">
                {data &&
                <div className="user-header">
                    <Avatar className="user-image" userImage={data.profile_image}/>
                    <div className="user-info">
                        <h1>{data.first_name} {data.last_name}</h1>
                        <em>{data.about_me}</em>
                    </div>
                </div>}
                {data && data.is_active ?
                    <button className="button-light" style={{width: "300px"}} onClick={e => deactivateUser(e)}>
                        Deactivate this account
                    </button>
                    :
                    <button className="button-dark" style={{width: "300px"}} onClick={e => deactivateUser(e)}>
                        Re-activate this account
                    </button>
                }
                <Navbar>
                    <NavLink to={urlProfile}>Profile</NavLink>
                    <NavLink to={urlRecipe}>Recipes</NavLink>
                    <NavLink to={urlVideo}>Videos</NavLink>
                    <NavLink to={urlBlog}>Blogs</NavLink>
                </Navbar>
            </header>
            <div className="console-content">
                <Switch>
                    <Route exact path={`/console/user/${id}`}><Redirect to={urlRecipe}/></Route>
                    <Route path={urlRecipe}><UserRecipes userId={id}/></Route>
                    <Route path={urlVideo}><UserVideos userId={id}/></Route>
                    <Route path={urlBlog}><UserBlogs userId={id}/></Route>
                </Switch>
            </div>
        </section>
    )
}

export default ReviewUser;