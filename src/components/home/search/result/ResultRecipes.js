import React, {useContext} from "react";
import {searchDisplayStrings} from "../../../../resources/PublicDisplayStrings";
import {LocaleContext} from "../../../../context/LocaleContext";
import Panel from "../../../commons/elements/containers/Panel";
import ArticleCard from "../../../commons/elements/containers/ArticleCard";
import {PanelEmp} from "../../../commons/elements/loaders/AlertEmpty";

const ResultRecipes = ({data}) => {
    // Localizations
    searchDisplayStrings.setLanguage(useContext(LocaleContext));

    return (
        <section>
            <div className="section-content">
                <Panel filler="card-narrow" style={{justifyContent: "space-evenly"}}>
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
                    </> : <PanelEmp message={searchDisplayStrings.searchResultsRecipesEmpty}/>}
                </Panel>
            </div>
        </section>
    )
}

export default ResultRecipes;