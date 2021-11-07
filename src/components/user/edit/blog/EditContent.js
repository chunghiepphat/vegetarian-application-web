import React from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

const EditSubtitle = (props) => {
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
            <label>Update the content...
                <ReactQuill theme="snow" value={props.content}
                            onChange={handleQuill}
                            modules={modules}
                            placeholder="What's your story?">
                </ReactQuill>
            </label>
        </section>
    )
}

export default EditSubtitle;