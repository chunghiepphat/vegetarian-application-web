import React, {useContext, useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import {apiBase} from "../../../../helpers/Variables";
import {UserContext} from "../../../../context/UserContext";
import Comment from "../../../commons/elements/Comment";
import {SectionErr} from "../../../commons/elements/loaders/AlertError";
import {FaAngleRight} from "react-icons/fa";

const VideoComments = ({data}) => {
    const location = useLocation();
    const user = useContext(UserContext);
    const token = JSON.parse(localStorage.getItem("accessToken"));
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [isError, setIsError] = useState(false);
    const fetchComments = async () => {
        setIsError(false);
        const api = `${apiBase}/video/${data.id}/comments`;
        try {
            const response = await fetch(api);
            if (response.ok) {
                const result = await response.json();
                setComments(result.listCommentVideo);
            } else if (response.status >= 400 && response.status < 600) {
                setIsError(true);
            }
        } catch (error) {
            setIsError(true);
        }

    }
    const submitComment = async (e) => {
        e.preventDefault();
        // Generates request headers
        let headers = new Headers();
        if (token) headers.append("Authorization", `Bearer ${token.token}`);
        headers.append("Content-Type", "application/json");
        headers.append("Accept", "application/json");
        // Generates request body
        let body = JSON.stringify({
            "user_id": user.id,
            "video_id": data.id,
            "content": comment,
        });
        // Generates request
        let request = {
            method: 'POST',
            headers: headers,
            body: body,
        };
        // Executes fetch
        const api = `${apiBase}/user/commentvideo`;
        const response = await fetch(api, request);
        if (response.ok) {
            await fetchComments();
            setComment("");
        } else if (response.status === 401) {
            alert("You are not authorized to do that.")
        } else {
            alert("Unexpected error with code: " + response.status);
        }
    }
    // Executes fetch once on page load
    useEffect(() => {
        fetchComments().catch(error => {
            console.error(error);
        });
    }, [data]);
    return (
        <section className="article-comments">
            <h2>Comments</h2>
            {user && user.role !== "admin" ?
                <form className="form-comment" onSubmit={submitComment}>
                    <input aria-label="Comment" type="text" value={comment}
                           onChange={e => setComment(e.target.value)}
                           placeholder="Share your thoughts about this recipe..." required/>
                </form>
                : <Link to={{
                    pathname: "/login",
                    state: {background: location}
                }}>Sign in to comment! <FaAngleRight/></Link>}
            {!isError ? <>
                {comments && comments.length > 0 ? <>
                    {comments.map(item => (
                        <Comment userId={item.user_id}
                                 commentId={item.id}
                                 content={item.content}
                                 time={item.time}
                                 articleType="video"
                                 reload={fetchComments}/>))}
                </> : <em>Be the first to comment on this recipe!</em>}
            </> : <SectionErr reload={fetchComments}/>}
        </section>
    )
}
export default VideoComments;