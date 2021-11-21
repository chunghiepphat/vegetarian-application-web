import React, {useState} from "react";
import EditIngredients from "./recipe/EditIngredients";
import {apiUrl} from "../../../helpers/Variables";
import {Link, useHistory} from "react-router-dom";
import EditEstimations from "./recipe/EditEstimations";
import RecipeHeader from "../../home/view/recipe/RecipeHeader";
import EditSteps from "./recipe/EditSteps";
import Form from "../../commons/elements/form/Form";
import {FaAngleLeft} from "react-icons/fa";
import InputGroup from "../../commons/elements/form/InputGroup";

const EditRecipe = ({id, data}) => {
    const token = JSON.parse(localStorage.getItem("accessToken"));
    const history = useHistory();
    const [difficulty, setDifficulty] = useState(data.recipe_difficulty);
    const [portionSize, setPortionSize] = useState(data.portion_size);
    const [portionType, setPortionType] = useState(data.portion_type);
    const [prepTime, setPrepTime] = useState(data.prep_time_minutes);
    const [bakingTime, setBakingTime] = useState(data.baking_time_minutes);
    const [restingTime, setRestingTime] = useState(data.resting_time_minutes);
    const [ingredients, setIngredients] = useState([].concat(data.ingredients));
    const [steps, setSteps] = useState([].concat(data.steps));

    const updatePost = async (e) => {
        e.preventDefault();
        // Generates request headers
        let headers = new Headers();
        if (token) {
            headers.append("Authorization", `Bearer ${token.token}`);
        }
        headers.append("Content-Type", "application/json");
        headers.append("Accept", "application/json");
        // Generates request body
        let body = JSON.stringify({
            "recipe_categories_id": data.recipe_categories_id,
            "recipe_thumbnail": data.recipe_thumbnail,
            "recipe_difficulty": difficulty,
            "portion_size": portionSize,
            "portion_type": portionType,
            "prep_time_minutes": prepTime,
            "baking_time_minutes": bakingTime,
            "resting_time_minutes": restingTime,
            "ingredients": ingredients,
            "steps": steps,
            "status": 1,
        });
        // Generates request
        let request = {
            method: 'PUT',
            headers: headers,
            body: body,
        };
        // Executes fetch
        const api = `${apiUrl}/recipes/edit/${id}`;
        const response = await fetch(api, request);
        if (response.ok) {
            alert("Recipe updated successfully!");
            history.push(`/view/recipe/${id}`);
        } else if (response.status === 401) {
            alert("You are not authorized to do that.")
        } else {
            alert("Unexpected error with code: " + response.status);
        }
    }

    const cancelUpdate = () => {
        history.push(`/view/recipe/${id}`);
    }

    return (
        <div className="section-content">
            {/*Recipe article container*/}
            <article>
                {data.recipe_thumbnail &&
                <picture className="article-thumbnail">
                    <source srcSet={data.recipe_thumbnail}/>
                    <img src="" alt=""/>
                </picture>}
                {/*Recipe title*/}
                <Link to={`/view/recipe/${id}`}><FaAngleLeft/>Go back</Link>
                <RecipeHeader data={data}/>
                <Form id="updateForm" onSubmit={updatePost} style={{minHeight: "720px"}}>
                    <EditEstimations data={data}
                                     difficulty={difficulty} setDifficulty={setDifficulty}
                                     portionSize={portionSize} setPortionSize={setPortionSize}
                                     portionType={portionType} setPortionType={setPortionType}
                                     prepTime={prepTime} setPrepTime={setPrepTime}
                                     bakingTime={bakingTime} setBakingTime={setBakingTime}
                                     restingTime={restingTime} setRestingTime={setRestingTime}/>
                    <EditIngredients data={data}
                                     ingredients={ingredients} setIngredients={setIngredients}/>
                    <EditSteps data={data}
                               steps={steps} setSteps={setSteps}/>
                </Form>
            </article>
            <div className="sticky-bottom">
                <InputGroup>
                    <button className="button-light" onClick={cancelUpdate}>Cancel</button>
                    <button type="submit" form="updateForm" className="button-dark">Finish</button>
                </InputGroup>
            </div>
        </div>
    )
}
export default EditRecipe;