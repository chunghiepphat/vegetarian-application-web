import React, {useContext, useEffect, useState} from "react";
import {apiBase} from "../../../../helpers/Helpers";
import {UserContext} from "../../../../context/UserContext";
import Comment from "../../../commons/elements/Comment";

const BlogComments = ({data}) => {
    const user = useContext(UserContext);
    const token = JSON.parse(localStorage.getItem("accessToken"));
    const api = `${apiBase}/blogs/${data.blog_id}/comments`;
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);

    const fetchData = async () => {
        const response = await fetch(api);
        const result = await response.json();
        setComments(result.listCommentBlog);
    }

    const submitComment = async (e) => {
        e.preventDefault();
        const url = `${apiBase}/user/commentblog`;
        // Generates request headers
        let headers = new Headers();
        headers.append("Authorization", `Bearer ${token.token}`);
        headers.append("Content-Type", "application/json");
        headers.append("Accept", "application/json");

        // Generates request body
        let body = JSON.stringify({
            "user_id": user.id,
            "blog_id": data.blog_id,
            "content": comment,
        });

        // Generates request
        let request = {
            method: 'POST',
            headers: headers,
            body: body,
        };

        // Executes fetch
        const response = await fetch(url, request);
        if (response.ok) {
            await fetchData();
            setComment("");
        } else if (response.status === 401) {
            alert("You are not authorized to do that.")
        } else {
            alert("Unexpected error with code: " + response.status);
        }
    }

    // Executes fetch once on page load
    useEffect(() => {
        fetchData().catch(error => {
            console.error(error);
        });
    }, []);

    return (
        <section className="article-comments">
            <h3>Comments</h3>
            <form className="form-comment" onSubmit={submitComment}>
                <input aria-label="Blog title" type="text" value={comment}
                       onChange={e => setComment(e.target.value)}
                       placeholder="What do you think?" required/>
            </form>
            {comments.length > 0 && comments.map(comment => (
                <Comment userId={comment.user_id}
                         commentId={comment.id}
                         content={comment.content}
                         time={comment.time}
                         articleType="blog"
                         reload={fetchData}/>
            ))}
        </section>
    )
}

export default BlogComments;