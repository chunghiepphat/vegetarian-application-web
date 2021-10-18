import React from "react";
import {useHistory} from "react-router-dom";

// Create video metadata on api.video
const VideoStep01 = (props) => {
    const history = useHistory();

    // Create video metadata on api.video and proceed to the next step
    const nextStep = (e) => {
        e.preventDefault();
        history.push("/post/video/step-2");
    }

    return (
        <>
            <section>
                <header className="section-header">
                    <h1>Step 1 - Getting started</h1>
                    <em>Prefer a more visual approach over walls of text? Share your how-to videos instead!</em>
                </header>
                <div className="section-content">
                    <form className="form-container" onSubmit={nextStep}>
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