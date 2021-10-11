import React, {useState} from "react";
import Navbar from "../../commons/elements/bars/Navbar";
import {NavLink, useHistory} from "react-router-dom";
import ReactQuill from "react-quill";

const EditBlog = () => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    const token = JSON.parse(localStorage.getItem("accessToken"));
    const api = `http://14.161.47.36:8080/hiepphat-0.0.1-SNAPSHOT/api/blogs/add`;
    const history = useHistory();

    const [title, setTitle] = useState();
    const [subtitle, setSubtitle] = useState();
    const [thumbnail, setThumbnail] = useState("");
    const [content, setContent] = useState("");

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
        console.log(content);
    }

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
            "blog_title": title,
            "blog_subtitle": subtitle,
            "blog_thumbnail": thumbnail,
            "blog_content": content,
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
            alert("Blog posted successfully!");
            history.push("/home");

        } else if (response.status === 401) {
            alert("You are not authorized to do that.")
        } else {
            alert("Unexpected error with code: " + response.status);
        }
    }

    return (
        <section>
            <header className="section-header">
                <h1>Share your story</h1>
                <em>Please keep content relevant to our site, which is about vegetarian food, recipes and
                    lifestyle.</em>
            </header>
            <div className="section-content">
                <form className="form-full" onSubmit={submitPost}>
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
                    <button type="submit">Finish</button>
                </form>
            </div>
        </section>
    )
}

export default EditBlog;