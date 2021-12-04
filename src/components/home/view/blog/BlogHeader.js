import React, {useContext} from "react";
import {genericStrings} from "../../../../resources/CommonDisplayStrings";
import {LocaleContext} from "../../../../context/LocaleContext";
import {UserContext} from "../../../../context/UserContext";
import moment from "moment";
import {Link} from "react-router-dom";
import Avatar from "../../../commons/elements/Avatar";
import {FaAngleRight} from "react-icons/fa";

const BlogHeader = ({data}) => {
    const user = useContext(UserContext);

    // Localizations
    genericStrings.setLanguage(useContext(LocaleContext));

    return (
        <section className="article-title">
            <h1>{data.blog_title}</h1>
            <p className="article-subtitle">{data.blog_subtitle}</p>
            <div className="article-info">
                <div className="article-author">
                    <Avatar className="author-avatar" data={data}/>
                    <div className="author-name">
                        {data.first_name} {data.last_name} <FaAngleRight/>
                    </div>
                    <Link className="card__url" to={user && user.role === "admin" ?
                        `/console/review/user/${data.user_id}` : `/view/user/${data.user_id}`}/>
                </div>
                <div className="article-timestamp">
                    <span className="timestamp-created">
                        {moment(data.time_created).format("lll")}
                    </span>
                    {data.time_updated &&
                    <span className="timestamp-updated">
                        ({genericStrings.lastEdited} {moment(data.time_updated).format("lll")})
                    </span>}
                </div>
            </div>
        </section>
    )
}

export default BlogHeader;