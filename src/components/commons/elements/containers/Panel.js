import React from "react";
import "./Panel.css";
import {PanelLoader} from "../loaders/Loader";

const Panel = (props) => {
    return (
        <div className="panel">
            {props.data > 0 ?
                <>{props.children}</>
                :
                <PanelLoader/>
            }
        </div>
    )
}

export default Panel;