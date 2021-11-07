import React, {useEffect} from "react";
import {apiBase} from "../../../helpers/Helpers";
import Panel from "../../commons/elements/containers/Panel";
import ArticleCard from "../../commons/elements/containers/ArticleCard";
import {PanelLoader} from "../../commons/elements/loaders/Loader";
import {PanelEmp} from "../../commons/elements/loaders/AlertEmpty";
import {PanelErr} from "../../commons/elements/loaders/AlertError";

const BrowseRecipes = ({user, location, data, isLoading, isError, fetchData}) => {
    const api = `${apiBase}/recipes/getall?page=1&limit=300${user ? `&userID=${user.id}` : ``}`;
    // Executes fetch once on page load
    useEffect(() => {
        fetchData(api);
    }, [location, user]);

    return (
        <section>
            <div className="section-content">
                <h1>Recipes</h1>
                <p>Vegetarian doesn't have to mean salads. Explore new and absolutely delicious recipes from
                    our community.</p>
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
                        </> : <PanelErr reload={fetchData} api={api}/>}
                    </> : <PanelLoader/>}
                </Panel>
            </div>
        </section>
    )
}

export default BrowseRecipes;