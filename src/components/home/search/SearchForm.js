import React, {useState} from "react";
import ReactQuill from "react-quill";

const SearchForm = () => {
    const [query, setQuery] = useState("");

    return (
        <section>
            <div className="section-content">
                <form className="form-container">
                    <input aria-label="Search" type="text" value={query}
                           onChange={e => setQuery(e.target.value)}
                           placeholder="Recipe name, blog title, author's name..." required/>
                    <button type="submit">Search</button>
                </form>
            </div>
        </section>
    )
}

export default SearchForm;