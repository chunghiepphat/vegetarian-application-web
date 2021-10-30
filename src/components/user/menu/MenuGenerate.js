import React from "react";
import Form from "../../commons/elements/form/Form";

const MenuGenerate = (props) => {
    return (
        <section>
            <header className="section-header">
                <h1>Generate a menu</h1>
                <em>Let us suggest a menu for the week based on your body index!</em>
            </header>
            <div className="section-content">
                <button type="submit" className="button-submit" onClick={props.generate}>
                    Generate a new menu
                </button>
            </div>
        </section>
    )
}

export default MenuGenerate;