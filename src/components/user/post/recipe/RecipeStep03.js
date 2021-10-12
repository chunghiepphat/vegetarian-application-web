import React, {useState} from "react";
import {Link, useHistory} from "react-router-dom";
import {FaAngleLeft} from "react-icons/fa";


const RecipeStep03 = (props) => {
    const history = useHistory();
    const [ingredient, setIngredient] = useState({ingredient_name: "", amount_in_mg: "0"});

    const handleChange = (field) => (event) => {
        setIngredient({...ingredient, [field]: event.target.value});
    }
    const addIngredient = (event) => {
        event.preventDefault();
        props.setIngredients(props.ingredients.concat(ingredient));
        setIngredient({ingredient_name: "", amount_in_mg: "0"});
    }

    const nextStep = () => {
        history.push("/post/recipe/step-4");
    }

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
                    <form className="form-full" onSubmit={addIngredient}>
                        <h1>Name an ingredient and its amount (in grams)</h1>
                        <div className="flex-horizontal">
                            <input aria-label="Ingredient" type="text" value={ingredient.ingredient_name}
                                   onChange={handleChange("ingredient_name")}
                                   placeholder="e.g: lettuce, tomato, basil,..." required/>
                            <input aria-label="Amount" type="number" value={ingredient.amount_in_mg}
                                   onChange={handleChange("amount_in_mg")}/>
                        </div>
                        <button type="submit">Add ingredient</button>
                    </form>
                </div>
            </section>
            <section>
                <header className="section-header">
                    <h1>Your ingredients</h1>
                </header>
                <div className="section-content">
                    <form className="form-full" onSubmit={nextStep}>
                        {props.ingredients.length > 0 ?
                            <>
                                <ul className="ingredient-list">
                                    {props.ingredients.map(ingredient => (
                                        <li className="flex-horizontal" key={ingredient.ingredient_name}>
                                            <input aria-label="Ingredient" type="text"
                                                   value={ingredient.ingredient_name}
                                                   onChange={handleChange("name")}
                                                   placeholder="e.g: lettuce, tomato, basil,..." required/>
                                            <input aria-label="Amount" type="number" value={ingredient.amount_in_mg}
                                                   onChange={handleChange("amount")}/>
                                        </li>
                                    ))}
                                </ul>
                                <button type="submit">Next step</button>
                            </>
                            :
                            <>
                                <em>Add something to proceed with your recipe...</em>
                                <button type="submit" disabled>Next step</button>
                            </>
                        }
                    </form>
                </div>
            </section>
        </>
    )
}

export default RecipeStep03;