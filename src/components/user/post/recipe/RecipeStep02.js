import React, {useRef, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import Form from "../../../commons/elements/form/Form";
import InputGroup from "../../../commons/elements/form/InputGroup";
import {FaAngleLeft} from "react-icons/fa";
import LocalizedStrings from "react-localization";

const RecipeStep02 = (props) => {
    // Localizations
    let strings = new LocalizedStrings({
        en: {
            step2Header: "Add a picture",
            step2MessageHeader: "Add a thumbnail to show everyone what your delightful dish would look like.",
            thumbnailHeader: "Upload your image and preview it here",
            thumbnailMessageHeader: "Click to pick an image...",
            clearButton: "Clear",
            nextStepButton: "Next step",
            previousStepButton: "Previous step",
        },
        vi: {
            step2Header: "Thêm hình ảnh",
            step2MessageHeader: "Hãy thêm hình ảnh để mọi người có thể thấy món ăn sẽ trong như thế nào.",
            thumbnailHeader: "Tải hình ảnh và xem ở đây",
            thumbnailMessageHeader: "Nhấn vào để chọn hình ảnh",
            clearButton: "Xóa",
            nextStepButton: "Bước tiếp theo",
            previousStepButton: "Bước trước",
        }
    });

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
                <Link to="/post/recipe/step-1"><FaAngleLeft/>{strings.previousStepButton}</Link>
                <h1>{strings.step2Header}</h1>
                <em>{strings.step2MessageHeader}</em>
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
                                <h1>{strings.thumbnailHeader}</h1>
                                <p>{strings.thumbnailMessageHeader}</p>
                            </div>}
                    </label>
                    <input id="file-selector" style={{display: "none"}}
                           aria-label="Recipe thumbnail" type="file"
                           onChange={handleChange}
                           ref={inputRef}/>
                    <div className="sticky-bottom">
                        {image ?
                            <InputGroup>
                                <button className="button-light" onClick={clearInput}>{strings.clearButton}</button>
                                <button type="submit" className="button-dark">
                                    {strings.nextStepButton}
                                </button>
                            </InputGroup>
                            : <InputGroup>
                                <button disabled>{strings.clearButton}</button>
                                <button disabled>{strings.nextStepButton}</button>
                            </InputGroup>}
                    </div>
                </Form>
            </div>
        </section>
    )
}

export default RecipeStep02;