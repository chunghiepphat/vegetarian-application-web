import React from "react";

const ViewRecipeSteps = (props) => {
    return (
        <section className="article-content">
            <div dangerouslySetInnerHTML={{__html: props.recipe_content}}/>
        </section>
    )
}

export default ViewRecipeSteps;