import React, {useEffect} from "react";
import {Redirect, Route, Switch, useParams} from "react-router-dom";
import {apiBase} from "../../../helpers/Helpers";
import RecipeHeader from "./recipe/RecipeHeader";
import RecipeToolbar from "./recipe/RecipeToolbar";
import RecipeIngredients from "./recipe/RecipeIngredients";
import RecipeEstimations from "./recipe/RecipeEstimations";
import RecipeNutrients from "./recipe/RecipeNutrients";
import RecipeSteps from "./recipe/RecipeSteps";
import RecipeComments from "./recipe/RecipeComments";
import EditRecipe from "../../user/edit/EditRecipe";
import {SectionEmp} from "../../commons/elements/loaders/AlertEmpty";
import {SectionErr} from "../../commons/elements/loaders/AlertError";

const ViewRecipe = ({user, location, data, isError, fetchData}) => {
    let {id} = useParams();
    const api = `${apiBase}/recipes/getrecipeby/${id}${user ? `?userID=${user.id}` : ``}`;
    // Executes fetch once on page load
    useEffect(() => {
        fetchData(api)
    }, [id, location]);

    return (
        <section>
            <Switch>
                {/*Edit mode*/}
                {user && data && user.id === data.user_id &&
                <Route exact path={`/view/recipe/:id/edit`}>
                    <EditRecipe id={id} data={data}/>
                </Route>}
                {/*View mode*/}
                <Route exact path={`/view/recipe/:id/`}>
                    {!isError ? <>
                        {data ? <>
                            <div className="section-content">
                                <article>
                                    {data.recipe_thumbnail &&
                                    <picture className="article-thumbnail">
                                        <source srcSet={data.recipe_thumbnail}/>
                                        <img src="" alt=""/>
                                    </picture>}
                                    <RecipeHeader data={data}/>
                                    <RecipeToolbar id={id} location={location} data={data}
                                                   reload={fetchData} mainApi={api}/>
                                    <RecipeIngredients data={data}/>
                                    <RecipeEstimations data={data}/>
                                    <RecipeNutrients portion={data.portion_size} nutrients={data.nutrition}/>
                                    <RecipeSteps steps={data.steps}/>
                                    <RecipeComments data={data}/>
                                </article>
                            </div>
                        </> : <SectionEmp/>}
                    </> : <SectionErr reload={fetchData} api={api}/>}
                </Route>
                <Redirect to="/not-found"/>
            </Switch>
        </section>
    )
}

export default ViewRecipe;