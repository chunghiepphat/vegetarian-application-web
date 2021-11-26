import React, {useContext, useEffect} from "react";
import {browseDisplayStrings} from "../../../resources/PublicDisplayStrings";
import {LocaleContext} from "../../../context/LocaleContext";
import {apiUrl} from "../../../helpers/Variables";
import Panel from "../../commons/elements/containers/Panel";
import ArticleCard from "../../commons/elements/containers/ArticleCard";
import {PanelLoader} from "../../commons/elements/loaders/Loader";
import {PanelEmp} from "../../commons/elements/loaders/AlertEmpty";
import {PanelErr} from "../../commons/elements/loaders/AlertError";

const BrowseRecipes = ({user, data, isLoading, isError, fetchData}) => {
    // Localizations
    browseDisplayStrings.setLanguage(useContext(LocaleContext));

    // Executes fetch on page load
    const api = `${apiUrl}/recipes/getall?page=1&limit=300${user ? `&userID=${user.id}` : ``}`;
    useEffect(() => {
        fetchData(api);
    }, [user]);

    return (
        <section>
            <div className="section-content">
                <h1>{browseDisplayStrings.browseRecipesHeader}</h1>
                <p>{browseDisplayStrings.browseRecipesSubheader}</p>
                <Panel filler="card-narrow">
                    {!isLoading ? <>
                        {!isError ? <>
                            {data && data.length > 0 ? <>
                                {data.map(item => (
                                    <ArticleCard className="card-narrow"
                                                 key={item.recipe_id}
                                                 id={item.recipe_id}
                                                 type="recipe"
                                                 title={item.recipe_title}
                                                 thumbnail={item.recipe_thumbnail}
                                                 userId={item.user_id}
                                                 firstName={item.first_name}
                                                 lastName={item.last_name}
                                                 time={item.time_created}
                                                 isFavorite={item.is_like}
                                                 totalLikes={item.totalLike}/>))}
                            </> : <PanelEmp/>}
                        </> : <PanelErr reload={() => fetchData(api)}/>}
                    </> : <PanelLoader/>}
                </Panel>
            </div>
        </section>
    )
}

export default BrowseRecipes;