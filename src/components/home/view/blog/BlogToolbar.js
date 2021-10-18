import React, {useContext} from "react";
import {FaHeart, FaRegHeart, RiDeleteBin4Line, RiEditLine} from "react-icons/all";
import {UserContext} from "../../../../context/UserContext";
import {apiBase} from "../../../../helpers/Helpers";
import {useHistory} from "react-router-dom";

const BlogToolbar = ({data}) => {
    const history = useHistory();
    const user = useContext(UserContext);
    const token = JSON.parse(localStorage.getItem("accessToken"));
    const apiDelete = `${apiBase}/blogs/delete/${data.blog_id}`;
    const apiLike = `${apiBase}/blogs/like`;

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
            "blog_id": data.blog_id,
        });

        // Generates request
        let request = {
            method: 'POST',
            headers: headers,
            body: body,
        };

        // Executes fetch
        const response = await fetch(apiLike, request);
        if (response.ok) {
            alert("Added to favorites.");
            window.location.reload();
        } else if (response.status === 401) {
            alert("You are not authorized to complete the request.")
        } else {
            alert("Error: " + response.status);
        }
    }

    const deleteArticle = async (e) => {
        e.preventDefault();
        // Generates request
        let request = {
            method: 'DELETE',
            headers: headers,
        };

        // Executes fetch
        const response = await fetch(apiDelete, request);
        if (response.ok) {
            alert("Your article has been deleted.");
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
                    <button className="article-button">
                        <RiEditLine/>
                    </button>
                    <button className="article-button" onClick={deleteArticle}>
                        <RiDeleteBin4Line/>
                    </button>
                </>}
            </div>}
        </section>
    )
}

export default BlogToolbar;