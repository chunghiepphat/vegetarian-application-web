import React from "react";
import "./Alert.css";
import LocalizedStrings from "react-localization";

// Localizations
let strings = new LocalizedStrings({
    en: {
        message: "It seems empty here.",
    },
    vi: {
        message: "Có vẻ như ở đây không có gì cả.",
    }
});
export const PanelEmp = ({message, style}) => {
    return (
        <div className="alert-wrapper panel-alert" style={style}>
            {message ? <em>{message}</em>
                : <em>{strings.message}</em>}
        </div>
    )
}

export const SectionEmp = ({message, style}) => {
    return (
        <div className="alert-wrapper section-alert" style={style}>
            {message ? <em>{message}</em>
                : <em>{strings.message}</em>}
        </div>
    )
}

export const ArticleEmp = ({message, style}) => {
    return (
        <div className="alert-wrapper article-alert" style={style}>
            {message ? <em>{message}</em>
                : <em>{strings.message}</em>}
        </div>
    )
}