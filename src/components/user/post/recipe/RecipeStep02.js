import React, {useRef, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import Form from "../../../commons/elements/form/Form";
import InputGroup from "../../../commons/elements/form/InputGroup";
import {FaAngleLeft} from "react-icons/fa";

const RecipeStep02 = (props) => {
    const history = useHistory();
    const inputRef = useRef();
    const [image, setImage] = useState(null)
    const handleChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            props.setThumbnailFile(event.target.files[0]);
            setImage(URL.createObjectURL(event.target.files[0]));
        }
    }
    const clearInput = () => {
        setImage();
    }
    const nextStep = () => {
        history.push("/post/recipe/step-3");
    }

    return (
        <section>
            <header className="section-header">
                <Link to="/post/recipe/step-1"><FaAngleLeft/>Previous step</Link>
                <h1>Step 2 - Add a picture</h1>
                <em>Add a thumbnail to show everyone what your delightful dish would look like.</em>
            </header>
            <div className="section-content">
                <Form onSubmit={nextStep}>
                    <label htmlFor={"file-selector"}>
                        {image ?
                            <picture className="preview-thumbnail">
                                <source srcSet={image}/>
                                <img src="" alt=""/>
                            </picture>
                            : <div className="upload-thumbnail">
                                <h1>Upload your image and preview it here</h1>
                                <p>Click to pick an image...</p>
                            </div>}
                    </label>
                    <input id="file-selector" style={{display: "none"}}
                           aria-label="Recipe thumbnail" type="file"
                           onChange={handleChange}
                           ref={inputRef}/>
                    <div className="sticky-bottom">
                        {image ?
                            <InputGroup>
                                <button className="button-cancel" onClick={clearInput}>Clear</button>
                                <button type="submit" className="button-submit">
                                    Next step
                                </button>
                            </InputGroup>
                            : <InputGroup>
                                <button disabled>Clear</button>
                                <button disabled>Next step</button>
                            </InputGroup>}
                    </div>
                </Form>
            </div>
        </section>
    )
}

export default RecipeStep02;