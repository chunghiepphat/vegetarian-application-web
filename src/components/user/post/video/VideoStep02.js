import React, {useContext, useEffect, useRef, useState} from "react";
import {cloudName, uploadPreset} from "../../../../helpers/Cloudinary";
import {postDisplayStrings} from "../../../../resources/UserDisplayStrings";
import {LocaleContext} from "../../../../context/LocaleContext";
import {Link} from "react-router-dom";
import {FaAngleLeft} from "react-icons/fa";
import InputGroup from "../../../commons/elements/form/InputGroup";

const VideoStep02 = (props) => {
    const inputRef = useRef();

    // Localizations
    postDisplayStrings.setLanguage(useContext(LocaleContext));


    return (
        <section>
            <header className="section-header">
                <Link to="/post/recipe/step-1"><FaAngleLeft/>{postDisplayStrings.postVideoPreviousStep}</Link>
                <h1>{postDisplayStrings.postVideoStep2}</h1>
                <em>{postDisplayStrings.postVideoStep2Subheader}</em>
            </header>
            <div className="section-content">
                <form className="form-container" onSubmit={props.submitPost}>
                    <label>Video
                        <input aria-label="Video file" type="file"
                               onChange={() => (props.setFile(inputRef.current.files[0]))}
                               ref={inputRef} readOnly={props.isLoading}/></label>
                    <div className="sticky-bottom">
                        {props.isLoading ? <>
                            <button disabled>{props.uploadProgress}</button>
                        </> : <>
                            <InputGroup>
                                <button type="submit" className="button-dark"
                                        name="true">{postDisplayStrings.postVideoSaveDraft}</button>
                                <button type="submit" className="button-dark"
                                        name="false">{postDisplayStrings.postVideoSubmitForReview}</button>
                            </InputGroup>
                        </>}
                    </div>
                </form>
            </div>
        </section>
    )
}

export default VideoStep02;