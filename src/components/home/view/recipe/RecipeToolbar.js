import React, {useContext} from "react";
import {FaRegHeart, RiDeleteBin4Line, RiEditLine} from "react-icons/all";
import {UserContext} from "../../../../context/UserContext";
import {apiBase} from "../../../../helpers/Helpers";
import {Link, useHistory, useParams} from "react-router-dom";

const RecipeToolbar = ({id, data}) => {
    const history = useHistory();
    const user = useContext(UserContext);
    const token = JSON.parse(localStorage.getItem("accessToken"));

    // Generates request headers
    let headers = new Headers();
    if (token !== null) {
        headers.append("Authorization", `Bearer ${token.token}`);
    }
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

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
            alert("Added to favorites.");
            window.location.reload();
        } else if (response.status === 401) {
            alert("You are not authorized to complete the request.")
        } else {
            alert("Error: " + response.status);
        }
    }

    const editArticle = () => {
        history.push(`/view/recipe/${id}/edit`)
    }

    const deleteArticle = async (e) => {
        e.preventDefault();
        // Generates request
        let request = {
            method: 'DELETE',
            headers: headers,
        };

        // Executes fetch
        const api = `${apiBase} / recipes / delete /${data.recipe_id}`;
        const response = await fetch(api, request);
        if (response.ok) {
            alert("Your recipe has been deleted.");
            history.push("/home");
        } else if (response.status === 401) {
            alert("You are not authorized to complete the request.")
        } else {
            alert("Error: " + response.status);
        }
    }

    return (
        <section className="article-toolbar">
            <div>
                <p><FaRegHeart/> {data.totalLike}</p>
            </div>
            {token && <div>
                <button className="article-button" onClick={favoriteArticle}>
                    <FaRegHeart/>
                </button>
                {/*<button className="article-button">*/}
                {/*    <FaHeart/>*/}
                {/*</button>*/}
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