import React from "react";
import Avatar from "../../../commons/elements/Avatar";
import moment from "moment";

const VideoHeader = ({data}) => {
    return (
        <section className="article-title">
            <h1>{data.video_title}</h1>
            <div className="article-info">
                <div className="article-author">
                    <Avatar className="author-avatar" data={data}/>
                    <div className="author-name">
                        {data.first_name} {data.last_name}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default VideoHeader;