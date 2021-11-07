import React from "react";
import ReactPlayer from "react-player";

const VideoPlayer = ({data}) => {
    return (
        <section className="article-content">
            <ReactPlayer url={data.video_link} controls={true}
                         muted={false} playing={true}
                         width={"100%"} height={"100%"}/>
        </section>
    )
}

export default VideoPlayer;