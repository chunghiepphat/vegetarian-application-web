import React, {useContext, useEffect, useState} from "react";
import {requestErrorStrings} from "../../../resources/CommonDisplayStrings";
import {postDisplayStrings} from "../../../resources/UserDisplayStrings";
import {LocaleContext} from "../../../context/LocaleContext";
import {UserContext} from "../../../context/UserContext";
import {apiUrl} from "../../../helpers/Variables";
import {cloudName, uploadPreset} from "../../../helpers/Cloudinary";
import {Redirect, Route, Switch, useHistory} from "react-router-dom";
import VideoStep01 from "./video/VideoStep01";
import VideoStep02 from "./video/VideoStep02";
import FinishPost from "./FinishPost";

const PostVideo = () => {
    // Localizations
    let locale = useContext(LocaleContext);
    requestErrorStrings.setLanguage(locale);
    postDisplayStrings.setLanguage(locale);

    const user = useContext(UserContext);
    const token = JSON.parse(localStorage.getItem("accessToken"));
    const api = `${apiUrl}/video/upload`;
    const history = useHistory();
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [thumbnailUrl, setThumbnailUrl] = useState("");
    const [videoUrl, setVideoUrl] = useState();

    const [articleId, setArticleId] = useState();
    // Handles form submission and video upload to hosting services
    const [file, setFile] = useState();
    const [isPrivate, setIsPrivate] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState("");
    const submitPost = async (e) => {
        e.preventDefault();
        setIsPrivate(e.nativeEvent.submitter.name);
        setIsLoading(true);
        setUploadProgress(postDisplayStrings.postArticleProcessingImages)
        // Generates form data
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", uploadPreset);
        // Generates request
        const request = {
            method: 'POST',
            body: formData,
            redirect: 'follow'
        };
        // Handles uploading videos
        try {
            const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, request)
            // Handles recipe submission upon successful upload
            if (response.ok) {
                // Gets uploaded image URL
                const result = await response.json();
                setVideoUrl(result.secure_url);
                setThumbnailUrl(result.secure_url.replace(".mp4", ".jpg"))
            } else if (response.status >= 400 && response.status < 600) {
                alert(requestErrorStrings.hostingServiceErrorStatus + response.status);
                setIsLoading(false);
                setUploadProgress(null);
            }
        } catch (error) {
            alert(requestErrorStrings.requestErrorException + error);
            setIsLoading(false);
            setUploadProgress(null);
        }
    }

    // Uploads post upon video upload completion
    const uploadPost = async () => {
        setIsLoading(true);
        setUploadProgress(postDisplayStrings.postArticleUploading);
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
            "is_private": isPrivate,
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
                const result = await response.json();
                setArticleId(result.id);
                alert(postDisplayStrings.postArticleUploadSuccess);
                history.push("/post/video/finish");
            } else if (response.status >= 400 && response.status < 600) {
                alert(requestErrorStrings.hostingServiceErrorStatus + response.status);
                setIsLoading(false);
                setUploadProgress(null);
            }
        } catch (error) {
            alert(requestErrorStrings.requestErrorException + error);
            setIsLoading(false);
            setUploadProgress(null);
        }
    }

    // Initiates post upload when image URL is ready
    useEffect(() => {
        if (videoUrl) {
            uploadPost();
        }
    }, [thumbnailUrl]);

    return (
        <Switch>
            <Route exact path="/post/video/"><Redirect to="/post/video/step-1"/></Route>
            <Route path="/post/video/step-1">
                <VideoStep01 title={title} setTitle={setTitle}
                             description={description} setDescription={setDescription}/> </Route>
            <Route path="/post/video/step-2">
                <VideoStep02 setFile={setFile}
                             isLoading={isLoading} uploadProgress={uploadProgress}
                             submitPost={submitPost}/> </Route>
            <Route path="/post/video/finish">
                <FinishPost articleId={articleId} type="video"/> </Route>
            <Route><Redirect to="/not-found"/></Route>
        </Switch>
    )
}

export default PostVideo;