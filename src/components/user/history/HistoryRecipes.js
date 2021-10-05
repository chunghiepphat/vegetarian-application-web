import React, {useContext, useEffect, useState} from "react";
import {apiPattern} from "../../../helpers/Helpers";
import Card from "../../commons/elements/containers/Card";
import {SectionLoader} from "../../commons/elements/loaders/Loader";
import {UserContext} from "../../../context/UserContext";

const HistoryRecipes = () => {
    const user = useContext(UserContext);
    const api = `${apiPattern}/recipes/getallbyuserID/${user.id}?page=1&limit=100`;
    const [data, setData] = useState([]);

    // Executes fetch once on page load
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(api);
            const result = await response.json();
            setData(result.listResult);
        }
        fetchData().catch(error => {
            console.error(error);
        });
    }, [api]);

    return (
        <section>
            <div className="section-content">
                <h1>Recipes</h1>
                <i>Your recipes are shown here.</i>
                <div className="panel">
                    {/*Iterates over the result JSON and renders a matching amount of card items*/}
                    {data.length > 0 ?
                        data.map(recipe => (
                            <Card className="card-full"
                                  key={recipe.recipe_id}
                                  id={recipe.recipe_id}
                                  type="recipe"
                                  title={recipe.recipe_title}
                                  thumbnail={recipe.recipe_thumbnail}
                                  firstName={recipe.first_name}
                                  lastName={recipe.last_name}/>
                        ))
                        :
                        <SectionLoader/>
                    }
                </div>
            </div>
        </section>
    )
}

export default HistoryRecipes;