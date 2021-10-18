import React, {useContext} from "react";
import Avatar from "../../../commons/elements/Avatar";
import moment from "moment";

const RecipeHeader = ({data}) => {
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
                <div className="article-timestamp">
                    <span>
                        {moment(data.time_created).format("lll")}
                    </span>
                    {data.time_updated &&
                    <span>
                        (edited {moment(data.time_updated).format("lll")})
                    </span>}
                </div>
            </div>
        </section>
    )
}

export default RecipeHeader