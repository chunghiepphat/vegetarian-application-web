import React, {useEffect, useRef, useState} from "react";
import {cloudName, uploadPreset} from "../../../../helpers/Cloudinary";
import {ButtonLoader, PanelLoader} from "../../../commons/elements/loaders/Loader";
import {Link} from "react-router-dom";
import {FaAngleLeft} from "react-icons/fa";

const VideoStep02 = (props) => {
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

    useEffect(() => {
        console.log(props.link);
    }, [props.link])
    return (
        <>
            <section>
                <header className="section-header">
                    <Link to="/post/recipe/step-1"><FaAngleLeft/>Previous step</Link>
                    <h1>Step 2 - Upload</h1>
                    <em>Pick a video to upload to our server and it's done!</em>
                </header>
                <div className="section-content">
                    {props.link ?
                        <form className="form-container" onSubmit={props.submitPost}>
                            <h1>Preview</h1>
                            <a href={props.link} target="_blank" rel="noopener noreferrer">Link to your video.</a>
                            <button type="submit">Finish</button>
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
                                    <button type="submit" disabled>Uploading...</button>
                                </div>
                            </> : <>
                                <label>Video
                                    <input aria-label="Video file" type="file"
                                           onChange={() => (setFile(inputRef.current.files[0]))}
                                           ref={inputRef}/></label>
                                <div className="sticky-bottom">
                                    <button type="submit" className="button-submit">Upload</button>
                                </div>
                            </>}
                        </form>}
                </div>
            </section>
        </>
    )
}

export default VideoStep02;