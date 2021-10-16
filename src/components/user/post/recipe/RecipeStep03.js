import React, {useEffect, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import {FaAngleLeft} from "react-icons/fa";


const RecipeStep03 = (props) => {
    const history = useHistory();
    const [ingredient, setIngredient] = useState({ingredient_name: "", amount_in_mg: "0"});

    const handleAddItem = (e) => {
        e.preventDefault();
        const ingredient = {
            ingredient_name: "",
            amount_in_mg: "0",
        }
        props.setIngredients((prev) => [...prev, ingredient]);
    }
    const handleChange = (index, e) => {
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
                    <form className="form-full">
                        <h1>Name an ingredient and its amount (in grams)</h1>
                        {props.ingredients.length > 0 ?
                            <ul className="ingredient-list">
                                {props.ingredients.map((item, index) => (
                                    <li className="flex-horizontal" key={index}>
                                        <input name="ingredient_name" type="text"
                                               value={item.ingredient_name}
                                               onChange={(e) => handleChange(index, e)}
                                               placeholder="e.g: lettuce, tomato, basil,..." required/>
                                        <input name="amount_in_mg" type="number"
                                               value={item.amount_in_mg}
                                               onChange={(e) => handleChange(index, e)}/>
                                    </li>
                                ))}
                            </ul>
                            :
                            <em>Add some ingredients to your recipe...</em>}
                        <div className="flex-horizontal">
                            <button onClick={handleAddItem}>Add ingredient</button>
                            <button onClick={nextStep} type="submit">Next step</button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}

export default RecipeStep03;