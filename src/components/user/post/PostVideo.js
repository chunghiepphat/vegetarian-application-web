import React, {useContext, useEffect, useState} from "react";
import {Redirect, Route, Switch, useHistory} from "react-router-dom";
import {UserContext} from "../../../context/UserContext";
import {apiUrl} from "../../../helpers/Variables";
import {apiKey} from "../../../helpers/Cloudinary";
import VideoStep01 from "./video/VideoStep01";
import VideoStep02 from "./video/VideoStep02";
import {SectionLoader} from "../../commons/elements/loaders/Loader";

const PostVideo = () => {
    const user = useContext(UserContext);
    const token = JSON.parse(localStorage.getItem("accessToken"));
    const api = `${apiUrl}/video/upload`;
    const history = useHistory();
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [category, setCategory] = useState("1");
    const [link, setLink] = useState();

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

    return (
            <Switch>
                {/*Step 1*/}
                <Route exact path="/post/video/">
                    <Redirect to="/post/video/step-1"/>
                </Route>
                <Route path="/post/video/step-1">
                    <VideoStep01 title={title} setTitle={setTitle}
                                 description={description} setDescription={setDescription}/>
                </Route>
                {/*Step 2*/}
                <Route path="/post/video/step-2">
                    <VideoStep02 link={link} setLink={setLink}
                                 submitPost={submitPost}/>
                </Route>
                {/*Not found*/}
                <Route><Redirect to="/not-found"/></Route>
            </Switch>
    )
}

export default PostVideo;