import React, {useContext} from "react";
import {genericStrings} from "../../../../resources/CommonDisplayStrings";
import {LocaleContext} from "../../../../context/LocaleContext";
import moment from "moment";
import {Link} from "react-router-dom";
import Avatar from "../../../commons/elements/Avatar";
import {FaAngleRight} from "react-icons/fa";

const VideoDetails = ({data}) => {
    // Localizations
    genericStrings.setLanguage(useContext(LocaleContext));

    return (
        <section className="article-title">
            <h1>{data.video_title}</h1>
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
                        ({genericStrings.lastEdited} {moment(data.time_updated).format("lll")})
                    </span>}
                </div>
            </div>
            <p className="article-description">{data.video_description}</p>
        </section>
    )
}

export default VideoDetails;