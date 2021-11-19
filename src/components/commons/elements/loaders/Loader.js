import React from "react";
import "./Loader.css";

export const PanelLoader = ({style}) => {
    return (
        <div className="loader-wrapper panel-loader" style={style}>
            <div className="loader">Loading...</div>
        </div>
    )
}

export const SectionLoader = ({style}) => {
    return (
        <div className="loader-wrapper section-loader" style={style}>
            <div className="loader">Loading...</div>
        </div>
    )
}

export const PageLoader = ({style}) => {
    return (
        <div className="loader-wrapper page-loader" style={style}>
            <div className="loader">Loading...</div>
        </div>
    )
}

export const ArticleLoader = ({style}) => {
    return (
        <div className="loader-wrapper article-loader" style={style}>
            <div className="loader">Loading...</div>
        </div>
    )
}

export const ButtonLoader = ({style}) => {
    return (
        <div className="loader-wrapper button-loader" style={style}>
            <div className="loader">Loading...</div>
        </div>
    )
}