import React, {useContext, useEffect, useRef, useState} from "react";
import {cloudName, uploadPreset} from "../../../../helpers/Cloudinary";
import {postDisplayStrings} from "../../../../resources/UserDisplayStrings";
import {LocaleContext} from "../../../../context/LocaleContext";
import {Link} from "react-router-dom";
import {FaAngleLeft} from "react-icons/fa";

const VideoStep02 = (props) => {
    // Localizations
    postDisplayStrings.setLanguage(useContext(LocaleContext));

    const inputRef = useRef();
    const [file, setFile] = useState();
    const [uploading, setUploading] = useState(false);

    const uploadFile = (e) => {
        e.preventDefault();
        setUploading(true);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", uploadPreset);

        const request = {
            method: 'POST',
            body: formData,
            redirect: 'follow'
        };

        fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, request)
            .then(response => response.json())
            .then(result => props.setLink(result.secure_url))
            .catch(error => console.log('error', error));
    }

    return (
        <>
            <section>
                <header className="section-header">
                    <Link to="/post/recipe/step-1"><FaAngleLeft/>{postDisplayStrings.postVideoPreviousStep}</Link>
                    <h1>{postDisplayStrings.postVideoStep2}</h1>
                    <em>{postDisplayStrings.postVideoStep2Subheader}</em>
                </header>
                <div className="section-content">
                    {props.link ?
                        <form className="form-container" onSubmit={props.submitPost}>
                            <h1>{postDisplayStrings.postVideoPreview}</h1>
                            <a href={props.link} target="_blank"
                               rel="noopener noreferrer">{postDisplayStrings.postVideoPreviewLink}</a>
                            <button type="submit">{postDisplayStrings.postVideoFinish}</button>
                        </form>
                        :
                        <form className="form-container" onSubmit={uploadFile}>

                            {/*Check whether the form is uploading a video*/}
                            {uploading ? <>
                                <label>Video
                                    <input aria-label="Video file" type="file"
                                           onChange={() => (setFile(inputRef.current.files[0]))}
                                           ref={inputRef} disabled/></label>
                                <div className="sticky-bottom">
                                    <button type="submit" disabled>{postDisplayStrings.postVideoUploading}</button>
                                </div>
                            </> : <>
                                <label>Video
                                    <input aria-label="Video file" type="file"
                                           onChange={() => (setFile(inputRef.current.files[0]))}
                                           ref={inputRef}/></label>
                                <div className="sticky-bottom">
                                    <button type="submit"
                                            className="button-dark">{postDisplayStrings.postVideoUpload}</button>
                                </div>
                            </>}
                        </form>}
                </div>
            </section>
        </>
    )
}

export default VideoStep02;