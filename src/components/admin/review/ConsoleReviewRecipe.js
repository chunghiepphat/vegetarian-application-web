import React, {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import {apiUrl} from "../../../helpers/Variables";
import RecipeHeader from "../../home/view/recipe/RecipeHeader";
import RecipeIngredients from "../../home/view/recipe/RecipeIngredients";
import RecipeEstimations from "../../home/view/recipe/RecipeEstimations";
import RecipeNutrients from "../../home/view/recipe/RecipeNutrients";
import RecipeSteps from "../../home/view/recipe/RecipeSteps";
import {SectionEmp} from "../../commons/elements/loaders/AlertEmpty";
import {SectionErr} from "../../commons/elements/loaders/AlertError";
import {FaCheck, FaTimes, RiFlag2Fill} from "react-icons/all";
import {articleStatusStrings, requestErrorStrings} from "../../../resources/CommonDisplayStrings";
import {consoleDisplayStrings} from "../../../resources/AdminDisplayStrings";

const ConsoleReviewRecipe = () => {
    let {id} = useParams();
    const location = useLocation();
    const token = JSON.parse(localStorage.getItem("accessToken"));
    const [data, setData] = useState();
    const [isError, setIsError] = useState(false);
    const statusText = [
        `${articleStatusStrings.statusPending}`,
        `${articleStatusStrings.statusApproved}`,
        `${articleStatusStrings.statusRejected}`,
    ]
    const statusColor = [
        "text-neutral",
        "text-positive",
        "text-negative"
    ]
    // Generates request headers
    let headers = new Headers();
    if (token) headers.append("Authorization", `Bearer ${token.token}`);
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    const fetchData = async () => {
        setIsError(false);
        const api = `${apiUrl}/recipes/getrecipeby/${id}`;
        try {
            const response = await fetch(api)
            if (response.ok) {
                const result = await response.json();
                setData(result);
            } else if (response.status >= 400 && response.status < 600) {
                setIsError(true);
            }
        } catch (error) {
            console.error(error);
            setIsError(true);
        }
    }

    const approveArticle = async (e, status) => {
        e.preventDefault();
        // Generates request body
        let body = JSON.stringify({
            "status": status,
        });
        // Generates request
        let request = {
            method: 'PUT',
            headers: headers,
            body: body,
        };
        // Executes fetch
        const api = `${apiUrl}/recipes/approve/${id}`;
        const response = await fetch(api, request);
        if (response.ok) {
            await fetchData();
        } else if (response.status === 401) {
            alert("You are not authorized to do that.")
        } else {
            alert("Unexpected error with code: " + response.status);
        }
    }

    // Handles flagging violations
    const [flagMessage, setFlagMessage] = useState("");
    const flagArticle = async (e) => {
        e.preventDefault();
        const isConfirmed = window.confirm(data.is_flagged ? consoleDisplayStrings.consoleConfirmFlag : consoleDisplayStrings.consoleConfirmUnflag)
        if (isConfirmed) {
            // Generates request body
            let body = JSON.stringify({
                "is_flagged": !data.is_flagged,
                "message": flagMessage,
            });
            // Generates request
            let request = {
                method: 'PUT',
                headers: headers,
                body: body,
            };
            // Executes fetch
            const api = `${apiUrl}/recipes/edit/flag/${id}`;
            try {
                const response = await fetch(api, request);
                if (response.ok) {
                    await fetchData();
                } else if (response.status >= 400 && response.status < 600) {
                    alert(requestErrorStrings.requestErrorStatus + response.status);
                }
            } catch (error) {
                alert(requestErrorStrings.requestErrorException + error);
            }
        }
    }

    // Executes fetch once on page load
    useEffect(() => {
        fetchData();
    }, [location]);

    return (
        <>
            {data &&
            <div className="console-toolbar">
                <div className="toolbar-section">
                    <h1>Recipe {id} {data.is_flagged ? `(${consoleDisplayStrings.consoleFlagged})` : ``}</h1>
                    <p className={statusColor[data.status - 1]}>{statusText[data.status - 1]}</p>
                    {data.status !== 2 ?
                        <button className="button-dark" onClick={e => approveArticle(e, 2)}>
                            {consoleDisplayStrings.consoleApprove}</button>
                        : <button disabled>
                            <FaCheck/> {consoleDisplayStrings.consoleApproved}</button>}
                    {data.status !== 3 ?
                        <button className="button-light" onClick={e => approveArticle(e, 3)}>
                            {consoleDisplayStrings.consoleReject}</button>
                        : <button disabled>
                            <FaTimes/> {consoleDisplayStrings.consoleRejected}</button>}
                </div>
                <div className="toolbar-section">
                    <label>{consoleDisplayStrings.consoleFlagMessage}
                        <textarea value={flagMessage}
                                  onChange={e => setFlagMessage(e.target.value)}
                                  disabled={data.is_flagged}/>
                    </label>
                    {!data.is_flagged ?
                        <button className="button-dark" onClick={e => flagArticle(e)}>
                            <RiFlag2Fill/> {consoleDisplayStrings.consoleAddFlag}</button>
                        : <button className="button-light" onClick={e => flagArticle(e)}>
                            <RiFlag2Fill/> {consoleDisplayStrings.consoleRemoveFlag}</button>}
                </div>
            </div>}
            <div className="console-article">
                {!isError ? <>
                    {data ? <>
                        <div className="section-content">
                            {/*Recipe article container*/}
                            <article>
                                {data.recipe_thumbnail &&
                                <picture className="article-thumbnail">
                                    <source srcSet={data.recipe_thumbnail}/>
                                    <img src="" alt=""/>
                                </picture>}
                                <RecipeHeader data={data}/>
                                <RecipeIngredients data={data}/>
                                <RecipeEstimations data={data}/>
                                <RecipeNutrients portion={data.portion_size}
                                                 nutrients={data.nutrition}/>
                                <RecipeSteps steps={data.steps}/>
                            </article>
                        </div>
                    </> : <SectionEmp message="Loading the article..."/>}
                </> : <SectionErr reload={fetchData}/>}
            </div>
        </>
    )
}

export default ConsoleReviewRecipe;