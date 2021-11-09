import React from "react";
import "./Alert.css";

export const PanelEmp = ({message, style}) => {
    return (
        <div className="alert-wrapper panel-alert" style={style}>
            {message ? <em>{message}</em>
                : <em>It seems empty here.</em>}
        </div>
    )
}

export const SectionEmp = ({message, style}) => {
    return (
        <div className="alert-wrapper section-alert" style={style}>
            {message ? <em>{message}</em>
                : <em>It seems empty here.</em>}
        </div>
    )
}

export const ArticleEmp = ({message, style}) => {
    return (
        <div className="alert-wrapper article-alert" style={style}>
            {message ? <em>{message}</em>
                : <em>It seems empty here.</em>}
        </div>
    )
}