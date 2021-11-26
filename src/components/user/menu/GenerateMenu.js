import React, {useContext} from "react";
import {menuDisplayStrings} from "../../../resources/UserDisplayStrings";
import {LocaleContext} from "../../../context/LocaleContext";
import InputGroup from "../../commons/elements/form/InputGroup";

const GenerateMenu = (props) => {
    // Localizations
    menuDisplayStrings.setLanguage(useContext(LocaleContext));

    return (
        <section className="sticky-bottom">
            <div className="section-content">
                <InputGroup>
                    <button className="button-light" onClick={props.generate}>
                        {menuDisplayStrings.menuGenerate}
                    </button>
                    {props.isMenuLoaded && <>
                        {props.isMenuNew ? <>
                            <button className="button-light" onClick={props.load}>{menuDisplayStrings.menuLoad}</button>
                            <button className="button-dark" onClick={props.save}>{menuDisplayStrings.menuSave}</button>
                        </> : <>
                            <button className="button-light" disabled>{menuDisplayStrings.menuCurrentlyShowing}</button>
                            <button className="button-dark" disabled>{menuDisplayStrings.menuAlreadySaved}</button>
                        </>}
                    </>}
                </InputGroup>
            </div>
        </section>
    )
}

export default GenerateMenu;