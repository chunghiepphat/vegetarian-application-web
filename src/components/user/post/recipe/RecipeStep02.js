import React, {useRef, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import {clientId} from "../../../../helpers/Imgur";
import {FaAngleLeft} from "react-icons/fa";
import {cloudName, uploadPreset} from "../../../../helpers/Cloudinary";
import Form from "../../../commons/elements/form/Form";
import InputGroup from "../../../commons/elements/form/InputGroup";

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
                    <Form>
                        {props.thumbnail ?
                            <picture className="preview-thumbnail">
                                <source srcSet={props.thumbnail}/>
                                <img src="" alt=""/>
                            </picture>
                            :
                            <em>Upload an image and preview it here...</em>
                        }
                        <label>Recipe thumbnail
                            <input aria-label="Recipe thumbnail" type="file"
                                   onChange={() => (setFile(inputRef.current.files[0]))}
                                   ref={inputRef}/>
                        </label>
                        <InputGroup>
                            <button onClick={uploadFile}>Upload</button>
                            {props.thumbnail &&
                            <button className="button-cancel" onClick={clearInput}>Clear</button>}
                        </InputGroup>
                        {props.thumbnail ?
                            <button className="button-submit" onClick={nextStep}>Next step</button>
                            :
                            <button disabled>Next step</button>
                        }
                    </Form>
                </div>
            </section>
        </>
    )
}

export default RecipeStep02;