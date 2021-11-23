import React, {useContext} from "react";
import {useHistory} from "react-router-dom";
import {apiUrl} from "../../../../helpers/Variables";
import {UserContext} from "../../../../context/UserContext";
import {articleStatusStrings, articleToolbarStrings, requestErrorStrings} from "../../../../helpers/DisplayStrings";
import {
    AiFillEye,
    AiOutlineCheck,
    AiOutlineEyeInvisible,
    FaHeart,
    FaRegHeart,
    RiDeleteBin4Line,
} from "react-icons/all";
import {FaEdit} from "react-icons/fa";

const BlogToolbar = ({id, location, data, reload, mainApi}) => {
    const history = useHistory();
    const user = useContext(UserContext);
    const token = JSON.parse(localStorage.getItem("accessToken"));
    // Article status message to display based on array index
    const statusText = [
        `${articleStatusStrings.statusPending}`,
        `${articleStatusStrings.statusApproved}`,
        `${articleStatusStrings.statusRejected}`,
    ];
    // Matching class names for text colors
    const statusColor = [
        "text-neutral",
        "text-positive",
        "text-negative"
    ];
    // Generates request headers
    let headers = new Headers();
    if (token) headers.append("Authorization", `Bearer ${token.token}`);
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    // Handles like-unlike function
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
        const api = `${apiUrl}/blogs/like`;
        const response = await fetch(api, request);
        try {
            if (response.ok) {
                reload(mainApi);
            } else if (response.status === 401) {
                alert(requestErrorStrings.requestErrorUnauthorized)
            } else {
                alert(requestErrorStrings.requestErrorStatus + response.status);
            }
        } catch (error) {
            alert(requestErrorStrings.requestErrorException + error);
        }
    }
    // Handle public/private visibility switch
    const publishArticle = async (e) => {
        e.preventDefault();
        let message = "";
        if (data.is_private && data.status === 1)
            message = articleToolbarStrings.submitForReviewConfirm;
        if (data.is_private && data.status === 2)
            message = articleToolbarStrings.setPublicConfirm;
        else if (!data.is_private)
            message = articleToolbarStrings.setPrivateConfirm;
        const isConfirmed = window.confirm(message);
        if (isConfirmed) {
            // Generates request
            let request = {
                method: 'PUT',
                headers: headers,
            };
            // Executes fetch
            const api = `${apiUrl}/blogs/edit/private/${id}`;
            const response = await fetch(api, request);
            try {
                if (response.ok) {
                    if (data.is_private && data.status === 1)
                        alert(articleToolbarStrings.submitForReviewAlert)
                    else if (data.is_private && data.status === 2)
                        alert(articleToolbarStrings.setPublicAlert);
                    else {
                        alert(articleToolbarStrings.setPrivateAlert);
                    }
                    reload(mainApi);
                } else if (response.status === 401) {
                    alert(requestErrorStrings.requestErrorUnauthorized)
                } else {
                    alert(requestErrorStrings.requestErrorStatus + response.status);
                }
            } catch (error) {
                alert(requestErrorStrings.requestErrorException + error);
            }
        }
    }
    // Handles edit article - sends user to edit form
    const editArticle = () => {
        history.push(`/view/blog/${id}/edit`)
    }
    // Handle delete article - sends user to previous page upon completion
    const deleteArticle = async (e) => {
        e.preventDefault();
        const isConfirmed = window.confirm(articleToolbarStrings.deleteConfirm);
        if (isConfirmed) {
            // Generates request
            let request = {
                method: 'DELETE',
                headers: headers,
            };
            // Executes fetch
            const api = `${apiUrl}/blogs/delete/${data.blog_id}`;
            const response = await fetch(api, request);
            try {
                if (response.ok) {
                    alert(articleToolbarStrings.deleteAlert);
                    history.goBack();
                } else if (response.status === 401) {
                    alert(requestErrorStrings.requestErrorUnauthorized)
                } else {
                    alert(requestErrorStrings.requestErrorStatus + response.status);
                }
            } catch (error) {
                alert(requestErrorStrings.requestErrorException + error);
            }
        }
    }

    return (
        <section className="article-toolbar">
            {user && data && user.id === data.user_id &&
            <div className="article-status">
                {data.is_private ? <p>***PRIVATE DRAFT***</p> :
                    <p className={statusColor[data.status - 1]}>{statusText[data.status - 1]}</p>}
            </div>}
            {data && user && user.role !== "admin" ?
                <div className="article-controls">
                    {/*If user is logged in, show toolbar*/}
                    {data &&
                    <button title="Add to favorites" onClick={favoriteArticle}
                            className={`article-button article-button-with-text ${data.is_like && "button-favorite"}`}>
                        {data.is_like ?
                            <FaHeart/> : <FaRegHeart/>} {data.totalLike}
                    </button>}
                    {/*If user is the author of the article, allow modify*/}
                    {user.id === data.user_id && <>
                        <button title="Article visibility" className="article-button article-button-with-text"
                                onClick={publishArticle}>
                            {data.is_private ?
                                <><AiOutlineEyeInvisible/> {articleToolbarStrings.buttonPrivate}</>
                                : <>{data.status === 2 ?
                                    <><AiFillEye/> {articleToolbarStrings.buttonPublic}</>
                                    : <><AiOutlineCheck/> {articleToolbarStrings.buttonSubmit}</>}
                                </>}
                        </button>
                        <button className="article-button article-button-no-text" onClick={editArticle}>
                            <FaEdit/>
                        </button>
                        <button className="article-button article-button-no-text" onClick={deleteArticle}>
                            <RiDeleteBin4Line/>
                        </button>
                    </>}
                </div>
                : <div className="article-controls">
                    {/*If not logged in, the favorite button directs to login form*/}
                    <button className={`article-button article-button-with-text ${data.is_like && "button-favorite"}`}
                            onClick={() => history.push({
                                pathname: "/login",
                                state: {background: location}
                            })}>
                        <FaRegHeart/> {data.totalLike}
                    </button>
                </div>}
        </section>
    )
}

export default BlogToolbar;