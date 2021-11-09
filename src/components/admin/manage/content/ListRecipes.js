import React, {useContext, useEffect} from "react";
import {apiBase} from "../../../../helpers/Helpers";
import Panel from "../../../commons/elements/containers/Panel";
import ArticleCard from "../../../commons/elements/containers/ArticleCard";
import {PanelLoader} from "../../../commons/elements/loaders/Loader";
import {PanelEmp} from "../../../commons/elements/loaders/AlertEmpty";
import {PanelErr} from "../../../commons/elements/loaders/AlertError";
import {UserContext} from "../../../../context/UserContext";

const ListRecipes = ({location, data, isLoading, isError, fetchData}) => {
    const user = useContext(UserContext);
    const api = `${apiBase}/recipes/admin/getall?page=1&limit=300`;
    // Executes fetch once on page load
    useEffect(() => {
        fetchData(api);
    }, [user, location]);

    return (
        <Panel filler="card-medium">
            {!isLoading ? <>
                {!isError ? <>
                    {data && data.length > 0 ? <>
                        {data.map(item => (
                            <ArticleCard className="card-medium"
                                         key={item.recipe_id}
                                         id={item.recipe_id}
                                         type="recipe"
                                         title={item.recipe_title}
                                         thumbnail={item.recipe_thumbnail}
                                         firstName={item.first_name}
                                         lastName={item.last_name}
                                         userId={item.user_id}
                                         time={item.time_created}
                                         totalLikes={item.totalLike}
                                         status={item.status}/>))}
                    </> : <PanelEmp/>}
                </> : <PanelErr reload={fetchData} api={api}/>}
            </> : <PanelLoader/>}
        </Panel>
    )
}

export default ListRecipes;