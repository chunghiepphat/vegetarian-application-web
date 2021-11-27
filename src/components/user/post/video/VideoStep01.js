import React from "react";
import {useHistory} from "react-router-dom";
import LocalizedStrings from "react-localization";

// Create video metadata on api.video
const VideoStep01 = (props) => {
    // Localizations
    let strings = new LocalizedStrings({
        en: {
            postRecipeStep1: "Step 1 - Getting started",
            step1Message: "Prefer a more visual approach over walls of text? Share your how-to videos instead!",
            titleVideo: "Title (*)",
            titlePlaceholder: "Your video title",
            descriptionVideo: "Description",
            descriptionPlaceholder: "Your video description",
            proceedButton: "Proceed"
        },
        vi: {
            postRecipeStep1: "Bước 1 - Bắt đầu",
            step1Message: "Muốn thể hiện rõ hơn thay vì đọc cả một văn bản? Hãy chia sẻ video hướng dẫn ngay!",
            titleVideo: "Tiêu đề (*)",
            titlePlaceholder: "Tiêu đề của video",
            descriptionVideo: "Mô tả",
            descriptionPlaceholder: "Mô tả video",
            proceedButton: "Tiếp tục"
        }
    });

    const history = useHistory();
    // Create video metadata on api.video and proceed to the next step
    const nextStep = (e) => {
        e.preventDefault();
        history.push("/post/video/step-2");
    }

    return (
        <section>
            <header className="section-header">
                <h1>{strings.postRecipeStep1}</h1>
                <em>{strings.step1Message}</em>
            </header>
            <div className="section-content">
                <form className="form-container" onSubmit={nextStep}>
                    {/*Recipe name*/}
                    <label>{strings.titleVideo}
                        <input aria-label="Video title" type="text" value={props.title}
                               onChange={e => props.setTitle(e.target.value)}
                               placeholder={strings.titlePlaceholder} required/></label>
                    <label>{strings.descriptionVideo}
                        <input aria-label="Video title" type="text" value={props.description}
                               onChange={e => props.setDescription(e.target.value)}
                               placeholder={strings.descriptionPlaceholder}/></label>
                    <div className="sticky-bottom">
                        <button type="submit" className="button-dark">{strings.proceedButton}</button>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default VideoStep01;