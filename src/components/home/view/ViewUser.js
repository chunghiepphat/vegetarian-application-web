import React, {useContext, useEffect, useState} from "react";
import {apiBase} from "../../../helpers/Variables";
import {NavLink, Redirect, Route, Switch, useLocation, useParams} from "react-router-dom";
import UserBanner from "./user/UserBanner";
import Navbar from "../../commons/elements/bars/Navbar";
import UserRecipes from "./user/UserRecipes";
import UserVideos from "./user/UserVideos";
import UserBlogs from "./user/UserBlogs";
import {UserContext} from "../../../context/UserContext";

const ViewUser = () => {
    let {id} = useParams();
    const location = useLocation();
    const user = useContext(UserContext);
    const urlRecipe = `/view/user/${id}/recipes`;
    const urlVideo = `/view/user/${id}/videos`;
    const urlBlog = `/view/user/${id}/blogs`;
    const [profile, setProfile] = useState();
    const [isProfileError, setIsProfileError] = useState(false);
    const [posts, setPosts] = useState([]);
    const [isPostsLoading, setIsPostsLoading] = useState(false);
    const [isPostsError, setIsPostsError] = useState(false);
    const fetchProfile = async () => {
        const api = `${apiBase}/user/${id}`
        try {
            const response = await fetch(api);
            if (response.ok) {
                const result = await response.json();
                setProfile(result);
            } else if (response.status >= 400 && response.status < 600) {
                setIsProfileError(true);
            }
        } catch (error) {
            setIsProfileError(true);
        }
    }
    const fetchPosts = async (api) => {
        setIsPostsLoading(true);
        try {
            const response = await fetch(api);
            if (response.ok) {
                const result = await response.json();
                setPosts(result.listResult);
                setIsPostsLoading(false);
            } else if (response.status >= 400 && response.status < 600) {
                setIsPostsError(true);
                setIsPostsLoading(false);
            }
        } catch (error) {
            console.error(error);
            setIsPostsError(true);
            setIsPostsLoading(false);
        }
    }
    useEffect(() => {
        fetchProfile();
    }, [id])

    return (
        <>
            <UserBanner data={profile}/>
            <section className="page-navbar">
                <Navbar>
                    <NavLink to={urlRecipe}>{profile ? <>{profile.first_name}</> : <>User</>}'s recipes</NavLink>
                    <NavLink to={urlVideo}>{profile ? <>{profile.first_name}</> : <>User</>}'s videos</NavLink>
                    <NavLink to={urlBlog}>{profile ? <>{profile.first_name}</> : <>User</>}'s blogs</NavLink>
                </Navbar>
            </section>
            <Switch>
                <Route exact path={`/view/user/${id}`}><Redirect to={urlRecipe}/></Route>
                {!isProfileError && <Route exact path={urlRecipe}>
                    <UserRecipes user={user} userId={id} location={location}
                                 isLoading={isPostsLoading} isError={isPostsError}
                                 data={posts} fetchData={fetchPosts}/> </Route>}
                {!isProfileError && <Route exact path={urlVideo}>
                    <UserVideos user={user} userId={id} location={location}
                                isLoading={isPostsLoading} isError={isPostsError}
                                data={posts} fetchData={fetchPosts}/> </Route>}
                {!isProfileError && <Route exact path={urlBlog}>
                    <UserBlogs user={user} userId={id} location={location}
                               isLoading={isPostsLoading} isError={isPostsError}
                               data={posts} fetchData={fetchPosts}/> </Route>}
                <Redirect to="/not-found"/>
            </Switch>
        </>
    )
}

export default ViewUser;