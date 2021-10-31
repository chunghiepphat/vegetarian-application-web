import React from "react";
import Form from "../../commons/elements/form/Form";
import InputGroup from "../../commons/elements/form/InputGroup";

const MenuGenerate = (props) => {
    return (
        <section className="sticky-bottom">
            <header className="section-header">
                <h1>Generate a menu</h1>
                <em>Let us suggest a menu for the week based on your body index!</em>
            </header>
            <div className="section-content">
                <InputGroup>
                    <button className="button-cancel" onClick={props.generate}>
                        Generate a new menu
                    </button>
                    {props.isNew ?
                        <>
                            <button className="button-cancel" onClick={props.load}>Load your saved menu</button>
                            <button className="button-submit" onClick={props.save}>Save this menu</button>
                        </>
                        :
                        <>
                            <button className="button-cancel" disabled>Showing your saved menu</button>
                            <button className="button-submit" disabled>Generate a new menu to save</button>
                        </>
                    }
                </InputGroup>
            </div>
        </section>
    )
}

export default MenuGenerate;