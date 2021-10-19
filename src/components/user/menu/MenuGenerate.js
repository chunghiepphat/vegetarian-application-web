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
                <Form onSubmit={props.generate}>
                    <button type="submit">
                        Generate your menu
                    </button>
                </Form>
            </div>
        </section>
    )
}

export default MenuGenerate;