import React, {useContext, useEffect, useLayoutEffect, useRef, useState} from "react";
import {cloudName, uploadPreset} from "../../../helpers/Cloudinary";
import {UserContext} from "../../../context/UserContext";
import {apiBase} from "../../../helpers/Helpers";
import Form from "../../commons/elements/form/Form";

const UpdateAvatar = () => {
    // Authentication and API stuff
    const user = useContext(UserContext);
    const token = JSON.parse(localStorage.getItem("accessToken"));
    const api = `${apiBase}/user/update/profile/${user.id}`;

    const inputRef = useRef();
    const [file, setFile] = useState();
    const [uploading, setUploading] = useState(false);

    // Initializes parameters
    const [profileImage, setProfileImage] = useState();

    // Generates request headers
    let headers = new Headers();
    headers.append("Authorization", `Bearer ${token.token}`);
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    const updateAvatar = async (e) => {
        // e.preventDefault()
        // Generates request body
        let body = JSON.stringify({
            "profile_image": profileImage
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
            alert("Profile image updated.");
            window.location.reload()
        } else if (response.status === 401) {
            alert("You are not authorized to complete the request.")
        } else {
            alert("Error: " + response.status);
        }
    }
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
            .then(result => setProfileImage(result.secure_url))
            .catch(error => console.log('error', error));
    }

    const firstUpdate = useRef(true);
    useLayoutEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }
        updateAvatar();
    }, [profileImage]);

    return (
        <section>
            <header className="section-header">
                <h1>Profile picture</h1>
            </header>
            <div className="section-content">
                <Form onSubmit={uploadFile}>
                    {/*Dashboard picture*/}
                    <label>Profile image
                        <input type="file"
                               onChange={() => (setFile(inputRef.current.files[0]))}
                               ref={inputRef}/>
                    </label>
                    <button type="submit" className="button-submit">Update</button>
                </Form>
            </div>
        </section>
    )
}

export default UpdateAvatar;