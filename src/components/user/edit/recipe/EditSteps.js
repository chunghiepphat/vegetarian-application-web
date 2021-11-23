import React from "react";
import Form from "../../../commons/elements/form/Form";
import {ImCross} from "react-icons/all";
import InputGroup from "../../../commons/elements/form/InputGroup";
import LocalizedStrings from "react-localization";

const EditSteps = (props) => {
    // Localizations
    let strings = new LocalizedStrings({
        en: {
            editHeader: "Update your step-by-step guide...",
            editStepMessage: "Add some step-by-step guide for your recipe",
            addStepButton: "Add a step",
            clearChangesButton: "Clear changes",
            steps: "Step",
            stepPlaceholder: "What to do?",
        },
        vi: {
            editHeader: "Chỉnh sửa các bước nấu món ăn...",
            editStepMessage: "Thêm chỉ dẫn các bước thực hiện công thức của bạn",
            addStepButton: "Thêm bước",
            clearChangesButton: "Hủy thay đổi",
            steps: "Bước",
            stepPlaceholder: "Làm gì đây?",
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

    const handleUndo = (e) => {
        e.preventDefault();
        props.setSteps([].concat(props.data.steps));
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
            <h1>{strings.editHeader}</h1>
            {props.steps.length > 0 ?
                <ul className="form-dynamic">
                    {props.steps.map((item, index) => (
                        <div key={index}>
                            <label htmlFor={`Step ${index}`}>{strings.steps} {index + 1}</label>
                            <InputGroup>
                                        <textarea id={`Step ${index}`} name="step_content"
                                                  value={item.step_content}
                                                  onChange={(e) => handleChange(e, index)}
                                                  placeholder={strings.stepPlaceholder} required/>
                                <button className="button-remove"
                                        onClick={(e) => handleRemoveField(e, index)}>
                                    <ImCross/>
                                </button>
                            </InputGroup>
                        </div>
                    ))}
                </ul>
                :
                <em>{strings.editStepMessage}</em>
            }
            <div className="input-group">
                <button onClick={handleAddField}>{strings.addStepButton}</button>
                <button className="button-light" onClick={handleUndo}>{strings.clearChangesButton}</button>
            </div>
        </section>
    )
}

export default EditSteps;