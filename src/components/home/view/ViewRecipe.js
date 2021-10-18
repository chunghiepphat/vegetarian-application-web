import React, {useContext, useEffect, useState} from "react";
import {NavLink, Redirect, Route, Switch, useParams} from "react-router-dom";
import Navbar from "../../commons/elements/bars/Navbar";
import RecipeSteps from "./recipe/RecipeSteps";
import RecipeComments from "./recipe/RecipeComments";
import RecipeNutrients from "./recipe/RecipeNutrients";
import {SectionLoader} from "../../commons/elements/loaders/Loader";
import {apiBase} from "../../../helpers/Helpers";
import RecipeHeader from "./recipe/RecipeHeader";
import RecipeIngredients from "./recipe/RecipeIngredients";
import RecipeEstimations from "./recipe/RecipeEstimations";
import RecipeToolbar from "./recipe/RecipeToolbar";
import EditIngredients from "../../user/edit/recipe/EditIngredients";
import EditRecipe from "../../user/edit/EditRecipe";
import {UserContext} from "../../../context/UserContext";

const ViewRecipe = () => {
    let {id} = useParams();
    const user = useContext(UserContext);
    const api = `${apiBase}/recipes/getrecipeby/${id}`;
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
                                    <RecipeToolbar id={id} data={data}/>
                                    {/*Recipe portion and ingredient list*/}
                                    <RecipeIngredients data={data}/>
                                    {/*Recipe estimates*/}
                                    <RecipeEstimations data={data}/>
                                    {/*Article tabs*/}
                                    <section className="article-tabs">
                                        <Navbar>
                                            <NavLink to={`/view/recipe/${id}/steps`}>Steps</NavLink>
                                            <NavLink to={`/view/recipe/${id}/nutrients`}>Nutrients</NavLink>
                                            <NavLink to={`/view/recipe/${id}/comments`}>Comments</NavLink>
                                        </Navbar>
                                    </section>
                                    {/*Tab content*/}
                                    <Switch>
                                        <Route exact path="/view/recipe/:id/steps">
                                            <RecipeSteps steps={data.steps}/>
                                        </Route>
                                        <Route exact path="/view/recipe/:id/nutrients">
                                            <RecipeNutrients portion={data.portion_size}
                                                             nutrients={data.nutrition}/>
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
                </Route>
            </Switch>
        </section>
    )
}

export default ViewRecipe;