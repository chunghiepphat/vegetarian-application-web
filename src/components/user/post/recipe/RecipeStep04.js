import React, {useContext} from "react";
import {postDisplayStrings} from "../../../../resources/UserDisplayStrings";
import {LocaleContext} from "../../../../context/LocaleContext";
import {Link} from "react-router-dom";
import Form from "../../../commons/elements/form/Form";
import InputGroup from "../../../commons/elements/form/InputGroup";
import {FaAngleLeft} from "react-icons/fa";
import {ImCross} from "react-icons/all";

const RecipeStep04 = (props) => {
    // Localizations
    postDisplayStrings.setLanguage(useContext(LocaleContext));

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

    const handleClear = (e) => {
        e.preventDefault();
        props.setSteps([]);
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
            <header className="section-header">
                {!props.isLoading &&
                <Link to="/post/recipe/step-3"><FaAngleLeft/>{postDisplayStrings.postRecipePreviousStep}</Link>}
                <h1>{postDisplayStrings.postRecipeStep4}</h1>
                <em>{postDisplayStrings.postRecipeStep4Subheader}</em>
            </header>
            <div className="section-content">
                <Form onSubmit={props.submitPost}>
                    {props.steps.length > 0 ?
                        <fieldset disabled={!!props.isLoading}>
                            <ul className="form-dynamic">
                                {props.steps.map((item, index) => (
                                    <div key={index}>
                                        <label
                                            htmlFor={`Step ${index}`}>{postDisplayStrings.postRecipeSteps} {index + 1}</label>
                                        <InputGroup>
                                        <textarea id={`Step ${index}`} name="step_content"
                                                  value={item.step_content}
                                                  onChange={(e) => handleChange(e, index)}
                                                  placeholder={postDisplayStrings.postRecipeStepsPlaceholder} required/>
                                            <button className="button-remove" disabled={!props.isLoading}
                                                    onClick={(e) => handleRemoveField(e, index)}>
                                                <ImCross/>
                                            </button>
                                        </InputGroup>
                                    </div>))}
                            </ul>
                        </fieldset>
                        : <em>{postDisplayStrings.postRecipeAddStepPlaceholder}</em>}
                    <div className="sticky-bottom">
                        <InputGroup>
                            {props.isLoading ? <>
                                <button disabled>{props.uploadProgress}</button>
                            </> : <>
                                <button className="button-light"
                                        onClick={handleAddField}>{postDisplayStrings.postRecipeAddStep}</button>
                                {props.steps.length > 0 ? <>
                                    <button className="button-light"
                                            onClick={handleClear}>{postDisplayStrings.postRecipeClear}</button>
                                    <button type="submit" className="button-dark"
                                            name="true">{postDisplayStrings.postRecipeSaveDraft}</button>
                                    <button type="submit" className="button-dark"
                                            name="false">{postDisplayStrings.postRecipeSubmitForReview}</button>
                                </> : <>
                                    <button disabled>{postDisplayStrings.postRecipeClear}</button>
                                    <button disabled>{postDisplayStrings.postRecipeSaveDraft}</button>
                                    <button disabled>{postDisplayStrings.postRecipeSubmitForReview}</button>
                                </>}
                            </>}
                        </InputGroup>
                    </div>
                </Form>
            </div>
        </section>
    )
}

export default RecipeStep04;