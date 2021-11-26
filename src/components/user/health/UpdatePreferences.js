import React, {useEffect, useState} from "react";
import {apiUrl} from "../../../helpers/Variables";
import Form from "../../commons/elements/form/Form";
import InputArray from "../../commons/elements/form/InputArray";
import InputGroup from "../../commons/elements/form/InputGroup";
import {ImCross} from "react-icons/all";
import LocalizedStrings from "react-localization";

const UpdatePreferences = ({user, token, location}) => {
    // Localizations
    let strings = new LocalizedStrings({
        en: {
            preferencesHeader: "Food preferences",
            preferencesMessageHeader: "Share with us the ingredients you love so that we can suggest better recipes to your tastes!",
            preferencesMessage: "What's your favorite? Tofu? Cherry tomatoes? Share with us!",
            addIngredientButton: "Add ingredient",
            clearButton: "Clear",
            saveButton: "Save",
            ingredientPlaceholder: "e.g: tomato,...",
            menuSaved: "Food preferences updated.",
        },
        vi: {
            preferencesHeader: "Thực phẩm yêu thích",
            preferencesMessageHeader: "Hãy chia sẻ với chúng tôi các thực phẩm mà bạn thích để chúng tôi có thể đề xuất các công thức cho bạn tốt hơn!",
            preferencesMessage: "Thực phẩm yêu thích của bạn là gì? Đậu hủ? Cà chua bi? Hãy chia sẻ với chúng tôi!",
            addIngredientButton: "Thêm thực phẩm",
            clearButton: "Xóa",
            saveButton: "Lưu",
            ingredientPlaceholder: "ví dụ: cà chua,...",
            menuSaved: "Đã cập nhật thực phẩm yêu thích.",
        }
    });

    const [ingredients, setIngredients] = useState([]);
    const fetchData = async () => {
        const api = `${apiUrl}/user/getpreferences/${user.id}`;
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
    const updatePreferences = async (e) => {
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
        const api = `${apiUrl}/user/preferences/${user.id}`;
        const response = await fetch(api, request);
        if (response.ok) {
            alert(strings.menuSaved);
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
                <h1>{strings.preferencesHeader}</h1>
                <p>{strings.preferencesMessageHeader}</p>
            </header>
            <div className="section-content">
                <Form onSubmit={updatePreferences}>
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
                            : <em>{strings.preferencesMessage}</em>}
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

export default UpdatePreferences;