import React, {useContext, useEffect, useState} from "react";
import Comment from "../../../commons/elements/Comment";
import {UserContext} from "../../../../context/UserContext";
import {apiBase} from "../../../../helpers/Helpers";
import {Link, useLocation} from "react-router-dom";
import {FaAngleRight} from "react-icons/fa";
import {SectionLoader} from "../../../commons/elements/loaders/Loader";

const RecipeComments = ({data}) => {
    const location = useLocation();
    const user = useContext(UserContext);
    const token = JSON.parse(localStorage.getItem("accessToken"));
    const api = `${apiBase}/recipes/${data.recipe_id}/comments`;
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [isError, setIsError] = useState(false);

    const fetchData = async () => {
        const response = await fetch(api);
        if (response.ok) {
            const result = await response.json();
            setComments(result.listCommentRecipe);
        } else if (response.status >= 400 && response.status < 600) {
            setIsError(true);
        }
    }

    const submitComment = async (e) => {
        e.preventDefault();
        const url = `${apiBase}/user/commentrecipe`;
        // Generates request headers
        let headers = new Headers();
        headers.append("Authorization", `Bearer ${token.token}`);
        headers.append("Content-Type", "application/json");
        headers.append("Accept", "application/json");
        // Generates request body
        let body = JSON.stringify({
            "user_id": user.id,
            "recipe_id": data.recipe_id,
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
    }, [data]);

    return (
        <section className="article-comments">
            <h2>Comments</h2>
            {user && user.role !== "admin" ?
                <form className="form-comment" onSubmit={submitComment}>
                    <input aria-label="Blog title" type="text" value={comment}
                           onChange={e => setComment(e.target.value)}
                           placeholder="Share your thoughts about this recipe..." required/>
                </form>
                :
                <Link to={{
                    pathname: "/login",
                    state: {background: location}
                }}>
                    Sign in to comment! <FaAngleRight/>
                </Link>
            }
            {!isError ?
                <>
                    {comments && comments.length > 0 ?
                        comments.map(comment => (
                            <Comment userId={comment.user_id}
                                     commentId={comment.id}
                                     content={comment.content}
                                     time={comment.time}
                                     articleType="recipe"
                                     reload={fetchData}/>))
                        :
                        <em>Be the first to comment on this recipe!</em>
                    }
                </>
                :
                <em>We couldn't load the comments.</em>
            }
        </section>
    )
}

export default RecipeComments;