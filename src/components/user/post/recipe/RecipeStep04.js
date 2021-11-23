import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import Form from "../../../commons/elements/form/Form";
import InputGroup from "../../../commons/elements/form/InputGroup";
import {FaAngleLeft} from "react-icons/fa";
import {ImCross} from "react-icons/all";
import LocalizedStrings from "react-localization";

const RecipeStep04 = (props) => {
    // Localizations
    let strings = new LocalizedStrings({
        en: {
            step4Header: "Step 4 - Add your step-by-step instructions",
            step4MessageHeader: "Almost there! Share with us the secrets to this recipe and you're done!",
            previousStepButton: "Previous step",
            addStepMessage: "Add some step-by-step guide for your recipe",
            addStepButton: "Add a step",
            clearButton: "Clear",
            steps: "Step",
            stepPlaceholder: "What to do?",
            saveDraftButton: "Save draft",
            publishButton: "Publish",
        },
        vi: {
            step4Header: "Bước 4 - Thêm chỉ dẫn từng bước để nấu món ăn",
            step4MessageHeader: "Hãy chia sẻ những bước cho công thức này cho mọi người!",
            previousStepButton: "Bước trước",
            addStepMessage: "Thêm chỉ dẫn các bước thực hiện công thức của bạn",
            addStepButton: "Thêm bước",
            clearButton: "Hủy",
            steps: "Bước",
            stepPlaceholder: "Làm gì đây?",
            saveDraftButton: "Lưu nháp",
            publishButton: "Tạo công thức",
        }
    });

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
    useEffect(() => {
        console.log(props.ingredients)
    }, [props.ingredients])

    return (
        <section>
            <header className="section-header">
                <Link to="/post/recipe/step-3"><FaAngleLeft/>{strings.previousStepButton}</Link>
                <h1>{strings.step4Header}</h1>
                <em>{strings.step4MessageHeader}</em>
            </header>
            <div className="section-content">
                <Form onSubmit={props.submitPost}>
                    {props.steps.length > 0 ?
                        <fieldset disabled={!!props.isLoading}>
                            <ul className="form-dynamic">
                                {props.steps.map((item, index) => (
                                    <div key={index}>
                                        <label htmlFor={`Step ${index}`}>{strings.steps} {index + 1}</label>
                                        <InputGroup>
                                        <textarea id={`Step ${index}`} name="step_content"
                                                  value={item.step_content}
                                                  onChange={(e) => handleChange(e, index)}
                                                  placeholder={strings.stepPlaceholder} required/>
                                            <button className="button-remove" disabled={!!props.isLoading}
                                                    onClick={(e) => handleRemoveField(e, index)}>
                                                <ImCross/>
                                            </button>
                                        </InputGroup>
                                    </div>))}
                            </ul>
                        </fieldset>
                        : <em>{strings.addStepMessage}</em>}
                    <div className="sticky-bottom">
                        <InputGroup>
                            {props.isLoading ? <>
                                <button disabled>{props.uploadProgress}</button>
                            </> : <>
                                <button className="button-light" onClick={handleAddField}>{strings.addStepButton}</button>
                                {props.steps.length > 0 ? <>
                                    <button className="button-light" onClick={handleClear}>{strings.clearButton}</button>
                                    <button type="submit" className="button-dark" name="true">{strings.saveDraftButton}</button>
                                    <button type="submit" className="button-dark" name="false">{strings.publishButton}</button>
                                </> : <>
                                    <button disabled>{strings.clearButton}</button>
                                    <button disabled>{strings.saveDraftButton}</button>
                                    <button disabled>{strings.publishButton}</button>
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