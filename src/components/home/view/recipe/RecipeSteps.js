import React, {useContext} from "react";
import {viewDisplayStrings} from "../../../../resources/PublicDisplayStrings";
import {LocaleContext} from "../../../../context/LocaleContext";

const RecipeSteps = (props) => {
    // Localizations
    viewDisplayStrings.setLanguage(useContext(LocaleContext));

    return (
        <section className="article-instructions">
            <h2>{viewDisplayStrings.viewRecipeSteps}</h2>
            {props.steps && props.steps.length > 0 ?
                props.steps.map(item => (
                    <div className="article-step" key={item.step_index}>
                        <div className="step-index">
                            <span className="step-current">{item.step_index + 1}</span>
                            <span className="step-total">{props.steps.length}</span>
                        </div>
                        <p className="step-content">{item.step_content}</p>
                    </div>))
                : <em>{viewDisplayStrings.viewRecipeStepsEmpty}</em>}
        </section>
    )
}

export default RecipeSteps;