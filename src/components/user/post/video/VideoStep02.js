import React, {useEffect, useRef, useState} from "react";
import {SectionLoader} from "../../../commons/elements/loaders/Loader";
// Upload video to api.video
const VideoStep02 = (props) => {
    const inputRef = useRef();
    const [file, setFile] = useState();

    const uploadVideo = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("file", file);

        const request = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `${props.tokenType} ${props.accessToken}`
            },
            body: formData
        };

        fetch(`https://ws.api.video/videos/${props.videoId}/source`, request)
            .then(response => response.json())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }

    // Refresh api.video accessToken
    useEffect(() => {
        const request = {
            method: 'POST',
            headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify({refreshToken: props.refreshToken})
        };

        fetch('https://ws.api.video/auth/refresh', request)
            .then(response => response.json())
            .then(result => {
                props.setTokenType(result.token_type);
                props.setAccessToken(result.access_token);
                props.setRefreshToken(result.refresh_token);
            })
            .catch(err => console.error(err));
    }, [])

    useEffect(() => {
        console.log(file);
    }, [file])
    return (
        <>
            {props.videoId ?
                <section>
                    <header className="section-header">
                        <h1>Upload</h1>
                        <em>Prefer a more visual approach over walls of text? Upload your how-to video instead!</em>
                    </header>
                    <div className="section-content">
                        <form className="form-full" onSubmit={uploadVideo}>
                            <h1>Video</h1>
                            <input aria-label="Video file" type="file"
                                   onChange={() => (setFile(inputRef.current.files[0]))}
                                   ref={inputRef}/>
                            <button type="submit">Upload</button>
                        </form>
                    </div>
                </section>
                :
                <SectionLoader/>}
        </>
    )
}

export default VideoStep02;