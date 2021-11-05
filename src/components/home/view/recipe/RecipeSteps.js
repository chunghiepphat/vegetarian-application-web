import React from "react";

const RecipeSteps = (props) => {
    return (
        <section className="article-instructions">
            <h2>Step-by-step instructions</h2>
            {props.steps && props.steps.length > 0 ?
                props.steps.map(step => (
                    <div className="article-step">
                        <div className="step-index">
                            <span className="step-current">{step.step_index + 1}</span>
                            <span className="step-total">{props.steps.length}</span>
                        </div>
                        <p className="step-content">{step.step_content}</p>
                    </div>
                ))
                :
                <em>It seems there aren't any instructions for this recipe...</em>
            }
        </section>
    )
}

export default RecipeSteps;