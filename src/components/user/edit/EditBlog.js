import React, {useState} from "react";
import BlogHeader from "../../home/view/blog/BlogHeader";
import EditSubtitle from "./blog/EditSubtitle";
import EditContent from "./blog/EditContent";
import {apiBase} from "../../../helpers/Helpers";
import {Link, useHistory} from "react-router-dom";
import Form from "../../commons/elements/form/Form";
import {FaAngleLeft} from "react-icons/fa";
import InputGroup from "../../commons/elements/form/InputGroup";

const EditBlog = ({id, data}) => {
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
        } else if (response.status === 401) {
            alert("You are not authorized to do that.")
        } else {
            alert("Unexpected error with code: " + response.status);
        }
    }

    const cancelUpdate = () => {
        history.push(`/view/blog/${id}`);
    }

    return (
        <div className="section-content">
            {/*Recipe article container*/}
            <article>
                {/*Recipe title*/}
                <Link to={`/view/blog/${id}`}><FaAngleLeft/>Go back</Link>
                <BlogHeader data={data}/>
                <Form id="updateForm" onSubmit={updatePost}>
                    <EditSubtitle subtitle={subtitle} setSubtitle={setSubtitle}/>
                    <EditContent content={content} setContent={setContent}/>
                </Form>
            </article>
            <div className="sticky-bottom">
                <InputGroup>
                    <button className="button-cancel" onClick={cancelUpdate}>Cancel</button>
                    <button type="submit" form="updateForm" className="button-submit">Finish</button>
                </InputGroup>
            </div>
        </div>
    )
}

export default EditBlog;