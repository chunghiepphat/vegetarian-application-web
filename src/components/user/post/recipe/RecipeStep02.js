import React, {useContext, useRef, useState} from "react";
import {postDisplayStrings} from "../../../../resources/UserDisplayStrings";
import {LocaleContext} from "../../../../context/LocaleContext";
import {Link, useHistory} from "react-router-dom";
import Form from "../../../commons/elements/form/Form";
import InputGroup from "../../../commons/elements/form/InputGroup";
import {FaAngleLeft} from "react-icons/fa";

const RecipeStep02 = (props) => {
    const history = useHistory();
    const inputRef = useRef();

    // Localizations
    postDisplayStrings.setLanguage(useContext(LocaleContext));

    const [image, setImage] = useState(null)
    const handleChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            props.setThumbnailFile(event.target.files[0]);
            setImage(URL.createObjectURL(event.target.files[0]));
        }
    }

    const clearInput = () => {
        setImage(null);
    }

    const nextStep = () => {
        history.push("/post/recipe/step-3");
    }

    return (
        <section>
            <header className="section-header">
                <Link to="/post/recipe/step-1"><FaAngleLeft/>{postDisplayStrings.postRecipePreviousStep}</Link>
                <h1>{postDisplayStrings.postRecipeStep2}</h1>
                <em>{postDisplayStrings.postRecipeStep2Subheader}</em>
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
                                <h1>{postDisplayStrings.postRecipeThumbnail}</h1>
                                <p>{postDisplayStrings.postRecipeThumbnailPlaceholder}</p>
                            </div>}
                    </label>
                    <input id="file-selector" style={{display: "none"}}
                           aria-label="Recipe thumbnail" type="file"
                           onChange={handleChange}
                           ref={inputRef}/>
                    <div className="sticky-bottom">
                        {image ?
                            <InputGroup>
                                <button className="button-light"
                                        onClick={clearInput}>{postDisplayStrings.postRecipeClear}</button>
                                <button type="submit" className="button-dark">
                                    {postDisplayStrings.postRecipeNextStep}
                                </button>
                            </InputGroup>
                            : <InputGroup>
                                <button disabled>{postDisplayStrings.postRecipeClear}</button>
                                <button disabled>{postDisplayStrings.postRecipeNextStep}</button>
                            </InputGroup>}
                    </div>
                </Form>
            </div>
        </section>
    )
}

export default RecipeStep02;