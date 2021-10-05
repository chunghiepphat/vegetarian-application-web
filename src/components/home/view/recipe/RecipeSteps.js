import React from "react";

const RecipeSteps = (props) => {
    return (
        <section className="article-content">
            <div dangerouslySetInnerHTML={{__html: props.recipe_content}}/>
        </section>
    )
}

export default RecipeSteps;