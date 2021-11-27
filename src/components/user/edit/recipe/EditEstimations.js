import React from "react";
import InputGroup from "../../../commons/elements/form/InputGroup";
import LocalizedStrings from "react-localization";

const EditEstimations = (props) => {
    // Localizations test
    let strings = new LocalizedStrings({
        en: {
            editHeader: "Update recipe info & estimations...",
            editDifficulty: "Recipe difficulty",
            editPortion: "Portion",
            editservings: "servings",
            editpieces: "pieces",
            editPrepTime: "Prep time (minutes)",
            editBakingTime: "Baking time (minutes)",
            editRestingTime: "Resting time (minutes)",
            clearChangesButton: "Clear changes",
        },
        vi: {
            editHeader: "Chỉnh sửa thông tin công thức và ước lượng...",
            editDifficulty: "Độ khó",
            editPortion: "Khẩu phần",
            editservings: "phần",
            editpieces: "miếng",
            editPrepTime: "Thời gian chuẩn bị (phút)",
            editBakingTime: "Thời gian nướng (phút)",
            editRestingTime: "Thời gian nghỉ (phút)",
            clearChangesButton: "Hủy thay đổi",
        }
    });

    const handleUndo = (e) => {
        e.preventDefault();
        props.setDifficulty(props.data.recipe_difficulty);
        props.setPortionSize(props.data.portion_size);
        props.setPortionType(props.data.portion_type);
        props.setPrepTime(props.data.prep_time_minutes);
        props.setBakingTime(props.data.baking_time_minutes);
        props.setRestingTime(props.data.resting_time_minutes);
    }

    return (
        <section>
            <h1>{strings.editHeader}</h1>
            {/*Difficulty radio buttons*/}
            <label>{strings.editDifficulty}</label>
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
            <label>{strings.editPortion}
                <InputGroup>
                    <input aria-label="Portion size" type="number" min={1} value={props.portionSize}
                           onChange={e => props.setPortionSize(e.target.value)}/>
                    <select aria-label="Portion type" value={props.portionType}
                            onChange={e => props.setPortionType(e.target.value)}>
                        <option value="1">{strings.editservings}</option>
                        <option value="2">{strings.editpieces}</option>
                    </select>
                </InputGroup>
            </label>
            {/*Time estimates*/}
            <label>{strings.editPrepTime}
                <InputGroup>
                    <input aria-label="Prep time" type="number" min={0} value={props.prepTime}
                           onChange={e => props.setPrepTime(e.target.value)}/>
                </InputGroup>

            </label>
            <label>{strings.editBakingTime}
                <InputGroup>
                    <input aria-label="Baking time" type="number" min={0} value={props.bakingTime}
                           onChange={e => props.setBakingTime(e.target.value)}/>
                </InputGroup>
            </label>
            <label>{strings.editRestingTime}
                <InputGroup>
                    <input aria-label="Resting time" type="number" min={0} value={props.restingTime}
                           onChange={e => props.setRestingTime(e.target.value)}/>
                </InputGroup>
            </label>
            <button className="button-light" onClick={handleUndo}>{strings.clearChangesButton}</button>
        </section>
    )
}

export default EditEstimations;