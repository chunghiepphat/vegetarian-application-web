import React from "react";
import ArticleCard from "../../../commons/elements/containers/ArticleCard";
import Navbar from "../../../commons/elements/bars/Navbar";
import {useLocation} from "react-router-dom";

const ResultRecipes = () => {
    const location = useLocation()
    const data = location.state.data;
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
                {data &&
                <div className="section-content">
                    <h1>Recipes</h1>
                    <div className="panel">
                        {data.map(recipe => (
                            <ArticleCard className="card-narrow"
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
                }
            </section>
        </>
    )
}

export default ResultRecipes;