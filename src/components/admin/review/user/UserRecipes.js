import React, {useEffect, useState} from "react";
import ArticleCard from "../../../commons/elements/containers/ArticleCard";
import {SectionLoader} from "../../../commons/elements/loaders/Loader";
import {apiBase} from "../../../../helpers/Helpers";
import Panel from "../../../commons/elements/containers/Panel";

const UserRecipes = ({userId}) => {
    const [data, setData] = useState([]);
    const token = JSON.parse(localStorage.getItem("accessToken"));

    let headers = new Headers();
    if (token) {
        headers.append("Authorization", `Bearer ${token.token}`);
    }
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    const fetchData = async () => {
        // Generate request
        let request = {
            method: 'GET',
            headers: headers,
        };
        const api = `${apiBase}/recipes/admin/getallbyuser/${userId}?page=1&limit=100`;
        const response = await fetch(api, request);
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
        <section>
            <div className="section-content">
                {data &&
                <Panel filler="card-narrow">
                    {/*Iterates over the result JSON and renders a matching amount of card items*/}
                    {data.length > 0 ?
                        data.map(item => (
                            <ArticleCard className="card-narrow"
                                         key={item.recipe_id}
                                         id={item.recipe_id}
                                         type="recipe"
                                         title={item.recipe_title}
                                         thumbnail={item.recipe_thumbnail}
                                         userId={item.user_id}
                                         firstName={item.first_name}
                                         lastName={item.last_name}
                                         totalLikes={item.totalLike}/>
                        ))
                        :
                        <SectionLoader/>
                    }
                </Panel>}
            </div>
        </section>
    )
}

export default UserRecipes;