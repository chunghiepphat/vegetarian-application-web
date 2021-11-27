import React, {useContext} from "react";
import {postDisplayStrings} from "../../../../resources/UserDisplayStrings";
import {LocaleContext} from "../../../../context/LocaleContext";
import {Link, useHistory} from "react-router-dom";
import Form from "../../../commons/elements/form/Form";
import InputGroup from "../../../commons/elements/form/InputGroup";
import {FaAngleLeft} from "react-icons/fa";
import {ImCross} from "react-icons/all";

const RecipeStep03 = (props) => {
    const history = useHistory();

    // Localizations
    postDisplayStrings.setLanguage(useContext(LocaleContext))

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

    return (
        <section>
            <header className="section-header">
                <Link to="/post/recipe/step-2"><FaAngleLeft/>{postDisplayStrings.postRecipePreviousStep}</Link>
                <h1>{postDisplayStrings.postRecipeStep3}</h1>
                <p>{postDisplayStrings.postRecipeStep3Subheader}</p>
            </header>
            <div className="section-content">
                <Form onSubmit={nextStep}>
                    <h1>{postDisplayStrings.postRecipeIngredients}</h1>
                    {props.ingredients.length > 0 ?
                        <div className="form-dynamic">
                            {props.ingredients.map((item, index) => (
                                <InputGroup key={index}>
                                    <input name="ingredient_name" type="text"
                                           value={item.ingredient_name}
                                           onChange={(e) => handleChange(e, index)}
                                           placeholder={postDisplayStrings.postRecipeIngredientsPlaceholder} required/>
                                    <input name="amount_in_mg" type="number"
                                           value={item.amount_in_mg} min={1}
                                           onChange={(e) => handleChange(e, index)}/>
                                    <button className="button-remove" onClick={(e) => handleRemoveField(e, index)}>
                                        <ImCross/>
                                    </button>
                                </InputGroup>
                            ))}
                        </div>
                        : <em>{postDisplayStrings.postRecipeIngredientsEmpty}</em>}
                    <div className="sticky-bottom">
                        <InputGroup>
                            <button className="button-light"
                                    onClick={handleAddField}>{postDisplayStrings.postRecipeAddIngredient}</button>
                            {props.ingredients.length > 0 ? <>
                                <button className="button-light"
                                        onClick={handleClear}>{postDisplayStrings.postRecipeClear}</button>
                                <button type="submit"
                                        className="button-dark"> {postDisplayStrings.postRecipeNextStep}</button>
                            </> : <>
                                <button disabled>{postDisplayStrings.postRecipeClear}</button>
                                <button disabled>{postDisplayStrings.postRecipeNextStep}</button>
                            </>}
                        </InputGroup>
                    </div>
                </Form>
            </div>
        </section>
    )
}

export default RecipeStep03;