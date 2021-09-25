import React, {useState} from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const PostRecipe = () => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    const [title, setTitle] = useState();
    const [category, setCategory] = useState();
    const [thumbnail, setThumbnail] = useState();
    const [difficulty, setDifficulty] = useState();
    const [portionSize, setPortionSize] = useState();
    const [portionType, setPortionType] = useState();
    const [prepTime, setPrepTime] = useState("0");
    const [bakingTime, setBakingTime] = useState("0");
    const [restingTime, setRestingTime] = useState("0");
    const [content, setContent] = useState();

    return (
        <main>
            <section>
                <header className="section-header">
                    <h1>Step 1 - The basics</h1>
                </header>
                <form className="form-container">
                    <h1>Name your recipe</h1>
                    <input type="text" value={title} onChange={e => setTitle(e.target.value)}
                           placeholder="What would you call this dish?"/>
                    {/*Email*/}
                    <h1>Recipe type</h1>
                    <select/>
                    {/*Phone*/}
                    <h1>Recipe difficulty</h1>
                    <div className="flex-horizontal">
                        <label className="radio-button">
                            <input type="radio" name="difficulty" value="1"
                                   onChange={e => setDifficulty(e.target.value)}/>
                            <span className="radio-label">Novice</span>
                        </label>
                        <label className="radio-button">
                            <input type="radio" name="difficulty" value="2"
                                   onChange={e => setDifficulty(e.target.value)}/>
                            <span className="radio-label">Intermediate</span>
                        </label>
                        <label className="radio-button">
                            <input type="radio" name="difficulty" value="3"
                                   onChange={e => setDifficulty(e.target.value)}/>
                            <span className="radio-label">Gordon Ramsay</span>
                        </label>
                    </div>
                    <h1>Prep time (minutes)</h1>
                    <input type="number" min={0} value={prepTime} onChange={e => setPrepTime(e.target.value)}/>
                    <h1>Baking time (minutes)</h1>
                    <input type="number" min={0} value={bakingTime} onChange={e => setBakingTime(e.target.value)}/>
                    <h1>Resting time (minutes)</h1>
                    <input type="number" min={0} value={restingTime} onChange={e => setRestingTime(e.target.value)}/>
                </form>
            </section>
        </main>
    )
}

export default PostRecipe;