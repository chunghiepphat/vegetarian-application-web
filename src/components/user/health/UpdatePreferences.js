import React, {useContext, useEffect, useState} from "react";
import {healthDisplayStrings} from "../../../resources/UserDisplayStrings";
import {requestErrorStrings} from "../../../resources/CommonDisplayStrings";
import {LocaleContext} from "../../../context/LocaleContext";
import {apiUrl} from "../../../helpers/Variables";
import {useLocation} from "react-router-dom";
import Form from "../../commons/elements/form/Form";
import InputArray from "../../commons/elements/form/InputArray";
import InputGroup from "../../commons/elements/form/InputGroup";
import {ImCross} from "react-icons/all";

const UpdatePreferences = ({user, token}) => {
    // Localizations
    healthDisplayStrings.setLanguage(useContext(LocaleContext));
    requestErrorStrings.setLanguage(useContext(LocaleContext));

    // Fetches food items
    const [ingredients, setIngredients] = useState([]);
    const fetchData = async () => {
        const api = `${apiUrl}/user/getpreferences/${user.id}`;
        const response = await fetch(api);
        const result = await response.json();
        setIngredients(result.listIngredient);
    }

    //Adds , removes & clears input fields
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

    // Handles input changes
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

    // Updates preferences profile
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
        try {
            const response = await fetch(api, request);
            if (response.ok) {
                alert(healthDisplayStrings.healthPreferencesUpdateSuccess);
                await fetchData();
            } else if (response.status === 401) {
                alert(requestErrorStrings.requestErrorUnauthorized);
                // setIsLoading(false);
            } else {
                alert(requestErrorStrings.requestErrorStatus + response.status);
                // setIsLoading(false);
            }
        } catch (error) {
            alert(requestErrorStrings.requestErrorException + error);
            // setIsLoading(false);
        }
    }
    useEffect(fetchData, [user]);

    return (
        <section>
            <header className="section-header">
                <h1>{healthDisplayStrings.healthPreferences}</h1>
                <p>{healthDisplayStrings.healthPreferencesSubheader}</p>
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
                                                   placeholder={healthDisplayStrings.healthFoodItemPlaceholder}
                                                   required/>
                                            {/*Remove button*/}
                                            <button className="button-remove"
                                                    onClick={(e) => handleRemoveField(e, index)}>
                                                <ImCross/>
                                            </button>
                                        </InputGroup>
                                    ))}
                                </InputArray>
                            </div>
                            : <em>{healthDisplayStrings.healthPreferencesEmpty}</em>}
                    </div>
                    {/*Control buttons*/}
                    <div className="sticky-bottom">
                        <div className="input-group">
                            <button className="button-light"
                                    onClick={handleAddField}>{healthDisplayStrings.healthAddFoodItem}</button>
                            <button className="button-light"
                                    onClick={handleClear}>{healthDisplayStrings.healthClearFoodItems}</button>
                            {ingredients.length > 0 ?
                                <button type="submit"
                                        className="button-dark">{healthDisplayStrings.healthSaveFoodItems}</button>
                                : <button disabled>{healthDisplayStrings.healthSaveFoodItems}</button>}
                        </div>
                    </div>
                </Form>
            </div>
        </section>
    )
}

export default UpdatePreferences;