import React from "react";
import ReactPlayer from "react-player";

const VideoPlayer = ({data}) => {
    return (
        <section className="article-content">
            <ReactPlayer url={data.video_link} controls={true}
                         width={"100%"} height={"100%"}/>
            {/*<iframe src={data.video_link} width="100%" height="300"/>*/}
        </section>
    )
}

export default VideoPlayer;