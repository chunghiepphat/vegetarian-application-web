import React, {useEffect, useRef, useState} from "react";
import {cloudName, uploadPreset} from "../../../helpers/Cloudinary";
import {apiUrl} from "../../../helpers/Variables";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import InputGroup from "../../commons/elements/form/InputGroup";

const PostBlog = ({user, token, history}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState("");
    // Parameters
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
    // Quill JS toolbar config
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
        setImage();
    }
    // Handles form submission, image upload and getting image URL
    const submitPost = async (e) => {
        e.preventDefault();
        setIsPrivate(e.nativeEvent.submitter.name);
        setIsLoading(true);
        setUploadProgress("Processing image(s)...")
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
                alert("We couldn't reach our hosting services. Status code: " + response.status);
                setIsLoading(false);
                setUploadProgress();
            }
        } catch (error) {
            alert("There was an unexpected error. " + error);
            setIsLoading(false);
            setUploadProgress();
        }
    }
    // Handles fetch for post submission upon image upload completion
    const uploadPost = async () => {
        setIsLoading(true);
        setUploadProgress("Uploading your blog...")
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
                alert("Blog posted successfully!");
                history.push("/home");
            } else if (response.status === 401) {
                alert("You are not authorized to do that.")
                setIsLoading(false);
                setUploadProgress();
            } else {
                alert("An unexpected error has occurred. Status code: " + response.status);
                setIsLoading(false);
                setUploadProgress();
            }
        } catch (error) {
            alert("A network error has occurred.");
            setIsLoading(false);
            setUploadProgress();
        }
    }
    // Initiates post upload when image URL is ready
    useEffect(() => {
        if (thumbnailUrl) {
            uploadPost();
        }
    }, [thumbnailUrl]);

    return (
        <section>
            <header className="section-header">
                <h1>Share your story</h1>
                <em>Please keep content relevant to our site, which is about vegetarian food, recipes and
                    lifestyle.</em>
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
                                <h1>Upload a thumbnail for your blog post</h1>
                                <p>Click to pick an image...</p>
                            </div>}
                    </label>
                    <input id="file-selector" style={{display: "none"}}
                           aria-label="Recipe thumbnail" type="file"
                           onChange={handleChange}
                           ref={inputRef}/>
                    <input aria-label="Blog title" type="text" value={title}
                           onChange={e => setTitle(e.target.value)}
                           placeholder="Title" required/>
                    <input aria-label="Blog subtitle" type="text" value={subtitle}
                           onChange={e => setSubtitle(e.target.value)}
                           placeholder="Subtitle (optional)"/>
                    <ReactQuill theme="snow" value={content}
                                onChange={handleQuill}
                                modules={modules}
                                placeholder="What's your story?">
                    </ReactQuill>
                    <div className="sticky-bottom">
                        <InputGroup>
                            {isLoading ? <>
                                <button disabled>{uploadProgress}</button>
                            </> : <>
                                {image ? <>
                                    <button className="button-light" onClick={handleClear}>Clear thumbnail</button>
                                    <button type="submit" className="button-dark" name="true">Save draft</button>
                                    <button type="submit" className="button-dark" name="false">Publish</button>
                                </> : <>
                                    <button disabled>Clear thumbnail</button>
                                    <button disabled>Save draft</button>
                                    <button disabled>Publish</button>
                                </>}
                            </>}
                        </InputGroup>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default PostBlog;