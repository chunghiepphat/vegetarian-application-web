import React, {useEffect, useState} from "react";
import {apiUrl} from "../../../helpers/Variables";
import Form from "../../commons/elements/form/Form";
import InputArray from "../../commons/elements/form/InputArray";
import InputGroup from "../../commons/elements/form/InputGroup";
import {ImCross} from "react-icons/all";
import LocalizedStrings from "react-localization";

const UpdateAllergies = ({user, token, location}) => {
    // Localizations
    let strings = new LocalizedStrings({
        en: {
            allergiesHeader: "Food allergies",
            allergiesMessageHeader: "Manage ingredients you are allergic to. You will not receive recipe suggestions that include them.",
            allergiesMessage: "What are you allergic to?",
            addIngredientButton: "Add ingredient",
            clearButton: "Clear",
            saveButton: "Save",
            ingredientPlaceholder: "e.g: peppers,...",
            alertSuccess: "Food allergies updated.",
        },
        vi: {
            allergiesHeader: "Thực phẩm dị ứng",
            allergiesMessageHeader: "Quản lý thực phẩm mà bạn dị ứng. Hệ thống sẽ không đề xuất những công thức có những thứ này.",
            allergiesMessage: "Bạn bị dị ứng với cái gì?",
            addIngredientButton: "Thêm thực phẩm",
            clearButton: "Xóa",
            saveButton: "Lưu",
            ingredientPlaceholder: "ví dụ: tiêu,...",
            alertSuccess: "Đã cập nhật thực phẩm dị ứng.",
        }
    });

    const [ingredients, setIngredients] = useState([]);
    const fetchData = async () => {
        const api = `${apiUrl}/user/getallergies/${user.id}`;
        const response = await fetch(api);
        const result = await response.json();
        setIngredients(result.listIngredient);
    }
    const handleAddField = (e) => {
        e.preventDefault();
        const ingredient = {
            ingredient_name: "",
        }
        setIngredients((prev) => [...prev, ingredient]);
    }
    const handleRemoveField = (e, index) => {
        e.preventDefault();
        setIngredients((prev) => prev.filter((item) => item !== prev[index]));
    }
    const handleClear = (e) => {
        e.preventDefault();
        setIngredients([]);
    }
    const handleChange = (e, index) => {
        e.preventDefault();
        e.persist();
        setIngredients((prev) => {
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
    // Generates request headers
    let headers = new Headers();
    headers.append("Authorization", `Bearer ${token.token}`);
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    const updateAllergies = async (e) => {
        e.preventDefault();
        // Generates request body
        let body = JSON.stringify({
            "listIngredient": ingredients,
        });
        // Generates request
        let request = {
            method: 'PUT',
            headers: headers,
            body: body,
        };
        // Executes fetch
        const api = `${apiUrl}/user/allergies/${user.id}`;
        const response = await fetch(api, request);
        if (response.ok) {
            alert(strings.alertSuccess);
            await fetchData();
        } else if (response.status === 401) {
            alert("You are not authorized to complete the request.")
        } else {
            alert("Error: " + response.status);
        }
    }
    useEffect(fetchData, [location]);

    return (
        <section>
            <header className="section-header">
                <h1>{strings.allergiesHeader}</h1>
                <p>{strings.allergiesMessageHeader}</p>
            </header>
            <div className="section-content">
                <Form onSubmit={updateAllergies}>
                    <div style={{minHeight: "400px"}}>
                        {ingredients.length > 0 ?
                            // Dynamic form container
                            <div className="form-dynamic">
                                {/*Ingredient table*/}
                                <InputArray>
                                    {ingredients.map((item, index) => (
                                        // Individual ingredient
                                        <InputGroup key={index}>
                                            {/*Ingredient name & input field*/}
                                            <input name="ingredient_name" type="text"
                                                   value={item.ingredient_name}
                                                   onChange={(e) => handleChange(e, index)}
                                                   placeholder={strings.ingredientPlaceholder} required/>
                                            {/*Remove button*/}
                                            <button className="button-remove"
                                                    onClick={(e) => handleRemoveField(e, index)}>
                                                <ImCross/>
                                            </button>
                                        </InputGroup>
                                    ))}
                                </InputArray>
                            </div>
                            : <em>{strings.allergiesMessage}</em>}
                    </div>
                    {/*Control buttons*/}
                    <div className="sticky-bottom">
                        <div className="input-group">
                            <button className="button-light" onClick={handleAddField}>{strings.addIngredientButton}</button>
                            <button className="button-light" onClick={handleClear}>{strings.clearButton}</button>
                            {ingredients.length > 0 ?
                                <button type="submit" className="button-dark">{strings.saveButton}</button>
                                : <button disabled>{strings.saveButton}</button>}
                        </div>
                    </div>
                </Form>
            </div>
        </section>
    )
}

export default UpdateAllergies;