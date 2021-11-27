import React, {useContext, useRef, useState} from "react";
import {cloudName, uploadPreset} from "../../../helpers/Cloudinary";
import {profileDisplayStrings} from "../../../resources/UserDisplayStrings";
import {requestErrorStrings} from "../../../resources/CommonDisplayStrings";
import {LocaleContext} from "../../../context/LocaleContext";
import {UserContext} from "../../../context/UserContext";
import {apiUrl} from "../../../helpers/Variables";
import Form from "../../commons/elements/form/Form";
import InputGroup from "../../commons/elements/form/InputGroup";

const UpdateAvatar = ({reload}) => {
    const inputRef = useRef();

    // Localizations
    profileDisplayStrings.setLanguage(useContext(LocaleContext));
    requestErrorStrings.setLanguage(useContext(LocaleContext));
    // Gets user info
    const user = useContext(UserContext);
    const token = JSON.parse(localStorage.getItem("accessToken"));

    // CSS Styles
    const previewStyles = {
        width: "300px",
        height: "300px",
        borderRadius: "50%",
        overflow: "hidden",
    }

    // Handles file picker changes
    const [file, setFile] = useState();
    const [image, setImage] = useState(user.profile_image);
    const handleChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setImage(URL.createObjectURL(e.target.files[0]));
        }
    }

    // Clears file picker input
    const handleClear = (e) => {
        e.preventDefault();
        setFile(undefined);
        setImage(undefined);
    }

    // Generates request headers
    let headers = new Headers();
    headers.append("Authorization", `Bearer ${token.token}`);
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    // Updates profile picture in user profile once uploaded to the hosting service
    const [isLoading, setIsLoading] = useState(false);
    const updateAvatar = async (avatarUrl) => {
        // Generates request body
        let body = JSON.stringify({
            "profile_image": avatarUrl,
        });
        // Generates request
        let request = {
            method: 'PUT',
            headers: headers,
            body: body,
        };
        // Executes fetch
        const api = `${apiUrl}/user/update/profile/${user.id}`;
        try {
            const response = await fetch(api, request);
            if (response.ok) {
                reload();
                alert(profileDisplayStrings.profilePictureUpdateSuccess);
                setIsLoading(false);
            } else if (response.status === 401) {
                alert(requestErrorStrings.requestErrorUnauthorized)
                setIsLoading(false);
            } else {
                alert(requestErrorStrings.requestErrorStatus + response.status);
                setIsLoading(false);
            }
        } catch (error) {
            alert(requestErrorStrings.requestErrorException + error);
            setIsLoading(false);
        }

    }

    // Uploads file to hosting service
    const uploadFile = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        if (file) {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", uploadPreset);
            const request = {
                method: 'POST',
                body: formData,
                redirect: 'follow'
            };
            try {
                const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, request)
                // Handles profile upon successful upload
                if (response.ok) {
                    // Gets uploaded image URL
                    const result = await response.json();
                    await updateAvatar(result.secure_url);
                } else if (response.status >= 400 && response.status < 600) {
                    alert(requestErrorStrings.hostingServiceErrorStatus + response.status);
                    setIsLoading(false);
                }
            } catch (error) {
                alert(requestErrorStrings.requestErrorException + error);
                setIsLoading(false);
            }
        } else await updateAvatar(file);
    }

    return (
        <section>
            <header className="section-header">
                <h1>{profileDisplayStrings.profilePicture}</h1>
            </header>
            <div className="section-content">
                <Form onSubmit={uploadFile}>
                    <div style={{display: "flex", flexDirection: "column", alignItems: "center", minHeight: "400px"}}>
                        <label htmlFor={"file-selector"} style={previewStyles}>
                            {image ?
                                <picture className="preview-thumbnail" style={previewStyles}>
                                    <source srcSet={image}/>
                                    <img src="" alt="" style={{height: "unset"}}/>
                                </picture>
                                : <div className="upload-thumbnail" style={previewStyles}>
                                    <h1>{profileDisplayStrings.profilePicturePickerPlaceholder}</h1>
                                    <p>{profileDisplayStrings.profilePicturePickerMessage}</p>
                                </div>}
                        </label>
                        <input id="file-selector" style={{display: "none"}}
                               aria-label="Recipe thumbnail" type="file"
                               onChange={handleChange}
                               ref={inputRef}/>
                    </div>
                    <div className="sticky-bottom">
                        <InputGroup>
                            <button type="button" className="button-light"
                                    onClick={handleClear}>{profileDisplayStrings.profilePictureClear}
                            </button>
                            {!isLoading ?
                                <button type="submit"
                                        className="button-dark">{profileDisplayStrings.profilePictureUpdate}</button>
                                : <button disabled>{profileDisplayStrings.profilePictureUpdating}</button>}
                        </InputGroup>
                    </div>
                </Form>
            </div>
        </section>
    )
}

export default UpdateAvatar;