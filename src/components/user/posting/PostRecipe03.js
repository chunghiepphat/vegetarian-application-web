import React, {useState} from "react";
import {renderToStaticMarkup} from "react-dom/server";

const PostRecipe03 = (props) => {
    const [steps, setSteps] = useState([]);
    const [step, setStep] = useState([]);
    const [stepCount, setStepCount] = useState(1);
    const [stepBody, setStepBody] = useState();
    let count = stepCount;

    const addStep = (event) => {
        event.preventDefault();
        count++;
        setStepCount(count);
        setStep(
            <>
                <h2>Step {stepCount}</h2>
                <p>{stepBody}</p>
            </>
        )
        setSteps(steps.concat(step));
    }
    props.setContent(renderToStaticMarkup(steps));

    return (
        <main>
            <section>
                <header className="section-header">
                    <h1>Step 3 - Add your step-by-step instructions</h1>
                </header>
                <div className="section-content">
                    <form className="form-container" onSubmit={addStep}>
                        <h1>Add your instructions</h1>
                        <textarea aria-label="Instruction" value={stepBody}
                                  onChange={e => setStepBody(e.target.value)}/>
                        <button type="submit">Add step</button>
                    </form>
                </div>
            </section>
            <section>
                <header className="section-header">
                    <h1>Preview</h1>
                </header>
                <div className="section-content">
                    <form className="form-container" onSubmit={props.submitPost}>
                        {steps.length > 0 ?
                            <>
                                <ul className="ingredient-list">
                                    {steps.map(step => (
                                        <li>
                                            {step}
                                        </li>
                                    ))}
                                </ul>
                                <button type="submit">Finish</button>
                            </>
                            :
                            <>
                                <em>Add some instructions to complete your recipe!</em>
                                <button type="submit" disabled>Finish</button>
                            </>
                        }
                    </form>
                </div>
            </section>
        </main>
    )
}

export default PostRecipe03;