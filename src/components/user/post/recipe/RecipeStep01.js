import React, {useContext} from "react";
import {postDisplayStrings} from "../../../../resources/UserDisplayStrings";
import {genericStrings} from "../../../../resources/CommonDisplayStrings";
import {LocaleContext} from "../../../../context/LocaleContext";
import Form from "../../../commons/elements/form/Form";
import InputGroup from "../../../commons/elements/form/InputGroup";

const RecipeStep01 = (props) => {
    // Localizations
    genericStrings.setLanguage(useContext(LocaleContext));
    postDisplayStrings.setLanguage(useContext(LocaleContext));

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const clearInput = (e) => {
        e.preventDefault();
        props.setTitle("");
        props.setCategory(1);
        props.setDifficulty(1);
        props.setPortionSize(1);
        props.setPortionType(1);
        props.setPrepTime(0);
        props.setBakingTime(0);
        props.setRestingTime(0);
    }

    const nextStep = () => {
        props.history.push("/post/recipe/step-2");
    }

    return (
        <section>
            <header className="section-header">
                <h1>{postDisplayStrings.postRecipeStep1}</h1>
                <em>{postDisplayStrings.postRecipeStep1Subheader}</em>
            </header>
            <div className="section-content">
                <Form onSubmit={nextStep}>
                    <label>{postDisplayStrings.postRecipeName}
                        <input aria-label="Recipe title" type="text" value={props.title}
                               onChange={e => props.setTitle(capitalizeFirstLetter(e.target.value))}
                               placeholder={postDisplayStrings.postRecipeNamePlaceholder} required/>
                    </label>
                    <label>{postDisplayStrings.postRecipeType}
                        <select aria-label="Recipe type" value={props.category}
                                onChange={e => props.setCategory(e.target.value)}>
                            {props.categoryList && props.categoryList.map(item => (
                                <option value={item.category_id}>{item.category_name}</option>
                            ))}}
                        </select>
                    </label>
                    <label>{postDisplayStrings.postRecipeDifficulty}</label>
                    <InputGroup>
                        <label className="radio-button">
                            <input type="radio" name="difficulty" value="1" defaultChecked
                                   onChange={e => props.setDifficulty(e.target.value)}/>
                            <span className="radio-label">{genericStrings.beginner}</span> </label>
                        <label className="radio-button">
                            <input type="radio" name="difficulty" value="2"
                                   onChange={e => props.setDifficulty(e.target.value)}/>
                            <span className="radio-label">{genericStrings.novice}</span> </label>
                        <label className="radio-button">
                            <input type="radio" name="difficulty" value="3"
                                   onChange={e => props.setDifficulty(e.target.value)}/>
                            <span className="radio-label">{genericStrings.cook}</span> </label>
                        <label className="radio-button">
                            <input type="radio" name="difficulty" value="4"
                                   onChange={e => props.setDifficulty(e.target.value)}/>
                            <span className="radio-label">{genericStrings.chef}</span> </label>
                        <label className="radio-button">
                            <input type="radio" name="difficulty" value="5"
                                   onChange={e => props.setDifficulty(e.target.value)}/>
                            <span className="radio-label">{genericStrings.gordonRamsay}</span> </label>
                    </InputGroup>
                    <label>{postDisplayStrings.postRecipePortion}
                        <InputGroup>
                            <input aria-label="Portion size" type="number" min={1} value={props.portionSize}
                                   onChange={e => props.setPortionSize(e.target.value)}/>
                            <select aria-label="Portion type" value={props.portionType}
                                    onChange={e => props.setPortionType(e.target.value)}
                                    style={{maxWidth: "200px"}}>
                                <option value="1">{genericStrings.servings}</option>
                                <option value="2">{genericStrings.pieces}</option>
                            </select> </InputGroup> </label>
                    <label>{postDisplayStrings.postRecipePrepTime}
                        <InputGroup>
                            <input aria-label="Prep time" type="number" min={0} value={props.prepTime}
                                   onChange={e => props.setPrepTime(e.target.value)}/> </InputGroup> </label>
                    <label>{postDisplayStrings.postRecipeBakingTime}
                        <InputGroup>
                            <input aria-label="Baking time" type="number" min={0} value={props.bakingTime}
                                   onChange={e => props.setBakingTime(e.target.value)}/> </InputGroup> </label>
                    <label>{postDisplayStrings.postRecipeRestingTime}
                        <InputGroup>
                            <input aria-label="Resting time" type="number" min={0} value={props.restingTime}
                                   onChange={e => props.setRestingTime(e.target.value)}/> </InputGroup> </label>
                    <div className="sticky-bottom">
                        <InputGroup>
                            <button className="button-light"
                                    onClick={clearInput}>{postDisplayStrings.postRecipeClear}</button>
                            <button type="submit" className="button-dark">
                                {postDisplayStrings.postRecipeNextStep}
                            </button>
                        </InputGroup>
                    </div>
                </Form>
            </div>
        </section>
    )
}

export default RecipeStep01;