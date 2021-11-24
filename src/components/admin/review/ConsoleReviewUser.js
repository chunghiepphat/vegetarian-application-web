import React, {useContext, useEffect, useState} from "react";
import {Redirect, Route, Switch, useLocation, useParams} from "react-router-dom";
import {apiUrl} from "../../../helpers/Variables";
import {UserContext} from "../../../context/UserContext";
import ReviewUserRecipes from "./user/ReviewUserRecipes";
import ReviewUserVideos from "./user/ReviewUserVideos";
import ReviewUserBlogs from "./user/ReviewUserBlogs";
import ConsoleReviewUserToolbar from "./ConsoleReviewUserToolbar";
import ConsoleReviewUserHeader from "./ConsoleReviewUserHeader";

const ConsoleReviewUser = () => {
    let {id} = useParams();
    const location = useLocation();
    const user = useContext(UserContext);
    const token = JSON.parse(localStorage.getItem("accessToken"));
    const paths = {
        profile: `/console/review/user/${id}/profile`,
        recipes: `/console/review/user/${id}/recipes`,
        videos: `/console/review/user/${id}/videos`,
        blogs: `/console/review/user/${id}/blogs`,
    }
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
        <>
            <ConsoleReviewUserHeader profile={profile} paths={paths}/>
            <ConsoleReviewUserToolbar id={id} token={token} profile={profile} fetchProfile={fetchProfile}/>
            <div className="console-article">
                <Switch>
                    <Route exact path={`/console/review/user/${id}`}><Redirect to={paths.recipes}/></Route>
                    {!isProfileError && <Route exact path={paths.recipes}>
                        <ReviewUserRecipes user={user} userId={id} location={location}
                                           isLoading={isPostsLoading} isError={isPostsError}
                                           data={posts} fetchData={fetchPosts}/> </Route>}
                    {!isProfileError && <Route path={paths.videos}>
                        <ReviewUserVideos user={user} userId={id} location={location}
                                          isLoading={isPostsLoading} isError={isPostsError}
                                          data={posts} fetchData={fetchPosts}/> </Route>}
                    {!isProfileError && <Route path={paths.blogs}>
                        <ReviewUserBlogs user={user} userId={id} location={location}
                                         isLoading={isPostsLoading} isError={isPostsError}
                                         data={posts} fetchData={fetchPosts}/> </Route>}
                </Switch>
            </div>
        </>
    )
}

export default ConsoleReviewUser;