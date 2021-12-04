import React, {useContext, useEffect, useRef, useState} from "react";
import {requestErrorStrings} from "../../../resources/CommonDisplayStrings";
import {postDisplayStrings} from "../../../resources/UserDisplayStrings";
import {LocaleContext} from "../../../context/LocaleContext";
import {apiUrl} from "../../../helpers/Variables";
import {cloudName, uploadPreset} from "../../../helpers/Cloudinary";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import InputGroup from "../../commons/elements/form/InputGroup";
import {Redirect, Route, Switch} from "react-router-dom";
import FinishPost from "./FinishPost";

const PostBlog = ({user, token, history}) => {
    // Localizations
    postDisplayStrings.setLanguage(useContext(LocaleContext));

    const [articleId, setArticleId] = useState();
    // Input values
    const inputRef = useRef();
    const [title, setTitle] = useState();
    const [subtitle, setSubtitle] = useState();
    const [content, setContent] = useState("");
    const [thumbnailUrl, setThumbnailUrl] = useState("");
    const [thumbnailFile, setThumbnailFile] = useState("");
    const [isPrivate, setIsPrivate] = useState(false);

    // Handles image selection
    const [image, setImage] = useState(null)
    const handleChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setThumbnailFile(event.target.files[0]);
            setImage(URL.createObjectURL(event.target.files[0]));
        }
    }

    // Quill JS handlers
    const modules = {
        toolbar: [
            [{'header': [1, 2, 3, false]}],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
            ['link', 'image'],
            ['clean']
        ],
    }
    const handleQuill = (value) => {
        setContent(value);
    }

    // Clears selected image
    const handleClear = (e) => {
        e.preventDefault();
        setImage(undefined);
    }

    // Handles form submission, image upload and getting image URL
    const [isLoading, setIsLoading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState("");
    const submitPost = async (e) => {
        e.preventDefault();
        setIsPrivate(e.nativeEvent.submitter.name);
        setIsLoading(true);
        setUploadProgress(postDisplayStrings.postArticleProcessingImages)
        // Generates form data
        const formData = new FormData();
        formData.append("file", thumbnailFile);
        formData.append("upload_preset", uploadPreset);
        // Generates request
        const request = {
            method: 'POST',
            body: formData,
            redirect: 'follow'
        };
        // Handles uploading images
        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, request)
        try {
            // Handles recipe submission upon successful upload
            if (response.ok) {
                // Gets uploaded image URL
                const result = await response.json();
                setThumbnailUrl(result.secure_url);
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

    // Handles fetch for post submission upon image upload completion
    const uploadPost = async () => {
        setIsLoading(true);
        setUploadProgress(postDisplayStrings.postArticleUploading);
        // Generates request headers
        let headers = new Headers();
        if (token) headers.append("Authorization", `Bearer ${token.token}`);
        headers.append("Content-Type", "application/json");
        headers.append("Accept", "application/json");
        // Generates request body
        let body = JSON.stringify({
            "user_id": user.id,
            "blog_title": title,
            "blog_subtitle": subtitle,
            "blog_thumbnail": thumbnailUrl,
            "blog_content": content,
            "is_private": isPrivate,
        });
        // Generates request
        let request = {
            method: 'POST',
            headers: headers,
            body: body,
        };
        // Executes fetch
        const api = `${apiUrl}/blogs/add`;
        const response = await fetch(api, request);
        try {
            if (response.ok) {
                const result = await response.json();
                setArticleId(result.id);
                alert(postDisplayStrings.postArticleUploadSuccess);
                history.push("/post/blog/finish");
            } else if (response.status === 401) {
                alert(requestErrorStrings.requestErrorUnauthorized);
                setIsLoading(false);
                setUploadProgress(null);
            } else {
                alert(requestErrorStrings.requestErrorStatus + response.status);
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
        if (thumbnailUrl) {
            uploadPost();
        }
    }, [thumbnailUrl]);

    return (
        <Switch>
            <Route exact path="/post/blog">
                <section>
                    <header className="section-header">
                        <h1>{postDisplayStrings.postBlog}</h1>
                        <em>{postDisplayStrings.postBlogSubheader}</em>
                    </header>
                    <div className="section-content">
                        <form className="form-container" onSubmit={submitPost}>
                            <label htmlFor={"file-selector"}>
                                {image ?
                                    <picture className="preview-thumbnail">
                                        <source srcSet={image}/>
                                        <img src="" alt=""/>
                                    </picture>
                                    : <div className="upload-thumbnail">
                                        <h1>{postDisplayStrings.postBlogThumbnail}</h1>
                                        <p>{postDisplayStrings.postBlogThumbnailPlaceholder}</p>
                                    </div>}
                            </label>
                            <input id="file-selector" style={{display: "none"}}
                                   aria-label="Recipe thumbnail" type="file"
                                   onChange={handleChange}
                                   ref={inputRef} readOnly={isLoading}/>
                            <input aria-label="Blog title" type="text" value={title}
                                   onChange={e => setTitle(e.target.value)}
                                   placeholder={postDisplayStrings.postBlogTitle}
                                   readOnly={isLoading} required/>
                            <input aria-label="Blog subtitle" type="text" value={subtitle}
                                   onChange={e => setSubtitle(e.target.value)}
                                   placeholder={postDisplayStrings.postBlogSubtitle}
                                   readOnly={isLoading}/>
                            <ReactQuill theme="snow" value={content}
                                        onChange={handleQuill}
                                        modules={modules} readOnly={isLoading}
                                        placeholder={postDisplayStrings.postBlogContent}>
                            </ReactQuill>
                            <div className="sticky-bottom">
                                <InputGroup>
                                    {isLoading ? <>
                                        <button disabled>{uploadProgress}</button>
                                    </> : <>
                                        {image ? <>
                                            <button className="button-light"
                                                    onClick={handleClear}>{postDisplayStrings.postBlogClearThumbnail}</button>
                                            <button type="submit" className="button-dark"
                                                    name="true">{postDisplayStrings.postBlogSaveDraft}</button>
                                            <button type="submit" className="button-dark"
                                                    name="false">{postDisplayStrings.postBlogSubmitForReview}</button>
                                        </> : <>
                                            <button disabled>{postDisplayStrings.postBlogClearThumbnail}</button>
                                            <button disabled>{postDisplayStrings.postBlogSaveDraft}</button>
                                            <button disabled>{postDisplayStrings.postBlogSubmitForReview}</button>
                                        </>}
                                    </>}
                                </InputGroup>
                            </div>
                        </form>
                    </div>
                </section>
            </Route>
            <Route path="/post/blog/finish">
                <FinishPost articleId={articleId} type="blog"/> </Route>
            <Route><Redirect to="/not-found"/></Route>
        </Switch>

    )
}

export default PostBlog;