import React, {useEffect} from "react";
import Panel from "../../commons/elements/containers/Panel";
import ArticleCard from "../../commons/elements/containers/ArticleCard";
import {PanelEmp} from "../../commons/elements/loaders/AlertEmpty";
import {PanelErr} from "../../commons/elements/loaders/AlertError";
import {PanelLoader} from "../../commons/elements/loaders/Loader";
import LocalizedStrings from "react-localization";

const DraftRecipes = ({location, data, isLoading, isError, fetchData}) => {
    // Localizations
    let strings = new LocalizedStrings({
        en: {
            recipeDraftHeader: "Recipes",
            recipeDraftMessage: "Your saved drafts & private recipes.",
            recipeNoDraft: "It seems you haven't saved any drafts yet.",
        },
        vi: {
            recipeDraftHeader: "Công thức",
            recipeDraftMessage: "Nháp và công thức ẩn của tôi.",
            recipeNoDraft: "Bạn chưa có công thức nháp nào.",
        }
    });

    useEffect(() => {
        fetchData();
    }, [location]);

    return (
        <section>
            <div className="section-content">
                <h1>{strings.recipeDraftHeader}</h1>
                <p>{strings.recipeDraftMessage}</p>
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
                                                 time={item.time_created}/>))}
                            </> : <PanelEmp message={strings.recipeNoDraft}/>}
                        </> : <PanelErr reload={fetchData}/>}
                    </> : <PanelLoader/>}
                </Panel>
            </div>
        </section>
    )
}

export default DraftRecipes;