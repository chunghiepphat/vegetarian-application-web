import React, {useContext, useEffect, useState} from "react";
import {FaHeart, FaRegHeart, RiDeleteBin4Line, RiEditLine} from "react-icons/all";
import {UserContext} from "../../../../context/UserContext";
import {apiBase} from "../../../../helpers/Helpers";
import {useHistory, useLocation} from "react-router-dom";

const BlogToolbar = ({id, data, reload}) => {
    const location = useLocation();
    const history = useHistory();
    const user = useContext(UserContext);
    const token = JSON.parse(localStorage.getItem("accessToken"));
    const [isFavorite, setIsFavorite] = useState(false);

    // Generates request headers
    let headers = new Headers();
    if (token !== null) {
        headers.append("Authorization", `Bearer ${token.token}`);
    }
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    // Checks if article is already favorite for current user
    const checkFavorite = async () => {
        // Generates request
        let request = {
            method: 'GET',
            headers: headers,
        };

        // Executes fetch
        if (user !== undefined) {
            const api = `${apiBase}/user/blog/islike?userID=${user.id}&blogID=${id}`
            const response = await fetch(api, request);
            const result = await response.json();
            console.log(result.is_Liked);
            setIsFavorite(result.is_Liked);
        }
    }

    const favoriteArticle = async (e) => {
        e.preventDefault();
        // Generates request body
        let body = JSON.stringify({
            "user_id": user.id,
            "blog_id": data.blog_id,
        });

        // Generates request
        let request = {
            method: 'POST',
            headers: headers,
            body: body,
        };

        // Executes fetch
        const api = `${apiBase}/blogs/like`;
        const response = await fetch(api, request);
        if (response.ok) {
            reload();
        } else if (response.status === 401) {
            alert("You are not authorized to complete the request.")
        } else {
            alert("Error: " + response.status);
        }
    }

    const editArticle = () => {
        history.push(`/view/blog/${id}/edit`)
    }

    const deleteArticle = async (e) => {
        e.preventDefault();
        // Generates request
        let request = {
            method: 'DELETE',
            headers: headers,
        };

        // Executes fetch
        const api = `${apiBase}/blogs/delete/${data.blog_id}`;
        const response = await fetch(api, request);
        if (response.ok) {
            alert("Your article has been deleted.");
            history.push("/home");
        } else if (response.status === 401) {
            alert("You are not authorized to complete the request.")
        } else {
            alert("Error: " + response.status);
        }
    }

    useEffect(checkFavorite);

    return (
        <section className="article-toolbar">
            {user && user.role !== "admin" ?
                // If user is logged in, show toolbar
                <div>
                    <button className={`article-button button-labeled ${isFavorite && "button-active"}`}
                            onClick={favoriteArticle}>
                        {!isFavorite ?
                            <FaRegHeart/>
                            :
                            <FaHeart/>
                        }
                        {data.totalLike}
                    </button>
                    {data && user.id === data.user_id &&
                    // If user is the author of the article, allow modify
                    <>
                        <button className="article-button" onClick={editArticle}>
                            <RiEditLine/>
                        </button>
                        <button className="article-button" onClick={deleteArticle}>
                            <RiDeleteBin4Line/>
                        </button>
                    </>
                    }
                </div>
                :
                // If not logged in, the favorite button directs to login form
                <div>
                    <button className={`article-button button-labeled ${isFavorite && "button-active"}`}
                            onClick={() => history.push({
                                pathname: "/login",
                                state: {background: location}
                            })}>
                        <FaRegHeart/>
                        {data.totalLike}
                    </button>
                </div>
            }
        </section>
    )
}

export default BlogToolbar;