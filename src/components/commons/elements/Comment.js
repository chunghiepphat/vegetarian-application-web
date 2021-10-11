import React, {useContext, useEffect, useState} from "react";
import "./Comment.css";
import placeholderAvatar from "../../../assets/user-image-default.png";
import {apiPattern} from "../../../helpers/Helpers";
import Avatar from "./Avatar";
import {UserContext} from "../../../context/UserContext";
import {RiDeleteBin4Line, RiEditLine} from "react-icons/all";
import {useHistory} from "react-router-dom";
import moment from "moment";

const Comment = ({userId, commentId, content, time}) => {
    const history = useHistory();
    const user = useContext(UserContext);
    const token = JSON.parse(localStorage.getItem("accessToken"));
    const [author, setAuthor] = useState();
    const apiDelete = `${apiPattern}/user/deleteComment/${commentId}/recipe`;

    // Generates request headers
    let headers = new Headers();
    headers.append("Authorization", `Bearer ${token.token}`);
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    const deleteComment = async (e) => {
        e.preventDefault();
        // Generates request
        let request = {
            method: 'DELETE',
            headers: headers,
        };

        // Executes fetch
        const response = await fetch(apiDelete, request);
        if (response.ok) {
            alert("Your comment has been deleted.");
            history.push("/home");
        } else if (response.status === 401) {
            alert("You are not authorized to complete the request.")
        } else {
            alert("Error: " + response.status);
        }
    }

    useEffect(() => {
        const api = `${apiPattern}/user/${userId}`
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
                    <Avatar className={"comment-avatar"}/>
                    {author &&
                    <h1 className="comment-user">
                        {author.first_name}
                    </h1>}
                </div>
                <div className="comment-timestamp">
                    {moment(time).format("lll")}
                </div>
                {/*{user && user.id === userId &&*/}
                {/*<>*/}
                {/*    <button className="article-button">*/}
                {/*        <RiEditLine/>*/}
                {/*    </button>*/}
                {/*    <button className="article-button" onClick={deleteComment}>*/}
                {/*        <RiDeleteBin4Line/>*/}
                {/*    </button>*/}
                {/*</>*/}
                {/*}*/}
            </div>
            <div className="comment-content">{content}</div>
        </div>
    )
}

export default Comment;