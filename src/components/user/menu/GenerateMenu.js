import React from "react";
import Form from "../../commons/elements/form/Form";
import InputGroup from "../../commons/elements/form/InputGroup";

const GenerateMenu = (props) => {
    return (
        <section className="sticky-bottom">
            <div className="section-content">
                <InputGroup>
                    <button className="button-light" onClick={props.generate}>
                        Generate a new menu
                    </button>
                    {props.isNew ?
                        <>
                            <button className="button-light" onClick={props.load}>Load your saved menu</button>
                            <button className="button-dark" onClick={props.save}>Save this menu</button>
                        </>
                        :
                        <>
                            <button className="button-light" disabled>Showing your saved menu</button>
                            <button className="button-dark" disabled>Already saved</button>
                        </>
                    }
                </InputGroup>
            </div>
        </section>
    )
}

export default GenerateMenu;