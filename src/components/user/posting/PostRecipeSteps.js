import React from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const PostRecipeSteps = () => {
    return (
        <main>
            <section>
                <header className="section-header">
                    <h1>Recipe post form</h1>
                </header>
                <form className="form-container">
                    {/*Profile picture*/}
                    <label>
                        <span>Profile image</span>
                        <span className="tooltip">(?)
                            <span className="tooltip-text">Not yet implemented.</span></span>
                        <input type="file"/>
                    </label>
                    <button>Update</button>
                </form>
            </section>
        </main>
    )
}

export default PostRecipeSteps;