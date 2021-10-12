import React, {useContext, useEffect, useState} from "react";
import {Redirect, Route, Switch, useHistory} from "react-router-dom";
import {UserContext} from "../../../context/UserContext";
import {apiBase} from "../../../helpers/Helpers";
import {apiKey} from "../../../helpers/ApiVideo";
import VideoStep01 from "./video/VideoStep01";
import VideoStep02 from "./video/VideoStep02";
import {SectionLoader} from "../../commons/elements/loaders/Loader";

const PostVideo = () => {
    const user = useContext(UserContext);
    const token = JSON.parse(localStorage.getItem("accessToken"));
    const api = `${apiBase}/video/upload`;
    const history = useHistory();
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    // const [category, setCategory] = useState("1");
    const [link, setLink] = useState();

    // For api.video authentication and keys
    const [tokenType, setTokenType] = useState();
    const [accessToken, setAccessToken] = useState();
    const [refreshToken, setRefreshToken] = useState();
    const [videoId, setVideoId] = useState();


    const submitPost = async (e) => {
        e.preventDefault();

        // Generates request headers
        let headers = new Headers();
        headers.append("Authorization", `Bearer ${token.token}`);
        headers.append("Content-Type", "application/json");
        headers.append("Accept", "application/json");

        // Generates request body
        let body = JSON.stringify({
            "user_id": user.id,
            "video_title": title,
            "video_description": "1",
            "video_link": link,
        });

        // Generates request
        let request = {
            method: 'POST',
            headers: headers,
            body: body,
        };

        // Executes fetch
        const response = await fetch(api, request);
        if (response.ok) {
            alert("Video posted successfully!");
            history.push("/home");

        } else if (response.status === 401) {
            alert("You are not authorized to do that.")
        } else {
            alert("Unexpected error with code: " + response.status);
        }
    }

    // Authenticate with api.video on page load and get its access token
    useEffect(() => {
        const request = {
            method: 'POST',
            headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify({apiKey: apiKey})
        };

        fetch('https://sandbox.api.video/auth/api-key', request)
            .then(response => response.json())
            .then(result => {
                setTokenType(result.token_type);
                setAccessToken(result.access_token);
                setRefreshToken(result.refresh_token);
            })
            .catch(err => console.error(err));
    }, [])

    return (
        <>
            {refreshToken ?
                <Switch>
                    {/*Step 1*/}
                    <Route exact path="/post/video/">
                        <Redirect to="/post/video/step-1"/>
                    </Route>
                    <Route path="/post/video/step-1">
                        <VideoStep01 tokenType={tokenType} setTokenType={setTokenType}
                                     accessToken={accessToken} setAccessToken={setAccessToken}
                                     refreshToken={refreshToken} setRefreshToken={setRefreshToken}
                                     title={title} setTitle={setTitle}
                                     description={description} setDescription={setDescription}
                                     setVideoId={setVideoId}/>
                    </Route>
                    {/*Step 2*/}
                    <Route path="/post/video/step-2">
                        <VideoStep02 tokenType={tokenType} setTokenType={setTokenType}
                                     accessToken={accessToken} setAccessToken={setAccessToken}
                                     refreshToken={refreshToken} setRefreshToken={setRefreshToken}
                                     link={link} setLink={setLink}
                                     videoId={videoId}/>
                    </Route>
                    {/*Not found*/}
                    <Route><Redirect to="/not-found"/></Route>
                </Switch>
                :
                <SectionLoader/>
            }
        </>

    )
}

export default PostVideo;