import React, {useEffect, useState} from "react";
import Tile from "../../commons/elements/Tile";

const BrowseRecipes = () => {
    const api = "http://14.161.47.36:8080/hiepphat-0.0.1-SNAPSHOT/api/recipes/getall?page=1&limit=100";
    const [data, setData] = useState([]);

    // Executes fetch once on page load
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(api);
            const result = await response.json();
            setData(result.listResult);
        }
        fetchData();
    }, []);

    return (
        <main>
            <section>
                <div className="section-content">
                    <h1>Recipes</h1>
                    <i>Vegetarian doesn't have to mean salads. Explore new and absolutely delicious recipes from
                        our community.</i>
                    <div className="tile-floor">
                        {/*Iterates over the result JSON and renders a matching amount of card items*/}
                        {data && data.map(recipe => (
                            <Tile key={recipe.recipe_id}
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
        </main>

    )
}

export default BrowseRecipes;