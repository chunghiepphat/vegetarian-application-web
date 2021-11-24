import React from "react";
import LocalizedStrings from "react-localization";
import Panel from "../../commons/elements/containers/Panel";
import ArticleCard from "../../commons/elements/containers/ArticleCard";
import {PanelEmp} from "../../commons/elements/loaders/AlertEmpty";

const ConsoleResultRecipes = ({data}) => {
    // Localizations
    let strings = new LocalizedStrings({
        en: {
            messageEmpty: "There were no recipes matching your criteria.",
        },
        vi: {
            messageEmpty: "Không có công thức nào khớp với tìm kiếm của bạn.",
        }
    });

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
                                         totalLikes={item.totalLike}
                                         status={item.status}/>))}
                    </> : <PanelEmp message={strings.messageEmpty}/>}
                </Panel>
            </div>
        </section>
    )
}

export default ConsoleResultRecipes;