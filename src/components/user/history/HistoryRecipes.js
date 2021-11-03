import React, {useContext, useEffect, useState} from "react";
import {apiBase} from "../../../helpers/Helpers";
import ArticleCard from "../../commons/elements/containers/ArticleCard";
import {SectionLoader} from "../../commons/elements/loaders/Loader";
import {UserContext} from "../../../context/UserContext";

const HistoryRecipes = () => {
    const user = useContext(UserContext);
    const token = JSON.parse(localStorage.getItem("accessToken"));
    const [data, setData] = useState([]);


    // Generates request headers
    let headers = new Headers();
    if (token) {
        headers.append("Authorization", `Bearer ${token.token}`);
    }
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");


    const fetchData = async () => {
        // Generates request
        let request = {
            method: 'GET',
            headers: headers,
        };

        const api = `${apiBase}/recipes/getallbyuserID/${user.id}?page=1&limit=100`;
        const response = await fetch(api, request);
        const result = await response.json();
        setData(result.listResult);
    }

    // Executes fetch once on page load
    useEffect(() => {
        fetchData().catch(error => {
            console.error(error);
        });
    }, [user]);

    return (
        <section>
            <div className="section-content">
                <h1>Recipes</h1>
                <i>Your recipes are shown here.</i>
                {data &&
                <div className="panel">
                    {/*Iterates over the result JSON and renders a matching amount of card items*/}
                    {data.length > 0 ?
                        data.map(item => (
                            <ArticleCard className="card-full"
                                         key={item.recipe_id}
                                         id={item.recipe_id}
                                         type="recipe"
                                         title={item.recipe_title}
                                         thumbnail={item.recipe_thumbnail}
                                         userId={item.user_id}
                                         firstName={item.first_name}
                                         lastName={item.last_name}
                                         totalLikes={item.totalLike}
                                         status={item.status}/>
                        ))
                        :
                        <SectionLoader/>
                    }
                </div>}
            </div>
        </section>
    )
}

export default HistoryRecipes;