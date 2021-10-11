import React, {useEffect, useState} from "react";
import Card from "../../commons/elements/containers/Card";
import {SectionLoader} from "../../commons/elements/loaders/Loader";
import {apiPattern} from "../../../helpers/Helpers";

const BrowseRecipes = () => {
    const api = `${apiPattern}/recipes/getall?page=1&limit=100`;
    const [data, setData] = useState([]);

    // Executes fetch once on page load
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(api);
            const result = await response.json();
            setData(result.listResult);
        }
        fetchData().catch(error => {
            console.error(error);
        });
    }, [api]);

    return (
        <section>
            <div className="section-content">
                <h1>Recipes</h1>
                <i>Vegetarian doesn't have to mean salads. Explore new and absolutely delicious recipes from
                    our community.</i>
                <div className="panel">
                    {/*Iterates over the result JSON and renders a matching amount of card items*/}
                    {data.length > 0 ?
                        data.map(recipe => (
                            <Card className="card-medium"
                                  key={recipe.recipe_id}
                                  id={recipe.recipe_id}
                                  type="recipe"
                                  title={recipe.recipe_title}
                                  thumbnail={recipe.recipe_thumbnail}
                                  firstName={recipe.first_name}
                                  lastName={recipe.last_name}
                                  time={recipe.time}/>
                        ))
                        :
                        <SectionLoader/>
                    }
                </div>
            </div>
        </section>
    )
}

export default BrowseRecipes;