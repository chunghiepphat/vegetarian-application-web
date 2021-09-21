import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

const ViewRecipe = () => {
    let {id} = useParams();
    console.log(id);
    const api = `http://14.161.47.36:8080/hiepphat-0.0.1-SNAPSHOT/api/recipes/getrecipeby/${id}`;
    const [recipe, setRecipe] = useState([]);

    // Fetches recipes data
    const getRecipe = async () => {
        const response = await fetch(api)
        const result = await response.json();
        return result;
    }

    // Executes fetch once on page load
    useEffect(async () => {
        const recipe = await getRecipe();
        console.log(recipe);
        setRecipe(recipe);
    }, []);

    return (
        <main>
            <section>
                <div className="section-content">
                    <h1>{recipe.recipe_title}</h1>
                    <i>{recipe.first_name} {recipe.last_name}</i>
                    <p>{recipe.recipe_content}</p>

                </div>
            </section>
        </main>

    )
}

export default ViewRecipe;