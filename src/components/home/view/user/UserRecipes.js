import React, {useEffect, useState} from "react";
import Card from "../../../commons/elements/containers/Card";
import {SectionLoader} from "../../../commons/elements/loaders/Loader";
import {apiBase} from "../../../../helpers/Helpers";
import Panel from "../../../commons/elements/containers/Panel";

const UserRecipes = ({userId}) => {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        const api = `${apiBase}/recipes/getallbyuserIDdifferent/${userId}?page=1&limit=100`;
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
        <section>
            <div className="section-content">
                <h1>Recipes</h1>
                <i>Recipes created by this user are shown here.</i>
                {data &&
                <Panel>
                    {/*Iterates over the result JSON and renders a matching amount of card items*/}
                    {data.length > 0 ?
                        data.map(item => (
                            <Card className="card-narrow"
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