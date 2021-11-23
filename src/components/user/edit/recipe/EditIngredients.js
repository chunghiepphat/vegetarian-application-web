import React from "react";
import {ImCross} from "react-icons/all";
import InputGroup from "../../../commons/elements/form/InputGroup";
import LocalizedStrings from "react-localization";

const EditIngredients = (props) => {
    // Localizations
    let strings = new LocalizedStrings({
        en: {
            editHeader: "Edit, add or remove ingredients... (in grams)",
            editIngredientMessage: "Add some ingredients to your recipe...",
            ingredientPlaceholder: "e.g: lettuce, tomato, basil,...",
            addIngredientButton: "Add ingredient",
            clearChangesButton: "Clear changes",
        },
        vi: {
            editHeader: "Chỉnh sửa, thêm hoặc giảm nguyên liệu... (tính theo gram)",
            editIngredientMessage: "Thêm nguyên liệu cho công thức của bạn...",
            ingredientPlaceholder: "ví dụ: cải bông, cà chua, húng quế,...",
            addIngredientButton: "Thêm nguyên liệu",
            clearChangesButton: "Hủy thay đổi",
        }
    });

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
    const handleUndo = (e) => {
        e.preventDefault();
        props.setIngredients([].concat(props.data.ingredients));
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

    return (
        <section>
            <h1>{strings.editHeader}</h1>
            {props.ingredients.length > 0 ?
                <ul className="form-dynamic">
                    {props.ingredients.map((item, index) => (
                        <InputGroup key={index}>
                            <input name="ingredient_name" type="text"
                                   value={item.ingredient_name}
                                   onChange={(e) => handleChange(e, index)}
                                   placeholder={strings.ingredientPlaceholder} required/>
                            <input name="amount_in_mg" type="number"
                                   value={item.amount_in_mg} min={1}
                                   onChange={(e) => handleChange(e, index)}/>
                            <button className="button-remove"
                                    onClick={(e) => handleRemoveField(e, index)}>
                                <ImCross/>
                            </button>
                        </InputGroup>
                    ))}
                </ul>
                :
                <em>{strings.editIngredientMessage}</em>
            }
            <div className="input-group">
                <button onClick={handleAddField}>{strings.addIngredientButton}</button>
                <button className="button-light" onClick={handleUndo}>{strings.clearChangesButton}</button>
            </div>
        </section>
    )
}

export default EditIngredients;