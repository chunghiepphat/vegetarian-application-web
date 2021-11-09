import React from "react";
import "./Alert.css";

export const PanelErr = ({reload, api, style}) => {
    return (
        <div className="alert-wrapper panel-alert" style={style}>
            <p>We couldn't load the content.</p>
            <button className="button-submit" onClick={() => reload(api)}>Try again</button>
        </div>
    )
}

export const SectionErr = ({reload, api, style}) => {
    return (
        <div className="alert-wrapper section-alert" style={style}>
            <p>We couldn't load the content.</p>
            <button className="button-submit" onClick={() => reload(api)}>Try again</button>
        </div>
    )
}

export const ArticleErr = ({reload, api, style}) => {
    return (
        <div className="alert-wrapper article-alert" style={style}>
            <p>We couldn't load the content.</p>
            <button className="button-submit" onClick={() => reload(api)}>Try again</button>
        </div>
    )
}