import React, {useState} from "react";
import Comment from "../../../commons/elements/Comment";

const RecipeComments = () => {
    const [comment, setComment] = useState();

    return (
        <section className="article-comments">
            <form className="form-comment">
                <input aria-label="Blog title" type="text" value={comment}
                       onChange={e => setComment(e.target.value)}
                       placeholder="Share your thoughts about this recipe..." required/>
            </form>
            <Comment/>
            <Comment/>
            <Comment/>
            <Comment/>
            <Comment/>
        </section>
    )
}

export default RecipeComments;