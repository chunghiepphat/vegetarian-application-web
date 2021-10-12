import React from "react";
import "./Loader.css";

export const PanelLoader = () => {
    return (
        <div className="loader-wrapper panel-loader">
            <div className="loader">Loading...</div>
        </div>
    )
}

export const SectionLoader = () => {
    return (
        <div className="loader-wrapper section-loader">
            <div className="loader">Loading...</div>
        </div>
    )
}

export const ArticleLoader = () => {
    return (
        <div className="loader-wrapper article-loader">
            <div className="loader">Loading...</div>
        </div>
    )
}

export const ButtonLoader = () => {
    return (
        <div className="loader-wrapper button-loader">
            <div className="loader">Loading...</div>
        </div>
    )
}