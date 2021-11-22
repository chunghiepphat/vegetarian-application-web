import React, {useEffect, useState} from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import {cloudName, uploadPreset} from "../../../helpers/Cloudinary";
import {apiUrl} from "../../../helpers/Variables";
import RecipeStep01 from "./recipe/RecipeStep01";
import RecipeStep02 from "./recipe/RecipeStep02";
import RecipeStep03 from "./recipe/RecipeStep03";
import RecipeStep04 from "./recipe/RecipeStep04";

const PostRecipe = ({user, token, history}) => {
    // Step 1 data states
    const [title, setTitle] = useState();
    const [category, setCategory] = useState(1);
    const [difficulty, setDifficulty] = useState(1);
    const [portionSize, setPortionSize] = useState(1);
    const [portionType, setPortionType] = useState(1);
    const [prepTime, setPrepTime] = useState(0);
    const [bakingTime, setBakingTime] = useState(0);
    const [restingTime, setRestingTime] = useState(0);
    // Step 2 data states
    const [thumbnailUrl, setThumbnailUrl] = useState("");
    const [thumbnailFile, setThumbnailFile] = useState("");
    // Step 3 data states
    const [ingredients, setIngredients] = useState([]);
    // Step 4 data states
    const [steps, setSteps] = useState([]);
    const [isPrivate, setIsPrivate] = useState(false);
    // Fetches category list from server
    const [categoryList, setCategoryList] = useState([]);
    const fetchCategories = async () => {
        const api = `${apiUrl}/recipes/categories`
        try {
            const response = await fetch(api);
            if (response.ok) {
                const result = await response.json();
                await setCategoryList(result.listResult);
                console.log(categoryList)
            }
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(fetchCategories, [user]);
    // Handles form submission, image upload and getting image URL
    const [isLoading, setIsLoading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState("");
    const submitPost = async (e) => {
        e.preventDefault();
        setIsPrivate(e.nativeEvent.submitter.name);
        setIsLoading(true);
        setUploadProgress("Processing image(s)...")
        // Generates form data
        const formData = new FormData();
        formData.append("file", thumbnailFile);
        formData.append("upload_preset", uploadPreset);
        // Generates request
        const request = {
            method: 'POST',
            body: formData,
            redirect: 'follow'
        };
        // Handles uploading images
        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, request)
        try {
            // Handles recipe submission upon successful upload
            if (response.ok) {
                // Gets uploaded image URL
                const result = await response.json();
                setThumbnailUrl(result.secure_url);
            } else if (response.status >= 400 && response.status < 600) {
                alert("We couldn't reach our hosting services. Status code: " + response.status);
                setIsLoading(false);
                setUploadProgress();
            }
        } catch (error) {
            alert("There was an unexpected error. " + error);
            setIsLoading(false);
            setUploadProgress();
        }
    }
    // Handles fetch for post submission upon image upload completion
    const uploadPost = async () => {
        setIsLoading(true);
        setUploadProgress("Uploading your recipe...")
        // Generates request headers
        let headers = new Headers();
        if (token) headers.append("Authorization", `Bearer ${token.token}`);
        headers.append("Content-Type", "application/json");
        headers.append("Accept", "application/json");
        // Generates request body
        let body = JSON.stringify({
            "user_id": user.id,
            "recipe_title": title,
            "recipe_categories_id": category,
            "recipe_thumbnail": thumbnailUrl,
            "recipe_difficulty": difficulty,
            "portion_size": portionSize,
            "portion_type": portionType,
            "prep_time_minutes": prepTime,
            "baking_time_minutes": bakingTime,
            "resting_time_minutes": restingTime,
            "ingredients": ingredients,
            "steps": steps,
            "is_private": isPrivate,
        });
        // Generates request
        let request = {
            method: 'POST',
            headers: headers,
            body: body,
        };
        // Executes fetch
        const api = `${apiUrl}/recipes/add`;
        const response = await fetch(api, request);
        try {
            if (response.ok) {
                alert("Recipe posted successfully!");
                history.push("/home");
            } else if (response.status === 401) {
                alert("You are not authorized to do that.")
                setIsLoading(false);
                setUploadProgress();
            } else {
                alert("An unexpected error has occurred. Status code: " + response.status);
                setIsLoading(false);
                setUploadProgress();
            }
        } catch (error) {
            alert("A network error has occurred.");
            setIsLoading(false);
            setUploadProgress();
        }
    }
    // Initiates post upload when image URL is ready
    useEffect(() => {
        if (thumbnailUrl) {
            uploadPost();
        }
    }, [thumbnailUrl]);

    return (
        <Switch>
            <Route exact path="/post/recipe/"><Redirect to="/post/recipe/step-1"/></Route>
            <Route exact path="/post/recipe/step-1">
                <RecipeStep01 history={history} title={title} setTitle={setTitle}
                              categoryList={categoryList}
                              category={category} setCategory={setCategory}
                              difficulty={difficulty} setDifficulty={setDifficulty}
                              portionSize={portionSize} setPortionSize={setPortionSize}
                              portionType={portionType} setPortionType={setPortionType}
                              prepTime={prepTime} setPrepTime={setPrepTime}
                              bakingTime={bakingTime} setBakingTime={setBakingTime}
                              restingTime={restingTime} setRestingTime={setRestingTime}/> </Route>
            <Route exact path="/post/recipe/step-2">
                <RecipeStep02 thumbnailFile={thumbnailFile} setThumbnailFile={setThumbnailFile}/> </Route>
            <Route exact path="/post/recipe/step-3">
                <RecipeStep03 ingredients={ingredients} setIngredients={setIngredients}/> </Route>
            <Route exact path="/post/recipe/step-4">
                <RecipeStep04 steps={steps} setSteps={setSteps}
                              isLoading={isLoading} uploadProgress={uploadProgress}
                              submitPost={submitPost}/> </Route>
            <Route><Redirect to="/not-found"/></Route>
        </Switch>
    )
}

export default PostRecipe;