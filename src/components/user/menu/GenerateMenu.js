import React from "react";
import InputGroup from "../../commons/elements/form/InputGroup";
import LocalizedStrings from "react-localization";

const GenerateMenu = (props) => {
    // Localizations
    let strings = new LocalizedStrings({
        en: {
            generateMenuButton: "Generate a new menu",
            loadMenuButton: "Load your saved menu",
            saveMenuButton: "Save this menu",
            showingMenuButton: "Showing your saved menu",
            alreadySavedButton: "Already saved",
        },
        vi: {
            generateMenuButton: "Tạo menu mới",
            loadMenuButton: "Lấy thực đơn đã lưu",
            saveMenuButton: "Lưu thực đơn",
            showingMenuButton: "Đang hiện thực đơn đã lưu",
            alreadySavedButton: "Đã lưu",
        }
    });

    return (
        <section className="sticky-bottom">
            <div className="section-content">
                <InputGroup>
                    <button className="button-light" onClick={props.generate}>
                        {strings.generateMenuButton}
                    </button>
                    {props.isMenuLoaded && <>
                        {props.isMenuNew ? <>
                            <button className="button-light" onClick={props.load}>{strings.loadMenuButton}</button>
                            <button className="button-dark" onClick={props.save}>{strings.saveMenuButton}</button>
                        </> : <>
                            <button className="button-light" disabled>{strings.showingMenuButton}</button>
                            <button className="button-dark" disabled>{strings.alreadySavedButton}</button>
                        </>}
                    </>}
                </InputGroup>
            </div>
        </section>
    )
}

export default GenerateMenu;