import React from "react";
import "./Alert.css";
import LocalizedStrings from "react-localization";

// Localizations
let strings = new LocalizedStrings({
    en: {
        message: "We couldn't load the content.",
        button: "Try again",
    },
    vi: {
        message: "Chúng tôi gặp vấn đề khi tải nội dung này.",
        button: "Thử lại",
    }
});

export const PanelErr = ({reload, style}) => {
    return (
        <div className="alert-wrapper panel-alert" style={style}>
            <p>{strings.message}</p>
            <button className="button-dark" onClick={() => reload()}>{strings.button}</button>
        </div>
    )
}

export const SectionErr = ({reload, style}) => {
    return (
        <div className="alert-wrapper section-alert" style={style}>
            <p>{strings.message}</p>
            <button className="button-dark" onClick={() => reload()}>{strings.button}</button>
        </div>
    )
}

export const ArticleErr = ({reload, style}) => {
    return (
        <div className="alert-wrapper article-alert" style={style}>
            <p>{strings.message}</p>
            <button className="button-dark" onClick={() => reload()}>{strings.button}</button>
        </div>
    )
}