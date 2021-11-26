import React, {useContext, useEffect, useState} from "react";
import {requestErrorStrings} from "../../../resources/CommonDisplayStrings";
import {viewDisplayStrings} from "../../../resources/PublicDisplayStrings";
import {LocaleContext} from "../../../context/LocaleContext";
import {UserContext} from "../../../context/UserContext";
import {apiUrl} from "../../../helpers/Variables";
import {Link, useLocation} from "react-router-dom";
import Comment from "../../commons/elements/Comment";
import {SectionErr} from "../../commons/elements/loaders/AlertError";
import {SectionEmp} from "../../commons/elements/loaders/AlertEmpty";
import {FaAngleRight} from "react-icons/fa";

const ArticleComments = ({type, data}) => {
    const location = useLocation();

    // Localizations
    viewDisplayStrings.setLanguage(useContext(LocaleContext));
    requestErrorStrings.setLanguage(useContext(LocaleContext));

    // Gets user info
    const user = useContext(UserContext);
    const token = JSON.parse(localStorage.getItem("accessToken"));

    // Handles fetching comments
    const [comments, setComments] = useState([]);
    const [isError, setIsError] = useState(false);
    const fetchComments = async () => {
        setIsError(false);
        let api;
        switch (type) {
            case "recipe":
                api = `${apiUrl}/recipes/${data.recipe_id}/comments`;
                break;
            case "video":
                api = `${apiUrl}/video/${data.id}/comments`;
                break;
            case "blog":
                api = `${apiUrl}/blogs/${data.blog_id}/comments`;
                break;
        }
        try {
            const response = await fetch(api);
            if (response.ok) {
                const result = await response.json();
                switch (type) {
                    case "recipe":
                        setComments(result.listCommentRecipe);
                        break;
                    case "video":
                        setComments(result.listCommentVideo);
                        break;
                    case "blog":
                        setComments(result.listCommentBlog);
                        break;
                }
            } else if (response.status >= 400 && response.status < 600) {
                setIsError(true);
            }
        } catch (error) {
            setIsError(true);
        }
    }
    useEffect(() => {
        fetchComments();
    }, [data]);

    // Handles posting comments
    const [comment, setComment] = useState("");
    const submitComment = async (e) => {
        e.preventDefault();
        // Generates request headers
        let headers = new Headers();
        if (token) headers.append("Authorization", `Bearer ${token.token}`);
        headers.append("Content-Type", "application/json");
        headers.append("Accept", "application/json");
        let api; // API endpoint
        let body; // Generates request body
        switch (type) {
            case "recipe":
                api = `${apiUrl}/user/commentrecipe`;
                body = JSON.stringify({
                    "user_id": user.id,
                    "recipe_id": data.recipe_id,
                    "content": comment,
                });
                break;
            case "video":
                api = `${apiUrl}/user/commentvideo`;
                body = JSON.stringify({
                    "user_id": user.id,
                    "video_id": data.id,
                    "content": comment,
                });
                break;
            case "blog":
                api = `${apiUrl}/user/commentblog`;
                body = JSON.stringify({
                    "user_id": user.id,
                    "blog_id": data.blog_id,
                    "content": comment,
                });
                break;
        }
        // Generates request
        let request = {
            method: 'POST',
            headers: headers,
            body: body,
        };
        // Executes fetch
        try {
            const response = await fetch(api, request);
            if (response.ok) {
                await fetchComments(); // Reloads comments on success
                setComment(""); // Resets input
            } else if (response.status === 401) {
                alert(requestErrorStrings.requestErrorUnauthorized)
            } else {
                alert(requestErrorStrings.requestErrorStatus + response.status);
            }
        } catch (error) {
            alert(requestErrorStrings.requestErrorException + error);
        }
    }

    return (
        <section className="article-comments">
            <h2>{viewDisplayStrings.viewArticleComments}</h2>
            {user && user.role !== "admin" ?
                <form className="form-comment" onSubmit={submitComment}>
                    <input aria-label="Comment" type="text" value={comment}
                           onChange={e => setComment(e.target.value)}
                           placeholder={viewDisplayStrings.viewArticleCommentsInputPlaceholder} required/>
                </form>
                : <Link to={{
                    pathname: "/login",
                    state: {background: location}
                }}>{viewDisplayStrings.viewArticleCommentsSignIn} <FaAngleRight/></Link>}
            {!isError ? <>
                {comments && comments.length > 0 ? <>
                    {comments.map(item => (
                        <Comment key={item.id}
                                 userId={item.user_id}
                                 commentId={item.id}
                                 content={item.content}
                                 time={item.time}
                                 articleType={type}
                                 reload={fetchComments}/>))}
                </> : <SectionEmp message={viewDisplayStrings.viewArticleCommentsEmpty}/>}
            </> : <SectionErr reload={fetchComments}/>}
        </section>
    )
}

export default ArticleComments;