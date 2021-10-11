import React, {useEffect, useState} from "react";
import {NavLink, Redirect, Route, Switch, useParams} from "react-router-dom";
import Navbar from "../../commons/elements/bars/Navbar";
import RecipeSteps from "./recipe/RecipeSteps";
import RecipeComments from "./recipe/RecipeComments";
import RecipeNutrients from "./recipe/RecipeNutrients";
import {SectionLoader} from "../../commons/elements/loaders/Loader";
import {apiPattern} from "../../../helpers/Helpers";
import RecipeHeader from "./recipe/RecipeHeader";
import RecipeIngredients from "./recipe/RecipeIngredients";
import RecipeOverview from "./recipe/RecipeOverview";
import RecipeToolbar from "./recipe/RecipeToolbar";

const ViewRecipe = () => {
    let {id} = useParams();
    const api = `${apiPattern}/recipes/getrecipeby/${id}`;
    const [data, setData] = useState();

    // Executes fetch once on page load
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(api);
            const result = await response.json();
            setData(result);
        }
        fetchData().catch(error => {
            console.error(error);
        });
    }, []);

    return (
        <section>
            {data ?
                <>
                    {data.recipe_thumbnail &&
                    <picture className="article-thumbnail">
                        <source srcSet={data.recipe_thumbnail}/>
                        <img src="" alt=""/>
                    </picture>}
                    <div className="section-content">
                        {/*Recipe article container*/}
                        <article>
                            {/*Recipe title*/}
                            <RecipeHeader data={data}/>
                            <RecipeToolbar data={data}/>
                            {/*Recipe portion and ingredient list*/}
                            <RecipeIngredients data={data}/>
                            {/*Recipe estimates*/}
                            <RecipeOverview data={data}/>
                            {/*Article tabs*/}
                            {data.recipe_content &&
                            <section className="article-tabs">
                                <Navbar>
                                    <NavLink to={`/view/recipe/${id}/steps`}>Steps</NavLink>
                                    <NavLink to={`/view/recipe/${id}/nutrients`}>Nutrients</NavLink>
                                    <NavLink to={`/view/recipe/${id}/comments`}>Comments</NavLink>
                                </Navbar>
                            </section>}
                            {/*Tab content*/}
                            <Switch>
                                <Route exact path="/view/recipe/:id/steps">
                                    {data.recipe_content &&
                                    <RecipeSteps recipe_content={data.recipe_content}/>}
                                </Route>
                                <Route exact path="/view/recipe/:id/nutrients">
                                    {data.nutrition &&
                                    <RecipeNutrients portion={data.portion_size} nutrients={data.nutrition}/>}
                                </Route>
                                <Route exact path="/view/recipe/:id/comments">
                                    <RecipeComments data={data}/>
                                </Route>
                                <Route><Redirect to={`/view/recipe/${id}/steps`}/></Route>
                            </Switch>
                        </article>
                    </div>
                </>
                :
                <SectionLoader/>
            }
        </section>
    )
}

export default ViewRecipe;