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

const ReviewRecipe = () => {
    let {id} = useParams();
    const user = useContext(UserContext);
    const location = useLocation();
    const [data, setData] = useState();

    const fetchData = async () => {
        const api = `${apiBase}/recipes/getrecipeby/${id}`;
        const response = await fetch(api);
        const result = await response.json();
        setData(result);
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
                <h1>Review recipe - ID {id}</h1>
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
                            <RecipeSteps steps={data.steps}/>
                            <RecipeNutrients portion={data.portion_size}
                                             nutrients={data.nutrition}/>
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