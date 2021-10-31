import React, {useContext, useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import {SectionLoader} from "../../commons/elements/loaders/Loader";
import {apiBase} from "../../../helpers/Helpers";
import {UserContext} from "../../../context/UserContext";
import RecipeHeader from "../../home/view/recipe/RecipeHeader";
import RecipeToolbar from "../../home/view/recipe/RecipeToolbar";
import RecipeIngredients from "../../home/view/recipe/RecipeIngredients";
import RecipeEstimations from "../../home/view/recipe/RecipeEstimations";
import RecipeSteps from "../../home/view/recipe/RecipeSteps";
import RecipeNutrients from "../../home/view/recipe/RecipeNutrients";
import InputGroup from "../../commons/elements/form/InputGroup";

const ReviewRecipe = () => {
    let {id} = useParams();
    const user = useContext(UserContext);
    const token = JSON.parse(localStorage.getItem("accessToken"));
    const location = useLocation();
    const [data, setData] = useState();

    const statusText = [
        "Waiting for review.",
        "Approved and published.",
        "Declined."
    ]

    const statusColor = [
        "text-neutral",
        "text-positive",
        "text-negative"
    ]

    // Generates request headers
    let headers = new Headers();
    if (token) {
        headers.append("Authorization", `Bearer ${token.token}`);
    }
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    const fetchData = async () => {
        const api = `${apiBase}/recipes/getrecipeby/${id}`;
        const response = await fetch(api);
        const result = await response.json();
        setData(result);
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
        const api = `${apiBase}/recipes/approve/${id}`;
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
        fetchData().catch(error => {
            console.error(error);
        });
    }, [location]);

    return (
        <section>
            <div className="console-header">
                {data &&
                <h1>Review recipe - ID {id} - {statusText[data.status - 1]} </h1>}
                <InputGroup style={{minWidth: "300px"}}>
                    <button className="button-submit" onClick={e => approveArticle(e, 2)}>Approve</button>
                    <button className="button-cancel" onClick={e => approveArticle(e, 3)}>Reject</button>
                </InputGroup>

            </div>
            <div className="console-content">
                {data ?
                    <div className="section-content">
                        {/*Recipe article container*/}
                        <article>
                            {data.recipe_thumbnail &&
                            <picture className="article-thumbnail">
                                <source srcSet={data.recipe_thumbnail}/>
                                <img src="" alt=""/>
                            </picture>}
                            {/*Recipe title*/}
                            <RecipeHeader data={data}/>
                            <RecipeToolbar id={id} data={data} reload={fetchData}/>
                            {/*Recipe portion and ingredient list*/}
                            <RecipeIngredients data={data}/>
                            {/*Recipe estimates*/}
                            <RecipeEstimations data={data}/>
                            {/*Recipe nutrients*/}
                            <RecipeNutrients portion={data.portion_size}
                                             nutrients={data.nutrition}/>
                            {/*Recipe instructions*/}
                            <RecipeSteps steps={data.steps}/>
                        </article>
                    </div>
                    :
                    <SectionLoader/>
                }
            </div>
        </section>
    )
}

export default ReviewRecipe;