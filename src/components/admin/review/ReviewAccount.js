import React, {useContext, useEffect, useState} from "react";
import {apiUrl} from "../../../helpers/Variables";
import {Link, NavLink, Redirect, Route, Switch, useLocation, useParams} from "react-router-dom";
import Navbar from "../../commons/elements/bars/Navbar";
import AccountRecipes from "./account/AccountRecipes";
import AccountVideos from "./account/AccountVideos";
import AccountBlogs from "./account/AccountBlogs";
import Avatar from "../../commons/elements/Avatar";
import {UserContext} from "../../../context/UserContext";
import {FaAngleLeft} from "react-icons/fa";
import {FaCheck, FaTimes} from "react-icons/all";
import Panel from "../../commons/elements/containers/Panel";
import OverviewCard from "../elements/OverviewCard";

const ReviewAccount = () => {
    let {id} = useParams();
    const location = useLocation();
    const user = useContext(UserContext);
    const token = JSON.parse(localStorage.getItem("accessToken"));
    const urlProfile = `/console/user/${id}/profile`;
    const urlRecipes = `/console/user/${id}/recipes`;
    const urlVideos = `/console/user/${id}/videos`;
    const urlBlogs = `/console/user/${id}/blogs`;
    const [profile, setProfile] = useState();
    const [isProfileError, setIsProfileError] = useState(false);
    const [posts, setPosts] = useState([]);
    const [isPostsLoading, setIsPostsLoading] = useState(false);
    const [isPostsError, setIsPostsError] = useState(false);
    // Generates request headers
    let headers = new Headers();
    if (token) headers.append("Authorization", `Bearer ${token.token}`);
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    const fetchProfile = async () => {
        const api = `${apiUrl}/user/${id}/getbyadmin`
        try {
            const response = await fetch(api)
            if (response.ok) {
                const result = await response.json();
                setProfile(result);
            } else if (response.status >= 400 && response.status < 600) {
                setIsProfileError(true);
            }
        } catch (error) {
            console.error(error);
            setIsProfileError(true);
        }
    }
    const deactivateUser = async (e) => {
        e.preventDefault();
        // Generates request body
        let body = JSON.stringify({
            "is_active": !profile.is_active,
        });
        // Generates request
        let request = {
            method: 'PUT',
            headers: headers,
            body: body,
        };
        // Executes fetch
        const api = `${apiUrl}/user/changestatus/${id}`;
        const response = await fetch(api, request);
        if (response.ok) {
            await fetchProfile();
        } else if (response.status === 401) {
            alert("You are not authorized to do that.")
        } else {
            alert("Unexpected error with code: " + response.status);
        }
    }
    const fetchPosts = async (api) => {
        setIsPostsLoading(true);
        setIsPostsError(false)
        // Generates request
        let request = {
            method: 'GET',
            headers: headers,
        };
        try {
            const response = await fetch(api, request);
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
        <section>
            <header className="console-header">
                {profile &&
                <div className="user-header">
                    <Avatar className="user-image" userImage={profile.profile_image}/>
                    <div className="user-info">
                        <h1>{profile.first_name} {profile.last_name} - {profile.email}</h1>
                    </div>
                </div>}
                <Navbar>
                    <NavLink to={urlProfile}>Profile</NavLink>
                    <NavLink to={urlRecipes}>Recipes</NavLink>
                    <NavLink to={urlVideos}>Videos</NavLink>
                    <NavLink to={urlBlogs}>Blogs</NavLink>
                </Navbar>
            </header>
            <div className="console-toolbar">
                <Link to="/console/manage-content/recipes"><FaAngleLeft/> Go back</Link>
                <h1>Overview</h1>
                {profile && profile.is_active && <p className="text-positive">Active account</p>}
                {profile && !profile.is_active && <p className="text-negative">Account disabled</p>}
                <Panel>
                    <OverviewCard number={2} text="Flags in the past 3 days"/>
                    <OverviewCard number="1%" text="Flagged rate"/>
                </Panel>
                {profile && profile.is_active ? <>
                    <button className="button-light" style={{width: "300px"}} onClick={e => deactivateUser(e)}>
                        Deactivate this account
                    </button>
                </> : <>
                    <button className="button-dark" style={{width: "300px"}} onClick={e => deactivateUser(e)}>
                        Re-activate this account
                    </button>
                </>}
            </div>
            <div className="console-article">
                <Switch>
                    <Route exact path={`/console/user/${id}`}><Redirect to={urlRecipes}/></Route>
                    {!isProfileError && <Route exact path={urlRecipes}>
                        <AccountRecipes user={user} userId={id} location={location}
                                        isLoading={isPostsLoading} isError={isPostsError}
                                        data={posts} fetchData={fetchPosts}/> </Route>}
                    {!isProfileError && <Route path={urlVideos}>
                        <AccountVideos user={user} userId={id} location={location}
                                       isLoading={isPostsLoading} isError={isPostsError}
                                       data={posts} fetchData={fetchPosts}/> </Route>}
                    {!isProfileError && <Route path={urlBlogs}>
                        <AccountBlogs user={user} userId={id} location={location}
                                      isLoading={isPostsLoading} isError={isPostsError}
                                      data={posts} fetchData={fetchPosts}/> </Route>}
                </Switch>
            </div>
        </section>
    )
}

export default ReviewAccount;