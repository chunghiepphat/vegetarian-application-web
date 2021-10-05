import React, {useContext} from "react";
import Avatar from "../../../commons/elements/Avatar";
import moment from "moment";
import {UserContext} from "../../../../context/UserContext";

const RecipeInfo = ({data}) => {
    return (
        <section className="article-title">
            <h1>{data.recipe_title}</h1>
            <div className="article-info">
                <div className="article-author">
                    <Avatar className="article-avatar" data={data}/>
                    <div className="article-user">
                        {data.first_name} {data.last_name}
                    </div>
                </div>
                <div className="article-time">
                    {moment(data.time_created).format("lll")}
                </div>
            </div>
        </section>
    )
}

export default RecipeInfo