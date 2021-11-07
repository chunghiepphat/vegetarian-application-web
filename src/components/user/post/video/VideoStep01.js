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
        <section>
            <header className="section-header">
                <h1>Step 1 - Getting started</h1>
                <em>Prefer a more visual approach over walls of text? Share your how-to videos instead!</em>
            </header>
            <div className="section-content">
                <form className="form-container" onSubmit={nextStep}>
                    {/*Recipe name*/}
                    <label>Title (*)
                        <input aria-label="Video title" type="text" value={props.title}
                               onChange={e => props.setTitle(e.target.value)}
                               placeholder="Your video title" required/></label>
                    <label>Description
                        <input aria-label="Video title" type="text" value={props.description}
                               onChange={e => props.setDescription(e.target.value)}
                               placeholder="Your video description"/></label>
                    <div className="sticky-bottom">
                        <button type="submit" className="button-submit">Proceed</button>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default VideoStep01;