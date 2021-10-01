import React, {useEffect, useState} from "react";
import {NavLink, Redirect, Route, Switch, useParams} from "react-router-dom";
import {FaClock, FaFire, FaLeaf} from "react-icons/all";
import Navbar from "../../commons/elements/Navbar";
import ViewRecipeSteps from "./ViewRecipeSteps";
import ViewRecipeComments from "./ViewRecipeComments";
import ViewRecipeNutrients from "./ViewRecipeNutrients";

const ViewRecipe = () => {
    let {id} = useParams();
    const api = `http://14.161.47.36:8080/hiepphat-0.0.1-SNAPSHOT/api/recipes/getrecipeby/${id}`;
    const [data, setData] = useState([]);

    // Executes fetch once on page load
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(api);
            const result = await response.json();
            setData(result);
        }
        fetchData();
    }, [api]);

    return (
        <main>
            {data &&
            <section>
                {data.recipe_title ?
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
                                <section className="article-title">
                                    <h1>{data.recipe_title}</h1>
                                    <i>{data.first_name} {data.last_name} - {data.time_created}</i>
                                </section>
                                {/*Recipe portion and ingredient list*/}
                                {data.ingredients &&
                                <section className="article-info">
                                    {data.ingredients.length > 0 ?
                                        <>
                                            <h2>Ingredients</h2>
                                            <p>- per {data.portion_size}
                                                {/* eslint-disable-next-line eqeqeq */}
                                                {data.portion_type == 1 && <> serving(s)</>}
                                                {/* eslint-disable-next-line eqeqeq */}
                                                {data.portion_type == 2 && <> piece(s)</>}</p>
                                            <ul>
                                                {data.ingredients.map(ingredient => (
                                                    <li>
                                                        <FaLeaf/> {ingredient.ingredient_name} - {ingredient.amount_in_mg} (mg)
                                                    </li>
                                                ))}
                                            </ul>
                                        </>
                                        :
                                        <>
                                            <em>It seems the creator of this recipe did not specify any
                                                ingredients...</em>
                                        </>
                                    }
                                </section>}
                                {/*Recipe estimates*/}
                                <section className="article-info">
                                    <ul>
                                        {data.recipe_difficulty &&
                                        <li><FaFire/> Difficulty: {data.recipe_difficulty}</li>}
                                        {data.prep_time_minutes > 0 &&
                                        <li><FaClock/> Prep time: {data.prep_time_minutes} minutes</li>}
                                        {data.baking_time_minutes > 0 &&
                                        <li><FaClock/> Baking time: {data.baking_time_minutes} minutes</li>}
                                        {data.resting_time_minutes > 0 &&
                                        <li><FaClock/> Resting time: {data.resting_time_minutes} minutes</li>}
                                    </ul>
                                </section>
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
                                        <ViewRecipeSteps recipe_content={data.recipe_content}/>}
                                    </Route>
                                    <Route exact path="/view/recipe/:id/nutrients">
                                        {data.nutrition &&
                                        <ViewRecipeNutrients portion={data.portion_size} nutrients={data.nutrition}/>}
                                    </Route>
                                    <Route exact path="/view/recipe/:id/comments">
                                        <ViewRecipeComments/>
                                    </Route>
                                    <Route><Redirect to={`/view/recipe/${id}/steps`}/></Route>
                                </Switch>
                            </article>
                        </div>
                    </>
                    :
                    <>
                        <div className="section-content">
                            <p>Loading article, please wait...</p>
                        </div>
                    </>
                }
            </section>
            }
        </main>
    )
}

export default ViewRecipe;