import React from "react";
import {ImCross} from "react-icons/all";
import Form from "../../../commons/elements/form/Form";

const EditIngredients = (props) => {
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
                <h1>Edit, add or remove ingredients...</h1>
                {props.ingredients.length > 0 ?
                    <ul className="form-dynamic">
                        {props.ingredients.map((item, index) => (
                            <li className="input-group" key={index}>
                                <input name="ingredient_name" type="text"
                                       value={item.ingredient_name}
                                       onChange={(e) => handleChange(e, index)}
                                       placeholder="e.g: lettuce, tomato, basil,..." required/>
                                <input name="amount_in_mg" type="number"
                                       value={item.amount_in_mg} min={1}
                                       onChange={(e) => handleChange(e, index)}/>
                                <button className="button-remove" onClick={(e) => handleRemoveField(e, index)}>
                                    <ImCross/>
                                </button>
                            </li>
                        ))}
                    </ul>
                    :
                    <em>Add some ingredients to your recipe...</em>}
                <div className="input-group">
                    <button onClick={handleAddField}>Add ingredient</button>
                    <button className="button-cancel" onClick={handleClear}>Clear</button>
                </div>
            </Form>
        </section>
    )
}

export default EditIngredients;