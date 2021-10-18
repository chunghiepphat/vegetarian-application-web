import React, {useContext, useState} from "react";
import BlogHeader from "../../home/view/blog/BlogHeader";
import EditSubtitle from "./blog/EditSubtitle";
import EditContent from "./blog/EditContent";
import {UserContext} from "../../../context/UserContext";
import {apiBase} from "../../../helpers/Helpers";
import {useHistory} from "react-router-dom";
import Form from "../../commons/elements/form/Form";

const EditBlog = ({id, data}) => {
    const user = useContext(UserContext);
    const token = JSON.parse(localStorage.getItem("accessToken"));
    const history = useHistory();

    const [subtitle, setSubtitle] = useState(data.blog_subtitle);
    const [content, setContent] = useState(data.blog_content);

    const updatePost = async (e) => {
        e.preventDefault();

        // Generates request headers
        let headers = new Headers();
        headers.append("Authorization", `Bearer ${token.token}`);
        headers.append("Content-Type", "application/json");
        headers.append("Accept", "application/json");

        // Generates request body
        let body = JSON.stringify({
            "blog_title": data.blog_title,
            "blog_subtitle": subtitle,
            "blog_thumbnail": data.blog_thumbnail,
            "blog_content": content,
        });

        // Generates request
        let request = {
            method: 'PUT',
            headers: headers,
            body: body,
        };

        // Executes fetch
        const api = `${apiBase}/blogs/edit/${id}`;
        const response = await fetch(api, request);
        if (response.ok) {
            alert("Blog updated successfully!");
            history.push(`/view/blog/${id}`);
            window.location.reload();

        } else if (response.status === 401) {
            alert("You are not authorized to do that.")
        } else {
            alert("Unexpected error with code: " + response.status);
        }
    }

    return (
        <div className="section-content">
            {/*Recipe article container*/}
            <article>
                {/*Recipe title*/}
                <BlogHeader data={data}/>
                <Form onSubmit={updatePost}>
                    <EditSubtitle subtitle={subtitle} setSubtitle={setSubtitle}/>
                    <EditContent content={content} setContent={setContent}/>
                    <button type="submit">Finish</button>
                </Form>
            </article>
        </div>
    )
}

export default EditBlog;