import React, {useContext, useState} from "react";
import EditIngredients from "./recipe/EditIngredients";
import {UserContext} from "../../../context/UserContext";
import {apiBase} from "../../../helpers/Helpers";
import {useHistory} from "react-router-dom";
import EditEstimations from "./recipe/EditEstimations";
import RecipeHeader from "../../home/view/recipe/RecipeHeader";
import EditSteps from "./recipe/EditSteps";

const EditRecipe = ({data}) => {
    const user = useContext(UserContext);
    const token = JSON.parse(localStorage.getItem("accessToken"));
    const api = `${apiBase}/recipes/add`;
    const history = useHistory();

    const [difficulty, setDifficulty] = useState(data.recipe_difficulty);
    const [portionSize, setPortionSize] = useState(data.portion_size);
    const [portionType, setPortionType] = useState(data.portion_type);
    const [prepTime, setPrepTime] = useState(data.prep_time_minutes);
    const [bakingTime, setBakingTime] = useState(data.baking_time_minutes);
    const [restingTime, setRestingTime] = useState(data.resting_time_minutes);

    const [ingredients, setIngredients] = useState([].concat(data.ingredients));
    return (
        <div className="section-content">
            {/*Recipe article container*/}
            <article>
                {/*Recipe title*/}
                <RecipeHeader data={data}/>
                <EditEstimations difficulty={difficulty} setDifficulty={setDifficulty}
                                 portionSize={portionSize} setPortionSize={setPortionSize}
                                 portionType={portionType} setPortionType={setPortionType}
                                 prepTime={prepTime} setPrepTime={setPrepTime}
                                 bakingTime={bakingTime} setBakingTime={setBakingTime}
                                 restingTime={restingTime} setRestingTime={setRestingTime}/>
                <EditIngredients ingredients={ingredients} setIngredients={setIngredients}/>
                <EditSteps/>
            </article>
        </div>
    )
}
export default EditRecipe;