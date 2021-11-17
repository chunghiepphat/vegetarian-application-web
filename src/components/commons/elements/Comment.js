import React, {useContext, useEffect, useState} from "react";
import "./Comment.css";
import {apiBase} from "../../../helpers/Variables";
import {UserContext} from "../../../context/UserContext";
import Avatar from "./Avatar";
import moment from "moment";
import {Link} from "react-router-dom";

const Comment = ({userId, commentId, content, time, articleType, reload}) => {
    const user = useContext(UserContext);
    const token = JSON.parse(localStorage.getItem("accessToken"));
    const [contentString, setContentString] = useState(content);
    const [isEditing, setIsEditing] = useState(false);
    const [author, setAuthor] = useState();
    // Generates request headers
    let headers = new Headers();
    headers.append("Authorization", `Bearer ${token.token}`);
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    const enableEdit = (e) => {
        e.preventDefault();
        setIsEditing(true);
    }
    const handleEdit = async (e) => {
        e.preventDefault();
        // Generates request body
        let body = JSON.stringify({
            "content": contentString,
        });
        // Generates request
        let request = {
            method: 'PUT',
            headers: headers,
            body: body
        };
        // Executes fetch
        const api = `${apiBase}/user/edit/comment${articleType}/${commentId}`;
        try {
            const response = await fetch(api, request);
            if (response.ok) {
                setIsEditing(false);
                reload();
            } else if (response.status === 401) {
                alert("You are not authorized to complete the request.")
            } else {
                alert("Error: " + response.status);
            }
        } catch (error) {
            alert("Unexpected error: " + error);
        }

    }
    const deleteComment = async (e) => {
        e.preventDefault();
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
        const api = `${apiBase}/user/deleteComment/${commentId}/${articleType}`;
        try {
            const response = await fetch(api, request);
            if (response.ok) {
                alert("Your comment has been deleted.");
                reload();
            } else if (response.status === 401) {
                alert("You are not authorized to complete the request.")
            } else {
                alert("Error: " + response.status);
            }
        } catch (error) {
            alert("Unexpected error: " + error);
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
                    <div className="comment-user">
                        {author.first_name} {author.last_name}
                        {user && user.id === author.id && <> (you) </>}
                        <span className="comment-timestamp">
                            {moment(time).format("lll")}
                        </span>
                    </div>}
                    {author && <Link to={`/view/user/${author.id}`}/>}
                </div>
                {user && user.id === userId &&
                <div className="comment-toolbar">
                    <button className="comment-button" onClick={enableEdit}>Edit</button>
                    <button className="comment-button" onClick={deleteComment}>Delete</button>
                </div>}
            </div>
            {isEditing ? <>
                <form onSubmit={handleEdit}>
                    <input value={contentString} onChange={e => setContentString(e.target.value)}/>
                </form>
            </> : <>
                <div className="comment-content">
                    {content}
                </div>
            </>}
        </div>
    )
}

export default Comment;