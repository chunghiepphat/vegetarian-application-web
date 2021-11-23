import React, {useContext, useEffect, useState} from "react";
import LocalizedStrings from "react-localization";
import {Link, useLocation} from "react-router-dom";
import {apiUrl} from "../../../../helpers/Variables";
import {UserContext} from "../../../../context/UserContext";
import Comment from "../../../commons/elements/Comment";
import {SectionErr} from "../../../commons/elements/loaders/AlertError";
import {FaAngleRight} from "react-icons/fa";
import {SectionEmp} from "../../../commons/elements/loaders/AlertEmpty";

const BlogComments = ({data}) => {
    const location = useLocation();
    // Localizations
    let strings = new LocalizedStrings({
        en: {
            header: "Comments",
            inputPlaceholder: "What do you think about this article?",
            noCommentsMessage: "Be the first to comment!",
            signIn: "Sign in to comment!",
        },
        vi: {
            header: "Bình luận",
            inputPlaceholder: "Bạn nghĩ sao về bài viết này?",
            noCommentsMessage: "Hãy là người đầu tiên bình luận ở đây!",
            signIn: "Hãy đăng nhập để bình luận!",
        }
    });
    const user = useContext(UserContext);
    const token = JSON.parse(localStorage.getItem("accessToken"));
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [isError, setIsError] = useState(false);
    const fetchComments = async () => {
        setIsError(false);
        const api = `${apiUrl}/blogs/${data.blog_id}/comments`;
        try {
            const response = await fetch(api);
            if (response.ok) {
                const result = await response.json();
                setComments(result.listCommentBlog);
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
        const api = `${apiUrl}/user/commentblog`;
        try {
            const response = await fetch(api, request);
            if (response.ok) {
                await fetchComments();
                setComment("");
            } else if (response.status === 401) {
                alert("You are not authorized to do that.")
            } else {
                alert("Unexpected error with code: " + response.status);
            }
        } catch (error) {
            console.log(error);
        }
    }
    // Executes fetch once on page load
    useEffect(() => {
        fetchComments();
    }, [data]);

    return (
        <section className="article-comments">
            <h2>{strings.header}</h2>
            {user && user.role !== "admin" ?
                <form className="form-comment" onSubmit={submitComment}>
                    <input aria-label="Comment" type="text" value={comment}
                           onChange={e => setComment(e.target.value)}
                           placeholder={strings.inputPlaceholder} required/>
                </form>
                : <Link to={{
                    pathname: "/login",
                    state: {background: location}
                }}>{strings.signIn} <FaAngleRight/></Link>}
            {!isError ? <>
                {comments && comments.length > 0 ? <>
                    {comments.map(item => (
                        <Comment userId={item.user_id}
                                 commentId={item.id}
                                 content={item.content}
                                 time={item.time}
                                 articleType="blog"
                                 reload={fetchComments}/>))}
                </> : <SectionEmp message={strings.noCommentsMessage}/>}
            </> : <SectionErr reload={fetchComments}/>}
        </section>
    )
}

export default BlogComments;