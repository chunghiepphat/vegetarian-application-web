import React, {useEffect, useState} from "react";
import Card from "../../../commons/elements/containers/Card";
import {NavLink, useLocation} from "react-router-dom";
import Navbar from "../../../commons/elements/bars/Navbar";

const SearchResultRecipes = () => {
    const location = useLocation();
    const api = `http://14.161.47.36:8080/hiepphat-0.0.1-SNAPSHOT/api/home/find?search=${location.state.query}`;
    const [recipe, setRecipe] = useState([]);
    const [blog, setBlog] = useState([]);

    console.log(api)
    // Executes fetch once on page load
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://14.161.47.36:8080/hiepphat-0.0.1-SNAPSHOT/api/home/find?search=${location.state.query}`);
            const result = await response.json();
            setRecipe(result.listRecipe);
            setBlog(result.listBlog);
        }
        fetchData();
        console.log(recipe)
    }, [location.state.query]);

    return (
        <>
            <section className="page-toolbar">
                <Navbar>
                    <div>Type of dish</div>
                    <div>Preparation time</div>
                    <div>Ingredients</div>
                    <div>Cuisine</div>
                    <div>Sort by:</div>
                </Navbar>
            </section>
            <section>
                <div className="section-content">
                    <h1>Recipes</h1>
                    <div className="panel">
                        {/*Iterates over the result JSON and renders a matching amount of card items*/}
                        {recipe && recipe.map(recipe => (
                            <Card className="card-narrow"
                                  key={recipe.recipe_id}
                                  id={recipe.recipe_id}
                                  type="recipe"
                                  title={recipe.recipe_title}
                                  thumbnail={recipe.recipe_thumbnail}
                                  first_name={recipe.first_name}
                                  last_name={recipe.last_name}/>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default SearchResultRecipes;