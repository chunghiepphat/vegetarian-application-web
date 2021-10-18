import React, {useEffect} from "react";
import {Link, useHistory} from "react-router-dom";
import {FaAngleLeft} from "react-icons/fa";
import {ImCross} from "react-icons/all";
import Form from "../../../commons/elements/form/Form";
import InputGroup from "../../../commons/elements/form/InputGroup";


const RecipeStep03 = (props) => {
    const history = useHistory();

    const handleAddField = (e) => {
        e.preventDefault();
        const ingredient = {
            ingredient_name: "",
            amount_in_mg: "1",
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


    const nextStep = () => {
        history.push("/post/recipe/step-4");
    }
    useEffect(() => {
        console.log(props.ingredients)
    }, [props.ingredients])

    return (
        <>
            <section>
                <header className="section-header">
                    <Link to="/post/recipe/step-2"><FaAngleLeft/>Previous step</Link>
                    <h1>Step 3 - Add your ingredients</h1>
                    <em>Add some ingredients and their estimated amounts. Concise and precise ingredient names help us
                        estimate the nutritional values for your recipe better.</em>
                </header>
                <div className="section-content">
                    <Form onSubmit={nextStep}>
                        <h1>Name an ingredient and its amount (in grams)</h1>
                        {props.ingredients.length > 0 ?
                            <div className="form-dynamic">
                                {props.ingredients.map((item, index) => (
                                    <InputGroup key={index}>
                                        <input name="ingredient_name" type="text"
                                               value={item.ingredient_name}
                                               onChange={(e) => handleChange(e, index)}
                                               placeholder="e.g: lettuce, tomato, basil,..." required/>
                                        <input name="amount_in_mg" type="number"
                                               value={item.amount_in_mg} min="1"
                                               onChange={(e) => handleChange(e, index)}/>
                                        <button className="button-remove" onClick={(e) => handleRemoveField(e, index)}>
                                            <ImCross/>
                                        </button>
                                    </InputGroup>
                                ))}
                            </div>
                            :
                            <em>Add some ingredients to your recipe...</em>}
                        <div className="input-group">
                            <button onClick={handleAddField}>Add ingredient</button>
                            <button className="button-cancel" onClick={handleClear}>Clear</button>
                        </div>
                        {props.ingredients.length > 0 ?
                            <button type="submit" className="button-submit">Next step</button>
                            :
                            <button disabled>Next step</button>
                        }
                    </Form>
                </div>
            </section>
        </>
    )
}

export default RecipeStep03;