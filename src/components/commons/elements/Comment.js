import React, {useContext, useEffect, useState} from "react";
import "./Comment.css";
import {requestErrorStrings} from "../../../resources/CommonDisplayStrings";
import {viewDisplayStrings} from "../../../resources/PublicDisplayStrings";
import {LocaleContext} from "../../../context/LocaleContext";
import {UserContext} from "../../../context/UserContext";
import {apiUrl} from "../../../helpers/Variables";
import moment from "moment";
import {Link} from "react-router-dom";
import Avatar from "./Avatar";
import {FaEdit} from "react-icons/fa";

const Comment = ({userId, commentId, content, time, articleType, reload}) => {
    // Localizations
    requestErrorStrings.setLanguage(useContext(LocaleContext));
    viewDisplayStrings.setLanguage(useContext(LocaleContext));

    // Gets user info
    const user = useContext(UserContext);
    const token = JSON.parse(localStorage.getItem("accessToken"));

    // Generates request headers
    let headers = new Headers();
    if (token) headers.append("Authorization", `Bearer ${token.token}`);
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    // Enables / Disables comment editing
    const [isEditing, setIsEditing] = useState(false);
    const enableEdit = (e) => {
        e.preventDefault();
        setIsEditing(true);
    }
    const disableEdit = (e) => {
        e.preventDefault();
        setIsEditing(false);
    }

    // Handles editing comments
    const [contentString, setContentString] = useState(content);
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
        const api = `${apiUrl}/user/edit/comment${articleType}/${commentId}`;
        try {
            const response = await fetch(api, request);
            if (response.ok) {
                setIsEditing(false);
                reload();
            } else if (response.status === 401) {
                alert(requestErrorStrings.requestErrorUnauthorized)
            } else {
                alert(requestErrorStrings.requestErrorStatus + response.status);
            }
        } catch (error) {
            alert(requestErrorStrings.requestErrorException + error);
        }
    }

    // Handles deleting comments
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
        const api = `${apiUrl}/user/deleteComment/${commentId}/${articleType}`;
        try {
            const response = await fetch(api, request);
            if (response.ok) {
                alert("Your comment has been deleted.");
                reload();
            } else if (response.status === 401) {
                alert(requestErrorStrings.requestErrorUnauthorized)
            } else {
                alert(requestErrorStrings.requestErrorStatus + response.status);
            }
        } catch (error) {
            alert(requestErrorStrings.requestErrorException + error);
        }
    }

    // Gets comment author's info
    const [author, setAuthor] = useState();
    const fetchAuthor = async () => {
        const api = `${apiUrl}/user/${userId}`
        try {
            const response = await fetch(api);
            if (response.ok) {
                const result = await response.json();
                setAuthor(result);
            }
        } catch (error) {
        }

    }
    useEffect(() => {
        fetchAuthor();
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
                    {!isEditing ? <button className="comment-button" onClick={enableEdit}>
                            <FaEdit/> {viewDisplayStrings.viewArticleEnableEditComment}</button>
                        : <button className="comment-button" onClick={disableEdit}>
                            {viewDisplayStrings.viewArticleCancelEditComment}</button>}
                    <button className="comment-button" onClick={deleteComment}>
                        {viewDisplayStrings.viewArticleDeleteComment}</button>
                </div>}
            </div>
            {isEditing ?
                <form onSubmit={handleEdit}>
                    <input value={contentString} onChange={e => setContentString(e.target.value)}/>
                </form> : <div className="comment-content">{content}</div>}
        </div>
    )
}

export default Comment;