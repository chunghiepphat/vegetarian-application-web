import React from "react";
import ArticleCard from "../../commons/elements/containers/ArticleCard";
import {SectionLoader} from "../../commons/elements/loaders/Loader";
import Panel from "../../commons/elements/containers/Panel";

const FavoriteRecipes = ({data}) => {
    return (
        <section>
            <div className="section-content">
                <h1>Recipes</h1>
                <p>Recipes you added to favorites will be shown here.</p>
                <Panel>
                    {/*Iterates over the result JSON and renders a matching amount of card items*/}
                    {data.length > 0 ?
                        data.map(recipe => (
                            <ArticleCard className="card-narrow"
                                         key={recipe.recipe_id}
                                         id={recipe.recipe_id}
                                         type="recipe"
                                         title={recipe.recipe_title}
                                         thumbnail={recipe.recipe_thumbnail}
                                         firstName={recipe.first_name}
                                         lastName={recipe.last_name}
                                         totalLike={recipe.totalLike}/>
                        ))
                        :
                        <SectionLoader/>
                    }
                </Panel>
            </div>
        </section>
    )
}

export default FavoriteRecipes;