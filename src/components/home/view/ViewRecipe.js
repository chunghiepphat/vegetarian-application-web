import React, {useEffect, useState} from "react";
import {NavLink, Redirect, Route, Switch, useParams} from "react-router-dom";
import {FaClock, FaFire} from "react-icons/all";
import Navbar from "../../commons/elements/Navbar";
import ViewRecipeSteps from "./ViewRecipeSteps";
import ViewRecipeComments from "./ViewRecipeComments";

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
console.log(data.ingredients)
    return (
        <main>
            {data &&
            <section>
                <picture className="article-thumbnail">
                    <source srcSet={data.recipe_thumbnail}/>
                    <img src="" alt=""/>
                </picture>
                <div className="section-content">
                    <article>
                        <section className="article-title">
                            <h1>{data.recipe_title}</h1>
                            <i>{data.first_name} {data.last_name} - {data.time_created}</i>
                        </section>
                        {data.ingredients &&
                        <section className="article-info">
                            <h2>Ingredients</h2>
                            <ul>
                                {data.ingredients.map(ingredient => (
                                    <li>{ingredient.ingredient_name} - {ingredient.amount_in_mg} (mg)</li>
                                ))}
                            </ul>
                        </section>
                        }
                        <section className="article-info">
                            <ul>
                                <li><FaFire/> Difficulty: {data.recipe_difficulty}</li>
                                {data.prep_time_minutes > 0 &&
                                <li><FaClock/> Prep time: {data.prep_time_minutes} minutes.</li>}
                                {data.baking_time_minutes > 0 &&
                                <li><FaClock/> Baking time: {data.baking_time_minutes} minutes.</li>}
                                {data.resting_time_minutes > 0 &&
                                <li><FaClock/> Resting time: {data.resting_time_minutes} minutes.</li>}
                            </ul>
                        </section>
                        <section className="article-nav">
                            <Navbar>
                                <NavLink to={`/view/recipe/${id}/steps`}>Steps</NavLink>
                                <NavLink to={`/view/recipe/${id}/comments`}>Comments</NavLink>
                            </Navbar>
                        </section>
                        <Switch>
                            <Route exact path="/view/recipe/:id/steps">
                                <ViewRecipeSteps recipe_content={data.recipe_content}/>
                            </Route>
                            <Route exact path="/view/recipe/:id/comments">
                                <ViewRecipeComments/>
                            </Route>
                            <Route><Redirect to={`/view/recipe/${id}/steps`}/></Route>
                        </Switch>
                    </article>
                </div>
            </section>
            }
        </main>
    )
}

export default ViewRecipe;