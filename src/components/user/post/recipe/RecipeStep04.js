import React, {useEffect} from "react";
import {FaAngleLeft} from "react-icons/fa";
import {Link} from "react-router-dom";
import Form from "../../../commons/elements/form/Form";
import {ImCross} from "react-icons/all";
import InputGroup from "../../../commons/elements/form/InputGroup";

const RecipeStep04 = (props) => {

    const handleAddField = (e) => {
        e.preventDefault();
        const step = {
            step_content: "",
        }
        props.setSteps((prev) => [...prev, step]);
    }
    const handleRemoveField = (e, index) => {
        e.preventDefault();
        props.setSteps((prev) => prev.filter((item) => item !== prev[index]));
    }

    const handleClear = (e) => {
        e.preventDefault();
        props.setSteps([]);
    }

    const handleChange = (e, index) => {
        e.preventDefault();
        e.persist();
        props.setSteps((prev) => {
            return prev.map((item, i) => {
                if (i !== index) {
                    return item;
                }
                return {
                    ...item, [e.target.name]: e.target.value,
                };
            });
        });
    }

    useEffect(() => {
        console.log(props.ingredients)
    }, [props.ingredients])

    return (
        <>
            <section>
                <header className="section-header">
                    <Link to="/post/recipe/step-3"><FaAngleLeft/>Previous step</Link>
                    <h1>Step 4 - Add your step-by-step instructions</h1>
                    <em>Almost there! Share with us the secrets to this recipe and you're done!</em>
                </header>
                <div className="section-content">
                    <Form onSubmit={props.submitPost}>
                        {props.steps.length > 0 ?
                            <ul className="form-dynamic">
                                {props.steps.map((item, index) => (
                                    <div key={index}>
                                        <label htmlFor={`Step ${index}`}>Step {index + 1}</label>
                                        <InputGroup>
                                        <textarea id={`Step ${index}`} name="step_content"
                                                  value={item.step_content}
                                                  onChange={(e) => handleChange(e, index)}
                                                  placeholder="What to do?" required/>
                                            <button className="button-remove"
                                                    onClick={(e) => handleRemoveField(e, index)}>
                                                <ImCross/>
                                            </button>
                                        </InputGroup>
                                    </div>
                                ))}
                            </ul>
                            :
                            <em>Add some ingredients to your recipe...</em>}
                        <div className="input-group">
                            <button onClick={handleAddField}>Add a step</button>
                            <button className="button-cancel" onClick={handleClear}>Clear</button>
                        </div>
                        {props.steps.length > 0 ?
                            <button type="submit" className="button-submit">Finish</button>
                            :
                            <button disabled>Finish</button>
                        }
                    </Form>
                </div>
            </section>
        </>
    )
}

export default RecipeStep04;