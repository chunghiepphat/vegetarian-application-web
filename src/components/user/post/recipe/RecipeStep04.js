import React, {useEffect, useState} from "react";
import {renderToStaticMarkup} from "react-dom/server";
import {FaAngleLeft} from "react-icons/fa";
import {Link} from "react-router-dom";

const RecipeStep04 = (props) => {
    const [steps, setSteps] = useState([]);
    const [step, setStep] = useState([]);
    const [stepCount, setStepCount] = useState(0);
    const [stepBody, setStepBody] = useState();
    let count = stepCount;

    // 1. Submit the form and increase the step counter
    const addStep = (event) => {
        event.preventDefault();
        count++;
        setStepCount(count);
    }

    // 2. Whenever the step counter changes and is not 0, define a new step with user input
    useEffect(() => {
        if (stepCount > 0) {
            setStep(
                <>
                    <h2>Step {stepCount}</h2>
                    <p>{stepBody}</p>
                </>
            )
        }
        setStepBody();
    }, [stepCount])

    // 3. Whenever a new step is defined, add it to the steps array
    useEffect(() => {
        setSteps(steps.concat(step));
    }, [step])

    // 4. Whenever the steps array is updated, convert it into HTML and set it as recipe content
    useEffect(() => {
        props.setContent(renderToStaticMarkup(steps));
    }, [steps])

    return (
        <>
            <section>
                <header className="section-header">
                    <Link to="/post/recipe/step-3"><FaAngleLeft/>Previous step</Link>
                    <h1>Step 4 - Add your step-by-step instructions</h1>
                    <em>Almost there! Share with us the secrets to this recipe and you're done!</em>
                </header>
                <div className="section-content">
                    <form className="form-full" onSubmit={addStep}>
                        <h1>Add your instructions</h1>
                        <textarea aria-label="Instruction" value={stepBody}
                                  onChange={e => setStepBody(e.target.value)} required/>
                        <button type="submit">Add step</button>
                    </form>
                </div>
            </section>
            <section>
                <header className="section-header">
                    <h1>Preview</h1>
                </header>
                <div className="section-content">
                    <form className="form-full" onSubmit={props.submitPost}>
                        {steps.length > 0 ?
                            <>
                                <ul className="ingredient-list">
                                    {steps.map(step => (
                                        <li>{step}</li>
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
        </>
    )
}

export default RecipeStep04;