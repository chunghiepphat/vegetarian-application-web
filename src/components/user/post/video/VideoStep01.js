import React, {useContext, useEffect, useState} from "react";
import {UserContext} from "../../../../context/UserContext";
import {apiKey} from "../../../../helpers/ApiVideo";
import {useHistory} from "react-router-dom";

// Create video metadata on api.video
const VideoStep01 = (props) => {
    const user = useContext(UserContext);
    const history = useHistory();

    // Create video metadata on api.video and proceed to the next step
    const nextStep = (e) => {
        e.preventDefault();
        const request = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `${props.tokenType} ${props.accessToken}`
            },
            body: JSON.stringify({
                public: true,
                panoramic: false,
                mp4Support: true,
                metadata: [{key: 'Author', value: `${user.first_name} ${user.last_name}`}],
                title: props.title,
                description: props.description
            })
        };

        // Execute fetch and get the videoId key returned from video.api
        fetch('https://ws.api.video/videos', request)
            .then(response => response.json())
            .then(result => {
                props.setVideoId(result.videoId);
                console.log(result);
            })
            .catch(err => alert(err));
        history.push("/post/video/step-2");
    }

    return (
        <>
            <section>
                <header className="section-header">
                    <h1>Step 1 - Some details for your video...</h1>
                </header>
                <div className="section-content">
                    <form className="form-full" onSubmit={nextStep}>
                        {/*Recipe name*/}
                        <h1>Title (*)</h1>
                        <input aria-label="Video title" type="text" value={props.title}
                               onChange={e => props.setTitle(e.target.value)}
                               placeholder="Your video title" required/>
                        <h1>Description</h1>
                        <input aria-label="Video title" type="text" value={props.description}
                               onChange={e => props.setDescription(e.target.value)}
                               placeholder="Your video description"/>
                        <button type="submit">Proceed</button>
                    </form>
                </div>
            </section>
        </>
    )
}

export default VideoStep01;