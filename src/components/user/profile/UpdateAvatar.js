import React, {useContext, useEffect, useLayoutEffect, useRef, useState} from "react";
import {cloudName, uploadPreset} from "../../../helpers/Cloudinary";
import {UserContext} from "../../../context/UserContext";
import {apiUrl} from "../../../helpers/Variables";
import Form from "../../commons/elements/form/Form";
import InputGroup from "../../commons/elements/form/InputGroup";
import LocalizedStrings from "react-localization";

const UpdateAvatar = ({reload}) => {
    // Localizations
    let strings = new LocalizedStrings({
        en: {
            updateAvatarHeader: "Profile picture",
            clearImageButton: "Clear image",
            updateButton: "Update",
            profilePictureHeader: "Profile picture",
            imagePictureMessage: "Click to pick an image",
            updatingButton: "Updating...",
            alertSuccess: "Profile image updated.",
        },
        vi: {
            updateAvatarHeader: "Hình ảnh hồ sơ",
            clearImageButton: "Xóa hình ảnh",
            updateButton: "Cập nhật",
            profilePictureHeader: "Hình ảnh hồ sơ",
            imagePictureMessage: "Nhấn để chọn hình ảnh",
            updatingButton: "Đang cập nhật...",
            alertSuccess: "Cập nhật hình ảnh thành công",
        }
    });

    // Authentication and API stuff
    const user = useContext(UserContext);
    const token = JSON.parse(localStorage.getItem("accessToken"));
    const api = `${apiUrl}/user/update/profile/${user.id}`;
    const inputRef = useRef();
    const [file, setFile] = useState();
    const [image, setImage] = useState(user.profile_image);
    const [isLoading, setIsLoading] = useState(false);
    const previewStyles = {
        width: "300px",
        height: "300px",
        borderRadius: "50%",
        overflow: "hidden",
    }
    const handleChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setImage(URL.createObjectURL(e.target.files[0]));
        }
    }
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
        const response = await fetch(api, request);
        if (response.ok) {
            reload();
            alert(strings.alertSuccess);
            setIsLoading(false);
        } else if (response.status === 401) {
            alert("You are not authorized to complete the request.")
            setIsLoading(false);
        } else {
            alert("Error: " + response.status);
            setIsLoading(false);
        }
    }
    // Handles file upload
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
                // Handles recipe submission upon successful upload
                if (response.ok) {
                    // Gets uploaded image URL
                    const result = await response.json();
                    await updateAvatar(result.secure_url);
                } else if (response.status >= 400 && response.status < 600) {
                    alert("We couldn't reach our hosting services. Status code: " + response.status);
                    setIsLoading(false);
                }
            } catch (error) {
                alert("There was an unexpected error. " + error);
                setIsLoading(false);
            }
        } else await updateAvatar(file);

    }
    const firstUpdate = useRef(true);
    // useLayoutEffect(() => {
    // }, [avatarUrl]);

    return (
        <section>
            <header className="section-header">
                <h1>{strings.updateAvatarHeader}</h1>
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
                                    <h1>{strings.profilePictureHeader}</h1>
                                    <p>{strings.imagePictureMessage}</p>
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
                                    onClick={handleClear}>{strings.clearImageButton}
                            </button>
                            {!isLoading ?
                                <button type="submit" className="button-dark">{strings.updateButton}</button>
                                : <button disabled>{strings.updatingButton}</button>}
                        </InputGroup>
                    </div>
                </Form>
            </div>
        </section>
    )
}

export default UpdateAvatar;