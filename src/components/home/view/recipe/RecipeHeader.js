import React from "react";
import LocalizedStrings from "react-localization";
import {Link} from "react-router-dom";
import moment from "moment";
import Avatar from "../../../commons/elements/Avatar";
import {FaAngleRight} from "react-icons/fa";


const RecipeHeader = ({data}) => {
    // Localizations
    let strings = new LocalizedStrings({
        en: {
            lastEdited: "last edited",
        },
        vi: {
            lastEdited: "chỉnh sửa lần cuối",
        }
    });

    return (
        <section className="article-title">
            <h1>{data.recipe_title}</h1>
            <div className="article-info">
                <div className="article-author">
                    <Avatar className="author-avatar" data={data}/>
                    <div className="author-name">
                        {data.first_name} {data.last_name} <FaAngleRight/>
                    </div>
                    <Link to={`/view/user/${data.user_id}`}/>
                </div>
                <div className="article-timestamp">
                    <span className="timestamp-created">
                        {moment(data.time_created).format("lll")}
                    </span>
                    {data.time_updated &&
                    <span className="timestamp-updated">
                        ({strings.lastEdited} {moment(data.time_updated).format("lll")})
                    </span>}
                </div>
            </div>
        </section>
    )
}

export default RecipeHeader