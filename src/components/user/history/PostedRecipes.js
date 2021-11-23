import React, {useEffect} from "react";
import {apiUrl} from "../../../helpers/Variables";
import Panel from "../../commons/elements/containers/Panel";
import ArticleCard from "../../commons/elements/containers/ArticleCard";
import {PanelLoader} from "../../commons/elements/loaders/Loader";
import {PanelEmp} from "../../commons/elements/loaders/AlertEmpty";
import {PanelErr} from "../../commons/elements/loaders/AlertError";
import LocalizedStrings from "react-localization";

const PostedRecipes = ({user, location, data, isLoading, isError, fetchData}) => {
    // Localizations
    let strings = new LocalizedStrings({
        en: {
            recipeHeader: "Recipes",
            recipeMessageHeader: "Your published recipes are shown here.",
            recipeMessageEmpty: "It seems you haven't posted anything yet.",
        },
        vi: {
            recipeHeader: "Công thức",
            recipeMessageHeader: "Công thức mà bạn đã đăng.",
            recipeMessageEmpty: "Có vẻ như bạn chưa đăng công thức nào.",
        }
    });

    const api = `${apiUrl}/recipes/getallbyuserID/${user.id}?page=1&limit=100`;
    // Executes fetch once on page load
    useEffect(() => {
        fetchData(api);
    }, [location]);

    return (
        <section>
            <div className="section-content">
                <h1>{strings.recipeHeader}</h1>
                <p>{strings.recipeMessageHeader}</p>
                <Panel filler="card-full">
                    {!isLoading ? <>
                        {!isError ? <>
                            {data && data.length > 0 ? <>
                                {data.map(item => (
                                    <ArticleCard className="card-full"
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
                                                 totalLikes={item.totalLike}
                                                 status={item.status}/>))}
                            </> : <PanelEmp message={strings.recipeMessageEmpty}/>}
                        </> : <PanelErr reload={fetchData} api={api}/>}
                    </> : <PanelLoader/>}
                </Panel>
            </div>
        </section>
    )
}

export default PostedRecipes;