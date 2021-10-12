import React, {useRef, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import {clientId} from "../../../../helpers/Imgur";
import {FaAngleLeft} from "react-icons/fa";
import {cloudName, uploadPreset} from "../../../../helpers/Cloudinary";

const RecipeStep02 = (props) => {
    const history = useHistory();
    const inputRef = useRef();
    const [file, setFile] = useState();

    const uploadFile = (e) => {
        e.preventDefault();
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
            .then(result => props.setThumbnail(result.secure_url))
            .catch(error => console.log('error', error));
    }

    const clearInput = () => {
        props.setThumbnail();
    }

    const nextStep = () => {
        history.push("/post/recipe/step-3");
    }

    return (
        <>
            <section>
                <header className="section-header">
                    <Link to="/post/recipe/step-1"><FaAngleLeft/>Previous step</Link>
                    <h1>Step 2 - Add some images</h1>
                    <em>Add some pictures to show everyone what your delightful dish would look like.</em>
                </header>
                <div className="section-content">
                    <form className="form-full" onSubmit={uploadFile}>
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
                                <button className="button-cancel" onClick={clearInput}>Clear</button>
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