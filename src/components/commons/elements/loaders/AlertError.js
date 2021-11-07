import React from "react";
import "./Alert.css";

export const PanelErr = ({reload, api}) => {
    return (
        <div className="alert-wrapper panel-alert">
            <p>We couldn't load the content.</p>
            <button className="button-submit" onClick={() => reload(api)}>Try again</button>
        </div>
    )
}

export const SectionErr = ({reload, api}) => {
    return (
        <div className="alert-wrapper section-alert">
            <p>We couldn't load the content.</p>
            <button className="button-submit" onClick={() => reload(api)}>Try again</button>
        </div>
    )
}

export const ArticleErr = ({reload, api}) => {
    return (
        <div className="alert-wrapper article-alert">
            <p>We couldn't load the content.</p>
            <button className="button-submit" onClick={() => reload(api)}>Try again</button>
        </div>
    )
}