import React from "react";
import "./Alert.css";

export const PanelErr = ({reload}) => {
    return (
        <div className="alert-wrapper panel-alert">
            <p>We couldn't load the content.</p>
            <button className="button-submit" onClick={reload}>Try again</button>
        </div>
    )
}

export const SectionErr = ({reload}) => {
    return (
        <div className="alert-wrapper section-alert">
            <p>We couldn't load the content.</p>
            <button className="button-submit" onClick={reload}>Try again</button>
        </div>
    )
}

export const ArticleErr = ({reload}) => {
    return (
        <div className="alert-wrapper article-alert">
            <p>We couldn't load the content.</p>
            <button className="button-submit" onClick={reload}>Try again</button>
        </div>
    )
}