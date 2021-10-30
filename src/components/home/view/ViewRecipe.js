import React, {useContext, useEffect, useState} from "react";
import {Route, Switch, useLocation, useParams} from "react-router-dom";
import RecipeSteps from "./recipe/RecipeSteps";
import RecipeComments from "./recipe/RecipeComments";
import RecipeNutrients from "./recipe/RecipeNutrients";
import {SectionLoader} from "../../commons/elements/loaders/Loader";
import {apiBase} from "../../../helpers/Helpers";
import RecipeHeader from "./recipe/RecipeHeader";
import RecipeIngredients from "./recipe/RecipeIngredients";
import RecipeEstimations from "./recipe/RecipeEstimations";
import RecipeToolbar from "./recipe/RecipeToolbar";
import EditRecipe from "../../user/edit/EditRecipe";
import {UserContext} from "../../../context/UserContext";

const ViewRecipe = () => {
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
            <Switch>
                {/*Edit mode*/}
                {user && data && user.id === data.user_id &&
                <Route path={`/view/recipe/:id/edit`}>
                    <EditRecipe id={id} data={data}/>
                </Route>}
                {/*View mode*/}
                <Route>
                    {data ?
                        <>
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
                                    <RecipeComments data={data}/>
                                </article>
                            </div>
                        </>
                        :
                        <SectionLoader/>
                    }
                </Route>
            </Switch>
        </section>
    )
}

export default ViewRecipe;