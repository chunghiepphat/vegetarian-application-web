import React, {useContext, useEffect, useState} from "react";
import {requestErrorStrings} from "../../../resources/CommonDisplayStrings";
import {postDisplayStrings} from "../../../resources/UserDisplayStrings";
import {LocaleContext} from "../../../context/LocaleContext";
import {apiUrl} from "../../../helpers/Variables";
import {cloudName, uploadPreset} from "../../../helpers/Cloudinary";
import {Redirect, Route, Switch} from "react-router-dom";
import RecipeStep01 from "./recipe/RecipeStep01";
import RecipeStep02 from "./recipe/RecipeStep02";
import RecipeStep03 from "./recipe/RecipeStep03";
import RecipeStep04 from "./recipe/RecipeStep04";
import FinishPost from "./FinishPost";

const PostRecipe = ({user, token, history}) => {
    // Localizations
    let locale = useContext(LocaleContext);
    requestErrorStrings.setLanguage(locale);
    postDisplayStrings.setLanguage(locale);

    const [articleId, setArticleId] = useState();
    // Step 1 input data
    const [title, setTitle] = useState();
    const [category, setCategory] = useState(1);
    const [difficulty, setDifficulty] = useState(1);
    const [portionSize, setPortionSize] = useState(1);
    const [portionType, setPortionType] = useState(1);
    const [prepTime, setPrepTime] = useState(0);
    const [bakingTime, setBakingTime] = useState(0);
    const [restingTime, setRestingTime] = useState(0);

    // Step 2 input data
    const [thumbnailUrl, setThumbnailUrl] = useState("");
    const [thumbnailFile, setThumbnailFile] = useState("");

    // Step 3 input data
    const [ingredients, setIngredients] = useState([]);

    // Step 4 input data
    const [steps, setSteps] = useState([]);
    const [isPrivate, setIsPrivate] = useState(false);

    // Fetch category list from server
    const [categoryList, setCategoryList] = useState([]);
    const fetchCategories = async () => {
        const api = `${apiUrl}/recipes/categories?translate=${locale}`;
        try {
            const response = await fetch(api);
            if (response.ok) {
                const result = await response.json();
                await setCategoryList(result.listResult);
            }
        } catch (error) {
        }
    }
    useEffect(fetchCategories, [user, locale]);

    // Handles form submission, image upload and getting image URL
    const [isLoading, setIsLoading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState("");
    const submitPost = async (e) => {
        e.preventDefault();
        setIsPrivate(e.nativeEvent.submitter.name);
        setIsLoading(true);
        setUploadProgress(postDisplayStrings.postArticleProcessingImages)
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
        try {
            const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, request)
            // Handles recipe submission upon successful upload
            if (response.ok) {
                // Gets uploaded image URL
                const result = await response.json();
                setThumbnailUrl(result.secure_url);
            } else if (response.status >= 400 && response.status < 600) {
                alert(requestErrorStrings.hostingServiceErrorStatus + response.status);
                setIsLoading(false);
                setUploadProgress(null);
            }
        } catch (error) {
            alert(requestErrorStrings.requestErrorException + error);
            setIsLoading(false);
            setUploadProgress(null);
        }
    }

    // Handles fetch for post submission upon image upload completion
    const uploadPost = async () => {
        setIsLoading(true);
        setUploadProgress(postDisplayStrings.postArticleUploading);
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
                const result = await response.json();
                setArticleId(result.id);
                alert(postDisplayStrings.postArticleUploadSuccess);
                history.push("/post/recipe/finish");
            } else if (response.status === 401) {
                alert(requestErrorStrings.requestErrorUnauthorized);
                setIsLoading(false);
                setUploadProgress(null);
            } else {
                alert(requestErrorStrings.requestErrorStatus + response.status);
                setIsLoading(false);
                setUploadProgress(null);
            }
        } catch (error) {
            alert(requestErrorStrings.requestErrorException + error);
            setIsLoading(false);
            setUploadProgress(null);
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
            <Route path="/post/recipe/finish">
                <FinishPost articleId={articleId} type="recipe"/> </Route>
            <Route><Redirect to="/not-found"/></Route>
        </Switch>
    )
}

export default PostRecipe;