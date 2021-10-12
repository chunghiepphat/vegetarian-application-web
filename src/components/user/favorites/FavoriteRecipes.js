import React from "react";
import Card from "../../commons/elements/containers/Card";
import {SectionLoader} from "../../commons/elements/loaders/Loader";

const FavoriteRecipes = ({data}) => {
    return (
        <section>
            <div className="section-content">
                <h1>Recipes</h1>
                <i>Recipes you added to favorites will be shown here.</i>
                <div className="panel">
                    {/*Iterates over the result JSON and renders a matching amount of card items*/}
                    {data.length > 0 ?
                        data.map(recipe => (
                            <Card className="card-full"
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
                </div>
            </div>
        </section>
    )
}

export default FavoriteRecipes;