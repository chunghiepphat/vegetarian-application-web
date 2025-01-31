import React, {useEffect, useState} from "react";
import {apiUrl} from "../../../../helpers/Variables";
import Panel from "../../../commons/elements/containers/Panel";
import ArticleCard from "../../../commons/elements/containers/ArticleCard";
import {PanelLoader} from "../../../commons/elements/loaders/Loader";
import {PanelEmp} from "../../../commons/elements/loaders/AlertEmpty";
import {PanelErr} from "../../../commons/elements/loaders/AlertError";

const ListRecipes = ({user, filter, isLoading, isError, fetchData}) => {
    const api = `${apiUrl}/recipes/admin/getall?page=1&limit=300`;
    const [data, setData] = useState([]);
    // Executes fetch once on page load
    useEffect(() => {
        fetchData(api, data, setData);
    }, [user, filter]);

    return (
        <Panel filler="card--medium">
            {!isLoading ? <>
                {!isError ? <>
                    {data && data.length > 0 ? <>
                        {data.map(item => (
                            <ArticleCard className="card--medium"
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