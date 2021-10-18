import React from "react";

const EditSubtitle = (props) => {
    return (
        <section>
            <label>Edit the blog subtitle...
                <input aria-label="Subtitle" type="text" value={props.subtitle}
                       onChange={e => props.setSubtitle(e.target.value)}/>
            </label>
        </section>
    )
}

export default EditSubtitle;