import React, {useEffect, useState} from "react";
import {Link, useLocation, useParams} from "react-router-dom";
import {apiUrl} from "../../../helpers/Variables";
import RecipeHeader from "../../home/view/recipe/RecipeHeader";
import RecipeIngredients from "../../home/view/recipe/RecipeIngredients";
import RecipeEstimations from "../../home/view/recipe/RecipeEstimations";
import RecipeNutrients from "../../home/view/recipe/RecipeNutrients";
import RecipeSteps from "../../home/view/recipe/RecipeSteps";
import {FaCheck, FaTimes} from "react-icons/all";
import {FaAngleLeft} from "react-icons/fa";
import {SectionEmp} from "../../commons/elements/loaders/AlertEmpty";
import {SectionErr} from "../../commons/elements/loaders/AlertError";

const ReviewRecipe = () => {
    let {id} = useParams();
    const location = useLocation();
    const token = JSON.parse(localStorage.getItem("accessToken"));
    const [data, setData] = useState();
    const [isError, setIsError] = useState(false);
    const statusText = [
        "Waiting for review.",
        "Approved & published.",
        "Rejected & hidden."
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
    // Executes fetch once on page load
    useEffect(() => {
        fetchData();
    }, [location]);

    return (
        <section>
            <div className="console-toolbar">
                <Link to="/console/manage-content/recipes"><FaAngleLeft/> Go back</Link>
                {data && <h1>Recipe {id}</h1>}
                {data && <p className={statusColor[data.status - 1]}>{statusText[data.status - 1]}</p>}
                {data && <>
                    {data.status !== 2 ?
                        <button className="button-dark" onClick={e => approveArticle(e, 2)}>Approve</button>
                        : <button disabled><FaCheck/> Approved</button>}
                    {data.status !== 3 ?
                        <button className="button-light" onClick={e => approveArticle(e, 3)}>Reject</button>
                        : <button disabled><FaTimes/> Rejected</button>}
                </>}
            </div>
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
        </section>
    )
}

export default ReviewRecipe;