import React, {useState} from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Navbar from "../../commons/elements/Navbar";
import {NavLink, Redirect, Route, Switch, useHistory} from "react-router-dom";
import PostRecipe01 from "./PostRecipe01";
import PostRecipe02 from "./PostRecipe02";
import PostRecipe03 from "./PostRecipe03";

const PostRecipe = () => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    const token = JSON.parse(localStorage.getItem("accessToken"));
    const api = `http://14.161.47.36:8080/hiepphat-0.0.1-SNAPSHOT/api/recipes/add`;
    const history = useHistory();

    // Step 1 parameters
    const [title, setTitle] = useState();
    const [category, setCategory] = useState("1");
    const [thumbnail, setThumbnail] = useState();
    const [difficulty, setDifficulty] = useState("1");
    const [portionSize, setPortionSize] = useState("1");
    const [portionType, setPortionType] = useState("1");
    const [prepTime, setPrepTime] = useState("0");
    const [bakingTime, setBakingTime] = useState("0");
    const [restingTime, setRestingTime] = useState("0");
    // Step 2 parameters
    const [ingredients, setIngredients] = useState([]);
    // Step 3 parameters
    const [content, setContent] = useState("");

    console.log(title, category, thumbnail, difficulty, portionSize, portionType, prepTime, bakingTime, restingTime, ingredients, content)

    const submitPost = async (event) => {
        event.preventDefault();

        // Generates request headers
        let headers = new Headers();
        headers.append("Authorization", `Bearer ${token.token}`);
        headers.append("Content-Type", "application/json");
        headers.append("Accept", "application/json");

        // Generates request body
        let body = JSON.stringify({
            "user_id": user.id,
            "recipe_title": title,
            "recipe_categories_id": category,
            "recipe_thumbnail": thumbnail,
            "recipe_difficulty": difficulty,
            "portion_size": portionSize,
            "portion_type": portionType,
            "prep_time_minutes": prepTime,
            "baking_time_minutes": bakingTime,
            "resting_time_minutes": restingTime,
            "ingredients": ingredients,
            "recipe_content": content
        });

        console.log(body)
        // Generates request
        let request = {
            method: 'POST',
            headers: headers,
            body: body,
        };
        // Executes fetch
        const response = await fetch(api, request);
        if (response.ok) {
            alert("Posted your recipe successfully!.");
        } else if (response.status === 401) {
            alert("You are not authorized to do that.")
        } else {
            alert("Error: " + response.status);
        }
        history.push("/home");
    }
    return (
        <main>
            <section className="navbar-container">
                <Navbar>
                    <NavLink to="/post/recipe">Recipe</NavLink>
                    <NavLink to="/post/video">Video</NavLink>
                    <NavLink to="/post/blog">Blog</NavLink>
                </Navbar>
            </section>
            <Switch>
                <Route exact path="/post/recipe/">
                    <PostRecipe01 title={title} setTitle={setTitle}
                                  category={category} setCategory={setCategory}
                                  thumbnail={thumbnail} setThumbnail={setThumbnail}
                                  difficulty={difficulty} setDifficulty={setDifficulty}
                                  portionSize={portionSize} setPortionSize={setPortionSize}
                                  portionType={portionType} setPortionType={setPortionType}
                                  prepTime={prepTime} setPrepTime={setPrepTime}
                                  bakingTime={bakingTime} setBakingTime={setBakingTime}
                                  restingTime={restingTime} setRestingTime={setRestingTime}/>
                </Route>
                <Route exact path="/post/recipe/ingredients">
                    <PostRecipe02 ingredients={ingredients} setIngredients={setIngredients}/>
                </Route>
                <Route exact path="/post/recipe/instructions">
                    <PostRecipe03 content={content} setContent={setContent}
                                  submitPost={submitPost}/>
                </Route>
                <Route><Redirect to="/not-found"/></Route>
            </Switch>
        </main>
    )
}

export default PostRecipe;