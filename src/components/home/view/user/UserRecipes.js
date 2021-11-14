import React, {useEffect} from "react";
import {apiBase} from "../../../../helpers/Variables";
import Panel from "../../../commons/elements/containers/Panel";
import ArticleCard from "../../../commons/elements/containers/ArticleCard";
import {PanelLoader} from "../../../commons/elements/loaders/Loader";
import {PanelEmp} from "../../../commons/elements/loaders/AlertEmpty";
import {PanelErr} from "../../../commons/elements/loaders/AlertError";

const UserRecipes = ({user, location, data, isLoading, isError, fetchData, userId}) => {
    const api = `${apiBase}/recipes/getallbyuserIDdifferent/${userId}?page=1&limit=100${user ? `&userID=${user.id}` : ``}`;
    // Executes fetch once on page load
    useEffect(() => {
        fetchData(api)
    }, [location, user]);

    return (
        <section>
            <div className="section-content">
                <h1>Recipes</h1>
                <p>Recipes created by this user are shown here.</p>
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

export default UserRecipes;