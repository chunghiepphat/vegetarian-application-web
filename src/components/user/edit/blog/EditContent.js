import React from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import LocalizedStrings from "react-localization";

const EditSubtitle = (props) => {
    let strings = new LocalizedStrings({
        en: {
            editBlogContent: "Update the content...",
            contentPlaceholder: "What's your story?",
        },
        vi: {
            editBlogContent: "Cập nhật nội dung bài viết...",
            contentPlaceholder: "Câu chuyện của bạn?",
        }
    });

    // Quill JS toolbar config
    const modules = {
        toolbar: [
            [{'header': [1, 2, 3, false]}],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
            ['link', 'image'],
            ['clean']
        ],
    }
    const handleQuill = (value) => {
        props.setContent(value);
    }

    return (
        <section>
            <label>{strings.editBlogContent}
                <ReactQuill theme="snow" value={props.content}
                            onChange={handleQuill}
                            modules={modules}
                            placeholder={strings.contentPlaceholder}>
                </ReactQuill>
            </label>
        </section>
    )
}

export default EditSubtitle;