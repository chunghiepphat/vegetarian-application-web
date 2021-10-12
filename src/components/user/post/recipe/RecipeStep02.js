import React, {useRef, useState} from "react";
import {useHistory} from "react-router-dom";
import {clientId} from "../../../../helpers/Imgur";

const RecipeStep02 = (props) => {
    const history = useHistory();
    const inputRef = useRef();
    const [file, setFile] = useState();

    const uploadImage = (e) => {
        e.preventDefault();
        const headers = new Headers();
        headers.append("Authorization", `Client-ID ${clientId}`);

        const formData = new FormData();
        formData.append("image", file);

        const request = {
            method: 'POST',
            headers: headers,
            body: formData,
            redirect: 'follow'
        };

        fetch("https://api.imgur.com/3/image", request)
            .then(response => response.text())
            .then(result => JSON.parse(result))
            .then(json => props.setThumbnail(json.data.link))
            .catch(error => console.log('error', error));
    }
    const nextStep = () => {
        history.push("/post/recipe/step-3");
    }

    return (
        <>
            <section>
                <header className="section-header">
                    <h1>Step 2 - Add some images</h1>
                    <em>Add some pictures to show everyone what your delightful dish would look like.</em>
                </header>
                <div className="section-content">
                    <form className="form-full" onSubmit={uploadImage}>
                        <h1>Recipe thumbnail</h1>
                        <input aria-label="Recipe thumbnail" type="file"
                               onChange={() => (setFile(inputRef.current.files[0]))}
                               ref={inputRef}/>
                        <button type="submit">Upload</button>
                    </form>
                </div>
            </section>
            <section>
                <header className="section-header">
                    <h1>Preview</h1>
                </header>
                <div className="section-content">
                    <form className="form-full" onSubmit={nextStep}>
                        {props.thumbnail ?
                            <>
                                <picture className="preview-thumbnail">
                                    <source srcSet={props.thumbnail}/>
                                    <img src="" alt=""/>
                                </picture>
                                <button type="submit">Next step</button>
                            </>
                            :
                            <>
                                <em>Upload an image and preview it here...</em>
                                <button type="submit" disabled>Next step</button>
                            </>
                        }
                    </form>
                </div>
            </section>
        </>
    )
}

export default RecipeStep02;