import React, {useContext, useEffect, useState} from "react";
import {viewDisplayStrings} from "../../../resources/PublicDisplayStrings";
import {LocaleContext} from "../../../context/LocaleContext";
import {apiUrl} from "../../../helpers/Variables";
import {Redirect, Route, Switch, useLocation, useParams} from "react-router-dom";
import ArticleToolbar from "./ArticleToolbar";
import ArticleComments from "./ArticleComments";
import RecipeHeader from "./recipe/RecipeHeader";
import RecipeIngredients from "./recipe/RecipeIngredients";
import RecipeEstimations from "./recipe/RecipeEstimations";
import RecipeNutrients from "./recipe/RecipeNutrients";
import RecipeSteps from "./recipe/RecipeSteps";
import EditRecipe from "../../user/edit/EditRecipe";
import {SectionEmp} from "../../commons/elements/loaders/AlertEmpty";
import {SectionErr} from "../../commons/elements/loaders/AlertError";

const ViewRecipe = ({user, fetchData}) => {
    let {id} = useParams();
    const location = useLocation();

    // Localizations
    viewDisplayStrings.setLanguage(useContext(LocaleContext));

    // Fetches article content on page load
    const [data, setData] = useState();
    const [locale, setLocale] = useState("");
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    let api = `${apiUrl}/recipes/getrecipeby/${id}?translate=${locale}${user ? `&userID=${user.id}` : ``}`;
    useEffect(() => {
        fetchData(api, setData, setIsError, setIsLoading);
    }, [id, api, location]);

    return (
        <section>
            <Switch>
                {/*Edit mode*/}
                {user && data && user.id === data.user_id &&
                <Route exact path={`/view/recipe/:id/edit`}>
                    <EditRecipe id={id} data={data}/>
                </Route>}
                {/*View mode*/}
                <Route exact path={`/view/recipe/:id/`}>
                    {!isError ? <>
                        {data ? <>
                            <div className="section-content">
                                <article>
                                    {data.recipe_thumbnail &&
                                    <picture className="article-thumbnail">
                                        <source srcSet={data.recipe_thumbnail}/>
                                        <img src="" alt=""/>
                                    </picture>}
                                    <RecipeHeader data={data}/>
                                    <ArticleToolbar type={"recipe"} id={id} data={data}
                                                    isLoading={isLoading} setLocale={setLocale}
                                                    reload={() => fetchData(api, setData, setIsError, setIsLoading)}/>
                                    <RecipeIngredients data={data}/>
                                    <RecipeEstimations data={data}/>
                                    <RecipeNutrients portion={data.portion_size} nutrients={data.nutrition}/>
                                    <RecipeSteps steps={data.steps}/>
                                    <ArticleComments type={"recipe"} data={data}/>
                                </article>
                            </div>
                        </> : <SectionEmp message={viewDisplayStrings.viewBlogLoading}/>}
                    </> : <SectionErr reload={() => fetchData(api, setData, setIsError, setIsLoading)}/>}
                </Route>
                <Redirect to="/not-found"/>
            </Switch>
        </section>
    )
}

export default ViewRecipe;