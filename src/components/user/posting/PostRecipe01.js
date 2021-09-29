import React from "react";
import {useHistory} from "react-router-dom";

const PostRecipe01 = (props) => {
    const history = useHistory();

    const nextStep = () => {
        history.push("/post/recipe/ingredients");
    }

    return (
        <section>
            <header className="section-header">
                <h1>Step 1 - Getting started</h1>
            </header>
            <div className="section-content">
                <form className="form-container" onSubmit={nextStep}>
                    {/*Recipe name*/}
                    <h1>Name your recipe</h1>
                    <input aria-label="Recipe title" type="text" value={props.title}
                           onChange={e => props.setTitle(e.target.value)}
                           placeholder="What would you call this dish?" required/>
                    <h1>Recipe type</h1>
                    <select aria-label="Recipe type" value={props.category}
                            onChange={e => props.setCategory(e.target.value)}>
                        <option value="1">Main course</option>
                        <option value="2">Dessert</option>
                    </select>
                    {/*Difficulty radio buttons*/}
                    <h1>Recipe difficulty</h1>
                    <div className="flex-horizontal">
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
                    </div>
                    {/*Portion estimates*/}
                    <h1>Portion</h1>
                    <div className="flex-horizontal">
                        <input aria-label="Portion size" type="number" min={1} value={props.portionSize}
                               onChange={e => props.setPortionSize(e.target.value)}/>
                        <select aria-label="Portion type" value={props.portionType}
                                onChange={e => props.setPortionType(e.target.value)}>
                            <option value="1">servings</option>
                            <option value="2">pieces</option>
                        </select>
                    </div>
                    {/*Time estimates*/}
                    <h1>Prep time (minutes)</h1>
                    <input aria-label="Prep time" type="number" min={0} value={props.prepTime}
                           onChange={e => props.setPrepTime(e.target.value)}/>
                    <h1>Baking time (minutes)</h1>
                    <input aria-label="Baking time" type="number" min={0} value={props.bakingTime}
                           onChange={e => props.setBakingTime(e.target.value)}/>
                    <h1>Resting time (minutes)</h1>
                    <input aria-label="Resting time" type="number" min={0} value={props.restingTime}
                           onChange={e => props.setRestingTime(e.target.value)}/>
                    <button type="submit">Next step</button>
                </form>
            </div>
        </section>
    )
}

export default PostRecipe01;