import React from "react";
import LocalizedStrings from "react-localization";

const RecipeSteps = (props) => {
    // Localizations
    let strings = new LocalizedStrings({
        en: {
            header: "Step-by-step instructions",
            noInstructionsMessage: "It seems there aren't any instructions for this recipe...",
        },
        vi: {
            header: "Hướng dẫn từng bước",
            noInstructionsMessage: "Có vẻ như công thức này lại không có chỉ dẫn...",
        }
    });

    return (
        <section className="article-instructions">
            <h2>{strings.header}</h2>
            {props.steps && props.steps.length > 0 ?
                props.steps.map(step => (
                    <div className="article-step">
                        <div className="step-index">
                            <span className="step-current">{step.step_index + 1}</span>
                            <span className="step-total">{props.steps.length}</span>
                        </div>
                        <p className="step-content">{step.step_content}</p>
                    </div>))
                : <em>{strings.noInstructionsMessage}</em>}
        </section>
    )
}

export default RecipeSteps;