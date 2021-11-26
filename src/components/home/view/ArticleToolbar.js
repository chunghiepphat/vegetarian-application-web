import React, {useContext, useState} from "react";
import {articleStatusStrings, requestErrorStrings} from "../../../resources/CommonDisplayStrings";
import {viewDisplayStrings} from "../../../resources/PublicDisplayStrings";
import {LocaleContext} from "../../../context/LocaleContext";
import {UserContext} from "../../../context/UserContext";
import {apiUrl} from "../../../helpers/Variables";
import {useHistory, useLocation} from "react-router-dom";
import {AiFillEye, AiOutlineCheck, AiOutlineEyeInvisible, FaHeart, FaRegHeart, RiDeleteBin4Line} from "react-icons/all";
import {FaEdit} from "react-icons/fa";

const ArticleToolbar = ({type, id, data, isLoading, setLocale, reload}) => {
    const location = useLocation()
    const history = useHistory();

    // Localizations
    const locale = useContext(LocaleContext);
    let languageName;
    switch (locale) {
        case "en":
            languageName = "English";
            break;
        case "vi":
            languageName = "Tiếng Việt";
            break;
    }
    viewDisplayStrings.setLanguage(locale);
    requestErrorStrings.setLanguage(locale);
    articleStatusStrings.setLanguage(locale);

    // Gets user info
    const user = useContext(UserContext);
    const token = JSON.parse(localStorage.getItem("accessToken"));

    // Article status message to display based on array index
    const statusText = [
        `${articleStatusStrings.statusPending}`,
        `${articleStatusStrings.statusApproved}`,
        `${articleStatusStrings.statusRejected}`,
    ];
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
        let api; // API endpoint
        let body; // Request body
        switch (type) {
            case "recipe":
                api = `${apiUrl}/recipes/like`;
                body = JSON.stringify({
                    "user_id": user.id,
                    "recipe_id": data.recipe_id,
                });
                break;
            case "video":
                api = `${apiUrl}/video/like`;
                body = JSON.stringify({
                    "user_id": user.id,
                    "video_id": data.id,
                });
                break;
            case "blog":
                api = `${apiUrl}/blogs/like`;
                body = JSON.stringify({
                    "user_id": user.id,
                    "blog_id": data.blog_id,
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
        const response = await fetch(api, request);
        try {
            if (response.ok) {
                reload();
            } else if (response.status === 401) {
                alert(requestErrorStrings.requestErrorUnauthorized)
            } else {
                alert(requestErrorStrings.requestErrorStatus + response.status);
            }
        } catch (error) {
            alert(requestErrorStrings.requestErrorException + error);
        }
    }

    // Handles translating content
    const [isTranslated, setIsTranslated] = useState(false);
    const translateArticle = (e) => {
        e.preventDefault();
        setLocale(locale);
        setIsTranslated(true);
    }
    const returnArticle = (e) => {
        e.preventDefault();
        setLocale("");
        setIsTranslated(false);
    }

    // Handle public/private visibility switch
    const publishArticle = async (e) => {
        e.preventDefault();
        let message = "";
        if (data.is_private && data.status === 1) // If waiting for review
            message = viewDisplayStrings.viewArticleSubmitForReviewConfirm;
        else if (data.is_private && data.status === 2) // If approved & public
            message = viewDisplayStrings.viewArticleSetPublicConfirm;
        else if (!data.is_private) // If private
            message = viewDisplayStrings.viewArticleSetPrivateConfirm;
        const isConfirmed = window.confirm(message);
        if (isConfirmed) {
            // Generates request
            let request = {
                method: 'PUT',
                headers: headers,
            };
            // Executes fetch
            let api;
            switch (type) {
                case "recipe":
                    api = `${apiUrl}/recipes/edit/private/${id}`;
                    break;
                case "video":
                    api = `${apiUrl}/video/edit/private/${id}`;
                    break;
                case "blog":
                    api = `${apiUrl}/blogs/edit/private/${id}`;
                    break;
            }
            const response = await fetch(api, request);
            try {
                if (response.ok) {
                    if (data.is_private && data.status === 1) // If waiting for review
                        alert(viewDisplayStrings.viewArticleSubmitForReviewAlert)
                    else if (data.is_private && data.status === 2) // If approved & public
                        alert(viewDisplayStrings.viewArticleSetPublicAlert);
                    else { // If private
                        alert(viewDisplayStrings.viewArticleSetPrivateAlert);
                    }
                    reload();
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
        history.push(`/view/${type}/${id}/edit`)
    }

    // Handle delete article - sends user to previous page upon completion
    const deleteArticle = async (e) => {
        e.preventDefault();
        const isConfirmed = window.confirm(viewDisplayStrings.viewArticleDeleteConfirm);
        if (isConfirmed) {
            // Generates request
            let request = {
                method: 'DELETE',
                headers: headers,
            };
            // Executes fetch
            let api;
            switch (type) {
                case "recipe":
                    api = `${apiUrl}/recipes/delete/${data.recipe_id}`
                    break;
                case "video":
                    api = `${apiUrl}/video/delete/${data.id}`;
                    break;
                case "blog":
                    api = `${apiUrl}/blogs/delete/${data.blog_id}`;
                    break;
            }
            const response = await fetch(api, request);
            try {
                if (response.ok) {
                    alert(viewDisplayStrings.viewArticleDeleteAlert);
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
            {data && user && user.id === data.user_id &&
            <div className="article-status">
                {data.is_private ? <p>{articleStatusStrings.statusDraft}</p>
                    : <p className={statusColor[data.status - 1]}>{statusText[data.status - 1]}</p>}
            </div>}
            <div className="article-controls">
                {data && user ? <>
                    <button title="Add to favorites" onClick={favoriteArticle}
                            className={`article-button article-button-labeled ${data.is_like && "button-favorite"}`}>
                        {data.is_like ?
                            <FaHeart/> : <FaRegHeart/>} {data.totalLike}
                    </button>
                    {user.id === data.user_id && <>
                        <button title="Article visibility" className="article-button article-button-labeled"
                                onClick={publishArticle}>
                            {data.is_private ?
                                <><AiOutlineEyeInvisible/> {viewDisplayStrings.viewArticleSetPrivate}</>
                                : <>{data.status === 2 ?
                                    <><AiFillEye/> {viewDisplayStrings.viewArticleSetPublic}</>
                                    : <><AiOutlineCheck/> {viewDisplayStrings.viewArticleSubmitForReview}</>}
                                </>}
                        </button>
                        <button title="Edit article" className="article-button article-button-no-text"
                                onClick={editArticle}><FaEdit/></button>
                        <button title="Delete article" className="article-button article-button-no-text"
                                onClick={deleteArticle}><RiDeleteBin4Line/></button>
                    </>}
                </> : <>
                    <button className={`article-button article-button-labeled ${data.is_like && "button-favorite"}`}
                            onClick={() => history.push({
                                pathname: "/login",
                                state: {background: location}
                            })}>
                        <FaRegHeart/> {data.totalLike}
                    </button>
                </>}
                {locale === "vi" && <>
                    {isLoading ?
                        <button className="article-button article-button-labeled" disabled>
                            Processing...
                        </button>
                        : <> {isTranslated ?
                            <button className="article-button article-button-labeled article-button-active"
                                    onClick={e => returnArticle(e)}>
                                {viewDisplayStrings.viewArticleRevertTranslationButton}</button>
                            : <button className="article-button article-button-labeled"
                                      onClick={e => translateArticle(e)}>
                                {viewDisplayStrings.viewArticleTranslateButton} {languageName}</button>}
                        </>}
                </>}
            </div>
        </section>
    )
}

export default ArticleToolbar;