import React, {useEffect, useState} from "react";
import {apiBase} from "../../../../helpers/Helpers";
import Panel from "../../../commons/elements/containers/Panel";
import Card from "../../../commons/elements/containers/Card";
import {SectionLoader} from "../../../commons/elements/loaders/Loader";

const RecipeList = () => {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        const api = `${apiBase}/recipes/getall?page=1&limit=300`;
        const response = await fetch(api);
        const result = await response.json();
        setData(result.listResult);
    }

    // Executes fetch once on page load
    useEffect(() => {
        fetchData().catch(error => {
            console.error(error);
        });
    }, []);

    return (
        <>
            {data &&
            <Panel filler="card-medium">
                {/*Iterates over the result JSON and renders a matching amount of card items*/}
                {data.length > 0 ?
                    data.map(recipe => (
                        <Card adminConsole={true}
                              className="card-medium"
                              key={recipe.recipe_id}
                              id={recipe.recipe_id}
                              type="recipe"
                              title={recipe.recipe_title}
                              thumbnail={recipe.recipe_thumbnail}
                              firstName={recipe.first_name}
                              lastName={recipe.last_name}
                              time={recipe.time_created}
                              totalLikes={recipe.totalLike}
                              status={1}/>
                    ))
                    :
                    <SectionLoader/>
                }
            </Panel>}
        </>
    )

}

export default RecipeList;