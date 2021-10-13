import React from "react";

const VideoPlayer = ({data}) => {
    return (
        <section className="article-content">
            <iframe src={data.video_link} width="100%" height="300"/>
        </section>
    )
}

export default VideoPlayer;