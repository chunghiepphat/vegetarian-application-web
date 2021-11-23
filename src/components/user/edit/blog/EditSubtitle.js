import React from "react";
import LocalizedStrings from "react-localization";

const EditSubtitle = (props) => {
    let strings = new LocalizedStrings({
        en: {
            editBlogSubtitle: "Edit the blog subtitle...",
        },
        vi: {
            editBlogSubtitle: "Cập nhật phụ đề bài viết...",
        }
    });

    return (
        <section>
            <label>{strings.editBlogSubtitle}
                <input aria-label="Subtitle" type="text" value={props.subtitle}
                       onChange={e => props.setSubtitle(e.target.value)}/>
            </label>
        </section>
    )
}

export default EditSubtitle;