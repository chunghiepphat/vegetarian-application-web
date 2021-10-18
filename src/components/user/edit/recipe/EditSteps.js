import React from "react";
import Form from "../../../commons/elements/form/Form";

const EditSteps = (props) => {
    const handleAddField = (e) => {
        e.preventDefault();
        const ingredient = {
            ingredient_name: "",
            amount_in_mg: "0",
        }
        props.setIngredients((prev) => [...prev, ingredient]);
    }
    const handleRemoveField = (e, index) => {
        e.preventDefault();
        props.setIngredients((prev) => prev.filter((item) => item !== prev[index]));
    }

    const handleClear = (e) => {
        e.preventDefault();
        props.setIngredients([]);
    }
    const handleChange = (e, index) => {
        e.preventDefault();
        e.persist();
        props.setIngredients((prev) => {
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
            <Form>
                <h1>Update your step-by-step guide...</h1>
                <div className="input-group">
                    <button onClick={handleAddField}>Add ingredient</button>
                    <button className="button-cancel" onClick={handleClear}>Clear</button>
                </div>
            </Form>
        </section>
    )
}

export default EditSteps;