import React, {useContext} from "react";
import {postDisplayStrings} from "../../../../resources/UserDisplayStrings";
import {LocaleContext} from "../../../../context/LocaleContext";
import {useHistory} from "react-router-dom";

const VideoStep01 = (props) => {
    const history = useHistory();

    // Localizations
    postDisplayStrings.setLanguage(useContext(LocaleContext));

    const nextStep = (e) => {
        e.preventDefault();
        history.push("/post/video/step-2");
    }

    return (
        <section>
            <header className="section-header">
                <h1>{postDisplayStrings.postVideoStep1}</h1>
                <em>{postDisplayStrings.postVideoStep1Subheader}</em>
            </header>
            <div className="section-content">
                <form className="form-container" onSubmit={nextStep}>
                    {/*Recipe name*/}
                    <label>{postDisplayStrings.postVideoTitle}
                        <input aria-label="Video title" type="text" value={props.title}
                               onChange={e => props.setTitle(e.target.value)}
                               placeholder={postDisplayStrings.postVideoTitlePlaceholder} required/></label>
                    <label>{postDisplayStrings.postVideoDescription}
                        <input aria-label="Video title" type="text" value={props.description}
                               onChange={e => props.setDescription(e.target.value)}
                               placeholder={postDisplayStrings.postVideoDescriptionPlaceholder}/></label>
                    <div className="sticky-bottom">
                        <button type="submit" className="button-dark">{postDisplayStrings.postVideoProceed}</button>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default VideoStep01;