import React from "react";
import {useHistory} from "react-router-dom";
import InputGroup from "../../../commons/elements/form/InputGroup";
import Form from "../../../commons/elements/form/Form";

const RecipeStep01 = (props) => {
    const history = useHistory();
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    const nextStep = () => {
        history.push("/post/recipe/step-2");
    }

    return (
        <section>
            <header className="section-header">
                <h1>Step 1 - Getting started</h1>
                <em>Share with us some details about your new exciting recipe.</em>
            </header>
            <div className="section-content">
                <Form onSubmit={nextStep}>
                    {/*Recipe name*/}
                    <label>Name your recipe (*)
                        <input aria-label="Recipe title" type="text" value={props.title}
                               onChange={e => props.setTitle(capitalizeFirstLetter(e.target.value))}
                               placeholder="What would you call this dish?" required/>
                    </label>
                    {/*Recipe type*/}
                    <label>Recipe type
                        <select aria-label="Recipe type" value={props.category}
                                onChange={e => props.setCategory(e.target.value)}>
                            <option value="1">Main course</option>
                            <option value="2">Dessert</option>
                        </select>
                    </label>
                    {/*Difficulty radio buttons*/}
                    <label>Recipe difficulty</label>
                    <InputGroup>
                        <label className="radio-button">
                            <input type="radio" name="difficulty" value="1" defaultChecked
                                   onChange={e => props.setDifficulty(e.target.value)}/>
                            <span className="radio-label">1</span>
                        </label>
                        <label className="radio-button">
                            <input type="radio" name="difficulty" value="2"
                                   onChange={e => props.setDifficulty(e.target.value)}/>
                            <span className="radio-label">2</span>
                        </label>
                        <label className="radio-button">
                            <input type="radio" name="difficulty" value="3"
                                   onChange={e => props.setDifficulty(e.target.value)}/>
                            <span className="radio-label">3</span>
                        </label>
                        <label className="radio-button">
                            <input type="radio" name="difficulty" value="4"
                                   onChange={e => props.setDifficulty(e.target.value)}/>
                            <span className="radio-label">4</span>
                        </label>
                        <label className="radio-button">
                            <input type="radio" name="difficulty" value="5"
                                   onChange={e => props.setDifficulty(e.target.value)}/>
                            <span className="radio-label">Gordon Ramsay</span>
                        </label>
                    </InputGroup>
                    {/*Portion estimates*/}
                    <label>Portion
                        <InputGroup>
                            <input aria-label="Portion size" type="number" min={1} value={props.portionSize}
                                   onChange={e => props.setPortionSize(e.target.value)}/>
                            <select aria-label="Portion type" value={props.portionType}
                                    onChange={e => props.setPortionType(e.target.value)}>
                                <option value="1">servings</option>
                                <option value="2">pieces</option>
                            </select>
                        </InputGroup>
                    </label>
                    {/*Time estimates*/}
                    <label>Prep time (minutes)
                        <InputGroup>
                            <input aria-label="Prep time" type="number" min={0} value={props.prepTime}
                                   onChange={e => props.setPrepTime(e.target.value)}/>
                        </InputGroup>

                    </label>
                    <label>Baking time (minutes)
                        <InputGroup>
                            <input aria-label="Baking time" type="number" min={0} value={props.bakingTime}
                                   onChange={e => props.setBakingTime(e.target.value)}/>
                        </InputGroup>
                    </label>
                    <label>Resting time (minutes)
                        <InputGroup>
                            <input aria-label="Resting time" type="number" min={0} value={props.restingTime}
                                   onChange={e => props.setRestingTime(e.target.value)}/>
                        </InputGroup>
                    </label>
                    <button type="submit" className="button-submit">Next step</button>
                </Form>
            </div>
        </section>
    )
}

export default RecipeStep01;