import React from "react";
import Form from "../../../commons/elements/form/Form";
import {ImCross} from "react-icons/all";
import InputGroup from "../../../commons/elements/form/InputGroup";

const EditSteps = (props) => {
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

    const handleUndo = (e) => {
        e.preventDefault();
        props.setSteps([].concat(props.data.steps));
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

    return (
        <section>
            <h1>Update your step-by-step guide...</h1>
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
                <em>Add some ingredients to your recipe...</em>
            }
            <div className="input-group">
                <button onClick={handleAddField}>Add a step</button>
                <button className="button-light" onClick={handleUndo}>Clear changes</button>
            </div>
        </section>
    )
}

export default EditSteps;