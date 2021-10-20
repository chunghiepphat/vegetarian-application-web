import React, {useContext, useEffect, useState} from "react";
import {FaHeart, FaRegHeart, RiDeleteBin4Line, RiEditLine} from "react-icons/all";
import {UserContext} from "../../../../context/UserContext";
import {apiBase} from "../../../../helpers/Helpers";
import {useHistory} from "react-router-dom";

const RecipeToolbar = ({id, data, reload}) => {
    const history = useHistory();
    const user = useContext(UserContext);
    const token = JSON.parse(localStorage.getItem("accessToken"));
    const [isFavorite, setIsFavorite] = useState(false);

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
    console.log(isFavorite)
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
            <div>
                <p><FaRegHeart/> {data.totalLike}</p>
            </div>
            {token && <div>
                <button className="article-button" onClick={favoriteArticle}>
                    {isFavorite === false ?
                        <FaRegHeart/>
                        :
                        <FaHeart/>
                    }
                </button>
                {user && data && user.id === data.user_id &&
                <>
                    <button className="article-button" onClick={editArticle}>
                        <RiEditLine/>
                    </button>
                    <button className="article-button" onClick={deleteArticle}>
                        <RiDeleteBin4Line/>
                    </button>
                </>
                }
            </div>}
        </section>
    )
}

export default RecipeToolbar;