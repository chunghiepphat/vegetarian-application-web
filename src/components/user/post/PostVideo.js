import React, {useContext, useEffect, useState} from "react";
import {Redirect, Route, Switch, useHistory} from "react-router-dom";
import {UserContext} from "../../../context/UserContext";
import {apiUrl} from "../../../helpers/Variables";
import {apiKey} from "../../../helpers/Cloudinary";
import VideoStep01 from "./video/VideoStep01";
import VideoStep02 from "./video/VideoStep02";
import {SectionLoader} from "../../commons/elements/loaders/Loader";
import {requestErrorStrings} from "../../../resources/CommonDisplayStrings";
import {postDisplayStrings} from "../../../resources/UserDisplayStrings";

const PostVideo = () => {
    const user = useContext(UserContext);
    const token = JSON.parse(localStorage.getItem("accessToken"));
    const api = `${apiUrl}/video/upload`;
    const history = useHistory();
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [thumbnailUrl, setThumbnailUrl] = useState("");
    const [videoUrl, setVideoUrl] = useState();

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
            "video_category_id": "1",
            "video_description": description,
            "video_thumbnail": thumbnailUrl,
            "video_link": videoUrl,
        });

        // Generates request
        let request = {
            method: 'POST',
            headers: headers,
            body: body,
        };

        // Executes fetch
        try {
            const response = await fetch(api, request);
            if (response.ok) {
                alert(postDisplayStrings.postArticleUploadSuccess);
                history.push("/home");
            } else if (response.status >= 400 && response.status < 600) {
                alert(requestErrorStrings.hostingServiceErrorStatus + response.status);
            }
        } catch (error) {
            alert(requestErrorStrings.requestErrorException + error);
        }
    }

    return (
        <Switch>
            <Route exact path="/post/video/">
                <Redirect to="/post/video/step-1"/>
            </Route>
            <Route path="/post/video/step-1">
                <VideoStep01 title={title} setTitle={setTitle}
                             description={description} setDescription={setDescription}/>
            </Route>
            <Route path="/post/video/step-2">
                <VideoStep02 videoUrl={videoUrl} setVideoUrl={setVideoUrl}
                             setThumbnailUrl={setThumbnailUrl}
                             submitPost={submitPost}/>
            </Route>
            <Route><Redirect to="/not-found"/></Route>
        </Switch>
    )
}

export default PostVideo;