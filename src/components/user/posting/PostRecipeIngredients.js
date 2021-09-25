import React from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const PostRecipeIngredients = () => {
    return (
        <main>
            <section>
                <header className="section-header">
                    <h1>Recipe post form</h1>
                </header>
                <div className="section-content">
                    <ReactQuill theme="snow"/>
                </div>
            </section>
        </main>
    )
}

export default PostRecipeIngredients;