import React, {useState, useContext, useEffect} from "react";
import ArticleCard from "../../commons/elements/containers/ArticleCard";
import {PanelLoader} from "../../commons/elements/loaders/Loader";
import {apiBase} from "../../../helpers/Helpers";
import Panel from "../../commons/elements/containers/Panel";
import {useLocation} from "react-router-dom";
import {PanelEmp} from "../../commons/elements/loaders/AlertEmpty";
import {PanelErr} from "../../commons/elements/loaders/AlertError";
import {UserContext} from "../../../context/UserContext";

const BrowseRecipes = () => {
    const location = useLocation();
    const user = useContext(UserContext);
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const fetchData = async () => {
        setIsLoading(true);
        const api = `${apiBase}/recipes/getall?page=1&limit=300${userInfo ? `&userID=${userInfo.id}` : ``}`;
        const response = await fetch(api).catch(error => {
            console.error(error);
            setIsError(true);
        });
        if (response.ok) {
            const result = await response.json();
            setData(result.listResult);
            setIsLoading(false);
        } else if (response.status >= 400 && response.status < 600) {
            setIsError(true);
            setIsLoading(false);
        }
    }

    // Executes fetch once on page load
    useEffect(() => {
        fetchData()
    }, [location]);

    return (
        <section>
            <div className="section-content">
                <h1>Recipes</h1>
                <i>Vegetarian doesn't have to mean salads. Explore new and absolutely delicious recipes from
                    our community.</i>
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
                        </> : <PanelErr reload={fetchData}/>}
                    </> : <PanelLoader/>}
                </Panel>
            </div>
        </section>
    )
}

export default BrowseRecipes;