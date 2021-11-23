import React, {useEffect, useRef, useState} from "react";
import {cloudName, uploadPreset} from "../../../../helpers/Cloudinary";
import {ButtonLoader, PanelLoader} from "../../../commons/elements/loaders/Loader";
import {Link} from "react-router-dom";
import {FaAngleLeft} from "react-icons/fa";
import LocalizedStrings from "react-localization";

const VideoStep02 = (props) => {
    // Localizations
    let strings = new LocalizedStrings({
        en: {
            previousStepButton: "Previous step",
            step2Header: "Step 2 - Upload",
            step2Message: "Pick a video to upload to our server and it's done!",
            previewHeader: "Preview",
            videoLink: "Link to your video.",
            finishButton: "Finish",
            uploadingButton: "Uploading...",
            uploadButton: "Upload",
        },
        vi: {
            previousStepButton: "Bước trước",
            step2Header: "Step 2 - Tải video",
            step2Message: "Hãy chọn video để tải lên máy chú chúng tôi!",
            previewHeader: "Xem trước",
            videoLink: "Đường dẫn đến video của bạn.",
            finishButton: "Xong",
            uploadingButton: "Đang tải...",
            uploadButton: "Tải",
        }
    });

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
                    <Link to="/post/recipe/step-1"><FaAngleLeft/>{strings.previousStepButton}</Link>
                    <h1>{strings.step2Header}</h1>
                    <em>{strings.step2Message}</em>
                </header>
                <div className="section-content">
                    {props.link ?
                        <form className="form-container" onSubmit={props.submitPost}>
                            <h1>{strings.previewHeader}</h1>
                            <a href={props.link} target="_blank" rel="noopener noreferrer">{strings.videoLink}</a>
                            <button type="submit">{strings.finishButton}</button>
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
                                    <button type="submit" disabled>{strings.uploadingButton}</button>
                                </div>
                            </> : <>
                                <label>Video
                                    <input aria-label="Video file" type="file"
                                           onChange={() => (setFile(inputRef.current.files[0]))}
                                           ref={inputRef}/></label>
                                <div className="sticky-bottom">
                                    <button type="submit" className="button-dark">{strings.uploadButton}</button>
                                </div>
                            </>}
                        </form>}
                </div>
            </section>
        </>
    )
}

export default VideoStep02;