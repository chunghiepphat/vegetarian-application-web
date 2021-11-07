import React, {useContext, useEffect, useState} from "react";
import "./Comment.css";
import {apiBase} from "../../../helpers/Helpers";
import {UserContext} from "../../../context/UserContext";
import Avatar from "./Avatar";
import moment from "moment";

const Comment = ({userId, commentId, content, time, articleType, reload}) => {
    const user = useContext(UserContext);
    const token = JSON.parse(localStorage.getItem("accessToken"));
    const [author, setAuthor] = useState();
    const apiDelete = `${apiBase}/user/deleteComment/${commentId}/${articleType}`;
    const deleteComment = async (e) => {
        e.preventDefault();
        // Generates request headers
        let headers = new Headers();
        headers.append("Authorization", `Bearer ${token.token}`);
        headers.append("Content-Type", "application/json");
        headers.append("Accept", "application/json");
        // Generates request body
        let body = JSON.stringify({
            "user_id": userId,
        });
        // Generates request
        let request = {
            method: 'DELETE',
            headers: headers,
            body: body
        };
        // Executes fetch
        const response = await fetch(apiDelete, request);
        if (response.ok) {
            alert("Your comment has been deleted.");
            reload();
        } else if (response.status === 401) {
            alert("You are not authorized to complete the request.")
        } else {
            alert("Error: " + response.status);
        }
    }
    useEffect(() => {
        const api = `${apiBase}/user/${userId}`
        const fetchData = async () => {
            const response = await fetch(api);
            const result = await response.json();
            setAuthor(result);
        }
        fetchData().catch(error => {
            console.error(error);
        });
    }, [userId]);

    return (
        <div className="comment">
            <div className="comment-info">
                <div className="comment-author">
                    {author &&
                    <Avatar className={"comment-avatar"} userImage={author.profile_image}/>}
                    {author &&
                    <h1 className="comment-user">
                        {author.first_name} {author.last_name}
                        {user && user.id === author.id &&
                        <> (you)</>}
                        <span className="comment-timestamp">
                            {moment(time).format("lll")}
                        </span>
                    </h1>}
                </div>
                {user && user.id === userId &&
                <div className="comment-toolbar">
                    <button className="comment-button">
                        Edit
                    </button>
                    <button className="comment-button" onClick={deleteComment}>
                        Delete
                    </button>
                </div>}
            </div>
            <div className="comment-content">
                {content}
            </div>
        </div>
    )
}

export default Comment;