import React, {useContext, useEffect, useState} from "react";
import Form from "../../commons/elements/form/Form";
import InputGroup from "../../commons/elements/form/InputGroup";
import {ImCross} from "react-icons/all";
import InputArray from "../../commons/elements/form/InputArray";
import {apiBase} from "../../../helpers/Variables";
import {UserContext} from "../../../context/UserContext";

const UpdateAllergies = () => {
    const user = useContext(UserContext);
    const token = JSON.parse(localStorage.getItem("accessToken"));
    const [ingredients, setIngredients] = useState([]);

    const fetchData = async () => {
        const api = `${apiBase}/user/getallergies/${user.id}`;
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
        const api = `${apiBase}/user/allergies/${user.id}`;
        const response = await fetch(api, request);
        if (response.ok) {
            alert("Food allergies updated.");
            await fetchData();
        } else if (response.status === 401) {
            alert("You are not authorized to complete the request.")
        } else {
            alert("Error: " + response.status);
        }
    }

    useEffect(fetchData, []);

    console.log(ingredients)
    return (
        <section>
            <header className="section-header">
                <h1>Food allergies</h1>
                <p>Manage ingredients you are allergic to here. We will not suggest recipes that EXPLICITLY
                    include these
                    ingredients.</p>
            </header>
            <div className="section-content">
                <Form onSubmit={updateAllergies}>
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
                                               placeholder="e.g: peppers,..." required/>
                                        {/*Remove button*/}
                                        <button className="button-remove" onClick={(e) => handleRemoveField(e, index)}>
                                            <ImCross/>
                                        </button>
                                    </InputGroup>
                                ))}
                            </InputArray>
                        </div>
                        : <em>What are you allergic to?</em>}
                    {/*Control buttons*/}
                    <div className="sticky-bottom">
                        <div className="input-group">
                            <button className="button-light" onClick={handleAddField}>Add ingredient</button>
                            <button className="button-light" onClick={handleClear}>Clear</button>
                            {ingredients.length > 0 ?
                                <button type="submit" className="button-dark">Save</button>
                                : <button disabled>Save</button>}
                        </div>
                    </div>
                </Form>
            </div>
        </section>
    )
}

export default UpdateAllergies;