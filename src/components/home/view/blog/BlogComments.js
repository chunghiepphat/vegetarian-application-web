import React, {useState} from "react";
import {apiPattern} from "../../../../helpers/Helpers";

const BlogComments = ({data}) => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    const token = JSON.parse(localStorage.getItem("accessToken"));
    const api = `${apiPattern}/user/commentblog`;
    const [comment, setComment] = useState();

    const submitComment = async (e) => {
        e.preventDefault();

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
        const response = await fetch(api, request);
        if (response.ok) {
            alert("Comment posted.");
            window.location.reload();
        } else if (response.status === 401) {
            alert("You are not authorized to do that.")
        } else {
            alert("Unexpected error with code: " + response.status);
        }
    }

    return (
        <section className="article-comments">
            <h3>Comments</h3>
            <form className="form-comment" onSubmit={submitComment}>
                <input aria-label="Blog title" type="text" value={comment}
                       onChange={e => setComment(e.target.value)}
                       placeholder="What do you think?" required/>
            </form>
        </section>
    )
}

export default BlogComments;