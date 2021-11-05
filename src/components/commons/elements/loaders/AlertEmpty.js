import React from "react";
import "./Alert.css";

export const PanelEmp = ({message}) => {
    return (
        <div className="alert-wrapper panel-alert">
            {message ? <em>{message}</em>
                : <em>It seems empty here.</em>}
        </div>
    )
}

export const SectionEmp = ({message}) => {
    return (
        <div className="alert-wrapper section-alert">
            {message ? <em>{message}</em>
                : <em>It seems empty here.</em>}
        </div>
    )
}

export const ArticleEmp = ({message}) => {
    return (
        <div className="alert-wrapper article-alert">
            {message ? <em>{message}</em>
                : <em>It seems empty here.</em>}
        </div>
    )
}