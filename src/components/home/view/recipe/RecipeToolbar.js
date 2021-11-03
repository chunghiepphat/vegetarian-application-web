import React, {useContext, useEffect, useState} from "react";
import {AiOutlineEye, AiOutlineEyeInvisible, FaHeart, FaRegHeart, RiDeleteBin4Line, RiEditLine} from "react-icons/all";
import {UserContext} from "../../../../context/UserContext";
import {apiBase} from "../../../../helpers/Helpers";
import {useHistory, useLocation} from "react-router-dom";

const RecipeToolbar = ({id, data, reload}) => {
    const location = useLocation();
    const history = useHistory();
    const user = useContext(UserContext);
    const token = JSON.parse(localStorage.getItem("accessToken"));
    const [isFavorite, setIsFavorite] = useState(false);
    const [isPrivate, setIsPrivate] = useState(data.is_private);

    const statusText = [
        "Waiting for review.",
        "Approved and published.",
        "Rejected by administrator."
    ];

    const statusColor = [
        "text-neutral",
        "text-positive",
        "text-negative"
    ];

    // Generates common request headers
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
            const api = `${apiBase}/user/recipe/islike?userID=${user.id}&recipeID=${id}`
            const response = await fetch(api, request);
            const result = await response.json();
            console.log(result.is_Liked);
            setIsFavorite(result.is_Liked);
        }
    }

    // Handles like-unlike function
    const favoriteArticle = async (e) => {
        e.preventDefault();
        // Generates request body
        let body = JSON.stringify({
            "user_id": user.id,
            "recipe_id": data.recipe_id,
        });
        // Generates request
        let request = {
            method: 'POST',
            headers: headers,
            body: body,
        };
        // Executes fetch
        const api = `${apiBase}/recipes/like`;
        const response = await fetch(api, request);
        if (response.ok) {
            reload();
        } else if (response.status === 401) {
            alert("You are not authorized to complete the request.")
        } else {
            alert("Error: " + response.status);
        }
    }

    const publishArticle = async (e) => {
        e.preventDefault();
        // Generates request body
        // let body = JSON.stringify({
        //     "is_private": !isPrivate,
        // });
        // Generates request
        let request = {
            method: 'PUT',
            headers: headers,
            // body: body,
        };
        // Executes fetch
        const api = `${apiBase}/recipes/edit/private/${id}`;
        const response = await fetch(api, request);
        if (response.ok) {
            reload();
        } else if (response.status === 401) {
            alert("You are not authorized to do that.")
        } else {
            alert("Unexpected error with code: " + response.status);
        }
    }

    // Handles edit article - sends user to edit form
    const editArticle = () => {
        history.push(`/view/recipe/${id}/edit`)
    }

    // Handle delete article - sends user to previous page upon completion
    const deleteArticle = async (e) => {
        e.preventDefault();
        // Generates request
        let request = {
            method: 'DELETE',
            headers: headers,
        };
        // Executes fetch
        const api = `${apiBase}/recipes/delete/${data.recipe_id}`;
        const response = await fetch(api, request);
        if (response.ok) {
            alert("Your recipe has been deleted.");
            history.goBack();
        } else if (response.status === 401) {
            alert("You are not authorized to complete the request.")
        } else {
            alert("Error: " + response.status);
        }
    }

    useEffect(checkFavorite);

    return (
        <section className="article-toolbar">
            {user && data && user.id === data.user_id &&
            <div className="article-status">
                <p className={statusColor[data.status - 1]}>{statusText[data.status - 1]}</p>
            </div>}
            {user && user.role !== "admin" ?
                // If user is logged in, show toolbar
                <div className="article-controls">
                    <button title="Add to favorites"
                            className={`article-button button-labeled ${isFavorite && "button-active"}`}
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

                        <button title="Article visibility" className="article-button button-labeled"
                                onClick={publishArticle}>
                            {!isPrivate ?
                                <><AiOutlineEye/> Public</>
                                :
                                <><AiOutlineEyeInvisible/> Private</>
                            }
                        </button>
                        <button title="Edit article" className="article-button" onClick={editArticle}>
                            <RiEditLine/>
                        </button>
                        <button title="Delete article" className="article-button" onClick={deleteArticle}>
                            <RiDeleteBin4Line/>
                        </button>
                    </>
                    }
                </div>
                :
                // If not logged in, the favorite button directs to login form
                <div className="article-controls">
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

export default RecipeToolbar;