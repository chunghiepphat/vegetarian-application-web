import React, {useContext, useEffect, useState} from "react";
import {UserContext} from "../../../context/UserContext";
import {apiBase} from "../../../helpers/Helpers";
import Card from "../../commons/elements/containers/Card";

const HistoryFavorites = () => {
    const user = useContext(UserContext);
    const token = JSON.parse(localStorage.getItem("accessToken"));
    const api = `${apiBase}/user/${user.id}/liked`;
    const [recipes, setRecipes] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [favorites, setFavorites] = useState([]);

    // Generates request headers
    let headers = new Headers();
    headers.append("Authorization", `Bearer ${token.token}`);
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    // Executes fetch once on page load
    useEffect(() => {
        const fetchData = async () => {
            // Generates request
            let request = {
                method: 'GET',
                headers: headers,
            };
            const response = await fetch(api, request);
            const result = await response.json();
            await setFavorites(result);
        }
        fetchData();

    }, []);
    console.log(favorites);
    console.log(recipes);
    console.log(blogs)
    return (
        <section>
            <div className="section-content">
                <h1>Recipes</h1>
                <i>Your recipes are shown here.</i>
                <div className="panel">
                    {/*Iterates over the result JSON and renders a matching amount of card items*/}
                    {recipes &&
                        recipes.map(item => (
                            <Card className="card-full"
                                  key={item.recipe_id}
                                  id={item.recipe_id}
                                  type="recipe"
                                  title={item.recipe_title}
                                  thumbnail={item.recipe_thumbnail}
                                  firstName={item.first_name}
                                  lastName={item.last_name}/>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}

export default HistoryFavorites;